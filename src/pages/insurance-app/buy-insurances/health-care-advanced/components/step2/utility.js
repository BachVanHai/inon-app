import { BaseAppUltils, FormattedMessage, HttpClient } from 'base-app'
import moment from 'moment'
import React from 'react'
import vbiIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_VBI_1.svg'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import {
  BASE,
  KEY_INSURANCE_INFO,
  KEY_STEP_2
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import {
  KEY_COMPANY_ID,
  KEY_CONTRACT_CODE,
  KEY_CONTRACT_INFO,
  KEY_TOTAL_FEE
} from '../../../../../../redux/reducers/insurance-app/utility'
import { hasRequestFail } from '../../../../../../ultity'
import { API_CONTRACTS_HCAC } from '../step1/utility'
import { KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_PRODUCT_CODE, KEY_START_INSURANCE } from './formikConfig'
export const API_INSURANCES_HCAC =
  '/nth/personalinsurance/api/health-care-advance-insurance'
export const API_CONTRACTS_HCAC_FEE_INSURANCE_ =
  '/nth/personalinsurance/api/health-care-advance-fee'

/** 
 * @example
 *  data = {
      "packageName": "GOI3",
      "duration": 12
    } 
*/
export const SLIVER = 'SLIVER'
export const TITAN = 'TITAN'
export const GOLD = 'GOLD'
export const PLATINUM = 'PLATINUM'
export const DIAMOND = 'DIAMOND'

export const updateInsurancePackages = (contractId, data) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.post(
        `${API_INSURANCES_HCAC}?contractId=${contractId}`,
        data
      )
      const res2 = await HttpClient.get(
        `${API_CONTRACTS_HCAC_FEE_INSURANCE_}?contractId=${contractId}`,
        data
      )
      if (res.status === 200 && res2.status === 200) {
        dispatch(
          updateProps([
            {
              prop: BASE.KEY_ACTIVE_STEP,
              value: 2
            },
            {
              prop: KEY_INSURANCE_INFO,
              value: res.data
            },
            {
              prop: BASE.KEY_DATA_FEES,
              value: res2.data
            }
          ])
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export const updateInsurance = (contractId, data) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_INSURANCES_HCAC}?contractId=${contractId}`,
        data
      )
      if (hasRequestFail(res.status)) return

      const res2 = await HttpClient.get(
        `${API_CONTRACTS_HCAC_FEE_INSURANCE_}?contractId=${contractId}`,
        data
      )
      if (hasRequestFail(res.status)) return

      dispatch(
        updateProps([
          {
            prop: BASE.KEY_ACTIVE_STEP,
            value: 3
          },
          {
            prop: KEY_INSURANCE_INFO,
            value: res.data
          },
          {
            prop: BASE.KEY_DATA_FEES,
            value: res2.data
          }
        ])
      )
    } catch (e) {
      console.log(e)
    }
  }
}
export const getBodyDateInsurance = (start, end) => {
  return {
    startValueDate: moment(start).toISOString(),
    endValueDate: moment(end).toISOString()
  }
}

export const updateInsuranceAndFeeStep2 = (
  contractId,
  data,
  setCompaniesData,
  companyId,
  contractInfo
) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_INSURANCES_HCAC}?contractId=${contractId}`,
        data
      )
      if (res.status !== 200) return

      const res2 = await HttpClient.get(
        `${API_CONTRACTS_HCAC_FEE_INSURANCE_}?contractId=${contractId}`,
        data
      )
      if (res2.status !== 200) return

      dispatch(
        updateProps([
          {
            prop: KEY_INSURANCE_INFO,
            value: res.data
          },
          {
            prop: KEY_STEP_2,
            value: data
          },
          {
            prop: BASE.KEY_DATA_FEES,
            value: res2.data
          }
        ])
      )
      // set data fee again
      const foundCompany = res2.data.find((elt) => elt.companyId === companyId)
      if (!foundCompany) {
        const __companyIdDefault = res2.data[0].companyId
        dispatch(
          updateCompanyId(
            contractId,
            getDefault_updateCompanyIdContractObj(
              contractInfo,
              __companyIdDefault
            ),
            __companyIdDefault
          )
        )
      } else {
        dispatch(
          updateProps([
            {
              prop: KEY_COMPANY_ID,
              value: companyId
            }
          ])
        )
      }
      const newData = res2.data
        .filter((_elt) => enabledCompanies.includes(_elt.companyId))
        .map((item) => {
          const iconCompany = ARR_COMPANIES.find(
            (_elt) => _elt.companyId.toString() === item.companyId.toString()
          )
          return {
            ...item,
            logo: iconCompany !== undefined ? iconCompany.image : '',
            totalFeeInsurance: item.feeInsurances.totalFeeInsurance
          }
        })
      //filter total fee
      const totalFee = newData.find(
        (_elt) => _elt?.companyId === companyId
      )?.totalFeeInsurance
      dispatch(
        updateProps([
          {
            prop: KEY_TOTAL_FEE,
            value: totalFee
          }
        ])
      )
      setCompaniesData(newData)
    } catch (e) {
      console.log(e)
    }
  }
}
export const subStringMoney = (money, end) => {
  return money ? money.toString().slice(0, end) : 0
}

export const getDefault_updateCompanyIdContractObj = (
  contractInfo,
  companyId
) => {
  let _contractInfo = { ...contractInfo }
  delete _contractInfo['owner']
  delete _contractInfo['beneficiaries']
  delete _contractInfo['paymentType']
  delete _contractInfo['totalFeeInclVAT']
  _contractInfo['companyId'] = companyId
  return _contractInfo
}

