import React from 'react'
import * as Yup from 'yup'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { FormattedMessage } from 'react-intl'
import { isObjEmpty, sleepingFor } from '../../../../../../ultity'

export const PERSONAL_TAB = 'personal-tab'
export const GROUP_TAB = 'group-tab'

export const INSURANCE_TYPE_RENEWALS = 'renewals'
export const INSURANCE_TYPE_NEW = 'new'

export const RELATIONSHIP_SELF = 'SELF'
export const RELATIONSHIP_GRANDFATHER = 'GRANDFATHER'
export const RELATIONSHIP_GRANDMOTHER = 'GRANDMOTHER'
export const RELATIONSHIP_FATHER = 'FATHER'
export const RELATIONSHIP_MOTHER = 'MOTHER'
export const RELATIONSHIP_WIFE = 'WIFE'
export const RELATIONSHIP_HUSBAND = 'HUSBAND'
export const RELATIONSHIP_CHILD = 'CHILD'
export const RELATIONSHIP_OLDERBROTHER = 'OLDERBROTHER'
export const RELATIONSHIP_OLDERSISTER = 'OLDERSISTER'
export const RELATIONSHIP_BROTHER = 'BROTHER'
export const RELATIONSHIP_SISTER = 'SISTER'
export const RELATIONSHIP_GRANDCHILDREN = 'GRANDCHILDREN'
export const RELATIONSHIP_OTHER = 'OTHER'

export const ALERT_EMPTY = config.ALERT_EMPTY
export const ALERT_MIN = config.ALERT_MIN
export const ALERT_INVALID = config.ALERT_INVALID

export const ID_TYPE_CMND = config.ID_TYPE_CMND
export const ID_TYPE_CCCD = config.ID_TYPE_CCCD
export const ID_TYPE_HC = config.ID_TYPE_HC

export const GENDER_TYPE_MALE = config.GENDER_TYPE_MALE
export const GENDER_TYPE_FEMALE = config.GENDER_TYPE_FEMALE

export const relationships = [
    {
        label: <FormattedMessage id={getKeyLang(`grandFather`)} />,
        content: RELATIONSHIP_GRANDFATHER,
        value: 0,
    },
    {
        label: <FormattedMessage id={getKeyLang(`grandMother`)} />,
        content: RELATIONSHIP_GRANDMOTHER,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`father`)} />,
        content: RELATIONSHIP_FATHER,
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`mother`)} />,
        content: RELATIONSHIP_MOTHER,
        value: 3,
    },
    {
        label: <FormattedMessage id={getKeyLang(`wife`)} />,
        content: RELATIONSHIP_WIFE,
        value: 4,
    },
    {
        label: <FormattedMessage id={getKeyLang(`husband`)} />,
        content: RELATIONSHIP_HUSBAND,
        value: 5,
    },
    {
        label: <FormattedMessage id={getKeyLang(`child`)} />,
        content: RELATIONSHIP_CHILD,
        value: 6,
    },
    {
        label: <FormattedMessage id={getKeyLang(`olderBrother`)} />,
        content: RELATIONSHIP_OLDERBROTHER,
        value: 7,
    },
    {
        label: <FormattedMessage id={getKeyLang(`olderSister`)} />,
        content: RELATIONSHIP_OLDERSISTER,
        value: 8,
    },
    {
        label: <FormattedMessage id={getKeyLang(`brother`)} />,
        content: RELATIONSHIP_BROTHER,
        value: 9,
    },
    {
        label: <FormattedMessage id={getKeyLang(`sister`)} />,
        content: RELATIONSHIP_SISTER,
        value: 10,
    },
    {
        label: <FormattedMessage id={getKeyLang(`grandChildren`)} />,
        content: RELATIONSHIP_GRANDCHILDREN,
        value: 11,
    },
    {
        label: <FormattedMessage id={getKeyLang(`Other`)} />,
        content: RELATIONSHIP_OTHER,
        value: 12,
    },
]

export const insuranceTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`renewals`)} />,
        content: INSURANCE_TYPE_RENEWALS,
        value: 0,
    },
    {
        label: <FormattedMessage id={getKeyLang(`newPurchase`)} />,
        content: INSURANCE_TYPE_NEW,
        value: 1,
    },
]

export const IDTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
        content: ID_TYPE_CMND,
        value: 0,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
        content: ID_TYPE_CCCD,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
        content: ID_TYPE_HC,
        value: 2,
    },
]

export const genderTypes = [
    {
        label: <FormattedMessage id={getKeyLang(`male`)} />,
        content: GENDER_TYPE_MALE,
        value: 0,
    },
    {
        label: <FormattedMessage id={getKeyLang(`female`)} />,
        content: GENDER_TYPE_FEMALE,
        value: 1,
    },
]

