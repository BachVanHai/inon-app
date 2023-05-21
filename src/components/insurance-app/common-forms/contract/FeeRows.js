import React from 'react'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/insurance-app'

const TotalFee = ({ contractTotalFee, label }) => {
    if (!contractTotalFee) return null

    return (
        <>
            <Row>
                <Col xs={6} md={7} >
                    <div className="d-flex align-items-center cursor-pointer font-medium-3 text-bold-600 custom-remove-margin primary letter-uppercase">
                        {
                            label ?
                                label
                                :
                                <FormattedMessage id={getKeyLang(`ContractTotalFee`)} />
                        }
                    </div>
                </Col>

                <Col xs={6} md={5} >
                    <div className="primary font-medium-3 text-bold-600 react-toggle-wrapper d-inline-block align-middle">
                        {
                            contractTotalFee
                        }
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <div className="border-bottom margin-bottom-14 margin-top-14" />
                </Col>
            </Row>
        </>
    )
}

const FeeRows = ({ feeRows, ...props }) => {
    if (!feeRows) return null

    return (
        <div {...props} >
            {
                feeRows.map((elt, index) => {
                    if (index === feeRows.length - 1) return null
                    return (
                        <div key={index}>
                            <Row >
                                <Col xs={12} md={7} >
                                    <div className="d-flex align-items-center cursor-pointer font-medium-1 text-bold-600 custom-remove-margin text-title-color">
                                        {
                                            elt.msgField
                                        }
                                    </div>
                                </Col>
                                <Col xs={12} md={5} >
                                    <div className="react-toggle-wrapper d-inline-block align-middle">
                                        {
                                            elt.content
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="border-bottom margin-bottom-14 margin-top-14" />
                                </Col>
                            </Row>
                        </div>

                    )
                })
            }

            <TotalFee contractTotalFee={feeRows.find(elt => elt.isTotalFee).content} label={feeRows.find(elt => elt.isTotalFee).msgField} />
        </div>
    )
}

export default FeeRows