export const updateCompanyId = (contractId, data, companyId) => {
  return async (dispatch) => {
    const res = await HttpClient.put(
      `${API_CONTRACTS_HCAC}?contractId=${contractId}`,
      data
    )
    if (res.status === 200) {
      dispatch(
        updateProps([
          {
            prop: KEY_COMPANY_ID,
            value: companyId
          },
          {
            prop: KEY_CONTRACT_CODE,
            value: res.data.contractCode
          },
          {
            prop: KEY_CONTRACT_INFO,
            value: res.data
          }
        ])
      )
    } else {
      BaseAppUltils.toastError(
        'Cập nhật hãng bảo hiểm thất bại , vui lòng thử lại sau !'
      )
    }
  }
}

export const DURATION_PACKAGE = [
  {
    value: 12,
    year: 1,
    title: <FormattedMessage id={getKeyLang('insurance.heath.1year')} />
  },
  {
    value: 24,
    year: 2,
    title: <FormattedMessage id={getKeyLang('insurance.heath.2year')} />
  },
  {
    value: 36,
    year: 3,
    title: <FormattedMessage id={getKeyLang('insurance.heath.3year')} />
  }
]
export const ARR_COMPANIES = [
  {
    companyId: '02',
    companyName: 'VBI',
    image: vbiIcon,
    id: '02',
    companyName: 'VBI',
    nameDetail: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.VBI`)} />
  }
]
export const enabledCompanies = ['02']

export const objectUpdate_Insurance = (insuranceId, values , contractId) => {
  return {
    id:insuranceId,
    "productCode": values[KEY_PRODUCT_CODE],
    "packageCode": values[KEY_PACKAGE_SELECTED],
    "description": "Bảo hiểm sức khỏe nâng cao",
    "isEnable": true,
    "duration": 12,
    "startValueDate": moment(values[KEY_START_INSURANCE]).toISOString(),
    "endValueDate": moment(values[KEY_END_INSURANCE]).toISOString(),
    "unit": "VND",
    "contractId": contractId,
    "insuranceCode": "VC"
  }
}
export const _PACKAGE_INSURANCES = [
  {
    value:SLIVER,
    msgField: 'Lựa chọn 1',
    interest: '225 triệu đồng',
    packageSubtitleField: 'Gói bạc',
    fee1: '90000000',
    fee2: '45000000',
    fee3: '45000000',
    fee4: '45000000',
    fee5: '1350000',
    fee6: '45000000',
    fee7: '2250000',
    fee8: '2250000',
    fee9: '2250000',
    fee10: '45000000',
    fee11: '2000000',
    rangeAddons: false,
    footerText: 'heath-care-advanced.detail.footerText.NotSliverPack'
  },
  {
    value: TITAN,
    msgField: 'Lựa chọn 2',
    packageSubtitleField: 'Gói titan',
    interest: '325 triệu đồng',
    fee1: '130000000',
    fee2: '65000000',
    fee3: '65000000',
    fee4: '65000000',
    fee5: '1950000',
    fee6: '65000000',
    fee7: '3250000',
    fee8: '3250000',
    fee9: '3250000',
    fee10: '65000',
    fee11: '2000000',
    rangeAddons: false,
    footerText: 'heath-care-advanced.detail.footerText.ApplyBoarding'
  },
  {
    value: GOLD,
    msgField: 'Lựa chọn 3',
    packageSubtitleField: 'Gói vàng',
    interest: '575 triệu đồng',
    fee1: '230000000',
    fee2: '115000000',
    fee3: '115000000',
    fee4: '115000000',
    fee5: '3450000',
    fee6: '11500000',
    fee7: '5750000',
    fee8: '5750000',
    fee9: '5750000',
    fee10: '115000000',
    fee11: '2000000',
    fee12: '6000000',
    rangeAddons: true,
    fee13: '840000',
    fee14: '840000',
    footerText: 'heath-care-advanced.detail.footerText.ApplyBoarding'
  },
  {
    value: PLATINUM,
    msgField: 'Lựa chọn 4',
    packageSubtitleField: 'Gói bạch kim',
    interest: '1,05 tỷ đồng',
    fee1: '600000000',
    fee2: '150000000',
    fee3: '150000000',
    fee4: '150000000',
    fee5: '4500000',
    fee6: '15000000',
    fee7: '7500000',
    fee8: '7500000',
    fee9: '7500000',
    fee10: '150000',
    fee11: '2000000',
    fee12: '10000000',
    rangeAddons: true,
    fee13: '1400000',
    fee14: '1400000',
    footerText: 'heath-care-advanced.detail.footerText.ApplyBoarding'
  },
  {
    value: DIAMOND,
    msgField: 'Lựa chọn 5',
    packageSubtitleField: 'Gói kim cương',
    interest: '1,6 tỷ đồng',
    fee1: '1000000000',
    fee2: '200000000',
    fee3: '200000000',
    fee4: '200000000',
    fee5: '6000000',
    fee6: '200000000',
    fee7: '1000000',
    fee8: '1000000',
    fee9: '1000000',
    fee10: '450000',
    fee11: '2000000',
    fee12: '1500000',
    rangeAddons: true,
    fee13: '2100000',
    fee14: '2100000',
    footerText: 'heath-care-advanced.detail.footerText.ApplyBoarding'
  }
]
export const _RANGE = [
  {
    value: 'BASIC',
    title: 'heath-care-advanced.range.bassic'
  },
  {
    value: 'ADVANCE',
    title: 'heath-care-advanced.range.advanced'
  }
]
