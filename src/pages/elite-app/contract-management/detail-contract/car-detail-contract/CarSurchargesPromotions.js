import React from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { getKeyLang } from '../../../../../configs/elite-app'
import { Utils } from '../../../../../ultity'
import { Badge } from 'reactstrap'

const CarSurchargesPromotions = ({ contract }) => {

  const statusType = (type) => {
    switch (type) {
      case 'FINISH':
        return <Badge color='success'><FormattedMessage id={getKeyLang('contractManagement.successStatus')} /></Badge>
      default:
        return ''
    }
  }
  return (
    <>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.vatFees')} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{Utils.numberFormat(contract.vatfee)}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.couponCode')} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{contract.couponCode}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.deduction')} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{contract.deduction}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.feesTotalInclVAT')} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{Utils.numberFormat(contract.totalFeeInclVAT)}</div>
      </div>
      <div className='row align-items-center py-2 '>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.paymentType')} />
        </div>
        <div className='col-md-6 col-12 dark-green'><FormattedMessage id={getKeyLang(`contractManagement.${contract.paymentType}`)} /></div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('contractManagement.status')} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{statusType(contract.latestApprovalStatus)}</div>
      </div>
    </>
  )
}

export default CarSurchargesPromotions
