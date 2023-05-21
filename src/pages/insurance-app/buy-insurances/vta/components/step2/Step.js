import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { BaseAppUltils } from 'base-app'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import {
    KEY_ACTIVE_STEP, KEY_BUYER_TYPE, KEY_CONTRACT_ID,
    KEY_CONTRACT_INFO, KEY_STEP_1, KEY_STEP_2, MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesVta'
import { useSelector } from 'react-redux'
import { resetState, backStep, updateContract, nextStep, updateProps, createContract } from '../../../../../../redux/actions/insurance-app/buyInsurancesVta'
import { getDefault_createdContractInfoObj, getDefault_updateContractInfoObj } from './utility'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { isObjEmpty } from '../../../../../../ultity'

const Step = () => {
    const {
        [KEY_ACTIVE_STEP]: activeStep,
        [KEY_CONTRACT_ID]: contractId,
        [KEY_CONTRACT_INFO]: contractInfo,
        [KEY_BUYER_TYPE]: buyerType,
        [KEY_STEP_1]: step_1,
        [KEY_STEP_2]: step_2
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const dispatch = useDispatch()
    const intl = useIntl()
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        dispatch(nextStep(activeStep))
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_2,
                    value: values,
                }
            ])
        )
        const _values = { ...step_1, ...values }
        if (contractId) {
            if (!isObjEmpty(contractInfo)) {
                dispatch(updateContract(
                    contractId, getDefault_updateContractInfoObj(contractId, _values, contractInfo), buyerType
                ))
                return
            }
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`error`) }))
            return
        }
        dispatch(createContract(
            getDefault_createdContractInfoObj(_values), buyerType
        ))
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
                        stepInfo={{ step_2, step_1 }}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    resetState={resetState} backStep={backStep.bind(null, activeStep)}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step