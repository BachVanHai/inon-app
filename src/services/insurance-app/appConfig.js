import { BaseAppUltils, HttpClient } from "base-app";
import { API_GET_MY_DEBT_ACCOUNT, API_CHECK_INFO_CONTACT_BY_ID, API_GET_BANK_TRANSFER_INFO, API_GET_PARTNER, API_CREATE_CONTACT, API_COMPLETE_CONSTRACT, API_GET_CONFIG_INSURANCE_ENABLE } from "../../configs/insurance-app";


/**@description
 * This is a common Service. It'll support all feature of insurance-app
 */
class Service {
    static completeContract(contractInfo) {
        return HttpClient.put(`${API_COMPLETE_CONSTRACT}`, contractInfo)
    }

    static createContact(contactInfo) {
        return HttpClient.post(`${API_CREATE_CONTACT}`, contactInfo)
    }

    static updateContact(contactInfo) {
        return HttpClient.put(`${API_CREATE_CONTACT}`, contactInfo)
    }

    static getPartners() {
        return HttpClient.get(`${API_GET_PARTNER}`,
            {
                params: {
                    date: new Date().getMilliseconds(),
                    size: 9999
                }
            })
    }
    static getMyDebtAccount() {
        return HttpClient.get(`${API_GET_MY_DEBT_ACCOUNT}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            }
        )
    }
    static checkInfoContact(contactId) {
        return HttpClient.get(`${API_CHECK_INFO_CONTACT_BY_ID}/${contactId}`,
            { params: { date: new Date().getMilliseconds() } })
    }

    static getBankTransferInfo() {
        return HttpClient.get(`${API_GET_BANK_TRANSFER_INFO}`,
            { params: { date: new Date().getMilliseconds() } })
    }
    static getConfigInsuranceEnabled(){
        return HttpClient.get(API_GET_CONFIG_INSURANCE_ENABLE)
    }
}

export default Service