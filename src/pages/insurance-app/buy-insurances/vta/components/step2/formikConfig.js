import React from 'react'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'

export const getInsuranceFeeBy = (durationValue, packageValue) => {
    let final = 0
    switch (durationValue) {
        case 3:
            switch (packageValue) {
                case "GOI1":
                    final = 130_000
                    break
                case "GOI2":
                    final = 230_000
                    break
                case "GOI3":
                    final = 380_000
                    break
                default:
                    break
            }
            break
        case 6:
            switch (packageValue) {
                case "GOI1":
                    final = 190_000
                    break
                case "GOI2":
                    final = 340_000
                    break
                case "GOI3":
                    final = 560_000
                    break
                default:
                    break
            }
            break
        case 12:
            switch (packageValue) {
                case "GOI1":
                    final = 250_000
                    break
                case "GOI2":
                    final = 450_000
                    break
                case "GOI3":
                    final = 750_000
                    break
                default:
                    break
            }
            break
        default:
            break
    }
    return final
}

export const packages = [
    {
        value: "GOI1",
        msgField: "Lựa chọn 1",
        packageSubtitleField: "Gói cơ bản",
        fee_1: 40,
        fee_2: 30,
        fee_3: 2,
        fee_4: 2,
        content: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>1</span></div>,
    },
    {
        value: "GOI2",
        msgField: "Lựa chọn 2",
        packageSubtitleField: "Gói tiêu chuẩn",
        fee_1: 80,
        fee_2: 60,
        fee_3: 4,
        fee_4: 4,
        content: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>2</span></div>,
    },
    {
        value: "GOI3",
        msgField: "Lựa chọn 3",
        packageSubtitleField: "Gói cao cấp",
        fee_1: 120,
        fee_2: 90,
        fee_3: 6,
        fee_4: 6,
        content: <div><FormattedMessage id={getKeyLang(`pack`)} /><span>&nbsp;</span><span>3</span></div>,
    },
]

export const durations = [
    {
        value: 3,
        name: "duration-3-months",
    },
    {
        value: 6,
        name: "duration-6-months",
    },
    {
        value: 12,
        name: "duration-12-months",
    },
]

export const KEY_PACKAGE_SELECTED = "packageSelected"
export const KEY_DURATION_SELECTED = "durationSelected"
export const KEY_CURRENT_FEE = "currentFee"

export const initialValues = ({
    [KEY_PACKAGE_SELECTED]: packages[0].value,
    [KEY_DURATION_SELECTED]: durations[0].value,
    [KEY_CURRENT_FEE]: 0,
})

export const validate = (values) => { }
export const validationSchema = Yup.object().shape({})