import { FormattedMessage, HttpClient } from 'base-app'
import moment from 'moment'
import React from 'react'
import bshIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_BSH_1.svg'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { BENEFICIARY, KEY_INSURANCE_INFO } from '../../../../../../redux/reducers/insurance-app/buyInsurancesAntin'
import {
  BASE,
  KEY_STEP_2
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { hasRequestFail } from '../../../../../../ultity'
import { API_INSURANCE_CREDIT } from '../step1/utility'
import {
  KEY_DATE_INSUR_FROM,
  KEY_DATE_INSUR_TO,
  KEY_DURATION,
  KEY_RESPONSIBILITY
} from './formikConfig'
export const API_INSURANCES_HCAC = '/nth/personalinsurance/api/insurances/hcac'
export const API_CONTRACTS_HCAC_FEE_INSURANCE_ =
  '/nth/personalinsurance/api/contracts/hcac-feeInsurance'
export const API_CREATE_BENEFICIARY =
  'nth/personalinsurance/api/beneficiary-credit'
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
              value: [res2.data]
            },
            {
              prop: BASE.KEY_TOTAL_FEE,
              value: res2.data.totalFeeInsurance
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
            value: [res2.data]
          }
        ])
      )
    } catch (e) {
      console.log(e)
    }
  }
}

export const createBeneficiary = (contractId, data) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.post(
        `${API_CREATE_BENEFICIARY}?contractId=${contractId}`,
        data
      )
      if (res.status === 200) {
        dispatch(
          updateProps([
            {
              prop: BENEFICIARY,
              value: res.data
            },
            {
              prop: BASE.KEY_ACTIVE_STEP,
              value: 3
            }
          ])
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateBeneficiary = (contractId, data) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_CREATE_BENEFICIARY}?contractId=${contractId}`,
        data
      )
      if (res.status === 200) {
        dispatch(
          updateProps([
            {
              prop: BENEFICIARY,
              value: res.data
            },
            {
              prop: BASE.KEY_ACTIVE_STEP,
              value: 3
            }
          ])
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBodyDateInsurance = (start, end) => {
  return {
    startValueDate: moment(start).toISOString(),
    endValueDate: moment(end).toISOString()
  }
}
export const API_GET_FEE =
  '/nth/personalinsurance/api/contract-credit/calculator-fee'
export const updateInsuranceAndFeeStep2 = (
  contractId,
  data,
  step_2,
  values
) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_INSURANCE_CREDIT}/${contractId}`,
        data
      )
      const feeRes = await HttpClient.get(
        `${API_GET_FEE}?contractId=${contractId}`,
        { params: { date: new Date().getMilliseconds() } }
      )
      if (hasRequestFail(res.status) && hasRequestFail(feeRes.status)) return
      const _step_2 = { ...step_2 }
      _step_2[KEY_RESPONSIBILITY] = values?.responsibility
      _step_2[KEY_DURATION] = values?.duration
      _step_2[KEY_DATE_INSUR_FROM] = moment(values?.dateInsuranceFrom).format(
        'YYYY-MM-DD'
      )
      _step_2[KEY_DATE_INSUR_TO] = moment(values?.dateInsuranceTo).format(
        'YYYY-MM-DD'
      )
      dispatch(
        updateProps([
          {
            prop: BASE.KEY_TOTAL_FEE,
            value: feeRes?.data?.feeInsurance
          },
          {
            prop: KEY_STEP_2,
            value: _step_2
          },
          {
            prop: BASE.KEY_DATA_FEES,
            value: feeRes.data
          }
        ])
      )
    } catch (e) {
      console.log(e)
    }
  }
}
export const subStringMoney = (money, end) => {
  return money ? money.toString().slice(0, end) : 0
}
export const getObjectBeneficiary = (values, id) => {
  const { beneficiaryFirst, beneficiarySecond } = values
  return [
    {
      fullName: `${beneficiaryFirst?.bankName} - ${beneficiaryFirst?.branchName}`,
      id: id ? id : undefined , 
      bankName: beneficiaryFirst?.bankName,
      branchName: beneficiaryFirst?.branchName,
      type: "BANK"
    },
    {
      icNo: beneficiarySecond?.icNo,
      icType: beneficiarySecond?.icType,
      fullName: beneficiarySecond?.fullname,
      id: id ? id : undefined
    }
  ]
}
export const removeCommaBetweenStringAndConvertToNumber = (str) => {
  return Number(str.replaceAll(',',''))
}

export const _BSH_INSURANCE =  {
  companyId : "01",
  id : "01", 
  companyName : "BSH",
  nameDetail : <FormattedMessage id={getKeyLang('CompanyBSH')} />,
  image : bshIcon
}