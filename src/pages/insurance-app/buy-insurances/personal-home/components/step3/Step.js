import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { BaseAppUltils, FormattedMessage } from 'base-app'
import { useFormik, FormikProvider } from 'formik'
import { initialValues } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import {
    backStep,
    debtContract,
    payContract,
    updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import StepForm from './StepForm'
import {
    KEY_ACTIVE_STEP, KEY_AGREED_TERM_OF_SERVICES_STATUS,
    KEY_COMPANY_ID, KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_DATA_FEES, KEY_HAS_CAL_FEE_DONE, KEY_PAYMENT_TYPE,
    KEY_TOTAL_FEE, MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'
import { getContractInfo } from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import BankTranferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import {
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getDataFee, handleBonus, handleDebt } from '../../../../../../ultity'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import FooterView from '../../views/FooterView'
import { KEY_DEBT_ACCOUNT_INFO, KEY_IS_LOADING } from '../../../../../../redux/reducers/insurance-app/appConfig'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { KEY_COUPON_CODE } from '../step2/formikConfig'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
const Step3 = () => {
    const dispatch = useDispatch()
    const {
        [KEY_COMPANY_ID]: companyId,
        [KEY_ACTIVE_STEP]: activeStep,
        [KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
        [KEY_CONTRACT_ID]: contractId,
        [KEY_CONTRACT_INFO]: contractInfo,
        [KEY_DATA_FEES]: dataFees,
        [KEY_PAYMENT_TYPE]: paymentType,
        [KEY_TOTAL_FEE]: totalFee
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const {
        [KEY_IS_LOADING]: isLoading,
        [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo
    } = useSelector(state => state.app[NAME_APP_CONFIG])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }
    const pay = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        dispatch(
            payContract(contractId, paymentType, companyId)
        )
    }

    const debt = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        if (isLoading || !totalFee) {
            return
        }

        handleDebt(
            totalFee, debtAccountInfo,
            () => {
                dispatch(
                    payContract(contractId, PAYMENT_TYPE_DEBT, companyId)
                )
            },
            () => {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />)
            }
        )

    }

    const bonus = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        if (isLoading || !totalFee) {
            return
        }

        handleBonus(
          totalFee,
          () => {
              dispatch(
                payContract(contractId, PAYMENT_TYPE_BONUS, companyId)
              )
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
        onSubmit: pay
    })
    const disableContinueBtn = () => {
        dispatch(
            updateProps([
                {
                    prop: KEY_HAS_CAL_FEE_DONE,
                    value: false
                }
            ])
        )
    }
    const toggleAgreeCallback = () => {
        if (agreedTermOfServicesStatus) {
            dispatch(
                updateProps([
                    {
                        prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
                        value: false
                    }
                ])
            )
            return
        }
        dispatch(
            updateProps([
                {
                    prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: true
                }
            ])
        )
    }

    useEffect(() => {
        dispatch(getContractInfo(contractId, companyId))
    }, [])

    return (
        <FormikProvider value={formik}>
            <StepBase>
            <CardBody>
                <PaymentType
                paymentType={paymentType}
                isHideIcon={true}
                // touched={touched} errors={errors}
                keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                callbacks={{
                    radioChange: (e) => {
                        disableContinueBtn && disableContinueBtn()
                        dispatch(
                            updateProps([
                                {
                                    prop: KEY_PAYMENT_TYPE,
                                    value: e.target.value
                                }
                            ])
                        )
                    }
                }}/>
                </CardBody>
            </StepBase>
            <StepBase>
                <CardBody>
                    <StepForm
                        toggleAgree={{
                            agreedTermOfServicesStatus,
                            toggleAgreeCallback
                        }}
                        stepInfo={{ contractInfo, paymentType }}
                        dataFee={getDataFee(dataFees, companyId)}
                    />
                </CardBody>
            </StepBase>
            {
                render(agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
                    <BankTranferInfo
                        contractCode={contractInfo.contractCode} totalFeeInclVAT={totalFee}
                        getBankTransferInfo={Service.getBankTransferInfo}
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        handleSubmitClick={formik.handleSubmit}
                        enableValidateOnChange={enableValidateOnChange}
                        handlePayDebtClick={debt}
                        handlePayBonusClick={bonus}
                        backStep={backStep.bind(null, activeStep)}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider>
    )
}

export default Step3
