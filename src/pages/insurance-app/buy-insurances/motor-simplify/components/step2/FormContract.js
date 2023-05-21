import React from 'react'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import {
    KEY_ADDRESS, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_EMAIL, KEY_VEHICLE_TYPE,
    KEY_FULLNAME, KEY_PHONE_NUMBER, KEY_TOGGLE_TAI_NAN,
    KEY_LINE_VEHICLE, KEY_MANUFACTURER_VEHICLE, KEY_NUMBER_PLATE, KEY_AMOUNT_PEOPLE_EACH_CAR
} from './formikConfig'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import EdiableBlock from '../../../../../../components/insurance-app/common-forms/ediable-block'
import { useFormikContext } from 'formik'
import { COMPANIES, getKeyLang } from '../../../../../../configs/insurance-app'
import { FormattedMessage, useIntl } from 'react-intl'
import EditableDuration from './form-components/EditableDuration'
import { useDispatch } from 'react-redux'
import { KEY_VEHICLES_TYPE, KEY_FRAME_NUMBER, KEY_MACHINE_NUMBER } from '../step1/formikConfig'
import { doEverything } from './utility'
import { nextStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_STEP_2 } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { hasRequestFail, isArrayEmpty } from '../../../../../../ultity'
import { Select } from 'base-app'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const FormContract = ({ contractCode, datafees, paymentType, companyId, vehicleId, contractId, contractInfo, stepInfo = {} ,activeStep }) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const [manufacturerVehicles, setManufacturerVehicles] = React.useState([])
    const [lineVehicles, setLineVehicles] = React.useState([])

    const { getFieldMeta, setFieldValue, values } = useFormikContext()
    const { step_1 = {} } = stepInfo
    const { [KEY_VEHICLES_TYPE]: vehiclesType } = step_1

    const setManufacturerVehicle = (original, setFieldValue, setLineVehicles) => {
        setFieldValue(KEY_MANUFACTURER_VEHICLE, original.label)
        const convertedBrands = original.brands.map((elt, index) => {
            elt.value = index
            elt.label = elt.brand
            return elt
        })
        setLineVehicles(convertedBrands || [])
    }

    const saveAction = () => {
        const _step_1 = { ...step_1 }
        _step_1[KEY_FULLNAME] = values[KEY_FULLNAME]
        _step_1[KEY_ADDRESS] = values[KEY_ADDRESS]
        _step_1[KEY_PHONE_NUMBER] = values[KEY_PHONE_NUMBER]
        _step_1[KEY_EMAIL] = values[KEY_EMAIL]

        _step_1[KEY_VEHICLE_TYPE] = values[KEY_VEHICLE_TYPE]
        _step_1[KEY_NUMBER_PLATE] = values[KEY_NUMBER_PLATE]
        _step_1[KEY_MANUFACTURER_VEHICLE] = values[KEY_MANUFACTURER_VEHICLE]
        _step_1[KEY_LINE_VEHICLE] = values[KEY_LINE_VEHICLE]

        dispatch(updateProps([
            {
                prop: BASE.KEY_STEP_1,
                value: _step_1
            },
            {
                prop: KEY_STEP_2,
                value: values
            },
        ]))

        doEverything(dispatch, _step_1, values, vehicleId, companyId, contractId, contractInfo)
    }

    const ownerDetails_1 = [
        {
            label: intl.formatMessage({ id: getKeyLang("Email") }),
            content: getFieldMeta(KEY_EMAIL).value,
            formikKey: KEY_EMAIL,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("PartnerPhone") }),
            content: getFieldMeta(KEY_PHONE_NUMBER).value,
            formikKey: KEY_PHONE_NUMBER,
        },
    ]

    const ownerDetails_2 = [
        {
            label: intl.formatMessage({ id: getKeyLang("owner") }),
            content: getFieldMeta(KEY_FULLNAME).value,
            formikKey: KEY_FULLNAME,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("Address") }),
            content: getFieldMeta(KEY_ADDRESS).value,
            formikKey: KEY_ADDRESS,
        },
    ]

    const vehicleDetails = [
        {
            label: intl.formatMessage({ id: getKeyLang("TypeVihicle") }),
            content: !isArrayEmpty(vehiclesType) && vehiclesType.find(elt => elt.id === getFieldMeta(KEY_VEHICLE_TYPE).value)?.name,
            contentInput: <Select
                readOnly
                isClearable={false}
                closeMenuOnSelect={true}
                classNamePrefix='select mt-1'
                className="custom-zindex8"
                styles={getFieldMeta(KEY_VEHICLE_TYPE).error ? selectErrorStyles : selectNormalStyles}
                value={!isArrayEmpty(vehiclesType) && vehiclesType.find(elt => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value)}
                options={vehiclesType || []}
                onChange={(original) => {
                    setFieldValue(KEY_VEHICLE_TYPE, original.value)
                }}
            />,
            formikKey: KEY_VEHICLE_TYPE,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("LicensePlate") }),
            content: getFieldMeta(KEY_NUMBER_PLATE).value,
            formikKey: KEY_NUMBER_PLATE,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("BrandVehicle") }),
            content: getFieldMeta(KEY_MANUFACTURER_VEHICLE).value,
            contentInput: <Select
                readOnly
                closeMenuOnSelect={true}
                classNamePrefix='select mt-1'
                className="custom-zindex7"
                maxMenuHeight={120}
                isClearable={false}
                options={manufacturerVehicles}
                styles={getFieldMeta(KEY_MANUFACTURER_VEHICLE).error ? selectErrorStyles : selectNormalStyles}
                value={manufacturerVehicles.find(elt => elt.label === getFieldMeta(KEY_MANUFACTURER_VEHICLE).value)}
                onChange={(original) => {
                    setManufacturerVehicle(original, setFieldValue, setLineVehicles)
                }}
            />,
            formikKey: KEY_MANUFACTURER_VEHICLE,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("LineVehicle") }),
            content: getFieldMeta(KEY_LINE_VEHICLE).value,
            contentInput: <Select
                readOnly
                isClearable={false}
                closeMenuOnSelect={true}
                classNamePrefix='select mt-1'
                maxMenuHeight={120}
                className="custom-zindex6"
                options={lineVehicles}
                styles={getFieldMeta(KEY_LINE_VEHICLE).error ? selectErrorStyles : selectNormalStyles}
                value={lineVehicles.find((elt) => {
                    const lineValFromRedux = getFieldMeta(KEY_LINE_VEHICLE).value // example: "CB 400"
                    const lineRegex = new RegExp(lineValFromRedux?.replace(/\s+/g, ".*?"), "ig")
                    return elt.label?.match(lineRegex)
                })}
                onChange={(original) => {
                    setFieldValue(KEY_LINE_VEHICLE, original.label)
                }}
            />,
            formikKey: KEY_LINE_VEHICLE,
        },

        {
            label: intl.formatMessage({ id: getKeyLang("ChassisNumber1") }),
            content: getFieldMeta(KEY_FRAME_NUMBER).value,
            formikKey: KEY_FRAME_NUMBER,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("EngineNumber") }),
            content: getFieldMeta(KEY_MACHINE_NUMBER).value,
            formikKey: KEY_MACHINE_NUMBER,
        },
    ]

    const _insurances = [
        <div className='' key={"TNDS"}>
            <FormattedMessage id={getKeyLang("BHBBTNDSCCXMTXM")} />
        </div>,
    ]

    if (getFieldMeta(KEY_TOGGLE_TAI_NAN).value) {
        _insurances.push(
            <div className='font-medium-2' key={"TAINAN"}>
                <FormattedMessage id={getKeyLang("BHTNNNTXMTXM")} />
            </div>
        )
    }

    const insuranceDetails = [
        {
            label: intl.formatMessage({ id: getKeyLang("InsuranceProduct") }),
            content: COMPANIES.find((elt) => elt.companyId === companyId)?.companyName,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("contains") }),
            content: (
                <>
                    {
                        _insurances
                    }
                </>
            ),
        },
        {
            label: intl.formatMessage({ id: getKeyLang("startDate") }),
            content: getFieldMeta(KEY_DATE_INSUR_FROM).value,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("endDateIns") }),
            content: getFieldMeta(KEY_DATE_INSUR_TO).value,
        },
    ]

    React.useEffect(() => {
        const _vehicleType = getFieldMeta(KEY_VEHICLE_TYPE).value
        if (_vehicleType === 21) { /* label: xe mô tô 3 bánh  */
            setFieldValue(KEY_AMOUNT_PEOPLE_EACH_CAR, 3)
        } else {
            setFieldValue(KEY_AMOUNT_PEOPLE_EACH_CAR, 2)
        }
    }, [getFieldMeta(KEY_VEHICLE_TYPE).value])

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

        getAllManufactures()
    }, []) // eslint-disable-line

    React.useEffect(() => {
        const _fillSelectInfo = () => {
            const brandVal = getFieldMeta(KEY_MANUFACTURER_VEHICLE).value
            const original = manufacturerVehicles.find(elt => elt.label === brandVal)
            if (!original) return

            setManufacturerVehicle(original, setFieldValue, setLineVehicles)
        }

        _fillSelectInfo()
    }, [manufacturerVehicles.length]) // eslint-disable-line

    React.useEffect(() => {
        const _fillSelectInfo = () => {
            const _lineValFromRedux = getFieldMeta(KEY_LINE_VEHICLE).value // example: "CB 400"
            const lineRegex = new RegExp(_lineValFromRedux?.replace(/\s+/g, ".*?"), "ig")
            const found = lineVehicles.find(elt => elt.label?.match(lineRegex))
            if (!found) return

            setFieldValue(KEY_LINE_VEHICLE, found.label)
        }

        _fillSelectInfo()
    }, [lineVehicles.length]) // eslint-disable-line

    return (
        <div>
            <Row className={"mb-1"}>
                <Col xs={6} md={4} >
                    <h5 className={"text-uppercase primary"}>
                        <FormattedMessage id={getKeyLang("InsuranceNum")} />
                    </h5>
                </Col>

                <Col xs={6} md={8}>
                    <h5 className={"text-uppercase font-weight-bold"}>
                        {contractCode || ""}
                    </h5>
                </Col>
            </Row>

            <EdiableBlock
                title={<FormattedMessage id={getKeyLang("OwnAcctInfo")} />}
                details={ownerDetails_1} className="mb-1"
                saveCallback={saveAction}
                isEditMode={true}
                isHideEditBtn={true}
            />

            <EdiableBlock
                details={ownerDetails_2} className=""
                saveCallback={saveAction}
            />

            <EdiableBlock
                title={<FormattedMessage id={getKeyLang("VehicleInfo")} />}
                details={vehicleDetails} className="mb-1"
                saveCallback={saveAction}
            />

            <EditableDuration
                title={<FormattedMessage id={getKeyLang("insuranceInfo")} />}
                contractInfo={contractInfo}
                details={insuranceDetails}
                dataFees={datafees} contractId={contractId}
                paymentType={paymentType} companyId={companyId}
                saveCallback={saveAction}
            />
        </div>
    )
}

export default FormContract
