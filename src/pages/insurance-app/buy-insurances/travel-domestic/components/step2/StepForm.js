import { BaseAppUltils, BaseFormGroup, CurrencyInput } from 'base-app'
import { useFormikContext } from 'formik'
import Slider, { Handle } from 'rc-slider'
import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Button, CardText, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
  fillMultipleStepInfo,
  intlConvertToVnd,
  isObject
} from '../../../../../../ultity'
import Address from './Address'
import CalFeeDone from './CalFeeDone'
import DurationSlider from './durationSlider'
import {
  KEY_INSURANCE_DEDUCTION,
  KEY_INSURANCE_MONEY, KEY_JOIN_GAME_NUMBER, KEY_PACKAGE_SELECTED, KEY_PERSON_INSURANCE_TYPE, KEY_TOTAL_PERSON_INSURANCE, OPTS3
} from './formikConfig'
import RadioOptions from './radioOptions'
import { PERSON_INSURANCE_OPTIONS, RANGE_INSURANCE_OPTIONS } from './utility'
function MyHandle(props) {
  const { value, dragging, index, ...rest } = props
  return (
    <FlexHandle key={index} value={value} {...rest}>
      {dragging && <Value>{value}</Value>}
    </FlexHandle>
  )
}
// If you want to center the text with the handle
const FlexHandle = styled(Handle)`
  display: flex;
  justify-content: center;
`
// By default the text is rendered inside the handle, so we need to take it out
// white-space: nowrap; ensures that it doesn't break on a new line, due to the handle being very small
const Value = styled.div`
  margin-top: -32px;
  white-space: nowrap;
  color: red;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
  background: #0e6856;
  border: 1px solid #737373;
  padding: 2px;
  color: #f9f9f9;
  margin-bottom: 20px;
  opacity: 0.9;
`
const TextFeeStyled = styled.div`
  padding: 10px;
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
const SectionStyled = styled(Row)`
  display: ${(p) => (p.flex ? undefined : 'flex')};
  align-items: ${(p) => (p.flex ? undefined : 'center')};
  label {
    display: none !important;
  }
  .input_deduction{
    display: block;
    width: 100%;
    height: calc(1.25 * 1em + 1.4rem + 1px);
    padding: 0.7rem 0.7rem;
    font-size: 0.96rem;
    font-weight: 400;
    line-height: 1.25;
    color: #4e5154;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    &:focus{
      border: 1px solid #338955;
    }
  }
`
const FeeRow = styled.div`
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: none !important;
`
const CarouselStyled = styled.div`
  /* display */
  .react-multiple-carousel__arrow {
    min-width: 30px;
    min-height: 30px;
    z-index: 0;
  }
  .react-multiple-carousel__arrow--right {
    right: calc(1% + 1px);
  }
  .react-multiple-carousel__arrow--left {
    left: calc(1% + 1px);
  }
`
const ButtonShowDetail = styled(Button)`
  span {
    font-size: 0.8rem !important;
  }
