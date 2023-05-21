import HelpCenterSevice from "../../../services/app-no1/helpCenter"

export const ACTION_GET_CHTG_QUESTION = "ACTION_GET_CHTG_QUESTION"
export const ACTION_GET_HDSD_QUESTION = "ACTION_GET_HDSD_QUESTION"
export const ACTION_GET_TLNV_QUESTION = "ACTION_GET_TLNV_QUESTION"
export const ACTION_GET_CATEGORY_QUESTION = 'ACTION_GET_CATEGORY_QUESTION'

export const loadAllQuestion  = () =>{
    return async (dispatch) =>{
        const res  = await HelpCenterSevice.GetAllQuestionManagement()
        if(res.status === 200){
            const HDSD = res.data.HDSD
            const CHTG = res.data.CHTG
            const TLNV = res.data.TLNV
            dispatch({
                type : ACTION_GET_CHTG_QUESTION , 
                 payload : CHTG || []
            })
            dispatch({
                type : ACTION_GET_HDSD_QUESTION , 
                 payload : HDSD || []
            })
            dispatch({
                type : ACTION_GET_TLNV_QUESTION , 
                 payload : TLNV || []
            })
             return true
        }
        else{
            return false
        }
    }
}


export const getAllCategoryQuestion = (type) => {
    return async (dispatch) => {
      const res = await HelpCenterSevice.GetAllCatagoriesQuestion()
      if (res.status === 200) {
        const categoriesFilter = res.data.content.filter(category =>{
            return category.categoryQuestionType === type
        })
        dispatch({
          type: ACTION_GET_CATEGORY_QUESTION,
          payload: categoriesFilter || []
        })
        return true
      }
      else{
        return false
      }
    }
  }


