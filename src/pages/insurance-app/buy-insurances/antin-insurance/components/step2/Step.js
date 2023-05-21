import { BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { backStep, resetState, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { BASE, BENEFICIARY, KEY_INSURANCE_INFO, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesAntin'
import { isArrayEmpty } from '../../../../../../ultity'
import FooterView from '../../views/FooterView'
import { getObject_insurances } from '../step1/utility'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION, KEY_RESPONSIBILITY, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { createBeneficiary, getObjectBeneficiary, removeCommaBetweenStringAndConvertToNumber, updateBeneficiary, updateInsuranceAndFeeStep2 } from './utility'

const Step = () => {
    const {
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [KEY_INSURANCE_INFO] : insuranceInfo , 
        [BASE.KEY_TOTAL_FEE] : totalFee,
        [BENEFICIARY] : beneficiary, 
        step_2 , 
        [BASE.KEY_DATA_FEES] : dataFees
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const dispatch = useDispatch()
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }
 
    const next = (values) => {
        dispatch(updateProps([
            {
                prop: KEY_STEP_2,
                value: values
            }
        ]))
        if (beneficiary && !isArrayEmpty(beneficiary)) {
            dispatch(updateBeneficiary(contractId, getObjectBeneficiary(values , contractInfo?.ownerId)))
        }else{
            dispatch(createBeneficiary(contractId, getObjectBeneficiary(values)))
        }
    }
    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })
    const {values , setFieldValue}= formik
    //when config => call api update insurance
    const getInsurInfoValues = () => {
        const _values = {}
        _values[KEY_RESPONSIBILITY] = values[KEY_RESPONSIBILITY]
        _values[KEY_DATE_INSUR_FROM] = values[KEY_DATE_INSUR_FROM]
        _values[KEY_DATE_INSUR_TO] = values[KEY_DATE_INSUR_TO]
        _values[KEY_DURATION] = values[KEY_DURATION]
        return _values
      }
      const _infoValues = getInsurInfoValues()
    useEffect(() => {
    if (values[KEY_RESPONSIBILITY] === '') return
    // if customer back step 1 and edit momeny => check KEY_RESPONSIBILITY > loand
    if (removeCommaBetweenStringAndConvertToNumber(step_2?.responsibility) > removeCommaBetweenStringAndConvertToNumber(step_2?.loan)) {
        setFieldValue(KEY_RESPONSIBILITY , step_2?.loan )
    }
    dispatch(updateInsuranceAndFeeStep2(contractId , getObject_insurances(contractInfo?.insurances[0]?.id ,step_1 , values),step_2 , values))
    }, [JSON.stringify(_infoValues)])
    
    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        stepInfo={{ step_1 , step_2 ,totalFee ,contractId ,insuranceInfo , dataFees }}
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