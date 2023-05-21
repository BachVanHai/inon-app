import { BaseAppUltils, HttpClient } from "base-app"
import {
    API_VTA_INSURANCE_INSURANCE_PTI_VTA, API_VTA_INSURANCE_INSURANCE_PTI, API_VTA_INSURANCE_PTI, API_VTA_INSURANCE_FEE_PTI,
    API_VTA_INSURANCE_PAYMENT_URL, API_VTA_INSURANCE_CONTRACTS_VNPAY_CONFIRM
} from "../../configs/insurance-app"

class Service {
    static createContract(contractInfo) {
        return HttpClient.post(`${API_VTA_INSURANCE_INSURANCE_PTI_VTA}`, contractInfo)
    }

    static updateContract(contractId, contractInfo) {
        return HttpClient.put(`${API_VTA_INSURANCE_INSURANCE_PTI}/${contractId}`, contractInfo)
    }

    static getContractInfo(contractId) {
        return HttpClient.get(`${API_VTA_INSURANCE_INSURANCE_PTI}?contractId=${contractId}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static updateInsurance(contractId, insuranceInfo) {
        return HttpClient.put(`${API_VTA_INSURANCE_PTI}?contractId=${contractId}`, insuranceInfo)
    }

    static getFee(contractId, buyerType = "individual") {
        if (buyerType === "individual") {
            return HttpClient.get(`${API_VTA_INSURANCE_FEE_PTI}/individual?contractId=${contractId}`,
                {
                    params: { uuid: BaseAppUltils.generateUUID() },
                    isBackgroundRequest: true
                })
        }
        return HttpClient.get(`${API_VTA_INSURANCE_FEE_PTI}/group?contractId=${contractId}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static pay(contractId, paymentType) {
        return HttpClient.get(`${API_VTA_INSURANCE_PAYMENT_URL}/${contractId}?paymentType=${paymentType}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static vnpayConfirm(returnUrl) {
        return HttpClient.post(`${API_VTA_INSURANCE_CONTRACTS_VNPAY_CONFIRM}`, returnUrl, { isBackgroundRequest: true })
    }
}

export default Service
