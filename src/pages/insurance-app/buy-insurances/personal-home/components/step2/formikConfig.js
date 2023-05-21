import React from 'react'
import moment, { utc } from 'moment'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { convertNumberToCurrency, convertStrToNumber, isObjEmpty, sleepingFor } from '../../../../../../ultity'

export const suggCoverage = [
    {
        value: 1,
        content: "BASIC",
        label: <FormattedMessage id={getKeyLang(`basic`)} />,
    },
    {
        value: 2,
        content: "OVERVIEW",
        label: <FormattedMessage id={getKeyLang(`overall`)} />,
    }
]

export const ALERT_EMPTY = config.ALERT_EMPTY
export const ALERT_INVALID = config.ALERT_INVALID
export const ALERT_MIN = config.ALERT_MIN
export const ALERT_MIN_VND = config.ALERT_MIN_VND

export const durationInitVal = 12
export const KEY_DURATION = "duration"
export const KEY_DATE_INSUR_FROM = "dateInsuranceFrom"
export const KEY_TIME_INSUR_FROM = "timeInsuranceFrom"
export const KEY_DATE_INSUR_TO = "dateInsuranceTo"
export const KEY_TIME_INSUR_TO = "timeInsuranceTo"

export const KEY_COVERAGE = "coverage" // this brannd new key will replace the old key: materialCoverage and assetsCoverage

export const KEY_TOGGLE_MATERIAL_HOME = "toggleMaterialHome"
export const MAX_MATERIAL_LIMIT_COMPENSATED = 10_000_000_000
export const MIN_MATERIAL_LIMIT_COMPENSATED = 300_000_000
export const KEY_MATERIAL_HOME_LIMIT_COMPENSATED = "materialHomeLimitCompensated"
export const KEY_MATERIAL_HOME_COVERAGE = "materialCoverage"

export const KEY_TOGGLE_ASSETS_HOME = "toggleMaterialAssetsHome"
export const MAX_ASSETS_LIMIT_COMPENSATED = 1_000_000_000
export const MIN_ASSETS_LIMIT_COMPENSATED = 300_000_000
export const KEY_ASSESTS_HOME_LIMIT_COMPENSATED = "assetsHomeLimitCompensated"
export const KEY_ASSETS_HOME_COVERAGE = "assetsCoverage"
export const KEY_DEDUCTION = "deduct"

export const KEY_TOGGLE_ALTER_BENEFICIARY = "toggleAlterBeneficiary"
export const KEY_BENEFIARRY_BANK_SELETECTED = "beneficiaryBankSelected"
export const KEY_BENEFICIARY_BRANCH = "beneficiaryBranch"
export const KEY_BENEFICIARY_ADDRESS = "beneficiaryAddress"
export const KEY_BENEFICIARY_LIMIT = "beneficiaryLimit"
export const KEY_FEE_RATE = 'feeRate'
export const KEY_COUPON_CODE = "promoCode"

export const initialValues = ({
    [KEY_DURATION]: durationInitVal,
    [KEY_DATE_INSUR_FROM]: moment().utc(true).format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_FROM]: moment().format("H:mm"),
    [KEY_DATE_INSUR_TO]: moment().utc(true).add(durationInitVal, "M").format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_TO]: moment().format("H:mm"),

    [KEY_COVERAGE]: suggCoverage[0].content, // this brannd new key will replace the old key: materialCoverage and assetsCoverage

    [KEY_TOGGLE_MATERIAL_HOME]: true,
    [KEY_MATERIAL_HOME_LIMIT_COMPENSATED]: "",
    [KEY_MATERIAL_HOME_COVERAGE]: suggCoverage[0].content,

    [KEY_TOGGLE_ASSETS_HOME]: false,
    [KEY_ASSESTS_HOME_LIMIT_COMPENSATED]: "",
    [KEY_ASSETS_HOME_COVERAGE]: suggCoverage[0].content,

    [KEY_DEDUCTION]: 3, /* This is a constant itself, so please don't modify its value */

    [KEY_TOGGLE_ALTER_BENEFICIARY]: false,
    [KEY_BENEFIARRY_BANK_SELETECTED]: "",
    [KEY_BENEFICIARY_BRANCH]: "",
    [KEY_BENEFICIARY_ADDRESS]: "",
    [KEY_BENEFICIARY_LIMIT]: "",

    [KEY_COUPON_CODE]: "",
})

