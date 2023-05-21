import React from 'react'
import { FormattedMessage } from 'base-app'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
    getKeyLang, NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_FAMILY_SAFETY,
    NAME_BUY_INSURANCES_PERSONAL_HOME, NAME_APP_CONFIG, NAME_BUY_INSURANCES_VTA,
    NAME_BUY_INSURANCES_MOTOR, NAME_BUY_INSURANCE_MOTORS, NAME_BUY_INSURANCES_CARS, NAME_BUY_INSURANCES_MULTIPLE_HOME, NAME_BUY_INSURANCES_HEALTH_CARE, NAME_BUY_INSURANCES_TRAVEL, NAME_BUY_INSURANCES_ANTIN
} from '../../../../configs/insurance-app'
import * as motorAction from '../../../../redux/actions/insurance-app/buyInsurancesMotor'
import * as motorsAction from '../../../../redux/actions/insurance-app/buyInsurancesMotors'
import * as carAction from '../../../../redux/actions/insurance-app/buyInsurancesCar'
import * as carsAction from '../../../../redux/actions/insurance-app/buyInsurancesCars'
import * as familyAction from '../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import * as homeAction from '../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import * as vtaAction from '../../../../redux/actions/insurance-app/buyInsurancesVta'
import * as homePersonalMultiple from '../../../../redux/actions/insurance-app/buyInsuranceMultiple'
import * as healthAction from '../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import * as travelAction from '../../../../redux/actions/insurance-app/buyInsurancesTravel'
import * as antinAction from '../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { PAYMENT_TYPE_BONUS, PAYMENT_TYPE_FUND_TRANSFER, PAYMENT_TYPE_QR_CODE } from '../formik-config'
import { backHome, getAction, NODE_ENV_TYPE_DEVELOPMENT } from '../../../../ultity'

const StyledButton = styled(Button)`
    margin-bottom: .5rem;
`
/**
 * @example
    const beforePayClickInvoke = () => {
        const errors = formik.errors
        if (!isObjEmpty(errors)) {
            if (errors[KEY_EMAIL] || errors[KEY_PHONE_NUMBER]) {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
            }
            return true // return true if you want to cancel submit action (note that: if errors has props, the submit action will not invoke anyway)
        }
        return false // return false, everything will work normal as expect
    }

     const submit = (values) => {
        const completedAction = () => {
            switch (completedActionType) {
                case ACTION_BUY_NEW:
                    dispatch(resetState())
                    break
                case ACTION_GO_HOME:
                    backHome()
                    break
            }
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
    } 

   const goHome = () => {
        dispatch(
            updateProps([
                {
                    prop: KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: ACTION_GO_HOME
                }
            ])
        )
        enableValidateOnChange()
        formik.handleSubmit()
    }

    const newContract = () => {
        dispatch(
            updateProps([
                {
                    prop: KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: ACTION_BUY_NEW
                }
            ])
        )
        enableValidateOnChange()
        formik.handleSubmit()
    }
 * return
       <Footer
            constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
            backStep={backStep.bind(null, activeStep)}
            beforeSubmitClicked={beforeSubmitClicked} // can omitted
            handleSubmitClick={handleSubmitClick}
            handlePayDebtClick={handlePayDebtClick}
            enableValidateOnChange={enableValidateOnChange}
            handleGoHome={handleGoHome}             // can omitted when activeStep < MAX_STEP
            handleNewContract={handleNewContract}   // can omitted when activeStep < MAX_STEP
       />
 */
