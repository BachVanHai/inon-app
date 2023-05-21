import * as Yup from 'yup'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor, updateInsuranceEffectiveDate } from '../../../../../../ultity'
import moment from 'moment'

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
        let errors
        return errors
    })
}

export const validationSchema = Yup.object().shape({})