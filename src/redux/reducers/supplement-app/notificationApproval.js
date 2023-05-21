import {
    ACTION_LOAD_LIST_NOTIFICATION_PENDING
  } from '../../actions/supplement-app/notificationApproval'
  
  
  const initialState = {
      notificationPending: []
  }
  
 export const notificationApproval = (state = initialState, action) => {
      switch (action.type) {
          case ACTION_LOAD_LIST_NOTIFICATION_PENDING:
              return {
                  ...state,
                  notificationPending: action.payload
              }
          default:
              return state
      }
  }
  
  export default notificationApproval
