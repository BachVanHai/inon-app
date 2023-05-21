import React from 'react'
import BonusService from '../../../services/supplement-app/bonus'
import { BONUS_TYPE, getKeyLang } from '../../../configs/supplement-app'
import * as moment from 'moment'
import { BaseAppConfigs, BaseAppUltils, FormattedMessage } from 'base-app'

export const ACTION_LOAD_INSURANCE_LIST = 'ACTION_LOAD_INSURANCE_LIST'
export const ACTION_LOAD_LIST_ACCOUNT_SUGGESTION = 'ACTION_LOAD_LIST_ACCOUNT_SUGGESTION'


export const loadInsuranceList = (companyId, bonusType, partnerId) => {
  return async (dispatch) => {
    let bonusSettings = await loadBonusSetting(bonusType, partnerId, companyId)
    let userInsuranceSetting = []

    if (partnerId) {
      userInsuranceSetting = await BonusService.getUserInsuranceSettings(partnerId)
    }
    bonusSettings = bonusSettings.map(item => {
      item.type = bonusType
      item.insuranceCompanyId = companyId
      return item
    })

    const res = await BonusService.getInsuranceList('1')
    if (res.status === 200) {
      const insuranceList = res.data.map(item => ({...item, insuranceCompanyId: companyId}))
      dispatch({
        type: ACTION_LOAD_INSURANCE_LIST,
        payload: getInsuranceList(insuranceList, bonusType, bonusSettings, companyId, partnerId, userInsuranceSetting)
      })
    }
  }
}

export const loadInsuranceListDraft = (companyId, bonusType, bonusDraftId, partnerId, parentId) => {
  return async (dispatch) => {
    const bonusSettings = await BonusService.getBonusDraftSettings(bonusDraftId)
    let parentBonusSettings = []
    let userInsuranceSetting = []
    if (partnerId) {
      userInsuranceSetting = await BonusService.getUserInsuranceSettings(partnerId)
    }
    if (parentId) {
      parentBonusSettings = await BonusService.getBonusSettingByPartner(parentId)
    }
    const res = await BonusService.getInsuranceList(companyId)
    if (res.status === 200) {
      dispatch({
        type: ACTION_LOAD_INSURANCE_LIST,
        payload: getInsuranceList(res.data, bonusType, bonusSettings, companyId, partnerId, parentBonusSettings, userInsuranceSetting)
      })
    }
  }
}

export const loadListSuggestion = (callBack) => {
  return async (dispatch) => {
    const res = await BonusService.getAccountSuggestions()
    if (res.status === 200) {
      let data = res.data || []
      data = data.filter(item => item.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
        value: item.id,
        id: item.id,
        userCode: item.userCode,
        phoneNumber: item.phoneNumber,
        fullName: item.fullName,
        address: item.userDetails ? item.userDetails.address : '',
        username: item.username,
        parentId: item.parentId,
        label: `${item.userCode}-${item.fullName}`
      }))
      dispatch({
        type: ACTION_LOAD_LIST_ACCOUNT_SUGGESTION,
        payload: data
      })
      callBack(data)
    }
  }
}


export const updateBonusSettings = (bonusSettings) => {
  return async (dispatch) => {
    const res = await BonusService.updateBonuses(bonusSettings)
    if (res.status === 200) {
      res.data ? BaseAppUltils.toastSuccess(<FormattedMessage
        id={getKeyLang('bonus.updateSuccess')} />) : BaseAppUltils.toastSuccess(<FormattedMessage
        id={getKeyLang('bonus.updateNeedApproval')} />)
    }
  }
}

export const updateBonusDraftSettings = (id, bonusSettings) => {
  return async (dispatch) => {
    const res = await BonusService.updateBonusDraftSettings(id, bonusSettings)
    if (res.status === 200) {
      BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang('bonus.updateSuccess')} />)
    }
  }
}


const loadBonusSetting = async (bonusType, partnerId, companyId) => {
  switch (bonusType) {
    case BONUS_TYPE.SYSTEM:
    case BONUS_TYPE.LX_PARTNER:
    case BONUS_TYPE.CUSTOMER:
      return await BonusService.getBonusSettingByType(bonusType, companyId)
    case BONUS_TYPE.PERSONAL:
    case BONUS_TYPE.PARTNER:
    case BONUS_TYPE.ALL:
      return await BonusService.getBonusSettingByPartner(partnerId, companyId)
    default :
      return []
  }
}


const getInsuranceList = (insuranceList, type, bonusSettings, companyId, partnerId, userInsuranceSetting) => {
  const mapInsuranceList = new Map()

  const mapChildrenInsuranceList = (insurance) => {
    insurance.insurances = mapInsuranceList.get(insurance.id + '')
    if (insurance.insurances && insurance.insurances.length) {
      insurance.insurances = insurance.insurances.map((item) =>
        mapChildrenInsuranceList(item)
      )
    }
    return insurance
  }


  insuranceList.forEach((insurance) => {
    const groupInsurance = mapInsuranceList.get(insurance.parentId)
    if (['ADD_ON', 'CAR_04'].indexOf(insurance.code) >= 0 || insurance.code.indexOf('ADD_SETTING') >= 0) {
      return
    }


    if (groupInsurance) {
      groupInsurance.push(insurance)
      mapInsuranceList.set(insurance.parentId, groupInsurance)
    } else {
      mapInsuranceList.set(insurance.parentId, [insurance])
    }
  })
  const parentList = mapInsuranceList.get(null) || []
  insuranceList = parentList.map((item) => mapChildrenInsuranceList(item))
  insuranceList.forEach(insurance => {
    insurance.insuranceCompanyId = companyId
    insurance.isEnabled = isEnabledInsurance(insurance, userInsuranceSetting)
    insurance.insurances && insurance.insurances.forEach(insurance1 => {
      insurance1.isEnabled = isEnabledInsurance(insurance1, userInsuranceSetting)
      insurance1.insurances && insurance1.insurances.forEach(insurance2 => {
        insurance2.isEnabled = isEnabledInsurance(insurance2, userInsuranceSetting)
        let setting = bonusSettings.find(
          (item) => String(item.insuranceCompanyId) ===  String(companyId)  && item.insuranceCode === insurance2.name
        )
        const maxValue = setting?.maxValue || (type === BONUS_TYPE.SYSTEM ? 100 : 0)
        if (!setting) {
          setting = {
            value: 0,
            valueType: 'PERCENT',
            type,
            userId: partnerId,
            insuranceCompanyId: companyId,
            insuranceCode: insurance2.name,
            maxValue
          }
          bonusSettings.push(setting)
        } else {
          setting.maxValue = maxValue
          setting.insuranceCompanyId = companyId
        }
        setting.startValueDate = moment().add(1, 'day').toISOString()
        insurance.startValueDate = setting.startValueDate
        insurance2.setting = setting
      })
    })
  })

  return { insuranceList: JSON.parse(JSON.stringify(insuranceList)), bonusSettings : [...bonusSettings] }
}

const isEnabledInsurance = (insurance, userInsuranceSetting) => {
  const setting = userInsuranceSetting.find(item => item.insuranceCode === insurance.name)
  return setting ? setting.isEnabled : true
}
