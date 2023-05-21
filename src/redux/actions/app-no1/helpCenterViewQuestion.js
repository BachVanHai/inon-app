import HelpcenterService from "../../../services/elite-app/helpCenter"

export const ACTION_GET_QUESTION_PUBLIC = 'ACTION_GET_QUESTION_PUBLIC'

export const loadQuestionPublic = (type,applyFor) =>{
    return async (dispatch) =>{
        const res = await HelpcenterService.getAllQuetionPublic(type,applyFor)
        if(res.status === 200){
            const data = res.data ||[]
            dispatch({
                type : ACTION_GET_QUESTION_PUBLIC ,
                payload : data
            })
        }
    }
}