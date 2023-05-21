import {
    PAYMENT_TYPE_ATM,
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER,
    PAYMENT_TYPE_QR_CODE,
    PAYMENT_TYPE_VISA_MASTER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { KEY_COUPON_CODE } from "./formikConfig"

export const getDefault_payInfoObj = (paymentType, values) => {
    return ({
        "paymentType": paymentType,
        "couponCode": values[KEY_COUPON_CODE] || null,
        "printedCertType": "NONE",
        "certNo": "",
    })
}

export const getDefault_debtInfoObj = () => {
    return ({
        "paymentType": PAYMENT_TYPE_DEBT,
        "couponCode": null,
        "printedCertType": "NONE",
        "certNo": null
    })
}

export const getDefault_bonusInfoObj = () => {
    return ({
        "paymentType": PAYMENT_TYPE_BONUS,
        "couponCode": null,
        "printedCertType": "NONE",
        "certNo": null
    })
}

export const getRightFee = (atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType) => {
    let vatFee = 0
    switch (paymentType) {
        case PAYMENT_TYPE_DEBT:
            break
        case PAYMENT_TYPE_FUND_TRANSFER:
            vatFee = funTransferPayFee
            break
        case PAYMENT_TYPE_ATM:
            vatFee = atmPayFee
            break
        case PAYMENT_TYPE_VISA_MASTER:
            vatFee = visaMasterPayFee
            break
        case PAYMENT_TYPE_QR_CODE:
            vatFee = qrPayFee
            break
        default:
            break
    }
    return vatFee
}