import React from 'react'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import { StepFooter } from '../../StepFooter'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_BUY_NEW, actionResetStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { history } from '../../../../../history'

const VtaStep4 = () => {

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

  const { paymentStatus } = useSelector(state => state.app.buyInsurance)
  const {authToken} = useSelector(state => state.auth?.guest)
  const dispatch = useDispatch()

  return (
    <>
      <PaymentStatus status={paymentStatus} />
      <StepFooter onClickBuyNew={onClickBuyNew} onClickDone={onSubmit} />
    </>
  )
}

export default VtaStep4
