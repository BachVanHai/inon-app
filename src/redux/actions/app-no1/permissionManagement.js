import SupportService from "../../../services/app-no1/support"
export const ACTION_GET_ALL_PERMISSION = "ACTION_GET_ALL_PERMISSION"

export const getAllPermission = () =>{
    return async (dispatch) =>{
        const res = await SupportService.getAllPermission()
        if (res.status === 200) {
            const data = res.data || []
            dispatch({
                type : ACTION_GET_ALL_PERMISSION,
                payload : data || []
            })
        }
    }
}