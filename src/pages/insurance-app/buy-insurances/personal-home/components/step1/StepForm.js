import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import 'react-toggle/style.css'
import React, { useMemo, useEffect } from 'react'
import moment from 'moment'
import { FormattedMessage, useIntl } from 'react-intl'
import { CheckCircle } from "react-feather"
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FieldArray } from 'formik'
import { Select, BaseFormGroup, Button, BaseFormDatePicker } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { OcrInput, OCR_TYPE_ID_PERSON } from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import {
    insuredPersonTypes, KEY_ADDRESS, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULL_NAME, KEY_GENDER,
    KEY_IC_NO, KEY_PHONE_NUMBER, KEY_WARD, sugg_Sex, KEY_INSURED_TYPE, KEY_TOGGLE_IS_ADDRESS_EQUAL, KEY_ADDTIONAL_ADDRESSES, addtionalAddressDefault,
    houseTypes, KEY_HOUSE_TYPE, KEY_TIME_USED, IDTypes, KEY_IC_TYPE, KEY_ISSUED_DATE, KEY_ISSUED_PLACE
} from './formikConfig'
import { fillMultipleStepInfo } from './utility'
import { isObjEmpty } from '../../../../../../ultity'
import { idOcr_postImageCompleted } from '../../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import AddressesRow from '../../../../../../components/insurance-app/common-forms/addresses-row/AddressesRowComp'
import RadioRow from '../../../../../../components/insurance-app/common-forms/toggle-row/RadioRow'
import AddtionalAddress from './form-components/AddtionalAddress'
import UnControlledPopover from '../../../../../../components/insurance-app/common-forms/popup'

