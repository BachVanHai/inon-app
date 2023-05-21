import {
  BaseAppConfigs,
  BaseAppUltils,
  BaseFormDatePicker,
  BaseFormGroup,
  BaseFormGroupSelect,
  Button,
  FormattedMessage
} from 'base-app'
import { FieldArray, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import * as Yup from 'yup'
import {
  BUYER_RELATIONSHIP,
  BUYER_RELATIONSHIP_NOT_SELF,
  getKeyLang,
  IC_TYPES_OPTIONS,
  RELATIONSHIP_TO_ENTERPRISE
} from '../../../../../configs/elite-app'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { actionVtaNextStep2 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVtaInsurance'
import { StepFooter } from '../../StepFooter'
import UploadFileOCR from '../../UploadFileOCR'
import { BT, currentDateFourteenYear } from '../utility'
import Address from './Address'

const IC_TYPES_OPTIONS_VTA = [
  { value: 'HOCHIEU', label: <FormattedMessage id='common.icType.passport' /> },
  {
    value: 'CMND',
    label: <FormattedMessage id='common.icType.personalID' />
  },
  {
    value: 'CCCD',
    label: <FormattedMessage id='common.icType.citizenIdentify' />
  },
  {
    value: 'MST',
    label: <FormattedMessage id={getKeyLang('insurance.vta.icType.MST')} />
  }
]

const VtaStep1 = () => {
  const [checkQueryStatus, setCheckQueryStatus] = useState(false)
  const useQuery = () => {
    return new URLSearchParams(window.location.search)
  }
  let query = useQuery()
  const evoucherQuery = query.get('evoucher')
  const dispatch = useDispatch()
  const { contract } = useSelector((state) => state.app.buyInsurance)
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
  // true after the first form submission
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const insuredPersonInformation = {
    id: 1,
    icType: '',
    icNo: '',
    fullName: '',
    dateOfBirth: moment().subtract(14, 'years').format('YYYY-MM-DD').toString(),
    gender: 'MALE',
    phoneNumber: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    cityName: '',
    districtName: '',
    wardName: '',
    address: '',
    buyerRelation: '',
    packageName: contract?.packageName || 'GOI3',
    duration: contract?.duration || 6
  }

  const initialData = {
    id: 0,
    icType: '',
    icNo: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    cityName: '',
    districtName: '',
    wardName: '',
    address: '',
    insuranceType: 'PERSONAL',
    moreInsured: [insuredPersonInformation]
  }

  const stepData = useSelector(
    (state) => state.app.buyInsurance.stepData['1'] || initialData
  )
  const [icTypeSelect, setIcTypeSelect] = useState(
    stepData ? stepData?.icType : ''
  )
  const validationSchema = Yup.object().shape({
    icType: Yup.string().required('required'),
    icNo: Yup.string()
      .required()
      .when('icType', {
        is: 'CMND',
        then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX)
      })
      .when('icType', {
        is: 'CCCD',
        then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX)
      })
      .when('icType', {
        is: 'HC',
        then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX)
      }),
    fullName: Yup.string().required('required'),
    phoneNumber: Yup.string().required().matches(BaseAppConfigs.PHONE_REGEX),
    email: Yup.string().required().email(),
    address: Yup.string().required(),
    city: Yup.string()
      .nullable()
      .notRequired()
      .when('address', {
        is: (value) => !value?.length,
        then: Yup.string().required()
      }),
    district: Yup.string()
      .nullable()
      .notRequired()
      .when('address', {
        is: (value) => !value?.length,
        then: Yup.string().required()
      }),
    ward: Yup.string()
      .nullable()
      .notRequired()
      .when('address', {
        is: (value) => !value?.length,
        then: Yup.string().required()
      }),
    insuranceType: Yup.string().required(),
    moreInsured: Yup.array().of(
      Yup.object().shape({
        icType: Yup.string().when('dateOfBirth', {
          is: (value) =>
            moment(value).isAfter(moment().subtract(14, 'y')) && value?.length,
          then: Yup.string().nullable().notRequired(),
          otherwise: Yup.string().required()
        }),
        icNo: Yup.string()
          .when('dateOfBirth', {
            is: (value) =>
              moment(value).isAfter(moment().subtract(14, 'y')) &&
              value?.length,
            then: Yup.string().nullable().notRequired(),
            otherwise: Yup.string().required()
          })
          .when('icType', {
            is: 'CMND',
            then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX)
          })
          .when('icType', {
            is: 'CCCD',
            then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX)
          })
          .when('icType', {
            is: 'HC',
            then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX)
          }),
        fullName: Yup.string().required('required'),
        dateOfBirth: Yup.string().required(),
        gender: Yup.string().required(),
        buyerRelation: Yup.string().when('icType', {
          is: () => icTypeSelect === 'MST',
          then: Yup.string().notRequired(),
          otherwise: Yup.string().required()
        }),
        packageName: Yup.string().required(),
        duration: Yup.string().required()
      })
    )
  })

  useEffect(() => {
    if (evoucherQuery !== null) {
      setCheckQueryStatus(true)
    }
  }, [])

  const onClickSubmit = (values) => {
    const moreInsured = values.moreInsured.map((item) => item.buyerRelation)
    const moreInsuredSet = moreInsured.filter((item) => item === 'BT')

    if (moreInsuredSet.length <= 1) {
      dispatch(actionSaveStepData(1, values))
      dispatch(actionVtaNextStep2(values))
    } else {
      BaseAppUltils.toastError(
        <FormattedMessage
          id={getKeyLang('insurance.vta.noticeEnterRightInfo')}
        />
      )
    }
  }

  const setUploadIdentifyOrNot = () => {
    setUploadIdentifyFile(!uploadIdentifyFile)
  }

  const addPerson = (setFieldValue, values, getFieldMeta) => {
    const moreInsured = values.moreInsured
    const id = values.moreInsured.length + 1
    moreInsured.push({ ...insuredPersonInformation, id })
    setFieldValue('moreInsured', moreInsured)
    // if icTypeSelect === MST =>  set value buyerRelation = DN
    if (getFieldMeta('icType').value === 'MST') {
      values.moreInsured.map((item, index) => {
        setFieldValue(`moreInsured[${index}].buyerRelation`, 'DN')
      })
    }
    // if moreInsured.length > 1 => return PERSONAL
    if (getFieldMeta('moreInsured').value.length > 1) {
      setFieldValue('insuranceType', 'ENTERPRISE')
    } else {
      setFieldValue('insuranceType', 'PERSONAL')
    }
  }

  const subtractPerson = (setFieldValue, values, getFieldMeta) => {
    let moreInsured = values.moreInsured
    moreInsured.pop()
    setFieldValue('moreInsured', moreInsured)
    if (getFieldMeta('moreInsured').value.length > 1) {
      setFieldValue('insuranceType', 'ENTERPRISE')
    } else {
      setFieldValue('insuranceType', 'PERSONAL')
    }
  }
  const onChangeBuyerRelationship = (
    { value },
    values,
    index,
    setFieldValue
  ) => {
    if (value === 'BT') {
      const buyerInfo = { ...values }
      Object.keys(values.moreInsured[index]).forEach((item) => {
        if (buyerInfo[item]) {
          setFieldValue(`moreInsured[${index}].${item}`, buyerInfo[item])
        }
      })
    }
  }

  const handleChangeIcType = ({ value }, values, setFieldValue) => {
    setIcTypeSelect(value)
    if (value === 'MST') {
      values.moreInsured.map((item, index) => {
        setFieldValue(`moreInsured[${index}].buyerRelation`, 'DN')
      })
    } else {
      values.moreInsured.map((item, index) => {
        setFieldValue(`moreInsured[${index}].buyerRelation`, '')
      })
    }
  }

  const handleChangeBirthday = (date, values, setFieldValue) => {
    const birthdayConvert = moment(date[0]).format('YYYY-MM-DD');
    // if birthdaY > 14 year => set value  ictype = KHAC || else set value  ictype = ''
    if (currentDateFourteenYear < birthdayConvert) {
      values.moreInsured.map((item, index) => {
        setFieldValue(`moreInsured[${index}].icType`, null)
      })
    }
    else{
      values.moreInsured.map((item, index) => {
        setFieldValue(`moreInsured[${index}].icType`, '')
      })
    }
  }
  return (
    <Formik
      initialValues={stepData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onClickSubmit}
      validateOnChange={validateAfterSubmit}
      validateOnBlur={validateAfterSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        setErrors,
        submitForm,
        getFieldMeta,
        initialValues
      }) => (
        <Form>
          {/* =========================start============================= */}
          <div className='buyer-info-title mt-1'>
            <FormattedMessage id={getKeyLang('insurance.buyerInformation')} />
          </div>

          <Row className='mt-2 mb-3'>
            <Col xs={12}>
              <UploadFileOCR
                values={values}
                type='identificationFile'
                setUploadIdentifyOrNot={setUploadIdentifyOrNot}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} className='mb-3'>
              <BaseFormGroupSelect
                messageId={getKeyLang(
                  'insurance.vta.step1.select.typeOfIdentificationDocument'
                )}
                fieldName='icType'
                options={IC_TYPES_OPTIONS_VTA}
                errors={errors}
                touched={touched}
                isShowErrorMessage={false}
                onChange={(value) =>
                  handleChangeIcType(value, values, setFieldValue)
                }
              />
            </Col>
            <Col xs={12} md={6} className='mb-3'>
              <BaseFormGroup
                messageId={getKeyLang('insurance.vta.icType.icNo')}
                fieldName='icNo'
                errors={errors}
                touched={touched}
                isShowErrorMessage={false}
              />
            </Col>
          </Row>
          {getFieldMeta('icType').value !== '' ? (
            <>
              <Row>
                <Col sm='12' md='4' className='mb-3'>
                  <BaseFormGroup
                    messageId={getKeyLang('insurance.vta.fullName')}
                    fieldName='fullName'
                    isShowErrorMessage={false}
                    errors={errors}
                    touched={touched}
                  />
                </Col>
                <Col sm='12' md='4' className='mb-3'>
                  <BaseFormGroup
                    messageId={getKeyLang('insurance.invoice.phoneNumber')}
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

              <Address
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                address='address'
                city='city'
                district='district'
                ward='ward'
                item={values}
                cityName='cityName'
                districtName='districtName'
                wardName='wardName'
              />
              <Row className='mb-3'>
                <Col sm='12'>
                  <BaseFormGroup
                    messageId={`${getKeyLang('insurance.vta.step1.address')}`}
                    fieldName='address'
                    isShowErrorMessage={false}
                    errors={errors}
                    touched={touched}
                  />
                </Col>
              </Row>
            </>
          ) : null}

          {/* ===================end ====================== */}

          <div className='buyer-info-title'>
            <FormattedMessage
              id={getKeyLang('insurance.insuredPersonInformation')}
            />
          </div>
          <div className='warning pl-1 text-italic'>
            <FormattedMessage
              id={getKeyLang('insurance.vta.participating.age')}
            />
          </div>
          <div className='warning pl-1 text-italic'>
            <FormattedMessage
              id={getKeyLang('insurance.vta.noNeedEnterIcNumber')}
            />
          </div>

          <FieldArray
            name='moreInsured'
            render={(arrayHelpers) => (
              <div>
                {values.moreInsured && values.moreInsured.length > 0
                  ? values.moreInsured.map((item, index) => (
                      <div key={item.id}>
                        <Row>
                          <Col sm='12' md='4' className='mt-1 mb-2'>
                            <h4 className='font-weight-bold success'>
                              <FormattedMessage
                                id={getKeyLang('insurance.vta.person')}
                              />
                              <span>{index + 1}</span>
                            </h4>
                            <div className='mt-2'>
                              <BaseFormGroupSelect
                                messageId={getKeyLang(
                                  'insurance.buyerRelationship'
                                )}
                                fieldName={`moreInsured.${index}.buyerRelation`}
                                onChange={(value) =>
                                  onChangeBuyerRelationship(
                                    value,
                                    values,
                                    index,
                                    setFieldValue
                                  )
                                }
                                options={
                                  index + 1 > 1 &&
                                  getFieldMeta('moreInsured').value[0]
                                    ?.buyerRelation === BT
                                    ? BUYER_RELATIONSHIP_NOT_SELF
                                    : getFieldMeta('icType').value === 'MST'
                                    ? RELATIONSHIP_TO_ENTERPRISE
                                    : BUYER_RELATIONSHIP
                                }
                                defaultValue={
                                  getFieldMeta('icType').value === 'MST'
                                    ? RELATIONSHIP_TO_ENTERPRISE[0]
                                    : null
                                }
                                disabled={
                                  getFieldMeta('icType').value === 'MST'
                                }
                                errors={errors}
                                touched={touched}
                                isShowErrorMessage={false}
                              />
                            </div>
                          </Col>
                        </Row>
                        {getFieldMeta(`moreInsured.${index}.buyerRelation`)
                          .value !== '' ||
                        getFieldMeta('icType').value === 'MST' ? (
                          <>
                            <Row className='mt-2 mb-3'>
                              <Col xs={12}>
                                <UploadFileOCR
                                  stepData={values}
                                  values={item}
                                  type='identificationFile'
                                  setUploadIdentifyOrNot={
                                    setUploadIdentifyOrNot
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={6} className='mb-3'>
                                <BaseFormGroupSelect
                                  messageId={getKeyLang(
                                    'insurance.vta.step1.select.typeOfIdentificationDocument'
                                  )}
                                  fieldName={`moreInsured.${index}.icType`}
                                  options={IC_TYPES_OPTIONS}
                                  errors={errors}
                                  touched={touched}
                                  isShowErrorMessage={false}
                                />
                              </Col>
                              <Col xs={12} md={6} className='mb-3'>
                                <BaseFormGroup
                                  messageId={getKeyLang(
                                    'insurance.vta.icType.icNo'
                                  )}
                                  fieldName={`moreInsured.${index}.icNo`}
                                  errors={errors}
                                  touched={touched}
                                  isShowErrorMessage={false}
                                />
                              </Col>
                            </Row>

                            <Row>
                              <Col sm='12' md='6' className='mb-3'>
                                <BaseFormGroup
                                  messageId={getKeyLang('insurance.fullName')}
                                  fieldName={`moreInsured.${index}.fullName`}
                                  isShowErrorMessage={false}
                                  errors={errors}
                                  touched={touched}
                                />
                              </Col>
                              <Col sm='12' md='6' className='mb-3'>
                                <BaseFormDatePicker
                                  options={{
                                    maxDate: moment(new Date()).format(
                                      'YYYY-MM-DD'
                                    ),
                                    minDate: moment()
                                      .subtract(70, 'y')
                                      .format('YYYY-MM-DD'),
                                    dateFormat: 'Y-m-d'
                                  }}
                                  messageId={getKeyLang(
                                    'insurance.dateOfBirth'
                                  )}
                                  fieldName={`moreInsured.${index}.dateOfBirth`}
                                  errors={errors}
                                  touched={touched}
                                  isShowErrorMessage={false}
                                  onChange={(date) => handleChangeBirthday(date , values, setFieldValue)}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm='12' md='6' className='mb-3'>
                                <BaseFormGroup
                                  messageId='register.phoneNumber'
                                  fieldName={`moreInsured.${index}.phoneNumber`}
                                  isShowErrorMessage={false}
                                  errors={errors}
                                  touched={touched}
                                />
                              </Col>
                              <Col sm='12' md='6' className='mb-3'>
                                <BaseFormGroup
                                  messageId={getKeyLang(
                                    'insurance.homeSafety.email'
                                  )}
                                  fieldName={`moreInsured.${index}.email`}
                                  isShowErrorMessage={false}
                                  errors={errors}
                                  touched={touched}
                                />
                              </Col>
                            </Row>
                          </>
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>
            )}
          />
          <Row className='mb-2 justify-content-end'>
            <Col className='col-12 text-right'>
              {values?.moreInsured?.length > 1 && (
                <Button
                  className='mr-2'
                  onClick={() => {
                    subtractPerson(setFieldValue, values, getFieldMeta)
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang('insurance.pendingContract.cancel')}
                  />
                </Button>
              )}

              <Button
                onClick={() => {
                  addPerson(setFieldValue, values, getFieldMeta)
                }}
              >
                <FormattedMessage
                  id={getKeyLang('insurance.homeSafety.addPerson')}
                />
              </Button>
            </Col>
          </Row>

          <StepFooter
            errors={errors}
            onClickNext={() => {
              setValidateAfterSubmit(true)
              submitForm().then()
            }}
          />
        </Form>
      )}
    </Formik>
  )
}

export default VtaStep1
