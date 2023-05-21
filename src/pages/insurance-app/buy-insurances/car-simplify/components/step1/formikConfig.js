import * as Yup from 'yup'
import { sleepingFor } from '../../../../../../ultity'
import { sugg_Purpose, sugg_vehicleStatus } from '../../../car/components/step1/formikConfig'

export const KEY_VEHICLE_STATUS = "vehicleStatus"
export const KEY_NUMBER_PLATE = "numberPlate"
export const KEY_VEHICLE_TYPE = "vehicleType"
export const KEY_CAPACITY_TYPE = "capacityType"
export const KEY_MANUFACTURER_NAME = "manufacturerName"
export const KEY_BRAND_NAME = "brandName"
export const KEY_PURPOSE = "usage"
export const KEY_CHASSIS_NUMBER = "frameNo"
export const KEY_ENGINE_NUMBER = "machineNo"
export const KEY_GT_XE_KHAIBAO = "initValue"
export const KEY_GTBH_YEUCAU = "contractValue"
export const KEY_ORIGIN_PRODUCT = "issPlace"
export const KEY_YEAR_PRODUCT = "issDate"
export const KEY_CONTRACT_ID = "contractId"

export const KEY_SEATS = "seats"
export const KEY_LOADS = "loads"
export const KEY_MIN_SEATS = "minSeats"
export const KEY_MIN_LOADS = "minLoads"
export const KEY_MAX_SEATS = "maxSeats"
export const KEY_MAX_LOADS = "maxLoads"
export const KEY_INON_TYPE = "inonType"
export const KEY_BUSINESS_STATUS = "businessStatus"
export const KEY_MANUFACTURER_VEHICLE = "manufactureVehicleName"
export const KEY_NAME = "fullname"
export const KEY_ADDRESS = "ownerAddr"



export const KEY_IC_TYPE = "idType"
export const KEY_IC_NO = "idOwnerNum"
export const KEY_FULLNAME = "ownerName"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_PHONE_NUMBER = "ownerPhone"
export const KEY_EMAIL = "ownerEmail"
export const KEY_GENDER = "ownerSex"
export const initialValues = ({
    [KEY_BRAND_NAME]: "",
    [KEY_CONTRACT_ID] : "",
    [KEY_MANUFACTURER_NAME] : "",
    [KEY_NUMBER_PLATE] : "",
    [KEY_SEATS] :"",
    [KEY_PURPOSE] : sugg_Purpose[0].temp,
    [KEY_VEHICLE_STATUS] : 'NEW',
    [KEY_VEHICLE_TYPE] : 1,
    [KEY_IC_TYPE] : "CCCD",
    [KEY_IC_NO] : "",
    [KEY_FULLNAME] : "",
    [KEY_DATE_BIRTH] : "",
    [KEY_GENDER] :""
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        /** validate code here */
        return errors
    })
}