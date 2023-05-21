import { BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../configs/insurance-app'
import { actionNextStep, ACTION_CONFIRM_PAYMENT } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { updateProps } from '../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2 } from '../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { payContract } from './utility'

const BestChoiseStep3 = () => {
    const dispatch = useDispatch()
    const [isAccepted, setIsAccepted] = useState(false)
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
    const { paymentMethod } = useSelector(
        (state) => state.app.buyInsurance
    )
    const toggleAgreeCallback = () => {
        if (isAccepted) {
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
    const _pay = () => {
        if (!isAccepted) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.termOfServices`)} />)
            return
        }
        if (paymentMethod === PAYMENT_TYPE_FUND_TRANSFER) {
            dispatch(actionNextStep())
            dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: 'SUCCESS' })
        } else {
            dispatch(
                payContract(contractId, paymentType, totalFee, contractInfo)
            )
        }

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
            <FormikProvider value={formik}>
                <StepForm
                    formik={formik}
                    stepInfo={{
                        dataFees, toggleAgreeCallback, agreedTermOfServicesStatus,
                        contractInfo, paymentType, contractId, contractCode, companyId,
                        step_1, step_2, insuranceInfo, totalFee
                    }}
                    handleSubmit={formik.handleSubmit}
                    isAccepted={isAccepted}
                    setIsAccepted={setIsAccepted}
                />
            </FormikProvider>


        </>

    )
}

export default BestChoiseStep3