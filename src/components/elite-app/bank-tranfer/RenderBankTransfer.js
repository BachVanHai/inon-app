import React from 'react'
import { useSelector } from 'react-redux'
import Service from '../../../services/insurance-app/appConfig'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../insurance-app/buy-insurances-page/formik-config'
import { render } from '../../insurance-app/common-forms/bank-tranfer/utility'
import BankTransferInfo from './BankTransferInfo'

const RenderBankTransfer = ({isAccepted , contractCode , totalFee}) => {
    const { paymentMethod } = useSelector(state => state.app.buyInsurance)
    return (
        <div className='mb-2'>
            {
                render(isAccepted, PAYMENT_TYPE_FUND_TRANSFER, paymentMethod,
                    <BankTransferInfo
                        totalFeeInclVAT={totalFee}
                        getBankTransferInfo={Service.getBankTransferInfo}
                        contractCode={contractCode}
                    />
                )
            }
        </div>
    )
}

export default RenderBankTransfer