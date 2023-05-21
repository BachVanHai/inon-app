import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DATE_FORMAT } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { actionNextStep } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { updateProps } from '../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE } from '../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { StepFooter } from '../../StepFooter'
import { REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { createContract, getDefault_createContractObj, getDefault_updateBeneficiariesObj, updateBeneficiaries } from './utility'
const FormStyled = styled.div`
.form-label-group.position-relative.form-group{
    margin-bottom : 1rem;
}
`
const BestchoiseStep1 = () => {
    const dispatch = useDispatch()
    const {
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const {
        refId
    } = useSelector(state => state.app.buyInsurance)
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        // console.log(`values`, JSON.stringify(values))

        values.addtinalPeople[0].dateOfBirth = moment(values.addtinalPeople[0].dateOfBirth).utc(true).format(DATE_FORMAT);
        dispatch(actionNextStep())
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
                    getDefault_updateBeneficiariesObj(values, contractInfo)
                )
            )
            return
        }
        dispatch(
            createContract(
                getDefault_createContractObj(values , refId)
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
    const { errors } = formik

    return (
        <>
            <FormikProvider value={formik}>
                <FormStyled>
                    <StepForm
                        formik={formik}
                        stepInfo={{ step_1 }}
                        enableValidateOnChange={enableValidateOnChange}
                    />
                </FormStyled>

            </FormikProvider>
            <StepFooter
                errors={errors}
                onClickNext={() => {
                    enableValidateOnChange()
                    formik.handleSubmit()
                }}
            />
        </>
    )
}

export default BestchoiseStep1
