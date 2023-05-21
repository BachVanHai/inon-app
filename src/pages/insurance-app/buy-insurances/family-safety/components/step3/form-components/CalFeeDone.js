import React from 'react'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import Origin from '../../../../../../../components/insurance-app/common-forms/calculate-fee'
import { getDataFee, getRightPaymentVATFee, intlConvertToVnd } from '../../../../../../../ultity'
import { KEY_COMPANY_ID } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { KEY_TOTAL_FEE_VAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'

/**
 * @example
 * dataFee =>\
    ATMPayFee: 2000
    DEBTPayFee: 0
    FUND_TRANSFERPayFee: 0
    QR_CODEPayFee: 2000
    VISA_MASTERPayFee: 3000
    companyId: "01"
    companyName: "BSH"
    feeInsurance: 15000
 */
const CalFeeDone = ({ dataFees, paymentType, companyId, dispatch }) => {
    const intl = useIntl()

    const assginCompanyId = (feeCompanyId) => {
        const dataFee = getDataFee(dataFees, feeCompanyId)
        if (!dataFee) return
        dispatch(
            updateProps([
                {
                    prop: KEY_COMPANY_ID,
                    value: feeCompanyId
                },
            ])
        )
    }

    const popoverFeeAction = (dataFeeElt) => {
        let data = []

        const _vatPaymentTypeFee = getRightPaymentVATFee(paymentType, dataFeeElt)
        if (dataFeeElt.feeInsurance !== undefined) {
            let feeInsurance = {}
            feeInsurance.name = intl.formatMessage({ id: getKeyLang(`feeInsurance`) })
            feeInsurance.value = intlConvertToVnd(dataFeeElt.feeInsurance, intl) + " VND"
            data.push(feeInsurance)
        }
        if (_vatPaymentTypeFee !== undefined) {
            let paymentFee = {}
            paymentFee.name = intl.formatMessage({ id: getKeyLang(`paymentFee`) })
            paymentFee.value = intlConvertToVnd(_vatPaymentTypeFee, intl) + " VND"
            data.push(paymentFee)
        }

      
        let totalFeeVAT = {}
        totalFeeVAT.name = intl.formatMessage({ id: getKeyLang(`InsTotalFee`) })
        totalFeeVAT.value = intlConvertToVnd(_vatPaymentTypeFee + dataFeeElt.feeInsurance, intl)
        totalFeeVAT.id = KEY_TOTAL_FEE_VAT
        data.push(totalFeeVAT)

        return data
    }

    return (
        <Origin
            dataFees={dataFees}
            companyId={companyId}
            assignCompanyId={assginCompanyId}
            popoverFeeAction={popoverFeeAction}
        />
    )
}

export default CalFeeDone