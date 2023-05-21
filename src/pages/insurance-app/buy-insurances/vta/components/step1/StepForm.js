import React from 'react'
import * as Icon from 'react-feather'
import { useDispatch } from 'react-redux'
import { Button, Col, Row, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { FieldArray } from 'formik'
import { Select, BaseFormGroup, BaseAppUltils } from 'base-app'
import { API_VTA_INSURANCE_EXEL_TEMPLATE, getKeyLang } from '../../../../../../configs/insurance-app'
import {
    sugg_gender, IDTypes, KEY_ADDTIONAL_PEOPLE, addtionalPeopleInitValue, KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME,
    KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL, KEY_ADDRESS, KEY_CITY, KEY_WARD, KEY_DISTRICT,
    KEY_RELATIONSHIPS, KEY_INSUR_PACKAGE, KEY_RANGE_DATE, initialValues, relationships,
} from './formikConfig'
import TitleRow from '../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import AddtionalPeople from './form-components/AddtionalPeople'
import FullAddress from './form-components/FullAddress'
import { fillMultipleStepInfo, formatingDate, hasRequestFail, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { KEY_BUYER_TYPE, TEXT_GROUP, TEXT_INDIVIDUAL } from '../../../../../../redux/reducers/insurance-app/buyInsurancesVta'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesVta'
import ExelInput from "../../../../../../components/insurance-app/common-forms/custom-input/ExelInput"
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { OcrInput, OCR_TYPE_ID_PERSON } from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import Service from '../../../../../../services/insurance-app/appConfig'
import { idOcr_postImageCompleted } from '../../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const AddtionalPeopleBlock = ({
    index, keyMaps, errors, touched, IDTypes,
    setFieldValue, values, getFieldMeta, resetForm, setValues, sugg_gender
}) => {

    return (
        <>
            <AddtionalPeople
                index={index}
                stepInfo={{
                    errors, touched, setFieldValue, values, getFieldMeta, resetForm, setValues,
                    sugg_gender, IDTypes
                }}
                keyMaps={{
                    KEY_IC_TYPE: keyMaps.KEY_IC_TYPE,
                    KEY_IC_NO: keyMaps.KEY_IC_NO,
                    KEY_FULLNAME: keyMaps.KEY_FULLNAME,
                    KEY_DATE_BIRTH: keyMaps.KEY_DATE_BIRTH,
                    KEY_GENDER: keyMaps.KEY_GENDER,
                    KEY_PHONE_NUMBER: keyMaps.KEY_PHONE_NUMBER,
                    KEY_EMAIL: keyMaps.KEY_EMAIL,
                    KEY_ADDRESS: keyMaps.KEY_ADDRESS,
                    KEY_CITY: keyMaps.KEY_CITY,
                    KEY_DISTRICT: keyMaps.KEY_DISTRICT,
                    KEY_WARD: keyMaps.KEY_WARD,
                    KEY_RELATIONSHIPS: keyMaps.KEY_RELATIONSHIPS,
                    KEY_INSUR_PACKAGE: keyMaps.KEY_INSUR_PACKAGE,
                    KEY_RANGE_DATE: keyMaps.KEY_RANGE_DATE,
                }}
            />

            <div style={{ backgroundColor: "#d8d8d8", height: "1px", width: " 100%", marginTop: "2rem" }} className='mb-1' />
        </>
    )
}

