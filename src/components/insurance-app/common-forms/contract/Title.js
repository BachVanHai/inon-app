import React from 'react'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/insurance-app'

const Title = ({ titleRow, ...childProps }) => {
    const renderTitleRow = () => {
        if (!titleRow) {
            return null
        }

        if (!titleRow.isContractTitleHide) {
            if (!titleRow.titles) {
                return <>
                    <Row>
                        <Col md={12}>
                            <span className="font-large-1 text-bold-600 text-primary-highlight letter-uppercase" >
                                <FormattedMessage id={getKeyLang(`BuyInsurance.Car.Contract`)} />
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col md={12}>
                            <span className="font-medium-1" >
                               <span className='text-bold-600 text-title-color'>
                               {
                                    titleRow.msgField
                                }
                               </span>
                               <span>&nbsp;</span>
                                :
                                <span>&nbsp;</span>
                                <span className='font-weight-bold'>
                                {
                                    titleRow.content
                                }
                                </span>
                            </span>
                        </Col>
                    </Row>
                </>
            }
            return (
                <>
                    <Row>
                        <Col md={12}>
                            <span className="font-large-1 text-bold-600 text-primary-highlight letter-uppercase" >
                                <FormattedMessage id={getKeyLang(`BuyInsurance.Car.Contract`)} />
                            </span>
                        </Col>
                    </Row>
                    {
                        titleRow.titles.map((elt, index) => {
                            return (
                                <div key={index}>
                                    <Row>
                                        <Col md={12}>
                                            <span className="font-medium-2" >
                                                {
                                                    elt.msgField
                                                }
                                                :
                                                <span>&nbsp;</span>
                                                {
                                                    elt.content
                                                }
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    return (
        <>
            {
                titleRow &&
                <div {...childProps}>
                    {
                        renderTitleRow()
                    }
                    {
                        (titleRow.subTitle) &&
                        <Row className="mt-1">
                            <Col md={12}>
                                <span className="font-medium-4 font-weight-bold text-primary-highlight letter-uppercase" >
                                    {
                                        titleRow.subTitle
                                    }
                                </span>
                            </Col>
                        </Row>
                    }
                </div>
            }
        </>
    )
}

export default Title
