import React, { useEffect, useState } from 'react'
import {
  BaseAppConfigs,
  BaseFormDatePicker,
  BaseFormGroup,
  BaseFormGroupSelect,
  FormattedMessage, Radio,
  useCityList, useDistrictList, useWardList
} from 'base-app'
import {
  getKeyLang,
  INSURANCE_TYPES,
  ISSUE_PLACE_OPTIONS,
  VEHICLE_STATUS_OPTIONS,
  VEHICLE_USES_OPTIONS
} from '../../../../../configs/elite-app'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import { Utils } from '../../../../../ultity'
import { BuyInsuranceService } from '../../../../../services/elite-app/buyInsurance'
import * as Yup from 'yup'
import {
  actionSaveStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import CurrencyInput from '../../../../../components/elite-app/input/CurrencyInput'
import * as moment from 'moment'
import { useParams } from 'react-router-dom'
import { StepFooter } from '../../StepFooter'
import TransferBeneficiaries from './TransferBeneficiaries'
import UploadFileOCR from '../../UploadFileOCR'
import '../../../../../assets/scss/elite-app/buy-insurance/car/step1/car-step1.scss'
import Toggle from 'react-toggle'
import { actionCarNextStep2 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useIntl } from 'react-intl'

const MAX_INIT_VALUE = 8000000000

const CarStep1 = () => {
 const intl = useIntl()
  const params = useParams()
  const stepData = useSelector(state => state.app.buyInsurance.stepData['1'] || {
    vehicleStatus: '',
    contractType: 'CC',
    isRegistered: false,
    numberPlate: '',
    ownerName: '',
    district: '',
    city: '',
    ward: '',
    email: '',
    address: '',
    phoneNumber: '',
    frameNo: '',
    machineNo: '',
    name: '',
    vehicleType: '',
    manufacturerName: '',
    usage: '',
    brandName: '',
    initValue: '',
    capacityType: 'ALL',
    loads: '',
    seats: '',
    requireVehicle: '',
    issDate: '',
    issPlace: '',
    transferBeneficiariesEnabled: false,
    transferBankName: '',
    transferBankBranch: '',
    transferBankAddress: '',
    transferBeneficiariesLevel: ''
  })

  const dispatch = useDispatch()
  const [carTypeOptions, setCarTypeOptions] = useState([])
  const [vehicleUsesOptions, setVehicleUsesOptions] = useState([...VEHICLE_USES_OPTIONS])
  const [carManufacturers, setCarManufacturers] = useState([])
  const [manufacturesOptions, setManufacturerOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [carInfoCCCD, setCarInfoCCCD] = useState(false)
  const [ownerInfoCCCD, setOwnerInfoCCCD] = useState(false)
  const [minSeat, setMinSeat] = useState(0)
  const [minLoad, setMinLoad] = useState(0)
  const [maxSeat, setMaxSeat] = useState(60)
  const [maxLoad, setMaxLoad] = useState(60)
  const [inonType, setInonType] = useState(stepData.inonType || 'XKKD')
  const [businessStatus, setBusinessStatus] = useState(stepData.businessStatus || 'KKD')
  // start - upload file - display or hide
  const [uploadVehicleFile, setUploadVehicleFile] = useState(false)
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
  // end - upload file - display or hide
  // true after the first form submission
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const { cities } = useCityList(BaseAppConfigs.VN_COUNTRY_CODE)
  const { districts, loadDitrictsByCity } = useDistrictList(null)
  const { wards, loadWardsByDistrict } = useWardList(null)

  useEffect(() => {
    const loadCarTypeOptions = async () => {
      const res = await BuyInsuranceService.getCarVehicleOptions()
      if (res.status === 200) {
        let list = res.data.map((item, i) => ({
          value: item.id,
          label: item.name,
          businessStatus: item.businessStatus,
          capacityType: item.capacityType,
          code: item.code
        }))
        setCarTypeOptions(list)
      }
    }
    const loadCarManufacturers = async () => {
      const res = await BuyInsuranceService.getCarManufacturers()
      if (res.status === 200) {
        setCarManufacturers(res.data)
        setManufacturerOptions(res.data.map(item => ({ label: item.name, value: item.name })))
        const carManufacturer = res.data.find(item => item.name === stepData.manufacturerName) || {}
        const options = (carManufacturer.brands || []).map(item => ({ label: item.brand, value: item.brand }))
        setBrandOptions(options)
      }
    }

    loadCarTypeOptions().then()
    loadCarManufacturers().then()
    if (stepData.city) {
      loadDitrictsByCity(stepData.city).then()
      loadWardsByDistrict(stepData.district).then()
      // userDetails.userType = user.userType
    }

  }, [])

  useEffect(() => {
    const formData = {
      inonType,
      businessStatus
    }
    const loadMinMaxSeatAndLoadVehicleType = async () => {
      const res = await BuyInsuranceService.getMinMaxSeatLoadVehicleType(formData)
      if (res.status === 200) {
        setMinSeat(res.data.minSeats)
        setMinLoad(res.data.minLoads)
        setMaxSeat(res.data.maxSeats)
        setMaxLoad(res.data.maxLoads)
      }
    }
    loadMinMaxSeatAndLoadVehicleType().then()
  }, [inonType])

  const onChangeNumberPlate = (e, form) => {
    form.setFieldValue('numberPlate', Utils.removeSpecialCharNumberPlate(e.target.value))
  }

  const onChangeCarTypeOptions = (e, form) => {

    setTimeout(() => {
      form.setFieldValue('capacityType', e.capacityType)
      let options = [...VEHICLE_USES_OPTIONS]
      if (e.businessStatus === 'KD') {
        options = [...VEHICLE_USES_OPTIONS.filter(item => item.value === 'KD')]
        setBusinessStatus('KD')
        setInonType(e.code)
      } else if (e.businessStatus === 'KKD') {
        options = [...VEHICLE_USES_OPTIONS.filter(item => item.value === 'KKD')]
        setBusinessStatus('KKD')
        setInonType(e.code)
      } else {
        setBusinessStatus('A')
        setInonType(e.code)
      }
      const item = options.find(item => item.value === form.values.usage.value)
      if (item) {
        form.setFieldValue('usage', item)
      }
      setVehicleUsesOptions(options)
    }, 500)
  }

  const onChangeIssuePlace = ({ value }, setFieldValue, values) => {
    if (value === 'IMPORT') {
      setFieldValue(`issDate`, moment(values.issDate, 'YYYY-MM-DD').format('YYYY') + '-01-01')
    }
  }

  const onChangeIssueDate = (date, setFieldValue, values) => {
    if (values['issPlace'] === 'IMPORT') {
      setFieldValue(`issDate`, moment(date[0], 'YYYY-MM-DD').format('YYYY') + '-01-01')
    } else {
      setFieldValue(`issDate`, moment(date[0], 'YYYY-MM-DD').format('YYYY-MM-DD'))
    }
  }

  const onChangeInitValue = (e, form) => {
    if (+e.target.value.replace(/[^\d]/g, '') >= MAX_INIT_VALUE) {
      form.setFieldValue('initValue', MAX_INIT_VALUE)
    } else {
      form.setFieldValue('initValue', e.target.value)
    }
  }

  const onChangeRequireVehicle = (e, form) => {
    const { value } = e.target
    const initValue = Number(form.values.initValue.replaceAll(',', ''))
    const requireVehicle = Number(value.replaceAll(',', ''))
    if (requireVehicle > initValue) {
      form.setFieldValue('requireVehicle', form.values.initValue)
    } else {
      form.setFieldValue('requireVehicle', e.target.value)
    }
  }

  const onBlurInitValue = (form) => {
    form.setFieldValue('requireVehicle', form.values.initValue)
  }

  const onClickSubmit = (values) => {
    const city = cities.find(item => item.value === values.city)
    if (city) {
      values.cityName = city.label
    }
    const district = districts.find(item => item.value === values.district)
    if (district) {
      values.districtName = district.label
    }
    const ward = wards.find(item => item.value === values.ward)
    if (ward) {
      values.wardName = ward.label
    }
    values.inonType = inonType
    values.businessStatus = businessStatus
    dispatch(actionSaveStepData(1, values))
    dispatch(actionCarNextStep2(values))
  }

  const onChangeCarManufacturer = ({ value }, form) => {
    const carManufacturer = carManufacturers.find(item => item.name === value) || {}
    const options = (carManufacturer.brands || []).map(item => ({ label: item.brand, value: item.brand }))
    setBrandOptions(options)
    form.setFieldValue('brandName', options.find(item => item.value === form.values.brandName) || '')
  }

  const onChangeCity = async (id, label, setFieldValue) => {
    setTimeout(() => {
      loadDitrictsByCity(id).then()
      setFieldValue('district', '')
    }, 500)
  }

  const onChangeDistrict = async (id, label, setFieldValue) => {
    setTimeout(() => {
      loadWardsByDistrict(id).then()
      setFieldValue('ward', '')
    }, 500)
  }

  const setUploadVehicleOrNot = () => {
    setUploadVehicleFile(!uploadVehicleFile)
  }

  const setUploadIdentifyOrNot = () => {
    setUploadIdentifyFile(!uploadIdentifyFile)
  }

  const validationSchema = Yup.object().shape({
    vehicleStatus: Yup.string().required(params.type !== INSURANCE_TYPES.TNDS ? 'Required' : ''),
    vehicleType: Yup.string().required(),
    brandName: Yup.string().required('Required'),
    ownerName: Yup.string().required(),
    phoneNumber: Yup.string().required().matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
    email: Yup.string().required().email(),
    city: Yup.string().nullable().notRequired().when('address', {
      is: value => !value?.length,
      then: Yup.string().required()
    }),
    district: Yup.string().nullable().notRequired().when('address', {
      is: value => !value?.length,
      then: Yup.string().required()
    }),
    ward: Yup.string().nullable().notRequired().when('address', {
      is: value => !value?.length,
      then: Yup.string().required()
    }),
    manufacturerName: Yup.string().required('Required'),
    numberPlate: Yup.string().when('isRegistered', {
      is: false,
      then: Yup.string().required()
    }),
    frameNo: Yup.string().when('isRegistered', {
      is: true,
      then: Yup.string().min(6, 'Must be 6 characters or than').required('Required')
    }),
    machineNo: Yup.string().when('isRegistered', {
      is: true,
      then: Yup.string().min(6, 'Must be 6 characters or than').required()
    }),
    usage: Yup.string()
      .required('Required'),
    issPlace: Yup.string()
      .required(params.type !== INSURANCE_TYPES.TNDS ? 'Required' : ''),
    issDate: Yup.string()
      .required(params.type !== INSURANCE_TYPES.TNDS ? 'Required' : ''),
    initValue: Yup.string()
      .required(params.type !== INSURANCE_TYPES.TNDS ? 'Required' : ''),
    requireVehicle: Yup.string()
      .required(params.type !== INSURANCE_TYPES.TNDS ? 'Required' : ''),
    seats: Yup.number().when('capacityType', {
      is: 'SEAT',
      then: Yup.number().max(maxSeat,
        <FormattedMessage
          id={getKeyLang('insurance.seatsMaxMinNotice')}
          values={{
            minSeat,
            maxSeat
          }}
        />)
        .min(minSeat,
          <FormattedMessage
            id={getKeyLang('insurance.seatsMaxMinNotice')}
            values={{
              minSeat,
              maxSeat
            }}
          />)
        .required(' ')
    }).when('capacityType', {
      is: 'ALL',
      then: Yup.number().max(maxSeat,
        <FormattedMessage
          id={getKeyLang('insurance.seatsMaxMinNotice')}
          values={{
            minSeat,
            maxSeat
          }}
        />)
        .min(minSeat,
          <FormattedMessage
            id={getKeyLang('insurance.seatsMaxMinNotice')}
            values={{
              minSeat,
              maxSeat
            }}
          />)
        .required(' ')
    }),
    loads: Yup.number().when('capacityType', {
      is: 'LOAD',
      then: Yup.number().max(maxLoad,
        <FormattedMessage
          id={getKeyLang('insurance.loadsMaxMinNotice')}
          values={{
            minLoad,
            maxLoad
          }}
        />)
        .min(minLoad,
          <FormattedMessage
            id={getKeyLang('insurance.loadsMaxMinNotice')}
            values={{
              minLoad,
              maxLoad
            }}
          />)
        .required(' ')
    }).when('capacityType', {
      is: 'ALL',
      then: Yup.number().max(maxLoad,
        <FormattedMessage
          id={getKeyLang('insurance.loadsMaxMinNotice')}
          values={{
            minLoad,
            maxLoad
          }}
        />)
        .min(minLoad,
          <FormattedMessage
            id={getKeyLang('insurance.loadsMaxMinNotice')}
            values={{
              minLoad,
              maxLoad
            }}
          />)
        .required(' ')
    }),
    transferBankName: Yup.string().when('transferBeneficiariesEnabled', {
      is: true,
      then: Yup.string().required()
    }),
    transferBankBranch: Yup.string().when('transferBeneficiariesEnabled', {
      is: true,
      then: Yup.string().required()
    }),
    transferBankAddress: Yup.string().when('transferBeneficiariesEnabled', {
      is: true,
      then: Yup.string().required()
    }),
    transferBeneficiariesLevel: Yup.string().when('transferBeneficiariesEnabled', {
      is: true,
      then: Yup.string().required()
    })
  })

  return <div>
    <Formik initialValues={stepData} enableReinitialize validationSchema={validationSchema} onSubmit={onClickSubmit}
            validateOnChange={validateAfterSubmit} validateOnBlur={validateAfterSubmit}>
      {
        ({ values, errors, touched, handleChange, setFieldValue, setErrors, submitForm , getFieldMeta }) => (
          <Form className='car-step1'>
            {/*Car Information*/}

            <div className='register-license-plate'>
              <FormattedMessage id={getKeyLang('insurance.registerNumberPlateOrNot')} />
            </div>
            <div className='d-flex'>
              <div className='registered'>
                <Field>
                  {({ form }) => (
                    <>
                      <Radio
                        checked={!values.isRegistered}
                        label={<FormattedMessage id={getKeyLang('insurance.registered')} />}
                        onChange={(e) => {
                          form.setFieldValue('isRegistered', false)
                        }}
                      />
                    </>
                  )
                  }
                </Field>
              </div>

              <div className='unregistered'>
                <Field>
                  {({ form }) => (
                    <>
                      <Radio
                        checked={values.isRegistered}
                        label={<FormattedMessage id={getKeyLang('insurance.unregistered')} />}
                        onChange={(e) => {
                          form.setFieldValue('isRegistered', true)
                        }}
                      />
                    </>
                  )
                  }
                </Field>
              </div>
            </div>

            <div className='vehicle-info d-flex justify-content-between align-items-center mt-3'>
              <div className='title-information'>
                <FormattedMessage id={getKeyLang('insurance.vehicleInformation')} />
              </div>

              <div className='d-flex align-items-center'>
                <div className='mr-1 scan'>
                <FormattedMessage id={getKeyLang('insurance.uploadVehicleInfo')} /> 
                </div>
                <Toggle icons={false} checked={carInfoCCCD} onChange={() => setCarInfoCCCD(!carInfoCCCD)} />
              </div>
            </div>

            {carInfoCCCD ? <div className='mt-3'>
              {/*Upload Vehicle Registration*/}
              <UploadFileOCR values={values} type='vehicleRegistrationFile' carManufacturers={carManufacturers}
                             setBrandOptions={setBrandOptions} setUploadVehicleOrNot={setUploadVehicleOrNot} />
              <UploadFileOCR values={values} type='vehicleInspectionFile' carManufacturers={carManufacturers}
                             setBrandOptions={setBrandOptions}
                             setUploadVehicleOrNot={setUploadVehicleOrNot} /></div> : null}


            <div className='mt-3'><Row>
              {
                params.type !== INSURANCE_TYPES.TNDS &&
                <Col xs={12} md={4} className='mb-3'>
                  <BaseFormGroupSelect
                    touched={touched}
                    errors={errors}
                    isShowErrorMessage={false}
                    options={VEHICLE_STATUS_OPTIONS}
                    messageId={getKeyLang('insurance.vehicleStatus')}
                    fieldName='vehicleStatus'
                  />
                </Col>
              }
              <Col xs={12} md={!values.isRegistered? 6 : 4} className='mb-3'>
                {
                  !values.isRegistered ? (
                    <BaseFormGroup
                      touched={touched}
                      errors={errors}
                      isShowErrorMessage={false}
                      onChange={onChangeNumberPlate}
                      messageId={getKeyLang('insurance.numberPlate')}
                      fieldName='numberPlate'
                      maxLength='15'
                    />
                  ) : (
                    <>
                      <BaseFormGroup
                        touched={touched}
                        errors={errors}
                        isShowErrorMessage={false}
                        messageId={getKeyLang('insurance.frameNumber')}
                        fieldName='frameNo'
                        maxLength='30'
                        className='frame-number'
                      />
                    
                    </>
                  )
                }

              </Col>
              {
                 !values.isRegistered ? null :  <Col xs={12} md={4} className='mb-3'>
                 <BaseFormGroup
                       touched={touched}
                       errors={errors}
                       isShowErrorMessage={false}
                       messageId={getKeyLang('insurance.machineNumber')}
                       fieldName='machineNo'
                       maxLength='30'
                     />
               </Col>
               
              }
              <Col xs={12} md={!values.isRegistered? 6 : 4} className='mb-3'>
                <BaseFormGroupSelect
                  touched={touched}
                  errors={errors}
                  isShowErrorMessage={false}
                  options={carTypeOptions}
                  onChange={onChangeCarTypeOptions}
                  messageId={getKeyLang('insurance.vehicleType')}
                  fieldName='vehicleType'
                />
              </Col>
            </Row>
              {
                params.type !== INSURANCE_TYPES.TNDS ? (
                  <>
                    <Row>
                      <Col xs={12} md={4} className='mb-3'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={vehicleUsesOptions}
                          messageId={getKeyLang('insurance.uses')}
                          fieldName='usage'
                        />
                      </Col>
                      <Col xs={12} md={4} className='mb-3'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={manufacturesOptions}
                          onChange={onChangeCarManufacturer}
                          messageId={getKeyLang('insurance.carManufacturer')}
                          fieldName='manufacturerName'
                        />
                      </Col>
                      <Col xs={12} md={4} className='mb-3'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={brandOptions}
                          messageId={getKeyLang('insurance.brandName')}
                          fieldName='brandName'
                        />
                      </Col>
                    </Row>
                    <Row>
                      {
                        values.capacityType === 'SEAT' || values.capacityType === 'ALL' ? (
                          <Col xs={12} md={4} className='mb-3'>
                            <BaseFormGroup
                              touched={touched}
                              errors={errors}
                              isShowErrorMessage={true}
                              type='number'
                              messageId={getKeyLang('insurance.seats')}
                              fieldName='seats'
                            />
                          </Col>
                        ) : null
                      }
                      <Col xs={12} md={4} className='mb-3'>
                        <Field name='initValue'>
                          {
                            ({ field, form }) => (
                              <FormGroup className='form-label-group'>

                                <CurrencyInput id='initValue'
                                               className={`form-control form-label-group ${touched.initValue && errors.initValue && 'is-invalid'}`}
                                               placeholder={getKeyLang('insurance.initValue')}
                                               type='text'
                                               value={field.value}
                                               onChange={(e) => onChangeInitValue(e, form)}
                                               onBlur={() => onBlurInitValue(form)}
                                />
                                <Label> <FormattedMessage id={getKeyLang('insurance.initValue')} /> </Label>
                              </FormGroup>
                            )
                          }
                        </Field>
                      </Col>
                      <Col xs={12} md={4} className='mb-3'>
                        <Field name='requireVehicle'>
                          {
                            ({ field, form }) => (
                              <FormGroup className='form-label-group'>

                                <CurrencyInput id='requireVehicle'
                                               className={`form-control form-label-group ${touched.initValue && errors.initValue && 'is-invalid'}`}
                                               placeholder={getKeyLang('insurance.requireVehicle')}
                                               type='text'
                                               onChange={e => onChangeRequireVehicle(e, form)}
                                               value={field.value}
                                />
                                <Label> <FormattedMessage id={getKeyLang('insurance.requireVehicle')} /> </Label>
                              </FormGroup>
                            )
                          }
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      {
                        values.capacityType === 'LOAD' || values.capacityType === 'ALL' ? (
                          <Col xs={12} md={4} className='mb-3 mb-md-0'>
                            <BaseFormGroup
                              touched={touched}
                              errors={errors}
                              isShowErrorMessage={true}
                              type='number'
                              messageId={getKeyLang('insurance.loads')}
                              fieldName='loads'
                            />
                          </Col>
                        ) : null
                      }
                      <Col xs={12} md={4} className='mb-3 mb-md-0'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          onChange={(e) => onChangeIssuePlace(e, setFieldValue, values)}
                          options={ISSUE_PLACE_OPTIONS}
                          messageId={getKeyLang('insurance.issPlace')}
                          fieldName='issPlace'
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <BaseFormDatePicker
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={
                            {
                              dateFormat: 'Y-m-d',
                              maxDate: 'today'
                            }
                          }
                          onChange={(date, form) => onChangeIssueDate(date, setFieldValue, values)}
                          messageId={getKeyLang('insurance.issDate')}
                          fieldName='issDate'
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col xs={12} md={6} className='mb-3'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={manufacturesOptions}
                          onChange={onChangeCarManufacturer}
                          messageId={getKeyLang('insurance.carManufacturer')}
                          fieldName='manufacturerName'
                        />
                      </Col>
                      <Col xs={12} md={6} className='mb-3'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={brandOptions}
                          messageId={getKeyLang('insurance.brandName')}
                          fieldName='brandName'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={4} className='mb-3 mb-md-0'>
                        <BaseFormGroupSelect
                          touched={touched}
                          errors={errors}
                          isShowErrorMessage={false}
                          options={vehicleUsesOptions}
                          messageId={getKeyLang('insurance.uses')}
                          fieldName='usage'
                        />
                      </Col>
                      {
                        values.capacityType === 'SEAT' || values.capacityType === 'ALL' ? (
                          <Col xs={12} md={4} className='mb-3 mb-md-0'>
                            <BaseFormGroup
                              touched={touched}
                              errors={errors}
                              isShowErrorMessage={true}
                              type='number'
                              messageId={getKeyLang('insurance.seats')}
                              fieldName='seats'
                            />
                          </Col>
                        ) : null
                      }
                      {
                        values.capacityType === 'LOAD' || values.capacityType === 'ALL' ? (
                          <Col xs={12} md={4}>
                            <BaseFormGroup
                              touched={touched}
                              errors={errors}
                              isShowErrorMessage={true}
                              type='number'
                              messageId={getKeyLang('insurance.loads')}
                              fieldName='loads'
                            />
                          </Col>
                        ) : null
                      }
                    </Row>
                  </>
                )
              }</div>

            {/*Car Information*/}

            {/* Owner Information*/}
            <div className='owner-info d-flex justify-content-between align-items-center mt-4'>
              <div className='title-information'>
                <FormattedMessage id={getKeyLang('insurance.ownerInformation')} />
              </div>
              <div className='d-flex align-items-center'>
                <div className='mr-1 scan'>
                  <FormattedMessage id={getKeyLang('insurance.uploadIdentification')} />
                </div>
                <Toggle icons={false} checked={ownerInfoCCCD} onChange={() => setOwnerInfoCCCD(!ownerInfoCCCD)} />
              </div>

            </div>

            {ownerInfoCCCD ? <div className='mt-3'>
              <UploadFileOCR values={values} type='identificationFile' carManufacturers={carManufacturers}
                             setBrandOptions={setBrandOptions} setUploadIdentifyOrNot={setUploadIdentifyOrNot} />
            </div> : null}

            <Row className='mt-3'>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.contractInfo.fullName')}
                  fieldName='ownerName'
                  isShowErrorMessage={false}
                  errors={errors}
                  touched={touched}
                />
              </Col>
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
            <Row>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={values.address ? getKeyLang('insurance.city') : 'completeInformation.province'}
                  fieldName='city'
                  options={cities}
                  isShowErrorMessage={false}
                  onChange={({ id, label }) => onChangeCity(id, label, setFieldValue)}
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={values.address ? getKeyLang('insurance.district') : 'completeInformation.district'}
                  fieldName='district'
                  options={districts}
                  isShowErrorMessage={false}
                  onChange={({ id, label }) => onChangeDistrict(id, label, setFieldValue)}
                  errors={errors}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={values.address ? getKeyLang('insurance.ward') : 'completeInformation.ward'}
                  fieldName='ward'
                  options={wards}
                  isShowErrorMessage={false}
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm='12'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.owner.address')}
                  fieldName='address'
                  isShowErrorMessage={false}
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>

            {/* Owner Information*/}

            {params.type ? <TransferBeneficiaries type={params.type} errors={errors} touched={touched} values={values}
                                                  handleChange={handleChange}
                                                  transferBeneficiariesEnabled={stepData.transferBeneficiariesEnabled}
                                                  setErrors={setErrors} /> : null}
            <StepFooter errors={errors} onClickNext={() => {
              setValidateAfterSubmit(true)
              submitForm().then()
            }} />
          </Form>
        )
      }
    </Formik>
  </div>
}

export default CarStep1
