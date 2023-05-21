import { BaseAppUltils, BaseFormGroup, CurrencyInput, Radio } from 'base-app'
import { useFormikContext } from 'formik'
import Slider, { Handle } from 'rc-slider'
import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Button, CardText, Col, FormGroup, Label, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesGoods'
import { KEY_ADDONS } from '../../../../../../redux/reducers/insurance-app/buyInsurancesGoods'
import {
  debounceFunc,
  fillMultipleStepInfo,
  intlConvertToVnd,
  isObject
} from '../../../../../../ultity'
import AddOnsCheckbox from './addOnsCheckbox'
import Address from './Address'
import CalFeeDone from './CalFeeDone'
import DurationSlider from './durationSlider'
import {
  KEY_ADD_ONS,
  KEY_GOODS_VALUE,
  KEY_INSURANCE_DEDUCTION,
  KEY_INSURANCE_MONEY,
  KEY_JOIN_GAME_NUMBER,
  KEY_PERSON_INSURANCE_TYPE,
  KEY_TOTAL_PERSON_INSURANCE,
  OPTS3
} from './formikConfig'
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
const ColInputShowUnitMoney = styled(Col)`
  position: relative;
  .vnd-text {
    position: absolute;
    right: 15px;
    top: 0;
    height: 38px;
    line-height: 38px;
    padding-right: 17px;
    padding-left: 15px;
    background-color: #338955;
    z-index: 0;
    border-radius: 0 5px 5px 0;
    color: white;
  }
`

const StepForm = ({
  stepInfo,
  className,
  packages,
  enableValidateOnChange
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
  const {
    step_1,
    step_2,
    contractId,
    companyId,
    contractInfo,
    dataFees,
    addOns
  } = stepInfo
  const {goodsType} = step_1
  const totalFee = dataFees.find((_elt) => _elt.companyId === "01")
    ?.totalFeeInsurance
  const onChangeInsuranceMoney = debounceFunc((values) => {
    setFieldValue(KEY_INSURANCE_MONEY, values)
  } , 1000)
  const saveData = (value) => {
    const valuess = Number(value)
    if (!isNaN(valuess)) {
      if (Number(valuess) <= 30) {
        setFieldValue(KEY_INSURANCE_DEDUCTION, valuess)
      } else {
        BaseAppUltils.toastError('Giá trị không được lớn hơn 30%')
        setFieldValue(KEY_INSURANCE_DEDUCTION, 30)
      }
  }
 }
  useEffect(() => {
    fillMultipleStepInfo(step_2, initialValues, setValues)
    setFieldValue(KEY_ADD_ONS , addOns )
    // check two vehicel => auto check BS7
    const _addOns = addOns.map(_elt => {
      return {
        ..._elt , 
        isEnable : _elt.addonCode === 'BS7' &&  step_1?.vehicels.length >= 2 && _elt.isEnable === false ? true : _elt.isEnable
      }
    })
    dispatch(
      updateProps([
        {
          prop: KEY_ADDONS,
          value: _addOns
        }
      ])
    )
  }, [])

  return (
    <div className={className}>
      {/* ============== hành trình ================== */}
      <div>
        <CardText className='font-weight-bold mb-1' tag='h5'>
          <FormattedMessage id={getKeyLang(`travel.travelItinerary`)} />
        </CardText>
        <Address
          setFieldValue={setFieldValue}
          getFieldMeta={getFieldMeta}
          errors={errors}
          touched={touched}
        />
      </div>

      {/* ============== select time ================== */}
      <DurationSlider
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        getFieldMeta={getFieldMeta}
      />
      {/* ================== số tiền bảo hiểm =================== */}

      <SectionStyled flex={'true'}>
        <Col md='2' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceMoney`)} />
          </CardText>
        </Col>
        <ColInputShowUnitMoney md='10' xs='12' className='mb-1'>
          <FormGroup className={'form-label-group'}>
            <CurrencyInput
              id='loan'
              value={values[KEY_INSURANCE_MONEY]}
              onChange={(e) => {
                onChangeInsuranceMoney(e.target.value)
              }}
              placeholder={getKeyLang('goods.goodsValue')}
              className={`form-control form-label-group ${
                errors[KEY_INSURANCE_MONEY] ? 'is-invalid' : false
              }`}
            />
            {errors[KEY_INSURANCE_MONEY] && (
              <div
                style={{
                  fontSize: '.8rem',
                  position: 'absolute',
                  left: '4px',
                  bottom: '-20px'
                }}
                className='text-danger'
              >
                {errors[KEY_INSURANCE_MONEY]}
              </div>
            )}
            <Label>
              {intl.formatMessage({ id: getKeyLang('goods.goodsValue') })}
            </Label>
          </FormGroup>
          <span className='vnd-text'>VNĐ</span>
        </ColInputShowUnitMoney>
      </SectionStyled>

      {/* ========================ĐIỀU KHOẢN BỔ SUNG================== */}

      <CardText className='font-weight-bold mt-1 mb-2' tag='h5'>
        <div>
          <FormattedMessage id={getKeyLang(`AddTerms`)} /> :
        </div>
        <div>
          <AddOnsCheckbox addOns={addOns} setFieldValue={setFieldValue} isCheckBS7={step_1?.vehicels.length >= 2 ? true : false } />
        </div>
      </CardText>

      {/* ========================Giảm trừ phí bảo hiểm ================== */}
      {
        goodsType === 'MH3' ||  goodsType === 'MH4' || addOns.find(_elt => _elt.addonCode === 'BS3')?.isEnable || addOns.find(_elt => _elt.addonCode === 'BS4')?.isEnable || addOns.find(_elt => _elt.addonCode === 'BS5')?.isEnable || addOns.find(_elt => _elt.addonCode === 'BS6')?.isEnable  ? null : <SectionStyled className='d-flex algin-items-center' flex={'true'}>
        <Col md='2' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceDeduction`)} /> :
          </CardText>
        </Col>
        <Col md='10' xs='12' className='mb-1'>
          <CurrencyInput
            id='insuranceDeduction'
            className={`form-control form-label-group ${
              touched.insuranceDeduction &&
              errors.insuranceDeduction &&
              'is-invalid'
            }`}
            placeholder={getKeyLang('travel.insuranceDeduction')}
            // type='string'
            value={values[KEY_INSURANCE_DEDUCTION]}
            onChange={(e) => saveData(e.target.value)}
          />
          {errors.insuranceDeduction && (
            <span className='text-danger'>{errors.insuranceDeduction}</span>
          )}
        </Col>
      </SectionStyled>
      }
     

      {dataFees.length === 0 ? null : (
        <>
          {/* ===================== COMPANY================= */}
          <CardText className='font-weight-bold mt-2' tag='h5'>
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
                    {intlConvertToVnd(totalFee, intl)}
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
