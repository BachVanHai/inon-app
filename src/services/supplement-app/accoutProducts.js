import { BaseAppUltils, HttpClient } from 'base-app'
import { API_GET_PARTNER } from '../../configs/insurance-app'
import { API_ACCOUNT_PRODUCTS } from '../../configs/supplement-app'

class AccountProductsService {
  static addAccount(account) {
    return HttpClient.post(`${API_ACCOUNT_PRODUCTS}`, account)
  }
  static getAccount(start, end) {
    return HttpClient.get(
      `${API_ACCOUNT_PRODUCTS}?fromDate=${start}&toDate=${end}`,
      {
        params: { uuid: BaseAppUltils.generateUUID() },
        isBackgroundRequest: true
      }
    )
  }
  static exprotAccount() {
    return HttpClient.post(`${API_ACCOUNT_PRODUCTS}`, {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static searchAccountByTime(start, end) {
    return HttpClient.get(
      `${API_ACCOUNT_PRODUCTS}?fromDate=${start}&toDate=${end}`,
      {
        isBackgroundRequest: true
      }
    )
  }
  static exportAccoutByFileExel(
    fromDate,
    toDate,
    username,
    cifFccOpenDate,
    accFccNo,
    cifFcc,
    ebankPresenterCode,
    ebankCustomerName,
    kycLevelBank,
    ebankCheckInfo,
    ebankDescription,
    ebankAccType,
    month,
    ebankPresenterCodeInOn,
    dataExport
  ) {
    return HttpClient.post(
      `${API_ACCOUNT_PRODUCTS}/export-csv?fromDate=${fromDate}&toDate=${toDate}&name=${username}&cifFccOpenDate=${cifFccOpenDate}&accFccNo=${accFccNo}&cifFcc=${cifFcc}&ebankPresenterCode=${ebankPresenterCode}&ebankCustomerName=${ebankCustomerName}&kycLevelBank=${kycLevelBank}&ebankCheckInfo=${ebankCheckInfo}&ebankDescription=${ebankDescription}&ebankAccType=${ebankAccType}&month=${month}&ebankPresenterCodeInOn=${ebankPresenterCodeInOn}`,
      dataExport,
      {
        responseType: 'arraybuffer'
      }
    )
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
}

export default AccountProductsService
