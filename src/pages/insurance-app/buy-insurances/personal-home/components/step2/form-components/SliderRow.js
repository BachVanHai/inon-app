import "rc-slider/assets/index.css"
import "flatpickr/dist/themes/material_green.css"
import '../../../../../../../assets/scss/insurance-app/common/slider.scss'
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, FormGroup, Row } from 'reactstrap'
import { BaseFormDatePicker } from 'base-app'
import styled from "styled-components"
import Flatpickr from "react-flatpickr"
import moment from 'moment'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import Utils from "../../../../../../../configs/insurance-app/constants/Utils"

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
/**@example
   <SliderRow
        errors={errors} values={values} setFieldValue={setFieldValue}
        disableContinueBtn={disableContinueBtn}
        sliderValue={values[KEY_DURATION]}
        sliderInfo={sliderInfo}
        sliderOnChange={(value) => {
            disableContinueBtn && disableContinueBtn()

            setFieldValue(KEY_DURATION, value)
            setFieldValue(KEY_DATE_INSUR_TO,
                moment(values[KEY_DATE_INSUR_FROM])
                    .add(value, 'M')
                    .format(DATE_FORMAT)
            )
        }}
        keyNames={{
            KEY_DURATION: KEY_DURATION,
            KEY_DATE_INSUR_FROM,
            KEY_DATE_INSUR_TO,
            KEY_TIME_INSUR_FROM,
            KEY_TIME_INSUR_TO,
        }}
    />
 */
const SliderRow = ({ errors, values, setFieldValue, sliderOnChange, sliderValue, sliderInfo, keyNames, disableContinueBtn, ...props }) => {
    const { KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION } = keyNames
    return (
        <div {...props}>
            <Row>
                <Col xs={4} md={3}>
                    <FormattedMessage id={getKeyLang(`RangeDate`)} />
                    <span>&nbsp;</span>
                    <b className="font-weight-bold text-primary">{sliderValue}</b>
                    <span>&nbsp;</span>
                    <FormattedMessage id={getKeyLang(`Month`)} />
                </Col>
                <Col xs={8} md={9} >
                    <Slider
                        id="time-insurance"
                        min={sliderInfo.min}
                        max={sliderInfo.max}
                        step={sliderInfo.stepValue}
                        marks={{ [sliderInfo.min]: sliderInfo.min, [sliderInfo.max]: sliderInfo.max }}
                        value={sliderValue}
                        onChange={sliderOnChange}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={6} md={3} className="remove-padding-right mb-2">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateEffFrom`)}
                        fieldName={KEY_DATE_INSUR_FROM}
                        errors={errors}
                        className="form-control-right"
                        onChange={(dates) => {
                            disableContinueBtn && disableContinueBtn()

                            const convertedDate = moment(dates[0]).format(Utils.DATE_FORMAT)
                            const convertedDateTo = moment(convertedDate).add(values[KEY_DURATION], 'M').format(Utils.DATE_FORMAT)

                            setFieldValue(KEY_DATE_INSUR_FROM, convertedDate)
                            setFieldValue(KEY_DATE_INSUR_TO, convertedDateTo)
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
                <Col xs={6} md={3} className="remove-padding-left">
                    <FormGroup className="form-label-group">
                        <Flatpickr
                            className={`form-control form-control-background form-control-left`}
                            value={values[KEY_TIME_INSUR_FROM]}
                            onChange={(dates) => {
                                disableContinueBtn && disableContinueBtn()

                                setFieldValue(KEY_TIME_INSUR_FROM, moment(dates[0]).format("H:i"))
                                setFieldValue(KEY_TIME_INSUR_TO, moment(dates[0]).format("H:i"))
                            }}
                            options={
                                {
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    disableMobile: "true"
                                }
                            }
                        />
                    </FormGroup>
                </Col>

                <Col xs={6} md={3} className="remove-padding-right">
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
                <Col xs={6} md={3} className="remove-padding-left">
                    <Flatpickr
                        className={`form-control form-control-background form-control-left`}
                        id={KEY_TIME_INSUR_TO}
                        value={values[KEY_TIME_INSUR_TO]}
                        options={
                            {
                                enableTime: false,
                                noCalendar: true,
                                dateFormat: "H:i",
                                disableMobile: "true"
                            }
                        }
                    />
                </Col>
            </Row>
        </div>
    )
}

export default SliderRow