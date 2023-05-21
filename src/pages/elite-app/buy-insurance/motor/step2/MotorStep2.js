import React, { useEffect } from 'react'
import {
  actionCalculationMotorInsuranceFee,
  actionMotorNextStep3,
  actionResetContractCompanyId
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import DurationOfInsurance from '../../DurationOfInsurance'
import { INSURANCE_SETTING_DEFAULTS } from '../../../../../configs/elite-app'
import InsuranceMotorPeople from './InsuranceMotorPeople'
import PaymentMethods from '../../payment-method/PaymentMethods'
import CompanySelection from '../../CompanySelection'
import { StepFooter } from '../../StepFooter'
import * as Yup from 'yup'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const MotorStep2 = () => {
  const { vehicle, contract, feeDetails } = useSelector(
    (state) => state.app.buyInsurance
  )
  const insuranceMotorPeople = contract.insurances.find(
    (item) =>
      item.insuranceCode === INSURANCE_SETTING_DEFAULTS.MOTOR_CONNGUOI.key
  )

  const stepData = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['2'] || {
        numberInMotor: insuranceMotorPeople?.count1 || '',
        effectiveDateFrom: contract.insurances[0].startValueDate
      }
  )
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(actionResetContractCompanyId())
  }, [])

  const onChangeEnableInsurance = () => {
    const newContract = { ...contract }
    newContract.insurances.forEach((insurance) => {
      if (
        insurance.insuranceCode ===
        INSURANCE_SETTING_DEFAULTS.MOTOR_CONNGUOI.key
      ) {
        insurance.isEnable = !insurance.isEnable
      }
    })
    dispatch(actionSaveContract(newContract))
    dispatch(actionCalculationMotorInsuranceFee())
  }

  const onChangeEffectiveDateFrom = (date) => {
    const newContract = { ...contract }
    newContract.insurances.forEach((item) => {
      const currentDate = new Date(date[0])
      item.startValueDate = new Date(currentDate)
      currentDate.setMonth(currentDate.getMonth() + 12)
      item.endValueDate = new Date(currentDate)
    })
    dispatch(actionSaveContract(newContract))
  }

  const onSubmit = () => {
    if (!feeDetails.length) {
      return
    }
    dispatch(actionMotorNextStep3())
  }

  const minDate = new Date(contract.insurances[0]?.minStartValueDate)
  minDate.setHours(
    minDate.getHours(),
    minDate.getMinutes() - 1,
    minDate.getSeconds(),
    minDate.getMilliseconds()
  )

  const validationSchema = Yup.object().shape({
    effectiveDateFrom: Yup.date().min(minDate).required()
  })

  return (
    <Formik
      initialValues={stepData}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({
        errors,
        setFieldError,
        setFieldTouched,
        submitForm,
        validateForm
      }) => (
        <>
          <div className='duration-of-insurance'>
            <DurationOfInsurance
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
              insurance={contract.insurances[0]}
              onChangeEffectiveDateFrom={onChangeEffectiveDateFrom}
            />
          </div>

          <InsuranceMotorPeople
            vehicle={vehicle}
            onChangeInsuranceValue={contract}
            onChangeEnableInsurance={onChangeEnableInsurance}
          />
          <div className='mt-3'>
            <PaymentMethods />
          </div>

          <CompanySelection validateForm={validateForm} />
          <StepFooter errors={errors} onClickNext={() => submitForm().then()} />
        </>
      )}
    </Formik>
  )
}

export default MotorStep2
