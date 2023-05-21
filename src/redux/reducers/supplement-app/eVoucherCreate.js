import {
  ACTION_GET_ALL_COMOPANY_INSURANCE,
  ACTION_GET_ALL_PRODUCT
} from '../../actions/supplement-app/eVoucherCreate'

const initialState = {
  availableProducts: [],
  availableCompanyInsurance: []
}
const eVoucherCreate = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_ALL_COMOPANY_INSURANCE:
      return {
        ...state,
        availableCompanyInsurance: action.payload.data
      }

    case ACTION_GET_ALL_PRODUCT:
      return {
        ...state,
        availableProducts: action.payload.data
      }
    default:
      return state
  }
}

export default eVoucherCreate
