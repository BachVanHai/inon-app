import '../../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React from 'react'
import { Col, FormGroup, Row } from 'reactstrap'
import { BaseFormGroup } from 'base-app'
import { getKeyLang } from '../../../../../../../configs/insurance-app'

const InvoiceTypeInsurBuyer = ({ formik }) => {
    const { errors, touched } = formik

    return (
        <div>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='idPers_typeInsurBuyer'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`IDPers`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='name_typeInsurBuyer'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`Name`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='phoneNumber_typeInsurBuyer'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='emailInvoice_typeInsurBuyer'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`emailInvoice`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={12}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='adress_typeInsurBuyer'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`AddressTitle`)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

export default InvoiceTypeInsurBuyer
