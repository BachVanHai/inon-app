import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import React, { useMemo, useState, useEffect } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { Select, BaseFormGroup, Button, CurrencyInput, BaseFormDatePicker } from 'base-app'
import {
    sugg_OriginProd, sugg_vehicleStatus, sugg_Purpose, KEY_GT_XE_KHAIBAO, KEY_ORIGIN_PRODUCT, KEY_YEAR_PRODUCT, KEY_VEHICLE_STATUS, KEY_NUMBER_PLATE, KEY_LOADS,
    KEY_PURPOSE, KEY_CHASSIS_NUMBER, KEY_ENGINE_NUMBER, KEY_GTBH_YEUCAU, KEY_VEHICLE_TYPE, KEY_MANUFACTURER_NAME, KEY_BRAND_NAME, KEY_CAPACITY_TYPE, KEY_SEATS,
    normalStyles, errorStyles, errorStylesRemoveLeft, normalStyleRemoveLeft, errorStyleRemoveRight, normalStylesRemoveRight, CAPACITY_TYPE_ALL,
    CAPACITY_TYPE_LOAD, CAPACITY_TYPE_SEAT, KEY_MIN_SEATS, KEY_MIN_LOADS, KEY_MAX_SEATS, KEY_MAX_LOADS, KEY_INON_TYPE, KEY_BUSINESS_STATUS,
    KEY_NAME, KEY_ADDRESS,
} from './formikConfig'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { CheckCircle } from 'react-feather'
import moment from 'moment'
import { OcrInput, OCR_TYPE_VEHICLE_REGISTRATION, OCR_TYPE_VEHICLE_INSPECTOR } from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import {
    convertNumberToCurrency,
    convertStrToNumber,
    hasRequestFail,
    isObject,
    isObjEmpty,
    isValueEmpty,
    MAX_INIT_CAR_VALUE
} from '../../../../../../ultity'
import { fillMultipleStepInfo } from './utility'
import Utils from '../../../../../../configs/insurance-app/constants/Utils'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import { registrationOcr_postImageCompleted, inspectorOcr_postImageCompleted } from '../../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import { useSelector } from 'react-redux'
import { REDUX_STATE_NAME } from '../stepsManager'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const StepForm = ({ className, stepInfo = { numberPlate: 0 }, callbacks, addtionalInfo, formik }) => {
    const intl = useIntl()
    const {step_1} = useSelector(state => state.app[REDUX_STATE_NAME])
    const [sugg_LineVehicle, setSugg_LineVehicle] = useState([])
    const [suggPurposeShow, setSuggPurposeShow] = useState(sugg_Purpose)

    const { sugg_Vehicle, sugg_Automaker, } = addtionalInfo
    const { handleCheckInfoCar } = callbacks

    const { setFieldValue, values, errors, touched, getFieldMeta, resetForm } = formik

    const registrationImageCompleted = (brand, model, chassis, engine, plate, year_of_manufacture, name, address) => {
        registrationOcr_postImageCompleted(
            setFieldValue,
            {
                KEY_MANUFACTURER_NAME,
                KEY_BRAND_NAME,
                KEY_NUMBER_PLATE,
                KEY_CHASSIS_NUMBER,
                KEY_ENGINE_NUMBER,
                KEY_YEAR_PRODUCT,
                KEY_NAME,
                KEY_ADDRESS
            },
            {
                setSugg_LineVehicle,
                sugg_Automaker, brand, model, plate,
                chassis, engine, year_of_manufacture,
                name, address
            }
        )
    }

    const inspectorImageCompleted = (chassis_number, engine_number, manufactured_year, manufactured_country, mark, model_code, registration_number) => {
        inspectorOcr_postImageCompleted(
            setFieldValue,
            {
                KEY_CHASSIS_NUMBER, KEY_ENGINE_NUMBER, KEY_MANUFACTURER_NAME, KEY_ORIGIN_PRODUCT, KEY_NUMBER_PLATE, KEY_YEAR_PRODUCT, KEY_BRAND_NAME
            },
            {
                setSugg_LineVehicle, sugg_Automaker, chassis_number, engine_number, mark, manufactured_country, registration_number, manufactured_year, model_code
            }
        )
    }

    useEffect(() => {
        const loadMinMaxSeatAndLoadVehicleType = async () => {
            const formData = {
                inonType: getFieldMeta(KEY_INON_TYPE).value,
                businessStatus: getFieldMeta(KEY_BUSINESS_STATUS).value,
            }
            const res = await Service.getMinMaxSeatLoadVehicleType(formData)
            if (hasRequestFail(res.status)) return

            const { minSeats, minLoads, maxSeats, maxLoads } = res.data
            setFieldValue(KEY_MIN_SEATS, minSeats)
            setFieldValue(KEY_MIN_LOADS, minLoads)
            setFieldValue(KEY_MAX_SEATS, maxSeats)
            setFieldValue(KEY_MAX_LOADS, maxLoads)
        }
        if (isValueEmpty(getFieldMeta(KEY_INON_TYPE).value) || isValueEmpty(getFieldMeta(KEY_BUSINESS_STATUS).value)) return
        const suggPurpose = getFieldMeta(KEY_BUSINESS_STATUS).value !== 'A' ? suggPurposeShow.filter(_elt => _elt.temp === getFieldMeta(KEY_BUSINESS_STATUS).value) : suggPurposeShow
        setSuggPurposeShow(suggPurpose)
        loadMinMaxSeatAndLoadVehicleType()
    }, [getFieldMeta(KEY_INON_TYPE).value, getFieldMeta(KEY_BUSINESS_STATUS).value])

    useEffect(() => {
        if (isObjEmpty(stepInfo)) { return }

        const info = { ...stepInfo, sugg_Automaker, setSugg_LineVehicle }
        fillMultipleStepInfo(setFieldValue, info)
    }, [JSON.stringify(stepInfo)])

    return (
        <div className={className}>
            <Row className="d-flex justify-content-md-start justify-content-center">
                <div className="ocr-input-wrapper">
                    <OcrInput
                        ocrType={OCR_TYPE_VEHICLE_REGISTRATION}
                        idKeylangBtnName={getKeyLang(`vehicleRegistrationOcr`)}
                        completedCallback={registrationImageCompleted}
                        className="mr-1 ocr-input"
                    />
                </div>
                <div className="ocr-input-wrapper">
                    <OcrInput
                        ocrType={OCR_TYPE_VEHICLE_INSPECTOR}
                        idKeylangBtnName={getKeyLang(`vehicleInspectionOcr`)}
                        completedCallback={inspectorImageCompleted}
                        className="ocr-input"
                    />
                </div>
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`vehicleStatus`)}
                                    className="formatted-message"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <FormGroup className="mb-0">
                                                    <Select
                                                        readOnly
                                                        closeMenuOnSelect={true}
                                                        isSearchable={false}
                                                        classNamePrefix='select mt-1'
                                                        className="custom-zindex9"
                                                        maxMenuHeight={140}
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_VEHICLE_STATUS, original.temp)
                                                        }}
                                                        value={sugg_vehicleStatus.find(elt => elt.temp === values[KEY_VEHICLE_STATUS])}
                                                        options={sugg_vehicleStatus}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                        styles={getFieldMeta(KEY_VEHICLE_STATUS).error ? errorStyles : normalStyles}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [values[KEY_VEHICLE_STATUS], getFieldMeta(KEY_VEHICLE_STATUS).error])
                    }
                </Col>

                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_NUMBER_PLATE}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`LicensePlate`)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="check" onClick={handleCheckInfoCar.bind(null, setFieldValue, values[KEY_NUMBER_PLATE], setSugg_LineVehicle, resetForm)}
                                className="custom-check-btn"
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex8"
                        maxMenuHeight={140}
                        onChange={(original) => {
                            setFieldValue(KEY_VEHICLE_TYPE, original.value)
                            setFieldValue(KEY_INON_TYPE, original.inonType)
                            setFieldValue(KEY_CAPACITY_TYPE, original.capacityType)

                            if (original.businessStatus == 'KD') {
                                setSuggPurposeShow([sugg_Purpose[0]])
                                setFieldValue(KEY_PURPOSE, "")
                                setFieldValue(KEY_BUSINESS_STATUS, "KD")
                            } else if (original.businessStatus == 'KKD') {
                                setSuggPurposeShow([sugg_Purpose[1]])
                                setFieldValue(KEY_PURPOSE, "")
                                setFieldValue(KEY_BUSINESS_STATUS, "KKD")
                            } else {
                                setSuggPurposeShow(sugg_Purpose)
                                setFieldValue(KEY_BUSINESS_STATUS, "A")
                            }
                        }}
                        value={sugg_Vehicle.find(elt => elt.value == values[KEY_VEHICLE_TYPE])}
                        options={sugg_Vehicle}
                        placeholder={intl.formatMessage({ id: getKeyLang("TypeVehicleTitle") })}
                        isClearable={false}
                        styles={getFieldMeta(KEY_VEHICLE_TYPE).error ? errorStyles : normalStyles}
                    />
                </Col>

                <Col xs={12} md={3} className="pr-none bdr-none">
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex7"
                        maxMenuHeight={140}
                        onChange={(original) => {
                            setFieldValue(KEY_MANUFACTURER_NAME, original.label)
                            setFieldValue(KEY_BRAND_NAME, "")
                            setSugg_LineVehicle(original.brands)
                        }}
                        value={sugg_Automaker.find(elt => elt.label === values[KEY_MANUFACTURER_NAME])}
                        options={sugg_Automaker}
                        placeholder={intl.formatMessage({ id: getKeyLang("AutomakerVehicle") })}
                        isClearable={false}
                        styles={getFieldMeta(KEY_MANUFACTURER_NAME).error ? errorStyleRemoveRight : normalStylesRemoveRight}
                    />
                </Col>

                <Col xs={12} md={3} className={`pl-none bdl-none`}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`LineVehicle`)}
                                    className="formatted-message"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <Select
                                                    readOnly
                                                    closeMenuOnSelect={true}
                                                    classNamePrefix={`select mt-1`}
                                                    className="custom-zindex6"
                                                    maxMenuHeight={140}
                                                    onChange={(original) => {
                                                        setFieldValue(KEY_BRAND_NAME, original.label)
                                                    }}
                                                    value={sugg_LineVehicle.find(elt => elt.label === values[KEY_BRAND_NAME])}
                                                    options={sugg_LineVehicle}
                                                    placeholder={msg}
                                                    isClearable={false}
                                                    styles={getFieldMeta(KEY_BRAND_NAME).error ? errorStylesRemoveLeft : normalStyleRemoveLeft}
                                                />
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [sugg_LineVehicle.length, values[KEY_MANUFACTURER_NAME], values[KEY_BRAND_NAME], getFieldMeta(KEY_BRAND_NAME).error])
                    }
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`Purpose`)}
                                    className="formattedMessage"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <FormGroup className="mb-0">
                                                    <Select
                                                        readOnly
                                                        closeMenuOnSelect={true}
                                                        isSearchable={false}
                                                        classNamePrefix='select mt-1'
                                                        className="custom-zindex5"
                                                        maxMenuHeight={140}
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_PURPOSE, original.temp)
                                                        }}
                                                        value={suggPurposeShow.find(elt => elt.temp === values[KEY_PURPOSE])}
                                                        options={suggPurposeShow}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                        styles={getFieldMeta(KEY_PURPOSE).error ? errorStyles : normalStyles}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [getFieldMeta(KEY_PURPOSE).value, getFieldMeta(KEY_PURPOSE).error, JSON.stringify(suggPurposeShow)])
                    }
                </Col>

                <Col xs={12} md={3} className="pr-none bdr-none">
                    <FormGroup className="position-relative>">
                        <BaseFormGroup
                            fieldName={KEY_CHASSIS_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`ChassisNumber1`)}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={3} className="pl-none bdl-none">
                    <FormGroup className="position-relative>">
                        <BaseFormGroup
                            fieldName={KEY_ENGINE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`EngineNumber`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className={`mb-2`}>
                <Col xs={12} md={6} className={`${getFieldMeta(KEY_GT_XE_KHAIBAO).error && "mb-2"}`}>
                    <FormGroup className={"form-label-group"}>
                        <CurrencyInput
                            value={values[KEY_GT_XE_KHAIBAO]}
                            onChange={(e) => {
                                let initCarVal = convertStrToNumber(e.target.value)
                                if (initCarVal > MAX_INIT_CAR_VALUE) {
                                    initCarVal = MAX_INIT_CAR_VALUE
                                }
                                const initCarStr = convertNumberToCurrency(initCarVal)
                                setFieldValue(KEY_GT_XE_KHAIBAO, initCarStr)
                                setFieldValue(KEY_GTBH_YEUCAU, initCarStr)
                            }}
                            id={KEY_GT_XE_KHAIBAO}
                            placeholder={getKeyLang('ValueVehicle')}
                            className={`form-control form-label-group ${getFieldMeta(KEY_GT_XE_KHAIBAO).error ? 'is-invalid' : ""}`}
                        />
                        {
                            (getFieldMeta(KEY_GT_XE_KHAIBAO).error)
                            &&
                            <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                                {
                                    getFieldMeta(KEY_GT_XE_KHAIBAO).error
                                }
                            </div>
                        }
                        <Label >{intl.formatMessage({ id: getKeyLang('ValueVehicle') })}</Label>
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <FormGroup className={"form-label-group"}>
                        <CurrencyInput
                            value={values[KEY_GTBH_YEUCAU]}
                            onChange={(e) => {
                                let _val = e.target.value
                                const convertedVal = convertStrToNumber(_val)
                                const convertedGtXeKhaiBao = convertStrToNumber(values[KEY_GT_XE_KHAIBAO])
                                if (convertedVal > convertedGtXeKhaiBao) {
                                    _val = values[KEY_GT_XE_KHAIBAO]
                                }
                                setFieldValue(KEY_GTBH_YEUCAU, _val)
                            }}
                            id={KEY_GTBH_YEUCAU}
                            placeholder={getKeyLang('RequireValue')}
                            className={`form-control form-label-group ${getFieldMeta(KEY_GTBH_YEUCAU).error ? 'is-invalid' : ""}`}
                        />
                        {
                            (getFieldMeta(KEY_GTBH_YEUCAU).error)
                            &&
                            <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                                {
                                    getFieldMeta(KEY_GTBH_YEUCAU).error
                                }
                            </div>
                        }
                        <Label >{intl.formatMessage({ id: getKeyLang('RequireValue') })}</Label>
                    </FormGroup>
                </Col>
            </Row>

            <Row >
                <Col xs={12} md={6}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`OriginProd`)}
                                    className="formattedMessage"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <FormGroup className="mb-0">
                                                    <Select
                                                        readOnly
                                                        closeMenuOnSelect={true}
                                                        isSearchable={false}
                                                        classNamePrefix='select mt-1'
                                                        className="custom-zindex5"
                                                        maxMenuHeight={140}
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_ORIGIN_PRODUCT, original.temp)
                                                        }}
                                                        value={sugg_OriginProd.find(elt => elt.temp === values[KEY_ORIGIN_PRODUCT])}
                                                        options={sugg_OriginProd}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                        styles={getFieldMeta(KEY_ORIGIN_PRODUCT).error ? errorStyles : normalStyles}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [values[KEY_ORIGIN_PRODUCT], getFieldMeta(KEY_ORIGIN_PRODUCT).error])
                    }
                </Col>

                <Col xs={12} md={6} className={``}>
                    <BaseFormDatePicker
                        messageId={getKeyLang(`YearProd`)}
                        fieldName={KEY_YEAR_PRODUCT}
                        errors={errors}
                        touched={touched}
                        options={
                            {
                                maxDate: moment().utc(true).format("YYYY-MM-DD"),
                                enableTime: false
                            }
                        }
                    />
                </Col>
            </Row>

            {
                values[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_SEAT &&
                <Row className={`mt-1`}>
                    <Col xs={12} md={12} >
                        <BaseFormGroup
                            fieldName={KEY_SEATS}
                            messageId={getKeyLang(`Seat`)}
                            isShowErrorMessage={true}
                            errors={errors}
                            touched={touched}
                            onChange={(e) => {
                                setFieldValue(KEY_SEATS, Utils.removeChar(e.target.value))
                            }}
                        />
                    </Col>
                </Row>
            }

            {
                values[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_LOAD &&
                <Row className={`mt-1`}>
                    <Col xs={12} md={12} >
                        <BaseFormGroup
                            fieldName={KEY_LOADS}
                            messageId={getKeyLang(`Load`)}
                            isShowErrorMessage={true}
                            errors={errors}
                            touched={touched}
                            onChange={(e) => {
                                formik.setFieldValue(KEY_LOADS, Utils.removeCharCertWeight(e.target.value));
                            }}
                        />
                    </Col>
                </Row>
            }

            {
                values[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_ALL &&
                <>
                    <Row className={`mt-1`}>
                        <Col xs={12} md={6} >
                            <BaseFormGroup
                                formik={formik}
                                errors={errors}
                                touched={touched}
                                fieldName={KEY_SEATS}
                                messageId={getKeyLang(`Seat`)}
                                isShowErrorMessage={true}
                                onChange={e => {
                                    formik.setFieldValue(KEY_SEATS, Utils.removeChar(e.target.value));
                                }}
                            />
                        </Col>

                        <Col xs={12} md={6} >
                            <BaseFormGroup
                                formik={formik}
                                errors={errors}
                                touched={touched}
                                fieldName={KEY_LOADS}
                                messageId={getKeyLang(`Load`)}
                                isShowErrorMessage={true}
                                onChange={e => {
                                    formik.setFieldValue(KEY_LOADS, Utils.removeCharCertWeight(e.target.value));
                                }}
                            />
                        </Col>
                    </Row>
                </>
            }
        </div>
    )
}

export default StepForm
