import * as Yup from 'yup'
import { ALERT_MIN, ALERT_EMPTY, phoneNumberRegex, ALERT_INVALID, emailRegex, personalIdRegex, nameRegex } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

export const KEY_IC_NO = "icNo"
export const KEY_FULLNAME = "fullName"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"
export const KEY_ADDRESS = "address"

export const initialValues = ({
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_ADDRESS]: "",
})

export const validationSchema = Yup.object().shape({
    [KEY_IC_NO]: Yup.string()
      .matches(personalIdRegex, ALERT_INVALID)
      .required(ALERT_EMPTY)
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
    [KEY_ADDRESS]: Yup.string()
      .min(3, ALERT_MIN)
      .required(ALERT_EMPTY)
    ,
})
