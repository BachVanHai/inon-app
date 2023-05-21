import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { useFormik, FormikProvider } from 'formik'
import { backStep, nextStep, updateContractCompany, updateStepInfo } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import StepForm from './StepForm'
import { initialValues } from './formikConfig'
import { getDefault_updatedBeneficiaries, getDefault_updatedContractFeeInfo } from './utility'
import { calculateFeeContract, reCalculateFeeContract, assignPaymentType } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { BaseAppUltils, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import {
    KEY_ACTIVE_STEP, KEY_BENEFICIARIES, KEY_BUYER_TYPE, KEY_COMPANY_ID, KEY_CONTRACT_ID, KEY_DATA_FEES,
    KEY_HAS_CAL_FEE_DONE, KEY_PAYMENT_TYPE, KEY_STEP_3, MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import FooterView from '../../views/FooterView'
import { getDataFee } from '../../../../../../ultity'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step3 = () => {
    const dispatch = useDispatch()
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const {
        [KEY_COMPANY_ID]: companyId, [KEY_ACTIVE_STEP]: activeStep, [KEY_CONTRACT_ID]: contractId,
        [KEY_HAS_CAL_FEE_DONE]: hasCalFeeDone, [KEY_DATA_FEES]: dataFees, [KEY_BENEFICIARIES]: beneficiaries,
        [KEY_PAYMENT_TYPE]: paymentType, [KEY_STEP_3]: step_3, [KEY_BUYER_TYPE]: buyerType,
    } = useSelector(state => state.app[REDUX_STATE_NAME])

    const handleRadioPaymentTypeClick = (paymentType) => {
        dispatch(assignPaymentType(paymentType))
    }

    const handleCalFee = async (formik) => {
        if (hasCalFeeDone) {
            dispatch(
                reCalculateFeeContract(
                    getDefault_updatedBeneficiaries(formik.values, contractId, paymentType)
                )
            )
            return
        }
        dispatch(
            calculateFeeContract(
                getDefault_updatedBeneficiaries(formik.values, contractId, paymentType)
            )
        )
    }

    const next = (values) => {
        if (!hasCalFeeDone) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.needCalFee`)} />)
            return
        }
        dispatch(
            updateStepInfo(values)
        )

        dispatch(
            updateContractCompany(
                contractId,
                getDefault_updatedBeneficiaries(values, contractId, paymentType),
                getDefault_updatedContractFeeInfo(paymentType, getDataFee(dataFees, companyId), companyId),
                buyerType
            )
        )
        dispatch(nextStep(activeStep))
    }

    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        onSubmit: next,
    })
    
    return (
        <FormikProvider value={formik} >
            <StepBase titleMsg={getStepComponent(activeStep).title} >
                <CardBody>
                    <StepForm
                        stepInfo={{ ...step_3, paymentType, hasCalFeeDone, dataFees, beneficiaries, contractId, companyId }}
                        handleCalFee={handleCalFee.bind(null, formik)}
                        handleRadioPaymentTypeClick={handleRadioPaymentTypeClick}
                        formik={formik}
                    />
                </CardBody>
                <CardFooter>
                    <FooterView
                        handleSubmitClick={formik.handleSubmit}
                        enableValidateOnChange={enableValidateOnChange}
                        constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={backStep.bind(null, activeStep)}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider>
    )
}

export default Step3