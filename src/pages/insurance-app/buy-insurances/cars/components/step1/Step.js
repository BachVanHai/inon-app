import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, KEY_UPLOADED_COUNT_TEMP, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { KEY_CONTRACT_GROUP_ID, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCars'
import { useDispatch } from 'react-redux'
import { BASE, KEY_UPLOADED_COUNT } from "../../../../../../redux/reducers/insurance-app/buyInsurancesCars"
import { useSelector } from 'react-redux'
import { createCarsContract, getDefault_createCarsContract } from './utility'
import { isArrayEmpty } from '../../../../../../ultity'
import { BaseAppUltils } from 'base-app'
import { nextStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesCars'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_STEP_1]: step_1,
        [KEY_UPLOADED_COUNT]: uploadedCount,
        [KEY_CONTRACT_GROUP_ID]: f,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { returnCarUploaded } = step_1

    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        if (isArrayEmpty(returnCarUploaded)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`error.uploadFile.require`)} />)
            return
        }
        if (values[KEY_UPLOADED_COUNT_TEMP] === uploadedCount) {
            dispatch(nextStep(1))
            return
        }
        dispatch(
            createCarsContract(
                getDefault_createCarsContract(returnCarUploaded)
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
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step