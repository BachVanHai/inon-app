import '../../../../../../../assets/scss/insurance-app/common/slider.scss'
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, FormGroup, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import styled from "styled-components"
import { BaseFormGroup } from 'base-app'
import { KEY_MAX_NUM_IN_CAR, KEY_MIN_NUM_IN_CAR, KEY_NUM_IN_CAR, KEY_XTRIEU_NGUOI_TREN_XE } from '../formikConfig'
import { sleepingFor } from '../../../../../../../ultity'

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

const TaiNanInsurCar = ({ errors, touched, setFieldValue, values, disableContinueBtn , toggleValidateChange }) => {
    return (
        <div>
            <Row className="mb-1">
                <Col xs={12} md={12}>
                    <label className="font-small-2">
                        <em><FormattedMessage id={getKeyLang(`ExtendInsBBTNDSCar`)} /></em>
                    </label>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs={4} md={3}>
                    <label>
                        <FormattedMessage id={getKeyLang(`Responsibility`)} />
                        <span>&nbsp;</span>
                        <b className="font-weight-bold text-primary">
                            {values[KEY_XTRIEU_NGUOI_TREN_XE]}
                        </b>
                        <span>&nbsp;</span>
                        <FormattedMessage id={getKeyLang(`AboutManUnit`)} />
                    </label>
                </Col>

                <Col xs={8} md={9} >
                    <Slider
                        id={KEY_XTRIEU_NGUOI_TREN_XE}
                        min={20}
                        max={800}
                        step={10}
                        marks={{ 20: 20, 800: 800 }}
                        value={values[KEY_XTRIEU_NGUOI_TREN_XE]}
                        onChange={(value) => {
                            setFieldValue(KEY_XTRIEU_NGUOI_TREN_XE, value)
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className='mt-2'>
                <Col xs={12} md={12} >
                    <FormGroup className="form-label-group position-relative">
                        <BaseFormGroup
                            fieldName={KEY_NUM_IN_CAR}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`NumInCar`)}
                            onChange={(e) => {
                                disableContinueBtn && disableContinueBtn()
                                let val = e.target.value
                                toggleValidateChange(true)
                                setFieldValue(KEY_NUM_IN_CAR, val)
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

export default TaiNanInsurCar