import { ACTION_GET_ALL_MY_REQUEST } from "../../actions/app-no1/myRequestManagement"

const initialState = {
    availableMyRequest: [],
  }
  
  const myRequestManagementReducers = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_GET_ALL_MY_REQUEST:
        return { ...state, availableMyRequest: action.payload }
      default:
        return state
    }
  }
  
  export default myRequestManagementReducers