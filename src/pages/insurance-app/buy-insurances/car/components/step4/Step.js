import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter, } from 'reactstrap'
import { backStep, nextStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import StepForm from './StepForm'
import { useFormik, FormikProvider } from 'formik'
import { initialValues, validationSchema } from './formikConfig'
import { KEY_ACTIVE_STEP, KEY_CONTRACT_ID, KEY_STEP_1, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { NAME_APP_CONFIG } from '../../../../../../configs/insurance-app'
import { KEY_USERS_DTO } from '../../../../../../redux/reducers/insurance-app/appConfig'

const Step4 = () => {
    const dispatch = useDispatch()
    const { [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep, [KEY_STEP_1]: step_1 } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { [KEY_USERS_DTO]: usersDTO } = useSelector(state => state.app[NAME_APP_CONFIG])

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = () => {
        dispatch(nextStep(activeStep))
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        onSubmit: next,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title} >
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        contractId={contractId}
                        usersDTO={usersDTO}
                        formik={formik}
                        stepInfo={step_1}
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
        </StepBase >
    )
}

export default Step4
