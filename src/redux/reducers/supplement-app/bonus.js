import { ACTION_LOAD_INSURANCE_LIST, ACTION_LOAD_LIST_ACCOUNT_SUGGESTION } from '../../actions/supplement-app/bonus'

const initialState = {
  insuranceList: [],
  bonusSettings: [],
  suggestions: [],
}

const bonusGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_INSURANCE_LIST:
      return { ...state, ...action.payload }
    case ACTION_LOAD_LIST_ACCOUNT_SUGGESTION :
      return {...state, suggestions : [...action.payload]}  
    default:
      return state
  }
}

export default bonusGroupReducer
