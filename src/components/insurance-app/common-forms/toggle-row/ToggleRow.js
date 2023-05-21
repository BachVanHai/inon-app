import 'react-toggle/style.css'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import Toggle from "react-toggle"
import icInOn from '../../../../assets/images/insurance-app/buy-insurance/ic_inon.png'
import { useFormikContext } from 'formik'

/**@example
    <ToggleRow
        msgField={getKeyLang(`materialAssetHomeInsurance`)}
        fieldName={KEY_TOGGLE_ASSETS_HOME}
        isHideIcon={false}
        toggleOnChange={() => {
          // do something in here
        }}
    />
 */
const ToggleRow = ({ msgField, fieldName, isHideIcon, toggleOnChange, ...props }) => {
    const { getFieldMeta } = useFormikContext()
    return (
        <div {...props}>
            <Row className="mb-1">
                <Col xs={9} md={6}>
                    <div className="d-flex align-items-center">
                        {
                            isHideIcon ?
                                null
                                :
                                <img
                                    className="rounded-circle mr-50"
                                    src={icInOn}
                                    alt="ic"
                                />
                        }
                        <span className="align-middle font-medium-1 text-title-color letter-uppercase">
                            <b><FormattedMessage id={msgField} /></b>
                        </span>
                    </div>
                </Col>

                <Col xs={3} md={6}>
                    <Toggle
                        onChange={toggleOnChange}
                        className="switch-danger-primary"
                        checked={getFieldMeta(fieldName).value}
                        icons={false}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ToggleRow