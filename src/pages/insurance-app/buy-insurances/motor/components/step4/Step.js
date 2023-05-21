import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_COUPON_CODE, validate, validationSchema } from './formikConfig'
import { REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { backStep, updateProps, pay } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { getDefault_bonusInfoObj, getDefault_debtInfoObj, getDefault_payInfoObj } from './utility'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { handleBonus, handleDebt, hasRequestFail } from '../../../../../../ultity'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { KEY_DEBT_ACCOUNT_INFO } from '../../../../../../redux/reducers/insurance-app/appConfig'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import { BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [BASE.KEY_COMPANY_ID]: companyId,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_PAYMENT_TYPE]: paymentType,
        [BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
        [BASE.KEY_TOTAL_FEE]: totalFee
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo,
    } = useSelector(state => state.app[NAME_APP_CONFIG])

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const _pay = (values) => {
        dispatch(pay(contractId, getDefault_payInfoObj(paymentType, values)))
    }

    const _debt = () => {
        handleDebt(
            totalFee, debtAccountInfo,
            () => {
                dispatch(pay(contractId, getDefault_debtInfoObj()))
            },
            () => {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />)
            }
        )
    }

    const _bonus = () => {
        handleBonus(
            totalFee,
            () => {
                dispatch(pay(contractId, getDefault_bonusInfoObj()))
            },
            () => {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.dontHaveEnoughBonusPoint`)} />)
            }
        ).then()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: _pay,
    })

    const toggleAgreeCallback = () => {
        if (agreedTermOfServicesStatus) {
            dispatch(updateProps([
                {
                    prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: false
                }
            ]))
            return
        }
        dispatch(updateProps([
            {
                prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                value: true
            }
        ]))
    }

    return (
        <FormikProvider value={formik}>
            <StepBase>
                <CardBody>
                    <PaymentType
                        paymentType={paymentType}
                        keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                        callbacks={{
                            radioChange: async (e) => {
                                const val = e.target.value
                                dispatch(updateProps([
                                    {
                                        prop: BASE.KEY_PAYMENT_TYPE,
                                        value: val
                                    }
                                ]))
                                const res = await Service.getContractInfo(contractId)
                                if (hasRequestFail(res.status)) return

                                dispatch(updateProps([
                                    {
                                        prop: BASE.KEY_CONTRACT_INFO,
                                        value: res.data
                                    }
                                ]))
                            }
                        }}
                    />
                </CardBody>
            </StepBase>

            <StepBase >
                <CardBody>
                    <StepForm
                        paymentType={paymentType}
                        dispatch={dispatch}
                        contractInfo={contractInfo}
                        companyId={companyId}
                        toggleAgree={{
                            agreedTermOfServicesStatus,
                            toggleAgreeCallback
                        }}
                    />
                </CardBody>
            </StepBase>

            {
                render(
                    agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
                    <BankTransferInfo
                        contractCode={contractInfo.contractCode}
                        totalFeeInclVAT={contractInfo['discountValue'] !== null ?  Number(totalFee - contractInfo['discountValue']) : totalFee}
                        getBankTransferInfo={Service.gettAllBanks}
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        handleSubmitClick={formik.handleSubmit}
                        enableValidateOnChange={enableValidateOnChange}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={backStep.bind(null, activeStep)}
                        handlePayDebtClick={_debt}
                        handlePayBonusClick={_bonus}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider>
    )
}

export default Step