import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_IC_NO, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { nextStep, updateContract, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import StepForm from './StepForm'
import { createContract, checkInfoContact } from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import { getDefault_createContractObj, getDefault_updateContractObj } from './utility'
import { KEY_ACTIVE_STEP, KEY_BUYER_ID, KEY_CONTRACT_ID, KEY_STEP_1, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step1 = () => {
    const dispatch = useDispatch()
    const {
        [KEY_STEP_1]: step_1, [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep, [KEY_BUYER_ID]: buyerId
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        dispatch(
            nextStep(activeStep)
        )
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_1,
                    value: values
                }
            ])
        )
        if (contractId) {
            dispatch(
                updateContract(
                    getDefault_updateContractObj({ ...values, [KEY_CONTRACT_ID]: contractId, [KEY_BUYER_ID]: buyerId })
                )
            )
            return
        }

        dispatch(
            createContract(
                getDefault_createContractObj(values)
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

    const handleCheckInfoContact = async () => {
        dispatch(
            checkInfoContact(formik.getFieldMeta(KEY_IC_NO).value)
        )
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        checkInfoContact={handleCheckInfoContact}
                        stepInfo={step_1}
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

export default Step1
