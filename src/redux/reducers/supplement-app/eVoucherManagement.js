import { ACTION_GET_ALL_EVOUCHER } from '../../actions/supplement-app/eVoucherManagement'

const initialState = {
  availableEvoucher: []
}

const evoucherManagement = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_ALL_EVOUCHER:
      return {
        ...state,
        availableEvoucher: action.payload.data
      }

    default:
      return state
  }
}
export default evoucherManagement
