import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { BASE, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesAntin'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { createContract, getDefault_createContractObj, getDefault_updateBeneficiariesObj, getDefault_updateOwnerContactObj, getObject_insurances, updateBeneficiaries, updateCreditContract } from './utility'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [BASE.KEY_STEP_1]: step_1,
        [KEY_STEP_2]: step_2,
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
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
        if (contractId) {
            dispatch(
                updateCreditContract(
                    contractId,
                    getDefault_updateOwnerContactObj(contractInfo?.insurances[0]?.id ,values),
                    getObject_insurances(contractInfo?.insurances[0]?.id ,values , step_2),
                    values ,
                    step_2
                )
            )
            return
        }
        dispatch(
            createContract(
                getDefault_createContractObj(values),
                values ,
                step_2
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
                        stepInfo={{ step_1 }}
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
