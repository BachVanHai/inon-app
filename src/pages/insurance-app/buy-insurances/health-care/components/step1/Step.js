import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import StepForm from './StepForm'
import FooterView from '../../views/FooterView'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { createContract, getDefault_createContractObj, getDefault_updateBeneficiariesObj, updateBeneficiaries } from './utility'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateInsurancePackages } from '../step2/utility'
import { isArrayEmpty } from '../../../../../../ultity'
import moment from 'moment'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

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
        // console.log(`values`, JSON.stringify(values))

        values.addtinalPeople[0].dateOfBirth = moment(values.addtinalPeople[0].dateOfBirth).utc(true).format(DATE_FORMAT);

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
