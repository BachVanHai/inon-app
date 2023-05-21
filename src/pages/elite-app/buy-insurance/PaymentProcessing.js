import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionConfirmPayment } from '../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import paymentProcessing from '../../../assets/images/elite-app/buy-insurance/payment-processing.gif'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'

const PaymentProcessing = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionConfirmPayment())
  }, [])

  return (
    <div className='payment-processing'>
      <img
        className='img-fluid'
        alt='payment-processing'
        src={paymentProcessing} />
      <h3>
        <FormattedMessage id={getKeyLang('insurance.paymentProcessing')}/>
      </h3>
    </div>
  )

}

export default PaymentProcessing
