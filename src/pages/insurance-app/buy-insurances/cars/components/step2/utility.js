import { HttpClient } from 'base-app'
import { API_FILES_CONTRACTS } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotors'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotors'
import { hasRequestFail } from '../../../../../../ultity'

export const getDefault_updateContractForPaymentType = (contracttInfo, paymentType) => {
    const _contractInfo = contracttInfo.map(elt => {
        elt["paymentType"] = paymentType
        return elt
    })
    return _contractInfo
}

export const getDefault_updateContractForCompanyId = (contracttInfo, companyId) => {
    const _contractInfo = contracttInfo.map(elt => {
        elt["companyId"] = companyId
        return elt
    })
    return _contractInfo
}

export const updateContract = (contracttInfo, completedAction, failAction) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.put(`${API_FILES_CONTRACTS}`, contracttInfo)
            if (hasRequestFail(res.status)) {
                failAction && failAction()
                return
            }
            // return console.log(`res`, res)
            completedAction && completedAction()
            dispatch(updateProps([
                {
                    prop: BASE.KEY_CONTRACT_INFO,
                    value: res.data
                }
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

const API_FILE_VNPAY = "nth/file/api/file-vnpay-url"
export const payApi = (payInfo) => {
    return HttpClient.post(`${API_FILE_VNPAY}`, payInfo)
}