`

const StepForm = ({
  stepInfo,
  className,
  packages,
  enableValidateOnChange ,
  totalFee
}) => {
  const intl = useIntl()
  const {
    getFieldMeta,
    setFieldValue,
    setValues,
    values,
    errors,
    touched,
    initialValues
  } = useFormikContext()
  const dispatch = useDispatch()
  const { step_1, step_2, contractId, companyId, contractInfo, dataFees } =
    stepInfo
  const onChangeDeduction = (value) => {
    const valuess = Number(value)
    if (!isNaN(valuess)) {
      if (values[KEY_TOTAL_PERSON_INSURANCE] > 5) {
        if (Number(valuess) <= 50) {
          setFieldValue(KEY_INSURANCE_DEDUCTION, valuess)
        } else {
          BaseAppUltils.toastError('Giá trị không được lớn hơn 50')
          setFieldValue(KEY_INSURANCE_DEDUCTION, 50)
        }
        return
      } else {
        if (Number(valuess) <= 25) {
          setFieldValue(KEY_INSURANCE_DEDUCTION, valuess)
        } else {
          BaseAppUltils.toastError('Giá trị không được lớn hơn 25')
          setFieldValue(KEY_INSURANCE_DEDUCTION, 25)
        }
      }
    } else {
      setFieldValue(KEY_INSURANCE_DEDUCTION, 0)
    }

  }
  useEffect(() => {
    fillMultipleStepInfo(step_2, initialValues, setValues)
    setFieldValue(KEY_TOTAL_PERSON_INSURANCE ,step_1?.addtinalPeople.length)
  }, [])

  return (
    <div className={className}>
      {/* ============== hành trình ================== */}
      <div>
        <CardText className='font-weight-bold mb-1' tag='h5'>
          <FormattedMessage id={getKeyLang(`travel.travelItinerary`)} />
        </CardText>
        <Address setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} />
      </div>

      {/* ============== select time ================== */}
      
      <DurationSlider
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        getFieldMeta={getFieldMeta}
      />
      {/* ================== số tiền bảo hiểm =================== */}

      <SectionStyled>
        <Col md='3' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceMoney`)} /><b className='font-weight-bold text-primary'> {getFieldMeta(KEY_INSURANCE_MONEY).value} </b> triệu :
          </CardText>
        </Col>
        <Col md='9' xs='12' className='mb-1'>
          <Slider
            id='timeInsurance'
            min={10}
            max={100}
            step={10}
            marks={{ 10: 10, 100: 100 }}
            value={getFieldMeta(KEY_INSURANCE_MONEY).value}
            onChange={(value) => {
              setFieldValue(KEY_INSURANCE_MONEY, value)
              if (value < 50 && getFieldMeta(KEY_PACKAGE_SELECTED).value === 'ADVANCE') {
                setFieldValue(KEY_PACKAGE_SELECTED , 'BASIC')
              }              
            }}
            handle={MyHandle}
            tipProps={{
              prefixCls: 'rc-slider-tooltip'
            }}
          />
        </Col>
      </SectionStyled>

      {/* ========================Nguời được bảo hiểm ================== */}

      <CardText className='font-weight-bold mt-1 mb-2' tag='h5'>
        <FormattedMessage id={getKeyLang(`insuredPerson`)} /> :
      </CardText>
      <RadioOptions
        options={PERSON_INSURANCE_OPTIONS}
        setFieldValue={setFieldValue}
        getFieldMeta={getFieldMeta}
        enableValidateOnChange={enableValidateOnChange}
        // typeComp={'RANGE'}
      />
      {
        getFieldMeta(KEY_PERSON_INSURANCE_TYPE).value === OPTS3 ? <BaseFormGroup
        fieldName={KEY_JOIN_GAME_NUMBER}
        errors={errors}
        touched={touched}
        messageId={getKeyLang(`travel.domestic.joinGame`)}
    />   : null
      }
      {/* ========================Phạm vi bảo hiểm================== */}

      <CardText className='font-weight-bold mt-1 mb-2' tag='h5'>
        <FormattedMessage id={getKeyLang(`coverage`)} /> :
      </CardText>
      <RadioOptions
        options={RANGE_INSURANCE_OPTIONS}
        setFieldValue={setFieldValue}
        getFieldMeta={getFieldMeta}
        typeComp={'RANGE'}
      />
      {/* ========================Giảm trừ phí bảo hiểm ================== */}

      <SectionStyled className='d-flex algin-items-center' flex={'true'}>
        <Col md='3' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceDeduction`)} /> :
          </CardText>
        </Col>
        <Col md='9' xs='12' className='mb-1'>
      <input type='text' value={getFieldMeta(KEY_INSURANCE_DEDUCTION).value} placeholder="Giảm trừ phí bảo hiểm (%)" className='input_deduction' onChange={(e) => onChangeDeduction(e.target.value)}/>
        </Col>
      </SectionStyled>

      {dataFees.length === 0 ? null : (
        <>
          {/* ===================== COMPANY================= */}
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`insurance.companyName`)} />
          </CardText>
          <CalFeeDone
            feeInsurance={intlConvertToVnd(totalFee, intl)}
            companyId={companyId}
            dispatch={dispatch}
            contractId={contractId}
            contractInfo={contractInfo}
            step_1={step_1}
            companiesData={dataFees}
          />
          {/* ==================== total fee ========================== */}
          <FeeRow className='card-active mt-3'>
            <Row>
              <Col xs={5} md={6}>
                <TextFeeStyled>
                  <div
                    className={'font-lg-medium-2 font-md-small-2 text-style '}
                  >
                    <FormattedMessage id={getKeyLang('feeInsurance')} />
                  </div>
                </TextFeeStyled>
              </Col>

              <Col xs={7} md={6}>
                <TextFeeStyled className='d-flex justify-content-end'>
                  <span
                    className={'font-medium-lg-2 font-small-xs-2  text-style '}
                  >
                    {intlConvertToVnd(Number(totalFee), intl)}
                  </span>
                  <span>&nbsp;</span>
                  <span className='text-style '>VND</span>
                </TextFeeStyled>
              </Col>
            </Row>
          </FeeRow>
        </>
      )}
    </div>
  )
}

export default StepForm
