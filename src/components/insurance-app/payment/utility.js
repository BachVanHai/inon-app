import React from 'react'
import {
    addAppContextPath, PAID_FAIL, PAID_SUCCESS, PATH_AN_IN_INSUR, PATH_BUY_HOME_PERSONAL_MULTIPLE, PATH_BUY_INSURANCES_CAR, PATH_BUY_INSURANCES_CARS, PATH_BUY_INSURANCES_CAR_SIMPLIFY, PATH_BUY_INSURANCES_FAMILY_SAFETY,
    PATH_BUY_INSURANCES_GOODS,
    PATH_BUY_INSURANCES_HEALTH_CARE,
    PATH_BUY_INSURANCES_MOTOR, PATH_BUY_INSURANCES_MOTORS, PATH_BUY_INSURANCES_PERSONAL_HOME, PATH_BUY_INSURANCES_TRAVEL, PATH_BUY_INSURANCES_TRAVEL_DOMESTIC, PATH_BUY_INSURANCES_VTA, PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED
} from '../../../configs/insurance-app'
import { FormattedMessage } from 'base-app'
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap"

import { KEY_PAY_CONTRACT_STATUS as C_KEY_PAY_STAT, KEY_ACTIVE_STEP as C_KEY_ACTIVE_STEP, MAX_STEP as C_MAX_STEP , SIMPLIFY_MAX_STEP as C_SIMPLIFY_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesCar'
import { KEY_PAY_CONTRACT_STATUS as F_KEY_PAY_STAT, KEY_ACTIVE_STEP as F_KEY_ACTIVE_STEP, MAX_STEP as F_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { KEY_PAY_CONTRACT_STATUS as P_KEY_PAY_STAT, KEY_ACTIVE_STEP as P_KEY_ACTIVE_STEP, MAX_STEP as P_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'
import { KEY_PAY_CONTRACT_STATUS as V_KEY_PAY_STAT, KEY_ACTIVE_STEP as V_KEY_ACTIVE_STEP, MAX_STEP as V_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesVta'

import { KEY_PAY_CONTRACT_STATUS as PAY_MULTIPLE, KEY_ACTIVE_STEP as ACTIVE_MULTIPLE, MAX_STEP as MAX_MULTIPLE } from '../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import { ACTION_UPDATE_PROPS_HOME as UPDATE_MULTIPLE } from '../../../redux/actions/insurance-app/buyInsuranceMultiple'

import * as motorReducer from '../../../redux/reducers/insurance-app/buyInsurancesMotor'
import * as motorsReducer from '../../../redux/reducers/insurance-app/buyInsurancesMotors'
import * as carsReducer from '../../../redux/reducers/insurance-app/buyInsurancesCars'
import * as healthCareReducer from '../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import * as travelReducer from '../../../redux/reducers/insurance-app/buyInsurancesTravel'
import * as travelDomesticReducer from '../../../redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import * as goodsDomesticReducer from '../../../redux/reducers/insurance-app/buyInsurancesGoods'
import * as antinReducer from '../../../redux/reducers/insurance-app/buyInsurancesAntin'
import * as heathcareAdvancedReducer from '../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'

import { ACTION_BUY_INSURANCES_CAR_UPDATE_SPECIFY_PROP as C_ACTION_UPDATE } from '../../../redux/actions/insurance-app/buyInsurancesCar'
import { ACTION_FAMILY_SAFETY_UPDATE_SPECIFY_PROP as F_ACTION_UPDATE } from '../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { ACTION_UPDATE_PROPS as P_ACTION_UPDATE } from '../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import { ACTION_BUY_INSUR_VTA_UPDATE_PROPS as V_ACTION_UPDATE } from '../../../redux/actions/insurance-app/buyInsurancesVta'

const getKeyFrom = (PATH) => {
    switch (PATH) {
        case PATH_BUY_HOME_PERSONAL_MULTIPLE:
            return {
                keyPayContractStatus: PAY_MULTIPLE,
                keyUpdateProp: UPDATE_MULTIPLE,
                keyActiveStep: ACTIVE_MULTIPLE,
                maxStepVal: MAX_MULTIPLE
            }
        case PATH_BUY_INSURANCES_HEALTH_CARE:
            return {
                keyPayContractStatus: healthCareReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: healthCareReducer.ACTION_BUY_INSUR_HEALTH_UPDATE_PROPS,
                keyActiveStep: healthCareReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: healthCareReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_TRAVEL:
            return {
                keyPayContractStatus: travelReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: travelReducer.ACTION_BUY_INSUR_TRAVEL_UPDATE_PROPS,
                keyActiveStep: travelReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: travelReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_MOTORS:
            return {
                keyPayContractStatus: motorsReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: motorsReducer.ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS,
                keyActiveStep: motorsReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: motorsReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_MOTOR:
            return {
                keyPayContractStatus: motorReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: motorReducer.ACTION_BUY_INSUR_MOTOR_UPDATE_PROPS,
                keyActiveStep: motorReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: motorReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_CAR:
            return {
                keyPayContractStatus: C_KEY_PAY_STAT,
                keyUpdateProp: C_ACTION_UPDATE,
                keyActiveStep: C_KEY_ACTIVE_STEP,
                maxStepVal: C_MAX_STEP
            }
        case PATH_BUY_INSURANCES_CARS:
            return {
                keyPayContractStatus: carsReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: carsReducer.ACTION_BUY_INSUR_CARS_UPDATE_PROPS,
                keyActiveStep: carsReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: carsReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_FAMILY_SAFETY:
            return {
                keyPayContractStatus: F_KEY_PAY_STAT,
                keyUpdateProp: F_ACTION_UPDATE,
                keyActiveStep: F_KEY_ACTIVE_STEP,
                maxStepVal: F_MAX_STEP
            }
        case PATH_BUY_INSURANCES_PERSONAL_HOME:
            return {
                keyPayContractStatus: P_KEY_PAY_STAT,
                keyUpdateProp: P_ACTION_UPDATE,
                keyActiveStep: P_KEY_ACTIVE_STEP,
                maxStepVal: P_MAX_STEP
            }
        case PATH_BUY_INSURANCES_VTA:
            return {
                keyPayContractStatus: V_KEY_PAY_STAT,
                keyUpdateProp: V_ACTION_UPDATE,
                keyActiveStep: V_KEY_ACTIVE_STEP,
                maxStepVal: V_MAX_STEP
            }
        case PATH_BUY_INSURANCES_CAR_SIMPLIFY:
            return {
            keyPayContractStatus: C_KEY_PAY_STAT,
            keyUpdateProp: C_ACTION_UPDATE,
            keyActiveStep: C_KEY_ACTIVE_STEP,
            maxStepVal: C_SIMPLIFY_MAX_STEP
            }
        case PATH_BUY_INSURANCES_TRAVEL_DOMESTIC:
            return {
                keyPayContractStatus: travelDomesticReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: travelDomesticReducer.ACTION_BUY_INSUR_TRAVEL_DOMESTIC_UPDATE_PROPS,
                keyActiveStep: travelDomesticReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: travelDomesticReducer.MAX_STEP
            }
        case PATH_BUY_INSURANCES_GOODS:
            return {
                keyPayContractStatus: goodsDomesticReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: goodsDomesticReducer.ACTION_BUY_INSUR_GOODS_UPDATE_PROPS,
                keyActiveStep: goodsDomesticReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: goodsDomesticReducer.MAX_STEP
                }
        case PATH_AN_IN_INSUR:
            return {
                keyPayContractStatus: antinReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: antinReducer.ACTION_BUY_INSUR_AN_TIN_UPDATE_PROPS,
                keyActiveStep: antinReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: antinReducer.MAX_STEP
                }
        case PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED:
            return {
                keyPayContractStatus: heathcareAdvancedReducer.BASE.KEY_PAY_CONTRACT_STATUS,
                keyUpdateProp: heathcareAdvancedReducer.ACTION_BUY_INSUR_HEALTH_ADVANCED_UPDATE_PROPS,
                keyActiveStep: heathcareAdvancedReducer.BASE.KEY_ACTIVE_STEP,
                maxStepVal: heathcareAdvancedReducer.MAX_STEP
                }
        default:
            return {
                keyPayContractStatus: F_KEY_PAY_STAT,
                keyUpdateProp: F_ACTION_UPDATE,
                keyActiveStep: F_KEY_ACTIVE_STEP,
                maxStepVal: F_MAX_STEP
            }
    }
}

export const handleConfirm = (RspCode, history, dispatch, PATH) => {
    switch (RspCode) {
        case "00":
            /* COMPLETE */
            dispatch({
                type: getKeyFrom(PATH).keyUpdateProp,
                payload: [
                    {
                        prop: getKeyFrom(PATH).keyPayContractStatus,
                        value: PAID_SUCCESS
                    },
                    {
                        prop: getKeyFrom(PATH).keyActiveStep,
                        value: getKeyFrom(PATH).maxStepVal
                    },
                ]
            })
            history.push(addAppContextPath(PATH))
            break
        case "24":
            /* USER CLICK BACK - DOING NOTHING */
            dispatch({
                type: getKeyFrom(PATH).keyUpdateProp,
                payload: [
                    {
                        prop: getKeyFrom(PATH).keyPayContractStatus,
                        value: PAID_FAIL
                    },
                    {
                        prop: getKeyFrom(PATH).keyActiveStep,
                        value: getKeyFrom(PATH).maxStepVal - 1
                    },
                ]
            })
            history.push(addAppContextPath(PATH))
            break
        case "9999":
            /* COMPLETE_TIMEOUT */
            dispatch({
                type: getKeyFrom(PATH).keyUpdateProp,
                payload: [
                    {
                        prop: getKeyFrom(PATH).keyPayContractStatus,
                        value: PAID_FAIL
                    },
                    {
                        prop: getKeyFrom(PATH).keyActiveStep,
                        value: getKeyFrom(PATH).maxStepVal
                    },
                ]
            })
            history.push(addAppContextPath(PATH))
            break
        default:
            /* COMPLETE_FAIL */
            dispatch({
                type: getKeyFrom(PATH).keyUpdateProp,
                payload: [
                    {
                        prop: getKeyFrom(PATH).keyPayContractStatus,
                        value: PAID_FAIL
                    },
                    {
                        prop: getKeyFrom(PATH).keyActiveStep,
                        value: getKeyFrom(PATH).maxStepVal
                    },
                ]
            })
            history.push(addAppContextPath(PATH))
            break
    }
}

export const divStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%'
}

export const showAlert = (titleId, contentId, isHaveClose) => {
    return (
        <Modal
            isOpen={true}
            className="modal-dialog-centered"
        >
            <ModalHeader >
                <FormattedMessage id={titleId} />
            </ModalHeader>
            <ModalBody>
                <div className={divStyle}>
                    <div className="background-container d-flex align-items-center p-3">
                        <Spinner color='primary' className="mr-1" />
                        <div>Đang xử lý...</div>
                    </div >
                </div>
            </ModalBody>
        </Modal>
    )
}
