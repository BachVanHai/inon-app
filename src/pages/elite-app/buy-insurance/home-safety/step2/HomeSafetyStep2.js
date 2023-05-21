import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BaseAppConfigs,
  BaseFormGroup,
  BaseFormGroupSelect,
  Button,
  FormattedMessage,
  BaseFormDatePicker, BaseAppUltils
} from 'base-app'
import * as Yup from 'yup'
import { FieldArray, Form, Formik } from 'formik'
import { GENDERS, getKeyLang, IC_TYPES_OPTIONS, RELATIONSHIP_T0_HOUSE_HOLDER } from '../../../../../configs/elite-app'
import { Col, Row } from 'reactstrap'
import UploadFileOCR from '../../UploadFileOCR'
import '../../../../../assets/scss/elite-app/buy-insurance/home-safety/home-safety-step2.scss'
import { StepFooter } from '../../StepFooter'
import { actionHomeSafetyNextStep3 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomeSafetyInsurance'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import moment from 'moment'
import BuyInsurance from '../../BuyInsurance'
import { BuyInsuranceService } from '../../../../../services/elite-app/buyInsurance'

const INSURANCE_FORM = [
  {
    label: 'Tái tục',
    value: '1'
  },
  {
    label: 'Mua mới',
    value: '2'
  }
]

const HomeSafetyStep2 = () => {

  const insuredPersonInformation = {
    icType: '',
    icNo: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    id: 1,
    relationshipWithBuyer: ''
  }

  const stepData = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['2'] || {
        insuranceForm: '2',
        numberGCN: '',
        icType: '',
        icNo: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        id: 0,
        moreInsured: []
      }
  )

  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    insuranceForm: Yup.string().required(),
    numberGCN: Yup.string().nullable().notRequired().when('insuranceForm', {
      is: '1',
      then: Yup.string().required()
    }),
    icType: Yup.string().required(),
    icNo: Yup.string().required().when('icType', {
      is: 'CMND',
      then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX)
    }).when('icType', {
      is: 'CCCD',
      then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX)
    }).when('icType', {
      is: 'HOCHIEU',
      then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX)
    }),
    fullName: Yup.string().required(),
    dateOfBirth: Yup.string().required(),
    gender: Yup.string().required(),
    phoneNumber: Yup.string().required().matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
    email: Yup.string().required().email(),
    moreInsured: Yup.array().of(
      Yup.object().shape({
        icType: Yup.string().required(),
        icNo: Yup.string().required().when('icType', {
          is: 'CMND',
          then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX)
        }).when('icType', {
          is: 'CCCD',
          then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX)
        }).when('icType', {
          is: 'HOCHIEU',
          then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX)
        }),
        fullName: Yup.string().required(),
        dateOfBirth: Yup.string().required(),
        gender: Yup.string().required(),
        relationshipWithBuyer: Yup.string().required()
      })
    )
  })
  // true after the first form submission
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)

  const onChangeNumberGCN = () => {

  }

  const onClickSubmit = (values) => {
    dispatch(actionSaveStepData(2, values))
    dispatch(actionHomeSafetyNextStep3(values))
  }

  const onChangeStartDate = () => {

  }

  const setUploadIdentifyOrNot = () => {
    setUploadIdentifyFile(!uploadIdentifyFile)
  }

  const onClickNumberGCN = async (e, values, setFieldValue) => {
    e.preventDefault()
    const res = await BuyInsuranceService.getBeneficiaryByPrintedCertNo(values.numberGCN)
    if (res && res.status === 200) {
      if(res.data) {
        let beneficiaries = res.data.beneficiary
        const self = beneficiaries.find(item => item.relationship === 'SELF')
        setFieldValue('icType', self.icType)
        setFieldValue('icNo', self.icNo)
        setFieldValue('fullName', self.fullName)
        setFieldValue('dateOfBirth', self.dateOfBirth)
        setFieldValue('gender', self.gender)
        setFieldValue('phoneNumber', self.phoneNumber)
        setFieldValue('email', self.email)
        if (beneficiaries.length > 1) {
          beneficiaries = beneficiaries.filter(item => item.relationship !== 'SELF').map(item => {
            item.relationshipWithBuyer = item.relationship
            return item
          })
          setFieldValue('moreInsured', beneficiaries)
        }
      } else BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("insurance.homeSafety.invalidGCN")} />)
    }
  }

  useEffect(() => {

  }, [])

  return (
    <Formik initialValues={stepData} enableReinitialize validationSchema={validationSchema}
            onSubmit={(values) => onClickSubmit(values)} validateOnChange={validateAfterSubmit}
            validateOnBlur={validateAfterSubmit}>
      {
        ({ values, errors, touched, handleChange, setFieldValue, setErrors, submitForm }) => (
          <Form className='home-safety-step2-container'>
            <div className='insured-info-title'>
              <FormattedMessage id={getKeyLang('insurance.insuredPersonInformation')} />
            </div>
            <Row className='mt-3'>
              <Col xs={12} className='mb-3'>
                <BaseFormGroupSelect
                  messageId={getKeyLang('insurance.insuranceForm')}
                  fieldName='insuranceForm'
                  options={INSURANCE_FORM}
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
            </Row>

            {values.insuranceForm === '1' && (
              <Row>
                <Col xs={12} md={6} className='mb-3'>
                  <BaseFormGroup
                    messageId={getKeyLang('insurance.previousContractCertificateNumber')}
                    fieldName='numberGCN'
                    errors={errors}
                    touched={touched}
                    isShowErrorMessage={false}
                    onChange={onChangeNumberGCN}
                  />
                </Col>
                <Col xs={12} md={6} className='mb-3'>
                  <Button color='primary' onClick={(e) => onClickNumberGCN(e, values, setFieldValue)}><FormattedMessage
                    id={getKeyLang('insurance.homeSafety.check')} /></Button>
                </Col>
              </Row>
            )}

            <div className='title-information mb-2'>
              <FormattedMessage id={getKeyLang('insurance.houseHolderInformation')} />
            </div>

            <UploadFileOCR values={values} type='identificationFile' setUploadIdentifyOrNot={setUploadIdentifyOrNot} />
            <Row className='mt-3'>
              <Col xs={12} md={6} className='mb-3'>
                <BaseFormGroupSelect
                  messageId='completeInformation.idType'
                  fieldName='icType'
                  options={IC_TYPES_OPTIONS}
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
              <Col xs={12} md={6} className='mb-3'>
                <BaseFormGroup
                  messageId='completeInformation.nbrPer'
                  fieldName='icNo'
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4} className='mb-3'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.fullName')}
                  fieldName='fullName'
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
              <Col xs={12} md={4} className='mb-3'>
                <BaseFormDatePicker
                  options={{
                    maxDate: moment().subtract(1, 'y').format('YYYY-MM-DD 00:00:00'),
                    minDate: moment().subtract(65, 'y').format('YYYY-MM-DD 00:00:00'),
                    dateFormat: 'Y-m-d'
                  }}
                  messageId={getKeyLang('insurance.dateOfBirth')}
                  fieldName='dateOfBirth'
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
              <Col xs={12} md={4} className='mb-3'>
                <BaseFormGroupSelect
                  messageId={getKeyLang('insurance.gender')}
                  fieldName='gender'
                  options={GENDERS}
                  errors={errors}
                  touched={touched}
                  isShowErrorMessage={false}
                />
              </Col>
            </Row>
            <Row>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId='register.phoneNumber'
                  fieldName='phoneNumber'
                  isShowErrorMessage={false}
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId='register.email'
                  fieldName='email'
                  isShowErrorMessage={false}
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>
            <FieldArray name='moreInsured' render={arrayHelpers => (
              <div>
                {
                  values.moreInsured.map((item, index) => (
                    <div key={item.id}>
                      <Row>
                        <Col xs={12} className='mb-2'>
                          <UploadFileOCR stepData={values} values={item} type='identificationFile'
                                         setUploadIdentifyOrNot={setUploadIdentifyOrNot} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6} className='mb-3'>
                          <BaseFormGroupSelect
                            messageId='completeInformation.idType'
                            fieldName={`moreInsured.${index}.icType`}
                            options={IC_TYPES_OPTIONS}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false}
                          />
                        </Col>
                        <Col xs={12} md={6} className='mb-3'>
                          <BaseFormGroup
                            messageId='completeInformation.nbrPer'
                            fieldName={`moreInsured.${index}.icNo`}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={4} className='mb-3'>
                          <BaseFormGroup
                            messageId={getKeyLang('insurance.fullName')}
                            fieldName={`moreInsured.${index}.fullName`}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false}
                          />
                        </Col>
                        <Col xs={12} md={4} className='mb-3'>
                          <BaseFormDatePicker
                            messageId={getKeyLang('insurance.dateOfBirth')}
                            fieldName={`moreInsured.${index}.dateOfBirth`}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false}
                            options={
                              {
                                maxDate: moment().subtract(1, 'y').format('YYYY-MM-DD 00:00:00'),
                                minDate: moment().subtract(65, 'y').format('YYYY-MM-DD 00:00:00'),
                                dateFormat: 'Y-m-d'
                              }
                            }
                          />
                        </Col>
                        <Col xs={12} md={4} className='mb-3'>
                          <BaseFormGroupSelect
                            messageId={getKeyLang('insurance.gender')}
                            fieldName={`moreInsured.${index}.gender`}
                            options={GENDERS}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false}
                          />
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col xs={12}>
                          <BaseFormGroupSelect
                            messageId={getKeyLang('insurance.relationshipToHouseHolder')}
                            fieldName={`moreInsured.${index}.relationshipWithBuyer`}
                            options={RELATIONSHIP_T0_HOUSE_HOLDER}
                            errors={errors}
                            touched={touched}
                            isShowErrorMessage={false} />
                        </Col>
                      </Row>
                    </div>
                  ))
                }
                <Row className='mb-2 justify-content-end'>
                  <Col className='col-12 text-right'>
                    {
                      values.moreInsured.length > 0 && (
                        <Button className='mr-2' onClick={() => arrayHelpers.remove(values.moreInsured.length - 1)}>
                          <FormattedMessage id={getKeyLang('insurance.pendingContract.cancel')} />
                        </Button>
                      )
                    }
                    <Button onClick={() => {
                      arrayHelpers.push({ ...insuredPersonInformation, id: values.moreInsured.length + 1 })
                    }}>
                      <FormattedMessage id={getKeyLang('insurance.homeSafety.addPerson')} />
                    </Button>
                  </Col>
                </Row>
              </div>
            )
            } />

            <StepFooter errors={errors} onClickNext={() => {
              setValidateAfterSubmit(true)
              submitForm().then()
            }
            } />
          </Form>
        )
      }
    </Formik>
  )
}

export default HomeSafetyStep2
