import HelpcenterService from "../../../../services/elite-app/helpCenter"

export const ACTION_GET_QUESTION_PUBLIC = 'ACTION_GET_QUESTION_PUBLIC'

export const loadQuestionPublic = () =>{
    return async (dispatch) =>{
        const res = await HelpcenterService.getAllQuetionPublic()
        if(res.status === 200){
            dispatch({
                type : ACTION_GET_QUESTION_PUBLIC ,
                payload : res.data
            })
        }
    }
}