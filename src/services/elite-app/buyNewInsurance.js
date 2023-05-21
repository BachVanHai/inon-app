import { HttpClient } from "base-app"
import { API_CONTRACT, API_GET_CAR_VEHICLE, API_GET_CONTRACT_BY_CONTRACT_ID, API_GET_CONTRACT_BY_ID, API_GET_FEE_CONTRACT_RENEWAL, API_INSURANCES, API_INSURANCE_ADDONS, API_VEHICLE ,API_GET_CAR_MANUFACTURERS, API_GET_CONTRACT_BUY_ON_ZALO } from "../../configs/elite-app"
import { API_PAY_CONSTRACT } from "../../configs/elite-app"
import { getDefault_PayObjectContract } from "../../pages/elite-app/buyNewInsurance/utility"
import { updateContractEffectiveDateToAPI } from "../../ultity"

export const buyNewInsurance = {
    getContractById(_ids) {
        return HttpClient.post(API_GET_CONTRACT_BUY_ON_ZALO, {
            "code": _ids
        }, {
            Headers: {
                "appId": "ELITE_APP"
            }
        })
    },
    updateInsuranceConfig(insurance) {
        return HttpClient.put(API_INSURANCES, updateContractEffectiveDateToAPI(insurance))
    },
    getContractByContractId (contractId) {
        return HttpClient.get(`${API_GET_CONTRACT_BY_CONTRACT_ID}${contractId}`)
    },
    updateAddons(addons) {
        return HttpClient.put(API_INSURANCE_ADDONS, addons)
    },
    getFeeContract(contractId) {
        return HttpClient.get(`${API_GET_FEE_CONTRACT_RENEWAL}${contractId}`, {
            params: { date: new Date().getMilliseconds() }
        })
    },
    debt(values) {
        return HttpClient.put(`/nth/contactmanager/api/authenticate/customers`, values)
    },
    updateInitalValue(contractData){
        return HttpClient.put(API_CONTRACT , contractData)
    },
    updateVehicel(vehicelData) {
        return HttpClient.put(API_VEHICLE , vehicelData)
    },
    updateCompanies(contractData) {
        return HttpClient.put(API_CONTRACT , contractData)
    },
    getAllCarType(){
        return HttpClient.get(API_GET_CAR_VEHICLE)
    },
    getCarManufacturers(){
        return HttpClient.get(API_GET_CAR_MANUFACTURERS)
    },
    payConstract(id, values) {
        return HttpClient.post(`${API_PAY_CONSTRACT}/${id}`, values)
    },
    updateOwnerInfo(values){
        return HttpClient.put(`/nth/contactmanager/api/authenticate/customers`, values)
    }
}