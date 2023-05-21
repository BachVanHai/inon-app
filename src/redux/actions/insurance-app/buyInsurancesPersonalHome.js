import Service from '../../../services/insurance-app/buyInsurancesPersonalHome'
import { hasRequestFail } from '../../../ultity'
import {
    KEY_ACTIVE_STEP, KEY_BENEFICIARY_ID, KEY_BUYER_ID, KEY_CONTRACT_CODE, KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_DATA_FEES,
    KEY_HAS_CAL_FEE_DONE, KEY_INSURANCE_ID, KEY_PAY_CONTRACT_STATUS, KEY_STEP_1, MAX_STEP
} from '../../reducers/insurance-app/buyInsurancesPersonalHome'
import { pay, setLoadingStatus } from './appConfig'

export const ACTION_UPDATE_PROPS = 'ACTION_UPDATE_PROPS'
export const ACTION_RESET_ALL = 'ACTION_RESET_ALL'
export const ACTION_MERGE_PROPS = 'ACTION_MERGE_PROPS'

export const checkInfoContact = (contactId) => {
    return async (dispatch) => {
        try {
            const res = await Service.checkInfoContact(contactId)
            if (hasRequestFail(res.status)) {
                dispatch({
                    type: ACTION_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_STEP_1,
                            value: {}
                        }
                    ]
                })
                return
            }

            dispatch({
                type: ACTION_MERGE_PROPS,
                payload: [
                    {
                        prop: KEY_STEP_1,
                        value: res.data
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setPayContractStatus = (status) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_UPDATE_PROPS,
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

export const payContract = (contractId, paymentType, companyId) => {
    return async (dispatch) => {
        // return console.log(`payContract,contractId, paymentType, companyId`, contractId, paymentType, companyId)
        try {
            dispatch(
                pay(
                    contractId, paymentType,
                    {
                        ACTION_UPDATE_PROPS: ACTION_UPDATE_PROPS,
                        KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
                        MAX_STEP: MAX_STEP,
                        KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS
                    },
                    Service.payContract,
                    companyId
                )
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export const getContractInfo = (contractId, companyId) => {
    return async (dispatch) => {
        // return console.log(`getContractInfo, companyId`, contractId, companyId)
        try {
            setLoadingStatus(true)
            const res2 = await Service.getContractInfo(contractId, companyId)
            setLoadingStatus(false)
            if (hasRequestFail(res2.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res2.data
                    },
                    {
                        prop: KEY_CONTRACT_CODE,
                        value: res2.data.contractCode
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getFeeInsurance = (contractId, updateInsuranceInfo) => {
    return async (dispatch) => {
        // return console.log(`getFeeInsurance`, contractId)
        try {
            const uRes = await Service.updateInsurances(contractId, updateInsuranceInfo)
            if (hasRequestFail(uRes.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_BENEFICIARY_ID,
                        value: uRes.data[0].beneficiaryId
                    },
                    {
                        prop: KEY_INSURANCE_ID,
                        value: uRes.data[0].id
                    },
                ]
            })

            const gRes = await Service.getFeeInsurance(contractId)
            if (hasRequestFail(gRes.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_HAS_CAL_FEE_DONE,
                        value: true
                    },
                    {
                        prop: KEY_DATA_FEES,
                        value: gRes.data
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateInsurances = (contractId, info) => {
    return async (dispatch) => {
        // return console.log(`updateInsurances`, contractId, info)
        try {
            const res = await Service.updateInsurances(contractId, info)
            if (hasRequestFail(res.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_BENEFICIARY_ID,
                        value: res.data[0].beneficiaryId
                    },
                    {
                        prop: KEY_INSURANCE_ID,
                        value: res.data[0].id
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateContract = (info) => {
    return async (dispatch) => {
        // return console.log(`updateContract`, info)
        try {
            const res = await Service.updateContract(info)
            if (hasRequestFail(res.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_CODE,
                        value: res.data.contractCode
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const createContract = (info) => {
    return async (dispatch) => {
        // return console.log(`createContract`, info)
        try {
            const res = await Service.createContract(info)
            if (hasRequestFail(res.status)) return

            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_CONTRACT_ID,
                        value: res.data.id
                    },
                    {
                        prop: KEY_BUYER_ID,
                        value: res.data.ownerId
                    },
                    {
                        prop: KEY_CONTRACT_CODE,
                        value: res.data.contractCode
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
            type: ACTION_UPDATE_PROPS,
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

        dispatch(
            {
                type: ACTION_UPDATE_PROPS,
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
    return async (dispatch) => {
        let _nextStep = ++currentStep
        if (_nextStep > MAX_STEP) {
            _nextStep = MAX_STEP
        }

        dispatch(
            {
                type: ACTION_UPDATE_PROPS,
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
