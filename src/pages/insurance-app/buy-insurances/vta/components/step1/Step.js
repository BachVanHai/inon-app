import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { KEY_ACTIVE_STEP, KEY_BUYER_TYPE, KEY_STEP_1, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesVta'
import FooterView from '../../views/FooterView'
import { nextStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesVta'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [KEY_STEP_1]: step_1,
        [KEY_ACTIVE_STEP]: activeStep,
        [KEY_BUYER_TYPE]: buyerType,
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_1,
                    value: values,
                }
            ])
        )
        dispatch(nextStep(activeStep))
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        stepInfo={{ step_1, buyerType }}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step