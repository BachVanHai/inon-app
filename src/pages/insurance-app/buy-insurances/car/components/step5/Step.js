import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import {
    debtContract, getConstractInfo, payContract, updateSpecificProp, backStep, updateProps, bonusContract
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_COUPON_CODE, validationSchema } from './formikConfig'
import Contract from './form-components/Contract'
import { BaseAppUltils } from 'base-app'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import { FormattedMessage } from 'react-intl'
import { getDefault_debtObj } from './utility'
import {
    KEY_COMPANY_ID, KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_DEBT_ACCOUNT_INFO,
    KEY_ACTIVE_STEP, KEY_TOTAL_FEE, MAX_STEP, KEY_PAYMENT_TYPE, KEY_AGREED_TERM_OF_SERVICES_STATUS, KEY_IS_LOADING, KEY_STEP_2
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import BankTransferInfo from './form-components/BankTransferInfo'
import FooterView from '../../views/FooterView'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { handleBonus, handleDebt } from '../../../../../../ultity'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { KEY_TOGGLE_BBTNDS, KEY_TOGGLE_VC } from '../step2/formikConfig'
import { getDefault_bonusInfoObj } from '../../../motor/components/step4/utility'

const Step5 = () => {
    const dispatch = useDispatch()
    const { [KEY_TOTAL_FEE]: totalFee,
        [KEY_COMPANY_ID]: companyId, [KEY_CONTRACT_INFO]: contractInfo, [KEY_CONTRACT_ID]: contractId,
        [KEY_ACTIVE_STEP]: activeStep, [KEY_PAYMENT_TYPE]: paymentType, [KEY_STEP_2]: step_2,
        [KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
    } = useSelector(state => state.app[REDUX_STATE_NAME])

    const {
        [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo,
        [KEY_IS_LOADING]: isLoading
    } = useSelector(state => state.app[NAME_APP_CONFIG])

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const toggleAgreeCallback = () => {
        if (agreedTermOfServicesStatus) {
            dispatch(
                updateSpecificProp(KEY_AGREED_TERM_OF_SERVICES_STATUS, false)
            )
            return
        }
        dispatch(
            updateSpecificProp(KEY_AGREED_TERM_OF_SERVICES_STATUS, true)
        )
    }

    const debt = () => {
        if (isLoading || !totalFee) return

        handleDebt(
            totalFee, debtAccountInfo,
            () => {
                dispatch(
                    debtContract(
                        contractId,
                        getDefault_debtObj()
                    )
                )
            },
            () => BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />)
        )
    }

    const bonus = () => {
        if (isLoading || !totalFee) return

        handleBonus(
          totalFee,
          () => {
              dispatch(
                bonusContract(
                  contractId,
                  getDefault_bonusInfoObj()
                )
              )
          },
          () => BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.dontHaveEnoughBonusPoint`)} />)
        ).then()

    }

    const pay = () => {
        if (isLoading) return
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }

        const toggleprintedCert = null                      // for now, its just a dumbmy value that doesn't serve any purpose, may change in the future
        const { certNo, printedCertType } = contractInfo
        dispatch(
            payContract(
                contractId,
                {
                    certNo: toggleprintedCert && printedCertType === 'DIRECT' ? certNo : '',
                    paymentType: paymentType,
                    printedCertType: toggleprintedCert ? printedCertType : 'NONE',
                    companyId: companyId
                },
            )
        )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        onSubmit: pay,
    })

    const _backStep = () => {
        if (step_2[KEY_TOGGLE_BBTNDS] && !step_2[KEY_TOGGLE_VC]) {
            return updateSpecificProp(KEY_ACTIVE_STEP, 3)
        }
        return backStep(activeStep)
    }

    useEffect(() => {
        dispatch(getConstractInfo(contractId))
    }, [paymentType])

    return (
        <>
            <StepBase titleMsg={getStepComponent(activeStep).title}>
                <FormikProvider value={formik}>
                    <CardBody>
                        <PaymentType
                            paymentType={paymentType}
                            touched={formik.touched} errors={formik.errors}
                            keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                            callbacks={{
                                radioChange: (e) => {
                                    dispatch(
                                        updateProps([
                                            {
                                                prop: KEY_PAYMENT_TYPE,
                                                value: e.target.value
                                            }
                                        ])
                                    )
                                }
                            }}
                        />

                    </CardBody>
                </FormikProvider>
            </StepBase>

            <StepBase>
                <CardBody>
                    <Contract
                        formik={formik} stepInfo={{ contractInfo, paymentType }}
                        agreedTermOfServicesStatus={agreedTermOfServicesStatus}
                        toggleAgreeCallback={toggleAgreeCallback}
                        dispatch={dispatch}
                        companyId={companyId}
                    />
                </CardBody>
            </StepBase>

            {
                render(
                    agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
                    <BankTransferInfo
                        contractCode={contractInfo.contractCode}
                        totalFeeInclVAT={contractInfo['discountValue'] !== null ?  Number(totalFee - contractInfo['discountValue']) : totalFee}
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        handlePayDebtClick={debt}
                        handlePayBonusClick={bonus}
                        handleSubmitClick={formik.handleSubmit}
                        enableValidateOnChange={enableValidateOnChange}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={_backStep}
                    />
                </CardFooter>
            </StepBase>
        </>

    )
}

export default Step5