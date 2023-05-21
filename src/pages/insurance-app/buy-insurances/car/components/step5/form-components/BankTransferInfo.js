import "../../../../../../../assets/scss/insurance-app/common/toastr.scss"
import "react-toastify/dist/ReactToastify.css"
import React from 'react'
import Service from '../../../../../../../services/insurance-app/buyInsuranceCar'
import Origin from "../../../../../../../components/insurance-app/common-forms/bank-tranfer"

const BankTransferInfo = ({ totalFeeInclVAT, contractCode }) => {
    return (
        <Origin
            contractCode={contractCode}
            totalFeeInclVAT={totalFeeInclVAT}
            getBankTransferInfo={Service.getBankTransferInfo}
        />
    )
}

export default BankTransferInfo
