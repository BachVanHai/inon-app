import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { nextStep, backStep, createContact, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_STEP_3 } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import { getDefault_createContactObj, getDefault_updateContractObj } from './utility'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [KEY_STEP_3]: step_3
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        dispatch(nextStep(activeStep))
        dispatch(updateProps([
            {
                prop: KEY_STEP_3,
                value: values
            }
        ]))
        dispatch(
            createContact(
                contractId,
                getDefault_createContactObj(values),
                getDefault_updateContractObj(contractId)
            )
        )
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
                        stepInfo={step_3}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    backStep={backStep.bind(null, activeStep)}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step