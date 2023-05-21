import { KEY_TOTAL_FEE_VAT } from "../../../../../../components/insurance-app/buy-insurances-page/formik-config"
import { getDataFee as _getDataFee } from "../../../../../../ultity"
import { getRightPaymentFee } from "../step3/utility"

export const getDataFee = (dataFees, paymentType, companyId) => {
    let dataFee = _getDataFee(dataFees, companyId)
    const _vatPaymentTypeFee = getRightPaymentFee(paymentType, dataFee)
    dataFee[KEY_TOTAL_FEE_VAT] = +dataFee.feeInsurance + +_vatPaymentTypeFee
    dataFee["paymentFee"] = +_vatPaymentTypeFee
    return dataFee
}
