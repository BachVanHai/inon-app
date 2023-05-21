import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'
import {
    NAME_BUY_INSURANCES_CAR,
    COMPANIES,
    PAID_FAIL as _PAID_FAIL,
    PAID_SUCCESS as _PAID_SUCCESS,
    PAID_WAITING as _PAID_WAITING
} from '../../../configs/insurance-app'
import {
    ACTION_BUY_INSURANCES_RESET_ALL,
    ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
} from '../../actions/insurance-app/buyInsurancesCar'
import { KEY_LAST_ENDPOINT_PATH } from './utility'
import * as _ from './utility'


export const BASE = _
export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_CAR
export const MAX_STEP = 6
export const SIMPLIFY_MAX_STEP = 3
export const ACTION_BUY_NEW = "buyNew"
export const ACTION_GO_HOME = "goHome"

export const PAID_FAIL = _PAID_FAIL
export const PAID_SUCCESS = _PAID_SUCCESS
export const PAID_WAITING = _PAID_WAITING

export const KEY_CONTRACT_ID = "contractId"
export const KEY_VEHICLE_ID = "vehicleId"
export const KEY_ID_CONTACT = "idContact"
export const KEY_ID_CONTACT_ALTER = "idContactAlter"

export const KEY_CONTRACT_INFO = "contractInfo"
export const KEY_TOTAL_FEE = "totalFee"

export const KEY_FEE_BHVC = "feeBHVC"
export const KEY_HAS_CAL_FEE_DONE = "isCalFee"
export const KEY_DEBT_ACCOUNT_INFO = "debtAccountInfo"
export const KEY_COMPANY_ID = "companyId"
export const KEY_DATA_FEES = "dataFees"
export const KEY_ADD_TERMS_MAIN = "addTermsMain"
export const KEY_ADD_TERMS_ALL = "addTermsAll"
export const KEY_SUGG_VEHICLE = "sugg_Vehicle"
export const KEY_SUGG_AUTOMAKER = "sugg_Automaker"
export const KEY_DEDUCTION_LEVEL = "deductionLevel"
export const KEY_BH_INC_MAX = "bhIncMax"
export const KEY_BH_INC_MIN = "bhIncMin"
export const KEY_MIN_FEE = "minimumFee"

export const KEY_ACTIVE_STEP = "activeStep"
export const KEY_PAYMENT_TYPE = "paymentType"
export const KEY_PAY_CONTRACT_STATUS = "payContractStatus"
export const KEY_AGREED_TERM_OF_SERVICES_STATUS = "agreedTermOfServicesStatus"
export const KEY_IS_LOADING = "isLoading"
export const KEY_COMPLETED_CONTRACT_ACTION_TYPE = "completedContractActionType"
export const KEY_UPLOADED_IMAGE = "uploadedImg"
export const KEY_UPLOADED_IMAGE_PERSON = 'updateImgPerson'

export const KEY_STEP_1 = "step_1"
export const KEY_STEP_2 = "step_2"
export const KEY_STEP_3 = "step_3"

export const initialState = {
    [KEY_CONTRACT_ID]: ``,
    [KEY_VEHICLE_ID]: ``,
    [KEY_ID_CONTACT]: ``,
    [KEY_ID_CONTACT_ALTER]: ``,

    [KEY_CONTRACT_INFO]: {},
    [KEY_TOTAL_FEE]: 0,
    [KEY_FEE_BHVC]: 0,
    [KEY_MIN_FEE]: 0,

    [KEY_HAS_CAL_FEE_DONE]: false,
    [KEY_DEBT_ACCOUNT_INFO]: {},
    [KEY_COMPANY_ID]: COMPANIES[0].id,
    [KEY_DATA_FEES]: [],
    [KEY_ADD_TERMS_MAIN]: [],
    [KEY_ADD_TERMS_ALL]: [],
    [KEY_SUGG_VEHICLE]: [],
    [KEY_SUGG_AUTOMAKER]: [],
    [KEY_DEDUCTION_LEVEL]: "",
    [KEY_BH_INC_MAX]: "",
    [KEY_BH_INC_MIN]: "",

    [KEY_ACTIVE_STEP]: 1,
    [KEY_PAYMENT_TYPE]: PAYMENT_TYPE_FUND_TRANSFER,
    [KEY_PAY_CONTRACT_STATUS]: PAID_WAITING,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: false,
    [KEY_IS_LOADING]: false,
    [KEY_COMPLETED_CONTRACT_ACTION_TYPE]: ACTION_BUY_NEW,
    [KEY_LAST_ENDPOINT_PATH]: "",

    [KEY_STEP_1]: {},
    [KEY_STEP_2]: {},
    [KEY_STEP_3]: {},
}

const buyInsurancesReducer = (state = initialState, action) => {
    const { payload, type } = action
    let _draftState = { ...state }

    switch (type) {
        case ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState

        case ACTION_BUY_INSURANCES_RESET_ALL:
            return initialState

        default:
            return state
    }
}

export default buyInsurancesReducer