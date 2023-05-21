import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../../../history'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import { StepFooter } from '../../StepFooter'
import {
  ACTION_BUY_NEW,
  actionResetStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const HomePrivateStep4 = () => {
  const { paymentStatus } = useSelector((state) => state.app.buyInsurance)
  const { authToken } = useSelector((state) => state.auth?.guest)
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch(actionResetStepData())
    if (paymentStatus === 'SUCCESS') {
      if (authToken) {
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

export default HomePrivateStep4
