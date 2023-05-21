import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import { BASE, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import FooterView from '../../views/FooterView'
import { REDUX_STATE_NAME, getStepComponent } from '../stepsManager'
import StepForm from './StepForm'
import { initialValues, validate, validationSchema } from './formikConfig'
import { createContract, getDefault_createContractObj, getDefault_updateBeneficiariesObj, updateBeneficiaries } from './utility'

const Step = () => {
    const dispatch = useDispatch()
    const {
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [BASE.KEY_COMPANY_ID] : companyId
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
                updateBeneficiaries(
                    contractId,
                    getDefault_updateBeneficiariesObj(values, contractInfo , companyId)
                )
            )
            return
        }
        dispatch(
            createContract(
                getDefault_createContractObj(values , companyId)
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
