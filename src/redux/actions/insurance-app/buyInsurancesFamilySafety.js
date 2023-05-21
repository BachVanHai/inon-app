import Service from '../../../services/insurance-app/buyInsurancesFamilySafety'
import { hasRequestFail } from '../../../ultity'
import {
    KEY_ACTIVE_STEP, KEY_AGREED_TERM_OF_SERVICES_STATUS, KEY_BENEFICIARIES, KEY_COMPANY_ID, KEY_CONTRACT_ID, KEY_HAS_CAL_FEE_DONE,
    KEY_PAYMENT_TYPE, KEY_PAY_CONTRACT_STATUS, MAX_STEP,
    KEY_CONTRACT_INFO
} from '../../reducers/insurance-app/buyInsurancesFamilySafety'
import { pay, setLoadingStatus } from './appConfig'

export const ACTION_FAMILY_SAFETY_UPDATE_STEP_INFO = 'ACTION_FAMILY_SAFETY_UPDATE_STEP_INFO'
export const ACTION_FAMILY_SAFETY_NEXT_STEP = 'ACTION_FAMILY_SAFETY_NEXT_STEP'
export const ACTION_FAMILY_SAFETY_BACK_STEP = 'ACTION_FAMILY_SAFETY_BACK_STEP'
export const ACTION_FAMILY_SAFETY_RESET_INFO = 'ACTION_FAMILY_SAFETY_RESET_INFO'
export const ACTION_FAMILY_SAFETY_RESET_SPECIFY_STEP = 'ACTION_FAMILY_SAFETY_RESET_SPECIFY_STEP'
export const ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP = 'ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP'
export const ACTION_FAMILY_SAFETY_CAL_FEE_DONE = 'ACTION_FAMILY_SAFETY_CAL_FEE_DONE'
/* 
@api-section
*/
export const updateContractCompany = (contractId, updateInsuranceInfo, updateContractCompanyInfo, buyerType) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingStatus(true))
            const res1 = await Service.updateInsurance(updateInsuranceInfo)
            dispatch(setLoadingStatus(false))
            if (hasRequestFail(res1.status)) return
            dispatch(setLoadingStatus(true))
            const res2 = await Service.updateContractCompany(updateContractCompanyInfo, contractId, buyerType)
            dispatch(setLoadingStatus(false))
            if (hasRequestFail(res2.status)) return
            dispatch(setLoadingStatus(true))
            const res3 = await Service.getContract(contractId)
            dispatch(setLoadingStatus(false))
            if (hasRequestFail(res3.status)) return

            dispatch({
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res3.data
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const assignCompanyId = (companyId) => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
            payload: [
                {
                    prop: KEY_COMPANY_ID,
                    value: companyId
                }
            ]
        })
    }
}

export const assignPaymentType = (paymentType) => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
            payload: [
                {
                    prop: KEY_PAYMENT_TYPE,
                    value: paymentType
                }
            ]
        })
    }
}

export const setAgreedTermOfServicesStatus = (status) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
                        value: status
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
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
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

export const payContract = (contractId, paymentType) => {
    return async (dispatch) => {
        // return console.log(`payContract.contractId`, contractId)
        try {
            dispatch(
                pay(
                    contractId, paymentType,
                    {
                        ACTION_UPDATE_PROPS: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                        KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
                        MAX_STEP: MAX_STEP,
                        KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS
                    },
                    Service.payContract
                )
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export const getContract = (contractId) => {
    return async (dispatch) => {
        // return console.log(`getContract.contractId`, contractId)
        try {
            setLoadingStatus(true)
            const res = await Service.getContract(contractId)
            setLoadingStatus(false)
            if (hasRequestFail(res.status)) return

            dispatch({
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: res.data
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const reCalculateFeeContract = (contractInfo) => {
    return async (dispatch) => {
        // return console.log(`calculateFeeContract.contractInfo`, contractInfo)
        dispatch({
            type: ACTION_FAMILY_SAFETY_CAL_FEE_DONE,
            payload: {
                hasCalFeeDone: false
            }
        })
        try {
            const res = await Service.calculateFeeContract(contractInfo)
            if (res) {
                dispatch({
                    type: ACTION_FAMILY_SAFETY_CAL_FEE_DONE,
                    payload: {
                        dataFees: res,
                        hasCalFeeDone: true
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const setIncompletedCalFee = () => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_FAMILY_SAFETY_CAL_FEE_DONE,
            payload: {
                hasCalFeeDone: false
            }
        })
    }
}

export const calculateFeeContract = (contractInfo) => {
    return async (dispatch) => {
        // return console.log(`calculateFeeContract.contractInfo`, contractInfo)
        try {
            const res = await Service.calculateFeeContract(contractInfo)
            if (res) {
                dispatch({
                    type: ACTION_FAMILY_SAFETY_CAL_FEE_DONE,
                    payload: {
                        dataFees: res,
                        hasCalFeeDone: true
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const updateBeneficiary = (beneficiariesInfo) => {
    return async (dispatch) => {
        // return console.log(`updateBeneficiary.beneficiariesInfo`, beneficiariesInfo)
        try {
            const res = await Service.updateBeneficiaries(beneficiariesInfo)
            if (hasRequestFail(res.status)) return
            const { beneficiaries, beneficiary } = res.data
            dispatch({
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_BENEFICIARIES,
                        value: beneficiaries || beneficiary || []
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const createBeneficiary = (contractInfo) => {
    return async (dispatch) => {
        // return console.log(`createBeneficiary.contractInfo`, contractInfo)
        try {
            const res = await Service.createBeneficiary(contractInfo)
            if (res.status == 200) {
                const { beneficiaries, beneficiary } = res.data

                dispatch({
                    type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                    payload: [
                        {
                            prop: KEY_BENEFICIARIES,
                            value: beneficiaries || beneficiary || []
                        }
                    ]
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const updateContract = (customerInfo) => {
    return async (dispatch) => {
        // return console.log(`updateContract.customerInfo`, customerInfo)
        try {
            const res = await Service.updateContract(customerInfo)
            if (res.status == 200) {


            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const createContract = (customerInfo) => {
    return async (dispatch) => {
        // return console.log(`createContract.customerInfo`, customerInfo)
        try {
            const res = await Service.createContract(customerInfo)
            if (res.status == 200) {
                const { id } = res.data

                dispatch({
                    type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
                    payload: [
                        {
                            prop: KEY_CONTRACT_ID,
                            value: id || ""
                        }
                    ]
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}
/* 
@step-section
*/

/**
 * @example
 dispatch(
    updateProps(
        [
            {
                prop: KEY_COMPANY_ID,
                value: feeCompanyId
            },
            {
                prop: KEY_TOTAL_FEE,
                value: dataFee["totalFee"]
            },
        ]
    )
)

 */
export const updateProps = (stepInfo) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
            payload: stepInfo
        })
    }
}

export const updateStepInfo = (stepInfo) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_FAMILY_SAFETY_UPDATE_STEP_INFO,
                payload: {
                    stepInfo
                }
            })
        } catch (error) {
            console.log(error)
        }
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
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
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
                type: ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP,
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

export const resetSpecifyStep = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_FAMILY_SAFETY_RESET_SPECIFY_STEP,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const resetState = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_FAMILY_SAFETY_RESET_INFO,
            })
        } catch (error) {
            console.log(error)
        }
    }
}