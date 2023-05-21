import React from 'react'
import { Col, Row } from 'reactstrap'
/**
 * @example
 * // you can choose type between "m", "s", "mp", "mpb", "toggle-row-title"
 */
export const getTextClassesBy = (type) => {
    switch (type) {
        case "mp":
            return "text-uppercase primary font-medium-3"
        case "mpb":
            return "text-uppercase primary font-medium-3 text-bold-700"
        case "m":
            return "text-uppercase font-medium-3"
        case "s":
            return "font-medium-2 primary text-bold-700"
        case "toggle-row-title":
            return "align-middle font-medium-1 text-title-color letter-uppercase"
        case "title-insurance":
            return "text-uppercase primary font-medium-5 font-weight-bold"
        default:
            return "text-uppercase primary font-medium-3"
    }
}
/**
    @example
    // you can choose type between "m", "s", "mp", "mpb", "toggle-row-title"
    case "mp":
        return "text-uppercase primary font-medium-3"
    case "mpb":
        return "text-uppercase primary font-medium-3 text-bold-700"
    case "m":
        return "text-uppercase font-medium-3"
    case "s":
        return "font-medium-2 primary text-bold-700"
    case "toggle-row-title":
        return "align-middle font-medium-1 text-title-color letter-uppercase"

    return (
        <TitleRow
            msg={<FormattedMessage id={getKeyLang(`InsuranceVehicle`)} />}
            type="s"
        />
    )
 */
const TitleRow = ({ msg = "msg", type = "mpb", orderNumber, ...p }) => {
    return (
        <Row {...p}>
            <Col xs={12} md={10} >
                {
                    orderNumber &&
                    <>
                        <span className={getTextClassesBy(type)}>
                            {orderNumber}.
                        </span>
                        <span>&nbsp;</span>
                    </>
                }
                <span className={getTextClassesBy(type)}>
                    {
                        msg
                    }
                </span>
            </Col>
        </Row>
    )
}

export default TitleRow