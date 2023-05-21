import React from "react"
import { Card, CardBody, FormGroup, Row, Col } from "reactstrap"
import successImg from "../../../assets/images/insurance-app/buy-insurance/Group.png"
import { FormattedMessage, } from 'base-app'
import { getKeyLang } from "../../../configs/insurance-app"
class SuccessPaymentComponent extends React.Component {
    render() {
        let _msgField = <FormattedMessage id={getKeyLang(`PaymentSuccess`)} />
        const { msgField } = this.props
        if (msgField) {
            _msgField = msgField
        }
        return (
            <Row className="m-0 w-100">
                <Col sm="12">
                    <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
                        <CardBody className="text-center">
                            <div className="bg-full-screen-image">
                                <img
                                    src={successImg}
                                    alt="successImg"
                                    className="img-fluid align-self-center mt-75"
                                />
                                <FormGroup className="form-label-group" className="margin-top-14 margin-bottom-14">
                                    <h1 className="font-large-1 primary letter-uppercase">
                                        {
                                            _msgField
                                        }
                                    </h1>
                                    <p>
                                        <FormattedMessage id={getKeyLang("PaymentSuccessContent")} />
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

export default SuccessPaymentComponent