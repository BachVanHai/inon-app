import * as Yup from 'yup'
import { PAYMENT_TYPE_ATM, PAYMENT_TYPE_DEBT, PAYMENT_TYPE_FUND_TRANSFER, PAYMENT_TYPE_QR_CODE, PAYMENT_TYPE_VISA_MASTER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

export const ATM = PAYMENT_TYPE_ATM
export const VISA_MASTER = PAYMENT_TYPE_VISA_MASTER
export const QR_CODE = PAYMENT_TYPE_QR_CODE
export const FUND_TRANSFER = PAYMENT_TYPE_FUND_TRANSFER
export const DEBT = PAYMENT_TYPE_DEBT

export const KEY_COUPON_CODE = "couponCode"

export const initialValues = ({
    [KEY_COUPON_CODE]: "",
})

export const validationSchema = Yup.object().shape({})
