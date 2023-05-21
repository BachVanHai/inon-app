import React, { createElement } from 'react'
import { Row, Col } from 'reactstrap'

const ContractInfoCol = ({ singleComponents }) => {
    if (!singleComponents) return null

    return (
        <Row>
            {
                singleComponents.map((elt, index) => {
                    return (
                        <Col xs={12} md={4} key={index}>
                            <div className="d-flex justify-content-start align-items-center margin-bottom-14">
                                <div className="user-page-info">
                                    <p className="font-medium-1 text-bold-600 custom-remove-margin text-title-color ">
                                        {
                                            elt.msgField
                                        }
                                    </p>
                                    <span className="">
                                        {
                                            elt.content
                                        }
                                    </span>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

const ContractInfoCols = ({ rowComponents }) => {
    if (!rowComponents) return null

    let contractRows = []
    for (let i = 0; i < rowComponents.length; i += 3) {
        let _max = i + 3
        if (_max >= rowComponents.length) {
            _max = rowComponents.length
        }
        const _singleRowComps = rowComponents.slice(i, _max)
        contractRows.push(createElement(ContractInfoCol, { singleComponents: _singleRowComps, key: i }))
    }

    return (
        <>
            {
                contractRows
            }
            <Row>
                <Col md={12}>
                    <div className="border-bottom margin-bottom-14 margin-top-14" />
                </Col>
            </Row>
        </>
    )
}

export default ContractInfoCols