import { HttpClient } from 'base-app'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesGoods'
import {
  ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
  ACTION_BUY_INSUR_TRAVEL_DOMESTIC_UPDATE_PROPS,
    BASE,
    MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesGoods'
import {
    KEY_CONTRACT_INFO,
    KEY_PAYMENT_TYPE
} from '../../../../../../redux/reducers/insurance-app/utility'
import { API_CONTRACTS_TRAVEL_INSURANCE } from '../step1/utility'
const API_UPDATE_COMPANY = 'nth/homeinsurance/api/authenticate/contract-cargo-insurance-info'
export const updateContract = (contractId, data, paymentType) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_UPDATE_COMPANY}`,
        data
      )
      if (res.status === 200) {
        dispatch(
          updateProps([
            { prop: KEY_PAYMENT_TYPE, value: paymentType },
            { prop: KEY_CONTRACT_INFO, value: res.data }
          ])
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// {"packageSelected":"GOI2","durationSelected":3,"currentFee":0}
export const getDefault_updatePaymentContractObj = (
  paymentType,
  contractInfo,
  contractId
) => {
  let _contractInfo = { ...contractInfo }
  _contractInfo['paymentType'] = paymentType
  _contractInfo['id'] = contractId
  return _contractInfo
}

export const getDefault_updateTotalFeeIncVATContractObj = (
  paymentType,
  totalFee,
  contractInfo
) => {
  let _contractInfo = { ...contractInfo }
  delete _contractInfo['owner']
  delete _contractInfo['beneficiaries']
  _contractInfo['paymentType'] = paymentType
  _contractInfo['totalFeeInclVAT'] = totalFee
  return _contractInfo
}

export const API_CONTRACT_TRAVEL_PAY =
  '/nth/homeinsuranceapi/api/authenticate/cargo-contract/pay'
export const payContract = (
  contractId,
  paymentType,
  totalFee,
  contractInfo
) => {
  return async (dispatch) => {
    try {
      dispatch(
        pay(
          null,
          paymentType,
          {
            ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
            KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
            MAX_STEP: MAX_STEP,
            KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS
          },
          () =>
            HttpClient.post(
              `${API_CONTRACT_TRAVEL_PAY}?contractId=${contractId}` ,  {
                id: contractId
              }
            ),
          null,
          {
            id: contractId
          }
        )
      )
    } catch (e) {
      console.log(e)
    }
  }
}
