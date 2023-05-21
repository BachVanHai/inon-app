import {
  ACTION_LOAD_CONTRACTS,
  ACTION_NEXT_STEP,
  ACTION_PREV_STEP
} from '../../../actions/elite-app/contract-management/ContractManagement'

const initialState = {
  activeContract: 0,
  contracts: [],
  totalContract: 0
}

const contractManagementReducer = (state = initialState, action) => {
  let activeContract = state.activeContract
  let totalContract = state.totalContract
  switch (action.type) {
    case ACTION_LOAD_CONTRACTS: {
      return {
        ...state,
        contracts: action.payload,
        totalContract: action.payload.length
      }
    }
    case ACTION_NEXT_STEP:
      if (state.activeContract === state.totalContract - 1) {
        return { ...state, activeContract: 0 }
      } else {
        activeContract++
        return { ...state, activeContract }
      }

    case ACTION_PREV_STEP:
      if (state.activeContract === 0) {
        activeContract = totalContract - 1
        return { ...state, activeContract }
      } else {
        activeContract = activeContract - 1
        return { ...state, activeContract }
      }
    default:
      return state
  }
}

export default contractManagementReducer
