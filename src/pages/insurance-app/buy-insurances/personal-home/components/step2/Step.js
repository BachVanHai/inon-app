import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { useIntl } from 'react-intl'
import { FormikProvider, useFormik } from 'formik'
import {
    initialValues, KEY_ASSESTS_HOME_LIMIT_COMPENSATED, KEY_FEE_RATE, KEY_MATERIAL_HOME_LIMIT_COMPENSATED,
    KEY_TOGGLE_ASSETS_HOME, KEY_TOGGLE_MATERIAL_HOME, validate, validationSchema
} from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { backStep, getFeeInsurance, nextStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import StepForm from './StepForm'
import { getDefault_updateInsuranceObj } from './utility'
import { KEY_ACTIVE_STEP, KEY_CONTRACT_ID, KEY_DATA_FEES, KEY_HAS_CAL_FEE_DONE, KEY_PAYMENT_TYPE, KEY_STEP_1, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'
import { BaseAppUltils } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import FooterView from '../../views/FooterView'
import { isObjEmpty } from '../../../../../../ultity'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step2 = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const {
        [KEY_DATA_FEES]: dataFees, [KEY_HAS_CAL_FEE_DONE]: hasCalFeeDone, [KEY_PAYMENT_TYPE]: paymentType,
        [KEY_STEP_2]: step_2, [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep,
        [KEY_STEP_1]: step_1
    } = useSelector(state => state.app[REDUX_STATE_NAME])

    const next = (values) => {
        if (!hasCalFeeDone) {
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`alert.needCalFee`) }))
            return
        }
        dispatch(nextStep(activeStep))
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_2,
                    value: values
                }
            ])
        )
    }
    
    const formik = useFormik({
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        initialValues: initialValues,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })

    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

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

    const handleCalculateFee = () => {
        const {
            [KEY_TOGGLE_MATERIAL_HOME]: toggleMaterial, [KEY_MATERIAL_HOME_LIMIT_COMPENSATED]: materialLimit,
            [KEY_ASSESTS_HOME_LIMIT_COMPENSATED]: assetsLimit, [KEY_TOGGLE_ASSETS_HOME]: toggleAssetsHOme,
        } = formik.values

        if (toggleMaterial && !materialLimit ||
            toggleAssetsHOme && !assetsLimit ||
            !isObjEmpty(formik.errors)
        ) {
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`alert.emptyLimitCompensated`) }))
            return
        }
        disableContinueBtn()
        dispatch(
            getFeeInsurance(
                contractId, getDefault_updateInsuranceObj({ ...formik.values, paymentType })
            )
        )
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        stepInfo={{ step_2, step_1 }}
                        callbacks={{ disableContinueBtn, dispatch, handleCalculateFee }}
                        paymentType={paymentType} hasCalFeeDone={hasCalFeeDone} contractId={contractId} dataFees={dataFees}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    backStep={backStep.bind(null, activeStep)}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step2