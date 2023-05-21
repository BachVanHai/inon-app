import moment from 'moment'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

export const KEY_INSUR_VALUE = 'value'
const default_value = 10
export const KEY_DURATION = 'duration'
const default_duration = 12
export const KEY_COUPON_CODE = 'couponCode'
export const KEY_DATE_INSUR_FROM = 'day_insuranceApplyFrom'
export const KEY_DATE_INSUR_TO = 'day_insuranceApplyTo'
export const KEY_TIME_INSUR_FROM = 'hour_insuranceApplyFrom'
export const KEY_TIME_INSUR_TO = 'hour_insuranceApplyTo'

export const initialValues = ({
    [KEY_INSUR_VALUE]: default_value,
    [KEY_DURATION]: default_duration,
    [KEY_COUPON_CODE]: "",
    [KEY_DATE_INSUR_FROM]: moment().utc(true).format(DATE_FORMAT),
    [KEY_DATE_INSUR_TO]: moment().add(default_duration, "M").utc(true).format(DATE_FORMAT),
    [KEY_TIME_INSUR_FROM]: moment().utc(true).format("HH:mm"),
    [KEY_TIME_INSUR_TO]: moment().utc(true).format("HH:mm"),
})
