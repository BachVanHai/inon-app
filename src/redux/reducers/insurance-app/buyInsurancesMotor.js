import { getDefault_buyInsuranceReducer, getDefault_initialState } from "./utility"
import * as _ from './utility'
import { PATH_BUY_INSURANCES_MOTOR_SIMPLIFY } from "../../../configs/insurance-app"

export const ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS = 'ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS'
export const ACTION_BUY_INSUR_MOTOR_RESET_ALL = 'ACTION_BUY_INSUR_MOTOR_RESET_ALL'

export const BASE = _
export const MAX_STEP = 5
export const SIMPLIFY_MAX_STEP = 3
export const MOTORS_MAX_STEP = 3

export const KEY_VEHICLE_ID = "vehicleId"
export const KEY_OWNER_ID = "ownerId"
export const KEY_MT3_OR_MT2_ID = "mt3_or_mt2Id"
export const KEY_STEP_2 = "step_2"
export const KEY_STEP_3 = "step_3"
export const KEY_UPLOADED_IMAGE = "uploadedImg"

const initialState = getDefault_initialState()
initialState[KEY_VEHICLE_ID] = ""
initialState[KEY_OWNER_ID] = ""
initialState[KEY_MT3_OR_MT2_ID] = ""
initialState[_.KEY_LAST_ENDPOINT_PATH] = PATH_BUY_INSURANCES_MOTOR_SIMPLIFY
initialState[KEY_UPLOADED_IMAGE] = ""

initialState[KEY_STEP_2] = {}
initialState[KEY_STEP_3] = {}

const reducer = getDefault_buyInsuranceReducer(initialState, ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS, ACTION_BUY_INSUR_MOTOR_RESET_ALL)

export default reducer