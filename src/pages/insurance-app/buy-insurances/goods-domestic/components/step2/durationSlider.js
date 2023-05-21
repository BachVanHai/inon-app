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
  KEY_DURATION,
  KEY_END_INSURANCE,
  KEY_START_INSURANCE
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
      <Row className='mt-1'>
        <Col xs={12} md={6} className='remove-padding-right mb-2'>
          <BaseFormDatePicker
            messageId={getKeyLang(`goods.startDate`)}
            fieldName={KEY_START_INSURANCE}
            errors={errors}
            className='form-control-right'
            onChange={(dates) => {
              const convertedDate = moment(dates[0]).format(DATE_FORMAT)
              setFieldValue(KEY_START_INSURANCE, convertedDate)
              //if start date > end date =>> set again end date
              if (
                new Date(dates[0]) >
                new Date(getFieldMeta(KEY_END_INSURANCE).value)
              ) {
                setFieldValue(KEY_END_INSURANCE, convertedDate)
              }
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
            messageId={getKeyLang(`goods.endDate`)}
            fieldName={KEY_END_INSURANCE}
            errors={errors}
            className='form-control-right'
            onChange={(dates) => {
              const convertedDate = moment(dates[0]).format(DATE_FORMAT)
              setFieldValue(KEY_END_INSURANCE, convertedDate)
            }}
            options={{
              minDate: moment(getFieldMeta(KEY_START_INSURANCE).value).format(
                'YYYY-MM-DD'
              ),
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
