import {
  ACTION_GET_LIST_ACOUNT_PRODUCTS,
  ACTION_GET_LIST_PARTNERS,
  ACTION_SAVE_ACCOUNT_PRODUCTS_UPLOAD,
  ACTION_SEARCH_LIST_ACCOUNT
} from '../../actions/supplement-app/acountProducts'

const initialState = {
  accountProductUpload: [],
  availableAccountProducts: [],
  availablePartners: [],
  accountProducts: []
}

const accountProducsReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SAVE_ACCOUNT_PRODUCTS_UPLOAD:
      return { ...state, accountProductUpload: action.payload }
    case ACTION_GET_LIST_ACOUNT_PRODUCTS:
      return {
        ...state,
        availableAccountProducts: action.payload,
        accountProducts: action.payload
      }
    case ACTION_GET_LIST_PARTNERS:
      return { ...state, availablePartners: action.payload }
    case ACTION_SEARCH_LIST_ACCOUNT:
      return { ...state, availableAccountProducts: action.payload }
    default:
      return state
  }
}

export default accountProducsReducers
