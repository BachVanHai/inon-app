import * as Yup from 'yup'
import moment from 'moment'
export const getInsuranceFeeBy = (durationValue, packageValue) => {
    let final = 0
    switch (durationValue) {
        case 12:
            switch (packageValue) {
                case 'GOI1':
                    final = 400_000
                    break
                case 'GOI2':
                    final = 600_000
                    break
                case 'GOI3':
                    final = 900_000
                    break
                case 'GOI4':
                    final = 1_200_000
                    break
                default:
                    break
            }
            break
        case 24:
            switch (packageValue) {
                case 'GOI1':
                    final = 400_000 * 2
                    break
                case 'GOI2':
                    final = 600_000 * 2
                    break
                case 'GOI3':
                    final = 900_000 * 2
                    break
                case 'GOI4':
                    final = 1_200_000 * 2
                    break
                default:
                    break
            }
            break
        case 36:
            switch (packageValue) {
                case 'GOI1':
                    final = 400_000 * 3
                    break
                case 'GOI2':
                    final = 600_000 * 3
                    break
                case 'GOI3':
                    final = 900_000 * 3
                    break
                case 'GOI4':
                    final = 1_200_000 * 3
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
        value: 'GOI1',
        msgField: 'Lựa chọn 1',
        packageSubtitleField: 'Gói cơ bản',
        interest: 132,
        fee1: 20,
        fee2: 40,
        fee3: 12,
        fee4: 10,
        maxFee4: 20,
        fee5: 15,
        maxFee5: 40
    },
    {
        value: 'GOI2',
        msgField: 'Lựa chọn 2',
        packageSubtitleField: 'Gói nâng cao',
        interest: 158,
        fee1: 20,
        fee2: 40,
        fee3: 18,
        fee4: 15,
        maxFee4: 30,
        fee5: 20,
        maxFee5: 50
    },
    {
        value: 'GOI3',
        msgField: 'Lựa chọn 3',
        packageSubtitleField: 'Gói cao cấp',
        interest: 214,
        fee1: 20,
        fee2: 40,
        fee3: 24,
        fee4: 20,
        maxFee4: 50,
        fee5: 25,
        maxFee5: 80
    },
    {
        value: 'GOI4',
        msgField: 'Lựa chọn 4',
        packageSubtitleField: 'Gói kim cương',
        interest: 310,
        fee1: 20,
        fee2: 40,
        fee3: 30,
        fee4: 35,
        maxFee4: 90,
        fee5: 30,
        maxFee5: 120
    }
]

export const durations = [
    {
        value: 12,
        year_value: 1,
        name: 'duration-1-year'
    },
    {
        value: 24,
        year_value: 2,
        name: 'duration-2-year'
    },
    {
        value: 36,
        year_value: 3,
        name: 'duration-3-year'
    }
]

export const KEY_PACKAGE_SELECTED = 'packageCode'
export const KEY_DURATION_SELECTED = 'duration'
export const KEY_START_INSURANCE = 'startValueDate'
export const KEY_END_INSURANCE = 'endValueDate'
export const KEY_YEAR = 'year'
export const KEY_PRODUCT_CODE = 'productCode'

export const initialValues = {
    [KEY_PACKAGE_SELECTED]: '',
    [KEY_DURATION_SELECTED]: '',
    [KEY_DURATION_SELECTED]: '',
    [KEY_START_INSURANCE] :'',
    [KEY_END_INSURANCE] : '',
    [KEY_PRODUCT_CODE] : ''
}

export const validate = (values) => { }
export const validationSchema = Yup.object().shape({})
