import { BaseAppUltils, BaseFormGroup, CurrencyInput } from 'base-app'
import { FieldArray, useFormikContext } from 'formik'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
  debounceFunc,
  fillMultipleStepInfo,
  intlConvertToVnd,
  isArrayEmpty,
  isObjEmpty
} from '../../../../../../ultity'
import { IDTypes } from '../step1/formikConfig'
import CalFeeDone from './CalFeeDone'
import InsuranceInfomation from './components/insurerInformation'
import DurationSlider from './DurationSlider'
import {
  KEY_ADDRESS,
  KEY_BANK_NAME,
  KEY_BENEFICIARY,
  KEY_BENEFICIARY_FIRST,
  KEY_BENEFICIARY_SECOND,
  KEY_BRANCH_NAME,
  KEY_FULLNAME,
  KEY_IC_NO,
  KEY_IC_TYPE,
  KEY_RESPONSIBILITY
} from './formikConfig'

const TextFeeStyled = styled.div`
  @media (max-width: 480px) {
    .text-style {
      font-size: 0.9rem;
    }
  }
  @media (min-width: 768px) {
    .text-style {
      font-size: 1.2rem;
    }
  }
`

const FeeRow = styled.div`
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: none !important;
`
const FormGroupStyled = styled.div`
position: relative;
.vnd-text{
  position: absolute;
  right: 0;
  top: 0;
  height: 38px;
  line-height: 38px;
  padding-right: 15px;
  padding-left: 15px;
  background-color: #338955 ;
  z-index: 0;
  border-radius: 0 5px 5px 0;
  color : white;
}
`
const AddtionalPeopleBlock = ({
  index,
  keyMaps,
  errors,
  touched,
  IDTypes,
  setFieldValue,
  values,
  getFieldMeta,
  resetForm,
  setValues,
  sugg_gender,
  totalFee
}) => {
  return (
    <>
      <InsuranceInfomation
        index={index}
        stepInfo={{
          errors,
          touched,
          setFieldValue,
          values,
          getFieldMeta,
          resetForm,
          setValues,
          sugg_gender,
          IDTypes
        }}
        keyMaps={{
          KEY_IC_TYPE: keyMaps.KEY_IC_TYPE,
          KEY_FULLNAME: keyMaps.KEY_FULLNAME,
          KEY_IC_NO: keyMaps.KEY_IC_NO,
          KEY_ADDRESS: keyMaps.KEY_ADDRESS,
          KEY_BRANCH_NAME: keyMaps.KEY_BRANCH_NAME,
          KEY_BANK_NAME: keyMaps.KEY_BANK_NAME
        }}
        totalFee={totalFee}
      />
    </>
  )
}

