import React from 'react'
import 'flatpickr/dist/themes/material_green.css'
import Slider, { Handle } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FormattedMessage } from 'react-intl'
import { CardText, Col, FormGroup, Input, Row } from 'reactstrap'
import '../../../../../../assets/scss/insurance-app/common/slider.scss'
import { BaseFormDatePicker } from 'base-app'
import moment from 'moment'
import Flatpickr from 'react-flatpickr'
import styled from 'styled-components'
// import { DATE_FORMAT } from "../../../../components/insurance-app/buy-insurances-page/formik-config"
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import {
  KEY_DURATION,
  KEY_START_INSURANCE,
  KEY_END_INSURANCE
} from './formikConfig'
import { getKeyLang } from '../../../../../../configs/insurance-app'

const SliderStyled = styled.div`
  .input_deduction {
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
    &:focus {
      border: 1px solid #338955;
    }
  }
`
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
  // padding: 2px;
  color: #f9f9f9;
  margin-bottom: 20px;
  opacity: 0.9;
`
const DurationSlider = ({
  errors,
  values,
  touched,
  setFieldValue,
  getFieldMeta,
  disableContinueBtn
}) => {
  return (
    <SliderStyled>
      <Row>
        <Col xs={12} md={3} className='mb-1'>
          <CardText className='font-weight-bold' tag='h5'>
            <FormattedMessage id={getKeyLang(`RangeDate`)} />
            <span>&nbsp;</span>
            <b className='font-weight-bold text-primary'>
              {getFieldMeta(KEY_DURATION).value}
            </b>
            <span>&nbsp;</span>
            <span>Ngày</span>
          </CardText>
        </Col>
        <Col xs={12} md={9}>
          <Input
            type='number'
            value={getFieldMeta(KEY_DURATION).value}
            placeholder='Giảm trừ phí bảo hiểm (%)'
            className={`${errors[KEY_DURATION] ? "is-invalid" : ""} input_deduction form-label-group`} 
            onChange={(e) => {
              const value = e.target.value
              const valuess = Number(value)
              if (!isNaN(valuess)) {
                if (value === 0) {
                  setFieldValue(KEY_DURATION, 1)
                  setFieldValue(
                    KEY_END_INSURANCE,
                    moment(values[KEY_START_INSURANCE])
                      .add(1, 'd')
                      .format(DATE_FORMAT)
                  )
                  return
                }
                if (value > 90) {
                  setFieldValue(KEY_DURATION, 90)
                  setFieldValue(
                    KEY_END_INSURANCE,
                    moment(values[KEY_START_INSURANCE])
                      .add(90, 'd')
                      .format(DATE_FORMAT)
                  )
                  return
                }
                setFieldValue(KEY_DURATION, value)
                setFieldValue(
                  KEY_END_INSURANCE,
                  moment(values[KEY_START_INSURANCE])
                    .add(value, 'd')
                    .format(DATE_FORMAT)
                )
              }
            }}
          />
        </Col>
      </Row>

      <Row className='mt-3 px-1'>
        <Col xs={12} md={6} className='remove-padding-right mb-2'>
          <BaseFormDatePicker
            messageId={getKeyLang(`DateEffFrom`)}
            fieldName={KEY_START_INSURANCE}
            errors={errors}
            className='form-control-right'
            onChange={(dates) => {
              const convertedDate = moment(dates[0]).format(DATE_FORMAT)
              const convertedDateTo = moment(convertedDate)
                .add(values[KEY_DURATION], 'd')
                .format(DATE_FORMAT)
              setFieldValue(KEY_START_INSURANCE, convertedDate)
              setFieldValue(KEY_END_INSURANCE, convertedDateTo)
              //   disableContinueBtn && disableContinueBtn()
            }}
            options={{
              minDate: moment().format('YYYY-MM-DD'),
              disableMobile: true,
              enableTime: false
            }}
          />
        </Col>
        <Col xs={12} md={6} className='remove-padding-right'>
          <BaseFormDatePicker
            messageId={getKeyLang(`DateEffTo`)}
            fieldName={KEY_END_INSURANCE}
            errors={errors}
            className='form-control-right'
            disabled
            options={{
              minDate: moment().format('YYYY-MM-DD'),
              disableMobile: true,
              enableTime: false
            }}
          />
        </Col>
      </Row>
    </SliderStyled>
  )
}

export default DurationSlider
