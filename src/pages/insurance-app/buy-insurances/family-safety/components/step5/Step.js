import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useFormik, FormikProvider } from 'formik'
import { backStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import {
    KEY_ACTIVE_STEP, KEY_CONTRACT_ID, KEY_PAYMENT_TYPE, KEY_PAY_CONTRACT_STATUS, KEY_STEP_1,
    MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validationSchema } from './formikConfig'
import Completed from './Completed'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step5 = () => {
    const { [KEY_STEP_1]: step_1, [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep,
        [KEY_PAY_CONTRACT_STATUS]: payContractStatus, [KEY_PAYMENT_TYPE]: paymentType } =
        useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange] = useState(true)

    const submit = () => { }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        onSubmit: submit,
    })

    return (
        <FormikProvider value={formik} >
            <StepBase titleMsg={getStepComponent(activeStep).title}>
                <CardBody>
                    <Completed
                        formik={formik} payContractStatus={payContractStatus}
                        contractId={contractId} stepInfo={step_1}
                    />
                </CardBody>
                <CardFooter>
                    <FooterView
                        handleSubmitClick={formik.handleSubmit}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={backStep.bind(null, activeStep)}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider >
    )
}

export default Step5
