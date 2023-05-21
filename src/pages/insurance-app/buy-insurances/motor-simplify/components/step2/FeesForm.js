import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Contract from '../../../../../../components/insurance-app/common-forms/contract'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { intlConvertToVnd } from '../../../../../../ultity'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { getRightFee } from './utility'

const FeesForm = ({ paymentType, dispatch, contractInfo = {}, toggleAgree, className }) => {
    const intl = useIntl()
    let {
        totalFeeInclVAT, totalFee, atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee , discountValue
    } = contractInfo

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`feeInsurance`)} />,
            content: `${intlConvertToVnd(totalFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType), intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: `${intlConvertToVnd(discountValue, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`totalPayment`)} />,
            content: `${discountValue !== null ? intlConvertToVnd(
                totalFee + getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType) - discountValue ,
                intl
            ) : intlConvertToVnd(
                totalFee + getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType) ,
                intl
            )} VND`,
            isTotalFee: true
        },
    ]

    const _toggleAgree = {
        agreedTermOfServicesStatus: toggleAgree.agreedTermOfServicesStatus,
        toggleAgreeCallback: toggleAgree.toggleAgreeCallback
    }

    React.useEffect(() => {
        dispatch(updateProps([
            {
                prop: BASE.KEY_TOTAL_FEE,
                value: totalFeeInclVAT
            }
        ]))
    }, [JSON.stringify(contractInfo)])

    return (
        <div className={className}>
            <Contract
                feeRows={feeRows}
                toggleAgree={_toggleAgree}
            />
        </div >
    )
}

export default FeesForm