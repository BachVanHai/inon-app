import { ACTION_GET_ALL_REQUEST } from "../../actions/app-no1/supportManagement"

const initialState = {
    availableRequest: [],
  }
  
  const managementRequestReducers = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_GET_ALL_REQUEST:
        return { ...state, availableRequest: action.payload }
      default:
        return state
    }
  }
  
  export default managementRequestReducers
  