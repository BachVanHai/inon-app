import {
    ACTION_FAMILY_SAFETY_RESET_INFO,
    ACTION_FAMILY_SAFETY_UPDATE_STEP_INFO,
    ACTION_FAMILY_SAFETY_RESET_SPECIFY_STEP,
    ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
    ACTION_FAMILY_SAFETY_CAL_FEE_DONE,
} from '../../actions/insurance-app/buyInsurancesFamilySafety'
import * as config from '../../../configs/insurance-app'
import {PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'

export const MAX_STEP = 5
export const REDUX_STATE_NAME = config.NAME_BUY_INSURANCES_FAMILY_SAFETY
export const PAID_FAIL = config.PAID_FAIL
export const PAID_SUCCESS = config.PAID_SUCCESS
export const PAID_WAITING = config.PAID_WAITING
export const TYPE_BUYER_PERSONAL = "P"
export const TYPE_BUYER_GROUP = "G"

const getStepPropFrom = (activeStep) => {
    switch (activeStep) {
        case 1:
            return "step_1"
        case 2:
            return "step_2"
        case 3:
            return "step_3"
        case 4:
            return "step_4"
        case 5:
            return "step_5"
        default:
            return "step_1"
    }
}

export const KEY_CONTRACT_ID = "contractId"
export const KEY_ACTIVE_STEP = "activeStep"
export const KEY_COMPANY_ID = "companyId"
export const KEY_BUYER_TYPE = "buyerType"

export const KEY_DATA_FEES = "dataFees"
export const KEY_TOTAL_FEE = "totalFee"
export const KEY_CONTRACT_INFO = "contractInfo"
export const KEY_BENEFICIARIES = "beneficiaries"
export const KEY_PAYMENT_TYPE = "paymentType"
export const KEY_HAS_CAL_FEE_DONE = "hasCalFeeDone"
export const KEY_HAS_PAY_CONTRACT_LOADED = "hasPayContractLoaded"
export const KEY_PAY_CONTRACT_STATUS = "payContractStatus"
export const KEY_AGREED_TERM_OF_SERVICES_STATUS = "agreedTermOfServicesStatus"
export const KEY_IS_LOADING = "isLoading"

export const KEY_STEP_1 = "step_1"
export const KEY_STEP_2 = "step_2"
export const KEY_STEP_3 = "step_3"
export const KEY_STEP_4 = "step_4"

const initialState = {
    [KEY_CONTRACT_ID]: ``,
    [KEY_ACTIVE_STEP]: 1,
    [KEY_COMPANY_ID]: config.COMPANIES[0].id,
    [KEY_BUYER_TYPE]: TYPE_BUYER_PERSONAL,

    [KEY_DATA_FEES]: [],
    [KEY_TOTAL_FEE]: 0,
    [KEY_CONTRACT_INFO]: {},
    [KEY_BENEFICIARIES]: [],
    [KEY_PAYMENT_TYPE]: PAYMENT_TYPE_FUND_TRANSFER,
    [KEY_HAS_CAL_FEE_DONE]: false,
    [KEY_HAS_PAY_CONTRACT_LOADED]: false,
    [KEY_PAY_CONTRACT_STATUS]: PAID_WAITING,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: false,
    [KEY_IS_LOADING]: false,

    [KEY_STEP_1]: {},
    [KEY_STEP_2]: {},
    [KEY_STEP_3]: {},
    [KEY_STEP_4]: {},
}

const buyInsurancesReducer = (state = initialState, action) => {
    const { payload, type } = action
    const { activeStep } = state
    let _draftState = { ...state }

    switch (type) {
        case ACTION_FAMILY_SAFETY_CAL_FEE_DONE:
            if (payload.hasCalFeeDone) {
                _draftState.hasCalFeeDone = true
                _draftState.dataFees = payload.dataFees
            } else {
                _draftState.hasCalFeeDone = false
                _draftState.dataFees = []
            }
            return _draftState

        case ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState

        case ACTION_FAMILY_SAFETY_UPDATE_STEP_INFO:
            _draftState[getStepPropFrom(activeStep)] = payload.stepInfo
            return _draftState

        case ACTION_FAMILY_SAFETY_RESET_SPECIFY_STEP:
            _draftState[getStepPropFrom(activeStep)] = {}
            return _draftState

        case ACTION_FAMILY_SAFETY_RESET_INFO:
            return initialState

        default:
            return state
    }
}

export default buyInsurancesReducer
