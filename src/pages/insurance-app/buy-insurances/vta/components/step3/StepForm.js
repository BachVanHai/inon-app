import React from 'react'
import Contract from './form-components/Contract'

const StepForm = ({ stepInfo, className }) => {
    const { dataFees, agreedTermOfServicesStatus, contractId, toggleAgreeCallback,
        paymentType, contractInfo, contractCode, companyId, step_2, step_1 } = stepInfo
    return (
        <div className={className}>
            <Contract
                agreedTermOfServicesStatus={agreedTermOfServicesStatus}
                toggleAgreeCallback={toggleAgreeCallback}
                paymentType={paymentType} contractInfo={contractInfo}
                dataFee={dataFees} contractId={contractId}
                contractCode={contractCode} companyId={companyId}
                stepInfo={{ ...step_2, ...step_1 }}
            />
        </div >
    )
}

export default StepForm