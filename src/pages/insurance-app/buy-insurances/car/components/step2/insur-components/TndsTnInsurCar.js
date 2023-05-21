import '../../../../../../../assets/scss/insurance-app/common/slider.scss'
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import styled from "styled-components"
import { KEY_MIN_XTRIEU_TAI_HANHKHACH, KEY_XTRIEU_NGUOI_VU, KEY_XTRIEU_TAISAN_VU, KEY_XTRIEU_TAI_HANHKHACH, KEY_XTRIEU_TAI_HANHKHACH_DISABLE } from '../formikConfig'

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

const TndsTnInsurCar = ({ setFieldValue, getFieldMeta, values, disableContinueBtn }) => {

    return (
        <div className="">
            <Row className="mb-1">
                <Col sm={12}>
                    <label className="font-small-2"> <em><FormattedMessage id={getKeyLang(`ExtendInsBBTNDSCar`)} /></em></label>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <label className="font-weight-bold text-primary"><FormattedMessage id={getKeyLang(`AddResponsibility`)} /></label>
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={4} md={3}>
                    <label >
                        <FormattedMessage id={getKeyLang(`AboutMan`)} /> <br />
                        <b className="font-weight-bold text-primary">
                            {values[KEY_XTRIEU_NGUOI_VU]}
                        </b>
                        <FormattedMessage id={getKeyLang(`AboutManUnit`)} />
                    </label>
                </Col>
                <Col xs={8} md={9} >
                    <Slider
                        id={KEY_XTRIEU_NGUOI_VU}
                        min={10}
                        max={200}
                        step={10}
                        marks={{ 10: 10, 200: 200 }}
                        value={values[KEY_XTRIEU_NGUOI_VU]}
                        onChange={(value) => {
                            setFieldValue(KEY_XTRIEU_NGUOI_VU, value)

                            disableContinueBtn && disableContinueBtn()
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={4} md={3}>
                    <label>
                        <FormattedMessage id={getKeyLang(`AboutAsset`)} /> <br />
                        <b className="font-weight-bold text-primary">
                            {values[KEY_XTRIEU_TAISAN_VU]}
                        </b>
                        <span>&nbsp;</span>
                        <FormattedMessage id={getKeyLang(`AboutAssetUnit`)} />
                    </label>
                </Col>
                <Col xs={8} md={9} >
                    <Slider
                        id={KEY_XTRIEU_TAISAN_VU}
                        min={10}
                        max={400}
                        step={10}
                        marks={{ 10: 10, 400: 400 }}
                        value={values[KEY_XTRIEU_TAISAN_VU]}
                        onChange={(value) => {
                            setFieldValue(KEY_XTRIEU_TAISAN_VU, value)

                            disableContinueBtn && disableContinueBtn()
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={4} md={3}>
                    <label>
                        <FormattedMessage id={getKeyLang(`AboutPassenger`)} /> <br />
                        <b className="font-weight-bold text-primary">
                            {values[KEY_XTRIEU_TAI_HANHKHACH]}
                        </b>
                        <span>&nbsp;</span>
                        <FormattedMessage id={getKeyLang(`AboutPassengerUnit`)} />
                    </label>
                </Col>
                <Col xs={8} md={9} >
                    <Slider
                        disabled={getFieldMeta(KEY_XTRIEU_TAI_HANHKHACH_DISABLE).value}
                        id={KEY_XTRIEU_TAI_HANHKHACH}
                        min={getFieldMeta(KEY_MIN_XTRIEU_TAI_HANHKHACH).value}
                        max={200}
                        step={10}
                        marks={
                            {
                                [getFieldMeta(KEY_MIN_XTRIEU_TAI_HANHKHACH).value]: getFieldMeta(KEY_MIN_XTRIEU_TAI_HANHKHACH).value,
                                200: 200
                            }
                        }
                        value={values[KEY_XTRIEU_TAI_HANHKHACH]}
                        onChange={(value) => {
                            setFieldValue(KEY_XTRIEU_TAI_HANHKHACH, value)

                            disableContinueBtn && disableContinueBtn()
                        }}
                        handle={MyHandle}
                        tipProps={{
                            prefixCls: "rc-slider-tooltip"
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default TndsTnInsurCar
