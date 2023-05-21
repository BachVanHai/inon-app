import { ACTION_LOAD_LIST_BONUS_APPROVAL, ACTION_LOAD_LIST_BONUS_APPROVAL_SUGGESTION } from "../../actions/supplement-app/bonusApproval"


const initialState = {
  list : [],
  suggestions: [],
}

const userGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_LIST_BONUS_APPROVAL:
      return { ...state, list : [...action.payload] }
    case ACTION_LOAD_LIST_BONUS_APPROVAL_SUGGESTION :
      return {...state, suggestions : [...action.payload]}  
    default:
      return state
  }
}

export default userGroupReducer
