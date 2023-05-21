import { PAYMENT_TYPE_ATM } from "../../../components/insurance-app/buy-insurances-page/formik-config"
import { COMPANIES, NAME_BUY_INSURANCES_MULTIPLE_HOME, PAID_WAITING } from "../../../configs/insurance-app"
import { initialValues as step1Default, KEY_ADDRESS, KEY_CITY, KEY_DISTRICT, KEY_WARD } from "../../../pages/insurance-app/buy-insurances/personal-home/components/step1/formikConfig"
import { ACTION_MERGE_PROPS, ACTION_RESET_ALL, ACTION_UPDATE_PROPS_HOME } from "../../actions/insurance-app/buyInsuranceMultiple"

export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_MULTIPLE_HOME
export const MAX_STEP = 3

export const KEY_CONTRACT_ID = "contractId"
export const KEY_BENEFICIARY_ID = "beneficiaryId"
export const KEY_INSURANCE_ID = "insuranceId"
export const KEY_BUYER_ID = "ownerId"
export const KEY_DATA_FEES = "dataFees"
export const KEY_TOTAL_FEE = "totalFee"
export const KEY_CONTRACT_INFO = "contractInfo"
export const KEY_CONTRACT_CODE = "contractCode"
export const KEY_DATA_IMPORT = 'dataImport'

export const KEY_COMPANY_ID = "companyId"
export const KEY_COMPANY_NAME = "companyName"
export const KET_CONTRACT_GROUP_ID = "contractGroupId"
export const KEY_ACTIVE_STEP = "activeStep"
export const KEY_PAYMENT_TYPE = "paymentType"
export const KEY_HAS_CAL_FEE_DONE = "hasCalFeeDone"
export const KEY_PAY_CONTRACT_STATUS = "payContractStatus"
export const KEY_AGREED_TERM_OF_SERVICES_STATUS = "agreedTermOfServicesStatus"

export const KEY_STEP_1 = "step_1"
export const KEY_STEP_2 = "step_2"

const initialState = {
    [KEY_CONTRACT_ID]: ``,
    [KEY_BENEFICIARY_ID]: ``,
    [KEY_INSURANCE_ID]: ``,
    [KEY_BUYER_ID]: ``,
    [KEY_DATA_FEES]: {},
    [KEY_COMPANY_NAME] : "",
    [KET_CONTRACT_GROUP_ID] : "",
    [KEY_TOTAL_FEE]: 0,
    [KEY_CONTRACT_INFO]: {},
    [KEY_CONTRACT_CODE]: "",
    [KEY_COMPANY_ID]: COMPANIES[0].id,
    [KEY_ACTIVE_STEP]: 1,
    [KEY_PAYMENT_TYPE]: PAYMENT_TYPE_ATM,
    [KEY_HAS_CAL_FEE_DONE]: false,
    [KEY_PAY_CONTRACT_STATUS]: PAID_WAITING,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: false,
    [KEY_DATA_IMPORT] : [],
    [KEY_STEP_1]: [],
    [KEY_STEP_2]: [],
}

const buyInsuranceHome = (state = initialState, action) => {
    const { payload, type } = action
    let _draftState = { ...state }

    switch (type) {
        case ACTION_MERGE_PROPS:
            for (let item of payload) {
                const { prop, value } = item
                Object.keys(value).forEach((key) => {
                    if (key === "addresses" || step1Default.hasOwnProperty(key)) {
                        if (key === "addresses") {
                            const { city, district, ward, detail } = value[key][0]
                            _draftState[prop][KEY_CITY] = city
                            _draftState[prop][KEY_DISTRICT] = district
                            _draftState[prop][KEY_WARD] = ward
                            _draftState[prop][KEY_ADDRESS] = detail
                        } else {
                            _draftState[prop][key] = value[key]
                        }
                    }
                })
            }
            return _draftState

        case ACTION_UPDATE_PROPS_HOME:
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
}

export default buyInsuranceHome
