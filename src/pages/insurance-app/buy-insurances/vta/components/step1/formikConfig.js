import React from 'react'
import moment from 'moment'
import * as Yup from 'yup'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'

export const relationships = [
    {
        label: <FormattedMessage id={getKeyLang(`myself`)} />,
        content: "BT",
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`parent`)} />,
        content: "BM",
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`couple`)} />,
        content: "VC",
        value: 3,
    },
    {
        label: <FormattedMessage id={getKeyLang(`child`)} />,
        content: "CON",
        value: 4,
    },
    {
        label: <FormattedMessage id={getKeyLang(`siblings`)} />,
        content: "ACE",
        value: 5,
    },
    {
        label: <FormattedMessage id={getKeyLang(`enterprise`)} />,
        content: "DN",
        value: 6,
    },
]

export const insurancePackage = [
    {
        label: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>1</span></div>,
        content: "GOI1",
        value: 1,
    },
    {
        label: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>2</span></div>,
        content: "GOI2",
        value: 2,
    },
    {
        label: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>3</span></div>,
        content: "GOI3",
        value: 3,
    },
]

export const rangeDate = [
    {
        label: <div><span>3</span><span>&nbsp;</span><FormattedMessage id={getKeyLang(`Month`)} /></div>,
        content: 3,
        value: 1,
    },
    {
        label: <div><span>6</span><span>&nbsp;</span><FormattedMessage id={getKeyLang(`Month`)} /></div>,
        content: 6,
        value: 2,
    },
    {
        label: <div><span>12</span><span>&nbsp;</span><FormattedMessage id={getKeyLang(`Month`)} /></div>,
        content: 12,
        value: 3,
    },
]

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

export const KEY_CITY = config.KEY_CITY
export const KEY_DISTRICT = config.KEY_DISTRICT
export const KEY_WARD = config.KEY_WARD
export const KEY_ADDRESS = config.KEY_ADDRESS

export const KEY_RELATIONSHIPS = "relationshipWithBuyer"
export const KEY_INSUR_PACKAGE = "insurancePackage"
export const KEY_RANGE_DATE = "rangeDate"

export const addtionalPeopleInitValue = ({
    [KEY_IC_TYPE]: IDTypes[0].content,
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().subtract(18, "years").format(config.DATE_FORMAT),
    [KEY_RELATIONSHIPS]: "",
    [KEY_INSUR_PACKAGE]: "",
    [KEY_RANGE_DATE]: "",
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",

    // don't use those prop value
    [KEY_GENDER]: "MALE",
    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",
    //
})

export const initialValues = ({
    [KEY_ADDTIONAL_PEOPLE]: [
        addtionalPeopleInitValue
    ],

    [KEY_IC_TYPE]: "",
    [KEY_IC_NO]: "",
    [KEY_FULLNAME]: "",
    [KEY_DATE_BIRTH]: moment().subtract(18, "years").format(config.DATE_FORMAT),
    [KEY_PHONE_NUMBER]: "",
    [KEY_EMAIL]: "",
    [KEY_GENDER]: "MALE",

    [KEY_CITY]: "",
    [KEY_DISTRICT]: "",
    [KEY_WARD]: "",
    [KEY_ADDRESS]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        // const { [KEY_ADDTIONAL_PEOPLE]: _addtinalPeople } = values

        // errors = config.getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
        // if (!isObjEmpty(errors)) return errors /* return errors immediately to avoid conflict */

        // _addtinalPeople.forEach((elt, index) => {
        //     if (!elt[KEY_CITY] || elt[KEY_CITY].match(config.nullStrRegex)) {
        //         if (!elt[KEY_ADDRESS] || elt[KEY_ADDRESS].match(config.nullStrRegex)) {
        //             errors[KEY_ADDTIONAL_PEOPLE] = []
        //             for (let i = 0; i < _addtinalPeople.length; ++i) {
        //                 errors[KEY_ADDTIONAL_PEOPLE].push({})
        //             }
        //             errors[KEY_ADDTIONAL_PEOPLE][index][KEY_ADDRESS] = config.ALERT_INVALID
        //         }
        //     }
        // })
        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_ADDTIONAL_PEOPLE]: Yup.array()
        .of(Yup.object().shape({
            [KEY_FULLNAME]: Yup.string()
                .matches(config.nameRegex, config.ALERT_INVALID)
                .required(config.ALERT_EMPTY)
            ,
            [KEY_DATE_BIRTH]: Yup.string()
                .required(config.ALERT_EMPTY)
            ,
            ...config.getDefault_validateSchmaIcType(KEY_IC_TYPE, KEY_DATE_BIRTH)
            ,
            ...config.getDefault_validateSchemaIcNo(KEY_IC_NO, KEY_IC_TYPE, KEY_DATE_BIRTH)
            ,
            // [KEY_PHONE_NUMBER]: Yup.string()
            //     .matches(config.phoneNumberRegex, config.ALERT_INVALID)
            //     .required(config.ALERT_EMPTY)
            // ,
            // [KEY_EMAIL]: Yup.string()
            //     .matches(config.emailRegex, config.ALERT_INVALID)
            //     .required(config.ALERT_EMPTY)
            // ,
            // [KEY_GENDER]: Yup.string()
            //     .required(config.ALERT_EMPTY)
            // ,
            // ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
            // ,

            [KEY_RELATIONSHIPS]: Yup.string()
                .required(config.ALERT_EMPTY)
            ,
        }))
    ,

    [KEY_IC_TYPE]: Yup.string()
        .required(config.ALERT_EMPTY)
    ,
    ...config.getDefault_validateSchemaIcNo(KEY_IC_NO, KEY_IC_TYPE)
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
    ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD)
    ,
})