import '../../../../../../../assets/scss/insurance-app/common/slider.scss'
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import styled from "styled-components"
import { BaseFormDatePicker } from 'base-app'
import Flatpickr from "react-flatpickr"
import { KEY_DATE_INSUR_VC_TO, KEY_DATE_INSUR_VC_FROM, KEY_TIME_INSUR_VC_FROM, KEY_TIME_INSUR_VC_TO, KEY_DURATION_BHVC, KEY_DURATION_BBTNDS, KEY_DATE_INSUR_TO, KEY_DATE_INSUR_FROM, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO } from '../formikConfig'
import AddTerms from './AddTerms'
import moment from 'moment'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'

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

const VatChatInsurCar = ({ errors, values, touched, setFieldValue, getFieldMeta, disableContinueBtn }) => {
    return (
        <div className="mt-1">
            <Row>
                <Col xs={12} md={3} className="mb-1">
                    <span className="label-text align-middle" >
                        <FormattedMessage id={getKeyLang(`RangeDate`)} />
                        <span>&nbsp;</span>
                        <b className="font-weight-bold text-primary">
                            {values[KEY_DURATION_BHVC]}
                        </b>
                        <span>&nbsp;</span>
                        <FormattedMessage id={getKeyLang(`Month`)} />
                    </span>
                </Col>
                <Col xs={12} md={9} >
                    <Slider
                        id={KEY_DURATION_BHVC}
                        min={12}
                        max={30}
                        step={3}
                        marks={{ 12: 12, 30: 30 }}
                        value={getFieldMeta(KEY_DURATION_BHVC).value}
                        onChange={(value) => {
                            setFieldValue(KEY_DURATION_BHVC, value)
                            setFieldValue(KEY_DURATION_BBTNDS, value)

                            setFieldValue(KEY_DATE_INSUR_VC_TO,
                                moment(values[KEY_DATE_INSUR_VC_FROM])
                                    .add(value, 'M')
                                    .format(DATE_FORMAT)
                            )
                            setFieldValue(KEY_DATE_INSUR_TO,
                                moment(values[KEY_DATE_INSUR_VC_FROM])
                                    .add(value, 'M')
                                    .format(DATE_FORMAT)
                            )

                            disableContinueBtn && disableContinueBtn()
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={6} md={3} className="remove-padding-right">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateEffFrom`)}
                        fieldName={KEY_DATE_INSUR_VC_FROM}
                        errors={errors}
                        className="form-control-right"
                        onChange={(dates) => {
                            const convertDate = moment(dates[0]).format(DATE_FORMAT)
                            const convertedDateTo = moment(convertDate).add(values[KEY_DURATION_BHVC], 'M').format(DATE_FORMAT)

                            setFieldValue(KEY_DATE_INSUR_VC_FROM, convertDate)
                            setFieldValue(KEY_DATE_INSUR_FROM, convertDate)
                            setFieldValue(KEY_DATE_INSUR_VC_TO, convertedDateTo)
                            setFieldValue(KEY_DATE_INSUR_TO, convertedDateTo)

                            disableContinueBtn && disableContinueBtn()
                        }}
                        options={
                            {
                                minDate: moment().format(`YYYY-MM-DD`),
                                disableMobile: true,
                                enableTime: false
                            }
                        }
                    />
                </Col>
                <Col xs={6} md={3} className="remove-padding-left">
                    <Flatpickr
                        className={`form-control form-control-background form-control-left`}
                        id={KEY_TIME_INSUR_VC_FROM}
                        value={getFieldMeta(KEY_TIME_INSUR_VC_FROM).value}
                        onChange={(dates) => {
                            const currentTime = moment().hours()
                            let inputTime = moment(dates[0]).hours()
                            if (inputTime < currentTime) {
                                if (moment(values[KEY_DATE_INSUR_VC_FROM]).isSame(moment().format(DATE_FORMAT))) {
                                    const convertedDate = moment(values[KEY_DATE_INSUR_VC_FROM]).add(1, "d").format(DATE_FORMAT)
                                    const convertedDateTo = moment(convertedDate).add(values[KEY_DURATION_BHVC], 'M').format(DATE_FORMAT)

                                    setFieldValue(KEY_DATE_INSUR_VC_FROM, convertedDate)
                                    setFieldValue(KEY_DATE_INSUR_VC_TO, convertedDateTo)
                                }
                            }
                            setFieldValue(KEY_TIME_INSUR_VC_FROM, dates[0])
                            setFieldValue(KEY_TIME_INSUR_FROM, dates[0])
                            setFieldValue(KEY_TIME_INSUR_VC_TO, dates[0])
                            setFieldValue(KEY_TIME_INSUR_TO, dates[0])

                            disableContinueBtn && disableContinueBtn()
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
                </Col>

                <Col xs={6} md={3} className="remove-padding-right">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateEffTo`)}
                        fieldName={KEY_DATE_INSUR_VC_TO}
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
                        id={KEY_TIME_INSUR_VC_TO}
                        value={getFieldMeta(KEY_TIME_INSUR_VC_TO).value}
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

            <Row className="mb-1">
                <Col md={12}>
                    <label className="text-primary-highlight font-medium-1 language-markup">
                        <em>
                            <FormattedMessage id={getKeyLang(`AddTerms`)} />
                        </em>
                    </label>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <AddTerms
                        touched={touched} errors={errors}
                        setFieldValue={setFieldValue}
                        values={values}
                        disableContinueBtn={disableContinueBtn}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default VatChatInsurCar