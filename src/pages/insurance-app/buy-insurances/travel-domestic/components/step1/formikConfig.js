import React from 'react'
import moment from 'moment'
import * as Yup from 'yup'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isArrayEmpty, isObjEmpty, sleepingFor } from '../../../../../../ultity'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { relationships, RELATIONSHIP_SELF } from './utility'
import { BaseAppConfigs } from 'base-app'

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

export const sugg_gender = [
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

export const KEY_ADDTIONAL_PEOPLE = "addtinalPeople"
export const KEY_IC_TYPE = "icType"
export const KEY_IC_NO = "icNo"
export const KEY_FULLNAME = "fullname"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"
export const KEY_GENDER = "gender"
export const KEY_HAVE_BOUGHT_FOR_ME = "haveBoughtForMe"
export const KEY_RELATIONSHIP = 'relationship'
export const KEY_BANK = "bank"
export const KEY_STK  = "accountNumber"
export const KEY_ACCOUNT_NUMBER = 'cardNumber'
export const KEY_CLICKED_CLOSE_POPUP = 'clickedPopup'

export const KEY_CITY = config.KEY_CITY
export const KEY_DISTRICT = config.KEY_DISTRICT
export const KEY_WARD = config.KEY_WARD
export const KEY_ADDRESS = config.KEY_ADDRESS

export const addtionalPeopleInitValue = ({
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().utc(true).format(config.DATE_FORMAT),  
    [KEY_GENDER]: "",
})

export const initialValues = ({
    [KEY_IC_TYPE]: "",
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().utc(true).format(config.DATE_FORMAT),
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_GENDER]: sugg_gender[0].content,
    [KEY_HAVE_BOUGHT_FOR_ME]: false,
    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",
    [KEY_CLICKED_CLOSE_POPUP] : false,

    [KEY_ADDTIONAL_PEOPLE]: [
        { ...addtionalPeopleInitValue }
    ],
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const {
            [KEY_ADDTIONAL_PEOPLE]: _addtinalPeople,
        } = values
    
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_ADDTIONAL_PEOPLE]: Yup.array()
        .of(Yup.object().shape({
            [KEY_FULLNAME]: Yup.string()
                .matches(config.nameRegex, config.ALERT_INVALID)
                .required(config.ALERT_EMPTY)
            ,
            [KEY_GENDER]: Yup.string()
                .required(config.ALERT_EMPTY)
            ,
            [KEY_IC_NO]: Yup.string()
            .matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX, "Vui lòng nhập đúng định dạng").required(config.ALERT_EMPTY)
        }))
    ,
    [KEY_FULLNAME]: Yup.string()
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
    [KEY_CITY]: Yup.string()
        .required(config.ALERT_EMPTY)
    ,
    [KEY_DISTRICT]: Yup.string()
        .required(config.ALERT_EMPTY)
    ,
    [KEY_WARD]: Yup.string()
        .required(config.ALERT_EMPTY)
    ,
    ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD),   
})
