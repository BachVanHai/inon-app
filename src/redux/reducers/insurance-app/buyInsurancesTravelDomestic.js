import { PATH_BUY_INSURANCES_TRAVEL_DOMESTIC } from "../../../configs/insurance-app"
import * as _ from './utility'
import { getDefault_buyInsuranceReducer, getDefault_initialState } from "./utility"

export const ACTION_BUY_INSUR_TRAVEL_DOMESTIC_UPDATE_PROPS = 'ACTION_BUY_INSUR_TRAVEL_DOMESTIC_UPDATE_PROPS'
export const ACTION_BUY_INSUR_TRAVEL_DOMESTIC_RESET_ALL = 'ACTION_BUY_INSUR_TRAVEL_DOMESTIC_RESET_ALL'

export const BASE = _
export const MAX_STEP = 4

export const KEY_INSURANCE_INFO = "insuranceInfo"
export const KEY_INSURANCES_ID = 'insuranceId'
export const KEY_STEP_2 = "step_2"
export const KEY_CITIES = 'cities'
export const KEY_ADDONS = 'addOns'

export const initialState = getDefault_initialState()
initialState[KEY_STEP_2] = {}
initialState[KEY_INSURANCE_INFO] = []
initialState[_.KEY_LAST_ENDPOINT_PATH] = PATH_BUY_INSURANCES_TRAVEL_DOMESTIC
initialState[_.KEY_COMPANY_ID] = "01"
initialState[KEY_INSURANCES_ID] = ""
initialState[KEY_CITIES] = []
initialState[KEY_ADDONS] = []

const reducer = getDefault_buyInsuranceReducer(initialState, ACTION_BUY_INSUR_TRAVEL_DOMESTIC_UPDATE_PROPS, ACTION_BUY_INSUR_TRAVEL_DOMESTIC_RESET_ALL)

export default reducer