import * as Yup from 'yup'
import { convertStrToNumber } from './utility'

export const validationSchema = Yup.object().shape({
    transactionLimit: Yup.string()
        .min(8, 'Số tiền phải hơn 1,000,000')
        .required(`Không được để trống`)
    ,
    dailyLimit: Yup.string()
        .min(8, 'Số tiền phải hơn 1,000,000')
        .required(`Không được để trống`)
    ,
    monthlyLimit: Yup.string()
        .min(8, 'Số tiền phải hơn 1,000,000')
        .required(`Không được để trống`)
})

export const validate = (values) => {
    const errors = {}
    const transVal = convertStrToNumber(values.transactionLimit)
    const dayVal = convertStrToNumber(values.dailyLimit)
    const monthVal = convertStrToNumber(values.monthlyLimit)
    const day = convertStrToNumber(values.day)
    const daysAmount = convertStrToNumber(values.daysAmount)

    if (day <= 0) {
        errors.day = `Không được nhỏ hơn hoặc bằng 0`
    }

    if (daysAmount <= 0) {
        errors.daysAmount = `Không được nhỏ hơn hoặc bằng 0`
    }

    if (transVal > dayVal) {
        errors.transactionLimit = `Hạn mức lần phải nhỏ hơn ngày`
    }
    if (transVal > monthVal) {
        errors.transactionLimit = `Hạn mức lần phải nhỏ hơn tháng`
    }
    if (dayVal > monthVal) {
        errors.dailyLimit = `Hạn mức ngày phải nhỏ hơn tháng`
    }
    return errors
}