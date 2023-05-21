import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { BaseAppConfigs, BaseAppUltils } from 'base-app'
import { initialValues, validate, validationSchema } from './formikConfig'
import { REDUX_STATE_NAME } from '../stepsManager'
import StepForm from './StepForm'
import {
    KEY_ACTIVE_STEP, KEY_AGREED_TERM_OF_SERVICES_STATUS, KEY_COMPANY_ID, KEY_CONTRACT_CODE, KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_DATA_FEES,
    KEY_PAYMENT_TYPE, KEY_STEP_1, KEY_STEP_2, MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesVta'
import FooterView from '../../views/FooterView'
import { backStep, pay, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesVta'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import {
    KEY_TOTAL_FEE,
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer/BankTransferInfo'
import { getTotalFeeVAT, handleBonus, handleDebt } from '../../../../../../ultity'
import Service from '../../../../../../services/insurance-app/appConfig'
import { FormattedMessage } from 'react-intl'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import { KEY_DEBT_ACCOUNT_INFO, KEY_IS_LOADING } from '../../../../../../redux/reducers/insurance-app/appConfig'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep, [KEY_TOTAL_FEE]: totalFee,
        [KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus, [KEY_PAYMENT_TYPE]: paymentType,
        [KEY_CONTRACT_INFO]: contractInfo, [KEY_DATA_FEES]: dataFees, [KEY_CONTRACT_CODE]: contractCode,
        [KEY_COMPANY_ID]: companyId, [KEY_STEP_2]: step_2, [KEY_STEP_1]: step_1
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const { [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo, [KEY_IS_LOADING]: isLoading } = useSelector(state => state["app"][NAME_APP_CONFIG])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }
    
    const toggleAgreeCallback = () => {
        if (agreedTermOfServicesStatus) {
            dispatch(updateProps([
                {
                    prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: false,
                }
            ]))
            return
        }
        dispatch(updateProps([
            {
                prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
                value: true,
            }
        ]))
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
                dispatch(pay(contractId, PAYMENT_TYPE_DEBT))
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
                dispatch(pay(contractId, PAYMENT_TYPE_BONUS))
            },
            () => {
                BaseAppConfigs.toastError(<FormattedMessage id={getKeyLang(`alert.dontHaveEnoughBonusPoint`)} />)
            }
        ).then()
    }

    const _pay = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        dispatch(pay(contractId, paymentType))
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
        <>
            <StepBase >
                <CardBody>
                    <FormikProvider value={formik}>
                        <StepForm
                            formik={formik}
                            stepInfo={{
                                dataFees, toggleAgreeCallback, agreedTermOfServicesStatus,
                                contractInfo, paymentType, contractId, contractCode, companyId,
                                step_2, step_1
                            }}
                        />
                    </FormikProvider>
                </CardBody>
            </StepBase>

            {
                render(agreedTermOfServicesStatus, PAYMENT_TYPE_FUND_TRANSFER, paymentType,
                    <BankTransferInfo
                        totalFeeInclVAT={getTotalFeeVAT(dataFees, paymentType)}
                        contractCode={contractCode}
                        getBankTransferInfo={Service.getBankTransferInfo}
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        handleSubmitClick={formik.handleSubmit}
                        handlePayDebtClick={debt}
                        handlePayBonusClick={bonus}
                        enableValidateOnChange={enableValidateOnChange}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={backStep.bind(null, activeStep)}
                    />
                </CardFooter>
            </StepBase>
        </>

    )
}

export default Step