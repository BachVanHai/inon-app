import { BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import {
  COMPANIES,
  getKeyLang,
  NAME_APP_CONFIG
} from '../../../../../../configs/insurance-app'
import {
  createConstractAndUpdateCompaniesAndCreateCustommer,
  getCarManufacturers,
  getCarVehicle,
  nextStep,
  updateSpecificProp
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import {
  BASE,
  KEY_ADD_TERMS_ALL,
  KEY_ADD_TERMS_MAIN,
  KEY_IS_LOADING,
  KEY_STEP_1,
  KEY_STEP_2,
  KEY_SUGG_AUTOMAKER,
  KEY_SUGG_VEHICLE,
  KEY_UPLOADED_IMAGE,
  KEY_UPLOADED_IMAGE_PERSON,
  KEY_VEHICLE_ID,
  SIMPLIFY_MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import Insurance from '../../../../../../services/insurance-app/buyInsuranceCar'
import { isObjEmpty } from '../../../../../../ultity'
import { getDefault_contractInfoObject } from '../../../car/components/step1/utility'
import FooterView from '../../views/FooterView'
import { updateVehicelAndCalFee } from '../step2/utility'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { initialValues, validate, validationSchema } from './formikConfig'
import StepForm from './StepForm'
import {
  getDefaultTemplate_vehicel,
  get_ObjectCustomerDefault
} from './utility'

const Step = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [companyList, setCompanyList] = useState([])
  const [typeMotors, setTypeMotors] = React.useState([])
  const {
    [BASE.KEY_ACTIVE_STEP]: activeStep,
    [KEY_UPLOADED_IMAGE]: uploadedImg,
    [KEY_UPLOADED_IMAGE_PERSON]: uploadImgPerson,
    [BASE.KEY_CONTRACT_INFO]: contractInfo,
    [BASE.KEY_CONTRACT_ID]: contractId,
    [BASE.KEY_COMPANY_ID]: companyId,
    [KEY_VEHICLE_ID]: vehicleId,
    [BASE.KEY_STEP_1]: step_1,
    [KEY_SUGG_AUTOMAKER]: sugg_Automaker,
    [KEY_SUGG_VEHICLE]: sugg_Vehicle,
  } = useSelector((state) => state.app[REDUX_STATE_NAME])
  const [isValidateOnChange, setValidateOnChange] = useState(false)
  const enableValidateOnChange = () => {
    setValidateOnChange(true)
  }

  const next = (values) => {
    const _nextStep = () => {
      dispatch(nextStep(activeStep))
    }
    dispatch(updateSpecificProp(KEY_STEP_1, values))
    if (contractId) {
      dispatch(
        updateVehicelAndCalFee(
          vehicleId,
          values,
          contractId,
          contractInfo.insurances,
          activeStep,
          _nextStep
        )
      )
    } else {
      dispatch(
        createConstractAndUpdateCompaniesAndCreateCustommer(
          getDefault_contractInfoObject(0, 0),
          getDefaultTemplate_vehicel({ contractId, ...values }),
          companyId,
          _nextStep,
          get_ObjectCustomerDefault(values)
        )
      )
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: isValidateOnChange,
    validateOnBlur: isValidateOnChange,
    // validationSchema: validationSchema,
    validate: validate,
    onSubmit: next
  })

  const beforeNextInvoke = () => {
    if (!isObjEmpty(formik.errors)) {
      BaseAppUltils.toastError(
        intl.formatMessage({ id: getKeyLang('error.ocr.require') })
      )
      return true
    }
    return false
  }
  React.useEffect(() => {
    const getCompany = async () => {
      const res = await Insurance.getCompany()
      if (res.status === 200) {
        const newData = res.data
          .filter((_elt) => _elt.isEnable === true)
          .map((item) => {
            const iconCompany = COMPANIES.find(
              (_elt) => _elt.companyId.toString() === item.companyId.toString()
            )
            return {
              ...item,
              logo: iconCompany !== undefined ? iconCompany.logo : ''
            }
          })
        setCompanyList(newData)
      }
    }
    dispatch(getCarManufacturers())
    dispatch(getCarVehicle())
    getCompany()
  }, [])
  return (
    <StepBase titleMsg={getStepComponent(activeStep).title}>
      <CardBody>
        <FormikProvider value={formik}>
          <StepForm
            formik={formik}
            stepInfo={step_1}
            vehiclesType={typeMotors}
            companyId={companyId}
            uploadedImg={uploadedImg}
            uploadImgPerson={uploadImgPerson}
            enableValidateOnChange={enableValidateOnChange}
            className={'mt-1'}
            companyList={companyList}
            sugg_Automaker={sugg_Automaker}
            sugg_Vehicle={sugg_Vehicle}
            intl={intl}
            step_1={step_1}
          />
        </FormikProvider>
      </CardBody>
      {
        isObjEmpty(step_1) ? null : <CardFooter>
        <FooterView
          beforeSubmitClicked={beforeNextInvoke}
          handleSubmitClick={formik.handleSubmit}
          enableValidateOnChange={enableValidateOnChange}
          constantVals={{
            MAX_STEP: SIMPLIFY_MAX_STEP,
            REDUX_STATE_NAME: REDUX_STATE_NAME
          }}
        />
      </CardFooter>
      }
   
    </StepBase>
  )
}

export default Step
