import React from 'react'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import { StepFooter } from '../../StepFooter'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../../../history'
import {
  ACTION_BUY_NEW,
  actionResetStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const HomeSafetyStep4 = () => {
  const { paymentStatus } = useSelector(state => state.app.buyInsurance)
  const {authToken} = useSelector(state => state.auth?.guest)
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch(actionResetStepData())

    if(authToken) {
      history.push('/home')
    } else {
      history.push('/login')
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

export default HomeSafetyStep4
