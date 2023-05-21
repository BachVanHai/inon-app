import { PAYMENT_TYPE_FUND_TRANSFER } from "../../../components/insurance-app/buy-insurances-page/formik-config"
import { COMPANIES, PAID_WAITING } from "../../../configs/insurance-app"

export const ACTION_BUY_NEW = "buyNew"
export const ACTION_GO_HOME = "goHome"

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
export const KEY_COMPLETED_CONTRACT_ACTION_TYPE = "completedContractActionType"
export const KEY_LAST_ENDPOINT_PATH = "lastEndPointPath"

export const KEY_STEP_1 = "step_1"
const bshCompany = COMPANIES.find(elt => elt.name === "BSH")
/**
 * @returns {Object}
 */
export const getDefault_initialState = () => {
    return ({
        [KEY_CONTRACT_ID]: ``,
        [KEY_CONTRACT_CODE]: ``,

        [KEY_ACTIVE_STEP]: 1,
        [KEY_DATA_FEES]: [],
        [KEY_TOTAL_FEE]: 0,
        [KEY_CONTRACT_INFO]: {},
        [KEY_COMPANY_ID]: bshCompany.id,
        [KEY_PAYMENT_TYPE]: PAYMENT_TYPE_FUND_TRANSFER,
        [KEY_HAS_CAL_FEE_DONE]: false,
        [KEY_PAY_CONTRACT_STATUS]: PAID_WAITING,
        [KEY_AGREED_TERM_OF_SERVICES_STATUS]: false,
        [KEY_COMPLETED_CONTRACT_ACTION_TYPE]: ACTION_BUY_NEW,
        [KEY_LAST_ENDPOINT_PATH]: "",

        [KEY_STEP_1]: {},
    })
}
/**
 * @returns {Function}
 */
export const getDefault_buyInsuranceReducer = (initialState, ACTION_UPDATE_PROPS, ACTION_RESET_ALL) => {
    return ((state = initialState, action) => {
        const { payload, type } = action
        let _draftState = { ...state }

        switch (type) {
            case ACTION_UPDATE_PROPS:
                for (let item of payload) {
                    const { prop, value } = item
                    _draftState[prop] = value
                }
                return _draftState

            case ACTION_RESET_ALL:
                return initialState

            default:
                return state
        }
    })
}