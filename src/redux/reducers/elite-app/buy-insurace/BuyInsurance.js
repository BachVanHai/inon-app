import {
  ACTION_NEXT_STEP,
  ACTION_BUY_NEW,
  ACTION_PREV_STEP,
  ACTION_CHANGE_PAYMENT_METHOD,
  ACTION_CONFIRM_PAYMENT,
  ACTION_LOAD_INSURANCE_STEPS,
  ACTION_RESET_STEP_DATA,
  ACTION_SAVE_CONTRACT,
  ACTION_SAVE_REF_ID,
  ACTION_SAVE_STEP_DATA,
  ACTION_SAVE_VEHICLE,
  ACTION_SAVE_INSURANCE_HOME_PRIVATE
} from '../../../actions/elite-app/buy-insurance/BuyInsuranceStep'

const initialState = {
  activeStep: 0,
  steps: {},
  type: '',
  stepData: {},
  refId: null,
  contract: null,
  vehicle: null,
  insuranceHomePrivate : null,
  paymentMethod: 'FUND_TRANSFER',
  paymentStatus: '',
  bankList : [],
  feeDetails: [],
  contractHomePrivateInfo : {}
}

const buyInsuranceReducer = (state = initialState, action) => {
  let activeStep = state.activeStep
  switch (action.type) {
    case ACTION_NEXT_STEP:
      if (activeStep < Object.keys(state.steps).length) {
        activeStep++
      }
      return { ...state, activeStep }
    case ACTION_PREV_STEP:
      if (activeStep > 0) {
        activeStep--
      }
      return { ...state, activeStep }
    case ACTION_LOAD_INSURANCE_STEPS:
      return { ...state, ...action.payload }
    case ACTION_SAVE_STEP_DATA:
      const stepData = { ...state.stepData }
      stepData[action.payload.step] = action.payload.data
        ? { ...action.payload.data }
        : null
      return { ...state, stepData }
    case ACTION_SAVE_CONTRACT:
      return { ...state, ...(action.payload || {}) }
    case ACTION_SAVE_VEHICLE:
      return { ...state, vehicle: action.payload }
    case ACTION_SAVE_INSURANCE_HOME_PRIVATE:
      return { ...state, insuranceHomePrivate: action.payload }
    case ACTION_CHANGE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }
    case ACTION_CONFIRM_PAYMENT:
      return { ...state, activeStep: Object.keys(state.steps).length, paymentStatus: action.payload }
    case ACTION_BUY_NEW:
      return {
        ...state,
        activeStep: 1,
        stepData: {},
        feeDetails: [],
        contract: null,
        vehicle: null,
        paymentStatus: ''
      }
    case ACTION_RESET_STEP_DATA:
      return {
        ...state,
        activeStep: 0,
        stepData: {},
        feeDetails: [],
        contract: null,
        vehicle: null,
        paymentStatus: '',
        beneficiaries: []
      }
    case ACTION_SAVE_REF_ID:
      return {
        ...state,
        refId: action.payload
      }
    default:
      return state
  }
}

export default buyInsuranceReducer
