import BonusService from '../../../services/supplement-app/bonus'
import { BaseAppConfigs } from 'base-app'
import moment from 'moment'

export const ACTION_LOAD_LIST_BONUS_HISTORY = 'ACTION_LOAD_LIST_BONUS_HISTORY'
export const ACTION_LOAD_LIST_BONUS_HISTORY_SUGGESTIONS = 'ACTION_LOAD_LIST_BONUS_HISTORY_SUGGESTIONS'
export const ACTION_LOAD_CONTRACT_INFO = 'ACTION_LOAD_CONTRACT_INFO'

export const loadListBonusHistory = (bonusType, startDate, endDate, searchIds) => {
  return async (dispatch) => {
    const res = await BonusService.getBonusHistoryList(bonusType.toLowerCase(), startDate, endDate, searchIds || null)
    if (res && res.data) {
      dispatch({ type: ACTION_LOAD_LIST_BONUS_HISTORY, payload: res.data || [] })
    } else {
      dispatch({ type: ACTION_LOAD_LIST_BONUS_HISTORY, payload: [] })
    }
  }
}

export const loadListSuggestion = () => {
  return async (dispatch) => {
    const res = await BonusService.getAccountSuggestions()
    if (res.status === 200) {
      let data = res.data || []
      data = data.filter(item => item.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
        value: item.id,
        id: item.id,
        label: `${item.userCode}-${item.fullName}`
      }))
      dispatch({
        type: ACTION_LOAD_LIST_BONUS_HISTORY_SUGGESTIONS,
        payload: data || []
      })
    }
  }
}

export const loadContractInfo = (contractId) => {
  return async (dispatch) => {
    const res = await BonusService.getContractInfo(contractId)
    if (res && res.status === 200) {
      dispatch({ type: ACTION_LOAD_CONTRACT_INFO, payload: res.data })
    }
  }
}

export const updateBonusHistoryPaid = (ids, bonusType, startDate, endDate, searchIds) => {
  return async (dispatch) => {
    const res = await BonusService.updateBonusHistoryPaid(ids)
    if (res && res.status === 200) {
      dispatch(loadListBonusHistory(bonusType, startDate, endDate, searchIds || null))
    }
  }
}

export const exportExcel = (startDate, endDate, searchIds, isPartner) => {
  return async () => {
    const res = await BonusService.exportBonusHistory(startDate, endDate, searchIds || null, isPartner)
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `lich_su_diem_thuong_${moment().format('YYYY-DD-MM')}.xlsx`) //or any other extension
    document.body.appendChild(link)
    link.click()
  }
}
