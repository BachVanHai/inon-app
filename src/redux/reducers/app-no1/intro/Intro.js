import { ACTION_LOAD_INTRO_STEPS, ACTION_NEXT_STEP, ACTION_ACTIVE_STEP } from '../../../actions/app-no1/intro/Intro'
import { ACTION_PREV_STEP } from '../../../actions/app-no1/intro/Intro'
import { INTRO_TOTAL_STEP } from '../../../../configs/app-no1'


const INTRO_STEPS = {
  0: {
    component: 'IntroStep0'
  },
  1: {
    component: 'IntroStep1'
  },
  2: {
    component: 'IntroStep2'
  },
  3: {
    component: 'IntroStep3'
  }
}

const initialState = {
  activeStep: 1,
  steps: INTRO_STEPS
}

const introReducer = (state = initialState, action) => {
  let activeStep = state.activeStep
  switch (action.type) {
    case ACTION_NEXT_STEP:
      if (activeStep < INTRO_TOTAL_STEP) {
        activeStep++
      }
      return { ...state, activeStep }
    case ACTION_PREV_STEP:
      if (activeStep > 0) {
        activeStep--
      }
      return { ...state, activeStep }
    case ACTION_LOAD_INTRO_STEPS:
      return { ...state, ...action.payload }
    case ACTION_ACTIVE_STEP:
      activeStep = action.payload
      return {...state, activeStep}
    default:
      return state
  }
}

export default introReducer
