import 'react-toggle/style.css'
import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Button } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import icInOn from '../../../../../../assets/images/insurance-app/buy-insurance/ic_inon.png'
import Toggle from "react-toggle"
import BBTndsInsurCar from './insur-components/BBTndsInsurCar'
import TndsTnInsurCar from './insur-components/TndsTnInsurCar'
import VatChatInsurCar from './insur-components/VatChatInsurCar'
import TaiNanInsurCar from './insur-components/TaiNanInsurCar'
import {
    KEY_GROSS_TON, KEY_MAX_GROSS_TON, KEY_MAX_NUM_IN_CAR, KEY_MIN_XTRIEU_TAI_HANHKHACH, KEY_NUM_IN_CAR, KEY_TOGGLE_BBTNDS, KEY_TOGGLE_HH, KEY_TOGGLE_TNDSTN,
    KEY_TOGGLE_TNLPL, KEY_TOGGLE_VC, KEY_XTRIEU_TAI_HANHKHACH, KEY_XTRIEU_TAI_HANHKHACH_DISABLE
} from './formikConfig'
import { fillMultipleStepInfo } from './utility'
import { getDataFee, isObjEmpty } from '../../../../../../ultity'
import CalFeeDone from '../../../../../../components/insurance-app/common-forms/calculate-fee/CalFeeDone'
import Utils from '../../../../../../configs/insurance-app/constants/Utils'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { KEY_COMPANY_ID, KEY_FEE_BHVC, KEY_TOTAL_FEE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import HangHoa from './insur-components/HangHoa'
import {
    CAPACITY_TYPE_ALL, CAPACITY_TYPE_LOAD, CAPACITY_TYPE_SEAT,
    KEY_CAPACITY_TYPE, KEY_INON_TYPE, KEY_LOADS, KEY_PURPOSE, KEY_SEATS
} from '../step1/formikConfig'

const StepForm = ({ className, dispatch, stepInfo, callbacks, addtionalInfo, formik }) => {
    const { values, errors, touched, getFieldMeta, setFieldValue } = formik
    const { companyId, isCalFee, dataFees, isLoading } = addtionalInfo
    const { callFee, disableContinueBtn } = callbacks
    const { step_1, step_2 } = stepInfo
    const shouldHideHangHoa = step_1[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_SEAT

    const assginCompanyId = (feeCompanyId) => {
        const dataFee = getDataFee(dataFees, feeCompanyId)

        dispatch(
            updateProps([
                {
                    prop: KEY_COMPANY_ID,
                    value: feeCompanyId
                },
                {
                    prop: KEY_TOTAL_FEE,
                    value: dataFee["totalFee"]
                },
            ])
        )
        if (dataFee.CAR_VATCHAT) {
            dispatch(
                updateProps([
                    {
                        prop: KEY_FEE_BHVC,
                        value: dataFee.CAR_VATCHAT
                    },
                ])
            )
        }
    }

    const calDataFeeForToggle = (dataFeeElt) => {
        let data = []
        if (typeof (dataFeeElt.CAR_TNDS) !== 'undefined') {
            data = [...data, {
                name: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSCar`)} />,
                value: Utils.formatCurrency(dataFeeElt.CAR_TNDS) + " VND"
            }]
        }

        if (typeof (dataFeeElt.CAR_TNDS_TN) !== 'undefined') {
            data = [...data, {
                name: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSTNCar`)} />,
                value: Utils.formatCurrency(dataFeeElt.CAR_TNDS_TN.value1 + dataFeeElt.CAR_TNDS_TN.value2 + dataFeeElt.CAR_TNDS_TN.value3) + " VND"
            }]
        }

        if (typeof (dataFeeElt.CAR_VATCHAT) !== 'undefined') {
            data = [...data, {
                name: <FormattedMessage id={getKeyLang(`FeeInsMaterialCar`)} />,
                value: Utils.formatCurrency(dataFeeElt.CAR_VATCHAT) + " VND"
            }]
        }

        if (typeof (dataFeeElt.CAR_CONNGUOI) !== 'undefined') {
            data = [...data, {
                name: <FormattedMessage id={getKeyLang(`FeeInsBHTNLPXNTX`)} />,
                value: Utils.formatCurrency(dataFeeElt.CAR_CONNGUOI) + " VND"
            }]
        }

        if (typeof (dataFeeElt.CAR_HANGHOA) !== 'undefined') {
            data = [...data, {
                name: <FormattedMessage id={getKeyLang(`FeeInsCommodity`)} />,
                value: Utils.formatCurrency(dataFeeElt.CAR_HANGHOA) + " VND"
            }]
        }
        return data
    }

    const renderInsurCarComponent = (status, component, isHide) => {
        if (isHide) return undefined

        if (status) {
            return component
        }
        return undefined
    }

    const renderToggle = (fieldName, toggleOnChange, msgField, isHide) => {
        if (isHide) return undefined

        return (
            <Row className="mb-1">
                <Col xs={9} md={6}>
                    <div className="d-flex align-items-center">
                        <img
                            className="rounded-circle mr-50"
                            src={icInOn}
                            alt="ic"
                        />
                        <span className="align-middle font-medium-1 text-title-color letter-uppercase">
                            <b><FormattedMessage id={msgField} /></b>
                        </span>
                    </div>
                </Col>

                <Col xs={3} md={6}>
                    <Toggle
                        onChange={(toggleOnChange)}
                        className="switch-danger-primary"
                        icons={false}
                        checked={getFieldMeta(fieldName).value}
                    />
                </Col>
            </Row>
        )
    }

    useEffect(() => {
        if (isObjEmpty(step_2)) { return }
        fillMultipleStepInfo(setFieldValue, step_2)
    }, [JSON.stringify(step_2)])

    useEffect(() => {
        if (step_1[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_SEAT || step_1[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_ALL) {
            setFieldValue(KEY_NUM_IN_CAR, step_1[KEY_SEATS])
            setFieldValue(KEY_MAX_NUM_IN_CAR, step_1[KEY_SEATS])
        }

        if (step_1[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_LOAD || step_1[KEY_CAPACITY_TYPE] === CAPACITY_TYPE_ALL) {
            setFieldValue(KEY_GROSS_TON, step_1[KEY_LOADS])
            setFieldValue(KEY_MAX_GROSS_TON, step_1[KEY_LOADS])
        }
    }, [])

    useEffect(() => {
        const inonTypesExcludesive = ["VAN", "TB<10", "TAI>10", "TB>10", "R", "DK", "RSS", "PICKUP", "XKKD"]
        const busCarExcludesive = "XB"
        const step_1_inon_type = step_1[KEY_INON_TYPE]?.toString()
        if (step_1[KEY_PURPOSE] === "KKD") {
            if (step_1_inon_type === busCarExcludesive) { // bus car is an exception
                setFieldValue(KEY_MIN_XTRIEU_TAI_HANHKHACH, 0)
                setFieldValue(KEY_XTRIEU_TAI_HANHKHACH, 10)
                return
            }
            setFieldValue(KEY_XTRIEU_TAI_HANHKHACH_DISABLE, true)
            setFieldValue(KEY_MIN_XTRIEU_TAI_HANHKHACH, 0)
            setFieldValue(KEY_XTRIEU_TAI_HANHKHACH, 0)
        }
        else if (inonTypesExcludesive.find(elt => elt.toString() === step_1_inon_type)) {
            setFieldValue(KEY_XTRIEU_TAI_HANHKHACH_DISABLE, true)
            setFieldValue(KEY_MIN_XTRIEU_TAI_HANHKHACH, 0)
            setFieldValue(KEY_XTRIEU_TAI_HANHKHACH, 0)
        }
    }, [])

    return (
        <div className={className}>
            {
                renderToggle(
                    KEY_TOGGLE_BBTNDS,
                    (e) => {
                        disableContinueBtn && disableContinueBtn()

                        if (getFieldMeta(KEY_TOGGLE_BBTNDS).value) {
                            if (!getFieldMeta(KEY_TOGGLE_VC).value) return
                            setFieldValue(KEY_TOGGLE_BBTNDS, false)
                            return
                        }
                        setFieldValue(KEY_TOGGLE_BBTNDS, true)
                    },
                    getKeyLang(`InsBBTNDSCar`)
                )
            }

            {
                renderInsurCarComponent(
                    getFieldMeta(KEY_TOGGLE_BBTNDS).value,
                    <BBTndsInsurCar
                        values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
                        disableContinueBtn={disableContinueBtn}
                    />
                )
            }

            {
                renderToggle(
                    KEY_TOGGLE_TNDSTN,
                    (e) => {
                        disableContinueBtn && disableContinueBtn()
                        if (!getFieldMeta(KEY_TOGGLE_BBTNDS).value && !getFieldMeta(KEY_TOGGLE_VC).value) {
                            return
                        }

                        if (getFieldMeta(KEY_TOGGLE_TNDSTN).value) {
                            setFieldValue(KEY_TOGGLE_TNDSTN, false)
                            return
                        }
                        setFieldValue(KEY_TOGGLE_TNDSTN, true)
                    },
                    getKeyLang(`InsBBTNDSTNCar`)
                )
            }

            {
                renderInsurCarComponent(
                    getFieldMeta(KEY_TOGGLE_TNDSTN).value,
                    <TndsTnInsurCar
                        values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
                        disableContinueBtn={disableContinueBtn}
                    />
                )
            }

            {
                renderToggle(
                    KEY_TOGGLE_VC,
                    () => {
                        disableContinueBtn && disableContinueBtn()

                        if (getFieldMeta(KEY_TOGGLE_VC).value) {
                            if (!getFieldMeta(KEY_TOGGLE_BBTNDS).value) return
                            setFieldValue(KEY_TOGGLE_VC, false)
                            return
                        }
                        setFieldValue(KEY_TOGGLE_VC, true)
                    },
                    getKeyLang(`InsMaterialCar`)
                )
            }

            {
                renderInsurCarComponent(
                    getFieldMeta(KEY_TOGGLE_VC).value,
                    <VatChatInsurCar
                        values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
                        disableContinueBtn={disableContinueBtn}
                    />
                )
            }

            {
                renderToggle(
                    KEY_TOGGLE_TNLPL,
                    () => {
                        disableContinueBtn && disableContinueBtn()
                        if (!getFieldMeta(KEY_TOGGLE_BBTNDS).value && !getFieldMeta(KEY_TOGGLE_VC).value) {
                            return
                        }

                        if (getFieldMeta(KEY_TOGGLE_TNLPL).value) {
                            setFieldValue(KEY_TOGGLE_TNLPL, false)
                            return
                        }
                        setFieldValue(KEY_TOGGLE_TNLPL, true)
                    },
                    getKeyLang(`InsBHTNLPXNTX`)
                )
            }

            {
                renderInsurCarComponent(
                    getFieldMeta(KEY_TOGGLE_TNLPL).value,
                    <TaiNanInsurCar
                        values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
                        disableContinueBtn={disableContinueBtn}
                    />
                )
            }

            {
                renderToggle(
                    KEY_TOGGLE_HH,
                    () => {
                        disableContinueBtn && disableContinueBtn()
                        if (shouldHideHangHoa) return

                        if (getFieldMeta(KEY_TOGGLE_HH).value) {
                            setFieldValue(KEY_TOGGLE_HH, false)
                            return
                        }
                        setFieldValue(KEY_TOGGLE_HH, true)
                    },
                    getKeyLang(`InsCommodity`),
                    shouldHideHangHoa
                )
            }

            {
                renderInsurCarComponent(
                    getFieldMeta(KEY_TOGGLE_HH).value,
                    <HangHoa
                        values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
                        disableContinueBtn={disableContinueBtn}
                    />,
                    shouldHideHangHoa
                )
            }

            <Row>
                <Col xs={12} md={10} />
                <Col xs={12} md={2}>
                    <Button.Ripple
                        className='mr-1 mb-2 round btn-mobile-round'
                        outline color='primary'
                        disabled={isLoading}
                        onClick={callFee}
                    >
                        <FormattedMessage id={getKeyLang(`HanlerFee`)} />
                    </Button.Ripple>
                </Col>
            </Row>

            {
                isCalFee &&
                <Row>
                    <Col sm={12} className="margin-top-14">
                        <CalFeeDone
                            companyId={companyId}
                            assignCompanyId={assginCompanyId} dataFees={dataFees}
                            popoverFeeAction={calDataFeeForToggle}
                        />
                    </Col>
                </Row>
            }
        </div>
    )
}

export default StepForm