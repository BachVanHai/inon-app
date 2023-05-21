import { HttpClient } from 'base-app'
import * as API from '../../configs/insurance-app'
import { getBasePath } from '../../ultity'

class Insurance {
    /* this below function is just an alternate option for update company id api. It's not conflict with other one */
    static update_companyId(values) {
        return HttpClient.put(`${getBasePath(API.NAME_BUY_INSURANCES_MOTOR)}${API.API_CONTRACTS_COMPANY_ID}`, values)
    }

    static updateCompanyId(values) {
        return HttpClient.put(`${API.API_UPDATE_CONTRACT}`, values)
    }

    static checkInfoVehicleByIcNum(idNum) {
        return HttpClient.get(`${API.API_CHECK_INFO_BY_ID}${idNum}`, { params: { date: new Date().getMilliseconds() } })
    }

    static checkInfoVehicle(idNum) {
        return HttpClient.get(`${API.API_CHECK_NUMBERPLATE}${idNum}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getCity() {
        return HttpClient.get(`${API.API_GET_CITI}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getWard() {
        return HttpClient.get(`${API.API_GET_WARD}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getDistrict() {
        return HttpClient.get(`${API.API_GET_DISTRICTS}`, { params: { date: new Date().getMilliseconds() } })
    }

    static createContract(values) {
        return HttpClient.post(`${API.API_CREATE_CONSTRACT}`, values)
    }

    static createVehicle(values) {
        return HttpClient.post(`${API.API_CREATE_VEHICLE}`, values)
    }

    static updateInsurance(values) {
        return HttpClient.put(`${API.API_UPDATE_INSURANCE}`, values)
    }

    static updateVehicle(values) {
        return HttpClient.put(`${API.API_CREATE_VEHICLE}`, values)
    }

    static getTypeMotor() {
        return HttpClient.get(`${API.API_GET_TYPE}`, {
            params: {
                date: new Date().getMilliseconds()
            },
            isBackgroundRequest: true,
        })
    }

    static updateContract(contractInfo) {
        return HttpClient.put(`${API.API_UPDATE_CONTRACT}`, contractInfo)
    }

    static getManufacturers() {
        return HttpClient.get(`${API.API_GET_MANUFACTURERS}`,
            {
                params: { date: new Date().getMilliseconds() },
                isBackgroundRequest: true,
            })
    }

    static checkInfoContract(idNum) {
        return HttpClient.get(`${API.API_CHECK_CONTACT}${idNum}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getContract(idNum) {
        return HttpClient.get(`${API.API_GET_CONTRACT}${idNum}`)
    }

    static getFee(contractId) {
        // console.log(new Date().getMilliseconds())
        return HttpClient.get(`${API.API_GET_FEE}${contractId}`, { params: { date: new Date().getMilliseconds() } })
    }

    static createContact(contactInfo) {
        return HttpClient.post(`${API.API_CREATE_CONTACT}`, contactInfo)
    }

    static getContact(idNum) {
        return HttpClient.get(`${API.API_GET_CONTACT}${idNum}`)
    }

    static pay(contractId, payInfo) {
        return HttpClient.post(`${API.API_PAY_CONSTRACT}/${contractId}`, payInfo)
    }

    static completeConstract(values) {
        return HttpClient.put(`${API.API_COMPLETE_CONSTRACT}`, values)
    }

    static getContactById(id, values) {
        return HttpClient.get(`${API.API_GET_CONTACT_BY_CONTRACTID}/${id}`, values)
    }

    static approvedConstract(values) {
        return HttpClient.put(`${API.API_APPROVED_CONSTRACT}`, values)
    }

    static getContractInfo(contractId) {
        return HttpClient.get(`${API.API_GET_CONSTRACT}/${contractId}`,
            {
                params: {
                    date: new Date().getMilliseconds()
                },
                isBackgroundRequest: true
            })
    }

    static getContractMotoPendeing() {
        return HttpClient.get(`${API.API_GET_CONSTRACTS_MOTOR_PENDING}`)
    }

    static getContractMotoAllPending() {
        return HttpClient.get(`${API.API_GET_CONSTRACTS_MOTO_ALL}`)
    }

    static gettAllBanks() {
        return HttpClient.get(`${API.API_GET_BANK_COMPANY}`,
            {
                isBackgroundRequest: true
            })
    }

    static confirmContract(info) {
        return HttpClient.post(`${API.API_CONFIRM_CONSTRACT}`, info, { isBackgroundRequest: true })
    }

    static getContractsMotorAll(values) {
        return HttpClient.get(`${API.API_GET_CONSTRACTS_MOTO_ALL}?${values}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getContractsMotorPers(values) {
        return HttpClient.get(`${API.API_GET_CONSTRACTS_MOTO_PERS}?${values}`, { params: { date: new Date().getMilliseconds() } })
    }

    static checkEnoughBonusPointValue(totalFeeIncludVAT) {
        return HttpClient.post(`${API.API_CHECK_ENOUGH_BONUS_POINT}`, {
            totalFeeIncludVAT
        })
    }
    static getCompany(){
        return HttpClient.get(API.API_GET_COMPANY)
    }
}

export default Insurance