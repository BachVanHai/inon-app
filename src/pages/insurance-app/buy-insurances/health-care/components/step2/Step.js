import { HttpClient } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { API_GET_PACKAGE_HEATH_CARE_INSURANCE } from '../../../../../../configs/insurance-app'
import { backStep, resetState, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { KEY_COMPANY_ID } from '../../../../../../redux/reducers/insurance-app/utility'
import { debounceFunc, fillMultipleStepInfo } from '../../../../../../ultity'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, KEY_DURATION_SELECTED, KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_START_INSURANCE, KEY_YEAR, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { ARR_COMPANIES, enabledCompanies, getDefault_updateCompanyIdContractObj, objectUpdate_Insurance, updateCompanyId, updateInsurance, updateInsuranceAndFeeStep2 } from './utility'

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
        // return console.log(JSON.stringify(values))
        dispatch(updateProps([
            {
                prop: KEY_STEP_2,
                value: values
            }
        ]))
        dispatch(
            updateInsurance(
                contractId,
                { id : insuranceInfo.id ,  "packageName": values[KEY_PACKAGE_SELECTED], "duration": values[KEY_DURATION_SELECTED] , "startValueDate" : moment(values[KEY_START_INSURANCE]).utc(true).toISOString() , "endValueDate" : moment(values[KEY_END_INSURANCE]).utc(true).toISOString() } , 'next'
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
    _values[KEY_DURATION_SELECTED] = values[KEY_DURATION_SELECTED]
    _values[KEY_YEAR] = values[KEY_YEAR]
    return _values
  }

  //use func
  const _infoValues = getInsurInfoValues()


    const getTitlePackage = (packageId , type) => {
        switch (packageId) {
            case 'GOI1':
                return type === 'title' ? "Lựa chọn 1" : "Gói cơ bản" 
            case 'GOI2':
                return type === 'title' ? "Lựa chọn 2" : "Gói nâng cao" 
            case 'GOI3':
                return type === 'title' ? "Lựa chọn 3" : "Gói cao cấp" 
            case 'GOI4':
                return type === 'title' ? "Lựa chọn 4" : "Gói kim cương" 
            default:
                break;
        }
    }
    useEffect(() => {    
    fillMultipleStepInfo(step_2, initialValues, setValues)
      const getPackage = async () => {
          const res = await HttpClient.get(API_GET_PACKAGE_HEATH_CARE_INSURANCE)
          if (res.status === 200) {
              const packageInsurance = res.data.map(_elt => {
                const fee = JSON.parse(_elt.feeValueDTO.liabilityDescription)
                return {
                      value: _elt.name,
                      msgField:  getTitlePackage(_elt.name , "title"),
                      packageSubtitleField: getTitlePackage(_elt.name , "sub"),
                      interest: _elt.feeValueDTO.liability,
                      fee1: fee.tienBHQL1,
                      fee2: fee.tienBHQL2,
                      fee3: fee.tienBHQL3,
                      fee4: fee.tienBHQL4Vu,
                      maxFee4: fee.tienBHQL4,
                      fee5: fee.tienBHQL5Vu,
                      maxFee5: fee.tienBHQL5
                  }
                
            })
              setPackages(packageInsurance)
          }
      } 
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
                totalFeeInsurance : item.feeInsurances.totalFeeInsurance
              }
            })
            dispatch(updateCompanyId(contractId , getDefault_updateCompanyIdContractObj(contractInfo , newData[0]?.companyId ) , newData[0]?.companyId))
            dispatch(
                updateProps([
                  {
                    prop : BASE.KEY_TOTAL_FEE,
                    value : newData[0]?.totalFeeInsurance
                  }
                ])
              )
          setCompaniesData(newData)
      }
      getCompany()
      getPackage()
    }, [])

    useEffect(() => {
        if (values[KEY_PACKAGE_SELECTED] === '' || values[KEY_DURATION_SELECTED] === '' || values[KEY_START_INSURANCE] === '' || values[KEY_END_INSURANCE] === '' || values[KEY_YEAR] === '' || !contractId || !insuranceInfo.id) return
        dispatch(updateInsuranceAndFeeStep2(contractId , objectUpdate_Insurance(insuranceInfo.id ,values) , setCompaniesData , companyId , contractInfo))
        }, [JSON.stringify(_infoValues) ,contractId , insuranceInfo.id])
    
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