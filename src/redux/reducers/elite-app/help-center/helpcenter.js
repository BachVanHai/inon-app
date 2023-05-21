import { ACTION_GET_QUESTION_PUBLIC } from "../../../actions/elite-app/help-center/helpcenter"

const initialState  = {
    questionPublic : []
}

const helpCenterPublicReducers = (state = initialState , action) =>{
    switch (action.type) {
        case ACTION_GET_QUESTION_PUBLIC:
            return {...state , questionPublic : action.payload}
    
        default:
            return state
    }
} 

export default helpCenterPublicReducers