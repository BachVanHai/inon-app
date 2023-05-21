import React from 'react'
import paymentSuccess from '../../../../assets/images/elite-app/payment-success-icon.png'
import paymentSuccessIcon from '../../../../assets/images/elite-app/buy-insurance/circle-check1-successful.svg'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../configs/elite-app'
const PaymentSuccessScreen = () => {
  return (
    <>
      <div className='d-flex justify-content-center flex-columns'>
        <img src={paymentSuccess} />
      </div>
      <div className='d-flex justify-content-center align-items-center mt-1'>
        <img
          src={paymentSuccessIcon}
          width='40'
          style={{ marginTop: '10px' }}
        />
        <span className='font-medium-4 font-weight-bold'>
          <FormattedMessage
            id={getKeyLang('insurance.motor.step4.notify.SUCCESS')}
          />
        </span>
      </div>
    </>
  )
}

export default PaymentSuccessScreen
