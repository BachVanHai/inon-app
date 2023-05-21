import { KEY_CURRENT_INSURANCE_TYPE, KEY_DEBT_ACCOUNT_INFO, KEY_IS_LOADING, KEY_PARTNERS, KEY_USERS_DTO } from "../../reducers/insurance-app/appConfig"
import { hasRequestFail } from '../../../ultity'
import Service from '../../../services/insurance-app/appConfig'
import { PAID_BONUS_SUCCESS, PAID_DEBT_SUCCESS, PAID_WAITING } from '../../../configs/insurance-app'
import { BaseAppConfigs } from 'base-app'
import {
    PAYMENT_TYPE_FUND_TRANSFER,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_BONUS
} from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { INVOICE_TYPE_COPR, INVOICE_TYPE_INSUR_BUYER, INVOICE_TYPE_PERS } from "../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase"

export const ACTION_APP_CONFIG_UPDATE_PROPS = 'ACTION_APP_CONFIG_UPDATE_PROPS'
export const ACTION_APP_CONFIG_RESET_STATE = 'ACTION_APP_CONFIG_RESET_STATE'
export const ACTION_APP_CONFIG_RESET_PROP = 'ACTION_APP_CONFIG_RESET_PROP'

/*
@ This is a common action. It'll support all of feature in insurance-app
*/

/**
   @example
   export const getDefault_insurBuyerObj = (values) => {
        return ({
            fullName: values[insurBuyer.KEY_NAME],
            phoneNumber: values[insurBuyer.KEY_PHONE_NUMBER],
            email: values[insurBuyer.KEY_EMAIL],
            address: values[insurBuyer.KEY_ADDRESS],
            icNo: values[insurBuyer.KEY_IC_NO],
            id: values[KEY_ID_CONTACT],
        })
    }

    export const getDefault_persOrCoprObj = (values) => {
        return ({
            icType: ID_TYPE_CMND,
            icNo: values[pers.KEY_IC_NO] || values[copr.KEY_TAX_ID],
            fullName: values[pers.KEY_NAME] || values[copr.KEY_NAME_COPR],
            phoneNumber: values[pers.KEY_PHONE_NUMBER] || values[copr.KEY_PHONE_NUMBER],
            email: values[pers.KEY_EMAIL] || values[copr.KEY_EMAIL],
            address: values[pers.KEY_ADDRESS] || values[copr.KEY_ADDRESS],
            type: values[KEY_INVOICE_TYPE] === INVOICE_TYPE_PERS ? CUSTOMER_INV : CUSTOMER_ORG
        })
    }

    export const getDefault_completeContractObj = (values, contractId) => {
        return ({
            id: contractId,
            taxInvoiceType: values[KEY_INVOICE_TYPE],
            taxInvoiceReceiverId: "",
            certReceiverId: "",
            isSaveTemplate: values[KEY_IS_SAVE_TEMPLATE],
            templateName: values[KEY_TEMPLATE_NAME],
        })
    }

    dispatch(
        completeContract(
            values[KEY_INVOICE_TYPE],
            getDefault_insurBuyerObj(values),
            getDefault_persOrCoprObj(values),
            getDefault_completeContractObj(values, contractId),
            completedAction
        )
    )
 */
export const completeContract = (invoiceOption, invoiceOwner_obj, invoicePers_copr_obj, completeContract_obj, completedAction) => {
    return async (dispatch) => {
        try {
            let taxInvoiceReceiverId = ''
            let certReceiverId = ''
            let obj, res
            switch (invoiceOption) {
                case INVOICE_TYPE_INSUR_BUYER:
                    obj = invoiceOwner_obj
                    taxInvoiceReceiverId = invoiceOwner_obj.id
                    break
                case INVOICE_TYPE_PERS:
                    obj = invoicePers_copr_obj
                    break
                case INVOICE_TYPE_COPR:
                    obj = invoicePers_copr_obj
                    break
                default:
                    break
            }
            if (obj && invoiceOption === INVOICE_TYPE_INSUR_BUYER) {
                res = await Service.updateContact(obj)
            } else if (obj && invoiceOption !== INVOICE_TYPE_INSUR_BUYER) {
                res = await Service.createContact(obj)
                if (hasRequestFail(res.status)) return

                taxInvoiceReceiverId = res.data.id
            }

            completeContract_obj["taxInvoiceReceiverId"] = taxInvoiceReceiverId
            completeContract_obj["certReceiverId"] = certReceiverId
            const completedRes = await Service.completeContract(completeContract_obj)
            if (hasRequestFail(completedRes.status)) return

            completedAction && completedAction()
        } catch (e) {
            console.log(e)
        }
    }
}

