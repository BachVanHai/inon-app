import moment from 'moment'
import * as Yup from 'yup'
import { ALERT_EMPTY } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'
export const KEY_PACKAGE_SELECTED = 'packageName'
export const KEY_DURATION = 'duration'
export const KEY_CURRENT_FEE = 'currentFee'
export const KEY_START_INSURANCE = 'startValueDate'
export const KEY_END_INSURANCE = 'endValueDate'
export const KEY_INSURANCE_MONEY = 'insuranceMoney'
export const KEY_INSURANCE_DEDUCTION = 'insuranceDeduction'
export const KEY_TOTAL_PERSON_INSURANCE = 'totalPerson'
export const KEY_PERSON_INSURANCE_TYPE = 'personInsurnaceType'
export const KEY_START_POINT = 'startPoint'
export const KEY_END_POINT = 'endPoint'
export const KEY_ARRIVE_POINT = 'arrivePoint'
export const KEY_JOIN_GAME_NUMBER = 'joinGame'
export const KEY_INSURANCE_CODE = 'insuranceCode'

// OPTION PERSONAL
export const OPTS1 = 1
export const OPTS2 = 2
export const OPTS3 = 3
export const packages = [
  {
    value: 'BASIC',
    msgField: 'Lựa chọn 1',
    packageSubtitleField: 'Phạm vi cơ bản'
  },
  {
    value: 'ADVANCE',
    msgField: 'Lựa chọn 2',
    packageSubtitleField: 'Phạm vi toàn diện'
  }
]

export const initialValues = {
  [KEY_PACKAGE_SELECTED]: 'BASIC',
  [KEY_DURATION]: 3,
  [KEY_START_INSURANCE]: moment().utc(true).format('YYYY-MM-DD H:mm:ss'),
  [KEY_END_INSURANCE]: moment()
    .utc(true)
    .add(3, 'd')
    .format('YYYY-MM-DD H:mm:ss'),
  [KEY_INSURANCE_MONEY]: 10,
  [KEY_INSURANCE_DEDUCTION]: 0,
  [KEY_TOTAL_PERSON_INSURANCE]: 1,
  [KEY_START_POINT]: '',
  [KEY_END_POINT]: '',
  [KEY_ARRIVE_POINT]: '',
  [KEY_PERSON_INSURANCE_TYPE]: OPTS1,
  [KEY_JOIN_GAME_NUMBER]: 0,
  [KEY_INSURANCE_CODE] : 'ROUND'
}
export const validationSchema = Yup.object().shape({
  [KEY_JOIN_GAME_NUMBER]: Yup.string().when(KEY_PERSON_INSURANCE_TYPE, {
    is: (value) => value === OPTS3,
    then: Yup.string().required(ALERT_EMPTY)
  }),
  [KEY_START_POINT]: Yup.string().required(ALERT_EMPTY),
  [KEY_END_POINT]: Yup.string().required(ALERT_EMPTY),
  [KEY_ARRIVE_POINT]: Yup.string().required(ALERT_EMPTY)
})

export const validate = (values) => {
  return sleepingFor().then(() => {
    let errors = {}
    if (Number(values[KEY_JOIN_GAME_NUMBER]) < 1 && values[KEY_PERSON_INSURANCE_TYPE] === OPTS3) {
      errors[KEY_JOIN_GAME_NUMBER] = 'Giá trị nhỏ nhất bằng 1'
    }
    return errors
  })
}
