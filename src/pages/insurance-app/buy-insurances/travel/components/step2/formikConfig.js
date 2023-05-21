import * as Yup from 'yup'
import moment from 'moment'
import { ALERT_EMPTY } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'
export const getInsuranceFeeBy = (durationValue, packageValue) => {
  let final = 0
  switch (durationValue) {
    case 12:
      switch (packageValue) {
        case 'BASIC':
          final = 400_000
          break
        case 'ADVANCE':
          final = 600_000
          break
       
        default:
          break
      }
      break
    case 24:
      switch (packageValue) {
        case 'BASIC':
          final = 400_000 * 2
          break
        case 'ADVANCE':
          final = 600_000 * 2
          break
        case 'GOI3':
          final = 900_000 * 2
          break
        case 'GOI4':
          final = 1_200_000 * 2
          break
        default:
          break
      }
      break
    case 36:
      switch (packageValue) {
        case 'BASIC':
          final = 400_000 * 3
          break
        case 'ADVANCE':
          final = 600_000 * 3
          break
        case 'GOI3':
          final = 900_000 * 3
          break
        case 'GOI4':
          final = 1_200_000 * 3
          break
        default:
          break
      }
      break
    default:
      break
  }
  return final
}

export const packages = [
  {
    value: 'BASIC',
    msgField: 'Lựa chọn 1',
    packageSubtitleField: 'Gói cơ bản'
  },
  {
    value: 'ADVANCE',
    msgField: 'Lựa chọn 2',
    packageSubtitleField: 'Gói nâng cao',
  },
]

export const durations = [
  {
    value: 12,
    year_value: 1,
    name: 'duration-1-year'
  },
  {
    value: 24,
    year_value: 2,
    name: 'duration-2-year'
  },
  {
    value: 36,
    year_value: 3,
    name: 'duration-3-year'
  }
]

export const KEY_PACKAGE_SELECTED = 'packageName'
export const KEY_DURATION = 'duration'
export const KEY_CURRENT_FEE = 'currentFee'
export const KEY_START_INSURANCE = 'startValueDate'
export const KEY_END_INSURANCE = 'endValueDate'
export const KEY_INSURANCE_MONEY = 'insuranceMoney'
export const KEY_INSURANCE_DEDUCTION = 'insuranceDeduction'
export const KEY_TOTAL_PERSON_INSURANCE = 'totalPerson'
export const initialValues = {
  [KEY_PACKAGE_SELECTED]: 'ADVANCE',
  [KEY_DURATION]: 3,
  [KEY_START_INSURANCE]: moment().utc(true).format('YYYY-MM-DD H:mm:ss'),
  [KEY_END_INSURANCE]: moment()
    .utc(true)
    .add(3, 'd')
    .format('YYYY-MM-DD H:mm:ss'),
  [KEY_INSURANCE_MONEY]: 250000000,
  [KEY_INSURANCE_DEDUCTION]: 0,
  [KEY_TOTAL_PERSON_INSURANCE]: 1
}

export const validationSchema = Yup.object().shape({
  [KEY_DURATION] : Yup.string().required(config.ALERT_EMPTY)
})

export const validate = (values) => {
  return sleepingFor().then(() => {
    let errors = {}
    return errors
  })
}
