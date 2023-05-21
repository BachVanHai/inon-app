import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import StepForm from './StepForm'
import FooterView from '../../views/FooterView'
import { backStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'

const Step = () => {
    const {
        [BASE.KEY_ACTIVE_STEP]: activeStep, [BASE.KEY_PAY_CONTRACT_STATUS]: payContractStatus,
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        stepInfo={{ payContractStatus }}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    backStep={backStep.bind(null, activeStep)}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step