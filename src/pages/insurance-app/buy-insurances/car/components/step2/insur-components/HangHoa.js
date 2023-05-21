import '../../../../../../../assets/scss/insurance-app/common/slider.scss'
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React from 'react'
import Slider, { Handle } from "rc-slider"
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import styled from "styled-components"
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { BaseFormGroup } from 'base-app'
import { KEY_GROSS_TON, KEY_MAX_GROSS_TON, KEY_MIN_GROSS_TON, KEY_XTRIEU_HANGHOA_VANCHUYEN } from '../formikConfig'
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

const HangHoa = ({ disableContinueBtn, errors, touched, setFieldValue, values }) => {
    // const [count, setCoutn] = React.useState(0)
    return (
        <div className="mt-1 mb-3">
            <Col sm="12">
                <Row>
                    <Col sm="12">
                        <label className="font-small-2"> <em><FormattedMessage id={getKeyLang("ExtendInsBBHHCar")} /></em></label>
                        <br /><br />
                    </Col>

                    <Col sm="12">
                        <BaseFormGroup
                            fieldName={KEY_GROSS_TON}
                            messageId={getKeyLang("GrossTon")}
                            errors={errors}
                            touched={touched}
                            onChange={(e) => {
                                disableContinueBtn && disableContinueBtn()

                                // const minGrossTon = values[KEY_MIN_GROSS_TON]
                                // const maxGrossTon = values[KEY_MAX_GROSS_TON]
                                let val = e.target.value
                                // if (+val < +minGrossTon) {
                                //     val = minGrossTon
                                // }
                                // if (+val > +maxGrossTon) {
                                //     val = maxGrossTon
                                // }
                                // clearTimeout(count)
                                // const _count = sleepingFor(1000).then(() => {
                                setFieldValue(KEY_GROSS_TON, val)
                                // })
                                // setCoutn(_count)
                            }}
                        />

                        <label className="custom-pos font-small-2 language-markup">
                            <em> <FormattedMessage id={getKeyLang("NoteGrossTon")} /></em>
                        </label>
                    </Col>

                    <Col md="3" sm="12" className="margin-top-14">
                        <label>
                            <FormattedMessage id={getKeyLang("Responsibility")} />
                            <b className="font-weight-bold text-primary">
                                {values[KEY_XTRIEU_HANGHOA_VANCHUYEN]}
                            </b>
                            <span>&nbsp;</span>
                            <FormattedMessage id={getKeyLang("GrossTonUni")} />
                        </label>
                    </Col>

                    <Col md="9" sm="12" className="margin-top-14">
                        <Slider
                            min={10}
                            max={50}
                            step={10}
                            marks={{ 10: 10, 50: 50 }}
                            value={values[KEY_XTRIEU_HANGHOA_VANCHUYEN]}
                            handle={MyHandle}
                            onChange={(value) => {
                                disableContinueBtn && disableContinueBtn()
                                setFieldValue(KEY_XTRIEU_HANGHOA_VANCHUYEN, value)
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default HangHoa
