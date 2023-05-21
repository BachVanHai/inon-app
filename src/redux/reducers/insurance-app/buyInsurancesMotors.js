import { getDefault_buyInsuranceReducer, getDefault_initialState } from "./utility"
import * as _ from './utility'
import { PATH_BUY_INSURANCES_MOTORS } from "../../../configs/insurance-app"

export const ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS = 'ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS'
export const ACTION_BUY_INSUR_MOTORS_RESET_ALL = 'ACTION_BUY_INSUR_MOTORS_RESET_ALL'

export const BASE = _
export const MAX_STEP = 3

export const KEY_UPLOADED_COUNT = "uploadedCount"
export const KEY_CONTRACT_GROUP_ID = "contractGroupId"

const initialState = getDefault_initialState()
initialState[_.KEY_LAST_ENDPOINT_PATH] = PATH_BUY_INSURANCES_MOTORS
initialState[KEY_CONTRACT_GROUP_ID] = ""
initialState[KEY_UPLOADED_COUNT] = 0

const reducer = getDefault_buyInsuranceReducer(initialState, ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS, ACTION_BUY_INSUR_MOTORS_RESET_ALL)

export default reducer