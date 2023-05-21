import React, { useEffect } from 'react'
import {
  actionCarNextStep3, actionCalculationInsuranceFee, actionResetContractCompanyId
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS, INSURANCE_TYPES } from '../../../../../configs/elite-app'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import DurationOfInsurance from '../../DurationOfInsurance'
import AdditionalTerms from './AdditionalTerms'
import { useParams } from 'react-router-dom'
import { StepFooter } from '../../StepFooter'
import { InsuranceTNDSTN } from './InsuranceTNDSTN'
import InsuranceCarPeople from './InsuranceCarPeople'
import * as Yup from 'yup'
import InsuranceCarGoods from './InsuranceCarGoods'
import CompanySelection from '../../CompanySelection'
import PaymentMethods from '../../payment-method/PaymentMethods'
import InsuranceDurationEditable from './InsuranceDurationEditable'
import { BaseAppUltils, FormattedMessage } from 'base-app'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { convertNumberToCurrency } from '../../../../../ultity'
import { BuyInsuranceService } from '../../../../../services/elite-app/buyInsurance'

const CarStep2 = () => {
  const { contract, feeDetails, type } = useSelector(state => state.app.buyInsurance)
  const step1Data = useSelector(state => state.app.buyInsurance.stepData['1'])
  const { capacityType, seats, loads } = useSelector(state => state.app.buyInsurance.stepData['1'])
  const MIN_PRICE_CAR_VATCHAT = 5000000
  const params = useParams()
  const dispatch = useDispatch()
  const insuranceCarGoods = contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key)
  const insuranceCarPeople = contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key)
  const insuranceMaterial = contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key)

  const stepData = {
    effectiveDateFrom: contract.insurances[0].startValueDate || '',
    grossTon: insuranceCarGoods?.count1 || '',
    numberInCar: insuranceCarPeople?.count1 || ''
  }

  useEffect(() => {
    dispatch(actionResetContractCompanyId())
  }, [])


  const onChangeEnableInsurance = (code, checked) => {
    const newContract = { ...contract }
    const insurance = newContract.insurances.find(item => item.insuranceCode === code)
    if (insurance) {
      insurance.isEnable = checked
    }
    const bhvc = newContract.insurances.find(insurance => insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key)
    const tnds = newContract.insurances.find(insurance => insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key)
    newContract.insurances.forEach(insurance => {
      if (insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN.key) {
        insurance.isEnable = tnds.isEnable ? insurance.isEnable : false
      } else if (insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
        || insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key) {
        insurance.isEnable = bhvc.isEnable || tnds.isEnable ? insurance.isEnable : false
      }
    })
    dispatch(actionSaveContract(newContract))
    if (type !== INSURANCE_TYPES.TD) {
      dispatch(actionCalculationInsuranceFee())
    }
  }

  const onChangeInsuranceValue = (code, value) => {
    let insurances = contract.insurances
    let foundIndex = insurances.findIndex(item => item.insuranceCode === code)
    insurances[foundIndex] = value
    const newContract = { ...contract, insurances }
    dispatch(actionSaveContract(newContract))
    if (type !== INSURANCE_TYPES.TD) {
      dispatch(actionCalculationInsuranceFee())
    }
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

  const minDate = new Date(contract.insurances[0].minStartValueDate)
  minDate.setHours(minDate.getHours(), minDate.getMinutes() - 1, minDate.getSeconds(), minDate.getMilliseconds())

  const validationSchema = Yup.object().shape({
    effectiveDateFrom: Yup.date().min(minDate).required(),
    numberInCar: Yup.number().required(insuranceCarPeople.isEnable && (capacityType === 'SEAT' || capacityType === 'ALL') ? 'Required' : '').max(seats).min(insuranceCarPeople.isEnable ? 1 : 0),
    grossTon: Yup.number().required(insuranceCarGoods.isEnable && (capacityType === 'LOAD' || capacityType === 'ALL') ? 'Required' : '').max(loads).min(0.1)
  })
  const miniumToCurrency = convertNumberToCurrency(MIN_PRICE_CAR_VATCHAT)
  const onSubmit = () => {   
    //check minium fee for month
    contract.insurances.forEach( async (_elt)=>{
      if (_elt.insuranceCode === 'CAR_VATCHAT') {
        const company = feeDetails.find((fee) => fee.isSelected)
        const res = await BuyInsuranceService.getConfigBHVC(company?.companyId)
        if (res.status === 200 && res.data !== '') {
          const valueFeeDurationChoose = company.totalFee/_elt.duration
          const miniumFeeOf12Month = res?.data?.minimumFee/12
          if (valueFeeDurationChoose < miniumFeeOf12Month && _elt.buyEnable) {
          BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.   minumOf12month`)}  values={{
            minimumFee : miniumToCurrency
          }} />)
          return
         }
        }
      }
    })
   
    if (feeDetails.length !== 0) {
      if (params.type === INSURANCE_TYPES.TD) {
        const feeDetail = feeDetails.find(item => item.isSelected)
        if (feeDetail?.actualFee === 0) {
          BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('insurance.noticeEnter1TypeInsurance')} />)
          return
        }
      }
      const insurance = contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key)
      if (insurance.isEnable) {
        const feeDetail = feeDetails.find(item => item.isSelected)
        if (feeDetail.details[INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key] <= MIN_PRICE_CAR_VATCHAT) {
          BaseAppUltils.toastError(<FormattedMessage
            id={getKeyLang('insurance.noticeInsuranceMaterialCarFeeMinimum')} />)
          return
        }
        if (step1Data.transferBeneficiariesEnabled) {
          let customer = {
            address: step1Data.transferBankAddress,
            branchName: step1Data.transferBankBranch,
            fullName: step1Data.transferBankName,
            type: 'BANK'
          }
          let transferBeneficiariesData = {
            benefitValue: step1Data.transferBeneficiariesLevel ? step1Data.transferBeneficiariesLevel.replace(/[^\d]/g, '') : undefined,
            id: contract.id,
            ownerId: contract.ownerId
          }
          dispatch(actionCarNextStep3(customer, transferBeneficiariesData))
        } else dispatch(actionCarNextStep3())
      } else {
        dispatch(actionCarNextStep3())
      }
    }
  }

  return (
    <Formik initialValues={stepData} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
      {
        ({ errors, setFieldError, setFieldTouched, submitForm, validateForm }) => (
          <>
            {params.type !== INSURANCE_TYPES.TD ?
              <div className='duration-of-insurance'>
                <DurationOfInsurance
                  setFieldError={setFieldError}
                  setFieldTouched={setFieldTouched}
                  insurance={contract.insurances[0]}
                  onChangeEffectiveDateFrom={onChangeEffectiveDateFrom} />
              </div>
              : null}
            {
              <>
                {
                  // BẢO HIỂM BẮT BUỘC TNDS XE Ô TÔ
                  params.type === INSURANCE_TYPES.TD ? (
                    <div>
                      <InsuranceDurationEditable setFieldError={setFieldError}
                                                 setFieldTouched={setFieldTouched}
                                                 insuranceCode={INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key}
                                                 onChangeEnableInsurance={onChangeEnableInsurance} />
                    </div>

                  ) : null
                }
                {
                  // BẢO HIỂM TRÁCH NHIỆM DÂN SỰ TỰ NGUYỆN XE ÔTÔ
                  params.type !== INSURANCE_TYPES.BHVC ?
                    <div className='mt-4'>
                      <InsuranceTNDSTN
                        onChangeEnableInsurance={onChangeEnableInsurance}
                      />
                    </div> : null
                }
                {
                  // BẢO HIỂM VẬT CHẤT XE Ô TÔ
                  params.type === INSURANCE_TYPES.TD ? (
                    <div className='mt-4'>
                      <InsuranceDurationEditable setFieldError={setFieldError}
                                                 setFieldTouched={setFieldTouched}
                                                 insuranceCode={INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key}
                                                 onChangeEnableInsurance={onChangeEnableInsurance} />
                    </div>
                  ) : null
                }
                {/*Điều khoản bổ sung*/}
                {
                  (params.type !== INSURANCE_TYPES.TNDS && insuranceMaterial?.isEnable) ? (<AdditionalTerms />) : null
                }
                {
                  (capacityType === 'SEAT' || capacityType === 'ALL') ? (
                    <div className='mt-4'>
                      <InsuranceCarPeople insurances={contract.insurances}
                                          seats={seats}
                                          onChangeEnableInsurance={onChangeEnableInsurance}
                                          onChangeInsuranceValue={onChangeInsuranceValue} />
                    </div>
                  ) : null
                }
                {
                  (capacityType === 'LOAD' || capacityType === 'ALL') ? (
                    <div className='mt-4'>
                      <InsuranceCarGoods insurances={contract.insurances}
                                         loads={loads}
                                         onChangeEnableInsurance={onChangeEnableInsurance}
                                         onChangeInsuranceValue={onChangeInsuranceValue} />
                    </div>
                  ) : null
                }
              </>
            }
            <div className='mt-4'>
              <PaymentMethods />
            </div>

            <CompanySelection validateForm={validateForm} />
            <StepFooter errors={errors} onClickNext={() => submitForm().then()} />
          </>
        )
      }
    </Formik>
  )
}

export default CarStep2
