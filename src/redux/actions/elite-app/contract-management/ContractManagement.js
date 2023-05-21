import React from 'react'
import { BuyInsuranceService } from '../../../../services/elite-app/buyInsurance'

export const ACTION_LOAD_CONTRACTS = 'ACTION_LOAD_CONTRACTS'
export const ACTION_PREV_STEP = 'ACTION_PREV_STEP'
export const ACTION_NEXT_STEP = 'ACTION_NEXT_STEP'

export const loadContracts = () => {

  return async (dispatch) => {
    try {
      const res = await Promise.all([BuyInsuranceService.getAllVehicleContracts(), BuyInsuranceService.getAllPersonalContracts(), BuyInsuranceService.getAllHomeContracts()]);
      const data = res.map((res) => res.data);
      const dataOrdered = data.flat().sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))

      dispatch({
        type: ACTION_LOAD_CONTRACTS,
        payload: JSON.parse(JSON.stringify(dataOrdered))
      })
    } catch {
      throw Error("Promise failed");
    }
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
