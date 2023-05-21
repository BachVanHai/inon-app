import { BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { PAYMENT_TYPE_DEBT, PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer/BankTransferInfo'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { backStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import Service from '../../../../../../services/insurance-app/appConfig'
import FooterView from '../../views/FooterView'
import { REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { payContract } from './utility'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [KEY_STEP_2]: step_2,
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_TOTAL_FEE]: totalFee,
        [BASE.KEY_DATA_FEES]: dataFees,
        [BASE.KEY_COMPANY_ID]: companyId,
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_PAYMENT_TYPE]: paymentType,
        [KEY_INSURANCE_INFO]: insuranceInfo,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [BASE.KEY_CONTRACT_CODE]: contractCode,
        [BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const toggleAgreeCallback = () => {
        if (agreedTermOfServicesStatus) {
            dispatch(updateProps([
                {
                    prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: false,
                }
            ]))
            return
        }
        dispatch(updateProps([
            {
                prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                value: true,
            }
        ]))
    }

    const debt = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        if (!totalFee) {
            return
        }

        dispatch(
            payContract(contractId, PAYMENT_TYPE_DEBT, totalFee, contractInfo)
        )
    }

    const bonus = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        if (!totalFee) {
            return
        }


    }

    const _pay = () => {
        if (!agreedTermOfServicesStatus) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        dispatch(
            payContract(contractId, paymentType, totalFee, contractInfo)
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
        <>
            <StepBase >
                <CardBody>
                    <FormikProvider value={formik}>
                        <StepForm
                            formik={formik}
                            stepInfo={{
                                dataFees, toggleAgreeCallback, agreedTermOfServicesStatus,
                                contractInfo, paymentType, contractId, contractCode, companyId,
                                step_1, step_2, insuranceInfo
                            }}
                        />
                    </FormikProvider>
                </CardBody>
            </StepBase>

            {
                render(agreedTermOfServicesStatus, PAYMENT_TYPE_FUND_TRANSFER, paymentType,
                    <BankTransferInfo
                        totalFeeInclVAT={totalFee}
                        getBankTransferInfo={Service.getBankTransferInfo}
                        contractCode={contractCode}
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