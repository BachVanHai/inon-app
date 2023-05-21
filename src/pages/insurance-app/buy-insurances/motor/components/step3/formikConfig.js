import * as Yup from 'yup'
import moment from 'moment'
import { ALERT_EMPTY, ALERT_INVALID, DATE_FORMAT, emailRegex, GENDER_TYPE_MALE, getDefault_addressessSchema, getDefault_addressValidate, ID_TYPE_CMND, phoneNumberRegex } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'

export const KEY_IC_TYPE = "icType"
export const KEY_IC_NO = "icNo"
export const KEY_FULLNAME = "fullname"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_GENDER = "gender"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"
export const KEY_ADDRESS = "address"
export const KEY_CITY = "city"
export const KEY_WARD = "ward"
export const KEY_DISTRICT = "district"

export const KEY_BRANCH_NAME = "branchName"

export const initialValues = ({
    [KEY_IC_TYPE]: ID_TYPE_CMND,
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().subtract(18, "years").format(DATE_FORMAT),
    [KEY_GENDER]: GENDER_TYPE_MALE,
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_ADDRESS]: "",
    [KEY_CITY]: "",
    [KEY_WARD]: "",
    [KEY_DISTRICT]: "",

    [KEY_BRANCH_NAME]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        return getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_FULLNAME]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
    .when(KEY_EMAIL , {
        is :  undefined ,
        then : Yup.string().required(ALERT_EMPTY).matches(phoneNumberRegex, ALERT_INVALID)
    }),
    [KEY_EMAIL] : Yup.string().when(KEY_PHONE_NUMBER , {
        is :  undefined,
        then : Yup.string().required(ALERT_EMPTY).matches(emailRegex, ALERT_INVALID)
    }),
    ...getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
},[[KEY_PHONE_NUMBER, KEY_EMAIL]])