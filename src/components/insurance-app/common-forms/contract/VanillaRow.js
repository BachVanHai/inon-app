import React from 'react'
import { Row, Col } from 'reactstrap'

const InfoRow = ({ msgField, isHideUnderLine, isShow, ...props }) => {
    if (!isShow) {
        return null
    }

    return (
        <div {...props}>
            <Row className="vanilla-row">
                <Col md={12} className="vanilla-col">
                    {msgField}
                </Col>
            </Row>

            {
                isHideUnderLine ?
                    null :
                    <Row className="vanilla-row">
                        <Col md={12} className="vanilla-col">
                            <div className="border-bottom margin-bottom-14 margin-top-14" />
                        </Col>
                    </Row>
            }

        </div>
    )
}

const InfoRows = ({ vanillaRows }) => {
    if (!vanillaRows) return null

    return (
        vanillaRows.map((elt, index) => {
            return (
                <InfoRow
                    msgField={elt.msgField}
                    isHideUnderLine={elt.isHideUnderLine}
                    isShow={true}
                    key={index}
                />
            )
        })
    )
}

export default InfoRows