import '../../../../assets/scss/insurance-app/common/slider.scss'
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, FormGroup, Input, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/insurance-app'
import styled from "styled-components"
import { BaseFormGroup, CurrencyInput } from 'base-app'
import { KEY_MAX_NUM_IN_CAR, KEY_NUM_IN_CAR, KEY_SEATS, KEY_XTRIEU_NGUOI_TREN_XE } from '../formikConfig';


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
const BhtnplxCar = ({ errors, values, touched, setFieldValue, getFieldMeta, disableContinueBtn , onBlurChangeSeatValues }) => {
  return (
    <div>
        <Row className="mb-1">
            <Col xs={12} md={12}>
                <label className="font-small-2">
                    <em><FormattedMessage id={getKeyLang(`ExtendInsBBVDTNDSCarTNDS`)} /></em>
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
                    max={100}
                    step={10}
                    marks={{ 20: 20, 100: 100 }}
                    value={values[KEY_XTRIEU_NGUOI_TREN_XE]}
                    onChange={(value) => {
                        setFieldValue(KEY_XTRIEU_NGUOI_TREN_XE, value)

                        disableContinueBtn && disableContinueBtn()
                    }}
                    handle={MyHandle}
                    tipProps={{
                        prefixCls: "rc-slider-tooltip"
                    }}
                />
            </Col>
        </Row>

        <Row>
            <Col xs={12} md={12} >
                <FormGroup className="form-label-group position-relative">
                    <CurrencyInput
                        id={KEY_NUM_IN_CAR}
                        value={values[KEY_NUM_IN_CAR]}
                        className={`form-control form-label-group ${getFieldMeta(KEY_NUM_IN_CAR).error ? 'is-invalid' : ""}`}
                        errors={errors}
                        touched={touched}
                        placeholder={getKeyLang(`NumInCar`)}
                        onBlur={(e) => {
                            let val = e.target.value
                            setFieldValue(KEY_NUM_IN_CAR, val)
                            setFieldValue(KEY_MAX_NUM_IN_CAR, val)
                            //if value input > current seat => not call api update insurances
                            if (Number(val) > Number(getFieldMeta(KEY_SEATS).value)) return
                            else onBlurChangeSeatValues && onBlurChangeSeatValues()
                        }}
                    />
                </FormGroup>
                <span className='text-danger'>{getFieldMeta(KEY_NUM_IN_CAR).error}</span>
            </Col>
        </Row>
    </div>
  )
}

export default BhtnplxCar