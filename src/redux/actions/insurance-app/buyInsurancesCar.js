import Utils from '../../../configs/insurance-app/constants/Utils'
import Service from '../../../services/insurance-app/buyInsuranceCar'
import {
    KEY_ACTIVE_STEP, KEY_ADD_TERMS_ALL, KEY_ADD_TERMS_MAIN, KEY_BH_INC_MAX, KEY_BH_INC_MIN,
    KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_DEDUCTION_LEVEL,
    KEY_PAY_CONTRACT_STATUS, KEY_SUGG_AUTOMAKER, KEY_SUGG_VEHICLE, KEY_ID_CONTACT_ALTER,
    KEY_VEHICLE_ID, MAX_STEP, KEY_HAS_CAL_FEE_DONE, KEY_ID_CONTACT, KEY_MIN_FEE, KEY_PAYMENT_TYPE, SIMPLIFY_MAX_STEP,
} from '../../reducers/insurance-app/buyInsurancesCar'
import { convertStrToNumber, hasRequestFail } from '../../../ultity'
import { setLoadingStatus } from './appConfig'
import { PAID_BONUS_SUCCESS, PAID_DEBT_SUCCESS, PAID_WAITING } from '../../../configs/insurance-app'
import { PAYMENT_TYPE_DEBT, PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { INVOICE_TYPE_COPR, INVOICE_TYPE_INSUR_BUYER, INVOICE_TYPE_PERS } from '../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { KEY_CONTRACT_CODE } from '../../reducers/insurance-app/utility'

export const ACTION_BUY_INSURANCES_CAR_NEXT_STEP = 'ACTION_BUY_INSURANCES_CAR_NEXT_STEP'
export const ACTION_BUY_INSURANCES_CAR_BACK_STEP = 'ACTION_BUY_INSURANCES_CAR_BACK_STEP'
export const ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP = 'ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP'
export const ACTION_BUY_INSURANCES_RESET_ALL = 'ACTION_BUY_INSURANCES_RESET_ALL'

export const update_companyId = (companyId, contractId) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingStatus(true))
            await Service.updateCompanyId({ companyId, id: contractId })
            dispatch(setLoadingStatus(false))
        } catch (e) {
            console.log(e)
        }
    }
}
/*
@api-section
*/
/**
 * @param {*} invoiceOption
 * @param {*} invoiceOwner_obj
 * @param {*} invoicePers_copr_obj
 * @param {*} completeContract_obj
 * @param {*} completedAction
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
            const completedRes = await Service.completeConstract(completeContract_obj)
            if (hasRequestFail(completedRes.status)) return

            completedAction && completedAction()
        } catch (e) {
            console.log(e)
        }
    }
}

export const debtContract = (contractId, debtInfo) => {
    return async (dispatch) => {
        const res = await Service.payConstract(contractId, debtInfo)
        if (hasRequestFail(res.status)) return

        dispatch({
            type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
            payload: [
                {
                    prop: KEY_ACTIVE_STEP,
                    value: 6
                },
                {
                    prop: KEY_PAY_CONTRACT_STATUS,
                    value: PAID_DEBT_SUCCESS
                }
            ]
        })
    }
}

export const bonusContract = (contractId, bonusInfo) => {
    return async (dispatch) => {
        const res = await Service.payConstract(contractId, bonusInfo)
        if (hasRequestFail(res.status)) return

        dispatch({
            type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
            payload: [
                {
                    prop: KEY_ACTIVE_STEP,
                    value: 6
                },
                {
                    prop: KEY_PAY_CONTRACT_STATUS,
                    value: PAID_BONUS_SUCCESS
                }
            ]
        })
    }
}
/** @example
    payInfo =  {
        certNo: toggleprintedCert && printedCertType === 'DIRECT' ? certNo : '',
        paymentType: paymentType,
        printedCertType: toggleprintedCert ? printedCertType : 'NONE',
        companyId: companyId
    }
 */
