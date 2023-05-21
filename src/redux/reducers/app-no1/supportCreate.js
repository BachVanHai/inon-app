import { ACTION_GET_ALL_ACCOUNT, ACTION_GET_ALL_USER_GROUP } from "../../actions/app-no1/supportCreate"

const initialState = {
    availableAccount: [],
    availableUserGroup : []
  }
  
  const createRequestReducers = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_GET_ALL_ACCOUNT:
        return { ...state, availableAccount: action.payload }
        case ACTION_GET_ALL_USER_GROUP:
            return { ...state, availableUserGroup: action.payload }
      default:
        return state
    }
  }
  
  export default createRequestReducers
  