import {
  ACTION_LOAD_CONTRACT_INFO,
  ACTION_LOAD_LIST_BONUS_HISTORY,
  ACTION_LOAD_LIST_BONUS_HISTORY_SUGGESTIONS
} from '../../actions/supplement-app/bonusHistory'


const initialState = {
  list: [],
  suggestions: [],
  contract: {}
}

const bonusHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_LIST_BONUS_HISTORY:
      return { ...state, list: action.payload }
    case ACTION_LOAD_LIST_BONUS_HISTORY_SUGGESTIONS :
      return { ...state, suggestions: action.payload }
    case ACTION_LOAD_CONTRACT_INFO :
      return { ...state, contract: { ...action.payload } }
    default:
      return state
  }
}

export default bonusHistoryReducer
