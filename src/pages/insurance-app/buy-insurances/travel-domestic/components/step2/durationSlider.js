import { BaseFormDatePicker } from 'base-app'
import 'flatpickr/dist/themes/material_green.css'
import moment from 'moment'
import Slider, { Handle } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CardText, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import '../../../../../../assets/scss/insurance-app/common/slider.scss'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
  KEY_DURATION, KEY_END_INSURANCE, KEY_START_INSURANCE
} from './formikConfig'

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
const DurationSlider = ({
  errors,
  values,
  touched,
  setFieldValue,
  getFieldMeta,
  disableContinueBtn
}) => {
  return (
    <>
      <Row>
        <Col xs={12} md={3} className='mb-1'>
          <CardText className='font-weight-bold' tag='h5'>
            <FormattedMessage id={getKeyLang(`RangeDate`)} />
            <span>&nbsp;</span>
            <b className='font-weight-bold text-primary'>
              {getFieldMeta(KEY_DURATION).value}
            </b>
            <span>&nbsp;</span>
            <span>Ngày</span> :
          </CardText>
        </Col>
        <Col xs={12} md={9}>
          <Slider
            id='timeInsurance'
            min={3}
            max={90}
            step={3}
            marks={{ 3:3, 90: 90 }}
            value={getFieldMeta(KEY_DURATION).value}
            onChange={(value) => {
              setFieldValue(KEY_DURATION, value)
              setFieldValue(
                KEY_END_INSURANCE,
                moment(values[KEY_START_INSURANCE])
                  .add(value, 'd')
                  .format(DATE_FORMAT)
              )
            }}
            handle={MyHandle}
            tipProps={{
              prefixCls: 'rc-slider-tooltip'
            }}
          />
        </Col>
      </Row>

      <Row className='mt-3'>
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
    </>
  )
}

export default DurationSlider
