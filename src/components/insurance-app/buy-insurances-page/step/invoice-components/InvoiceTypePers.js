import '../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useMemo } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Select, BaseFormGroup, Button } from 'base-app'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../configs/insurance-app'
import { useFormikContext } from 'formik'
import { ID_TYPE_CCCD, ID_TYPE_CMND, ID_TYPE_HC } from '../../formik-config'
/**
 @example
  const { KEY_ID_PERSON_TYPE, KEY_IC_NO,
        KEY_NAME, KEY_ADDRESS,
        KEY_PHONE_NUMBER, KEY_EMAIL, } = KEYS

 */
const InvoiceTypePers = ({ KEYS }) => {
    const { errors, touched, setFieldValue, getFieldMeta } = useFormikContext()
    const { KEY_ID_PERSON_TYPE,
        KEY_IC_NO,
        KEY_NAME, KEY_ADDRESS,
        KEY_PHONE_NUMBER,
        KEY_EMAIL, } = KEYS

    const IDTypes = [
        {
            label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
            content: ID_TYPE_CMND,
            value: 1,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
            content: ID_TYPE_CCCD,
            value: 2,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
            content: ID_TYPE_HC,
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
                                                        id="persSelect"
                                                        closeMenuOnSelect={true}
                                                        classNamePrefix='select mt-1'
                                                        className="custom-zindex8"
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_ID_PERSON_TYPE, original.content)
                                                        }}
                                                        value={IDTypes.find(item => item.content === getFieldMeta(KEY_ID_PERSON_TYPE).value)}
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
                        }, [getFieldMeta(KEY_ID_PERSON_TYPE).value, getFieldMeta(KEY_ID_PERSON_TYPE).error])
                    }
                </Col>
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_IC_NO}
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
                            fieldName={KEY_NAME}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`buyerPers`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={6} md={3} className="remove-padding-right">
                    <BaseFormGroup
                        fieldName={KEY_PHONE_NUMBER}
                        errors={errors}
                        touched={touched}
                        messageId={getKeyLang(`PhoneNum`)}
                        className="bdr-none"
                    />
                </Col>
                <Col xs={6} md={3} className="remove-padding-left">
                    <BaseFormGroup
                        fieldName={KEY_EMAIL}
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

export default InvoiceTypePers
