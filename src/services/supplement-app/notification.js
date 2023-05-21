import {
  API_GET_ALL_TYPE_NOTIFICATION,
  API_GET_ALL_NOTIFICATION,
  API_APPROVAL_NOTIFICATION,
  API_GET_ALL_NOTIFICATION_REJECTED,
  API_DELETE_NOTIFICATION,
  API_CREATE_NOTIFICATION,
  API_SAVE_DRAFT_NOTIFICATION,
  API_EDIT_NOTIFICATION,
  API_INFO_NOTIFICATION,
  API_USER_GROUP_AUTHENTICATE
} from '../../configs/supplement-app'
import { BaseAppUltils, HttpClient } from 'base-app'

class NotificationService {
  static getAllNotification() {
    return HttpClient.get(`${API_GET_ALL_NOTIFICATION}?size=99999`, {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static getNotificationPending = () => {
    return HttpClient.get(
      `${API_GET_ALL_NOTIFICATION_REJECTED}?status=NEW`,
      {
        params: { uuid: BaseAppUltils.generateUUID() },
        isBackgroundRequest: true
      }
    )
  }
  static getNotificationRejected = () => {
    return HttpClient.get(
      `${API_GET_ALL_NOTIFICATION_REJECTED}?status=REJECTED`,
      {
        params: { uuid: BaseAppUltils.generateUUID() },
        isBackgroundRequest: true
      }
    )
  }
  static createNotification = (data) => {
    return HttpClient.post(`${API_CREATE_NOTIFICATION}`, data)
  }
  static async approvalNotification(id, status, rejectReason) {
    let opt = {
      id,
      status,
      rejectReason: ''
    }
    if (rejectReason) {
      opt = {
        id,
        status,
        rejectReason
      }
    }
    try {
      const res = await HttpClient.post(`${API_APPROVAL_NOTIFICATION}`, opt)
      if (res.status === 200) {
        return res.data
      }
      return false
    } catch (err) {
      return false
    }
  }
  static deleteNotification = async (id) => {
    try {
      const res = await HttpClient.delete(`${API_DELETE_NOTIFICATION}/${id}`)
      if (res.status === 204) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
  static getAllTypeNotification = async () => {
    return HttpClient.get(`${API_GET_ALL_TYPE_NOTIFICATION}`, {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static saveDraftNotification = (data) => {
    return HttpClient.post(`${API_SAVE_DRAFT_NOTIFICATION}`, data)
  }
  static updateNotification = async (id, data) => {
    try {
      const res = await HttpClient.put(
        `${API_EDIT_NOTIFICATION}/${id}?name=admin&status=NEW`,
        {
          ...data,
          status: 'NEW'
        }
      )
      if (res.status === 200) {
        return res.data
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  static getInfoNotificaion = async (id) => {
    try {
      const res = await HttpClient.get(`${API_INFO_NOTIFICATION}/${id}`, {
        params: { uuid: BaseAppUltils.generateUUID() },
        isBackgroundRequest: true
      })
      if (res.status === 200) {
        return res.data
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  static getUserGroupAuthenticate () {
    return HttpClient.get(`${API_USER_GROUP_AUTHENTICATE}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static disabledNotification = async(id ,data) => {
    try {
      const res = await HttpClient.put(
        `${API_EDIT_NOTIFICATION}/${id}?name=admin&status=TIMEOUT`,
        {
          ...data,
          status: 'TIMEOUT'
        }
      )
      if (res.status === 200) {
        return res.data
      }
      return false
    } catch (error) {
      return false
    }
  }
  static updateDraftNotification = async(id ,data) => {
    try {
      const res = await HttpClient.put(
        `${API_EDIT_NOTIFICATION}/${id}?name=admin&status=DRAFT`,
        {
          ...data,
          status: 'DRAFT'
        }
      )
      if (res.status === 200) {
        return res.data
      }
      return false
    } catch (error) {
      return false
    }
  }
}

export default NotificationService
