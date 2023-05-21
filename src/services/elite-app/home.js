import { HttpClient } from 'base-app'
import { API_GET_ROLES } from '../../configs/elite-app'

class UserGroupService {
  static getRoles() {
    return HttpClient.get(API_GET_ROLES)
  }
}

export default UserGroupService
