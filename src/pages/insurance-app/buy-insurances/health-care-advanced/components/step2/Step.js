import { HttpClient } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { API_GET_PACKAGE_HEATH_CARE_INSURANCE } from '../../../../../../configs/insurance-app'
import { backStep, resetState, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import { fillMultipleStepInfo, isArrayEmpty } from '../../../../../../ultity'
import FooterView from '../../views/FooterView'
import { REDUX_STATE_NAME, getStepComponent } from '../stepsManager'
import StepForm from './StepForm'
import { KEY_DURATION_SELECTED, KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_PRODUCT_CODE, KEY_START_INSURANCE, KEY_YEAR, initialValues, validate, validationSchema } from './formikConfig'
import { ARR_COMPANIES, _PACKAGE_INSURANCES, enabledCompanies, getDefault_updateCompanyIdContractObj, objectUpdate_Insurance, updateCompanyId, updateInsurance, updateInsuranceAndFeeStep2 } from './utility'


const Step = () => {
    const {
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [KEY_INSURANCE_INFO] : insuranceInfo , 
        [BASE.KEY_TOTAL_FEE] : totalFee,
        [BASE.KEY_COMPANY_ID] : companyId,
        [BASE.KEY_DATA_FEES] : dataFees  , 
        step_2
    } = useSelector(state => state["app"][REDUX_STATE_NAME])
    const dispatch = useDispatch()
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const [companiesData, setCompaniesData] = useState([])
    const [packages, setPackages] = useState([])
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
        dispatch(
            updateInsurance(
                contractId,
                objectUpdate_Insurance(insuranceInfo.id ,values , contractId)
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
    const { values , setValues} = formik


     //when config => call api update insurance
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_PACKAGE_SELECTED] = values[KEY_PACKAGE_SELECTED]
    _values[KEY_START_INSURANCE] = values[KEY_START_INSURANCE]
    _values[KEY_END_INSURANCE] = values[KEY_END_INSURANCE]
    _values[KEY_PRODUCT_CODE] = values[KEY_PRODUCT_CODE]
    return _values
  }

  //use func
  const _infoValues = getInsurInfoValues()

    useEffect(() => {    
    fillMultipleStepInfo(step_2, initialValues, setValues)
      const getCompany = async () => {
        const newData = dataFees
            .filter((_elt) => enabledCompanies.includes(_elt.companyId))
            .map((item) => {
              const iconCompany = ARR_COMPANIES.find(
                (_elt) => _elt.companyId.toString() === item.companyId.toString()
              )
              return {
                ...item,
                logo: iconCompany !== undefined ? iconCompany.image : '', 
                totalFeeInsurance : item.feeInsurances.feeInsurance
              }
            })
            dispatch(
                updateProps([
                  {
                    prop : BASE.KEY_TOTAL_FEE,
                    value : newData[0]?.feeInsurances?.feeInsurance
                  }
                ])
              )
          setCompaniesData(newData)
      }
      if (!isArrayEmpty(dataFees)) getCompany()
     
    }, [])

    useEffect(() => {
        if (values[KEY_PACKAGE_SELECTED] === '' || values[KEY_PRODUCT_CODE] === '' || values[KEY_START_INSURANCE] === '' || values[KEY_END_INSURANCE] === '' ) return
        dispatch(updateInsuranceAndFeeStep2(contractId , objectUpdate_Insurance(insuranceInfo.id ,values , contractId) , setCompaniesData , companyId , contractInfo))
        }, [JSON.stringify(_infoValues)])
    
    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        stepInfo={{ step_1 , step_2 ,totalFee ,contractId ,insuranceInfo , companyId , contractInfo , companiesData , setCompaniesData , dataFees }}
                        packages={packages}
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