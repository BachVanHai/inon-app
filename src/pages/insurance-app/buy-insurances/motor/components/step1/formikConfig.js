import * as Yup from 'yup'
import { ALERT_EMPTY, ALERT_MIN } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'

export const KEY_NUMBER_PLATE = "numberPlate"
export const KEY_VEHICLE_TYPE = "TypeVehicle"
export const KEY_FRAME_NUMBER = "frameNumber"
export const KEY_MACHINE_NUMBER = "machineNumber"
export const KEY_MANUFACTURER_VEHICLE = "manufactureVehicleName"
export const KEY_LINE_VEHICLE = "brandVehicleName"

export const KEY_USER_NAME = "name"
export const KEY_USER_ADDRESS = "address"

export const initialValues = ({
    [KEY_NUMBER_PLATE]: "",
    [KEY_VEHICLE_TYPE]: "",

    [KEY_FRAME_NUMBER]: "",
    [KEY_MACHINE_NUMBER]: "",

    [KEY_MANUFACTURER_VEHICLE]: "",
    [KEY_LINE_VEHICLE]: "",

    [KEY_USER_NAME]: "",
    [KEY_USER_ADDRESS]: ""
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors

        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_NUMBER_PLATE]: Yup.string()
        .min(3, ALERT_MIN)
        .required(ALERT_EMPTY)
    ,
    [KEY_VEHICLE_TYPE]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    // Temporary disable frameNumber and machineNumber
    // [KEY_FRAME_NUMBER]: Yup.string()
    //     .required(ALERT_EMPTY)
    // ,
    // [KEY_MACHINE_NUMBER]: Yup.string()
    //     .required(ALERT_EMPTY)
    // ,
    [KEY_MANUFACTURER_VEHICLE]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_LINE_VEHICLE]: Yup.string()
        .required(ALERT_EMPTY)
    ,
})