import moment from 'moment'
import * as Yup from 'yup'
// import { DATE_FORMAT } from '../../../../configs'
import { convertStrToNumber } from './utility'

export const DAYS_AMOUNT_MAX = 35
export const DAYS_AMOUNT_MIN = 1
export const DAY_MAX = 5
export const DAY_MIN = 1

const TODAY = moment().utc().format(`YYYY-MM-DD HH:mm:ss`)

export const initialValues = ({
    transactionLimit: `1,000,000`,
    dailyLimit: `2,000,000`,
    monthlyLimit: `3,000,000`,
    findPartner: ``,
    dueDateType: ``,
    pickedDate: moment(TODAY).toDate(),
    daysAmount: DAYS_AMOUNT_MAX,
    day: DAY_MAX,
})

export const validationSchema = Yup.object().shape({
    transactionLimit: Yup.string()
        .min(8, 'Số tiền tối thiểu phải lớn hơn 1,000,000')
        .required(`Không được để trống`)
    ,
    dailyLimit: Yup.string()
        .min(8, 'Số tiền tối thiểu phải lớn hơn 1,000,000')
        .required(`Không được để trống`)
    ,
    monthlyLimit: Yup.string()
        .min(8, 'Số tiền tối thiểu phải lớn hơn 1,000,000')
        .required(`Không được để trống`)
    ,
    findPartner: Yup.string()
        .required(`Không được để trống`)
    ,
    dueDateType: Yup.string()
        .required(`Không được để trống`)
    ,
})

export const validate = (values) => {
    const errors = {}
    const transVal = convertStrToNumber(values.transactionLimit)
    const dayVal = convertStrToNumber(values.dailyLimit)
    const monthVal = convertStrToNumber(values.monthlyLimit)
    const day = convertStrToNumber(values.day)
    const daysAmount = convertStrToNumber(values.daysAmount)

    if (day <= 0) {
        errors.day = `Giá trị không được phép nhỏ hơn hoặc bằng 0`
    }

    if (daysAmount <= 0) {
        errors.daysAmount = `Giá trị không được phép nhỏ hơn hoặc bằng 0`
    }

    if (transVal > dayVal) {
        errors.transactionLimit = `Hạn mức theo lần phải nhỏ hơn theo ngày`
    }
    if (transVal > monthVal) {
        errors.transactionLimit = `Hạn mức theo lần phải nhỏ hơn theo tháng`
    }
    if (dayVal > monthVal) {
        errors.dailyLimit = `Hạn mức theo ngày phải nhỏ hơn theo tháng`
    }

    return errors
}