import '../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { BaseFormGroup, Button } from 'base-app'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../configs/insurance-app'
import { useFormikContext } from 'formik'

/**
 @example
  const { KEY_TAX_ID,
        KEY_NAME_COPR, KEY_ADDRESS,
        KEY_PHONE_NUMBER, KEY_EMAIL, } = KEYS

 */
const InvoiceTypeCopr = ({ KEYS }) => {
    const { errors, touched } = useFormikContext()
    const { KEY_TAX_ID,
        KEY_NAME_COPR, 
        KEY_ADDRESS,
        KEY_PHONE_NUMBER, 
        KEY_EMAIL, } = KEYS
    
    return (
        <div>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_TAX_ID}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`TaxID`)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="check" onClick={() => {
                                console.log(`click.Check`)
                            }}
                                className="custom-check-btn"
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <span>&nbsp;</span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_NAME_COPR}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`NameCorp`)}
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

export default InvoiceTypeCopr
