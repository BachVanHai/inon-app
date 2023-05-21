import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useEffect } from 'react'
import { BaseFormGroup } from 'base-app'
import { Col, FormGroup, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { isObjEmpty } from '../../../../../../ultity'
import { fillMultipleStepInfo } from './utility'
import { KEY_ADDRESS, KEY_EMAIL, KEY_FULLNAME, KEY_IC_NO, KEY_PHONE_NUMBER } from './formikConfig'

const InvoiceTypeInsurBuyer = ({ formik, stepInfo }) => {
    const { errors, touched, setFieldValue } = formik

    useEffect(() => {
        if (isObjEmpty(stepInfo)) {
            return
        }
        fillMultipleStepInfo(stepInfo, setFieldValue)
    }, [])

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
                            fieldName={KEY_FULLNAME}
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