export const payContract = (contractId, payInfo) => {
    return async (dispatch) => {
        const res = await Service.payConstract(contractId, payInfo)
        if (hasRequestFail(res.status)) return

        if (payInfo[KEY_PAYMENT_TYPE] === PAYMENT_TYPE_FUND_TRANSFER) {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
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
            return
        }
        if (payInfo[KEY_PAYMENT_TYPE] === PAYMENT_TYPE_DEBT) {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
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
            return
        }
        // vnpay
        const { url } = res.data
        // console.log(`url`, url)
        // debugger
        if (url) {
            window.location.replace(url)
        }
    }
}
/**@example
   const { addTermsMains, addTermsAlls } = setAddtionalTerm(dataInsuranceAddons)
 */
export const setAddtionalTerm = (dataInsuranceAddons) => {
    let addTermsMains = []
    let addTermsAlls = []
    const keys = ["BS01", "BS02", "BS06", "BS09", "BS13"];
    dataInsuranceAddons.sort((a, b) => (a.addonCode > b.addonCode) ? 1 : -1)

    keys.forEach((key, i) => {
        dataInsuranceAddons.forEach((insuranceAddon, j) => {
            if (key === insuranceAddon.addonCode /* && insuranceAddon.buyEnable === true */) {
                addTermsMains.push(insuranceAddon)
            }
        })
    })

    dataInsuranceAddons.forEach((insuranceAddon, j) => {
        let exist = false
        if (keys.includes(insuranceAddon.addonCode)) {
            exist = true
        }
        if (!exist /* && insuranceAddon.buyEnable === true */) {
            addTermsAlls.push(insuranceAddon)
        }
    })

    return ({ addTermsMains, addTermsAlls })
}

export const updateConstract = (contractInfo, vehicleInfo, completedCallback) => {
    return async (dispatch) => {
        try {
            // console.log(`updateConstract.contractInfo`, contractInfo)
            // return console.log(`updateConstract.vehicleInfo`, vehicleInfo)
            const cRes = await Service.updateConstract(contractInfo)
            if (hasRequestFail(cRes.status)) return

            const resVehicle = await Service.updateVehicle(vehicleInfo)
            if (hasRequestFail(resVehicle.status)) return

            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_VEHICLE_ID,
                        value: resVehicle.data.id
                    },
                ]
            })

            const aRes = await Service.getAddTerm(contractInfo.id)
            if (hasRequestFail(aRes.status)) return

            const { addTermsMains, addTermsAlls } = setAddtionalTerm(aRes.data)
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ADD_TERMS_MAIN,
                        value: addTermsMains
                    },
                    {
                        prop: KEY_ADD_TERMS_ALL,
                        value: addTermsAlls
                    },
                ]
            })
            completedCallback && completedCallback()
        } catch (err) {
            console.log(err)
        }
    }
}

export const createConstract = (contractInfo, vehicleInfo, completedCallback) => {
    return async (dispatch) => {
        try {
            // console.log(`createContract.contractInfo`, contractInfo)
            // return console.log(`createContract.vehicleInfo`, vehicleInfo)
            const cRes = await Service.createConstract(contractInfo)
            if (hasRequestFail(cRes.status)) return

            const contractId = cRes.data.id
            vehicleInfo["contractId"] = contractId

            const vRes = await Service.createVehicle(vehicleInfo)
            if (hasRequestFail(vRes.status)) return

            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_CONTRACT_ID,
                        value: contractId
                    },
                    {
                        prop: KEY_VEHICLE_ID,
                        value: vRes.data.id
                    },
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: cRes.data
                    },
                ]
            })

            const tRes = await Service.getAddTerm(contractId)
            if (hasRequestFail(tRes.status)) return

            const { addTermsMains, addTermsAlls } = setAddtionalTerm(tRes.data)
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ADD_TERMS_MAIN,
                        value: addTermsMains
                    },
                    {
                        prop: KEY_ADD_TERMS_ALL,
                        value: addTermsAlls
                    },
                ]
            })
            completedCallback && completedCallback()
        } catch (err) {
            console.log(err)
        }
    }
}
/* 
@update api
*/
export const updateCompanyId = (info) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingStatus(true))
            await Service.updateConstract(info)
            dispatch(setLoadingStatus(false))
        } catch (error) {
            console.log(error)
        }
    }
}
/**
 *
 * @param {*} ownerUpdateContactInfo
 * @param {*} ownerId
 * @param {*} idContactAlter
 * @param {*} contractId
 * @param {*} isAlterBeneficiary
 * @param {*} updateAlterbeneficiaryContactInfo
 * @param {*} createAlterbeneficiaryContactInfo
 * @param {*} benefitValue
 * @param {*} completedCallback
 * @returns
 */
