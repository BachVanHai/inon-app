import { convertDateTimeToReadble, convertStrToNumber } from "../../../../../../ultity"
import {
    KEY_BENEFICIARY_ADDRESS, KEY_COUPON_CODE, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, initialValues,
    KEY_DURATION, KEY_MATERIAL_HOME_LIMIT_COMPENSATED, KEY_ASSESTS_HOME_LIMIT_COMPENSATED, KEY_ASSETS_HOME_COVERAGE,
    KEY_MATERIAL_HOME_COVERAGE, KEY_BENEFIARRY_BANK_SELETECTED, KEY_TOGGLE_ASSETS_HOME,
    KEY_TOGGLE_MATERIAL_HOME, KEY_TOGGLE_ALTER_BENEFICIARY, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_BENEFICIARY_BRANCH, KEY_BENEFICIARY_LIMIT, KEY_COVERAGE, KEY_FEE_RATE
} from "./formikConfig"

export const fillMultipleStepInfo = (stepInfo, setFieldValue, setValues) => {
    let _values = { ...initialValues }
    Object.keys(stepInfo).forEach(prop => {
        if (stepInfo[prop] === undefined || stepInfo[prop] === null || stepInfo[prop] === "") {
            _values[prop] = initialValues[prop]
        } else {
            _values[prop] = stepInfo[prop]
        }
    })
    setValues(_values)
}

export const getDefault_updateInsuranceObj = (values) => {
    let _map = {}
    const insuranceAddOnAsset = {
        "compensationLimit": convertStrToNumber(values[KEY_ASSESTS_HOME_LIMIT_COMPENSATED]),
        "coverage": values[KEY_COVERAGE],
        "insuranceAddOn": "ASSET",
        "unit": "VND",
        "insuranceRate" : values[KEY_FEE_RATE]
    }
    const insuranceAddOnMaterial = {
        "compensationLimit": convertStrToNumber(values[KEY_MATERIAL_HOME_LIMIT_COMPENSATED]),
        "coverage": values[KEY_COVERAGE],
        "insuranceAddOn": "MATERIAL",
        "unit": "VND",
        "insuranceRate" : values[KEY_FEE_RATE]
    }
    const beneficiaryBankDTO = {
        "address": values[KEY_BENEFICIARY_ADDRESS],
        "name": values[KEY_BENEFIARRY_BANK_SELETECTED],
        "benefitTransferRate": convertStrToNumber(values[KEY_BENEFICIARY_LIMIT]),
        "branch": values[KEY_BENEFICIARY_BRANCH],
    }

    if (values[KEY_TOGGLE_ASSETS_HOME]) {
        _map["insuranceAddOnAsset"] = insuranceAddOnAsset
    }
    if (values[KEY_TOGGLE_MATERIAL_HOME]) {
        _map["insuranceAddOnMaterial"] = insuranceAddOnMaterial
    }
    if (values[KEY_TOGGLE_ALTER_BENEFICIARY]) {
        _map["beneficiaryBankDTO"] = beneficiaryBankDTO
    }

    const _startDate = convertDateTimeToReadble(values[KEY_DATE_INSUR_FROM], values[KEY_TIME_INSUR_FROM])
    const _endDate = convertDateTimeToReadble(values[KEY_DATE_INSUR_TO], values[KEY_TIME_INSUR_TO])

    return ([
        {
            ..._map,
            "paymentChannel": values["paymentType"],
            "assetOption": values[KEY_TOGGLE_ASSETS_HOME],
            "materialOption": values[KEY_TOGGLE_MATERIAL_HOME],
            "bankOption": values[KEY_TOGGLE_ALTER_BENEFICIARY],
            "duration": values[KEY_DURATION],
            "promoCode": values[KEY_COUPON_CODE],
            "startedDate": _startDate,
            "endDate": _endDate,
            "isEnable": true,
            "unit": "VND",
        }
    ])
}


export const FEE_RATE_BASIC = [
    {
        label : '0,08%',
        value : '00.8'
    },
    {
        label : '0,1%',
        value : '0.1'
    },
    {
        label : '0,13%',
        value : '0.13'
    },
    {
        label : '0,16%',
        value : '0.16'
    },
    {
        label : '0,19%',
        value : '0.19'
    },
    {
        label : '0,22%',
        value : '0.22'
    },
    {
        label : '0,25%',
        value : '0,25'
    },
    {
        label : '0,28%',
        value : '0.28'
    },
    {
        label : '0,31%',
        value : '0.31'
    },
    {
        label : '0,34%',
        value : '0.34%'
    },
    {
        label : '0,37%',
        value : '0.37'
    },
    {
        label : '0,4%',
        value : '0.4'
    },
    {
        label : '0,43%',
        value : '0.43%'
    },
]

export const FEE_RATE_ADVANCE = [
    {
        label : '0,1%',
        value : '0.1'
    },
    {
        label : '0,12%',
        value : '0.12'
    },
    {
        label : '0,15%',
        value : '0.15'
    },
    {
        label : '0,18%',
        value : '0.18'
    },
    {
        label : '0,21%',
        value : '0.21'
    },
    {
        label : '0,24%',
        value : '0.24'
    },
    {
        label : '0,27%',
        value : '0.27'
    },
    {
        label : '0,30%',
        value : '0.30'
    },
    {
        label : '0,33%',
        value : '0.33'
    },
    {
        label : '0,36%',
        value : '0.36'
    },
    {
        label : '0,39%',
        value : '0.39'
    },
    {
        label : '0,42%',
        value : '0.42'
    },
    {
        label : '0,44%',
        value : '0.44%'
    },
]