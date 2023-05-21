import {
    KEY_ACTIVE_STEP, KEY_HAS_CAL_FEE_DONE, MAX_STEP, KEY_CONTRACT_ID, KEY_CONTRACT_INFO,
    KEY_DATA_FEES, KEY_CONTRACT_CODE, KEY_TOTAL_FEE, KEY_PAYMENT_TYPE, KEY_PAY_CONTRACT_STATUS
} from '../../reducers/insurance-app/buyInsurancesVta'
import { setLoadingStatus, pay as _pay } from './appConfig'
import Service from "../../../services/insurance-app/buyInsurancesVta"
import { getTotalFeeVAT, hasRequestFail } from '../../../ultity'
import { initialState } from '../../../redux/reducers/insurance-app/buyInsurancesVta'

export const ACTION_BUY_INSUR_VTA_UPDATE_PROPS = 'ACTION_BUY_INSUR_VTA_UPDATE_PROPS'
export const ACTION_BUY_INSUR_VTA_RESET_ALL = 'ACTION_BUY_INSUR_VTA_RESET_ALL'

export const vnpayConfirm = () => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const res = await Service.vnpayConfirm()
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return

    }
}

export const pay = (contractId, paymentType) => {
    return async (dispatch) => {
        dispatch(
            _pay(
                contractId, paymentType,
                {
                    ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                    KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
                    MAX_STEP: MAX_STEP,
                    KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS
                },
                Service.pay
            )
        )
    }
}

export const getFee = (contactId) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const res = await Service.getFee(contactId)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return

        dispatch({
            type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
            payload: [
                {
                    prop: KEY_HAS_CAL_FEE_DONE,
                    value: true
                },
                {
                    prop: KEY_DATA_FEES,
                    value: res.data
                },
            ]
        })
    }
}

export const updateInsurance = (contactId, insuranceInfo) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const res = await Service.updateInsurance(contactId, insuranceInfo)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return
    }
}

export const getContractInfo = (contactId) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const res = await Service.getContractInfo(contactId)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return

        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res.data
                    }
                ]
            }
        )
    }
}

export const updateContract = (contractId, contractInfo, buyerType) => {
    return async (dispatch) => {
        // return console.log("contractId, contractInfo", contractId, contractInfo)
        dispatch(setLoadingStatus(true))
        const res = await Service.updateContract(contractId, contractInfo)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return

        dispatch(setLoadingStatus(true))
        const res2 = await Service.getContractInfo(res.data.id)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res2.status)) return
        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res2.data
                    },
                ]
            }
        )

        dispatch(setLoadingStatus(true))
        const res3 = await Service.getFee(res.data.id, buyerType)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res3.status)) return
        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [

                    {
                        prop: KEY_HAS_CAL_FEE_DONE,
                        value: true
                    },
                    {
                        prop: KEY_DATA_FEES,
                        value: res3.data
                    },
                    {
                        prop: KEY_CONTRACT_CODE,
                        value: res3.data.contractCode
                    },
                    {
                        prop: KEY_TOTAL_FEE,
                        value: getTotalFeeVAT(res3.data, initialState[KEY_PAYMENT_TYPE])
                    },
                ]
            }
        )
    }
}

export const createContract = (contractInfo, buyerType) => {
    return async (dispatch) => {
        // return console.log(`contractInfo`, contractInfo)
        dispatch(setLoadingStatus(true))
        const res = await Service.createContract(contractInfo)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res.status)) return
        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_ID,
                        value: res.data.id
                    },
                ]
            }
        )

        dispatch(setLoadingStatus(true))
        const res2 = await Service.getContractInfo(res.data.id)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res2.status)) return
        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res2.data
                    },
                ]
            }
        )

        dispatch(setLoadingStatus(true))
        const res3 = await Service.getFee(res.data.id, buyerType)
        dispatch(setLoadingStatus(false))
        if (hasRequestFail(res3.status)) return
        dispatch(
            {
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [

                    {
                        prop: KEY_HAS_CAL_FEE_DONE,
                        value: true
                    },
                    {
                        prop: KEY_DATA_FEES,
                        value: res3.data
                    },
                    {
                        prop: KEY_CONTRACT_CODE,
                        value: res3.data.contractCode
                    },
                    {
                        prop: KEY_TOTAL_FEE,
                        value: getTotalFeeVAT(res3.data, initialState[KEY_PAYMENT_TYPE])
                    },
                ]
            }
        )
    }
}
/*
@none-api-section
*/

export const updateProps = (infoArray) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
            payload: infoArray
        })
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({
            type: ACTION_BUY_INSUR_VTA_RESET_ALL
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
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_ACTIVE_STEP,
                        value: _nextStep
                    },
                    {
                        prop: KEY_HAS_CAL_FEE_DONE,
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
                type: ACTION_BUY_INSUR_VTA_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_ACTIVE_STEP,
                        value: _nextStep
                    }
                ]
            }
        )
    }
}
