import React, { createElement } from 'react'
import { useSelector } from 'react-redux'
import { getStepComponent, REDUX_STATE_NAME } from '../components/stepsManager'

const BodyView = () => {
    const { activeStep } = useSelector(state => state.app[REDUX_STATE_NAME])

    return createElement(getStepComponent(activeStep).bodyComponent)
}

export default BodyView