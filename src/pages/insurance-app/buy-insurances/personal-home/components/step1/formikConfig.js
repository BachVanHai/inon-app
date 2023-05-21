import React from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import * as Yup from 'yup'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import Utils from '../../../../../../configs/insurance-app/constants/Utils'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'

export const insuredPersonTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`houseOwner`)} />,
        content: "OWNER",
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`hiredPerson`)} />,
        content: "OTHER",
        value: 2,
    },
]

export const IDTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
        content: config.ID_TYPE_CMND,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
        content: config.ID_TYPE_CCCD,
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
        content: config.ID_TYPE_HC,
        value: 3,
    },
]

export const sugg_Sex = [
    {
        value: "1",
        content: "MALE",
        label: <FormattedMessage id={getKeyLang(`Male`)} />
    },
    {
        value: "2",
        content: "FEMALE",
        label: <FormattedMessage id={getKeyLang(`Female`)} />,
    },
    {
        value: "3",
        content: "OTHER",
        label: <FormattedMessage id={getKeyLang(`Other`)} />,
    }
]

export const houseTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`apartment`)} />,
        content: "APARTMENT",
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`villa`)} />,
        content: "VILLA",
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`Other`)} />,
        content: "OTHER",
        value: 3,
    },
]

export const KEY_INSURED_TYPE = "houseOwnerType"

export const KEY_IC_TYPE = "icType"
export const KEY_ISSUED_DATE = "issuedDate"
export const KEY_ISSUED_PLACE = "issuedPlace"

export const KEY_IC_NO = "icNo"
export const KEY_FULL_NAME = "fullName"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"
export const KEY_GENDER = "gender"

export const KEY_CITY = config.KEY_CITY
export const KEY_DISTRICT = config.KEY_DISTRICT
export const KEY_WARD = config.KEY_WARD
export const KEY_ADDRESS = config.KEY_ADDRESS

export const KEY_TOGGLE_IS_ADDRESS_EQUAL = "theSameAddress"
export const KEY_ADDTIONAL_ADDRESSES = "houseAddressDTO"

export const KEY_HOUSE_TYPE = "houseType"
export const MAX_USED_TIME = 24
export const KEY_TIME_USED = "usedTime"

export const addtionalAddressDefault = {
    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",
}

export const initialValues = ({
    [KEY_INSURED_TYPE]: insuredPersonTypes[0].content,

    [KEY_IC_TYPE]: config.ID_TYPE_CMND,
    [KEY_ISSUED_DATE]: "",
    [KEY_ISSUED_PLACE]: "",

    [KEY_IC_NO]: "",
    [KEY_FULL_NAME]: "",
    [KEY_DATE_BIRTH]: moment().subtract(18, "years").format(config.DATE_FORMAT),
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_GENDER]: sugg_Sex[0].content,

    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",

    [KEY_TOGGLE_IS_ADDRESS_EQUAL]: true,
    [KEY_ADDTIONAL_ADDRESSES]: [],

    [KEY_HOUSE_TYPE]: houseTypes[0].content,
    [KEY_TIME_USED]: 10
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const { [KEY_CITY]: city, [KEY_ADDRESS]: address, [KEY_TIME_USED]: usedTime } = values

        if (usedTime > MAX_USED_TIME) {
            errors[KEY_TIME_USED] = config.getDefault_maxAlert(MAX_USED_TIME, "năm")
            return errors
        }

        if (!values[KEY_TOGGLE_IS_ADDRESS_EQUAL]) {
            if (!city) {
                if (!address) {
                    errors[KEY_ADDRESS] = config.ALERT_INVALID
                }
                return errors
            }
            if (city.trim().match(config.nullStrRegex) && address.trim().match(config.nullStrRegex)) {
                errors[KEY_ADDRESS] = config.ALERT_INVALID
            }
            return errors
        }
        if (!city || city.trim().match(config.nullStrRegex)) {
            errors[KEY_CITY] = config.ALERT_INVALID
        }
        if (!address || address.trim().match(config.nullStrRegex)) {
            errors[KEY_ADDRESS] = config.ALERT_INVALID
        }
        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_IC_TYPE]: Yup.string()
        .required(config.ALERT_EMPTY)
    ,
    ...config.getDefault_validateSchemaIcNo(KEY_IC_NO, KEY_IC_TYPE)
    ,
    [KEY_ISSUED_DATE]: Yup.string()
        .required(config.ALERT_EMPTY)
        .nullable(true)
    ,
    [KEY_ISSUED_PLACE]: Yup.string()
        .min(3, config.ALERT_MIN)
        .required(config.ALERT_EMPTY)
    ,
    [KEY_FULL_NAME]: Yup.string()
        .min(3, config.ALERT_MIN)
        .matches(config.nameRegex, config.ALERT_INVALID)
        .required(config.ALERT_EMPTY)
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
        .matches(config.phoneNumberRegex, config.ALERT_INVALID)
        .required(config.ALERT_EMPTY)
    ,
    [KEY_EMAIL]: Yup.string()
        .matches(config.emailRegex, config.ALERT_INVALID)
        .required(config.ALERT_EMPTY)
    ,
    [KEY_TIME_USED]: Yup.string()
        .matches(config.numberRegex, config.ALERT_INVALID)
        .required(config.ALERT_EMPTY)
    ,

    ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
    ,

    [KEY_ADDTIONAL_ADDRESSES]: Yup.array()
        .of(Yup.object().shape({
            [KEY_CITY]: Yup.string()
                .when(KEY_TOGGLE_IS_ADDRESS_EQUAL, (value) => {
                    if (!value) {
                        return Yup.string()
                            .required(config.ALERT_INVALID)
                    }
                })
            ,
            ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
            ,
            [KEY_ADDRESS]: Yup.string()
                .when(KEY_TOGGLE_IS_ADDRESS_EQUAL, (value) => {
                    if (!value) {
                        return Yup.string()
                            .required(config.ALERT_INVALID)
                    }
                })
            ,
        }))
    ,
})
