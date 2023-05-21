import React from 'react'
import { REDUX_STATE_NAME, stepsMap } from '../components/stepsManager'
import { useSelector } from 'react-redux'
import Origin from '../../../../../components/insurance-app/buy-insurances-page/header'

const HeaderView = () => {
    const { activeStep } = useSelector(state => state.app[REDUX_STATE_NAME])
    return (
        <Origin
            activeStep={activeStep} stepsMap={stepsMap} reduxStateName={REDUX_STATE_NAME}
        />
    )
}

export default HeaderView