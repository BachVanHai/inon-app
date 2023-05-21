import React from 'react'
import { Card, CardBody } from "reactstrap"

/**
 @example
  {
    render(
        agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
        <BankTransferInfo
            contractCode={contractInfo.contractCode}
            totalFeeInclVAT={totalFee}
        />
    )
}
 */


export const render = (agreedTermOfServicesStatus, paymentType, EXCLUSIVE_TRANFER, BankTransferInfo) => {
    switch (paymentType) {
        case EXCLUSIVE_TRANFER:
            if (agreedTermOfServicesStatus) {
                return (
                    <Card>
                        <CardBody>
                            {
                                BankTransferInfo
                            }
                        </CardBody>
                    </Card>
                )
            }
            return null
        default:
            if (agreedTermOfServicesStatus) {
                return null
            }
            return null
    }
}
