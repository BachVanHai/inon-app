import { ACTION_LOAD_LIST_ALL_NOTIFICATION  ,ACTION_LOAD_ALL_TYPE_NOTIFICATION ,ACTION_LOAD_ALL_ACCOUNTS ,ACTION_LOAD_INFO_NOTIFICATION , ACTION_LOAD_USER_GROUP_AUTHENTICATE} from '../../actions/supplement-app/notificationCreate'

const initialState = {
  availableNotification: [],
  availableTypeNotification : [],
  availableAccountSuggest : [],
  availableUserGroupAuthenticate : [],
  infoNotification : {}
}

const NotificationCreate = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_LIST_ALL_NOTIFICATION:
      return {
        ...state,
        availableNotification: action.payload
      }
      case ACTION_LOAD_ALL_TYPE_NOTIFICATION:
        return{
          ...state , availableTypeNotification : action.payload
        }
      case ACTION_LOAD_ALL_ACCOUNTS:
        return{
          ...state , availableAccountSuggest : action.payload.data
        }
      case ACTION_LOAD_INFO_NOTIFICATION:
        return{
          ...state , infoNotification : action.payload
        }
      case ACTION_LOAD_USER_GROUP_AUTHENTICATE :
        return {
          ...state ,
          availableUserGroupAuthenticate : action.payload
        }
    default:
      return state
  }
}


export default NotificationCreate
