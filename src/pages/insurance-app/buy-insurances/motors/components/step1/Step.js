import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_UPLOADED_COUNT_TEMP, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { MOTORS_MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useDispatch } from 'react-redux'
import { BASE, KEY_UPLOADED_COUNT } from "../../../../../../redux/reducers/insurance-app/buyInsurancesMotors"
import { useSelector } from 'react-redux'
import { createMotorContract, getDefault_createMotorContract } from './utility'
import { isArrayEmpty } from '../../../../../../ultity'
import { BaseAppUltils } from 'base-app'
import { nextStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotors'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_STEP_1]: step_1,
        [KEY_UPLOADED_COUNT]: uploadedCount,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { returnUploaded } = step_1

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        if (isArrayEmpty(returnUploaded)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`error.uploadFile.require`)} />)
            return
        }
        if (values[KEY_UPLOADED_COUNT_TEMP] === uploadedCount) {
            dispatch(nextStep(1))
            return
        }
        dispatch(
            createMotorContract(
                getDefault_createMotorContract(returnUploaded)
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

    React.useEffect(() => {
        formik.setFieldValue(KEY_UPLOADED_COUNT_TEMP, uploadedCount)
    }, [])

    return (
        <StepBase titleMsg={getStepComponent(1).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        dispatch={dispatch}
                        stepInfo={step_1}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MOTORS_MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step