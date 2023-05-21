import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardBody, CardFooter, } from 'reactstrap'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import Completed from './Completed'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validationSchema } from './formikConfig'
import { backStep, resetState } from '../../../../../../redux/actions/insurance-app/buyInsuranceMultiple'
import { KEY_ACTIVE_STEP, KEY_PAY_CONTRACT_STATUS, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step4 = () => {
    const { [KEY_ACTIVE_STEP]: activeStep, [KEY_PAY_CONTRACT_STATUS]: payContractStatus, }
        = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <Completed formik={formik} payContractStatus={payContractStatus} />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    backStep={backStep.bind(null, activeStep)}
                    resetState={resetState}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step4
