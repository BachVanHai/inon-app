import React, { useEffect } from 'react'
import { HttpClient } from 'base-app'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { history } from "../../../history"
import BuyInsuranceCarServ from '../../../services/insurance-app/buyInsuranceCar'
import BuyHCServ from '../../../services/insurance-app/buyInsurancesFamilySafety'
import PerHomeServ from '../../../services/insurance-app/buyInsurancesPersonalHome'
import VTAHomeServ from '../../../services/insurance-app/buyInsurancesVta'
import motorServ from '../../../services/insurance-app/buyInsuranceMotor'
import {
    addAppContextPath,
    NAME_APP_CONFIG,
    getKeyLang,
    INSURANCE_TYPE_CAR,
    INSURANCE_TYPE_HOME_SAFETY,
    INSURANCE_TYPE_MOTOR,
    INSURANCE_TYPE_PERSONAL_HOME,
    INSURANCE_TYPE_VTA,
    PATH_BUY_INSURANCE,
    PATH_BUY_INSURANCES_CAR,
    PATH_BUY_INSURANCES_FAMILY_SAFETY,
    PATH_BUY_INSURANCES_MOTOR,
    PATH_BUY_INSURANCES_PERSONAL_HOME,
    PATH_BUY_INSURANCES_VTA,
    INSURANCE_TYPE_MOTORS,
    PATH_BUY_INSURANCES_MOTORS,
    INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE,
    PATH_BUY_HOME_PERSONAL_MULTIPLE,
    INSURANCE_TYPE_CARS,
    PATH_BUY_INSURANCES_CARS,
    INSURANCE_TYPE_HEALTH_CARE,
    PATH_BUY_INSURANCES_HEALTH_CARE,
    INSURANCE_TYPE_HEALTH_CARE_CONTRACT,
    INSURANCE_TYPE_CAR_SIMPLIFY,
    PATH_BUY_INSURANCES_CAR_SIMPLIFY,
    PATH_BUY_INSURANCES_TRAVEL,
    INSURANCE_TYPE_TRAVEL_GET_CONTRACT,
    INSURANCE_TYPE_TRAVEL,
    INSURANCE_TYPE_ANTIN_CONTRACT,
    INSURANCE_TYPE_ANTIN_CONTRACT_CONFIRM,
    PATH_BUY_ANTIN_INSURANCE,
    PATH_BUY_INSURANCES_TRAVEL_DOMESTIC,
    INSURANCE_TYPE_TRAVEL_DOMESTIC,
    INSURANCE_TYPE_TRAVEL_DOMESTIC_CONTRACT_CONFIRM,
    INSURANCE_TYPE_GOODS_CONFIRM,
    INSURANCE_TYPE_TRAVEL_DS,
    PATH_BUY_INSURANCES_GOODS,
    INSURANCE_TYPE_HEALTH_CARE_ADVANDCED
} from '../../../configs/insurance-app'
import { showAlert, divStyle, handleConfirm } from './utility'
import { hasRequestFail, isArrayEmpty, sleepingFor } from '../../../ultity'
import { buyInsurancePersonHomeMultipleService } from '../../../services/insurance-app/buyInsurancePersonHomeMultiple'

