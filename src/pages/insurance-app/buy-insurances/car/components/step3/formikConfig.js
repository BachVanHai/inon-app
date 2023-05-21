import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as Yup from 'yup'
import {
    ALERT_EMPTY, selectErrorStyles as _selectErrorStyles, selectNormalStyles as _selectNormalStyles,
    KEY_CITY as _KEY_CITY, KEY_DISTRICT as _KEY_DISTRICT, KEY_WARD as _KEY_WARD,
    getDefault_addressessSchema, getDefault_addressValidate, ID_TYPE_CMND as _ID_TYPE_CMND,
    ID_TYPE_CCCD as _ID_TYPE_CCCD, ID_TYPE_HC as _ID_TYPE_HC,
    ID_TYPE_MST as _ID_TYPE_MST, GENDER_TYPE_MALE, GENDER_TYPE_FEMALE, GENDER_TYPE_OTHER, ALERT_MIN_VND, DATE_FORMAT, nullStrRegex, emailRegex, ALERT_INVALID, phoneNumberRegex
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { convertStrToNumber, sleepingFor } from '../../../../../../ultity'
import moment from 'moment'

export const ID_TYPE_CMND = _ID_TYPE_CMND
export const ID_TYPE_CCCD = _ID_TYPE_CCCD
export const ID_TYPE_HC = _ID_TYPE_HC
export const ID_TYPE_MST = _ID_TYPE_MST

export const CUSTOMER_ORG = 'ORG'
export const CUSTOMER_INV = 'INV'
export const CUSTOMER_BANK = 'BANK'

export const selectErrorStyles = _selectErrorStyles
export const selectNormalStyles = _selectNormalStyles

export const IDTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
        content: ID_TYPE_CMND,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
        content: ID_TYPE_CCCD,
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
        content: ID_TYPE_HC,
        value: 3,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDMST`)} />,
        content: ID_TYPE_MST,
        value: 4,
    },
]

export const sugg_gender = [
    {
        value: 1,
        content: GENDER_TYPE_MALE,
        label: <FormattedMessage id={getKeyLang(`Male`)} />
    },
    {
        value: 2,
        content: GENDER_TYPE_FEMALE,
        label: <FormattedMessage id={getKeyLang(`Female`)} />,
    },
    {
        value: 3,
        content: GENDER_TYPE_OTHER,
        label: <FormattedMessage id={getKeyLang(`Other`)} />,
    }
]

export const KEY_CUST_TYPE = "custType"

export const KEY_IC_TYPE = "idType"
export const KEY_IC_NO = "idOwnerNum"
export const KEY_FULLNAME = "ownerName"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_PHONE_NUMBER = "ownerPhone"
export const KEY_EMAIL = "ownerEmail"
export const KEY_GENDER = "ownerSex"

export const KEY_CITY = _KEY_CITY
export const KEY_DISTRICT = _KEY_DISTRICT
export const KEY_WARD = _KEY_WARD
export const KEY_ADDRESS = "ownerAddr"

export const KEY_TOGGLE_CHUYENQUYEN_TH = "toggleChuyenQuyenThuHuong"
export const KEY_BENEFIARRY_BANK_SELETECTED = "bankName"
export const KEY_BENEFICIARY_BRANCH = "banchName"
export const KEY_BENEFICIARY_ADDRESS = "bankAddr"
export const KEY_BENEFICIARY_LIMIT = "amountAlter"

export const initialValues = ({
    [KEY_CUST_TYPE]: CUSTOMER_INV,

    [KEY_IC_TYPE]: IDTypes[0].content,
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().subtract(18, "y").utc(true).format(DATE_FORMAT),
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_GENDER]: sugg_gender[0].content,

    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",

    [KEY_TOGGLE_CHUYENQUYEN_TH]: false,
    [KEY_BENEFIARRY_BANK_SELETECTED]: "",
    [KEY_BENEFICIARY_BRANCH]: "",
    [KEY_BENEFICIARY_ADDRESS]: "",
    [KEY_BENEFICIARY_LIMIT]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const { [KEY_EMAIL]: email } = values
        if (email || !email.match(nullStrRegex)) {
            if (!email.match(emailRegex)) {
                errors[KEY_EMAIL] = ALERT_INVALID
                return errors
            }
        }
        if (values[KEY_TOGGLE_CHUYENQUYEN_TH]) {
            const { [KEY_BENEFICIARY_LIMIT]: beneficiaryLimit } = values
            const _beneficiaryLimit = convertStrToNumber(beneficiaryLimit)

            if (_beneficiaryLimit < 1_000_000) {
                errors[KEY_BENEFICIARY_LIMIT] = ALERT_MIN_VND
            }
            return errors
        }
        return getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_IC_TYPE]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_FULLNAME]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_DATE_BIRTH]: Yup.string()
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
    ,
    [KEY_BENEFIARRY_BANK_SELETECTED]: Yup.string()
        .when(KEY_TOGGLE_CHUYENQUYEN_TH, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        })
    ,
    [KEY_BENEFICIARY_BRANCH]: Yup.string()
        .when(KEY_TOGGLE_CHUYENQUYEN_TH, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        })
    ,
    [KEY_BENEFICIARY_ADDRESS]: Yup.string()
        .when(KEY_TOGGLE_CHUYENQUYEN_TH, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        })
    ,
} , [[KEY_PHONE_NUMBER, KEY_EMAIL]])
