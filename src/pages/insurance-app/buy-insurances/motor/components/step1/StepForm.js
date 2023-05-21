import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import React from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { Select, BaseFormGroup, Button, BaseAppUltils } from 'base-app'
import { CheckCircle } from 'react-feather'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { OcrInput, OCR_TYPE_VEHICLE_REGISTRATION } from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import { registrationOcr_postImageCompleted } from '../../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import {
    KEY_MANUFACTURER_VEHICLE, KEY_FRAME_NUMBER, KEY_LINE_VEHICLE, KEY_MACHINE_NUMBER,
    KEY_NUMBER_PLATE, KEY_VEHICLE_TYPE, initialValues, KEY_USER_NAME, KEY_USER_ADDRESS
} from './formikConfig'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { hasRequestFail, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { doEverything, setManufacturerVehicle, _fillMultipleStepInfo } from './utility'
import { useDispatch } from 'react-redux'

const StepForm = ({ stepInfo, formik, className }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [typeMotors, setTypeMotors] = React.useState([])
    const [manufacturerVehicles, setManufacturerVehicles] = React.useState([])
    const [lineVehicles, setLineVehicles] = React.useState([])
    const { errors, touched, getFieldMeta, setFieldValue, setValues } = formik

    const registrationImageCompleted = (brand, model, chassis, engine, plate, year_of_manufacture, name, address) => {
        registrationOcr_postImageCompleted(
            setFieldValue,
            {
                KEY_MANUFACTURER_NAME: KEY_MANUFACTURER_VEHICLE,
                KEY_BRAND_NAME: KEY_LINE_VEHICLE,
                KEY_NUMBER_PLATE: undefined,
                KEY_CHASSIS_NUMBER: KEY_NUMBER_PLATE,
                KEY_ENGINE_NUMBER: KEY_MACHINE_NUMBER,
                KEY_YEAR_PRODUCT: undefined
            },
            {
                "setSugg_LineVehicle": setLineVehicles,
                "sugg_Automaker": manufacturerVehicles,
                brand, model, plate, chassis, engine, year_of_manufacture
            } ,
        )
        const foundManuFacArr = manufacturerVehicles.filter(suggElt => brand.includes(suggElt.label))
        const step_1 = { ...initialValues }
        step_1[KEY_VEHICLE_TYPE] = 19
        step_1[KEY_LINE_VEHICLE] = model
        step_1[KEY_NUMBER_PLATE] = plate
        step_1[KEY_FRAME_NUMBER] = chassis
        step_1[KEY_MACHINE_NUMBER] = engine
        step_1[KEY_MANUFACTURER_VEHICLE] = foundManuFacArr[0].name

        step_1[KEY_USER_NAME] = name
        step_1[KEY_USER_ADDRESS] = address

        dispatch(doEverything(step_1))
    }

    const checkInfoVehicle = async () => {
        const res = await Service.checkInfoVehicle(getFieldMeta(KEY_NUMBER_PLATE).value)
        if (hasRequestFail(res.status)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("InfoNotExistsAlertContent")} />)
            return
        }
        const { machineNo, frameNo, vehicleType, manufacturerName, brandName } = res.data

        setFieldValue(KEY_MACHINE_NUMBER, machineNo)
        setFieldValue(KEY_FRAME_NUMBER, frameNo)
        setFieldValue(KEY_VEHICLE_TYPE, vehicleType.id)
        const original = !isArrayEmpty(manufacturerVehicles) ? manufacturerVehicles.find(elt => elt.label.search(new RegExp(manufacturerName, "g") > -1)) : undefined

        if (original) {
            setFieldValue(KEY_MANUFACTURER_VEHICLE, original.label)
            const convertedBrands = original.brands.map((elt, index) => {
                elt.value = index
                elt.label = elt.brand
                return elt
            })
            setLineVehicles(convertedBrands || [])
            const foundLineVehicle = original.brands.find(elt => elt.brand.search(new RegExp(brandName, "g") > -1))
            if (foundLineVehicle) {
                setFieldValue(KEY_LINE_VEHICLE, foundLineVehicle.brand)
            }
        }
    }

    React.useEffect(() => {
        const getAllManufactures = async () => {
            const res = await Service.getManufacturers()
            if (hasRequestFail(res.status)) return

            const getLists = res.data.map((list, i) => {
                list.value = i
                list.label = list.name
                return list
            })
            setManufacturerVehicles(getLists)
        }

        const getTypeMotor = async () => {
            const res = await Service.getTypeMotor()
            if (hasRequestFail(res.status)) return

            const getLists = res.data.map((list, i) => {
                list.value = list.id
                list.label = list.name
                return list
            })
            setTypeMotors(getLists)
        }

        getAllManufactures()
        getTypeMotor()
    }, []) // eslint-disable-line

    React.useEffect(() => {
        if (isObjEmpty(stepInfo)) return
        _fillMultipleStepInfo(stepInfo, initialValues, setValues)
    }, [JSON.stringify(stepInfo)]) // eslint-disable-line

    React.useEffect(() => {
        const _fillStepInfo = () => {
            const typeMotorVal = stepInfo[KEY_VEHICLE_TYPE]
            const found = typeMotors.find(elt => elt.value === typeMotorVal)
            if (!found) return

            setFieldValue(KEY_VEHICLE_TYPE, found.value)
        }

        _fillStepInfo()
    }, [typeMotors.length]) // eslint-disable-line

    React.useEffect(() => {
        const _fillStepInfo = () => {
            const brandVal = stepInfo[KEY_MANUFACTURER_VEHICLE]
            const original = manufacturerVehicles.find(elt => elt.label === brandVal)
            if (!original) return

            setManufacturerVehicle(original, setFieldValue, setLineVehicles)
        }

        _fillStepInfo()
    }, [manufacturerVehicles.length]) // eslint-disable-line

    React.useEffect(() => {
        const _fillStepInfo = () => {
            const lineValFromRedux = stepInfo[KEY_LINE_VEHICLE] // example: "CB 400"
            const lineRegex = new RegExp(lineValFromRedux?.replace(/\s+/g, ".*?"), "ig")
            const found = lineVehicles.find(elt => elt.label?.match(lineRegex))
            if (!found) return

            setFieldValue(KEY_LINE_VEHICLE, found.label)
        }

        _fillStepInfo()
    }, [lineVehicles.length]) // eslint-disable-line

    return (
        <div className={className}>
            <Row>
                <div className="ocr-input-wrapper">
                    <OcrInput
                        ocrType={OCR_TYPE_VEHICLE_REGISTRATION}
                        idKeylangBtnName={getKeyLang(`vehicleRegistrationOcr`)}
                        completedCallback={registrationImageCompleted}
                        className="mb-1 mr-1 ocr-input"
                    />
                </div>
            </Row>

            <Row >
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_NUMBER_PLATE}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`LicensePlate`)}
                            isShowErrorMessage={false}
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                color="check"
                                className={"custom-check-btn"}
                                onClick={checkInfoVehicle}
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>

                <Col xs={12} md={6} >
                    <Select
                        readOnly
                        isClearable={false}
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex8"
                        placeholder={intl.formatMessage({ id: getKeyLang("TypeVehicleTitle") })}
                        styles={getFieldMeta(KEY_VEHICLE_TYPE).error ? selectErrorStyles : selectNormalStyles}
                        value={typeMotors.find(elt => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value)}
                        options={typeMotors}
                        onChange={(original) => {
                            setFieldValue(KEY_VEHICLE_TYPE, original.value)
                        }}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={3} className="pr-none bdr-none">
                    <FormGroup className="position-relative>">
                        <BaseFormGroup
                            fieldName={KEY_FRAME_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`ChassisNumber`)}
                            isShowErrorMessage={false}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12} md={3} className="pl-none bdl-none">
                    <FormGroup className="position-relative>">
                        <BaseFormGroup
                            fieldName={KEY_MACHINE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`EngineNumber`)}
                            isShowErrorMessage={false}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={3} className="pr-none bdr-none">
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex7"
                        maxMenuHeight={120}
                        placeholder={intl.formatMessage({ id: getKeyLang("AutomakerVehicle") })}
                        isClearable={false}
                        options={manufacturerVehicles}
                        styles={getFieldMeta(KEY_MANUFACTURER_VEHICLE).error ? selectErrorStyles : selectNormalStyles}
                        value={manufacturerVehicles.find(elt => elt.label === getFieldMeta(KEY_MANUFACTURER_VEHICLE).value)}
                        onChange={(original) => {
                            setManufacturerVehicle(original, setFieldValue, setLineVehicles)
                        }}
                    />
                </Col>
                <Col xs={12} md={3} className={`pl-none bdl-none`}>
                    <Select
                        readOnly
                        isClearable={false}
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        maxMenuHeight={120}
                        className="custom-zindex6"
                        options={lineVehicles}
                        placeholder={intl.formatMessage({ id: getKeyLang("LineVehicle") })}
                        styles={getFieldMeta(KEY_LINE_VEHICLE).error ? selectErrorStyles : selectNormalStyles}
                        value={lineVehicles && lineVehicles.find(elt => {
                            if (elt.label === getFieldMeta(KEY_LINE_VEHICLE).value) {
                                return true
                            }
                            return false
                        })}
                        onChange={(original) => {
                            setFieldValue(KEY_LINE_VEHICLE, original.label)
                        }}
                    />
                </Col>
            </Row>
        </div >
    )
}

export default StepForm