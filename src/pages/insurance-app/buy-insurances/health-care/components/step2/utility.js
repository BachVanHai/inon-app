import { BaseAppUltils, FormattedMessage, HttpClient } from 'base-app';
import moment from 'moment';
import React from 'react';
import bshIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_BSH_1.svg';
import pviIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_PVI.svg';
import { getKeyLang } from '../../../../../../configs/elite-app';
import * as getKeyLangInsuranceApp from '../../../../../../configs/insurance-app';
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare';
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2 } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard';
import { KEY_COMPANY_ID, KEY_CONTRACT_CODE, KEY_CONTRACT_INFO, KEY_TOTAL_FEE } from '../../../../../../redux/reducers/insurance-app/utility';
import { hasRequestFail } from '../../../../../../ultity';
import { API_CONTRACTS_HCAC } from '../step1/utility';
import { KEY_DURATION_SELECTED, KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_START_INSURANCE , KEY_YEAR } from './formikConfig';
export const API_INSURANCES_HCAC = "/nth/personalinsurance/api/insurances/hcac"
export const API_CONTRACTS_HCAC_FEE_INSURANCE_ = "/nth/personalinsurance/api/contracts/hcac-feeInsurance"

/** 
 * @example
 *  data = {
      "packageName": "GOI3",
      "duration": 12
    } 
*/
export const updateInsurancePackages = (contractId, data) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.post(`${API_INSURANCES_HCAC}?contractId=${contractId}`, data)
            const res2 = await HttpClient.get(`${API_CONTRACTS_HCAC_FEE_INSURANCE_}?contractId=${contractId}`, data)
            if (res.status === 200  && res2.status ===200) {
                dispatch(updateProps([
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
                    },
                    // {
                    //     prop : KEY_STEP_2 , 
                    //     value : {...data , year : 1}
                    // }
                ]))
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
      if (hasRequestFail(res.status)) return

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
      const foundCompany = res2.data.find(
        (elt) => elt.companyId === companyId
      )
      if (!foundCompany) {
        const __companyIdDefault = res2.data[0].companyId
       dispatch(updateCompanyId(
        contractId,
        getDefault_updateCompanyIdContractObj(contractInfo, __companyIdDefault),
        __companyIdDefault
      ))
      }else{
        dispatch(
          updateProps([
            {
              prop : KEY_COMPANY_ID, 
              value : companyId
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
    const totalFee = newData.find((_elt) => _elt?.companyId === companyId)
      ?.totalFeeInsurance
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
    companyId: '01',
    id: '01',
    companyName: 'BSH',
    nameDetail: (
      <FormattedMessage id={getKeyLangInsuranceApp.getKeyLang('CompanyBSH')} />
    ),
    image: bshIcon
  },
  {
    companyId: '06',
    id: '06',
    companyName: 'PVI',
    nameDetail: (
      <FormattedMessage
        id={getKeyLangInsuranceApp.getKeyLang('BuyInsurance.Car.PVI')}
      />
    ),
    image: pviIcon
  }
]
export const enabledCompanies = ['01', '06']

export const objectUpdate_Insurance = (insuranceId, values) => {
  return {
    id: insuranceId === null ? undefined : insuranceId,
    packageName: values[KEY_PACKAGE_SELECTED],
    startValueDate: moment(values[KEY_START_INSURANCE]).utc(true).toISOString(),
    endValueDate: moment(values[KEY_END_INSURANCE]).utc(true).toISOString(),
    duration: values[KEY_DURATION_SELECTED]
  }
}
