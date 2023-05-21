import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import { actionResetStepData, ACTION_BUY_NEW } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { resetState } from '../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { StepFooter } from '../../StepFooter'

const StepForm = ({ stepInfo, className, formik }) => {
    const history = useHistory()
    const onSubmit = () => {
        dispatch(actionResetStepData())

        if (authToken) {
            history.push('/home')
        } else {
            history.push('/login')
        }
    }

    const onClickBuyNew = async () => {
        dispatch(resetState())
        dispatch({ type: ACTION_BUY_NEW })
    }

    const { paymentStatus } = useSelector(state => state.app.buyInsurance)
    const { authToken } = useSelector(state => state.auth?.guest)
    const dispatch = useDispatch()

    return (
        <>
            <PaymentStatus status={paymentStatus} />
            <StepFooter onClickBuyNew={onClickBuyNew} onClickDone={onSubmit} />
        </>
    )
}

export default StepForm