import React from 'react'
import Contract from './form-components/Contract'

const StepForm = ({ stepInfo, className }) => {
    const { dataFees, agreedTermOfServicesStatus, contractId, toggleAgreeCallback, insuranceInfo,
        paymentType, contractInfo, contractCode, companyId, step_2, step_1 , totalFee } = stepInfo
        const dataFeeFind = dataFees.find(_elt => _elt?.companyId === "06") || 0
    return (
        <div className={className}>
            <Contract
                agreedTermOfServicesStatus={agreedTermOfServicesStatus}
                toggleAgreeCallback={toggleAgreeCallback}
                paymentType={paymentType} contractInfo={contractInfo}
                dataFee={dataFeeFind} contractId={contractId}
                contractCode={contractCode} companyId={companyId}
                insuranceInfo={insuranceInfo}
                stepInfo={{ ...step_2, ...step_1 }}
            />
        </div >
    )
}

export default StepForm