import '../../../../../assets/scss/elite-app/buy-insurance/home-safety/home-safety-step3.scss'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import {
  actionSaveContract,
  actionSaveStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { actionHomeSafetyNextStep4 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomeSafetyInsurance'
import { Form, Formik } from 'formik'
import DurationOfInsurance from '../../DurationOfInsurance'
import PaymentMethods from '../../payment-method/PaymentMethods'
import { Checkbox, FormattedMessage } from 'base-app'
import { COMPANY_NAME, getKeyLang } from '../../../../../configs/elite-app'
import { Col, Row } from 'reactstrap'
import { StepFooter } from '../../StepFooter'
import { Utils, TextBreakable, getTotalFeeVAT, getRightPaymentVATFee } from '../../../../../ultity'
import { Check } from 'react-feather'
import { getAccepterms } from '../../BuyInsurance'
import { useIntl } from 'react-intl'

const HomeSafetyStep3 = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const { contract, feeDetails, paymentMethod } = useSelector(state => state.app.buyInsurance)
  const step1Data = useSelector(state => state.app.buyInsurance.stepData['1'])
  const step2Data = useSelector(state => state.app.buyInsurance.stepData['2'])
  let step3Data = useSelector(state => state.app.buyInsurance.stepData['3']) || {}
  step3Data.effectiveDateFrom = contract.insurances[0].startValueDate || ''
  const stepData = { ...step3Data }
  const [isAccepted, setIsAccepted] = useState(false)

  const validationSchema = Yup.object().shape({})

  const onClickSubmit = (values) => {
    dispatch(actionSaveStepData(3, values))
    dispatch(actionHomeSafetyNextStep4())
  }

  const paymentFee = React.useMemo(() => {
    const feeDetail = feeDetails.find(item => item.companyName === COMPANY_NAME.BSH)
    return getRightPaymentVATFee(paymentMethod, feeDetail)
  }, [paymentMethod, JSON.stringify(feeDetails)])

  const feeInsurance = React.useMemo(() => {
    const feeDetail = feeDetails.find(item => item.companyName === COMPANY_NAME.BSH)
    return feeDetail.feeInsurance
  }, [paymentMethod, JSON.stringify(feeDetails)])

  const TotalFeeVAT = React.useMemo(() => {
    const feeDetail = feeDetails.find(item => item.companyName === COMPANY_NAME.BSH)
    return getTotalFeeVAT(feeDetail, paymentMethod)
  }, [paymentMethod, JSON.stringify(feeDetails)])

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

  const toggleAccepted = () => {
    setIsAccepted(prevState => !prevState)
  }

  return (
    <Formik initialValues={stepData} enableReinitialize validationSchema={validationSchema} onSubmit={onClickSubmit}>
      {
        ({
          errors,
          setFieldTouched,
          setFieldError,
          submitForm
        }) => (
          <Form className='home-safety-step3-container'>

            <div className='d-flex contract-number'>
              <div className='mr-2'>
                <FormattedMessage id={getKeyLang('insurance.contractNumber')} />
              </div>
              <div>{contract.contractCode}</div>
            </div>

            <div >
              <DurationOfInsurance setFieldError={setFieldError} setFieldTouched={setFieldTouched}
                insurance={contract.insurances[0]}
                onChangeEffectiveDateFrom={onChangeEffectiveDateFrom} />
            </div>

            <div className='mt-3'>
              <PaymentMethods />
            </div>

            <div className='title-info mt-3'>
              <FormattedMessage
                id={getKeyLang('insurance.buyerInformation')} />
            </div>

            <Row>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage id={getKeyLang('insurance.fullName')} />
                </div>
                <div className='info-box'>
                  {step1Data?.ownerName}
                </div>
              </Col>

              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'><FormattedMessage id={getKeyLang('insurance.homeSafety.icNumber')} /></div>
                <div className='info-box'>
                  {step1Data?.icNo}
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'><FormattedMessage id={getKeyLang('insurance.homeSafety.phoneNumber')} />
                </div>
                <div className='info-box'>
                  {step1Data?.phoneNumber}
                </div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'><FormattedMessage id={getKeyLang('insurance.homeSafety.email')} /></div>
                <div className='info-box'>
                  <TextBreakable>
                    {step1Data?.email}
                  </TextBreakable>
                </div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'><FormattedMessage id={getKeyLang('insurance.owner.address')} /></div>
                <div className='info-box'>
                  {step1Data?.address || step1Data?.wardName + ', ' + step1Data?.districtName + ', ' + step1Data?.cityName}
                </div>
              </Col>
            </Row>

            <div className='title-info mt-3'>
              <FormattedMessage id={getKeyLang('insurance.homeSafety.insuranceInfo')} />
            </div>

            <Row>
              <Col className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage id={getKeyLang('insurance.homeSafety.customerName')} /> 1
                </div>
                <div className='info-box'>
                  {step2Data?.fullName}
                </div>
              </Col>
            </Row>
            {step2Data.moreInsured.map((item, index) => (
              <Row>
                <Col className='contract-info'>
                  <div className='info-label'><FormattedMessage
                    id={getKeyLang('insurance.homeSafety.customerName')} /> {index + 2}
                  </div>
                  <div className='info-box'>
                    {item?.fullName}
                  </div>
                </Col>
              </Row>
            ))}

            <div className='title-info mt-3 mb-2'>
              <FormattedMessage id={getKeyLang('insurance.paymentDetail')} />
            </div>

            <div className='payment-content'>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.insuranceCompany')} />
                </div>
                <div className='mb-1 ml-1'>{feeDetails[0]?.companyName}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.homeSafety.insuranceMoney')} />
                </div>
                <div className='mb-1 ml-1'>{Utils.numberFormat(contract?.insuranceMoney * 1000000)}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.homeSafety.numberOfInsured')} />
                </div>
                <div className='mb-1 ml-1'>{step2Data?.moreInsured?.length + 1}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.homeSafety.homeSafetyInsuranceFee')} />
                </div>
                <div className='mb-1 ml-1'>{Utils.numberFormat(feeInsurance)}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.fee.service')} />
                </div>
                <div className='mb-1 ml-1'>{Utils.numberFormat(paymentFee || 0)}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='payment-content-label'>
                  <FormattedMessage id={getKeyLang('insurance.fee.promote')} />
                </div>
                <div className='mb-1 ml-1'>0</div>
              </div>
            </div>

            <div className='total-fee'>
              <div className='total-fee-title'>
                <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
              </div>
              <div className='total-fee-content'>
                {Utils.numberFormat(TotalFeeVAT)}
              </div>
            </div>

            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                icon={<Check className='vx-icon' size={16} />}
                onChange={toggleAccepted}
              />
              <div>
                {
                  getAccepterms(intl)
                }
              </div>

            </div>
            <StepFooter disabled={!isAccepted} errors={errors} onClickNext={() => submitForm().then()} />
          </Form>
        )
      }
    </Formik>
  )
}

export default HomeSafetyStep3
