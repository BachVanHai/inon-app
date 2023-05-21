import NotificationService from "../../../services/supplement-app/notification"

export const ACTION_LOAD_LIST_NOTIFICATION_PENDING = "ACTION_LOAD_LIST_NOTIFICATION_PENDING"
export const getListNotificationPending = () =>{
      return async (dispatch) => {            
            const res = await NotificationService.getNotificationPending()
            if (res.status === 200) {
                let data = res.data || []
               dispatch({
                     type : ACTION_LOAD_LIST_NOTIFICATION_PENDING,
                     payload : data || {}
               })
            }
            else{
                  return
            }
        }
}
