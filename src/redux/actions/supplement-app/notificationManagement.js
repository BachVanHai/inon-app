import NotificationService from "../../../services/supplement-app/notification"
export const ACTION_LOAD_INFO_NOTIFICATION = "ACTION_LOAD_INFOL_NOTIFICATION"
export const loadInfoNotification = (id) => {
      return async (dispatch) => {
          const res = await NotificationService.getAllNotification(id)
          if (res.status === 200) {
              let data = res.data || []
             dispatch({
                   type : ACTION_LOAD_INFO_NOTIFICATION,
                   payload : data || {}
             })
          }
          else{
              return
          }
      }
  }
