import { HttpClient } from 'base-app'
import {
  API_CONFIRM_PAYMENT_PERSONAL_MULTIPE,
  API_CREATE_CONTRACT_PERSONAL_HOME_MULTIPLE,
  API_PAYMENT_HOME_PERSONAL_MULTIPLE,
  API_READ_FILE_EXEL_PERSONAL_HOME_MULTIPLE,
  API_UPDATE_PAYMENT_TYPE
} from '../../configs/insurance-app'

export const buyInsurancePersonHomeMultipleService = {
  readFileExel(formData) {
    return HttpClient.post(API_READ_FILE_EXEL_PERSONAL_HOME_MULTIPLE, formData)
  },
  createCOntract(insurance) {
    return HttpClient.post(API_CREATE_CONTRACT_PERSONAL_HOME_MULTIPLE, {
      homeInsuranceExcels: insurance
    })
  },
  payment(payInfo) {
    console.log(console.log(payInfo));
    return HttpClient.post(API_PAYMENT_HOME_PERSONAL_MULTIPLE,payInfo)
  },
  confirmPayment(url){
    return HttpClient.post(API_CONFIRM_PAYMENT_PERSONAL_MULTIPE , url)
  },
  updatePaymentType(contract) {
    return HttpClient.put(API_UPDATE_PAYMENT_TYPE , contract)
  }
}
