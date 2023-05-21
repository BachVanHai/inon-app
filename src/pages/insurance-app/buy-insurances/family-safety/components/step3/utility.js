import {
    PAYMENT_TYPE_ATM,
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER,
    PAYMENT_TYPE_QR_CODE,
    PAYMENT_TYPE_VISA_MASTER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { convertDateTimeToReadble } from "../../../../../../ultity"
import moment from "moment"
import { KEY_COUPON_CODE, KEY_DATE_INSUR_FROM, KEY_DURATION, KEY_INSUR_VALUE, KEY_TIME_INSUR_FROM } from "./formikConfig"

export const ATM = PAYMENT_TYPE_ATM
export const VISA_MASTER = PAYMENT_TYPE_VISA_MASTER
export const QR_CODE = PAYMENT_TYPE_QR_CODE
export const FUND_TRANSFER = PAYMENT_TYPE_FUND_TRANSFER
export const DEBT = PAYMENT_TYPE_DEBT
export const BONUS = PAYMENT_TYPE_BONUS

export const getDefault_updatedBeneficiaries = (formikValues, contractId, paymentType) => {
    const {
        [KEY_COUPON_CODE]: couponCode, [KEY_DURATION]: duration,
        [KEY_DATE_INSUR_FROM]: dateInsuranceApplyFrom,
        [KEY_TIME_INSUR_FROM]: timeInsuranceApplyFrom,
        [KEY_INSUR_VALUE]: value
    } = formikValues
    let _time = moment(timeInsuranceApplyFrom).utc(true).format("HH:mm")
    if (timeInsuranceApplyFrom.toString().match(/^\d\d:\d\d$/)) {
        _time = timeInsuranceApplyFrom
    }
    const _startDate = convertDateTimeToReadble(dateInsuranceApplyFrom, _time)

    return [
        {
            "contractId": contractId,
            "duration": duration,
            "paymentType": paymentType,
            "value": value * 1_000_000,
            "couponCode": couponCode,
            "startValueDate": _startDate,
            "liability": value * 1_000_000,
            "feeRate": 0.0015,
            "isEnable": true,
            "enable": true,
            "packageCode": "package_code",
            "productCode": "HC",
            "description": "Insurance_InOn",
            "feeUnit": "VND",
            "unit": "VND",
        }
    ]
}

export const getRightPaymentFee = (paymentType, dataFeeElt) => {
    const { ATMPayFee, QR_CODEPayFee, VISA_MASTERPayFee, FUND_TRANSFERPayFee } = dataFeeElt
    switch (paymentType) {
        case ATM:
            if (ATMPayFee !== undefined) {
                return ATMPayFee
            }
            return 0
        case QR_CODE:
            if (QR_CODEPayFee !== undefined) {
                return QR_CODEPayFee
            }
            return 0
        case VISA_MASTER:
            if (VISA_MASTERPayFee !== undefined) {
                return VISA_MASTERPayFee
            }
            return 0
        case FUND_TRANSFER:
            if (FUND_TRANSFERPayFee !== undefined) {
                return FUND_TRANSFERPayFee
            }
            return 0
        default:
            return 0
    }
}

export const getDefault_updatedContractFeeInfo = (paymentType, dataFee, companyId) => {
    const _vatPaymentTypeFee = getRightPaymentFee(paymentType, dataFee)
    const { feeInsurance } = dataFee

    return {
        "totalFeeVAT": _vatPaymentTypeFee + feeInsurance,
        "companyId": companyId,
        "paymentType": paymentType
    }
}
