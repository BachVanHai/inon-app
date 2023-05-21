import React from 'react'
import Contract from '../../../../../../../components/insurance-app/common-forms/contract'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../../ultity'
import { useIntl, FormattedMessage } from 'react-intl'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesCars'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesCars'
import {
    PAYMENT_TYPE_ATM, PAYMENT_TYPE_FUND_TRANSFER,
    PAYMENT_TYPE_QR_CODE, PAYMENT_TYPE_VISA_MASTER
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const Contracts = ({ dispatch, contracttInfo, agreedTermOfServicesStatus, paymentType }) => {
    const intl = useIntl()
    if (isObjEmpty(contracttInfo)) {
        contracttInfo = []
    }
    const getRightVat = (elt) => {
        const { atmPayFee, qrPayFee, funTransferPayFee, visaMasterPayFee } = elt
        let _right = 0
        switch (paymentType) {
            case PAYMENT_TYPE_ATM:
                _right = atmPayFee
                break
            case PAYMENT_TYPE_QR_CODE:
                _right = qrPayFee
                break
            case PAYMENT_TYPE_FUND_TRANSFER:
                _right = funTransferPayFee
                break
            case PAYMENT_TYPE_VISA_MASTER:
                _right = visaMasterPayFee
                break
            default:
                _right = 0
                break
        }
        return _right
    }

    const _vat = contracttInfo.reduce((preS, currVal) => preS + getRightVat(currVal), 0)
    const _fee = contracttInfo.reduce((preS, currVal) => preS + currVal?.totalFee, 0)

    React.useEffect(() => {
        const _updateProps = [
            {
                prop: BASE.KEY_TOTAL_FEE,
                value: _fee + _vat
            }
        ]
        if (!isArrayEmpty(contracttInfo) && contracttInfo[0].paymentType) {
            _updateProps.push({
                prop: BASE.KEY_PAYMENT_TYPE,
                value: contracttInfo[0].paymentType
            })
        }
        dispatch(updateProps(_updateProps))
    }, [JSON.stringify(contracttInfo)])

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`InsTotalFee`)} />,
            content: `${intlConvertToVnd(_fee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(_vat, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: `${intlConvertToVnd(0, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${intlConvertToVnd(_fee + _vat, intl)} VND`,
            isTotalFee: true
        },
    ]

    const toggleAgree = {
        agreedTermOfServicesStatus: agreedTermOfServicesStatus,
        toggleAgreeCallback: () => {
            if (agreedTermOfServicesStatus) {
                dispatch(updateProps([
                    {
                        prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                        value: false
                    }
                ]))
                return
            }
            dispatch(updateProps([
                {
                    prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: true
                }
            ]))
        }
    }

    return (
        <Contract
            feeRows={feeRows}
            toggleAgree={toggleAgree}
        />
    )
}

export default Contracts