export const updateOwnerContactAndContract = (ownerUpdateContactInfo, ownerId, idContactAlter, contractId, isAlterBeneficiary, updateAlterbeneficiaryContactInfo, createAlterbeneficiaryContactInfo, benefitValue, completedCallback) => {
    return async (dispatch) => {
        try {
            if (isAlterBeneficiary) {
                if (idContactAlter) {
                    const a_res = await Service.updateContact(updateAlterbeneficiaryContactInfo)
                    if (hasRequestFail(a_res.status)) return
                } else {
                    const create_res = await Service.createContact(createAlterbeneficiaryContactInfo)
                    if (hasRequestFail(create_res.status)) return

                    idContactAlter = create_res.data.id
                    dispatch({
                        type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                        payload: [
                            {
                                prop: KEY_ID_CONTACT_ALTER,
                                value: idContactAlter
                            },
                        ]
                    })
                }
            }

            const c_res = await Service.updateContact(ownerUpdateContactInfo)
            if (hasRequestFail(c_res.status)) return

            const contractInfo = ({
                ownerId: ownerId,
                beneficiaryId: idContactAlter,
                benefitValue: isAlterBeneficiary ? convertStrToNumber(benefitValue) : null,
                id: contractId,
            })
            const resUpdateConstract = await Service.updateConstract(contractInfo)
            if (hasRequestFail(resUpdateConstract.status)) return
            completedCallback && completedCallback()
        } catch (error) {
            console.log(error)
        }
    }
}
/**
 *
 * @param {*} ownerContactInfo
 * @param {*} contractId
 * @param {*} isAlterBeneficiary
 * @param {*} alterbeneficiaryContactInfo
 * @param {*} benefitValue
 * @param {*} completedCallback
 * @returns
 */
export const createOwnerContact = (ownerContactInfo, contractId, isAlterBeneficiary, alterbeneficiaryContactInfo, benefitValue, completedCallback) => {
    return async (dispatch) => {
        try {
            // return console.log(`ownerContactInfo`, ownerContactInfo, "contractId", contractId, "isAlterBeneficiary", isAlterBeneficiary, "alterbeneficiaryContactInfo", alterbeneficiaryContactInfo, benefitValue)
            let idContact = null, idContactAlter = null
            if (isAlterBeneficiary) {
                const resAlterContact = await Service.createContact(alterbeneficiaryContactInfo)
                if (hasRequestFail(resAlterContact.status)) return

                idContactAlter = resAlterContact.data.id
                dispatch({
                    type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                    payload: [
                        {
                            prop: KEY_ID_CONTACT_ALTER,
                            value: idContactAlter
                        },
                    ]
                })
            }

            const resContact = await Service.createContact(ownerContactInfo)
            if (hasRequestFail(resContact.status)) return

            idContact = resContact.data.id
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ID_CONTACT,
                        value: idContact
                    },
                ]
            })

            const contractInfo = ({
                ownerId: idContact,
                beneficiaryId: idContactAlter,
                benefitValue: isAlterBeneficiary ? convertStrToNumber(benefitValue) : null,
                id: contractId,
            })
            const resUpdateConstract = await Service.updateConstract(contractInfo)
            if (hasRequestFail(resUpdateConstract.status)) { return }
            completedCallback && completedCallback()
        } catch (err) {
            console.log(err)
        }
    }
}
/* 
@get-api 
*/
export const calFee = (contractInfo, paymentMethod, printedCertType) => {
    let feeShip = 0, fee = 0
    if (printedCertType === 'DELIVERY') {
        feeShip = Number.parseInt(contractInfo.shipingFee)
    }

    if (paymentMethod === "FUND_TRANSFER") {
        fee = Number.parseInt(contractInfo.funTransferPayFee) + Number.parseInt(feeShip)
    } else if (paymentMethod === "VISA_MASTER") {
        fee = Number.parseInt(contractInfo.visaMasterPayFee) + Number.parseInt(feeShip)
    } else if (paymentMethod === "ATM") {
        fee = Number.parseInt(contractInfo.atmPayFee) + Number.parseInt(feeShip)
    } else if (paymentMethod === "QR_CODE") {
        fee = Number.parseInt(contractInfo.qrPayFee) + Number.parseInt(feeShip)
    } else {
        fee = feeShip
    }

    return fee
}