function checkLimit(values, KEY_PROP, MAX_VAL, MIN_VAL) {
    let errors = {}
    const _val = convertStrToNumber(values[KEY_PROP])
    if (_val > MAX_VAL) {
        errors[KEY_PROP] = config.getDefault_maxAlert(
            convertNumberToCurrency(MAX_VAL), "VND"
        )
    }
    if (_val < MIN_VAL) {
        errors[KEY_PROP] = config.getDefault_minAlert(
            convertNumberToCurrency(MIN_VAL), "VND"
        )
    }
    return errors
}

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}

        const _materialLimit = convertStrToNumber(values[KEY_MATERIAL_HOME_LIMIT_COMPENSATED])
        const _assetlLimit = convertStrToNumber(values[KEY_ASSESTS_HOME_LIMIT_COMPENSATED])
        if (values[KEY_TOGGLE_MATERIAL_HOME]) {
            if (!_materialLimit) {
                errors[KEY_MATERIAL_HOME_LIMIT_COMPENSATED] = config.ALERT_EMPTY
                return errors
            }
            errors = checkLimit(values, KEY_MATERIAL_HOME_LIMIT_COMPENSATED, MAX_MATERIAL_LIMIT_COMPENSATED, MIN_MATERIAL_LIMIT_COMPENSATED)
            if (!isObjEmpty(errors)) return errors
        }

        if (values[KEY_TOGGLE_ASSETS_HOME]) {
            if (!_assetlLimit) {
                errors[KEY_ASSESTS_HOME_LIMIT_COMPENSATED] = config.ALERT_EMPTY
                return errors
            }
            errors = checkLimit(values, KEY_ASSESTS_HOME_LIMIT_COMPENSATED, MAX_ASSETS_LIMIT_COMPENSATED, MIN_ASSETS_LIMIT_COMPENSATED)
            if (!isObjEmpty(errors)) return errors
        }

        if (values[KEY_TOGGLE_ALTER_BENEFICIARY]) {
            const { [KEY_MATERIAL_HOME_LIMIT_COMPENSATED]: materialLimit,
                [KEY_ASSESTS_HOME_LIMIT_COMPENSATED]: assetsLimit,
                [KEY_BENEFICIARY_LIMIT]: beneficiaryLimit
            } = values
            const _beneficiaryLimit = convertStrToNumber(beneficiaryLimit)
            const _SUM_LIMIT_COMPENSATED = convertStrToNumber(materialLimit) + convertStrToNumber(assetsLimit)

            if (_beneficiaryLimit < 1_000_000) {
                errors[KEY_BENEFICIARY_LIMIT] = config.ALERT_MIN_VND
            }
            if (_beneficiaryLimit > _SUM_LIMIT_COMPENSATED) {
                errors[KEY_BENEFICIARY_LIMIT] = config.getDefault_maxAlert(
                    convertNumberToCurrency(_SUM_LIMIT_COMPENSATED), "VND"
                )
            }
        }

        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_BENEFIARRY_BANK_SELETECTED]: Yup.string()
        .when(KEY_TOGGLE_ALTER_BENEFICIARY, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        })
    ,
    [KEY_BENEFICIARY_BRANCH]: Yup.string()
        .when(KEY_TOGGLE_ALTER_BENEFICIARY, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        })
    ,
    [KEY_BENEFICIARY_ADDRESS]: Yup.string()
        .when(KEY_TOGGLE_ALTER_BENEFICIARY, (value) => {
            if (value) {
                return Yup.string()
                    .required(ALERT_EMPTY)
            }
            return Yup.string()
        }),
    [KEY_FEE_RATE] : Yup.string().required(ALERT_EMPTY)
})