export const KEY_INSURANCE_TYPES = "insuranceTypes"
export const KEY_GCN_CONTRACT_PREFIX = "gcnContractPrefix"
export const KEY_ADDTIONAL_PEOPLE = "addtionalPeople"

export const KEY_IC_TYPE = "icType"
export const KEY_IC_NO = "icNo"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_FULLNAME = "fullName"
export const KEY_RELATIONSHIP = "relationship"
export const KEY_GENDER = "gender"
export const KEY_PHONE_NUMBER = "phoneNumber"
export const KEY_EMAIL = "email"

export const addtionalPeopleDefault = {
    [KEY_IC_TYPE]: ID_TYPE_CMND,
    [KEY_IC_NO]: ``,
    [KEY_DATE_BIRTH]: ``,
    [KEY_FULLNAME]: ``,
    [KEY_RELATIONSHIP]: ``,
    [KEY_GENDER]: ``,
    [KEY_PHONE_NUMBER]: ``,
    [KEY_EMAIL]: ``,
}

export const initialValues_group = ({
    [KEY_INSURANCE_TYPES]: INSURANCE_TYPE_NEW,
    [KEY_GCN_CONTRACT_PREFIX]: ``,
    [KEY_ADDTIONAL_PEOPLE]: [
        addtionalPeopleDefault
    ],
})

function checkPropOf(prop, KEY_PROP, regexOpt, index = 0) {
    let errors = {}
    if (!prop || prop.trim().length === 0) {
        errors[KEY_ADDTIONAL_PEOPLE] = []
        for (let i = 0; i <= index; ++i) {
            errors[KEY_ADDTIONAL_PEOPLE].push({})
        }
        errors[KEY_ADDTIONAL_PEOPLE][index][KEY_PROP] = ALERT_EMPTY
        return errors
    }
    if (prop && regexOpt !== config.nullStrRegex && !prop.trim().match(regexOpt)) {
        errors[KEY_ADDTIONAL_PEOPLE] = []
        for (let j = 0; j <= index; ++j) {
            errors[KEY_ADDTIONAL_PEOPLE].push({})
        }
        errors[KEY_ADDTIONAL_PEOPLE][index][KEY_PROP] = ALERT_INVALID
        return errors
    }
    return errors
}

function checkIcNo(icNo, icType, index) {
    let errors = {}
    switch (icType) {
        case ID_TYPE_CMND:
            return checkPropOf(icNo, KEY_IC_NO, config.personalIdRegex, index)
        case ID_TYPE_CCCD:
            return checkPropOf(icNo, KEY_IC_NO, config.citizenIndentifyRegex, index)
        case ID_TYPE_HC:
            return checkPropOf(icNo, KEY_IC_NO, config.passportRegex, index)
        default:
            return errors
    }
}

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}

        const addtionalPeople = values[KEY_ADDTIONAL_PEOPLE]
        const { [KEY_PHONE_NUMBER]: phoneNumber, [KEY_EMAIL]: email, } = addtionalPeople[0]

        errors = checkPropOf(phoneNumber, KEY_PHONE_NUMBER, config.phoneNumberRegex)
        if (!isObjEmpty(errors)) return errors /* when errors obj have something return it immediately to avoid conflict */

        errors = checkPropOf(email, KEY_EMAIL, config.emailRegex)
        if (!isObjEmpty(errors)) return errors

        for (let i = 0; i < addtionalPeople.length; ++i) {
            const {
                [KEY_IC_TYPE]: icType, [KEY_IC_NO]: icNo,
                [KEY_RELATIONSHIP]: relationship,
            } = addtionalPeople[i]

            errors = checkIcNo(icNo, icType, i)
            if (!isObjEmpty(errors)) return errors

            if (i > 0) {
                errors = checkPropOf(relationship, KEY_RELATIONSHIP, config.nullStrRegex, i)
                if (!isObjEmpty(errors)) return errors
            }
        }
        return errors
    })
}

export const validationSchema_group = Yup.object().shape({
    [KEY_GCN_CONTRACT_PREFIX]: Yup.string()
        .when(KEY_INSURANCE_TYPES, (value) => {
            if (value === INSURANCE_TYPE_RENEWALS) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
                .nullable(true)
        })
    ,
    [KEY_ADDTIONAL_PEOPLE]: Yup.array()
        .of(Yup.object().shape({
            [KEY_IC_TYPE]: Yup.string()
                .required(ALERT_EMPTY)
            ,
            [KEY_GENDER]: Yup.string()
                .required(ALERT_EMPTY)
            ,
            [KEY_DATE_BIRTH]: Yup.string()
                .required(ALERT_EMPTY)
            ,
            [KEY_FULLNAME]: Yup.string()
                .matches(config.nameRegex, ALERT_MIN)
                .required(ALERT_EMPTY)
            ,
        }))
    ,
})