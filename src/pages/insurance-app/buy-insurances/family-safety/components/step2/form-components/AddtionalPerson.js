import React from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row, } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { BaseFormGroup, BaseFormDatePicker, Button, Select, BaseAppUltils } from 'base-app'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { CheckCircle } from "react-feather"
import Service from '../../../../../../../services/insurance-app/buyInsurancesFamilySafety'
import { OCR_TYPE_ID_PERSON, OcrInput } from '../../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import {
    relationships, IDTypes, genderTypes, KEY_PHONE_NUMBER,
    KEY_ADDTIONAL_PEOPLE, KEY_FULLNAME, KEY_IC_NO, KEY_DATE_BIRTH, KEY_EMAIL, KEY_GENDER, KEY_IC_TYPE, KEY_RELATIONSHIP
} from '../formikConfig'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { useFormikContext } from 'formik'
import { hasRequestFail } from '../../../../../../../ultity'
import { idOcr_postImageCompleted } from '../../../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import moment from 'moment'

const AddtionalPerson = ({ formik, index, className }) => {
    const { errors, touched, setFieldValue, getFieldMeta } = formik
    const { setFieldValue: _setFieldValue } = useFormikContext()
    const isNeedRelationshipInput = index > 0
    const isNeedPhoneEmailInput = index === 0

    const autoSetInfoContact = (name, id, dob, phoneNumber, email, gender, icType) => {
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`, name || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`, id || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`, dob || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_PHONE_NUMBER}`, phoneNumber || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_EMAIL}`, email || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`, gender || ``)
        setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_TYPE}`, icType || ``)
    }

    const autoCompleted = (name, id, dob) => {
        idOcr_postImageCompleted(setFieldValue,
            {
                KEY_IC_NO: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`,
                KEY_FULL_NAME: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`,
                KEY_DATE_BIRTH: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`
            },
            { name: name, id: id, dob: dob }
        )
    }

    const renderRelationshipRow = () => {
        const calculateMd = () => {
            if (isNeedRelationshipInput) {
                return 4
            }
            return 6
        }

        return (
            <Row className="mt-2">
                {
                    isNeedRelationshipInput &&
                    <Col xs={12} md={calculateMd()} >
                        <Select
                            readOnly
                            closeMenuOnSelect={true}
                            classNamePrefix='select mt-1'
                            className="custom-zindex8"
                            onChange={(original) => {
                                setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RELATIONSHIP}`, original.content)
                            }}
                            value={relationships.find(elt => elt.content === getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RELATIONSHIP}`).value)}
                            options={relationships}
                            placeholder={<FormattedMessage id={getKeyLang(`relativeWithOwner`)} />}
                            isClearable={false}
                            styles={getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RELATIONSHIP}`).error ? selectErrorStyles : selectNormalStyles}
                        />
                    </Col>
                }

                <Col xs={12} md={calculateMd()} >
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
                                            className="custom-zindex7"
                                            onChange={(original) => {
                                                setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_TYPE}`, original.content)
                                            }}
                                            value={IDTypes.find(elt => elt.content === getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_TYPE}`).value)}
                                            options={IDTypes}
                                            placeholder={msg}
                                            isClearable={false}
                                            styles={getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_TYPE}`).error ? selectErrorStyles : selectNormalStyles}
                                        />
                                    </FormGroup>
                                )
                            }
                        }
                    </FormattedMessage>
                </Col>

                <Col xs={12} md={calculateMd()} >
                    <FormGroup className="form-label-group position-relative">
                        <InputGroup className={`form-label-group ${getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`).error && "mb-3"}`}>
                            <BaseFormGroup
                                fieldName={`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`}
                                errors={errors}
                                touched={touched}
                                messageId={getKeyLang(`IDPers`)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="check" onClick={async () => {
                                    const res = await Service.checkInfoContact(
                                        getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`).value
                                    )
                                    if (hasRequestFail(res.status)) {
                                        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.notExistIcNo`)} />)
                                        return
                                    }
                                    const { fullName, icNo, dateOfBirth, phoneNumber, email, gender, icType } = res.data
                                    autoSetInfoContact(fullName, icNo, dateOfBirth, phoneNumber, email, gender, icType)
                                }}
                                    className="custom-check-btn"
                                >
                                    <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                    <CheckCircle size={14} />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    return (
        <div className={className}>
            <Row className="mb-1">
                <Col xs={12} md={4}>
                    <OcrInput
                        ocrType={OCR_TYPE_ID_PERSON}
                        idKeylangBtnName={getKeyLang(`IdPersonOcr`)}
                        completedCallback={autoCompleted}
                        className="ocr-input"
                    />
                </Col>
            </Row>

            {
                renderRelationshipRow()
            }

            <Row className="mt-2">
                <Col xs={12} md={4} >
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`Name`)}
                            onChange={(e, form) => {
                                _setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`, e.target.value.toUpperCase())
                            }}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={4} >
                    <FormGroup className="form-label-group position-relative" >
                        <BaseFormDatePicker
                            fieldName={`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`}
                            messageId={getKeyLang(`DateOfBirth`)}
                            errors={errors}
                            touched={touched}
                            className={getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`).error && "is-invalid"}
                            options={
                                {
                                    maxDate: moment().utc(true).format("YYYY-MM-DD"),
                                    enableTime: false
                                }
                            }
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={4} >
                    <FormattedMessage
                        id={getKeyLang(`sex.aStar`)}
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
                                            className="custom-zindex7"
                                            onChange={(original) => {
                                                setFieldValue(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`, original.content)
                                            }}
                                            value={genderTypes.find(elt => elt.content === getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`).value)}
                                            options={genderTypes}
                                            placeholder={msg}
                                            isClearable={false}
                                            styles={getFieldMeta(`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`).error ? selectErrorStyles : selectNormalStyles}
                                        />
                                    </FormGroup>
                                )
                            }
                        }
                    </FormattedMessage>
                </Col>
            </Row>

            {
                isNeedPhoneEmailInput &&
                <Row className="mt-1">
                    <Col xs={12} md={6} >
                        <FormGroup className="form-label-group position-relative">
                            <BaseFormGroup
                                fieldName={`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_PHONE_NUMBER}`}
                                errors={errors}
                                touched={touched}
                                messageId={getKeyLang(`PhoneNum`)}
                            />
                        </FormGroup>
                    </Col>

                    <Col xs={12} md={6} >
                        <FormGroup className="form-label-group position-relative">
                            <BaseFormGroup
                                fieldName={`${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_EMAIL}`}
                                errors={errors}
                                touched={touched}
                                messageId={getKeyLang(`EmailTitle`)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default AddtionalPerson