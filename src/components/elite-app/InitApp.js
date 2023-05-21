import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionCheckPendingContract, actionMapUserIdForContract } from '../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'

const InitApp = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCheckPendingContract())
    dispatch(actionMapUserIdForContract())
  }, [])

  return <></>
}

export default InitApp
