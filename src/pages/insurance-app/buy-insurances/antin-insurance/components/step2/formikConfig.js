import * as Yup from 'yup'
import moment from 'moment'
import {
  ALERT_EMPTY,
  ALERT_INVALID,
  DATE_FORMAT,
  nameRegex
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { updateInsuranceEffectiveDate } from '../../../../../../ultity'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { KEY_DATE_BIRTH } from '../step1/formikConfig'
export const KEY_PACKAGE_SELECTED = 'packageName'
export const KEY_DURATION_SELECTED = 'duration'
export const KEY_CURRENT_FEE = 'currentFee'
export const KEY_START_INSURANCE = 'startValueDate'
export const KEY_END_INSURANCE = 'endValueDate'
export const KEY_RESPONSIBILITY = 'responsibility'
export const KEY_DATE_INSUR_FROM = 'dateInsuranceFrom'
export const KEY_TIME_INSUR_FROM = 'timeInsuranceFrom'
export const KEY_DATE_INSUR_TO = 'dateInsuranceTo'
export const KEY_TIME_INSUR_TO = 'timeInsuranceTo'
export const KEY_DURATION = 'duration'
export const KEY_IC_TYPE = 'icType'
export const KEY_IC_NO = 'icNo'
export const KEY_FULLNAME = 'fullname'
export const KEY_ADDRESS = 'address'
export const KEY_BENEFICIARY = 'beneficiary'
export const KEY_BRANCH_NAME = 'branchName'
export const KEY_BANK_NAME = 'bankName'
export const KEY_BENEFICIARY_FIRST = 'beneficiaryFirst'
export const KEY_BENEFICIARY_SECOND = 'beneficiarySecond'
export const beneficiaryFirst = {
  [KEY_BRANCH_NAME]: '',
  [KEY_BANK_NAME]: '',
}

export const beneficiarySecond = {
  [KEY_FULLNAME]: '',
  [KEY_IC_TYPE]: '',
  [KEY_IC_NO]: '',
  [KEY_ADDRESS]: ''
}
export const initialValues = {
  [KEY_RESPONSIBILITY]: '',
  [KEY_DURATION]: 12,
  [KEY_DATE_INSUR_FROM]: moment().utc(true).format(DATE_FORMAT),
  [KEY_DATE_INSUR_TO]: moment()
    .add(1, 'y')
    .utc(true)
    .format(DATE_FORMAT),
  [KEY_BENEFICIARY_FIRST]: beneficiaryFirst,
  [KEY_BENEFICIARY_SECOND]: beneficiarySecond
}

export const validate = (values) => {}
export const validationSchema = Yup.object().shape({
  [KEY_RESPONSIBILITY]: Yup.string().required(ALERT_EMPTY),
  [KEY_BENEFICIARY_FIRST]: Yup.object().shape({
    [KEY_BRANCH_NAME]: Yup.string().required(ALERT_EMPTY),
    [KEY_BANK_NAME]: Yup.string().required(ALERT_EMPTY)
  }),
  [KEY_BENEFICIARY_SECOND]: Yup.object().shape({
    [KEY_FULLNAME]: Yup.string()
      .matches(nameRegex, ALERT_INVALID)
      .required(ALERT_EMPTY),
    [KEY_IC_TYPE]: Yup.string().required(ALERT_EMPTY),
    ...config.getDefault_validateSchmaIcType(KEY_IC_TYPE, KEY_DATE_BIRTH),
    ...config.getDefault_validateSchemaIcNo(
      KEY_IC_NO,
      KEY_IC_TYPE,
      KEY_DATE_BIRTH
    )
  })
})
