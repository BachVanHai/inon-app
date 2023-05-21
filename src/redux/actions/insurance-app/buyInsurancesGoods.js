import { MAX_STEP } from "../../reducers/insurance-app/buyInsurancesTravel"
import { BASE } from "../../reducers/insurance-app/buyInsurancesTravel"
import { ACTION_BUY_INSUR_GOODS_RESET_ALL, ACTION_BUY_INSUR_GOODS_UPDATE_PROPS } from "../../reducers/insurance-app/buyInsurancesGoods"
export const updateProps = (properties) => {
    return (dispatch) => {
        dispatch(
            {
                type: ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
                payload: properties
            }
        )
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({
            type: ACTION_BUY_INSUR_GOODS_RESET_ALL,
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
                type: ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
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
                type: ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
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