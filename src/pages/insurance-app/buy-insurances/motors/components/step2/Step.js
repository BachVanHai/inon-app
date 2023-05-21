import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_COUPON_CODE, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import ContracttInfo from './ContracttInfo'
import { useDispatch, useSelector } from 'react-redux'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotors'
import { BASE, KEY_CONTRACT_GROUP_ID, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotors'
import PaymentMethod from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import { PAYMENT_TYPE_DEBT, PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer/BankTransferInfo'
import Contracts from './components/Contracts'
import { getDefault_updateContractForPaymentType, payApi, updateContract } from './utility'
import { ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotors'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [BASE.KEY_TOTAL_FEE]: totalFee,
        [BASE.KEY_COMPANY_ID]: companyId,
        [BASE.KEY_PAYMENT_TYPE]: paymentType,
        [BASE.KEY_CONTRACT_INFO]: contracttInfo,
        [KEY_CONTRACT_GROUP_ID]: contractGroupId,
        [BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
    } = useSelector(state => state.app[REDUX_STATE_NAME])

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const back = () => {
        return (dispatch) => {
            dispatch(updateProps([
                {
                    prop: BASE.KEY_ACTIVE_STEP,
                    value: 1
                }
            ]))
        }
    }

    const _debt = () => {
        dispatch(
            updateContract(
                getDefault_updateContractForPaymentType(contracttInfo, PAYMENT_TYPE_DEBT),
                () => {
                    dispatch(
                        pay(null, null,
                            {
                                MAX_STEP: MAX_STEP,
                                KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
                                KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS,
                                ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS,
                            }, payApi, null,
                            {
                                "contractGroupId": contractGroupId,
                                "transactionCode": contractGroupId,
                                "amount": `${totalFee}`,
                                "paymentType": PAYMENT_TYPE_DEBT
                            },
                        )
                    )
                }
            )
        )
    }

    const _pay = () => {
        dispatch(
            updateContract(
                getDefault_updateContractForPaymentType(contracttInfo, paymentType),
                () => {
                    dispatch(
                        pay(null, null,
                            {
                                MAX_STEP: MAX_STEP,
                                KEY_ACTIVE_STEP: BASE.KEY_ACTIVE_STEP,
                                KEY_PAY_CONTRACT_STATUS: BASE.KEY_PAY_CONTRACT_STATUS,
                                ACTION_UPDATE_PROPS: ACTION_BUY_INSUR_MOTORS_UPDATE_PROPS,
                            }, payApi, null,
                            {
                                "contractGroupId": contractGroupId,
                                "transactionCode": contractGroupId,
                                "amount": `${totalFee}`,
                                "paymentType": paymentType
                            },
                        )
                    )
                }
            )
        )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: _pay,
    })

    return (
        <FormikProvider value={formik}>
            <StepBase titleMsg={getStepComponent(2).title}>
                <CardBody>
                    <ContracttInfo
                        companyId={companyId}
                        dispatch={dispatch}
                        contracttInfo={contracttInfo}
                        contractGroupId={contractGroupId}
                    />
                </CardBody>
            </StepBase>

            <StepBase>
                <CardBody>
                    <PaymentMethod
                        paymentType={paymentType}
                        isHideIcon={true}
                        keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                        callbacks={{
                            radioChange: async (e) => {
                                const _paymentType = e.target.value
                                dispatch(updateProps([
                                    {
                                        prop: BASE.KEY_PAYMENT_TYPE,
                                        value: _paymentType
                                    }
                                ]))

                                dispatch(
                                    updateContract(
                                        getDefault_updateContractForPaymentType(contracttInfo, _paymentType)
                                    )
                                )
                            }
                        }}
                    />
                </CardBody>
            </StepBase>

            <StepBase>
                <CardBody>
                    <Contracts
                        dispatch={dispatch}
                        paymentType={paymentType}
                        contracttInfo={contracttInfo}
                        agreedTermOfServicesStatus={agreedTermOfServicesStatus}
                    />
                </CardBody>
            </StepBase>


            {
                render(
                    agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
                    <BankTransferInfo
                        contractCode={contractGroupId}
                        totalFeeInclVAT={totalFee}
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        backStep={back}
                        handlePayDebtClick={_debt}
                        handleSubmitClick={formik.handleSubmit}
                        enableValidateOnChange={enableValidateOnChange}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider>
    )
}

export default Step