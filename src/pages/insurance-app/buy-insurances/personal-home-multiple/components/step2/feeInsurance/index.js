import React from 'react'
import FeeRows from '../../../../../../../components/insurance-app/common-forms/contract/FeeRows'

const FeeInsurance = ({ data , feeRows  }) => {
  return (
    <div className='mt-2'>
      <FeeRows feeRows={feeRows} />
    </div>
  )
}

export default FeeInsurance
