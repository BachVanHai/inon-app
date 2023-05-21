import { MAX_STEP } from "../../reducers/insurance-app/buyInsurancesCars"
import { BASE } from "../../reducers/insurance-app/buyInsurancesCars"
import { ACTION_BUY_INSUR_CARS_UPDATE_PROPS, ACTION_BUY_INSUR_CARS_RESET_ALL } from "../../reducers/insurance-app/buyInsurancesCars"

export const updateProps = (properties) => {
    return (dispatch) => {
        dispatch(
            {
                type: ACTION_BUY_INSUR_CARS_UPDATE_PROPS,
                payload: properties
            }
        )
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({
            type: ACTION_BUY_INSUR_CARS_RESET_ALL,
        })
    }
}

export const backStep = (currentStep) => {
    return (dispatch) => {
        let _nextStep = --currentStep
        if (_nextStep < 1) {
            _nextStep = 1
        }

        dispatch(
            {
                type: ACTION_BUY_INSUR_CARS_UPDATE_PROPS,
                payload: [
                    {
                        prop: BASE.KEY_ACTIVE_STEP,
                        value: _nextStep
                    },
                    {
                        prop: BASE.KEY_HAS_CAL_FEE_DONE,
                        value: false
                    },
                ]
            }
        )
    }
}

export const nextStep = (currentStep) => {
    return (dispatch) => {
        let _nextStep = ++currentStep
        if (_nextStep > MAX_STEP) {
            _nextStep = MAX_STEP
        }

        dispatch(
            {
                type: ACTION_BUY_INSUR_CARS_UPDATE_PROPS,
                payload: [
                    {
                        prop: BASE.KEY_ACTIVE_STEP,
                        value: _nextStep
                    }
                ]
            }
        )
    }
}