import * as Yup from 'yup'
import { sleepingFor } from '../../../../../../ultity'

export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"

export const KEY_VEHICLE_TYPE = "TypeVehicle"
export const KEY_VEHICLES_TYPE = "typeVehicles"
export const KEY_NUMBER_PLATE = "numberPlate"
export const KEY_MANUFACTURER_VEHICLE = "manufactureVehicleName"
export const KEY_LINE_VEHICLE = "brandVehicleName"

export const KEY_FRAME_NUMBER = "frameNumber"
export const KEY_MACHINE_NUMBER = "machineNumber"

export const KEY_FULLNAME = "fullname"
export const KEY_ADDRESS = "address"

export const initialValues = ({
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",

    [KEY_VEHICLE_TYPE]: "",
    [KEY_VEHICLES_TYPE]: [],
    [KEY_NUMBER_PLATE]: "",
    [KEY_MANUFACTURER_VEHICLE]: "",
    [KEY_LINE_VEHICLE]: "",

    [KEY_FRAME_NUMBER]: "",
    [KEY_MACHINE_NUMBER]: "",

    [KEY_FULLNAME]: "",
    [KEY_ADDRESS]: "Hà Nội",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        /** validate code here */
        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_NUMBER_PLATE]: Yup.string()
        .required()
    ,
    [KEY_MANUFACTURER_VEHICLE]: Yup.string()
        .required()
    ,
    [KEY_LINE_VEHICLE]: Yup.string()
        .required()
    ,
    [KEY_FULLNAME]: Yup.string()
        .required()
    ,
    [KEY_ADDRESS]: Yup.string()
        .required()
    ,
})