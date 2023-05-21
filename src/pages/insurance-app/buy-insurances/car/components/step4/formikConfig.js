import * as Yup from 'yup'
import { ALERT_EMPTY } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { VEHICLE_STATUS_NEW, VEHICLE_STATUS_ROLLOVER, KEY_VEHICLE_STATUS } from '../step1/formikConfig'

export const KEY_UPLOAD_REGISTER_CAR = "uploadRegisterCar"
export const KEY_UPLOAD_TEM_CAR = "uploadTemCar"
export const KEY_UPLOAD_CHASSIS_NUMBER = "uploadChassisNumber"

export const KEY_UPLOAD_BEFORE_MAIN_SEAT_CAR = "uploadBeforeMainSeatCar"
export const KEY_UPLOAD_BEFORE_SUB_SEAT_CAR = "uploadBeforeSubSeatCar"
export const KEY_UPLOAD_AFTER_MAIN_SEAT_CAR = "uploadAfterMainSeatCar"
export const KEY_UPLOAD_AFTER_SUB_SEAT_CAR = "uploadAfterSubSeatCar"
export const KEY_IS_FICO_USER = "isFicoUser"

export const initialValues = ({
    [KEY_VEHICLE_STATUS]: null,

    [KEY_UPLOAD_REGISTER_CAR]: null,
    [KEY_UPLOAD_TEM_CAR]: null,
    [KEY_UPLOAD_CHASSIS_NUMBER]: null,

    [KEY_UPLOAD_BEFORE_MAIN_SEAT_CAR]: null,
    [KEY_UPLOAD_BEFORE_SUB_SEAT_CAR]: null,
    [KEY_UPLOAD_AFTER_MAIN_SEAT_CAR]: null,
    [KEY_UPLOAD_AFTER_SUB_SEAT_CAR]: null,
    [KEY_IS_FICO_USER]: false,
})

const validateSchema = Yup.string()
    .when(KEY_VEHICLE_STATUS, (value) => {
        if (value !== VEHICLE_STATUS_NEW && value !== VEHICLE_STATUS_ROLLOVER) {
            return Yup.string().required(ALERT_EMPTY)
        }
        return Yup.string().nullable(true)
    }).when(KEY_IS_FICO_USER, (value) => value ? Yup.string().required(ALERT_EMPTY) : Yup.string().nullable(true))

export const validationSchema = Yup.object().shape({
    [KEY_UPLOAD_REGISTER_CAR]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_UPLOAD_TEM_CAR]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_UPLOAD_CHASSIS_NUMBER]: Yup.string()
        .required(ALERT_EMPTY)
    ,

    [KEY_UPLOAD_BEFORE_MAIN_SEAT_CAR]: validateSchema
    ,
    [KEY_UPLOAD_BEFORE_SUB_SEAT_CAR]: validateSchema
    ,
    [KEY_UPLOAD_AFTER_MAIN_SEAT_CAR]: validateSchema
    ,
    [KEY_UPLOAD_AFTER_SUB_SEAT_CAR]: validateSchema
    ,
})
