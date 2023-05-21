import React, { useEffect } from 'react'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import { useDispatch, useSelector } from 'react-redux'
import { StepFooter } from '../../StepFooter'
import { history } from '../../../../../history'
import {
  ACTION_BUY_NEW,
  actionResetStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const MotorStep4 = () => {
  const { paymentStatus } = useSelector(state => state.app.buyInsurance)
  const {authToken} = useSelector(state => state.auth?.guest)
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch(actionResetStepData())
    if(paymentStatus === 'SUCCESS') {
      if(authToken) {
        history.push('/home')
      } else {
        history.push('/login')
      }
    } else {
      history.push('/home')
    }
  }

  const onClickBuyNew = async () => {
    dispatch({ type: ACTION_BUY_NEW })
  }

  return (
    <>
      <PaymentStatus status={paymentStatus} />
      <StepFooter onClickBuyNew={onClickBuyNew} onClickDone={onSubmit} />
    </>
  )
}

export default MotorStep4
