import React, { createElement } from 'react'
import { useSelector } from 'react-redux'
import { getStepComponent } from '../components/stepsManager'

const BodyView = () => {
    const { activeStep } = useSelector(state => state.app.buyInsurancesFamilySafety)

    return createElement(getStepComponent(activeStep).bodyComponent)
}

export default BodyView