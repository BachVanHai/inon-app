import {
  getDefault_buyInsuranceReducer,
  getDefault_initialState
} from './utility'
import { PATH_AN_IN_INSUR } from '../../../configs/insurance-app'
import * as _ from './utility'
import moment from 'moment'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'
import {
  beneficiaryFirst,
  beneficiarySecond,
  KEY_BENEFICIARY_FIRST,
  KEY_BENEFICIARY_SECOND
} from '../../../pages/insurance-app/buy-insurances/antin-insurance/components/step2/formikConfig'

export const ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS =
  'ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS'
export const ACTION_BUY_INSUR_AN_TIN_RESET_ALL =
  'ACTION_BUY_INSUR_AN_TIN_RESET_ALL'

export const BASE = _
export const MAX_STEP = 4

export const KEY_INSURANCE_INFO = 'insuranceInfo'
export const KEY_STEP_2 = 'step_2'
export const BENEFICIARY = 'beneficiary'
export const KEY_IC_TYPE = 'icType'
export const KEY_IC_NO = 'icNo'
export const KEY_FULLNAME = 'fullname'
export const KEY_ADDRESS = 'address'
export const KEY_BENEFICIARY = 'beneficiary'
export const initialState = getDefault_initialState()
initialState[KEY_STEP_2] = {
  responsibility: '',
  duration: 12,
  dateInsuranceFrom: moment().utc(true).format('YYYY-MM-DD'),
  dateInsuranceTo: moment().utc(true).add(1, 'y').format('YYYY-MM-DD'),
  [KEY_BENEFICIARY_FIRST]: beneficiaryFirst,
  [KEY_BENEFICIARY_SECOND]: beneficiarySecond
}
initialState[KEY_INSURANCE_INFO] = []
initialState[_.KEY_LAST_ENDPOINT_PATH] = PATH_AN_IN_INSUR

const reducer = getDefault_buyInsuranceReducer(
  initialState,
  ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS,
  ACTION_BUY_INSUR_AN_TIN_RESET_ALL
)

export default reducer
