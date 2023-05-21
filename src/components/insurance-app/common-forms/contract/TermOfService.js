import React from 'react'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Check } from "react-feather"
import Checkbox from "../../../../components/insurance-app/checkbox/CheckboxesVuexy"
import { getKeyLang } from '../../../../configs/insurance-app'

const TermOfService = ({ toggleAgree, ...props }) => {
    if (!toggleAgree) return null

    return (
        <div {...props}>
            <Row>
                <Col md={12}>
                    <div className="title-wrapper d-flex align-items-center">
                        <Checkbox
                            disabled={false}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            checked={toggleAgree.agreedTermOfServicesStatus}
                            onChange={toggleAgree.toggleAgreeCallback}
                        />

                        <label>
                            <b> <FormattedMessage id={getKeyLang(`ContractAgree1`)} />
                                <span>&nbsp;</span>
                                <a
                                    href="https://sit2.inon.vn/resources/pdf/terms-and-conditions.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer" className="text-primary-highlight">
                                    <u> <i>  <FormattedMessage id={getKeyLang(`ContractAgree2`)} /> </i></u>
                                </a>
                                <span>&nbsp;</span>
                                <FormattedMessage id={getKeyLang(`ContractAgree3`)} />
                            </b>
                        </label>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TermOfService