const PaymentWaiting = () => {
    const dispatch = useDispatch()
    const { currentInsuranceType } = useSelector(state => state.app[NAME_APP_CONFIG])
    useEffect(() => {
        const confirm = async () => {
            const info = ({
                returnURL: window.location.href
            })
            let res = { status: 500 }
            switch (currentInsuranceType) {
                case INSURANCE_TYPE_HOME_SAFETY:
                    res = await BuyHCServ.confirmVnPay(info)
                    break
                case INSURANCE_TYPE_CAR:
                    res = await BuyInsuranceCarServ.confirmConstract(info)
                    break
                case INSURANCE_TYPE_CARS:
                    res = await await HttpClient.post(`/nth/file/api/files-vnpay-confirm?contractType=${INSURANCE_TYPE_CAR}`, info)
                    break
                case INSURANCE_TYPE_PERSONAL_HOME:
                    res = await PerHomeServ.confirmPay(info)
                    break
                case INSURANCE_TYPE_VTA:
                    res = await VTAHomeServ.vnpayConfirm(info)
                    break
                case INSURANCE_TYPE_MOTOR:
                    res = await motorServ.confirmContract(info)
                    break
                case INSURANCE_TYPE_MOTORS:
                    res = await HttpClient.post(`/nth/file/api/files-vnpay-confirm?contractType=${INSURANCE_TYPE_MOTOR}`, info)
                    break
                case INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE:
                    res = await buyInsurancePersonHomeMultipleService.confirmPayment(info)
                    break
                case INSURANCE_TYPE_HEALTH_CARE:
                    res = await HttpClient.post(`/nth/personalinsurance/api/contracts-hcac/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_TRAVEL:
                    res = await HttpClient.post(`/nth/personalinsurance/api/travel-contracts/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_ANTIN_CONTRACT:
                    res = await HttpClient.post(`/nth/personalinsurance/api/contracts-hcac/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_TRAVEL_DS:
                    res = await HttpClient.post(`/nth/homeinsurance/api/travel-contract/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_GOODS_CONFIRM:
                    res = await HttpClient.post(`/nth/personalinsurance/api/travel-contracts/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_GOODS_CONFIRM:
                    res = await HttpClient.post(`/nth/personalinsurance/api/travel-contracts/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                case INSURANCE_TYPE_HEALTH_CARE_ADVANDCED:
                    res = await HttpClient.post(`/nth/personalinsurance/api/travel-contracts/vnpay/confirm`, info , { isBackgroundRequest: true })
                    break
                default:
                    sleepingFor(3000).then(() => {
                        history.push(addAppContextPath(PATH_BUY_INSURANCE))
                    })
                    break
            }
            if (hasRequestFail(res.status)) {
                /** check case mua bảo hiểm theo lô - do thanh toán thất bại nên ở đây INSURANCE_TYPE dùng loại theo lô */
                switch (currentInsuranceType) {
                    case INSURANCE_TYPE_MOTORS:
                        handleConfirm("9999", history, dispatch, PATH_BUY_INSURANCES_MOTORS)
                        break
                    case INSURANCE_TYPE_CARS:
                        handleConfirm("9999", history, dispatch, PATH_BUY_INSURANCES_CARS)
                        break
                    case INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE:
                        handleConfirm("9999", history, dispatch, PATH_BUY_HOME_PERSONAL_MULTIPLE)
                        break
                    default:
                        sleepingFor(3000).then(() => {
                            history.push(addAppContextPath(PATH_BUY_INSURANCE))
                        })
                        break
                }
                return
            }

            /** check case mua bảo hiểm theo lô - bắt buộc phải dùng INSURANCE_TYPE là loại không phải theo lô do phía back-end chỉ trả về như vậy */
            if (!isArrayEmpty(res.data)) {
                switch (res.data[0].contractType) {
                    case INSURANCE_TYPE_MOTOR:
                        handleConfirm("00", history, dispatch, PATH_BUY_INSURANCES_MOTORS)
                        break
                    case INSURANCE_TYPE_CAR:
                        handleConfirm("00", history, dispatch, PATH_BUY_INSURANCES_CARS)
                        break
                    case INSURANCE_TYPE_PERSONAL_HOME:
                        handleConfirm("00", history, dispatch, PATH_BUY_HOME_PERSONAL_MULTIPLE)
                        break
                    default:
                        sleepingFor(3000).then(() => {
                            history.push(addAppContextPath(PATH_BUY_INSURANCE))
                        })
                        break
                }
                return
            }

            switch (res.data.contract.contractType) {
                case INSURANCE_TYPE_MOTOR:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_MOTOR)
                    break
                case INSURANCE_TYPE_CAR:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_CAR)
                    break
                case INSURANCE_TYPE_HOME_SAFETY:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_FAMILY_SAFETY)
                    break
                case INSURANCE_TYPE_PERSONAL_HOME:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_PERSONAL_HOME)
                    break
                case INSURANCE_TYPE_VTA:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_VTA)
                    break
                case INSURANCE_TYPE_HEALTH_CARE_CONTRACT:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_HEALTH_CARE)
                    break
                case INSURANCE_TYPE_TRAVEL_GET_CONTRACT:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_TRAVEL)
                    break
                case INSURANCE_TYPE_ANTIN_CONTRACT_CONFIRM:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_ANTIN_INSURANCE)
                    break
                case INSURANCE_TYPE_TRAVEL_DS:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_TRAVEL_DOMESTIC)
                    break
                case INSURANCE_TYPE_GOODS_CONFIRM:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_GOODS)
                case INSURANCE_TYPE_HEALTH_CARE_ADVANDCED:
                    handleConfirm(res.data.RspCode, history, dispatch, PATH_BUY_INSURANCES_GOODS)
                    break
                default:
                    sleepingFor(3000).then(() => {
                        history.push(addAppContextPath(PATH_BUY_INSURANCE))
                    })
                    break
            }
        }

        confirm()
    }, [])  // eslint-disable-line

    return (
        <div className={divStyle}>
            {showAlert(getKeyLang(`NoticeAlertTitle`), getKeyLang(`InfoNotExistsAlertContent`), false)}
        </div>
    )
}

export default PaymentWaiting