const calculateInsuranceFee = (contractInfo, paymentType, printedCertType) => {
    const { insurances } = contractInfo
    let feeCAR_TNDS, feeCAR_TNDS_TN, feeCAR_VATCHAT, feeCAR_CONNGUOI, feeCAR_HANGHOA
    let feeVAT = calFee(contractInfo, paymentType, printedCertType)

    insurances.forEach((insurance) => {
        if (insurance.insuranceCode === 'CAR_TNDS') {
            feeCAR_TNDS = Utils.formatCurrency(insurance.fee)
        } else if (insurance.insuranceCode === 'CAR_TNDS_TN') {
            feeCAR_TNDS_TN = Utils.formatCurrency(insurance.fee)
        } else if (insurance.insuranceCode === 'CAR_VATCHAT') {
            if (insurance.startValueDate !== null) {
                feeCAR_VATCHAT = Utils.formatCurrency(insurance.fee)
            }
        } else if (insurance.insuranceCode === 'CAR_CONNGUOI') {
            feeCAR_CONNGUOI = Utils.formatCurrency(insurance.fee)
        } else if (insurance.insuranceCode === 'CAR_HANGHOA') {
            feeCAR_HANGHOA = Utils.formatCurrency(insurance.fee)
        }
    })
    return ({
        feeCAR_TNDS, feeCAR_TNDS_TN, feeCAR_VATCHAT, feeCAR_CONNGUOI, feeCAR_HANGHOA, feeVAT
    })
}
/**
    @example
    const [totalFeeInclVAT, feeVAT, feeCAR_TNDS, feeCAR_TNDS_TN, feeCAR_VATCHAT, feeCAR_CONNGUOI, feeCAR_HANGHOA] = getCalculatedFees(contractInfo, paymentType)
 */
export function getCalculatedFees(contractInfo, paymentType) {
    const result = calculateInsuranceFee(contractInfo, paymentType, contractInfo.printedCertType)
    const _total_fee = +contractInfo.totalFee + +result.feeVAT
    return [_total_fee, result.feeVAT, result.feeCAR_TNDS, result.feeCAR_TNDS_TN, result.feeCAR_VATCHAT, result.feeCAR_CONNGUOI, result.feeCAR_HANGHOA,]
}

