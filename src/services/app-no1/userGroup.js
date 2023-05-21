import { HttpClient } from 'base-app'
import {
  API_GET_USER_ROLES,
  API_UPDATE_USER_GROUP_ROLES,
  API_USER_GROUPS,
  API_GET_ACCOUNT_IN_GROUP,
  API_GET_CREATABLE_USER_GROUPS, API_GET_ALL_ROLES
} from '../../configs/app-no1'

class UserGroupService {
  static getRoles() {
    return HttpClient.get(API_GET_ALL_ROLES, {params : {date : new Date().getMilliseconds()}})
  }

  static getUserGroups() {
    return HttpClient.get(`${API_USER_GROUPS}`, {params : {date : new Date().getMilliseconds()}})
  }

  static getAccountInGroup(userGroupId) {
    return HttpClient.get(`${API_GET_ACCOUNT_IN_GROUP}/${userGroupId}`, {params : {date : new Date().getMilliseconds()}})
  }

  static createUserGroup(userGroup) {
    return HttpClient.post(`${API_USER_GROUPS}`, userGroup)
  }

  static updateUserGroup(userGroup) {
    return HttpClient.put(`${API_USER_GROUPS}`, userGroup)
  }

  static updateUserGroupRoles(userGroupId, userGroupRoles) {
    return HttpClient.post(
      `${API_UPDATE_USER_GROUP_ROLES}/${userGroupId}`,
      userGroupRoles
    )
  }

  static getUserGroup(groupId) {
    return HttpClient.get(`${API_USER_GROUPS}/${groupId}`, {params : {date : new Date().getMilliseconds()}})
  }

  static getUserRoles(groupId) {
    return HttpClient.get(`${API_GET_USER_ROLES}/${groupId}`, {params : {date : new Date().getMilliseconds()}})
  }

  static deleteUserGroup(groupId) {
    return HttpClient.delete(`${API_USER_GROUPS}/${groupId}`)
  }
  

  static getCreatableUserGroup() {
    return HttpClient.get(`${API_GET_CREATABLE_USER_GROUPS}`, {params : {date : new Date().getMilliseconds()}})
  }
}

export default UserGroupService
