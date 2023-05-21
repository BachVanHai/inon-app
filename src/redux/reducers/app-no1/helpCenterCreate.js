import {
  ACTION_GET_CATEGORY_QUESTION,
  ACTION_LOAD_LIST_ACCOUNTS_PENDING,
  ACTION_LOAD_USER_GROUP_AUTHENTICATE
} from '../../actions/app-no1/helpCenterCreate'

const initialState = {
  categoryQuestion: [],
  availabelAccoutPedding: [],
  availableUserGroupAuthenticate : []
}

const helpCenterCreateReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_CATEGORY_QUESTION:
      return { ...state, categoryQuestion: action.payload }
    case ACTION_LOAD_LIST_ACCOUNTS_PENDING:
      return { ...state, availabelAccoutPedding: action.payload }
      case ACTION_LOAD_USER_GROUP_AUTHENTICATE :
        return {
          ...state ,
          availableUserGroupAuthenticate : action.payload
        }
    default:
      return state
  }
}

export default helpCenterCreateReducers
