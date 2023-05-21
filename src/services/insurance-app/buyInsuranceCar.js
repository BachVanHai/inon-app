import { HttpClient, BaseAppUltils } from 'base-app'
import * as API from '../../configs/insurance-app'
import { getBasePath } from '../../ultity'
class BuyInsuranceCar {
    static getMinMaxSeatLoadVehicleType(formData) {
        const { inonType, businessStatus } = formData
        return HttpClient.get(`${API.API_VEHICLE_INSUR_MIN_MAX_SEATS_LOADS}`,
            {
                params: {
                    uuid: BaseAppUltils.generateUUID(),
                    businessStatus: businessStatus,
                    inonType: inonType,
                },
                isBackgroundRequest: true
            }
        )
    }

    static updateCompanyId(values) {
        return HttpClient.put(`${getBasePath(API.NAME_BUY_INSURANCES_CAR)}${API.API_CONTRACTS_COMPANY_ID}`, values)
    }

    static checkInfoVehicle(idNum) {
        return HttpClient.get(`${API.API_CHECK_INFO_VEHICLE}/${idNum}`, { params: { date: new Date().getMilliseconds() } })
    }

    static createConstract(values) {
        return HttpClient.post(`${API.API_CREATE_CONSTRACT}`, values)
    }

    static updateConstract(values) {
        return HttpClient.put(`${API.API_CREATE_CONSTRACT}`, values)
    }

    static getConstractInfo(id) {
        return HttpClient.get(`${API.API_GET_CONSTRACT}/${id}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getContactByContractId(id) {
        return HttpClient.get(`${API.API_GET_CONTACT_BY_CONTRACTID}/${id}`, { params: { date: new Date().getMilliseconds() } })
    }

    static createVehicle(values) {
        return HttpClient.post(`${API.API_CREATE_VEHICLE}`, values)
    }

    static updateVehicle(values) {
        return HttpClient.put(`${API.API_CREATE_VEHICLE}`, values)
    }

    static createContact(values) {
        return HttpClient.post(`${API.API_CREATE_CONTACT}`, values)
    }

    static updateContact(values) {
        return HttpClient.put(`${API.API_CREATE_CONTACT}`, values)
    }

    static checkInfoContact(idContact) {
        return HttpClient.get(`${API.API_CHECK_INFO_CONTACT_BY_ID}/${idContact}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getContact(idContact) {
        return HttpClient.get(`${API.API_GET_CONTACT}/${idContact}`, { params: { date: new Date().getMilliseconds() } })
    }

    static updateInsurance(values) {
        return HttpClient.put(`${API.API_UPDATE_INSURANCE}`, values)
    }

    static updateInsuranceAddon(values) {
        return HttpClient.put(`${API.API_UPDATE_INSURANCE_ADDONS}`, values)
    }

    static getCarManufacturers() {
        return HttpClient.get(`${API.API_GET_CAR_MANUFACTURERS}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getAllBank() {
        return HttpClient.get(`${API.API_GET_ALL_BANK}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getCarVehicle() {
        return HttpClient.get(`${API.API_GET_CAR_VEHICLE}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getContractFee(id) {
        return HttpClient.get(`${API.API_GET_CONTRACT_FEE}/${id}`, { params: { date: new Date().getMilliseconds() } })
    }


    static payConstract(id, values) {
        return HttpClient.post(`${API.API_PAY_CONSTRACT}/${id}`, values)
    }

    static completeConstract(values) {
        return HttpClient.put(`${API.API_COMPLETE_CONSTRACT}`, values)
    }

    static approvedConstract(values) {
        return HttpClient.put(`${API.API_APPROVED_CONSTRACT}`, values)
    }

    static getCity() {
        return HttpClient.get(`${API.API_GET_CITY}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getDistricts() {
        return HttpClient.get(`${API.API_GET_DISTRICTS}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getWards() {
        return HttpClient.get(`${API.API_GET_WARDS}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getConstractInfo(id) {
        return HttpClient.get(`${API.API_GET_CONSTRACT}/${id}`, { params: { date: new Date().getMilliseconds() } })
    }
    static getBankTransferInfo() {
        return HttpClient.get(`${API.API_GET_BANK_TRANSFER_INFO}`, { params: { date: new Date().getMilliseconds() } })
    }

    static uploadFile(formData) {
        return HttpClient.post(`${API.API_UPLOAD_FILE}`, formData, {
            headers: { 'Content-Type': undefined }
        })
    }

    static getTemplateVehicleList() {
        return HttpClient.get(`${API.API_GET_VEHICLE_TEMPLATE_LIST}`, { params: { date: new Date().getMilliseconds() } })
    }

    static confirmConstract(values) {
        return HttpClient.post(`${API.API_CONFIRM_CONSTRACT}`, values, { isBackgroundRequest: true })
    }

    static getConfigAccount() {
        return HttpClient.get(`${API.API_GET_CONFIG_ACCOUNT}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getConfigFeeBHVC(companyId) {
        if (companyId) {
            return HttpClient.get(`${API.API_VEHICLE_INSURANCEFEE_CONFIG}/${companyId}`,
                { params: { date: new Date().getMilliseconds() } }
            )
        }
        return HttpClient.get(`${API.API_VEHICLE_INSURANCEFEE_CONFIG}`,
            { params: { date: new Date().getMilliseconds() } }
        )
    }

    static getAddTerm(value) {
        return HttpClient.get(`${API.API_GET_ADD_TERMS}/${value}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getMyDebtAccount() {
        return HttpClient.get(`${API.API_GET_MY_DEBT_ACCOUNT}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            }
        )
    }
    static getCompany(){
        return HttpClient.get(API.API_GET_COMPANY)
    }
}

export default BuyInsuranceCar

