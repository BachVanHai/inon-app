import { FormattedMessage } from 'base-app'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../../assets/scss/elite-app/buy-insurance/vta/vta-step2.scss'
import { getKeyLang } from '../../../../../configs/elite-app'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { actionVTANextStep3 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVtaInsurance'
import { StepFooter } from '../../StepFooter'
import DurationPackage from './durationPackage'
import FreeInsurance from './freeInsurance'
import InsurancePackageMobile from './insurancePackageMobile'
import InsurancPackage from './insurancPackage'

const VtaStep2 = () => {
  const dispatch = useDispatch()
  const { stepData } = useSelector((state) => state.app.buyInsurance)
  //insurance package
  const [insurancePackage, setInsurancePackage] = useState(
    stepData[1]?.moreInsured[0]?.packageName || 'GOI3'
  )
  //duration package
  const [durationPackage, setDurationPackage] = useState(
    stepData[1]?.moreInsured[0]?.duration || 6
  )
  const moreInsured = stepData[1]?.moreInsured.map((item) => {
    const itemAlt = {
      ...item,
      duration: durationPackage,
      packageName: insurancePackage
    }
    return itemAlt
  })
  const initialData = {
    ...stepData[1],
    moreInsured: moreInsured
  }
  const handleChangeDurationPackage = (duration, setFieldValue) => {
    setFieldValue('duration', duration)
    setDurationPackage(duration)
  }
  const handleChangeInsurancPackage = (item, setFieldValue) => {
    setFieldValue('packageName', item)
    setInsurancePackage(item)
  }
  const onClickSubmit = (values) => {
    dispatch(actionSaveStepData(1, initialData))
    dispatch(actionVTANextStep3(initialData))
  }
  return (
    <div className='vta-step2'>
      <div className='mb-2'>
        <div className='buyer-info-title mt-1'>
          <FormattedMessage id={getKeyLang('insurance.vta.step2.title')} />
        </div>
        <div className='font-weight-bold'>
          <FormattedMessage id={getKeyLang('insurance.vta.step2.warning')} />
        </div>
      </div>
      <Formik
        initialValues={initialData}
        enableReinitialize
        onSubmit={onClickSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <InsurancePackageMobile
              insurancePackage={insurancePackage}
              handleChangeInsurancPackage={handleChangeInsurancPackage}
              setFieldValue={setFieldValue}
            />
            <InsurancPackage
              insurancePackage={insurancePackage}
              handleChangeInsurancPackage={handleChangeInsurancPackage}
              setFieldValue={setFieldValue}
            />
            <DurationPackage
              durationPackage={durationPackage}
              handleChangeDurationPackage={handleChangeDurationPackage}
              setFieldValue={setFieldValue}
            />
            <FreeInsurance
              insurancePackage={insurancePackage}
              durationPackage={durationPackage}
              personBuyer={stepData[1]?.moreInsured.length}
            />
            <StepFooter onClickNext={onClickSubmit} />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default VtaStep2
