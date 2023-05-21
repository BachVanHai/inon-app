import React from 'react'
import Service from '../../../../../../../services/insurance-app/buyInsuranceCar'
import Original from '../../../../../../../components/insurance-app/common-forms/bank-tranfer'
import { TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isObjEmpty } from '../../../../../../../ultity'

const BankTransferInfo = ({ stepInfo }) => {
    let _contract = ({
        contract: [{
            contractCode: TEXT_NO_VALUE,
            totalFeeInclVAT: 0,
        }]
    })
    if (!stepInfo || !isObjEmpty(stepInfo)) {
        _contract = stepInfo
    }
    const { contractCode, totalFeeInclVAT } = _contract.contract[0]
    return (
        <Original
            contractCode={contractCode}
            totalFeeInclVAT={totalFeeInclVAT}
            getBankTransferInfo={Service.getBankTransferInfo}
        />
    )
}

export default BankTransferInfo
