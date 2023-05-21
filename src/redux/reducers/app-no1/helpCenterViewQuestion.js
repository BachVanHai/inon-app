import { ACTION_GET_QUESTION_PUBLIC } from "../../actions/app-no1/helpCenterViewQuestion"

const initialState  = {
    questionPublic : []
}

const helpCenterPublicKHCNReducers = (state = initialState , action) =>{
    switch (action.type) {
        case ACTION_GET_QUESTION_PUBLIC:
            return {...state , questionPublic : action.payload}
    
        default:
            return state
    }
} 

export default helpCenterPublicKHCNReducers