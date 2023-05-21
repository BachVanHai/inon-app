import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useMemo, useEffect } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Select, BaseFormGroup, Button, BaseAppUltils } from 'base-app'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
    ID_TYPE_CMND, ID_TYPE_CCCD, ID_TYPE_HC, KEY_ADDRESS, KEY_IC_NO, KEY_EMAIL,
    KEY_PHONE_NUMBER, KEY_FULLNAME, KEY_IC_TYPE, KEY_CITY, KEY_DISTRICT, KEY_WARD, initialValues_pers
} from './formikConfig'
import { updateStepInfo } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { useDispatch } from 'react-redux'
import { OCR_TYPE_ID_PERSON, OcrInput } from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import FullAddressRowComp from '../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
import { fillMultipleStepInfo, hasRequestFail, isObjEmpty } from '../../../../../../ultity'
import Service from '../../../../../../services/insurance-app/buyInsurancesFamilySafety'

const Person = ({ stepInfo, className, formik }) => {
    const { errors, touched, setFieldValue, values, getFieldMeta, setValues } = formik
    const dispatch = useDispatch()

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

    const checkInfoContact = (id, failCallback) => {
        return async (dispatch) => {
            try {
                const res = await Service.checkInfoContact(id)
                if (hasRequestFail(res.status)) {
                    failCallback && failCallback()
                    return
                }

                const { fullName, email, icType, addresses, phoneNumber, icNo } = res.data
                const { city, district, ward, detail } = addresses[0]
                let stepInfo = {
                    fullName, email, icType, city, district, ward, detail, phoneNumber, icNo
                }
                fillMultipleStepInfo(stepInfo, initialValues_pers, setValues)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (isObjEmpty(stepInfo)) return
        fillMultipleStepInfo(stepInfo, initialValues_pers, setValues)
    }, [])

    const postImageCompleted = (name, id, dob, address) => {
        let stepInfo = {
            fullName: name,
            address: address,
            icNo: id,
        }
        dispatch(updateStepInfo(stepInfo))
    }

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
                                                        className="custom-zindex8"
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_IC_TYPE, original.content)
                                                        }}
                                                        value={IDTypes.find(elt => elt.content === values.icType)}
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
                        }, [values.icType])
                    }
                </Col>
                <Col xs={12} md={6}>
                    <InputGroup className={`form-label-group ${getFieldMeta(KEY_IC_NO).error && "mb-3"}`}>
                        <BaseFormGroup
                            fieldName={KEY_IC_NO}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`IDPers`)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="check" onClick={() => {
                                const failCallback = () => {
                                    BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("alert.notExistIcNo")} />)
                                }
                                dispatch(checkInfoContact(values.icNo, failCallback))
                            }}
                                className="custom-check-btn"
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={4} >
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_FULLNAME}
                            onChange={(e) => {
                                setFieldValue(`fullName`, e.target.value.toUpperCase())
                            }}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`Name`)}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12} md={4} >
                    <FormGroup className="form-label-group position-relative" >
                        <BaseFormGroup
                            fieldName={KEY_PHONE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12} md={4} >
                    <FormGroup className="form-label-group position-relative">
                        <BaseFormGroup
                            fieldName={KEY_EMAIL}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`EmailTitle`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <FullAddressRowComp
                zIndex="custom-zindex8"
                keysMap={{
                    KEY_CITY: KEY_CITY,
                    KEY_DISTRICT: KEY_DISTRICT,
                    KEY_WARD: KEY_WARD,
                    KEY_ADDRESS: KEY_ADDRESS
                }}
            />
        </div>
    )
}

export default Person
