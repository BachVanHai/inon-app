import { HttpClient } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody } from 'reactstrap'
import StepBase from '../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { API_GET_PACKAGE_HEATH_CARE_INSURANCE } from '../../../../../configs/insurance-app'
import { actionNextStep } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { updateProps } from '../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE, KEY_INSURANCE_INFO, KEY_STEP_2 } from '../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { KEY_COMPANY_ID } from '../../../../../redux/reducers/insurance-app/utility'
import Insurance from '../../../../../services/insurance-app/buyInsuranceMotor'
import { StepFooter } from '../../StepFooter'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, KEY_DURATION_SELECTED, KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_START_INSURANCE, KEY_YEAR, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import { ARR_COMPANIES, enabledCompanies, objectUpdate_Insurance, updateInsurance, updateInsuranceAndFeeStep2 } from './utility'

const BestChoiseStep2 = () => {
    const {
        [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_STEP_1]: step_1,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [KEY_INSURANCE_INFO]: insuranceInfo,
        [BASE.KEY_TOTAL_FEE]: totalFee,
        [BASE.KEY_COMPANY_ID] : companyId ,
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
        dispatch(actionNextStep())
        dispatch(
            updateInsurance(
                contractId,
                { id: insuranceInfo.id, "packageName": values[KEY_PACKAGE_SELECTED], "duration": values[KEY_DURATION_SELECTED], "startValueDate": moment(values[KEY_START_INSURANCE]).utc(true).toISOString(), "endValueDate": moment(values[KEY_END_INSURANCE]).utc(true).toISOString() }
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
    const { errors , values } = formik
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
    const getTitlePackage = (packageId, type) => {
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
        const getPackage = async () => {
            const res = await HttpClient.get(API_GET_PACKAGE_HEATH_CARE_INSURANCE)
            if (res.status === 200) {
                const packageInsurance = res.data.map(_elt => {
                    const fee = JSON.parse(_elt.feeValueDTO.liabilityDescription)
                    return {
                        value: _elt.name,
                        msgField: getTitlePackage(_elt.name, "title"),
                        packageSubtitleField: getTitlePackage(_elt.name, "sub"),
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
     
        getPackage()
    }, [])
    useEffect(() => {
        const getCompany =  () => {
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
    }, [JSON.stringify(dataFees)])

    useEffect(() => {
        if (values[KEY_PACKAGE_SELECTED] === '' || values[KEY_DURATION_SELECTED] === '' || values[KEY_START_INSURANCE] === '' || values[KEY_END_INSURANCE] === '' || values[KEY_YEAR] === '' || !contractId || !insuranceInfo.id) return
        dispatch(updateInsuranceAndFeeStep2(contractId , objectUpdate_Insurance(insuranceInfo.id ,values) , setCompaniesData , companyId , contractInfo))
        }, [JSON.stringify(_infoValues) , contractId , insuranceInfo.id])
    

    return (
        <>
            <FormikProvider value={formik}>
                <StepForm
                        stepInfo={{ step_1 , step_2 ,totalFee ,contractId ,insuranceInfo , companyId , contractInfo , companiesData , setCompaniesData }}
                        packages={packages}
                />
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

export default BestChoiseStep2