const StepForm = ({ stepInfo, className, packages }) => {
  const intl = useIntl()
  const {
    getFieldMeta,
    setFieldValue,
    setValues,
    values,
    errors,
    touched,
    resetForm,
    initialValues
  } = useFormikContext()
  const dispatch = useDispatch()
  const { step_1, step_2, totalFee , dataFees } = stepInfo
  const onchangeResponsibility = debounceFunc((value) => {
    const _MAX_RANGER = Number(step_2?.loan.replaceAll(',' ,''))
    const _values = Number(value?.replaceAll(',' ,''))
    if (_values > _MAX_RANGER) {
      setFieldValue(KEY_RESPONSIBILITY,step_2?.loan)
      BaseAppUltils.toastError('Mức trách nhiệm phải nhỏ hơn số tiền vay !')
    }else{
      setFieldValue(KEY_RESPONSIBILITY,value)
    }
  },500)
  React.useEffect(() => {
    if (isObjEmpty(step_2)) {
      return
    }
    fillMultipleStepInfo(step_2, initialValues, setValues)
  }, [])
  return (
    <>
      <DurationSlider
        errors={errors}
        getFieldMeta={getFieldMeta}
        setFieldValue={setFieldValue}
        step_1={step_1}
      />
      <Row className='mb-2'>
        <Col xs='12' md='2'>
          <div className='mt-1'>
            <FormattedMessage id={getKeyLang('antin.limitCompensated')} />
          </div>
        </Col>
        <Col xs='12' md='10'>
          <FormGroupStyled>
            <FormGroup className={'form-label-group'}>
              <CurrencyInput
                id='loan'
                value={values[KEY_RESPONSIBILITY]}
                onChange={(e) =>  onchangeResponsibility(e.target.value)}
                placeholder={getKeyLang('antin.limitCompensated')}
                className={`form-control form-label-group ${
                  errors[KEY_RESPONSIBILITY] && errors[KEY_RESPONSIBILITY]
                    ? 'is-invalid'
                    : false
                }`}
              />
            </FormGroup>
            <span className='vnd-text'>VNĐ</span>
          </FormGroupStyled>
        </Col>
      </Row>
      <h3 className='mb-2 text-primary font-weight-bold text-uppercase'>Thông tin người thụ hưởng</h3>
      <FieldArray name={KEY_BENEFICIARY_FIRST}>
        {({ remove, push }) => {
          return (
            <div>
                    <h5 className='mb-2'>
                      Người thụ hưởng đầu tiên
                    </h5>
                    <AddtionalPeopleBlock
                      keyMaps={{
                        KEY_BRANCH_NAME: `${KEY_BENEFICIARY_FIRST}.${KEY_BRANCH_NAME}`,
                        KEY_BANK_NAME: `${KEY_BENEFICIARY_FIRST}.${KEY_BANK_NAME}`,
                      }}
                      IDTypes={IDTypes}
                      index={0}
                      remove={remove}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      values={values}
                      getFieldMeta={getFieldMeta}
                      resetForm={resetForm}
                      setValues={setValues}
                    />
                  </div>
          )
        }}
      </FieldArray>
      {/* =================== PERSON  =================== */}
      <FieldArray name={KEY_BENEFICIARY_SECOND}>
        {({ remove, push }) => {
          return (
            <div>
                    <h5 className='mb-2'>
                      Người thụ hưởng còn lại
                    </h5>
                    <AddtionalPeopleBlock
                      keyMaps={{
                        KEY_IC_TYPE: `${KEY_BENEFICIARY_SECOND}.${KEY_IC_TYPE}`,
                        KEY_IC_NO: `${KEY_BENEFICIARY_SECOND}.${KEY_IC_NO}`,
                        KEY_FULLNAME: `${KEY_BENEFICIARY_SECOND}.${KEY_FULLNAME}`,
                        KEY_ADDRESS: `${KEY_BENEFICIARY_SECOND}.${KEY_ADDRESS}`
                      }}
                      IDTypes={IDTypes}
                      index={1}
                      remove={remove}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      values={values}
                      getFieldMeta={getFieldMeta}
                      resetForm={resetForm}
                      setValues={setValues}
                    />
                  </div>
          )
        }}
      </FieldArray>
      <h5 className='mb-2 font-weight-bold font-medium-3'>
           <FormattedMessage id={getKeyLang('InsuranceProduct')} />
      </h5>
      {/* ========================= COMPANY ===================== */}
      {
        isObjEmpty(dataFees) ? null :  <CalFeeDone companiesData={dataFees} />
      }
      {/* <FeeRow className='card-active mt-3'>
        <Row>
          <Col xs={5} md={6}>
            <TextFeeStyled>
              <div className={'font-lg-medium-2 font-md-small-2 text-style '}>
                <FormattedMessage id={getKeyLang('feeInsurance')} />
              </div>
            </TextFeeStyled>
          </Col>

          <Col xs={7} md={6}>
            <TextFeeStyled className='d-flex justify-content-end'>
              <span className={'font-medium-lg-2 font-small-xs-2  text-style '}>
                {intlConvertToVnd(totalFee, intl)}
              </span>
              <span>&nbsp;</span>
              <span className='text-style '>VND</span>
            </TextFeeStyled>
          </Col>
        </Row>
      </FeeRow> */}
    </>
  )
}

export default StepForm
