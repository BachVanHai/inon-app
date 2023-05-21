import { BaseAppUltils, HttpClient } from 'base-app'
import {
  API_APPROVE_WAITING_PARTNER,
  API_CHECK_USER_EXIST,
  API_GET_USER_WAITING_APPROVE,
  API_GET_USER_WAITING_APPROVE_SUGGESTIONS,
  API_REJECT_WAITING_PARTNER,
  API_PARTNER_OG,
  API_USERS,
  API_USER_APPROVAL,
  API_USERS_SUGGESTIONS,
  API_GET_INSURANCE_LIST_BY_COMPANY,
  API_INSURANCE_SETTINGS,
  API_CHANGE_USER_STATUS, API_USERS_EXPORT_REPORT, API_USERS_IMPORT_USERS, API_DOWNLOAD_RESULT_FILE
} from '../../configs/app-no1'

class AccountService {
  static getAccounts({ pageNumber, pageSize, sort, searchIds, searchGroupIds }) {
    return HttpClient.get(API_USERS, {
      params: {
        page: pageNumber,
        size: pageSize,
        sort,
        searchIds,
        searchGroupIds,
        date: new Date().getMilliseconds()
      },
      timeout : 60 * 60 * 1000
    })
  }

  static getAccountSuggestions() {
    return HttpClient.get(API_USERS_SUGGESTIONS)
  }

  static getWaitingApproveUsers({ pageNumber, pageSize, sort, searchIds }) {
    return HttpClient.get(API_GET_USER_WAITING_APPROVE, {
      params: {
        page: pageNumber,
        size: pageSize,
        sort,
        searchIds,
        date: new Date().getMilliseconds()
      }
    })
  }

  static getWatingApproveSuggestions() {
    return HttpClient.get(API_GET_USER_WAITING_APPROVE_SUGGESTIONS, {
      isBackgroudRequest: true
    })
  }

  static getInsuranceList(companyId) {
    return HttpClient.get(`${API_GET_INSURANCE_LIST_BY_COMPANY}/${companyId}`, {
      isBackgroudRequest: true
    })
  }

  static approveWaitingPartner(partnerId) {
    return HttpClient.post(`${API_APPROVE_WAITING_PARTNER}/${partnerId}`)
  }

  static rejectWaitingPartner(partnerId) {
    return HttpClient.post(`${API_REJECT_WAITING_PARTNER}/${partnerId}`)
  }

  static updatePartnerOG(values) {
    return HttpClient.put(`${API_PARTNER_OG}`, values)
  }

  static createNewAccount(values) {
    return HttpClient.post(`${API_USERS}`, values)
  }

  static getAccount(username) {
    return HttpClient.get(`${API_USERS}/${username}`, {
      params: { date: new Date().getMilliseconds() }
    })
  }

  static updateAccount(values) {
    return HttpClient.put(`${API_USERS}`, values)
  }

  static deleteAccount(id) {
    return HttpClient.delete(`${API_USERS}/${id}`)
  }

  static approveAccount(username, isApproved) {
    return HttpClient.put(`${API_USER_APPROVAL}/${username}`, null, {
      params: { isApproved }
    })
  }

  static changeAccountStatus(username, status) {
    return HttpClient.put(`${API_CHANGE_USER_STATUS}/${username}`, null, {
      params: { status }
    })
  }

  static updateInsuranceSettings(values) {
    return HttpClient.post(`${API_INSURANCE_SETTINGS}`, values)
  }

  static async getInsuranceSettings(userId) {
    const res = await HttpClient.get(`${API_INSURANCE_SETTINGS}/${userId}`, {params : {uuid : BaseAppUltils.generateUUID()}})
    if (res.status === 200) {
      return res.data
    }
    return []
  }

  static async checkUserExistByPhoneNumber(phoneNumber) {
    const res = await HttpClient.get(`${API_CHECK_USER_EXIST}/${phoneNumber}`)
    if (res.status === 200) {
      return res.data
    }
  }

  static exportReport(exportFields){
    return HttpClient.post(`${API_USERS_EXPORT_REPORT}`, JSON.stringify({exportFields}), {responseType: 'blob',  timeout : 60 * 60 * 1000})
  }

  static importExcelUsers(formData) {
    return HttpClient.post(`${API_USERS_IMPORT_USERS}`, formData)
  }

  static downloadResultFile(usersExcelDTOS) {
    return HttpClient.post(`${API_DOWNLOAD_RESULT_FILE}`, JSON.stringify({usersExcelDTOS}), {responseType: 'blob'})
  }
}

export default AccountService
