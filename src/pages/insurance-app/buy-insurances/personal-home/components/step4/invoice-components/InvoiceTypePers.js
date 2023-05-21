import '../../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useMemo } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Select, BaseFormGroup, Button } from 'base-app'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../../../configs/insurance-app'


const InvoiceTypePers = ({ formik }) => {
    const { errors, touched, setFieldValue, values } = formik
    const IDTypes = [
        {
            label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
            content: "Chung minh nhan dan",
            value: 1,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
            content: "Can cuoc cong dan",
            value: 2,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
            content: "Ho chieu",
            value: 3,
        },
    ]

    return (
        <div>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`IDType`)}
                                    className="formattedMessage"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <FormGroup className="mb-0">
                                                    <Select
                                                        readOnly
                                                        closeMenuOnSelect={true}
                                                        classNamePrefix='select mt-1'
                                                        onChange={(original) => {
                                                            setFieldValue(`idPersonType_typePers`, original.content)
                                                        }}
                                                        options={IDTypes}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [])
                    }
                </Col>
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName='idPersonNumber_typePers'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`IDPers`)}
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
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName='buyerPers_typePers'
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`buyerPers`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={6} md={3} className="remove-padding-right">
                    <BaseFormGroup
                        fieldName='phoneNumber_typePers'
                        errors={errors}
                        touched={touched}
                        messageId={getKeyLang(`PhoneNum`)}
                        className="bdr-none"
                    />
                </Col>
                <Col xs={6} md={3} className="remove-padding-left">
                    <BaseFormGroup
                        fieldName='email_typePers'
                        errors={errors}
                        touched={touched}
                        messageId={getKeyLang(`emailInvoice`)}
                        className="bdl-none"
                    />
                </Col>
            </Row>

            <Row >
                <Col xs={12} md={12} >
                    <FormGroup className="form-label-group position-relative">
                        <BaseFormGroup
                            fieldName='address_typePers'
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

export default InvoiceTypePers
