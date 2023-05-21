import { BaseFormDatePicker } from 'base-app'
import "flatpickr/dist/themes/material_green.css"
import moment from 'moment'
import Slider, { Handle } from "rc-slider"
import "rc-slider/assets/index.css"
import React from 'react'
import Flatpickr from "react-flatpickr"
import { FormattedMessage } from 'react-intl'
import { Col, FormGroup, Row } from 'reactstrap'
import styled from "styled-components"
import '../../../../../../assets/scss/insurance-app/common/slider.scss'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO } from './formikConfig'

function MyHandle(props) {
    const { value, dragging, index, ...rest } = props;
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
  background: #0E6856;
  border: 1px solid #737373;
  padding: 2px;
  color: #f9f9f9;
  margin-bottom: 20px;
  opacity:0.9;
  `
const DurationStyled = styled.div`
.mt1__menu{
    z-index : 99999999;
}
`
const DurationSlider = ({ errors, setFieldValue, getFieldMeta, values, disableContinueBtn , step_1 }) => {
    const _MAX_DURATION = Number(step_1.addtinalPeople[0].creditDuration) || 12
    return (
        <DurationStyled>
            <Row>
                <Col xs={12} md={3} className="mb-1">
                    <FormattedMessage id={getKeyLang(`RangeDate`)} />
                    <span>&nbsp;</span>
                    <b className="font-weight-bold text-primary">{getFieldMeta(KEY_DURATION).value}</b>
                    <span>&nbsp;</span>
                    <FormattedMessage id={getKeyLang(`Month`)} />
                </Col>
                <Col xs={12} md={9} >
                    <Slider
                        id="timeInsurance"
                        min={3}
                        max={12}
                        step={3}
                        marks={{ 3 : 3, 12 : 12 }}
                        value={getFieldMeta(KEY_DURATION).value}
                        onChange={(value) => {
                            setFieldValue(KEY_DURATION , value)
                            setFieldValue(KEY_DATE_INSUR_TO ,moment(getFieldMeta(KEY_DATE_INSUR_FROM).value).add(value , 'M').format('YYYY-MM-DD'))
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={6} md={6} className="remove-padding-right mb-2">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateEffFrom`)}
                        fieldName={KEY_DATE_INSUR_FROM}
                        errors={errors}
                        className="form-control-right"
                        onChange={(dates) => {
                            setFieldValue(KEY_DATE_INSUR_FROM , moment(dates[0]).utc(true).format('YYYY-MM-DD H:mm:ss'))
                            setFieldValue(KEY_DATE_INSUR_TO , moment(dates[0]).utc(true).add(getFieldMeta(KEY_DURATION).value , 'M').format('YYYY-MM-DD H:mm:ss'))
                        }}
                        options={
                            {
                                minDate: moment().format("YYYY-MM-DD"),
                                disableMobile: true,
                                enableTime: false
                            }
                        }
                    />
                </Col>
                <Col xs={6} md={6} className="remove-padding-right">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateEffTo`)}
                        fieldName={KEY_DATE_INSUR_TO}
                        errors={errors}
                        className="form-control-right"
                        disabled
                        options={
                            {
                                minDate: moment().format("YYYY-MM-DD"),
                                disableMobile: true,
                                enableTime: false
                            }
                        }
                    />
                </Col>
            </Row>
        </DurationStyled>
    )
}

export default DurationSlider