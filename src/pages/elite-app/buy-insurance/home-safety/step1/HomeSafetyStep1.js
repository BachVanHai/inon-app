import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BaseAppConfigs, BaseFormGroup,
  BaseFormGroupSelect,
  FormattedMessage,
  useCityList,
  useDistrictList,
  useWardList
} from 'base-app'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { getKeyLang, IC_TYPES_OPTIONS } from '../../../../../configs/elite-app'
import { Col, Row } from 'reactstrap'
import UploadFileOCR from '../../UploadFileOCR'
import { StepFooter } from '../../StepFooter'
import { actionHomeSafetyNextStep2 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomeSafetyInsurance'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const HomeSafetyStep1 = () => {

  const stepData = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['1'] || {
        icType: '',
        icNo: '',
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
  const { cities } = useCityList(BaseAppConfigs.VN_COUNTRY_CODE)
  const { districts, loadDitrictsByCity } = useDistrictList(null)
  const { wards, loadWardsByDistrict } = useWardList(null)
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
  // true after the first form submission
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)

  const validationSchema = Yup.object().shape({
    icType: Yup.string().required('required'),
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
    ownerName: Yup.string().required('required'),
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
    })
  })

  useEffect(() => {
    if (stepData.city) {
      loadDitrictsByCity(stepData.city).then()
      loadWardsByDistrict(stepData.district).then()
    }
  }, [])

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
    values.isBuyer = true
    dispatch(actionSaveStepData(1, values))
    dispatch(actionHomeSafetyNextStep2(values))
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

  const setUploadIdentifyOrNot = () => {
    setUploadIdentifyFile(!uploadIdentifyFile)
  }

  return (
    <Formik initialValues={stepData} enableReinitialize validationSchema={validationSchema} onSubmit={onClickSubmit}
            validateOnChange={validateAfterSubmit} validateOnBlur={validateAfterSubmit}>
      {
        ({ values, errors, touched, handleChange, setFieldValue, setErrors, submitForm }) => (
          <Form>
            <div className='buyer-info-title'>
              <FormattedMessage id={getKeyLang('insurance.buyerInformation')} />
            </div>
            <Row className='mt-2 mb-3'>
              <Col xs={12}>
                <UploadFileOCR values={values} type='identificationFile'
                               setUploadIdentifyOrNot={setUploadIdentifyOrNot} />
              </Col>
            </Row>
            <Row>
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
              <Col sm='12' md='4' className='mb-3'>
                <BaseFormGroup
                  messageId={getKeyLang('insurance.fullName')}
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

            <Row className='mb-3'>
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

            <StepFooter errors={errors} onClickNext={() => {
              setValidateAfterSubmit(true)
              submitForm().then()
            }} />
          </Form>
        )
      }
    </Formik>
  )
}

export default HomeSafetyStep1
