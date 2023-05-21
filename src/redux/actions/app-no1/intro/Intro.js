import React from 'react'

export const ACTION_NEXT_STEP = 'ACTION_NEXT_STEP_INTRO'
export const ACTION_PREV_STEP = 'ACTION_PREV_STEP_INTRO'
export const ACTION_LOAD_INTRO_STEPS = 'ACTION_LOAD_INTRO_STEPS'
export const ACTION_ACTIVE_STEP = 'ACTION_ACTIVE_STEP_INTRO'

export const actionNextStep = () => {
  return (dispatch) => {
    dispatch({ type: ACTION_NEXT_STEP })
  }
}

export const actionPrevStep = () => {
  return (dispatch) => {
    dispatch({ type: ACTION_PREV_STEP })
  }
}

export const actionActiveStep = (activeStep) => {
  return(dispatch) => {
    dispatch({type: ACTION_ACTIVE_STEP, payload: activeStep})
  }
}
