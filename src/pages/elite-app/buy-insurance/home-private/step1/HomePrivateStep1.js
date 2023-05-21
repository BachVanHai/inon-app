import {
  BaseAppConfigs,
  BaseFormDatePicker,
  BaseFormGroup,
  BaseFormGroupSelect,
  Radio
} from 'base-app'
import { FieldArray, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { useDispatch, useSelector } from 'react-redux'
import Col from 'reactstrap/lib/Col'
import Form from 'reactstrap/lib/Form'
import Row from 'reactstrap/lib/Row'
import * as Yup from 'yup'
import { getKeyLang, IC_TYPES_OPTIONS } from '../../../../../configs/elite-app'
import { actionHomePrivateNextStep2 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomePrivateInsurance'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import moment from 'moment'
import { StepFooter } from '../../StepFooter'
import UploadFileOCR from '../../UploadFileOCR'
import Address from './Address'
import { styleTitle } from './utility'
import UncontrolledPopoverInsur from '../../../../../components/insurance-app/common-forms/popup'
import styled from 'styled-components'
const SelectHiddenLabel = styled.div`
.form-label-group{
  label{
    visibility: hidden;
  }
}
`
const HouseKindStyled = styled(Row)`
#uncontrolled-popover {
  left : 5px !important;
  top : -5px !important;
  svg{
    width: 15px !important;
  }
}
label{
    color: rgba(34,41,47,0.4) !important;
    padding: 0 0 !important;
    font-size: 0.7rem !important;
    top: -20px !important;
    left: 3px !important;
    font-weight: bold;
  }
.select__kind-house{
  .form-label-group{
  label{
    display: none;
  }
}
}
.input_useTime{
  margin-top : 17px;
}

`
const HomeprivateStep1 = () => {
  const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
  const dispatch = useDispatch()
  const [theSameAddress, seTtheSameAddress] = useState(true)
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const typeKindOfHouse = useMemo(() => {
    return [
      {
        value: 1,
        label: 'Chung cư',
        businessStatus: false,
        capacityType: 'APARTMENT'
      },
      {
        value: 2,
        label: 'Nhà liền kề/biệt thự',
        businessStatus: false,
        capacityType: 'TOWNHOUSE'
      },
      {
        value: 3,
        label: 'Khác',
        businessStatus: false,
        capacityType: 'OTHER'
      }
    ]
  }, [])
  const onClickSubmit = (values) => {
    dispatch(actionSaveStepData(1, values))
    dispatch(actionHomePrivateNextStep2(values))
  }
  const [typeOnerStatus, setTypeOnerStatus] = useState(false)
  const initialAddressDTO = {
    city: '',
    address: '',
    district: '',
    ward: '',
    cityName: '',
    districtName: '',
    wardName: ''
  }
  const stepData = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['1'] || {
        houseOwnerType: 'OWNER',
        icType: IC_TYPES_OPTIONS[1].value,
        icNo: '',
        theSameAddress: theSameAddress || true,
        issuedDate: '',
        houseType: typeKindOfHouse[0].value,
        houseTypeName: '',
        issuedPlace: '',
        fullName: '',
        phoneNumber: '',
        usedTime: '',
        email: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        coverage: 'BASIC',
        houseAddressDTO: [initialAddressDTO]
      }
  )
  const validateSchema = Yup.object().shape({
    icNo: Yup.string().required().when('icType', {
      is: 'CMND',
      then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX)
    }).when('icType', {
      is: 'CCCD',
      then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX)
    }).when('icType', {
      is: 'HC',
      then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX)
    }),
    houseType: Yup.string().required(`Không được để trống`),
    issuedPlace: Yup.string().required(`Không được để trống`),
    fullName: Yup.string().required(`Không được để trống`),
    phoneNumber: Yup.string()
      .required(`Không được để trống`)
      .matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
    usedTime: Yup.number().required(`Không được để trống`).max(24, 'Thời gian không quá 24 năm').integer('Vui lòng nhập đúng định dạng'),
    email: Yup.string().email('Vui lòng nhập đúng định dạng email').required(`Không được để trống`),
    address: Yup.string().required(`Không được để trống`),
    city: Yup.string().required(`Không được để trống`),
    district: Yup.string().required(`Không được để trống`),
    ward: Yup.string().required(`Không được để trống`),
    houseAddressDTO: Yup.array().when(`theSameAddress`, {
      is: false,
      then: Yup.array().of(Yup.object().shape({
        address: Yup.string().required(`Không được để trống`),
        city: Yup.string().required(`Không được để trống`),
        district: Yup.string().required(`Không được để trống`),
        ward: Yup.string().required(`Không được để trống`),
      }))
    })
  })
  const formik = useFormik({
    initialValues: stepData,
    onSubmit: onClickSubmit,
    validationSchema: validateSchema,
    validateOnChange: validateAfterSubmit,
    validateOnBlur: validateAfterSubmit
  })

  const setUploadIdentifyOrNot = () => {
    setUploadIdentifyFile(!uploadIdentifyFile)
  }
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit,
    submitForm,
  } = formik
  const styleLabel = {
    color: 'rgba(34, 41, 47, 0.4)',
    fontSize: '0.7rem',
    marginBottom : "10px"
  }
  const spacingInput = {
    marginTop: '5px'
  }
  useEffect(() => {
    if (stepData.theSameAddress !== undefined) {
      seTtheSameAddress(stepData.theSameAddress)
    }
    if (stepData.houseOwnerType) {
      if (stepData.houseOwnerType === 'OWNER') {
        setTypeOnerStatus(true)
      }
      if (stepData.houseOwnerType === 'OTHER') {
        setTypeOnerStatus(false)
      }
    }
  }, [])
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <div className="font-weight-bold mb-2 mt-2" style={styleTitle}>
          <FormattedMessage
            id={getKeyLang('insurance.homeprivate.step1.theInsuredIs')}
          />
        </div>
        <Row>
          <Col sm={12} md={6} className='mb-3'>
            <Radio
              checked={!typeOnerStatus}
              label={
                <FormattedMessage
                  id={getKeyLang(
                    'insurance.homeprivate.step1.radio.houseOwner'
                  )}
                />
              }
              onClick={(e) => {
                setTypeOnerStatus(false)
                setFieldValue('houseOwnerType', 'OWNER')
              }}
            />
          </Col>
          <Col sm={12} md={6} className='mb-3'>
            <Radio
              checked={typeOnerStatus}
              label={
                <FormattedMessage
                  id={getKeyLang('insurance.homeprivate.step1.radio.renter')}
                />
              }
              onClick={(e) => {
                setTypeOnerStatus(true)
                setFieldValue('houseOwnerType', 'OTHER')
              }}
            />
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col sm={12} md={12} lg={12} className=''>
            <UploadFileOCR
              values={values}
              type='identificationFile'
              setUploadIdentifyOrNot={setUploadIdentifyOrNot}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={6} className='mb-3'>
            <span style={styleLabel}>
              <FormattedMessage
                id={getKeyLang(
                  'insurance.homeprivate.step1.select.typeOfIdentificationDocument'
                )}
              />
            </span>
            <SelectHiddenLabel>
              <BaseFormGroupSelect
                isShowErrorMessage={false}
                messageId={getKeyLang(
                  'insurance.homeprivate.step1.select.typeOfIdentificationDocument'
                )}
                fieldName={`icType`}
                touched={touched}
                options={IC_TYPES_OPTIONS}
                defaultValue={IC_TYPES_OPTIONS[1]}
              />
            </SelectHiddenLabel>
          </Col>
          <Col md={4} lg={6} className='mb-3 mt-1'>
            <div style={spacingInput}>
              <BaseFormGroup
                messageId={getKeyLang(
                  'insurance.homeprivate.step1.numberOfIdentificationDocument'
                )}
                touched={touched}
                fieldName='icNo'
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={4} className='mb-3'>
            <BaseFormDatePicker
              messageId={getKeyLang(`insurance.homeprivate.step1.dateRange`)}
              fieldName={'issuedDate'}
              options={{
                maxDate: moment().subtract(1, 'y').format('YYYY-MM-DD 00:00:00'),
                minDate: moment().subtract(70, 'y').format('YYYY-MM-DD 00:00:00'),
                dateFormat: 'Y-m-d'
              }}
              errors={errors}
            />
          </Col>
          <Col md={4} lg={4} className='mb-3'>
            <BaseFormGroup
              messageId={getKeyLang('insurance.homeprivate.step1.issuedBy')}
              fieldName='issuedPlace'
            />
          </Col>
          <Col md={4} lg={4} className='mb-3'>
            <BaseFormGroup
              messageId={getKeyLang(
                'insurance.homeprivate.step1.firstAndLastName'
              )}
              fieldName='fullName'
            />
          </Col>
        </Row>
        <Row className=''>
          <Col md={4} lg={6} className='mb-3'>
            <BaseFormGroup
              messageId={getKeyLang('insurance.homeprivate.step1.numberPhone')}
              fieldName='phoneNumber'
            />
          </Col>
          <Col md={4} lg={6} className='mb-3'>
            <BaseFormGroup
              messageId={getKeyLang('insurance.homeprivate.step1.email')}
              fieldName='email'
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
        <div className='font-weight-bold' style={styleTitle}>
          <FormattedMessage
            id={getKeyLang('insurance.homeprivate.step1.question.address')}
          />
        </div>
        <div className='d-flex'>
          <div className='registered  mt-2  mb-3'>
            <Radio
              checked={values.theSameAddress}
              label={
                <FormattedMessage
                  id={getKeyLang('insurance.homeprivate.step1.answer.yes')}
                />
              }
              onClick={(e) => {
                setFieldValue('theSameAddress', true)
                seTtheSameAddress(true)
              }}
            />
          </div>

          <div className='unregistered mt-2  mb-3'>
            <Radio
              checked={!values.theSameAddress}
              label={
                <FormattedMessage
                  id={getKeyLang('insurance.homeprivate.step1.answer.no')}
                />
              }
              onClick={(e) => {
                setFieldValue('theSameAddress', false)
                seTtheSameAddress(false)
              }}
            />
          </div>
        </div>
        {!theSameAddress ? (
          <FieldArray
            name='houseAddressDTO'
            render={(arrayHelpers) => (
              <div>
                {values.houseAddressDTO && values.houseAddressDTO.length > 0
                  ? values.houseAddressDTO.map((item, index) => (
                    <div key={item.id}>
                      <Address
                        values={values}
                        errors={errors}
                        touched={touched}
                        address={`houseAddressDTO.${index}.address`}
                        city={`houseAddressDTO.${index}.city`}
                        cityName={`houseAddressDTO.${index}.cityName`}
                        district={`houseAddressDTO.${index}.district`}
                        districtName={`houseAddressDTO.${index}.districtName`}
                        ward={`houseAddressDTO.${index}.ward`}
                        wardName={`houseAddressDTO.${index}.wardName`}
                        item={item}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  ))
                  : null}
              </div>
            )}
          />
        ) : null}

        <HouseKindStyled>
          <Col md={6}  className='mb-2'>
          <div className='label__kind-house d-flex algin-items-center'>
        <label><FormattedMessage id={getKeyLang('insurance.homeprivate.step1.kindsOfHouse')} /></label>
      <UncontrolledPopoverInsur
              targetId="uncontrolled-popover"
              contents={[
                <FormattedMessage
                  id={`${getKeyLang(
                    `insurance.homeprivate.step1.kindsOfHouse.conditional`
                  )}`}
                />,
                <FormattedMessage
                  id={`${getKeyLang(
                    `insurance.homeprivate.step1.kindsOfHouse.list1`
                  )}`}
                />,
                <FormattedMessage
                  id={`${getKeyLang(
                    `insurance.homeprivate.step1.kindsOfHouse.list2`
                  )}`}
                />
              ]}
            />
      </div>
            <div style={spacingInput} className='select__kind-house'>
              <BaseFormGroupSelect
                messageId={getKeyLang('insurance.homeprivate.step1.kindsOfHouse')}
                fieldName='houseType'
                touched={touched}
                errors={errors}
                options={typeKindOfHouse}
                marginLabel="mb-kind-ofHouse"
              />
            </div>
          </Col>

          <Col md={6} className=''>
            <div style={spacingInput}>
              <BaseFormGroup
                touched={touched}
                type="number"
                className="input_useTime"
                errors={errors}
                messageId={getKeyLang('insurance.homeprivate.step1.UsedTime')}
                fieldName='usedTime'
              />
            </div>
          </Col>
        </HouseKindStyled>

        <StepFooter
          errors={errors}
          onClickNext={() => {
            setValidateAfterSubmit(true)
            submitForm().then()
          }}
        />
      </Form>
    </FormikProvider>
  )
}

export default HomeprivateStep1