export const getConstractInfo = (contractId) => {
    return async (dispatch) => {
        try {
            setLoadingStatus(true)
            const res = await Service.getConstractInfo(contractId)
            setLoadingStatus(false)
            if (hasRequestFail(res.status)) return

            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
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

export const getConfigFeeBHVC = (companyId) => {
    return async (dispatch) => {
        try {
            let res
            if (companyId) {
                res = await Service.getConfigFeeBHVC(companyId)
            } else {
                res = await Service.getConfigFeeBHVC()
            }
            if (hasRequestFail(res.status)) return

            if (Array.isArray(res.data)) {
                console.log(res.data)
                return
            }

            const { deductionLevel, baseFeeIncreaseMax, baseFeeIncreaseMin, minimumFee } = res.data
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_DEDUCTION_LEVEL,
                        value: deductionLevel
                    },
                    {
                        prop: KEY_BH_INC_MAX,
                        value: baseFeeIncreaseMax
                    },
                    {
                        prop: KEY_BH_INC_MIN,
                        value: baseFeeIncreaseMin
                    },
                    {
                        prop: KEY_MIN_FEE,
                        value: minimumFee
                    },
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCarManufacturers = () => {
    return async (dispatch) => {
        try {
            const res = await Service.getCarManufacturers()
            if (res.status === 200) {
                const list = res.data.map((item, i) => {
                    item.value = i
                    item.label = item.name
                    item.brands.map((temp, j) => {
                        temp.value = j
                        temp.label = temp.brand
                        return temp
                    })
                    return item
                })

                dispatch({
                    type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                    payload: [
                        {
                            prop: KEY_SUGG_AUTOMAKER,
                            value: list
                        }
                    ]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCarVehicle = () => {
    return async (dispatch) => {
        try {
            const res = await Service.getCarVehicle()
            if (hasRequestFail(res.status)) return

            const sugg_Vehicle = res.data.map((item, i) => {
                item.value = item.id
                item.label = item.name
                item.inonType = item.code
                item.businessStatus = item.businessStatus
                return item
            })
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_SUGG_VEHICLE,
                        value: sugg_Vehicle
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
}
/* 
@dispatch-section
*/
export const updateProps = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateSpecificProp = (prop, value) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: prop,
                        value: value
                    }
                ]
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
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
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
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
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

export const resetState = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_BUY_INSURANCES_RESET_ALL,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDefault_updateCompanyIdObjAndCustomer = (contractId, companyId , ownerId) => {
    return ({
        id: contractId,
        companyId: companyId,
        ownerId: ownerId
    })
}
export const createConstractAndUpdateCompaniesAndCreateCustommer = (contractInfo, vehicleInfo,companyId , completedCallback , customerInfo , callFee) => {
    return async (dispatch) => {
        try {

            // create contract
            const cRes = await Service.createConstract(contractInfo)
            if (hasRequestFail(cRes.status)) return

            const contractId = cRes.data.id
            vehicleInfo["contractId"] = contractId

            const vRes = await Service.createVehicle(vehicleInfo)
            if (hasRequestFail(vRes.status)) return
            // create customer
            const resCustomer = await Service.createContact(customerInfo)
            if (hasRequestFail(resCustomer.status)) return
            //update custommer
           const resCom = await Service.updateConstract(getDefault_updateCompanyIdObjAndCustomer(contractId , companyId , resCustomer.data.id ))
           if (hasRequestFail(resCom.status)) return
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_CONTRACT_ID,
                        value: contractId
                    },
                    {
                        prop: KEY_VEHICLE_ID,
                        value: vRes.data.id
                    },
                    {
                        prop: KEY_CONTRACT_INFO,
                        value: cRes.data
                    },
                    {
                        prop : KEY_CONTRACT_CODE , 
                        value : resCom.data.contractCode
                    }
                ]
            })

            const tRes = await Service.getAddTerm(contractId)
            if (hasRequestFail(tRes.status)) return

            const { addTermsMains, addTermsAlls } = setAddtionalTerm(tRes.data)
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ADD_TERMS_MAIN,
                        value: addTermsMains
                    },
                    {
                        prop: KEY_ADD_TERMS_ALL,
                        value: addTermsAlls
                    },
                ]
            })
            completedCallback && completedCallback()
        } catch (err) {
            console.log(err)
        }
    }
}


export const payContractSimplify = (contractId, payInfo) => {
    return async (dispatch) => {
        const res = await Service.payConstract(contractId, payInfo)
        if (hasRequestFail(res.status)) return
        if (payInfo[KEY_PAYMENT_TYPE] === PAYMENT_TYPE_FUND_TRANSFER) {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ACTIVE_STEP,
                        value: SIMPLIFY_MAX_STEP
                    },
                    {
                        prop: KEY_PAY_CONTRACT_STATUS,
                        value: PAID_WAITING
                    },
                ]
            })
            return
        }
        if (payInfo[KEY_PAYMENT_TYPE] === PAYMENT_TYPE_DEBT) {
            dispatch({
                type: ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP,
                payload: [
                    {
                        prop: KEY_ACTIVE_STEP,
                        value: SIMPLIFY_MAX_STEP
                    },
                    {
                        prop: KEY_PAY_CONTRACT_STATUS,
                        value: PAID_DEBT_SUCCESS
                    },
                ]
            })
            return
        }
        // vnpay
        const { url } = res.data
        if (url) {
            window.location.replace(url)
        }
    }
}