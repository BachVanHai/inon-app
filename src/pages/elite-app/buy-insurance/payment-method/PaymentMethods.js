import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyLang } from '../../../../configs/elite-app'
import atmIcon from '../../../../assets/images/elite-app/buy-insurance/pay-atm-icon.svg'
import qrCodeIcon from '../../../../assets/images/elite-app/buy-insurance/pay-qrcode-icon.svg'
import visaIcon from '../../../../assets/images/elite-app/buy-insurance/pay-visa-icon.svg'
import bankTransferIcon from '../../../../assets/images/elite-app/buy-insurance/pay_transfer.svg'
import { FormattedMessage, Radio } from 'base-app'
import { actionChangePaymentMethod } from '../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const PaymentMethods = ({handleCallBack}) => {

  const { paymentMethod } = useSelector(state => state.app.buyInsurance)
  const dispatch = useDispatch()

  const PAYMENT_METHODS = {
    FUND_TRANSFER: {
      code: 'FUND_TRANSFER',
      icon: bankTransferIcon
    },
    ATM: {
      code: 'ATM',
      icon: atmIcon
    },
    VISA: {
      code: 'VISA_MASTER',
      icon: visaIcon
    },
    QR: {
      code: 'QR_CODE',
      icon: qrCodeIcon
    }
  }

  const onChangePaymentMethod = (paymentMethod) => {
    dispatch(actionChangePaymentMethod(paymentMethod))
    handleCallBack && handleCallBack(paymentMethod)
  }


  return (
    <div className='payment-methods'>
      <div className="payment-methods-title">
        <FormattedMessage id={getKeyLang("insurance.paymentMethod")} />
      </div>
      <div className="border px-1 mt-2">
        {
          Object.keys(PAYMENT_METHODS).map(key => (
            <div className="payment-method" onClick={() => onChangePaymentMethod(PAYMENT_METHODS[key].code)}>
              <div className="d-flex align-items-center">
                <Radio checked={paymentMethod === PAYMENT_METHODS[key].code} />
                <div className="ml-1">
                  <FormattedMessage id={getKeyLang(`insurance.paymentMethod.${PAYMENT_METHODS[key].code}`)} />
                </div>
              </div>
              <img src={PAYMENT_METHODS[key].icon} alt={PAYMENT_METHODS[key].code} />
            </div>
          ))
        }
      </div>
      {/*<Promotion />*/}
    </div>

  )
}

export default PaymentMethods
