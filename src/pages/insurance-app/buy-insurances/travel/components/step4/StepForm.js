import React from 'react'
import Completed from './form-components/Completed'

const StepForm = ({ stepInfo, className, formik }) => {
    const { payContractStatus } = stepInfo

    return (
        <div className={className}>
            <Completed
                payContractStatus={payContractStatus}
            />
        </div >
    )
}

export default StepForm