const StepForm = ({ stepInfo, className, formik }) => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const { errors, touched, setFieldValue, values, getFieldMeta, resetForm, setValues } = formik
    const { step_1 } = stepInfo

    const setAddressesCallback = (addresses) => {
        if (isArrayEmpty(addresses)) {
            return
        }
        const { city, district, ward, detail } = addresses[0]

        setFieldValue(KEY_ADDRESS, detail || "")
        setFieldValue(KEY_CITY, city || "")
        setFieldValue(KEY_DISTRICT, district || "")
        setFieldValue(KEY_WARD, ward || "")
    }

    const postFileCallback = (exelData) => {
        const convert = (val, type = KEY_DATE_BIRTH) => {
            if (!val) return "no_value"

            if (type === KEY_DATE_BIRTH) {
                if (val.toString().match(/\d+-\d+-\d+.*/g)) {
                    return formatingDate(val)
                }
                return formatingDate(
                    // some kind of overly complicated and unnecessary regex =))
                    val.toString().replace(/((?!\d{6})\d((?=\d{4})|(?=\d{2}$)))/g, "$1-")
                )
            }
            if (type === KEY_GENDER) {
                if (val.toString().match(/\w*male\w*/gi)) {
                    return sugg_gender[0].content
                }
                if (val.toString().match(/\w*female\w*/gi)) {
                    return sugg_gender[1].content
                }
                return val.toString().match(/\w*nam\w*/gi) ? sugg_gender[0].content : sugg_gender[1].content
            }
            return "no_value"
        }

        const _addtionalPeople = exelData.map((person, index) => {
            let _per = { ...addtionalPeopleInitValue }
            if (index > 0) {
                _per[KEY_FULLNAME] = person[0]
                _per[KEY_DATE_BIRTH] = convert(person[1]) // dateOfBirth: 19880213 => 1988-02-13
                _per[KEY_GENDER] = convert(person[2], KEY_GENDER) // gender "NAM" => "MALE"
                _per[KEY_IC_NO] = person[3]
                _per[KEY_PHONE_NUMBER] = person[4]
                _per[KEY_EMAIL] = person[5]
                _per[KEY_ADDRESS] = person[6]
                _per[KEY_RELATIONSHIPS] = person[7] // if person[7] === BT => should auto fill info for buyer too
                _per[KEY_RANGE_DATE] = person[9]
                _per[KEY_INSUR_PACKAGE] = person[10]
                _per[KEY_IC_TYPE] = IDTypes[0].content
                return _per
            }
            return null
        })

        _addtionalPeople.shift()
        const _values = { ...values }
        _values[KEY_ADDTIONAL_PEOPLE] = _addtionalPeople

        const bt_beneficiary = _addtionalPeople.find(_person => _person[KEY_RELATIONSHIPS] === relationships[0].content)
        if (bt_beneficiary) {
            Object.keys(bt_beneficiary).forEach((prop) => {
                _values[prop] = bt_beneficiary[prop]
            })
        }
        setValues(_values)
    }

    const downloadFileCallback = () => {
        let fileName = formatingDate().toString().replace(/-/g, "_") + "_example"
        return [API_VTA_INSURANCE_EXEL_TEMPLATE, fileName]
    }

    const _buyerIDTypes = [
        {
            label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
            content: config.ID_TYPE_CMND,
            value: 1,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
            content: config.ID_TYPE_CCCD,
            value: 2,
        },
        {
            label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
            content: config.ID_TYPE_HC,
            value: 3,
        },
        {
            label: <FormattedMessage id={getKeyLang(`mst`)} />,
            content: config.ID_TYPE_MST,
            value: 4,
        },
    ]

    const postImageCompleted = (name, id, dob, address) => {
        idOcr_postImageCompleted(
            setFieldValue,
            { KEY_IC_NO, KEY_FULL_NAME: KEY_FULLNAME, KEY_DATE_BIRTH, KEY_ADDRESS },
            { name, id, dob, address }
        )
    }

    const _checkinfoContact = async () => {
        const res = await Service.checkInfoContact(getFieldMeta(KEY_IC_NO).value)
        if (hasRequestFail(res.status)) {
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`alert.notExistIcNo`) }))
            return
        }
        const { phoneNumber, fullName, icType, icNo, email, addresses } = res.data
        setFieldValue(KEY_PHONE_NUMBER, phoneNumber || "")
        setFieldValue(KEY_FULLNAME, fullName || "")
        setFieldValue(KEY_IC_TYPE, icType || "")
        setFieldValue(KEY_IC_NO, icNo || "")
        setFieldValue(KEY_EMAIL, email || "")
        setAddressesCallback && setAddressesCallback(addresses)
    }

    React.useEffect(() => {
        let _addtionalPeople = getFieldMeta(KEY_ADDTIONAL_PEOPLE).value
        if (_addtionalPeople.length > 1) {
            dispatch(updateProps([
                {
                    prop: KEY_BUYER_TYPE,
                    value: TEXT_GROUP
                }
            ]))
            return
        }
        dispatch(updateProps([
            {
                prop: KEY_BUYER_TYPE,
                value: TEXT_INDIVIDUAL
            }
        ]))
    }, [getFieldMeta(KEY_ADDTIONAL_PEOPLE).value.length])

    React.useEffect(() => {
        if (isObjEmpty(step_1)) { return }
        fillMultipleStepInfo(step_1, initialValues, setValues)
    }, [])

    return (
        <div className={className}>
            <TitleRow
                orderNumber="1" msg={<FormattedMessage id={getKeyLang(`insuranceBuyerInfo`)} />}
                className="mt-1"
            />

            <Row className="mt-2">
                <Col xs={12} md={4}>
                    <OcrInput
                        ocrType={OCR_TYPE_ID_PERSON}
                        idKeylangBtnName={getKeyLang(`IdPersonOcr`)}
                        completedCallback={postImageCompleted}
                        className="ocr-input"
                    />
                </Col>
            </Row>

            <Row className="">
                <Col xs={12} md={6}>
                    {
                        React.useMemo(() => {
                            return (
                                <Select
                                    readOnly
                                    closeMenuOnSelect={true}
                                    classNamePrefix='select mt-1'
                                    className="custom-zindex9"
                                    onChange={({ content }) => {
                                        setFieldValue(KEY_IC_TYPE, content)
                                    }}
                                    value={_buyerIDTypes.find(type => type.content === getFieldMeta(KEY_IC_TYPE).value)}
                                    options={_buyerIDTypes}
                                    placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                                    isClearable={false}
                                    maxMenuHeight={120}
                                    styles={getFieldMeta(KEY_IC_TYPE).error ? selectErrorStyles : selectNormalStyles}
                                    defaultValue={_buyerIDTypes.find(type => type.content === getFieldMeta(KEY_IC_TYPE).value)}
                                />
                            )
                        }, [getFieldMeta(KEY_IC_TYPE).value, getFieldMeta(KEY_IC_TYPE).error])
                    }
                </Col>

                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        {
                            React.useMemo(() => {
                                return (
                                    <BaseFormGroup
                                        fieldName={KEY_IC_NO}
                                        errors={errors}
                                        touched={touched}
                                        messageId={getKeyLang(`idPersOrMST`)}
                                    />
                                )
                            }, [getFieldMeta(KEY_IC_NO).value, getFieldMeta(KEY_IC_NO).error])
                        }

                        <InputGroupAddon addonType="append">
                            <Button color="check"
                                className="custom-check-btn"
                                onClick={_checkinfoContact}
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <Icon.CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>

            {
                getFieldMeta(KEY_IC_TYPE).value &&
                <>
                    <Row className={"mt-2"}>
                        <Col xs={12} md={4} >
                            <FormGroup className="position-relative">
                                <BaseFormGroup
                                    fieldName={KEY_FULLNAME}
                                    errors={errors}
                                    touched={touched}
                                    messageId={getKeyLang(`nameOrEnterprise`)}
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

                    <FullAddress
                        keyMaps={{
                            KEY_CITY: KEY_CITY,
                            KEY_DISTRICT: KEY_DISTRICT,
                            KEY_WARD: KEY_WARD,
                            KEY_ADDRESS: KEY_ADDRESS,
                        }}
                    />
                </>
            }

            <TitleRow
                orderNumber="2" msg={<FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} />}
                className="mt-1"
            />

            <Row className="mb-2">
                <Col xs={12} md={7} className="mb-2">
                    <div>
                        (*) Độ tuổi tham gia từ 0 đến 70 tuổi
                    </div>
                    <div>
                        (*) Không cần nhập số giấy tờ tùy thân cho trẻ dưới 14 tuổi
                    </div>
                </Col>

                <Col xs={12} md={5}>
                    <ExelInput
                        type={"DOWNLOAD"}
                        toggleFileCallback={downloadFileCallback}
                        msgField={<FormattedMessage id={getKeyLang(`downloadFile`)} />}
                    />

                    <ExelInput
                        type={"UPLOAD"}
                        toggleFileCallback={postFileCallback}
                        msgField={<FormattedMessage id={getKeyLang(`upFile`)} />}
                        className="ml-2"
                    />
                </Col>
            </Row>

            <FieldArray name={KEY_ADDTIONAL_PEOPLE}>
                {
                    ({ remove, push }) => {
                        let addtionalPeople = getFieldMeta(KEY_ADDTIONAL_PEOPLE).value
                        if (!Array.isArray(addtionalPeople)) {
                            addtionalPeople = []
                        }

                        return (
                            <>
                                {
                                    addtionalPeople.map((elt, index) => {
                                        return (
                                            <AddtionalPeopleBlock key={index}
                                                keyMaps={{
                                                    KEY_IC_TYPE: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_TYPE}`,
                                                    KEY_IC_NO: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`,
                                                    KEY_FULLNAME: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`,
                                                    KEY_DATE_BIRTH: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`,
                                                    KEY_GENDER: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`,
                                                    KEY_PHONE_NUMBER: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_PHONE_NUMBER}`,
                                                    KEY_EMAIL: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_EMAIL}`,
                                                    KEY_ADDRESS: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_ADDRESS}`,
                                                    KEY_CITY: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_CITY}`,
                                                    KEY_DISTRICT: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DISTRICT}`,
                                                    KEY_WARD: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_WARD}`,

                                                    KEY_RELATIONSHIPS: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RELATIONSHIPS}`,
                                                    KEY_INSUR_PACKAGE: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_INSUR_PACKAGE}`,
                                                    KEY_RANGE_DATE: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RANGE_DATE}`,
                                                }}
                                                index={index} remove={remove}
                                                errors={errors} touched={touched}
                                                setFieldValue={setFieldValue} values={values} getFieldMeta={getFieldMeta}
                                                resetForm={resetForm} setValues={setValues}
                                                sugg_gender={sugg_gender} IDTypes={IDTypes}
                                            />
                                        )
                                    })
                                }

                                <Row className="mt-3">
                                    <Col xs={0} md={6} />
                                    <Col xs={6} md={3} >
                                        {
                                            getFieldMeta(KEY_ADDTIONAL_PEOPLE).value.length > 1 &&
                                            <Button
                                                color="danger" className="w-100"
                                                onClick={() => {
                                                    remove(getFieldMeta(KEY_ADDTIONAL_PEOPLE).value.length - 1)
                                                }}
                                            >
                                                <FormattedMessage id={getKeyLang(`remove`)} />
                                            </Button>
                                        }
                                    </Col>
                                    <Col xs={6} md={3} >
                                        <Button
                                            color="primary" className="w-100"
                                            onClick={() => {
                                                push(addtionalPeopleInitValue)
                                            }}
                                        >
                                            <FormattedMessage id={getKeyLang(`addPerson`)} />
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )
                    }
                }
            </FieldArray>
        </div >
    )
}

export default StepForm