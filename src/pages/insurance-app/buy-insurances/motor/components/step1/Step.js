import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { createVehicle, nextStep, updateVehicle } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_VEHICLE_ID } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { getDefault_createContractObj, getDefault_createVehicleObj, getDefault_updateVehicleObj } from './utility'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [KEY_VEHICLE_ID]: vehicleId,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        dispatch(
            updateProps([
                {
                    prop: BASE.KEY_STEP_1,
                    value: values
                }
            ])
        )
        dispatch(nextStep(activeStep))
        if (contractId) {
            dispatch(
                updateVehicle(
                    getDefault_updateVehicleObj(vehicleId, values)
                )
            )
            return
        }
        dispatch(
            createVehicle(
                getDefault_createContractObj(),
                getDefault_createVehicleObj(values)
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

export default Step