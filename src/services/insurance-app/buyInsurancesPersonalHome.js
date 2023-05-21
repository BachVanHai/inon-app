import { BaseAppUltils, HttpClient } from "base-app"
import {
    API_HOME_INSURANCE_CONTRACTS, API_HOME_INSURANCE_INSURANCES, API_HOME_INSURANCE_FEE_INSURANCE, API_HOME_INSURANCE_CONTRACT,
    API_HOME_INSURANCE_CONTRACTS_PAY, API_HOME_INSURANCE_CONTRACTS_VNPAY_CONFIRM, API_CHECK_INFO_CONTACT_BY_ID, INSURANCE_TYPE_PERSONAL_HOME,
} from "../../configs/insurance-app"

class Service {
    static checkInfoContact(contactId) {
        return HttpClient.get(`${API_CHECK_INFO_CONTACT_BY_ID}/${contactId}`,
            { params: { date: new Date().getMilliseconds() } })
    }

    static confirmPay(values) {
        return HttpClient.post(`${API_HOME_INSURANCE_CONTRACTS_VNPAY_CONFIRM}`, values, { isBackgroundRequest: true })
    }

    static payContract(contractId, paymentType, companyId) {
        return HttpClient.get(`${API_HOME_INSURANCE_CONTRACTS_PAY}/${contractId}/${companyId}?paymentType=${paymentType}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            }
        )
    }

    static getContractInfo(contractId, companyId) {
        return HttpClient.get(`${API_HOME_INSURANCE_CONTRACT}?contractId=${contractId}&companyId=${companyId}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static getFeeInsurance(contractId) {
        return HttpClient.get(`${API_HOME_INSURANCE_FEE_INSURANCE}/${contractId}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static updateInsurances(contractId, info) {
        return HttpClient.put(`${API_HOME_INSURANCE_INSURANCES}/${contractId}`, info)
    }

    static updateContract(info) {
        return HttpClient.put(`${API_HOME_INSURANCE_CONTRACTS}/FH`, info)
    }

    static createContract(info) {
        return HttpClient.post(`${API_HOME_INSURANCE_CONTRACTS}/FH`, info)
    }
}

export default Service
