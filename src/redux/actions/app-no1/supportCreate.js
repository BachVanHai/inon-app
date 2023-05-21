import SupportService from "../../../services/app-no1/support"

export const ACTION_GET_ALL_ACCOUNT = "ACTION_GET_ALL_ACCOUNT"
export const ACTION_GET_ALL_USER_GROUP = "ACTION_GET_ALL_USER_GROUP"

export const actionGetALlAccount = () =>{
    return async (dispatch) =>{
        const res  = await SupportService.getAccountSuggestions()
        if (res.status === 200) {
            dispatch({
                type : ACTION_GET_ALL_ACCOUNT ,
                payload : res.data || []
            })
        }
    }
}

export const actionGetUserGroup = () =>{
    return async (dispatch) =>{
        const res  = await SupportService.getUserGroupAuthenticate()
        if (res.status === 200) {
            dispatch({
                type : ACTION_GET_ALL_USER_GROUP ,
                payload : res.data || []
            })
        }
    }
}