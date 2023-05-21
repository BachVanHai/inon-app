import {
  ACTION_GET_CATEGORY_QUESTION,
  ACTION_GET_CHTG_QUESTION,
  ACTION_GET_HDSD_QUESTION,
  ACTION_GET_TLNV_QUESTION
} from '../../actions/app-no1/helpCenterManagement'

const initialState = {
  categoryQuestion: [],
  availableCHTG: [],
  availableHDSD: [],
  availableTLNV: []
}

const helpCenterManagementReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_CHTG_QUESTION:
      return { ...state, availableCHTG  : action.payload}
    case ACTION_GET_HDSD_QUESTION:
      return { ...state, availableHDSD  : action.payload}
    case ACTION_GET_TLNV_QUESTION:
      return { ...state, availableTLNV : action.payload }
    case ACTION_GET_CATEGORY_QUESTION:
        return { ...state, categoryQuestion: action.payload }
    default:
      return state
  }
}

export default helpCenterManagementReducers
