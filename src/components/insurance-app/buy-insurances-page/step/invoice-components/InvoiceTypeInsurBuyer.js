import '../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React from 'react'
import { Col, FormGroup, Row } from 'reactstrap'
import { BaseFormGroup } from 'base-app'
import { getKeyLang } from '../../../../../configs/insurance-app'
import { useFormikContext } from 'formik'

/**
 @example
    const { 
        KEY_NAME, KEY_ADDRESS,
        KEY_PHONE_NUMBER, KEY_EMAIL, } = KEYS

 */
const InvoiceTypeInsurBuyer = ({ KEYS }) => {
    const { errors, touched } = useFormikContext()
    const { KEY_IC_NO,
        KEY_NAME,
        KEY_ADDRESS,
        KEY_PHONE_NUMBER,
        KEY_EMAIL, } = KEYS

    return (
        <div>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_IC_NO}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`IDPers`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_NAME}
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
                            fieldName={KEY_PHONE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_EMAIL}
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
                            fieldName={KEY_ADDRESS}
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
