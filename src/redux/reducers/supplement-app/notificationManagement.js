import { ACTION_LOAD_INFO_NOTIFICATION } from "../../actions/supplement-app/notificationManagement"
  const initialState = {
      notificationInfo: []
  }
  
 export const notificationManagement = (state = initialState, action) => {
      switch (action.type) {
          case ACTION_LOAD_INFO_NOTIFICATION:
              return {
                  ...state,
                  notificationData: action.payload
              }
          default:
              return state
      }
  }
  
  export default notificationManagement
