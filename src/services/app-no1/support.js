import { BaseAppUltils, HttpClient } from 'base-app'
import { API_ADD_FILE_INFO_HC_USER, API_ADD_FILE_INFO_USER, API_ADD_FILE_SUPPORT, API_CREATE_PERMISSION, API_CREATE_REQUEST_USER, API_CREATE_USER_SUPPORT_USER, API_GET_ALL_MY_SUPPORT, API_GET_ALL_PERMISSION, API_GET_ALL_SUPPORT_MANAGEMENT, API_GET_DEPARTMANT_BY_TYPE, API_GET_ONE_SUPPORT, API_GET_PERMISSION_BY_ID, API_READER_MESSAGE, API_UPDATE_PERMISSION, API_UPDATE_SUPPORT_PRIVATE, API_UPDATE_SUPPORT_PUBLIC, API_UPDATE_USER_SUPPORT, API_USERS, API_USER_GROUP_AUTHENTICATE } from '../../configs/app-no1'

class SupportService {
  static getAllRequest() {
    return HttpClient.get(`${API_GET_ALL_SUPPORT_MANAGEMENT}`)
  }
  static getAllMyRequest() {
    return HttpClient.get(`${API_GET_ALL_MY_SUPPORT}`)
  }
  static getAllPermission() {
    return HttpClient.get(`${API_GET_ALL_PERMISSION}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static getDepartmentByType(type) {
    return HttpClient.get(`${API_GET_DEPARTMANT_BY_TYPE}/${type}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static createUserSupport(user) {
    return HttpClient.post(`${API_CREATE_USER_SUPPORT_USER}`, user, {
      isBackgroundRequest: true
    })
  }
  static createRequest(request) {
    return HttpClient.post(`${API_CREATE_REQUEST_USER}`, request)
  }
  static addFile(formData) {
    return HttpClient.post(`${API_ADD_FILE_SUPPORT}`, formData)
  }
  static addMessageForRoomChat(formData) {
    return HttpClient.post(`${API_ADD_FILE_INFO_HC_USER}`, formData)
  }
  static createPermission(data) {
    return HttpClient.post(`${API_CREATE_PERMISSION}`, data)
  }
  static updateRequest(id, data) {
    return HttpClient.put(`${API_UPDATE_SUPPORT_PRIVATE}/${id}`, data ,  {
      isBackgroudRequest: true
    })
  }
  static updateRequestPublic(id, data) {
    return HttpClient.put(`${API_UPDATE_SUPPORT_PUBLIC}/${id}`, data)
  }
  static updateUserSupport(id, user) {
    return HttpClient.put(`${API_UPDATE_USER_SUPPORT}/${id}`, user)
  }
  static updatePermission(id, user) {
    return HttpClient.put(`${API_UPDATE_PERMISSION}/${id}`, user)
  }
  static getInfoRequest(id) {
    return HttpClient.get(`${API_GET_ONE_SUPPORT}/${id}`, { isBackgroudRequest: true })
  }
  static getPermissionById(id) {
    return HttpClient.get(`${API_GET_PERMISSION_BY_ID}/${id}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static deletePermissionById(id, data) {
    return HttpClient.put(`${API_GET_PERMISSION_BY_ID}/${id}`, data)
  }
  //GET ACCOUNT
  static getAccountSuggestions() {
    return HttpClient.get(API_USERS, { params: { size: 99999 }, isBackgroudRequest: true })
  }
  static getUserGroupAuthenticate() {
    return HttpClient.get(`${API_USER_GROUP_AUTHENTICATE}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static readerMessage(message){
    return HttpClient.post(`${API_READER_MESSAGE}`,message)
  }
}

export default SupportService