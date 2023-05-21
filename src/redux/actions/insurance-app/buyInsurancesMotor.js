import { ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS, ACTION_BUY_INSUR_MOTOR_RESET_ALL, MAX_STEP } from "../../../redux/reducers/insurance-app/buyInsurancesMotor"
import Service from "../../../services/insurance-app/buyInsuranceMotor"
import {
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER
} from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { hasRequestFail } from '../../../ultity'
import { setLoadingStatus } from "./appConfig"
import { PAID_BONUS_SUCCESS, PAID_DEBT_SUCCESS, PAID_WAITING } from '../../../configs/insurance-app'
import { BASE, KEY_MT3_OR_MT2_ID, KEY_OWNER_ID, KEY_VEHICLE_ID } from '../../reducers/insurance-app/buyInsurancesMotor'

export const createContact = (contractId, contactInfo, updateContractInfo) => {
    return async (dispatch) => {
        const res1 = await Service.createContact(contactInfo)
        if (hasRequestFail(res1.status)) return

        dispatch(
            {
                type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_OWNER_ID,
                        value: res1.data.id
                    },
                ]
            }
        )
        updateContractInfo["ownerId"] = res1.data.id
        const res2 = await Service.updateContract(updateContractInfo)
        if (hasRequestFail(res2.status)) return

        const res3 = await Service.getContractInfo(contractId)
        if (hasRequestFail(res3.status)) return

        dispatch(
            {
                type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                payload: [
                    {
                        prop: BASE.KEY_CONTRACT_INFO,
                        value: res3.data
                    },
                ]
            }
        )
    }
}

export const update_companyId = (companyId, contractId) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        await Service.update_companyId({ companyId, id: contractId })
        dispatch(setLoadingStatus(false))
    }
}

export const updateCompanyId = (insurInfo) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        await Service.updateCompanyId(insurInfo)
        dispatch(setLoadingStatus(false))
    }
}

export const updateVehicle = (updateVehicleInfo) => {
    return async (dispatch) => {
        try {
            const res = await Service.updateVehicle(updateVehicleInfo)
            if (hasRequestFail(res.status)) return

            dispatch(
                {
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_VEHICLE_ID,
                            value: res.data.id
                        },
                        {
                            prop: KEY_MT3_OR_MT2_ID,
                            value: res.data.vehicleType.id
                        },
                    ]
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const createVehicle = (createContractInfo, createVehicleInfo) => {
    return async (dispatch) => {
        try {
            const res1 = await Service.createContract(createContractInfo)
            if (hasRequestFail(res1.status)) return

            dispatch(
                {
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: BASE.KEY_CONTRACT_INFO,
                            value: res1.data
                        },
                        {
                            prop: BASE.KEY_CONTRACT_ID,
                            value: res1.data.id
                        },
                    ]
                }
            )
            createVehicleInfo["contractId"] = res1.data.id

            const res2 = await Service.createVehicle(createVehicleInfo)
            if (hasRequestFail(res2.status)) return

            dispatch(
                {
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_VEHICLE_ID,
                            value: res2.data.id
                        },
                        {
                            prop: KEY_MT3_OR_MT2_ID,
                            value: res2.data.vehicleType.id
                        },
                    ]
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const pay = (contractId, payInfo, _MAX_STEP) => {
    return async (dispatch) => {
        try {
            const __MAX_STEP = _MAX_STEP || MAX_STEP
            const res = await Service.pay(contractId, payInfo)
            if (hasRequestFail(res.status)) return
            const { [BASE.KEY_PAYMENT_TYPE]: paymentType } = payInfo

            if (paymentType === PAYMENT_TYPE_FUND_TRANSFER) {
                dispatch({
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: BASE.KEY_ACTIVE_STEP,
                            value: __MAX_STEP
                        },
                        {
                            prop: BASE.KEY_PAY_CONTRACT_STATUS,
                            value: PAID_WAITING
                        },
                    ]
                })
                return
            }
            if (paymentType === PAYMENT_TYPE_DEBT) {
                dispatch({
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: BASE.KEY_ACTIVE_STEP,
                            value: __MAX_STEP
                        },
                        {
                            prop: BASE.KEY_PAY_CONTRACT_STATUS,
                            value: PAID_DEBT_SUCCESS
                        },
                    ]
                })
                return
            }

            if (paymentType === PAYMENT_TYPE_BONUS) {
                dispatch({
                    type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                    payload: [
                        {
                            prop: BASE.KEY_ACTIVE_STEP,
                            value: __MAX_STEP
                        },
                        {
                            prop: BASE.KEY_PAY_CONTRACT_STATUS,
                            value: PAID_BONUS_SUCCESS
                        },
                    ]
                })
                return
            }
            /** vnpay */
            const { url } = res.data
            // console.log(`url`, url)
            // debugger
            if (url) {
                window.location.replace(url)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
/*
@none-api-section
*/
export const updateProps = (properties) => {
    return (dispatch) => {
        dispatch(
            {
                type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                payload: properties
            }
        )
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({
            type: ACTION_BUY_INSUR_MOTOR_RESET_ALL,
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
                type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
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
                type: ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
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