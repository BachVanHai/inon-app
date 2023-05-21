import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import {
  validate,
  initialValues,
  validationSchema,
  KEY_VEHICLES_TYPE,
  KEY_VEHICLE_TYPE
} from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { nextStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import {
  BASE,
  KEY_STEP_2,
  KEY_UPLOADED_IMAGE,
  KEY_VEHICLE_ID
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { SIMPLIFY_MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { hasRequestFail, isObjEmpty } from '../../../../../../ultity'
import { doEverything } from '../step2/utility'
import { initialValues as step_2_initialValues } from '../step2/formikConfig'
import { BaseAppUltils } from 'base-app'
import { useIntl } from 'react-intl'
import { COMPANIES, getKeyLang } from '../../../../../../configs/insurance-app'
import Insurance from '../../../../../../services/insurance-app/buyInsuranceMotor'

const Step = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [companyList, setCompanyList] = useState([])
  const [typeMotors, setTypeMotors] = React.useState([])
  const {
    [BASE.KEY_ACTIVE_STEP]: activeStep,
    [KEY_UPLOADED_IMAGE]: uploadedImg,
    [BASE.KEY_CONTRACT_INFO]: contractInfo,
    [BASE.KEY_CONTRACT_ID]: contractId,
    [BASE.KEY_COMPANY_ID]: companyId,
    [KEY_VEHICLE_ID]: vehicleId,
    [BASE.KEY_STEP_1]: step_1,
    [KEY_STEP_2]: step_2
  } = useSelector((state) => state.app[REDUX_STATE_NAME])
  const [isValidateOnChange, setValidateOnChange] = useState(false)
  const enableValidateOnChange = () => {
    setValidateOnChange(true)
  }

  const next = (values) => {
    const _step_1 = { ...values }
    _step_1[KEY_VEHICLES_TYPE] = typeMotors
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_STEP_1,
          value: _step_1
        }
      ])
    )
    let _step_2 = step_2
    if (isObjEmpty(step_2)) {
      _step_2 = step_2_initialValues
    }
    doEverything(
      dispatch,
      _step_1,
      _step_2,
      vehicleId,
      companyId,
      contractId,
      contractInfo,
      activeStep ,
      nextStep
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
    const getTypeMotor = async () => {
      const res = await Service.getTypeMotor()
      if (hasRequestFail(res.status)) return

      const getLists = res.data.map((list) => {
        list.value = list.id
        list.label = list.name
        return list
      })
      setTypeMotors(getLists)
      formik.setFieldValue(KEY_VEHICLE_TYPE, getLists[0].id)
    }
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
    getCompany()
    getTypeMotor()
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
            enableValidateOnChange={enableValidateOnChange}
            className={'mt-1'}
            companyList={companyList}
          />
        </FormikProvider>
      </CardBody>

      <CardFooter>
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
    </StepBase>
  )
}

export default Step
