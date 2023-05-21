import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import {
  backStep,
  resetState,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import {
  BASE,
  KEY_INSURANCE_INFO,
  KEY_STEP_2,
  MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import { debounceFunc } from '../../../../../../ultity'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import {
  initialValues, KEY_DURATION, KEY_END_INSURANCE,
  KEY_INSURANCE_DEDUCTION,
  KEY_INSURANCE_MONEY,
  KEY_PACKAGE_SELECTED,
  KEY_START_INSURANCE,
  KEY_TOTAL_PERSON_INSURANCE,
  validate,
  validationSchema
} from './formikConfig'
import StepForm from './StepForm'
import {
  actionFeeInsuranceAndUpdateInsurances, INSURANCE_MONEY_ARR, INSURANCE_MONEY_ARR_BASIC, PACKAGES_INSURANCES
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
    step_2
  } = useSelector((state) => state['app'][REDUX_STATE_NAME])
  const dispatch = useDispatch()
  const [isValidateOnChange, setValidateOnChange] = useState(true)
  const [companiesData, setCompaniesData] = useState([])
  const [packages, setPackages] = useState([])
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
  const getTitlePackage = (packageId, type) => {
    switch (packageId) {
      case 'BASIC':
        return type === 'title' ? 'Lựa chọn 1' : 'Gói cơ bản'
      case 'ADVANCE':
        return type === 'title' ? 'Lựa chọn 2' : 'Gói nâng cao'
      default:
        break
    }
  }


  //when config => call api update insurance
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_PACKAGE_SELECTED] = values[KEY_PACKAGE_SELECTED]
    _values[KEY_START_INSURANCE] = values[KEY_START_INSURANCE]
    _values[KEY_END_INSURANCE] = values[KEY_END_INSURANCE]
    _values[KEY_INSURANCE_MONEY] = values[KEY_INSURANCE_MONEY]
    _values[KEY_INSURANCE_DEDUCTION] = values[KEY_INSURANCE_DEDUCTION]
    return _values
  }
  //use func
  const _infoValues = getInsurInfoValues()


  
  
  useEffect(() => {
    setFieldValue(KEY_TOTAL_PERSON_INSURANCE, step_1.addtinalPeople.length)
    if (step_1.addtinalPeople.length <= 5 && step_2 && step_2.insuranceDeduction > 25) {
      setFieldValue(KEY_INSURANCE_DEDUCTION, 25)
    }
    const getPackage = async () => {
      const packageInsurance = PACKAGES_INSURANCES.map((_elt) => {
        return {
          ..._elt,
          value: _elt.name,
          msgField: getTitlePackage(_elt.name, 'title'),
          packageSubtitleField: getTitlePackage(_elt.name, 'sub'),
          interest: 2000000,
          fee1: _elt.tienBHQL1,
          fee2: _elt.tienBHQL2,
          fee3: _elt.tienBHQL3,
          fee4: _elt.tienBHQL4,
          maxFee4: _elt.tienBHQL4,
          fee5: _elt.tienBHQL5,
          maxFee5: _elt.tienBHQL5,
          fee6: _elt.tienBHQL6,
          fee6: _elt.tienBHQL7
        }
      })
      setPackages(packageInsurance)
    }
    getPackage()
  }, [])


  useEffect(() => {
    // if value has in array package => continue <=> else not call api
    if (values[KEY_PACKAGE_SELECTED] === 'BASIC' && INSURANCE_MONEY_ARR_BASIC.some(_elt => _elt.value === values[KEY_INSURANCE_MONEY]) === false || values[KEY_PACKAGE_SELECTED] === 'ADVANCE' && INSURANCE_MONEY_ARR.some(_elt => _elt.value === values[KEY_INSURANCE_MONEY]) === false) return
    if (values[KEY_DURATION]  === '') return
    const getFee = debounceFunc(() => dispatch(actionFeeInsuranceAndUpdateInsurances(contractId , values)))
    getFee()
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
              getTitlePackage,
              feeStatus
            }}
            packages={packages}
            enableValidateOnChange={enableValidateOnChange}
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
