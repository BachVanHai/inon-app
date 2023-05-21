import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Check } from 'react-feather'
import { Row, Col } from 'reactstrap'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  BaseAppConfigs,
  BaseFormGroup,
  BaseFormGroupSelect,
  FormattedMessage,
  Radio,
  useCityList,
  useDistrictList,
  useWardList
} from 'base-app'
import {
  getKeyLang
} from '../../../../../configs/elite-app'
import {
  actionMotorNextStep2,
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { Utils } from '../../../../../ultity'
import { BuyInsuranceService } from '../../../../../services/elite-app/buyInsurance'
import { StepFooter } from '../../StepFooter'
import '../../../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import '../../../../../assets/scss/elite-app/buy-insurance/motor.scss'
import UploadFileOCR from '../../UploadFileOCR'
import Toggle from 'react-toggle'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const MotorStep1 = () => {
  const stepData = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['1'] || {
      contractType: 'MC',
      isRegistered: false,
      numberPlate: '',
      frameNo: '',
      machineNo: '',
      vehicleType: '',
      ownerName: '',
      phoneNumber: '',
      email: '',
      city: null,
      district: null,
      ward: null,
      address: null
    }
  )
  const dispatch = useDispatch()
  const [motorTypeOptions, setMotorTypeOptions] = useState([])
  const [carInfoCCCD, setCarInfoCCCD] = useState(false)
  const [ownerInfoCCCD, setOwnerInfoCCCD] = useState(false)
  const [uploadVehicleFile, setUploadVehicleFile] = useState(false)
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
  // true after the first form submission
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const { cities } = useCityList(BaseAppConfigs.VN_COUNTRY_CODE)
  const { districts, loadDitrictsByCity } = useDistrictList(null)
  const { wards, loadWardsByDistrict } = useWardList(null)

  const validationSchema = Yup.object().shape({
    numberPlate: Yup.string().when('isRegistered', {
      is: false,
      then: Yup.string().required()
    }),
    frameNo: Yup.string().when('isRegistered', {
      is: true,
      then: Yup.string().min(6, 'Must be 6 characters or than').required()
    }),
    machineNo: Yup.string().when('isRegistered', {
      is: true,
      then: Yup.string().min(6, 'Must be 6 characters or than').required()
    }),
    vehicleType: Yup.string().required(),
    ownerName: Yup.string().required(),
    phoneNumber: Yup.string()
      .required()
      .matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
    email: Yup.string().required().email(),
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
      })
  })

  useEffect(() => {
    loadMotorTypeOptions().then()
    if (stepData.city) {
      loadDitrictsByCity(stepData.city).then()
      loadWardsByDistrict(stepData.district).then()
      // userDetails.userType = user.userType
    }
  }, [])

  const loadMotorTypeOptions = async () => {
    const res = await BuyInsuranceService.getMotorVehicleOptions()
    if (res.status === 200) {
      let list = res.data.map((item, i) => ({
        value: item.id,
        label: item.name,
        businessStatus: item.businessStatus,
        capacityType: item.capacityType
      }))
      setMotorTypeOptions(list)
    }
  }

  const onClickSubmit = (values) => {
    const city = cities.find((item) => item.value === values.city)
    if (city) {
      values.cityName = city.label
    }
    const district = districts.find((item) => item.value === values.district)
    if (district) {
      values.districtName = district.label
    }
    const ward = wards.find((item) => item.value === values.ward)
    if (ward) {
      values.wardName = ward.label
    }
    dispatch(actionSaveStepData(1, values))
    dispatch(actionMotorNextStep2(values))
  }

  const onChangeNumberPlate = (e, form) => {
    form.setFieldValue(
      'numberPlate',
      Utils.removeSpecialCharNumberPlate(e.target.value)
    )
  }

  const onChangeCity = async (id, setFieldValue) => {
    setTimeout(() => {
      loadDitrictsByCity(id).then()
      setFieldValue('district', '')
    }, 500)
  }

  const onChangeDistrict = async (id, setFieldValue) => {
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

  return (
    <div>
      <Formik
        initialValues={stepData}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnChange={validateAfterSubmit}
        validateOnBlur={validateAfterSubmit}
        onSubmit={onClickSubmit}
      >
        {({ values, errors, touched, setFieldValue, submitForm }) => (
          <Form>
            {/*Motor Information*/}
            <div className='register-license-plate'>
              <FormattedMessage
                id={getKeyLang('insurance.registerNumberPlateOrNot')}
              />
            </div>
            <div className='d-flex'>
              <div className='registered'>
                <Field>
                  {({ form }) => (
                    <>
                      <Radio
                        checked={!values.isRegistered}
                        label={
                          <FormattedMessage
                            id={getKeyLang('insurance.registered')}
                          />
                        }
                        onClick={(e) => {
                          form.setFieldValue('isRegistered', false)
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>

              <div className='unregistered'>
                <Field>
                  {({ form }) => (
                    <>
                      <Radio
                        checked={values.isRegistered}
                        label={
                          <FormattedMessage
                            id={getKeyLang('insurance.unregistered')}
                          />
                        }
                        onClick={(e) => {
                          form.setFieldValue('isRegistered', true)
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>
            </div>

            <div className='d-flex align-items-center justify-content-between mt-3'>
              <div className='title-information'>
                <FormattedMessage
                  id={getKeyLang('insurance.vehicleInformation')}
                />
              </div>
              <div className='d-flex align-items-center'>
                <div className='mr-1 scan'>
                  <FormattedMessage id={getKeyLang('insurance.uploadVehicleRegistration')} />
                </div>
                <Toggle
                  icons={false}
                  checked={carInfoCCCD}
                  onChange={() => setCarInfoCCCD(!carInfoCCCD)}
                />
              </div>
            </div>

            {carInfoCCCD ? (
              <div className='mt-3'>
                <UploadFileOCR
                  values={values}
                  type='vehicleRegistrationFile'
                  setUploadVehicleOrNot={setUploadVehicleOrNot}
                />
              </div>
            ) : null}

            <Row className='mt-3'>
              <Col xs={12} md={6} className='mb-3 mb-md-0'>
                {!values.isRegistered ? (
                  <BaseFormGroup
                    touched={touched}
                    errors={errors}
                    isShowErrorMessage={false}
                    onChange={onChangeNumberPlate}
                    messageId={getKeyLang('insurance.numberPlate')}
                    fieldName='numberPlate'
                  />
                ) : (
                  <>
                    <BaseFormGroup
                      className='mb-3'
                      touched={touched}
                      errors={errors}
                      isShowErrorMessage={false}
                      messageId={getKeyLang('insurance.frameNumber')}
                      fieldName='frameNo'
                    />
                    <BaseFormGroup
                      touched={touched}
                      errors={errors}
                      isShowErrorMessage={false}
                      messageId={getKeyLang('insurance.machineNumber')}
                      fieldName='machineNo'
                    />
                  </>
                )}
              </Col>

              <Col xs={12} md={6}>
                <BaseFormGroupSelect
                  touched={touched}
                  errors={errors}
                  isShowErrorMessage={false}
                  options={motorTypeOptions}
                  messageId={getKeyLang('insurance.vehicleType')}
                  fieldName='vehicleType'
                />
              </Col>
            </Row>

            {/*Motor Information*/}
            {/* Owner Information*/}
            <div className='d-flex align-items-center justify-content-between mt-4'>
              <div className='title-information'>
                <FormattedMessage
                  id={getKeyLang('insurance.ownerInformation')}
                />
              </div>
              <div className='d-flex align-items-center'>
                <div className='mr-1 scan'>
                  <FormattedMessage id={getKeyLang('insurance.scanCCCD')} />
                </div>
                <Toggle
                  icons={false}
                  checked={ownerInfoCCCD}
                  onChange={() => setOwnerInfoCCCD(!ownerInfoCCCD)}
                />
              </div>
            </div>

            {ownerInfoCCCD ? (
              <div className='mt-3'>
                <UploadFileOCR
                  values={values}
                  type='identificationFile'
                  setUploadIdentifyOrNot={setUploadIdentifyOrNot}
                />
              </div>
            ) : null}

            <Row className='mt-3'>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.fullName')}
                  fieldName='ownerName'
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId='register.phoneNumber'
                  fieldName='phoneNumber'
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId='register.email'
                  fieldName='email'
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={
                    values.address
                      ? getKeyLang('insurance.city')
                      : 'completeInformation.province'
                  }
                  fieldName='city'
                  options={cities}
                  onChange={({ id }) => onChangeCity(id, setFieldValue)}
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={
                    values.address
                      ? getKeyLang('insurance.district')
                      : 'completeInformation.district'
                  }
                  fieldName='district'
                  options={districts}
                  onChange={({ id }) => onChangeDistrict(id, setFieldValue)}
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroupSelect
                  messageId={
                    values.address
                      ? getKeyLang('insurance.ward')
                      : 'completeInformation.ward'
                  }
                  fieldName='ward'
                  options={wards}
                  errors={errors}
                  isShowErrorMessage={false}
                  touched={touched}
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col sm='12'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.owner.address')}
                  fieldName='address'
                  touched={touched}
                  errors={errors}
                />
              </Col>
            </Row>

            {/* Owner Information*/}
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
    </div>
  )
}

export default MotorStep1
