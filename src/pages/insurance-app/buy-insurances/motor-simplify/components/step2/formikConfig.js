import * as Yup from 'yup'
import { sleepingFor, updateInsuranceEffectiveDate } from '../../../../../../ultity'
import moment from 'moment'
import * as step1_config from '../step1/formikConfig'
import { ALERT_INVALID, DATE_FORMAT, emailRegex, nullStrRegex, phoneNumberRegex } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

export const KEY_COUPON_CODE = "couponCode"
/** step 1 section */
export const KEY_FULLNAME = step1_config.KEY_FULLNAME
export const KEY_ADDRESS = step1_config.KEY_ADDRESS
export const KEY_PHONE_NUMBER = step1_config.KEY_PHONE_NUMBER
export const KEY_EMAIL = step1_config.KEY_EMAIL

export const KEY_VEHICLE_TYPE = step1_config.KEY_VEHICLE_TYPE
export const KEY_NUMBER_PLATE = step1_config.KEY_NUMBER_PLATE
export const KEY_MANUFACTURER_VEHICLE = step1_config.KEY_MANUFACTURER_VEHICLE
export const KEY_LINE_VEHICLE = step1_config.KEY_LINE_VEHICLE

export const KEY_FRAME_NUMBER = step1_config.KEY_FRAME_NUMBER
export const KEY_MACHINE_NUMBER = step1_config.KEY_MACHINE_NUMBER
/** step 2 section  */
const MIN_DURATION = 12
const MAX_DURATINO = 36
export const sliderInfo = {
    min: MIN_DURATION,
    max: MAX_DURATINO,
    stepValue: 3,
}
export const KEY_TOGGLE_BBTNDS = "toggleBBTNDS"
export const KEY_DURATION = "duration"
export const KEY_DATE_INSUR_FROM = "valueDateStart"
export const KEY_TIME_INSUR_FROM = "valueTimeStart"
export const KEY_DATE_INSUR_TO = "valueDateEnd"
export const KEY_TIME_INSUR_TO = "valueTimeEnd"
export const KEY_TOGGLE_TAI_NAN = "toggleTainan"
export const KEY_ADD_RESPONSIBILITY_VALUE = "addResponsibilityValue"
export const KEY_AMOUNT_PEOPLE_EACH_CAR = "numInCar"

const { startValueDate, showTime } = updateInsuranceEffectiveDate()

export const initialValues = ({
    [KEY_COUPON_CODE]: "",

    [KEY_FULLNAME]: "",
    [KEY_ADDRESS]: "",
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",

    [KEY_VEHICLE_TYPE]: "",
    [KEY_NUMBER_PLATE]: "",
    [KEY_MANUFACTURER_VEHICLE]: "",
    [KEY_LINE_VEHICLE]: "",

    [KEY_FRAME_NUMBER]: "",
    [KEY_MACHINE_NUMBER]: "",

    [KEY_TOGGLE_BBTNDS]: true,
    [KEY_DURATION]: MIN_DURATION,
    [KEY_DATE_INSUR_FROM]: moment(startValueDate).utc(true).format(DATE_FORMAT),
    [KEY_TIME_INSUR_FROM]: moment().hours(showTime).utc(true).format("H") + ":00",
    [KEY_DATE_INSUR_TO]: moment(startValueDate).add(MIN_DURATION, "M").utc(true).format(DATE_FORMAT),
    [KEY_TIME_INSUR_TO]: moment().hours(showTime).utc(true).format("H") + ":00",
    [KEY_TOGGLE_TAI_NAN]: false,
    [KEY_ADD_RESPONSIBILITY_VALUE]: 5,
    [KEY_AMOUNT_PEOPLE_EACH_CAR]: 2,
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const phoneNumber = values[KEY_PHONE_NUMBER]
        const email = values[KEY_EMAIL]

        if (phoneNumber && !phoneNumber.match(nullStrRegex) || email && !email.match(nullStrRegex)) return {}

        if (!email || email.match(nullStrRegex)) {
            errors[KEY_EMAIL] = ALERT_INVALID
            return errors
        }
        if (!phoneNumber || phoneNumber.match(nullStrRegex)) {
            errors[KEY_PHONE_NUMBER] = ALERT_INVALID
            return errors
        }

        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_FULLNAME]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
    ,
    [KEY_ADDRESS]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
        .matches(phoneNumberRegex, ALERT_INVALID)
    ,
    [KEY_EMAIL]: Yup.string()
        .matches(emailRegex, ALERT_INVALID)
    ,

    [KEY_VEHICLE_TYPE]: Yup.string()
        .required()
    ,
    [KEY_NUMBER_PLATE]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
    ,
    [KEY_MANUFACTURER_VEHICLE]: Yup.string()
        .required()
    ,
    [KEY_LINE_VEHICLE]: Yup.string()
        .required()
    ,
})