import SupportService from "../../../services/app-no1/support"
import { isArrayEmpty } from "../../../ultity"

export const ACTION_GET_ALL_REQUEST = "ACTION_GET_ALL_REQUEST"

export const actionGetAllRequest = (user) =>{
    return async (dispatch) =>{
        const res = await SupportService.getAllRequest()
        if (res.status === 200) {
            let data = res.data || []
            const newData = data.map(_elt =>{
            //sort message list by id
            const dataSort = _elt?.hcMessageDTOList.length !== 0 ? _elt?.hcMessageDTOList.sort((a,b) => b.id - a.id) : []
            //check user reader message 
            const lastMessage = !isArrayEmpty(dataSort) ? dataSort[0] : []
            const userReadedMessage = !isArrayEmpty(_elt?.hcMessageDTOList) && lastMessage?.readerId !== null ? lastMessage?.readerId.split(",") : [] 
            const hashUserReader = userReadedMessage !== undefined || !isArrayEmpty(userReadedMessage) ? userReadedMessage.filter(_elt =>{
              return _elt.toString() === user?.id.toString()
            }) : []
            return {
                ..._elt,
                hcMessageDTOList : dataSort,
                statusReader : hashUserReader.length > 0 ? true : false
            }
            })
            dispatch({
                type : ACTION_GET_ALL_REQUEST,
                payload : newData || []
            })   
        }
    }
}