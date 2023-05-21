import { FormattedMessage } from 'base-app'
import React from 'react'
import { getKeyLang } from '../../../../../configs/elite-app'
import { convertNumberToCurrency, Utils } from '../utility'
import { FEE_INSURANCE } from './utility'

const FreeInsurance = ({ insurancePackage, durationPackage, personBuyer }) => {
  //filter to insurance package
  const fee = FEE_INSURANCE.filter((_elt) => {
    return (
      insurancePackage === _elt?.package && durationPackage === _elt?.duration
    )
  })
  //get total fee
  const totalFee = Number(fee[0]?.value * personBuyer)
  return (
    <>
      <div className='font-weight-bold fee-vta pt-1 pb-1 bg-gradient'>
        <div className='d-flex justify-content-between'>
          <div>
            <FormattedMessage
              id={getKeyLang('insurance.vta.step2.feeInsurance')}
            />
          </div>
          <span>
            {convertNumberToCurrency(Number(fee[0]?.value), 'đồng/người')}
          </span>
        </div>

        <div className='d-flex justify-content-between mt-2'>
          <div>
            <FormattedMessage id={getKeyLang('insurance.vta.totalFee')} />
          </div>
          <span>
            {convertNumberToCurrency(totalFee, 'đồng')}
          </span>
        </div>
      </div>
    </>
  )
}

export default FreeInsurance