export const getPartners = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingStatus(true))
            const res = await Service.getPartners()
            dispatch(setLoadingStatus(false))
            if (hasRequestFail(res.status)) return

            const list = res.data.filter(item => item.userType === BaseAppConfigs.USER_TYPE.KD).map((item, i) => {
                item.value = item.id
                item.label = `${item.userCode}-${item.fullName}`
                item.check = false
                return item
            })

            dispatch({
                type: ACTION_APP_CONFIG_UPDATE_PROPS,
                payload: [
                    {
                        prop: KEY_PARTNERS,
                        value: list
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

/**
@example
    dispatch(
            pay(
                contractId, paymentType,
                {
                    ACTION_UPDATE_PROPS : KEY,
                    KEY_ACTIVE_STEP : KEY,
                    MAX_STEP : KEY,
                    KEY_PAY_CONTRACT_STATUS : KEY
                },
                Service.pay,
                companyId, // just an addtional param for some very specific insurances
                contractGroupInfo, // just an addtional param for some very specific insurances - cars and motors
            )
        )
 */

export function pay(contractId, paymentType, keyMaps = {}, Service_payCallback, companyId, contractGroupInfo) {
    return async (dispatch) => {
        // return console.log(`contractId, paymentType, keyMaps = {}, Service_payCallback, companyId`, contractId, paymentType, keyMaps, Service_payCallback)
        // return console.log(`companyId`, companyId)
        const { ACTION_UPDATE_PROPS, KEY_ACTIVE_STEP, MAX_STEP, KEY_PAY_CONTRACT_STATUS } = keyMaps

        let res
        if (companyId) {
            res = await Service_payCallback(contractId, paymentType, companyId)
        } else if (contractGroupInfo) {
            res = await Service_payCallback(contractGroupInfo)
        }
        else {
            res = await Service_payCallback(contractId, paymentType)
        }
        if (hasRequestFail(res.status)) return

        switch (paymentType) {
            case PAYMENT_TYPE_FUND_TRANSFER:
                dispatch({
                    type: ACTION_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_ACTIVE_STEP,
                            value: MAX_STEP
                        },
                        {
                            prop: KEY_PAY_CONTRACT_STATUS,
                            value: PAID_WAITING
                        },
                    ]
                })
                break
            case PAYMENT_TYPE_DEBT:
                dispatch({
                    type: ACTION_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_ACTIVE_STEP,
                            value: MAX_STEP
                        },
                        {
                            prop: KEY_PAY_CONTRACT_STATUS,
                            value: PAID_DEBT_SUCCESS
                        },
                    ]
                })
                break
            case PAYMENT_TYPE_BONUS:
                dispatch({
                    type: ACTION_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_ACTIVE_STEP,
                            value: MAX_STEP
                        },
                        {
                            prop: KEY_PAY_CONTRACT_STATUS,
                            value: PAID_BONUS_SUCCESS
                        },
                    ]
                })
                break
            default: // pay with vnpay
                const { url } = res.data
                // console.log(`url`, url)
                // debugger
                if (url) {
                    window.location.assign(url)
                }
                break
        }
    }
}
/**
 * @example
    dispatch(setLoadingStatus(true))
 */
export function setLoadingStatus(loadingStatus) {
    return (dispatch) => {
        if (loadingStatus) {
            dispatch({ type: "SHOW_LOADING_BAR", })
        } else {
            dispatch({ type: "HIDE_LOADING_BAR", })
        }
        dispatch({
            type: ACTION_APP_CONFIG_UPDATE_PROPS,
            payload: [
                {
                    prop: KEY_IS_LOADING,
                    value: loadingStatus,
                }
            ]
        })
    }
}

/**
 * @example
  const { ACTION_UPDATE_PROPS, ACTION_MERGE_PROPS, KEY_STEP_1 } = keyMaps
 */

export function checkInfoContact(contactId, keyMaps = {}) {
    return async (dispatch) => {
        try {
            const { ACTION_UPDATE_PROPS, ACTION_MERGE_PROPS, KEY_STEP } = keyMaps
            // return console.log(`contactId,keyMaps`, contactId, keyMaps)
            const res = await Service.checkInfoContact(contactId)
            if (hasRequestFail(res.status)) {
                dispatch({
                    type: ACTION_UPDATE_PROPS,
                    payload: [
                        {
                            prop: KEY_STEP,
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
                        prop: KEY_STEP,
                        value: res.data
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function resetState() {
    return (dispatch) => {
        dispatch({
            type: ACTION_APP_CONFIG_RESET_STATE,
        })
    }
}

export function resetProp(prop = "property") {
    return (dispatch) => {
        dispatch({
            type: ACTION_APP_CONFIG_RESET_PROP,
            payload: prop
        })
    }
}

export function assignInsuranceType(insuranceType) {
    return (dispatch) => {
        dispatch({
            type: ACTION_APP_CONFIG_UPDATE_PROPS,
            payload: [
                {
                    prop: KEY_CURRENT_INSURANCE_TYPE,
                    value: insuranceType,
                }
            ]
        })
    }
}

export function getMyDebtAccount() {
    return async (dispatch) => {
        const res = await Service.getMyDebtAccount()
        if (hasRequestFail(res.status))
            return
        if (!res.data)
            return

        const { usersDTO, currentDebt, totalDebt, transactionLimit, dailyLimit, monthlyLimit, currentDailyDebt, currentMonthlyDebt
        } = res.data

        dispatch({
            type: ACTION_APP_CONFIG_UPDATE_PROPS,
            payload: [
                {
                    prop: KEY_DEBT_ACCOUNT_INFO,
                    value: {
                        totalDebt,
                        dailyLimit,
                        currentDebt,
                        monthlyLimit,
                        currentDailyDebt,
                        transactionLimit,
                        currentMonthlyDebt
                    }
                },
                {
                    prop: KEY_USERS_DTO,
                    value: usersDTO
                }
            ]
        })
    }
}
