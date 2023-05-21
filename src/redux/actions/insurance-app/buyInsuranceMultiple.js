import {
  PAYMENT_TYPE_BONUS,
  PAYMENT_TYPE_DEBT,
  PAYMENT_TYPE_FUND_TRANSFER
} from '../../../components/insurance-app/buy-insurances-page/formik-config'
import {
  PAID_BONUS_SUCCESS,
  PAID_DEBT_SUCCESS,
  PAID_WAITING
} from '../../../configs/insurance-app'
import Service from '../../../services/insurance-app/buyInsurancesPersonalHome'
import { hasRequestFail } from '../../../ultity'
import {
  KEY_ACTIVE_STEP,
  KEY_HAS_CAL_FEE_DONE,
  KEY_PAY_CONTRACT_STATUS,
  MAX_STEP
} from '../../reducers/insurance-app/buyInsuranceHomeMultiple'
import { pay, setLoadingStatus } from './appConfig'

export const ACTION_UPDATE_PROPS_HOME = 'ACTION_UPDATE_PROPS'
export const ACTION_RESET_ALL = 'ACTION_RESET_ALL'
export const ACTION_MERGE_PROPS = 'ACTION_MERGE_PROPS'
export const setPayContractStatus = (status) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_UPDATE_PROPS_HOME,
        payload: [
          {
            prop: KEY_PAY_CONTRACT_STATUS,
            value: status
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/*
@none-api-section
*/
export const updateProps = (infos) => {
  return async (dispatch) => {
    dispatch({
      type: ACTION_UPDATE_PROPS_HOME,
      payload: infos
    })
  }
}

export const resetState = () => {
  return async (dispatch) => {
    dispatch({
      type: ACTION_RESET_ALL
    })
  }
}

export const backStep = (currentStep) => {
  return async (dispatch) => {
    let _nextStep = --currentStep
    if (_nextStep < 1) {
      _nextStep = 1
    }

    dispatch({
      type: ACTION_UPDATE_PROPS_HOME,
      payload: [
        {
          prop: KEY_ACTIVE_STEP,
          value: _nextStep
        },
        {
          prop: KEY_HAS_CAL_FEE_DONE,
          value: false
        }
      ]
    })
  }
}

export const nextStep = (currentStep) => {
  return async (dispatch) => {
    let _nextStep = ++currentStep
    if (_nextStep > MAX_STEP) {
      _nextStep = MAX_STEP
    }

    dispatch({
      type: ACTION_UPDATE_PROPS_HOME,
      payload: [
        {
          prop: KEY_ACTIVE_STEP,
          value: _nextStep
        }
      ]
    })
  }
}
