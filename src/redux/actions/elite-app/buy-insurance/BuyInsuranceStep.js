import { INSURANCE_TYPES } from '../../../../configs/elite-app'

export const ACTION_PREV_STEP = 'ACTION_PREV_STEP'
export const ACTION_NEXT_STEP = 'ACTION_NEXT_STEP'
export const ACTION_RESET_STEP_DATA = 'ACTION_RESET_STEP_DATA'
export const ACTION_LOAD_INSURANCE_STEPS = 'ACTION_LOAD_INSURANCE_STEPS'
export const ACTION_SAVE_STEP_DATA = 'ACTION_SAVE_STEP_DATA'
export const ACTION_SAVE_CONTRACT = 'ACTION_SAVE_CONTRACT'
export const ACTION_SAVE_VEHICLE = 'ACTION_SAVE_VEHICLE'
export const ACTION_CHANGE_PAYMENT_METHOD = 'ACTION_CHANGE_PAYMENT_METHOD'
export const ACTION_CONFIRM_PAYMENT = 'ACTION_CONFIRM_PAYMENT'
export const ACTION_BUY_NEW = 'ACTION_BUY_NEW'
export const ACTION_GO_HOME = 'ACTION_GO_HOME'
export const ACTION_SAVE_REF_ID = 'ACTION_SAVE_REF_ID'
export const ACTION_SAVE_INSURANCE_HOME_PRIVATE =
  'ACTION_SAVE_INSURANCE_HOME_PRIVATE'


export const CAR_STEPS = {
  1: {
    component: 'CarStep1'
  },
  2: {
    component: 'CarStep2'
  },
  3: {
    component: 'CarStep3'
  },
  4: {
    component: 'CarStep4'
  }
}

export const MOTOR_STEPS = {
  1: {
    component: 'MotorStep1'
  },
  2: {
    component: 'MotorStep2'
  },
  3: {
    component: 'MotorStep3'
  },
  4: {
    component: 'MotorStep4'
  }
}

export const HOME_SAFETY_STEPS = {
  1: {
    component: 'HomeSafetyStep1'
  },
  2: {
    component: 'HomeSafetyStep2'
  },
  3: {
    component: 'HomeSafetyStep3'
  },
  4: {
    component: 'HomeSafetyStep4'
  }
}

export const HOME_PRIVATE_STEPS = {
  1: {
    component: 'HomePrivateStep1'
  },
  2: {
    component: 'HomePrivateStep2'
  },
  3: {
    component: 'HomePrivateStep3'
  },
  4: {
    component: 'HomePrivateStep4'
  }
}

export const VTA_STEPS = {
  1: {
    component: 'VtaStep1'
  },
  2: {
    component: 'VtaStep2'
  },
  3: {
    component: 'VtaStep3'
  },
  4:{
    component: 'VtaStep4'
  }
}
export const BC_STEPS = {
  1: {
    component: 'BestchoiseStep1'
  },
  2: {
    component: 'BestchoiseStep2'
  },
  3: {
    component: 'BestchoiseStep3'
  },
  4:{
    component: 'BestchoiseStep4'
  }
}

export const actionPrevStep = () => {
  return (dispatch) => {
    dispatch({ type: ACTION_PREV_STEP })
  }
}

export const actionNextStep = () => {
  return (dispatch) => {
    dispatch({ type: ACTION_NEXT_STEP })
  }
}

export const actionResetStepData = () => {
  return (dispatch) => {
    dispatch({ type: ACTION_RESET_STEP_DATA })
  }
}

export const actionSaveStepData = (step, data) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_SAVE_STEP_DATA, payload: { step, data } })
  }
}

export const actionSaveContract = (contract, feeDetails) => {
  return (dispatch, getState) => {
    let { type } = getState().app.buyInsurance
    if (!feeDetails) {
      let { feeDetails } = getState().app.buyInsurance
      if (type === INSURANCE_TYPES.TD) {
        feeDetails = []
      }
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: { contract, feeDetails }
      })
    } else {
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: { contract, feeDetails }
      })
    }
  }
}

export const actionChangePaymentMethod = (paymentMethod) => {
  return (dispatch) => {
    dispatch({ type: ACTION_CHANGE_PAYMENT_METHOD, payload: paymentMethod })
  }
}

export const actionSaveRefId = (refId) => {
  return (dispatch) => {
    dispatch({ type: ACTION_SAVE_REF_ID, payload: refId })
  }
}

export const loadStepsByInsuranceType = (insuranceType) => {
  const steps = getStepsByInsuranceType(insuranceType)

  return (dispatch, getState) => {
    const { type } = getState().app.buyInsurance
    if (type !== insuranceType) {
      dispatch({ type: ACTION_RESET_STEP_DATA })
    }
    dispatch({
      type: ACTION_LOAD_INSURANCE_STEPS,
      payload: { steps, type: insuranceType }
    })
  }
}

const getStepsByInsuranceType = (insuranceType) => {
  switch (insuranceType) {
    case 'bhvc':
    case 'tnds':
    case 'bhvc-tnds':
    case 'td':
      return CAR_STEPS
    case 'motor':
      return MOTOR_STEPS
    case 'homesafety':
      return HOME_SAFETY_STEPS
    case 'homeprivate':
      return HOME_PRIVATE_STEPS
    case 'vta':
      return VTA_STEPS
    case 'bc' : 
      return BC_STEPS
  }
}
