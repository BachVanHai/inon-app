import React from 'react'
import { useSelector } from 'react-redux'
import { Button, FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS } from '../../configs/elite-app'
import paymentSuccess from '../../assets/images/elite-app/payment-success-icon.png'
import paymentFail from '../../assets/images/elite-app/payment-fail-icon.png'
import paymentTimeout from '../../assets/images/elite-app/payment-timeout-icon.png'
import tickIcon from '../../assets/images/elite-app/tick-icon.png'
import '../../assets/scss/elite-app/payment-status.scss'

const PaymentStatus = ({ status, setAddProfile }) => {
  const { contract } = useSelector(state => state.app.buyInsurance)

  let icon = {
    SUCCESS: paymentSuccess,
    TIMEOUT: paymentTimeout,
    FAIL: paymentFail
  }
  let notify = 'insurance.motor.step4.notify.' + status
  let command = 'insurance.motor.step4.command.' + status

  const isNeedAdditionalRecords = contract && contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key)?.isEnable

  return (
    <div className='payment-container'>
      <div className="payment-card">
        <img src={icon[status]} />
        <div className='d-flex align-items-center mt-3'>
          {status === 'SUCCESS' ? <img src={tickIcon} alt='' /> : null}
          <div className={`ml-1 payment-notify ${status}`}>
            <FormattedMessage id={getKeyLang(notify)} />
          </div>
        </div>
      </div>

      {status !== 'SUCCESS' || isNeedAdditionalRecords ? (
        <div className="mt-3 payment-command">
          <FormattedMessage id={getKeyLang(command)} />
        </div>
      ) : null}

      {status === "SUCCESS" && isNeedAdditionalRecords ? (
        <Button color="primary" className="mt-2" onClick={setAddProfile}>Bổ sung hồ sơ</Button>
      ) : null}

    </div>
  )
}

export default PaymentStatus
