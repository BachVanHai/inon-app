import { PAYMENT_TYPE_ATM } from "../../../components/insurance-app/buy-insurances-page/formik-config"
import { NAME_BUY_INSURANCES_VTA, COMPANIES, PAID_WAITING } from "../../../configs/insurance-app"
import { ACTION_BUY_INSUR_VTA_RESET_ALL, ACTION_BUY_INSUR_VTA_UPDATE_PROPS } from "../../actions/insurance-app/buyInsurancesVta"

export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_VTA
export const MAX_STEP = 4
export const TEXT_INDIVIDUAL = "individual"
export const TEXT_GROUP = "group"

export const KEY_CONTRACT_ID = "contractId"
export const KEY_CONTRACT_CODE = "contractCode"

export const KEY_DATA_FEES = "dataFees"
export const KEY_TOTAL_FEE = "totalFee"
export const KEY_CONTRACT_INFO = "contractInfo"

export const KEY_COMPANY_ID = "companyId"
export const KEY_ACTIVE_STEP = "activeStep"
export const KEY_PAYMENT_TYPE = "paymentType"
export const KEY_HAS_CAL_FEE_DONE = "hasCalFeeDone"
export const KEY_PAY_CONTRACT_STATUS = "payContractStatus"
export const KEY_AGREED_TERM_OF_SERVICES_STATUS = "agreedTermOfServicesStatus"

export const KEY_BUYER_TYPE = "buyerType"
export const KEY_STEP_1 = "step_1"
export const KEY_STEP_2 = "step_2"
const ptiCompany = COMPANIES.find(elt => elt.name === "PTI")

export const initialState = {
    [KEY_CONTRACT_ID]: ``,
    [KEY_CONTRACT_CODE]: ``,

    [KEY_DATA_FEES]: [],
    [KEY_TOTAL_FEE]: 0,
    [KEY_CONTRACT_INFO]: {},
    [KEY_COMPANY_ID]: ptiCompany.id,
    [KEY_ACTIVE_STEP]: 1,
    [KEY_PAYMENT_TYPE]: PAYMENT_TYPE_ATM,
    [KEY_HAS_CAL_FEE_DONE]: false,
    [KEY_PAY_CONTRACT_STATUS]: PAID_WAITING,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: false,

    [KEY_BUYER_TYPE]: TEXT_INDIVIDUAL,
    [KEY_STEP_1]: {},
    [KEY_STEP_2]: {},
}

const buyInsurancesReducer = (state = initialState, action) => {
    const { payload, type } = action
    let _draftState = { ...state }

    switch (type) {
        case ACTION_BUY_INSUR_VTA_UPDATE_PROPS:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState

        case ACTION_BUY_INSUR_VTA_RESET_ALL:
            return initialState

        default:
            return state
    }
}

export default buyInsurancesReducer
