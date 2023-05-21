import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import {
  backStep,
  resetState,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesTravelDomestic'
import {
  BASE,
  KEY_ADDONS,
  KEY_INSURANCE_INFO,
  KEY_STEP_2,
  MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import { debounceFunc, isObjEmpty } from '../../../../../../ultity'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import {
  initialValues, KEY_ARRIVE_POINT, KEY_DURATION, KEY_END_INSURANCE,
  KEY_END_POINT,
  KEY_INSURANCE_CODE,
  KEY_INSURANCE_DEDUCTION,
  KEY_INSURANCE_MONEY,
  KEY_JOIN_GAME_NUMBER,
  KEY_PACKAGE_SELECTED,
  KEY_PERSON_INSURANCE_TYPE,
  KEY_START_INSURANCE, KEY_START_POINT, KEY_TOTAL_PERSON_INSURANCE, validate,
  validationSchema
} from './formikConfig'
import StepForm from './StepForm'
import {
  actionFeeInsuranceAndUpdateInsurances, getAddOns_Contract, getDetail_Contract, getObj_UpdateAddOns
} from './utility'

const Step = () => {
  const {
    [BASE.KEY_ACTIVE_STEP]: activeStep,
    [BASE.KEY_CONTRACT_ID]: contractId,
    [BASE.KEY_STEP_1]: step_1,
    [BASE.KEY_CONTRACT_INFO]: contractInfo,
    [KEY_INSURANCE_INFO]: insuranceInfo,
    [BASE.KEY_TOTAL_FEE]: totalFee,
    [BASE.KEY_COMPANY_ID]: companyId,
    [BASE.KEY_DATA_FEES]: dataFees,
    [BASE.KEY_HAS_CAL_FEE_DONE]: feeStatus,
    [KEY_ADDONS] : addOns ,
    step_2
  } = useSelector((state) => state['app'][REDUX_STATE_NAME])
  const dispatch = useDispatch()
  const [isValidateOnChange, setValidateOnChange] = useState(false)
  const [companiesData, setCompaniesData] = useState([])
  const enableValidateOnChange = () => {
    setValidateOnChange(true)
  }

  const next = (values) => {
    dispatch(
      updateProps([
        {
          prop: KEY_STEP_2,
          value: values
        }
      ])
    )
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_ACTIVE_STEP,
          value: 3
        }
      ])
    )
  }

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: isValidateOnChange,
    validateOnBlur: isValidateOnChange,
    validationSchema: validationSchema,
    validate: validate,
    onSubmit: next
  })
  const { errors, setFieldValue, getFieldMeta, touched, values } = formik
  //when config => call api update insurance
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_PACKAGE_SELECTED] = values[KEY_PACKAGE_SELECTED]
    _values[KEY_START_INSURANCE] = values[KEY_START_INSURANCE]
    _values[KEY_DURATION] = values[KEY_DURATION]
    _values[KEY_INSURANCE_MONEY] = values[KEY_INSURANCE_MONEY]
    _values[KEY_PERSON_INSURANCE_TYPE] = values[KEY_PERSON_INSURANCE_TYPE]
    _values[KEY_START_POINT] = values[KEY_START_POINT]
    _values[KEY_ARRIVE_POINT] = values[KEY_ARRIVE_POINT]
    _values[KEY_END_POINT] = values[KEY_END_POINT]
    _values[KEY_INSURANCE_DEDUCTION] = values[KEY_INSURANCE_DEDUCTION]
    _values[KEY_PACKAGE_SELECTED] = values[KEY_PACKAGE_SELECTED]
    _values[KEY_INSURANCE_CODE] = values[KEY_INSURANCE_CODE]
    _values[KEY_JOIN_GAME_NUMBER] = values[KEY_JOIN_GAME_NUMBER]
    return _values
  } 
  useEffect(() => {
    dispatch(getAddOns_Contract(contractId))
  }, [])
  //use func
  const _infoValues = getInsurInfoValues()
  useEffect(() => {
    if (values[KEY_START_POINT] === '' || values[KEY_ARRIVE_POINT] === '' || values[KEY_END_POINT] === '') return
    else{
      const getFee = debounceFunc(() => dispatch(actionFeeInsuranceAndUpdateInsurances(contractId , values , addOns , setFieldValue )), 2000)
      getFee()
    }
    
  }, [JSON.stringify(_infoValues)])

  return (
    <StepBase titleMsg={getStepComponent(activeStep).title}>
      <CardBody>
        <FormikProvider value={formik}>
          <StepForm
            stepInfo={{
              step_1,
              step_2,
              totalFee,
              contractId,
              insuranceInfo,
              companyId,
              contractInfo,
              companiesData,
              setCompaniesData,
              dataFees,
              feeStatus
            }}
            enableValidateOnChange={enableValidateOnChange}
            totalFee={totalFee}
          />
        </FormikProvider>
      </CardBody>

      <CardFooter>
        <FooterView
          handleSubmitClick={formik.handleSubmit}
          enableValidateOnChange={enableValidateOnChange}
          resetState={resetState}
          backStep={backStep.bind(null, activeStep)}
          constantVals={{
            MAX_STEP: MAX_STEP,
            REDUX_STATE_NAME: REDUX_STATE_NAME
          }}
        />
      </CardFooter>
    </StepBase>
  )
}

export default Step
