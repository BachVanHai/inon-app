import HelpCenterSevice from '../../../services/app-no1/helpCenter'

export const ACTION_GET_CATEGORY_QUESTION = 'ACTION_GET_CATEGORY_QUESTION'
export const ACTION_LOAD_LIST_ACCOUNTS_PENDING =
  'ACTION_LOAD_LIST_ACCOUNTS_PENDING'
export const ACTION_LOAD_USER_GROUP_AUTHENTICATE =
  'ACTION_LOAD_USER_GROUP_AUTHENTICATE'

export const getAllCategoryQuestion = () => {
  return async (dispatch) => {
    const res = await HelpCenterSevice.GetAllCatagoriesQuestion()
    if (res.status === 200) {
      dispatch({
        type: ACTION_GET_CATEGORY_QUESTION,
        payload: res.data.content || []
      })
      return true
    }
    else{
      return false
    }
  }
}
export const loadUserGroupAuthenticate = () => {
  return async (dispatch) => {
    const res = await HelpCenterSevice.getUserGroupAuthenticate()
    if (res.status === 200) {
      let data = res.data || []
      dispatch({
        type: ACTION_LOAD_USER_GROUP_AUTHENTICATE,
        payload: data
      })
      return true
    }
    else{
      return false
    }
  }
}