const StepForm = ({ checkInfoContact, stepInfo = { icNo: 0 }, className, formik }) => {
    const { errors, touched, setFieldValue, values, getFieldMeta, resetForm, setValues } = formik
    const addtionalAddresses = stepInfo[KEY_ADDTIONAL_ADDRESSES]

    const intl = useIntl()
    const postImageCompleted = (name, id, dob, address) => {
        idOcr_postImageCompleted(
            setFieldValue,
            { KEY_IC_NO, KEY_FULL_NAME, KEY_DATE_BIRTH, KEY_ADDRESS },
            { name, id, dob, address }
        )
    }

    useEffect(() => {
        if (isObjEmpty(stepInfo)) {
            resetForm()
            return
        }
        fillMultipleStepInfo(stepInfo, setFieldValue, setValues)
    }, [stepInfo.icNo])

    return (
        <div className={className}>
            <Row className="mb-1">
                <Col xs={12} md={4}>
                    <OcrInput
                        ocrType={OCR_TYPE_ID_PERSON}
                        idKeylangBtnName={getKeyLang(`IdPersonOcr`)}
                        completedCallback={postImageCompleted}
                        className="ocr-input"
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex8"
                        onChange={({ content }) => {
                            setFieldValue(KEY_INSURED_TYPE, content)
                        }}
                        value={insuredPersonTypes.find(elt => elt.content === values[KEY_INSURED_TYPE])}
                        options={insuredPersonTypes}
                        placeholder={intl.formatMessage({ id: getKeyLang(`insuredPerson`) })}
                        isClearable={false}
                    />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={4}>
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex7"
                        onChange={({ content }) => {
                            setFieldValue(KEY_IC_TYPE, content)
                        }}
                        value={IDTypes.find(type => type.content === values[KEY_IC_TYPE])}
                        options={IDTypes}
                        placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                        isClearable={false}
                    />
                </Col>
                <Col xs={12} md={4}>
                    <BaseFormDatePicker
                        messageId={getKeyLang(`IdDate`)}
                        fieldName={KEY_ISSUED_DATE}
                        errors={errors}
                        touched={touched}
                        options={
                            {
                                maxDate: moment().utc().format("YYYY-MM-DD"),
                                enableTime: false
                            }
                        }
                    />
                </Col>
                <Col xs={12} md={4}>
                    <BaseFormGroup
                        fieldName={KEY_ISSUED_PLACE}
                        errors={errors}
                        touched={touched}
                        messageId={getKeyLang(`IdPlace`)}
                    />
                </Col>
            </Row>

            <Row className={"mt-2"}>
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_IC_NO}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`IDPers`)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="check" onClick={checkInfoContact}
                                className="custom-check-btn"
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_FULL_NAME}
                            onChange={(e) => {
                                setFieldValue(KEY_FULL_NAME, e.target.value.toUpperCase())
                            }}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`Name`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={6}>
                    <BaseFormDatePicker
                        messageId={getKeyLang(`DateOfBirth`)}
                        fieldName={KEY_DATE_BIRTH}
                        errors={errors}
                        touched={touched}
                        options={
                            {
                                maxDate: moment().utc().format("YYYY-MM-DD"),
                                enableTime: false
                            }
                        }
                    />
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative" >
                        <BaseFormGroup
                            fieldName={KEY_PHONE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative">
                        <BaseFormGroup
                            fieldName={KEY_EMAIL}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`EmailTitle`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} >
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`Sex`)}
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
                                                        className="custom-zindex9"
                                                        onChange={({ content }) => {
                                                            setFieldValue(KEY_GENDER, content)
                                                        }}
                                                        value={sugg_Sex.find(gen => gen.content === values[KEY_GENDER])}
                                                        options={sugg_Sex}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [values[KEY_GENDER]])
                    }
                </Col>
            </Row>

            <AddressesRow
                formikSetFieldValue={setFieldValue} formikGetFieldMeta={getFieldMeta}
                keysMap={{ KEY_CITY, KEY_DISTRICT, KEY_WARD }}
                className="mt-2"
            />

            <Row className="mt-2">
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

            <FieldArray name={KEY_ADDTIONAL_ADDRESSES}>
                {
                    ({ remove, push }) => {
                        let _addtionalAddresses = values[KEY_ADDTIONAL_ADDRESSES]
                        if (!_addtionalAddresses) {
                            _addtionalAddresses = []
                        }
                        if (!values[KEY_TOGGLE_IS_ADDRESS_EQUAL] && _addtionalAddresses.length === 0) {
                            push(addtionalAddressDefault)
                        }

                        const toggleChange = () => {
                            if (values[KEY_TOGGLE_IS_ADDRESS_EQUAL]) {
                                setFieldValue(KEY_TOGGLE_IS_ADDRESS_EQUAL, false)
                                push(addtionalAddressDefault)
                                return
                            }
                            setFieldValue(KEY_TOGGLE_IS_ADDRESS_EQUAL, true)
                            remove(0)
                        }
                        const _defaulChecks = [
                            {
                                value: true,
                                handleChange: toggleChange,
                                title: intl.formatMessage({ id: getKeyLang(`yes`) }),
                            },
                            {
                                value: false,
                                handleChange: toggleChange,
                                title: intl.formatMessage({ id: getKeyLang(`no`) }),
                            },
                        ]

                        return (
                            <>
                                <RadioRow
                                    values={values}
                                    msgField={getKeyLang(`isAddressEqual`)}
                                    fieldName={KEY_TOGGLE_IS_ADDRESS_EQUAL}
                                    checks={_defaulChecks}
                                />
                                {
                                    _addtionalAddresses.map((elt, index) => {
                                        let __addtionalAddresses = [{ city: "", district: "", ward: "" }]
                                        if (Array.isArray(addtionalAddresses) && addtionalAddresses.length > 0) {
                                            __addtionalAddresses = [...addtionalAddresses]
                                        }
                                        const { city: _city, district: _district, ward: _ward } = __addtionalAddresses[0]

                                        return (
                                            <AddtionalAddress
                                                index={index} key={index} className="mt-3"
                                            />
                                        )
                                    })
                                }
                            </>
                        )
                    }
                }
            </FieldArray>

            <Row className="mt-3">
                <UnControlledPopover
                    targetId="uncontrolled-popover"
                    contents={[
                        "Điều kiện chung để ngôi nhà có thể được bảo hiểm là:",
                        "- Đường vào nhà rộng tối thiểu 4m hoặc đảm bảo được sự tiếp cận của phương tiện cứu hỏa trong trường hợp xảy ra sự cố cháy, nổ;",
                        "- Tuổi nhà không quá 25 năm."
                    ]}
                />
                <Col xs={12} md={6} >
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex4"
                        onChange={({ content }) => {
                            setFieldValue(`${KEY_HOUSE_TYPE}`, content)
                        }}
                        value={houseTypes.find(elt => elt.content === getFieldMeta(`${KEY_HOUSE_TYPE}`).value)}
                        options={houseTypes}
                        placeholder={intl.formatMessage({ id: getKeyLang(`contract.personalHome.houseType`) })}
                        isClearable={false}
                    />
                </Col>
                <Col xs={12} md={6} >
                    <BaseFormGroup
                        fieldName={`${KEY_TIME_USED}`}
                        errors={errors}
                        touched={touched}
                        messageId={getKeyLang(`contract.personalHome.timeUsed`)}
                    />
                </Col>
            </Row>
        </div >
    )
}

export default StepForm
