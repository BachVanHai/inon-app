import moment from "moment"
import { PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED } from "../../../configs/insurance-app"
import * as _ from './utility'
import { getDefault_buyInsuranceReducer, getDefault_initialState } from "./utility"
import { GOLD } from "../../../pages/insurance-app/buy-insurances/health-care-advanced/components/step2/utility"

export const ACTION_BUY_INSUR_HEALTH_ADVANCED_UPDATE_PROPS = 'ACTION_BUY_INSUR_HEALTH_ADVANCED_UPDATE_PROPS'
export const ACTION_BUY_INSUR_HEALTH_ADVANCED_RESET_ALL = 'ACTION_BUY_INSUR_HEALTH_ADVANCED_RESET_ALL'

export const BASE = _
export const MAX_STEP = 4

export const KEY_INSURANCE_INFO = "insuranceInfo"
export const KEY_STEP_2 = "step_2"

export const initialState = getDefault_initialState()
initialState[KEY_STEP_2] = {
    productCode: GOLD ,
    startValueDate : moment(new Date).utc(true).format('YYYY-MM-DD'),
    endValueDate : moment(new Date).add('y',1).utc(true).format('YYYY-MM-DD'),
    duration : 12 , 
    packageCode : 'BASIC'
}
initialState[KEY_INSURANCE_INFO] = []
initialState[_.KEY_LAST_ENDPOINT_PATH] = PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED
initialState[_.KEY_COMPANY_ID] = "01"
const reducer = getDefault_buyInsuranceReducer(initialState, ACTION_BUY_INSUR_HEALTH_ADVANCED_UPDATE_PROPS, ACTION_BUY_INSUR_HEALTH_ADVANCED_RESET_ALL)

export default reducer