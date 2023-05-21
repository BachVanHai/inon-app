import { BaseAppUltils, HttpClient } from 'base-app'
import { API_CREATE_EVOUCHER, API_GET_ALL_EVOUCHER ,API_REJECT_EVOUCHER  , API_GET_ALL_PRODUCT_EVOUCHER , API_UPDATE_EVOUCHER ,API_FINISH_EVOUCHER ,API_ACTIVED_EVOUCHER  , API_GET_INFO_EVOUCHER ,API_GET_INSURANCE_CONFIG_TEMPLATE, API_DOWNLOAD_PROMOTION, API_GET_ALL_COMPANY_EVOUCHER, API_GET_ALL_INSURANCE_COMPANIES, API_DELETE_PROMOTION } from '../../configs/supplement-app'

class EvoucherService {
  static getAllEvoucher() {
    return HttpClient.get(API_GET_ALL_EVOUCHER ,  {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static getInfoEvoucher(id) {
    return HttpClient.get(`${API_GET_INFO_EVOUCHER}/${id}` ,  {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static getAllProductApplyForEvoucher() {
    return HttpClient.get(API_GET_ALL_PRODUCT_EVOUCHER ,{
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true


    })
  }
  static createEvoucher(data) {
    return HttpClient.post(API_CREATE_EVOUCHER , data)
  }
  static getCompanyById(id){
    return HttpClient.get(`${API_GET_ALL_COMPANY_EVOUCHER}?insuranceId=${id}`,
    {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    }
    )
  }
  static getAllCompanies(){
    return HttpClient.get(API_GET_ALL_INSURANCE_COMPANIES)
  }
  static approvalEvoucher(id) {
    return HttpClient.put(`${API_ACTIVED_EVOUCHER}` , {promotionId : id})
  }
  static rejectEvoucher(data) {
    return HttpClient.put(`${API_REJECT_EVOUCHER}` , data)
  }
  static updateEvoucher(id,data) {
    return HttpClient.put(`${API_UPDATE_EVOUCHER}/${id}` , data)
  }
  static finishEvoucher(id) {
    return HttpClient.put(`${API_FINISH_EVOUCHER}` , {promotionId : id})
  }
  static getInsuraceConfigTemplate(insuranceType,insuranceCompany) {
    return HttpClient.get(`${API_GET_INSURANCE_CONFIG_TEMPLATE}?insuranceType=${insuranceType}&insuranceCompany=${insuranceCompany}`, {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static downloadEvoucher(id){
    return HttpClient.get(`${API_DOWNLOAD_PROMOTION}?promotionId=${id}` ,{
      responseType: 'arraybuffer'
    })
  }
  static deleteEvoucher(id){
    return HttpClient.delete(`${API_DELETE_PROMOTION}/${id}`)
  }
}
export default EvoucherService
