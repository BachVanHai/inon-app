import { HttpClient } from 'base-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'
import { ACTION_BUY_INSUR_HEALTH_UPDATE_PROPS, BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { hasRequestFail } from '../../../../../../ultity'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { API_CONTRACTS_HCAC } from '../step1/utility'

export const updateContract = (contractInfo) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.put(`${API_CONTRACTS_HCAC}?contractId=${contractInfo.id}`, contractInfo)
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

// {"packageSelected":"GOI2","durationSelected":3,"currentFee":0}
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

export const API_CONTRACT_HACAC_PAY = "/nth/personalinsurance/api/contract/hcac-pay"
export const payContract = (contractId, paymentType, totalFee, contractInfo) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.put(`${API_CONTRACTS_HCAC}?contractId=${contractId}`,
                getDefault_updateTotalFeeIncVATContractObj(paymentType, totalFee, contractInfo)
            )
            if (hasRequestFail(res.status)) return

            dispatch(
                pay(
                    null, paymentType,
                    {
                        ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_HEALTH_UPDATE_PROPS,
                        KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
                        MAX_STEP: MAX_STEP,
                        KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS
                    },
                    (info) => HttpClient.post(`${API_CONTRACT_HACAC_PAY}?contractId=${contractId}`, info),
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