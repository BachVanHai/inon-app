import { ACTION_GET_ALL_PERMISSION } from "../../actions/app-no1/permissionManagement"

const initialState = {
    availablePermission: [],
  }
  
  const myRequestManagementReducers = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_GET_ALL_PERMISSION:
        return { ...state, availablePermission: action.payload }
      default:
        return state
    }
  }
  
  export default myRequestManagementReducers