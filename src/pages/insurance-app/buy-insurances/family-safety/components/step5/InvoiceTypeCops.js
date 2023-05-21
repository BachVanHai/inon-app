import React, { useMemo } from 'react'
import {
    Col,
    FormGroup, InputGroup, InputGroupAddon,
    Row
} from 'reactstrap'
import 'react-table/react-table.css'
import { FormattedMessage } from 'react-intl'
import { BaseFormGroup, Button } from 'base-app'
import { CheckCircle } from "react-feather"
import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import { getKeyLang } from '../../../../../../configs/insurance-app'

const InvoiceTypeCops = ({ formik }) => {
    const { errors, touched } = formik

    return (
        <div>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName='taxID_typeCorp'
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
                            fieldName='nameCorp_typeCorp'
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
                            fieldName='phoneNumber_typeCorp'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='email_typeCorp'
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
                            fieldName='address_typeCorp'
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

export default InvoiceTypeCops
