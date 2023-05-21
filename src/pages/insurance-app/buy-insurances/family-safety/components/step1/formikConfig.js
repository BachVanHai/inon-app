import * as Yup from 'yup'
import {
    ID_TYPE_CMND as _ID_TYPE_CMND, ID_TYPE_CCCD as _ID_TYPE_CCCD, ID_TYPE_HC as _ID_TYPE_HC,
    ALERT_EMPTY, ALERT_INVALID, emailRegex, phoneNumberRegex, getDefault_addressessSchema,
    getDefault_addressValidate, nameRegex, getDefault_keyAddresses, getDefault_validateSchemaIcNo
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'

export const PERSON_TAB = "person-tab"
export const ORGANIZATION_TAB = "organization-tab"

export const ID_TYPE_CMND = _ID_TYPE_CMND
export const ID_TYPE_CCCD = _ID_TYPE_CCCD
export const ID_TYPE_HC = _ID_TYPE_HC

export const KEY_IC_TYPE = "icType"
export const KEY_IC_NO = "icNo"
export const KEY_FULLNAME = "fullName"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"
const [city, district, ward, address] = getDefault_keyAddresses()
export const KEY_CITY = city
export const KEY_DISTRICT = district
export const KEY_WARD = ward
export const KEY_ADDRESS = address

export const initialValues_pers = ({
    [KEY_IC_TYPE]: ID_TYPE_CMND,
    [KEY_IC_NO]: ``,
    [KEY_FULLNAME]: ``,
    [KEY_PHONE_NUMBER]: ``,
    [KEY_EMAIL]: ``,
    [KEY_CITY]: ``,
    [KEY_DISTRICT]: ``,
    [KEY_WARD]: ``,
    [KEY_ADDRESS]: ``,
})

export const validate_pers = (values) => {
    return sleepingFor().then(() => {
        return getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
    })
}

export const validationSchema_pers = Yup.object().shape({
    ...getDefault_validateSchemaIcNo(KEY_IC_NO, KEY_IC_TYPE)
    ,
    [KEY_FULLNAME]: Yup.string()
        .matches(nameRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
        .matches(phoneNumberRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    [KEY_EMAIL]: Yup.string()
        .matches(emailRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    ...getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
})


export const initialValues_organization = ({
    [KEY_IC_NO]: ``,
    [KEY_FULLNAME]: ``,
    [KEY_PHONE_NUMBER]: ``,
    [KEY_EMAIL]: ``,
    [KEY_CITY]: ``,
    [KEY_DISTRICT]: ``,
    [KEY_WARD]: ``,
    [KEY_ADDRESS]: ``,
})

export const validate_organization = (values) => {
    return sleepingFor().then(() => {
        return getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
    })
}

export const validationSchema_organization = Yup.object().shape({
    ...getDefault_validateSchemaIcNo(KEY_IC_NO, KEY_IC_TYPE)
    ,
    [KEY_FULLNAME]: Yup.string()
        .matches(nameRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
        .matches(phoneNumberRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    [KEY_EMAIL]: Yup.string()
        .matches(emailRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    ...getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
})
