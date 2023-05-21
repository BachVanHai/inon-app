import BonusService from '../../../services/supplement-app/bonus'
import NotificationService from '../../../services/supplement-app/notification'

export const ACTION_LOAD_LIST_ALL_NOTIFICATION = 'ACTION_LOAD_ALL_NOTIFICATION'
export const ACTION_LOAD_ALL_TYPE_NOTIFICATION = 'ACTION_LOAD_ALL_TYPE_NOTIFICATION'
export const ACTION_LOAD_ALL_ACCOUNTS = "ACTION_LOAD_ALL_ACCOUNTS"
export const ACTION_LOAD_INFO_NOTIFICATION = "ACTION_LOAD_INFO_NOTIFICATION" 
export const ACTION_LOAD_USER_GROUP_AUTHENTICATE = "ACTION_LOAD_USER_GROUP_AUTHENTICATE"

export const loadListSuggestion = () => {
    return async (dispatch) => {
        const res = await BonusService.getAccountSuggestions()
        if (res.status === 200) {
            let data = res.data || []
            dispatch({
                type: ACTION_LOAD_ALL_ACCOUNTS,
                payload: {
                    data
                } || {}
            })
        }
        else{
            return
        }
    }
}


export const loadAllNotification = () => {
    return async (dispatch) => {
        const res = await NotificationService.getAllNotification()
        
        if (res.status === 200) {
            let data = res.data || []
           dispatch({
                 type : ACTION_LOAD_LIST_ALL_NOTIFICATION,
                 payload : data || {}
           })
        }
        else{
            return
        }
    }
}

export const loadALllTypeNotification = () =>{
    return async (dispatch)  =>{
        const res = await NotificationService.getAllTypeNotification()
        if(res.status === 200){
            let data = res.data  || []
            dispatch({
                type : ACTION_LOAD_ALL_TYPE_NOTIFICATION,
                payload : data
            })
        }else{
            return
        }
    }
}



export const loadInfoNotification = (id) =>{
    return async (dispatch)  =>{
        const res = await NotificationService.getInfoNotificaion(id)
        if(res.status === 200){
            let data = res  || []
            dispatch({
                type : ACTION_LOAD_INFO_NOTIFICATION,
                payload : data
            })
        }
        else{
            return
        }

    }
}

export const loadUserGroupAuthenticate = () =>{
    return async (dispatch) =>{
        const res = await NotificationService.getUserGroupAuthenticate()
        if (res.status === 200) {
            let data = res.data || []
            dispatch({
                type : ACTION_LOAD_USER_GROUP_AUTHENTICATE,
                payload : data
            })
        }
        else{
            return
        }
    }
}