const FooterView = ({ constantVals = { MAX_STEP: 5, REDUX_STATE_NAME: "stateName" }, beforeSubmitClicked,
    handleSubmitClick, backStep, handlePayDebtClick, handlePayBonusClick, enableValidateOnChange, handleGoHome, handleNewContract }) => {
    let doNeedSuperNextBtn = false
    if (process.env.NODE_ENV === NODE_ENV_TYPE_DEVELOPMENT) {
        doNeedSuperNextBtn = true /* only need for bypassing validates purpose  */
    }

    const { MAX_STEP, REDUX_STATE_NAME } = constantVals
    const app = useSelector(state => state.app)
    const { activeStep, paymentType, agreedTermOfServicesStatus } = app[REDUX_STATE_NAME]
    const { debtAccountInfo } = app[NAME_APP_CONFIG]
    const { dailyLimit } = debtAccountInfo
    const isDebtAccount = dailyLimit ? true : false
    const dispatch = useDispatch()

    const handleGoHomeClick = () => {
        if (handleGoHome) {
            handleGoHome()
            return
        }
        backHome()
    }

    const handleNewContractClick = () => {
        if (handleNewContract) {
            handleNewContract()
            return
        }
        console.log(REDUX_STATE_NAME);
        dispatch(getAction(REDUX_STATE_NAME)?.resetState())
    }

    const handleNextClick = () => {
        enableValidateOnChange && enableValidateOnChange()
        const _shouldStop = beforeSubmitClicked && beforeSubmitClicked()
        if (_shouldStop) return

        handleSubmitClick && handleSubmitClick()
    }

    const handlePaid = () => {
        enableValidateOnChange && enableValidateOnChange()
        const _shouldStop = beforeSubmitClicked && beforeSubmitClicked()
        if (_shouldStop) return

        handleSubmitClick && handleSubmitClick()
    }

    const handleDebt = () => {
        enableValidateOnChange && enableValidateOnChange()
        const _shouldStop = beforeSubmitClicked && beforeSubmitClicked()
        if (_shouldStop) return

        handlePayDebtClick && handlePayDebtClick()
    }

    const handleBonus = () => {
        enableValidateOnChange && enableValidateOnChange()
        const _shouldStop = beforeSubmitClicked && beforeSubmitClicked()
        if (_shouldStop) return

        handlePayBonusClick && handlePayBonusClick()
    }

    const handleBackClick = () => {
        backStep && dispatch(backStep())
    }

    const handleSuperNext = () => {
        const superNext = (action) => {
            if (activeStep === MAX_STEP) {
                dispatch(action.backStep(activeStep))
                return
            }
            dispatch(action.nextStep(activeStep))
        }
        switch (REDUX_STATE_NAME) {
            case NAME_BUY_INSURANCES_MOTOR:
                superNext(motorAction)
                break
            case NAME_BUY_INSURANCE_MOTORS:
                superNext(motorsAction)
                break
            case NAME_BUY_INSURANCES_CAR:
                superNext(carAction)
                break
            case NAME_BUY_INSURANCES_CARS:
                superNext(carsAction)
                break
            case NAME_BUY_INSURANCES_FAMILY_SAFETY:
                superNext(familyAction)
                break
            case NAME_BUY_INSURANCES_PERSONAL_HOME:
                superNext(homeAction)
                break
            case NAME_BUY_INSURANCES_VTA:
                superNext(vtaAction)
                break
            case NAME_BUY_INSURANCES_MULTIPLE_HOME:
                superNext(homePersonalMultiple)
            case NAME_BUY_INSURANCES_HEALTH_CARE:
                superNext(healthAction)
                case NAME_BUY_INSURANCES_TRAVEL:
                superNext(travelAction)
            case NAME_BUY_INSURANCES_ANTIN:
                superNext(antinAction)
            default:
                break
        }
    }

    const renderButtons = (activeStep) => {
        switch (activeStep) {
            case 1:
                return (
                    <>
                        <StyledButton color='primary' disabled={false} className='' onClick={handleNextClick}>
                            <FormattedMessage id={getKeyLang(`Next`)} />
                        </StyledButton>
                    </>
                )
            case MAX_STEP - 1:
                if (!agreedTermOfServicesStatus) {
                    return (
                        <StyledButton color='secondary' disabled={false} className='ml-2 mr-2' onClick={handleBackClick}>
                            <FormattedMessage id={(`common.back`)} />
                        </StyledButton>
                    )
                }
                if (paymentType === PAYMENT_TYPE_FUND_TRANSFER || paymentType === PAYMENT_TYPE_BONUS) {
                    return (
                        <>
                            <StyledButton color='secondary' disabled={false} className='ml-2 mr-2' onClick={handleBackClick}>
                                <FormattedMessage id={(`common.back`)} />
                            </StyledButton>
                            {
                                isDebtAccount && paymentType === PAYMENT_TYPE_FUND_TRANSFER &&
                                <StyledButton color='primary' onClick={handleDebt}>
                                    <FormattedMessage id={getKeyLang(`Debt`)} />
                                </StyledButton>
                            }
                            {
                                paymentType === PAYMENT_TYPE_BONUS &&
                                <StyledButton color='primary' onClick={handleBonus}>
                                    <FormattedMessage id={getKeyLang(`Bonus`)} />
                                </StyledButton>
                            }
                            <StyledButton color='primary' disabled={false} className='ml-2' onClick={handlePaid}>
                                <FormattedMessage id={getKeyLang(`paid`)} />
                            </StyledButton>
                        </>
                    )
                }

                return (
                    <>
                        <StyledButton color='secondary' disabled={false} className='ml-2 mr-2' onClick={handleBackClick}>
                            <FormattedMessage id={(`common.back`)} />
                        </StyledButton>
                        <StyledButton color='primary' disabled={false} className='ml-2' onClick={handlePaid}>
                            <FormattedMessage id={getKeyLang(`Payment`)} />
                        </StyledButton>
                    </>
                )
            case MAX_STEP:
                return (
                    <>
                        <StyledButton color='primary' disabled={false} className='' onClick={handleNewContractClick}>
                            <FormattedMessage id={getKeyLang(`BuyNew`)} />
                        </StyledButton>
                        <StyledButton color='primary' disabled={false} className='ml-2' onClick={handleGoHomeClick}>
                            <FormattedMessage id={(`common.home`)} />
                        </StyledButton>
                    </>
                )
            default:
                return (
                    <>
                        <StyledButton color='secondary' disabled={false} className='ml-2 mr-2' onClick={handleBackClick}>
                            <FormattedMessage id={(`common.back`)} />
                        </StyledButton>
                        <StyledButton color='primary' disabled={false} className='' onClick={handleNextClick}>
                            <FormattedMessage id={getKeyLang(`Next`)} />
                        </StyledButton>
                    </>
                )
        }
    }

    return (
        <div className="d-flex flex-wrap justify-content-end align-items-center">
            {
                renderButtons(activeStep)
            }
            {
                doNeedSuperNextBtn &&
                <StyledButton
                    color='primary' disabled={false} className='' outline
                    onClick={handleSuperNext}
                >
                    {
                        activeStep === MAX_STEP ?
                            <FormattedMessage id={(`common.back`)} />
                            :
                            <FormattedMessage id={getKeyLang(`Next`)} />
                    }
                </StyledButton>
            }
        </div>
    )
}

export default FooterView