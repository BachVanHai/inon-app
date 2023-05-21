import { HttpClient } from 'base-app'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS, BASE, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesAntin'
import { hasRequestFail } from '../../../../../../ultity'
import { API_CONTRACTS_ANTIN } from '../step1/utility'

export const updateContract = (contractInfo) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.put(`${API_CONTRACTS_ANTIN}/${contractInfo.id}`, contractInfo)
            if (hasRequestFail(res.status)) return

            dispatch(updateProps([
                {
                    prop: BASE.KEY_PAYMENT_TYPE,
                    value: res.data.paymentType
                },
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getDefault_updatePaymentContractObj = (paymentType, contractInfo) => {
    let _contractInfo = { ...contractInfo }
    delete _contractInfo['owner']
    delete _contractInfo['beneficiaries']
    _contractInfo["paymentType"] = paymentType
    return _contractInfo
}

export const getDefault_updateTotalFeeIncVATContractObj = (paymentType, totalFee, contractInfo) => {
    let _contractInfo = { ...contractInfo }
    delete _contractInfo['owner']
    delete _contractInfo['beneficiaries']
    _contractInfo["paymentType"] = paymentType
    _contractInfo["totalFeeInclVAT"] = totalFee
    return _contractInfo
}

export const API_PAY_CREDIT_CONTRACT = "/nth/personalinsurance/api/contract-credit/cic-pay"
export const payContract = (contractId, paymentType, totalFee, contractInfo) => {
    return async (dispatch) => {
        try {
            dispatch(
                pay(
                    null, paymentType,
                    {
                        ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS,
                        KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
                        MAX_STEP: MAX_STEP,
                        KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS
                    },
                    (info) => HttpClient.post(`${API_PAY_CREDIT_CONTRACT}?contractId=${contractId}`,  {
                        id: contractId,
                        paymentType: paymentType,
                    }),
                   null
                    ,
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