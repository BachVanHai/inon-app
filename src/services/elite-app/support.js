import { HttpClient } from 'base-app'
import { API_ADD_FILE_INFO_HC_PUBLIC, API_CREATE_REQUEST_PUBLIC, API_CREATE_USER_SUPPORT_PUBLIC, API_ADD_FILE_SUPPORT } from '../../configs/elite-app'

const API_GET_ONE_SUPPORT = "/nth/utilities/api/hc-support-books"
class SupportService {
  static createUserSupport(user) {
    return HttpClient.post(`${API_CREATE_USER_SUPPORT_PUBLIC}`, user, {
      isBackgroundRequest: true
    })
  }
  static createRequest(request) {
    return HttpClient.post(`${API_CREATE_REQUEST_PUBLIC}`, request)
  }
  static addFile(formData) {
    return HttpClient.post(`${API_ADD_FILE_SUPPORT}`, formData, {
      isBackgroudRequest: true
    })
  }
  static addMessageForRoomChat(formData) {
    return HttpClient.post(`${API_ADD_FILE_INFO_HC_PUBLIC}`, formData)
  }
  static getInfoRequest(id) {
    return HttpClient.get(`${API_GET_ONE_SUPPORT}/${id}`, { isBackgroudRequest: true })
  }
}

export default SupportService