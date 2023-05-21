import { HttpClient } from 'base-app'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import {
    ACTION_BUY_INSUR_TRAVEL_UPDATE_PROPS,
    BASE,
    MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import {
    KEY_CONTRACT_INFO,
    KEY_PAYMENT_TYPE
} from '../../../../../../redux/reducers/insurance-app/utility'
import { API_CONTRACTS_TRAVEL_INSURANCE } from '../step1/utility'

export const updateContract = (contractId, data, paymentType) => {
  return async (dispatch) => {
    try {
      const res = await HttpClient.put(
        `${API_CONTRACTS_TRAVEL_INSURANCE}?contractId=${contractId}`,
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
  contractInfo
) => {
  let _contractInfo = { ...contractInfo }
  delete _contractInfo['owner']
  delete _contractInfo['beneficiaries']
  delete _contractInfo['insurances']
  _contractInfo['paymentType'] = paymentType
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
  '/nth/personalinsurance/api/travel-contracts/pay'
export const payContract = (
  contractId,
  paymentType,
  totalFee,
  contractInfo
) => {
  return async (dispatch) => {
    try {
    //   if (paymentType === PAYMENT_TYPE_FUND_TRANSFER) {
    //     const res = await HttpClient.put(
    //       `${API_CONTRACT_TRAVEL_PAY}?contractId=${contractId}`,
    //       getDefault_updateTotalFeeIncVATContractObj(
    //         paymentType,
    //         totalFee,
    //         contractInfo
    //       )
    //     )
    //   }
      dispatch(
        pay(
          null,
          paymentType,
          {
            ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_TRAVEL_UPDATE_PROPS,
            KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
            MAX_STEP: MAX_STEP,
            KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS
          },
          (info) =>
            HttpClient.post(
              `${API_CONTRACT_TRAVEL_PAY}?contractId=${contractId}`,
              {
                paymentType : paymentType,
                id: contractId
              }
            ),
          null,
          {
            paymentType : paymentType,
            id: contractId
          }
        )
      )
    } catch (e) {
      console.log(e)
    }
  }
}
