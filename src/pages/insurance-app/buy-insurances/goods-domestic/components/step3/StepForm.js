import React from 'react'
import Contract from './form-components/Contract'

const StepForm = ({ stepInfo, className }) => {
    const { dataFees, agreedTermOfServicesStatus, contractId, toggleAgreeCallback, insuranceInfo,
        paymentType, contractInfo, contractCode, companyId, step_2, step_1 , totalFee , goodsSuggestion } = stepInfo
    return (
        <div className={className}>
            <Contract
                agreedTermOfServicesStatus={agreedTermOfServicesStatus}
                toggleAgreeCallback={toggleAgreeCallback}
                paymentType={paymentType} contractInfo={contractInfo}
                dataFee={dataFees[0]} contractId={contractId}
                contractCode={contractCode} companyId={companyId}
                insuranceInfo={insuranceInfo}
                stepInfo={{ ...step_2, ...step_1 }}
                totalFee={totalFee}
                goodsSuggestion={goodsSuggestion}
            />
        </div >
    )
}

export default StepForm