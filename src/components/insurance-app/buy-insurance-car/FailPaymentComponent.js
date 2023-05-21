import React from "react"
import { Card, CardBody, FormGroup, Row, Col } from "reactstrap"
import failImg from "../../../assets/images/insurance-app/buy-insurance/payment_fail.png"
import {
    FormattedMessage,
    AppId
} from 'base-app'
class FailPaymentComponent extends React.Component {
    render() {
        return (
            <Row className="m-0 w-100">
                <Col sm="12">
                    <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
                        <CardBody className="text-center">
                            <div className="bg-full-screen-image">
                                <img
                                    src={failImg}
                                    alt="failImg"
                                    className="img-fluid align-self-center mt-75"
                                />
                                <FormGroup className="form-label-group" className="margin-top-28 margin-bottom-14">
                                    {this.props.action === "COMPLETE_FAIL" ?
                                        <h1 className="font-large-1 text-danger letter-uppercase"> <FormattedMessage id={`${AppId.INSURANCE_APP}.PaymentFail`} /></h1>
                                        : <h1 className="font-large-1 text-danger letter-uppercase"> <FormattedMessage id={`${AppId.INSURANCE_APP}.PaymentTimeout`} /></h1>
                                    }
                                    <p>
                                        <FormattedMessage id={`${AppId.INSURANCE_APP}.PaymentFailContent`} />
                                    </p>
                                </FormGroup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default FailPaymentComponent