import '../../../../../../assets/scss/insurance-app/common/slider.scss'
import '../../../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import "../../../../../../assets/scss/insurance-app/common/react-toggle.scss"
import "flatpickr/dist/themes/material_green.css"
import "rc-slider/assets/index.css"
import React, { useMemo, useEffect } from 'react'
import { Col, FormGroup, Row, } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import Button from 'reactstrap/lib/Button'
import { Check } from 'react-feather'
import Flatpickr from "react-flatpickr"
import Slider, { Handle } from "rc-slider"
import styled from "styled-components"
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { BaseFormDatePicker, BaseFormGroup } from 'base-app'
import lgbh from '../../../../../../assets/images/insurance-app/icons/lgbh.png'
import Radio from '../../../../../../components/insurance-app/radio/RadioVuexy'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { ATM, VISA_MASTER, QR_CODE, FUND_TRANSFER, BONUS } from './utility'
import { setIncompletedCalFee } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import CalFeeDone from './form-components/CalFeeDone'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { KEY_COUPON_CODE, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION, KEY_INSUR_VALUE, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO } from './formikConfig'

function MyHandle(props) {
    const { value, dragging, index, ...rest } = props;
    return (
        <FlexHandle key={index} value={value} {...rest}>
            {dragging && <Value>{value}</Value>}
        </FlexHandle>
    )
}
// If you want to center the text with the handle
const FlexHandle = styled(Handle)`
    display: flex;
    justify-content: center;
  `
// By default the text is rendered inside the handle, so we need to take it out
// white-space: nowrap; ensures that it doesn't break on a new line, due to the handle being very small
const Value = styled.div`
  margin-top: -32px;
  white-space: nowrap;
  color: red;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
  background: #0E6856;
  border: 1px solid #737373;
  padding: 2px;
  color: #f9f9f9;
  margin-bottom: 20px;
  opacity:0.9;
  `

const RowStyleForSlider = styled(Row)`
    padding-left: .45rem;
    padding-right: .45rem;
`

const StepForm = ({ stepInfo = { icNo: 0 }, handleCalFee, className, handleRadioPaymentTypeClick, formik }) => {
    const dispatch = useDispatch()
    const { values, errors, getFieldMeta, setFieldValue, touched } = formik
    const duration_fieldMeta = getFieldMeta(KEY_DURATION)
    const value_fieldMeta = getFieldMeta(KEY_INSUR_VALUE)
    const { companyId, contractId, hasCalFeeDone, dataFees, beneficiaries, paymentType,
        value, duration, couponCode } = stepInfo

    const defaulDay_MinInsuranceApplyFrom = useMemo(() => { return values[KEY_DATE_INSUR_FROM] }, [])

    

    const day_calculateInsuranceApplyTo = (value) => {
        setFieldValue(KEY_DURATION, value)
        setFieldValue(KEY_DATE_INSUR_FROM, moment(values[KEY_DATE_INSUR_FROM]).utc(true).format(DATE_FORMAT))
        setFieldValue(KEY_DATE_INSUR_TO, moment(values[KEY_DATE_INSUR_FROM]).add(value, `M`).utc(true).format(DATE_FORMAT))
    }

    const reverseCalFeeStatus = () => {
        if (hasCalFeeDone) {
            dispatch(setIncompletedCalFee())
        }
    }

    useEffect(() => {
        setFieldValue(KEY_INSUR_VALUE, value || values[KEY_INSUR_VALUE])
        setFieldValue(KEY_COUPON_CODE, couponCode || values[KEY_COUPON_CODE])
        day_calculateInsuranceApplyTo(duration || values[KEY_DURATION])
    }, [stepInfo.icNo])

    return (
        <div className={className}>
            <Row>
                <Col xs={4} md={6}>
                    <FormattedMessage id={getKeyLang(`insuranceDue`)} />
                </Col>
                <Col xs={8} md={6} >
                    <span className="text-bold-300 text-primary font-weight-bold">
                        {
                            duration_fieldMeta.value
                        }
                    </span>
                    <span>&nbsp;</span>
                    <span>Tháng</span>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={6} md={3} className="remove-padding-right mb-2">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`insuranceApplyFrom`)}
                        fieldName={KEY_DATE_INSUR_FROM}
                        errors={errors}
                        touched={touched}
                        className="form-control-right"
                        onChange={(dates) => {
                            reverseCalFeeStatus()
                            const _date = moment(dates[0]).utc(true).format(DATE_FORMAT)
                            setFieldValue(KEY_DATE_INSUR_FROM, _date)
                            setFieldValue(KEY_DATE_INSUR_TO, moment(_date).add(duration_fieldMeta.value, `M`).format(DATE_FORMAT))
                        }}
                        options={
                            {
                                minDate: defaulDay_MinInsuranceApplyFrom,
                                enableTime: false
                            }
                        }
                    />
                </Col>
                <Col xs={6} md={3} className="remove-padding-left">
                    <Flatpickr
                        className={`form-control form-control-background form-control-left`}
                        id={"insuranceApplyFromHour"}
                        placeholder={values[KEY_TIME_INSUR_FROM]}
                        value={values[KEY_TIME_INSUR_FROM]}
                        onChange={(dates) => {
                            reverseCalFeeStatus()
                            const _date = (dates[0])
                            const _currentTime = moment().utc(true).toDate()
                            const _modifiedTime = moment(dates[0]).utc(true).toDate()
                            if (_modifiedTime < _currentTime) {
                                const _plusOneDate = moment(dates[0]).utc(true).add(1, "d").format(DATE_FORMAT)
                                setFieldValue(KEY_DATE_INSUR_FROM, _plusOneDate)
                                setFieldValue(KEY_DATE_INSUR_TO, moment(_plusOneDate).add(duration_fieldMeta.value, `M`).format(DATE_FORMAT))
                            }
                            setFieldValue(KEY_TIME_INSUR_FROM, (_date))
                            setFieldValue(KEY_TIME_INSUR_TO, _date)
                        }}
                        options={
                            {
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                disableMobile: "true"
                            }
                        }
                    />
                </Col>

                <Col xs={6} md={3} className="remove-padding-right">
                    <BaseFormDatePicker
                        messageId={getKeyLang(`insuranceApplyTo`)}
                        fieldName={KEY_DATE_INSUR_TO}
                        errors={errors}
                        touched={touched}
                        className="form-control-right"
                        onChange={() => {
                            reverseCalFeeStatus()
                        }}
                        disabled={true}
                        options={
                            {
                                enableTime: false
                            }
                        }
                    />
                </Col>
                <Col xs={6} md={3} className="remove-padding-left">
                    <Flatpickr
                        className={`form-control form-control-background form-control-left`}
                        id={KEY_TIME_INSUR_TO}
                        placeholder={values[KEY_TIME_INSUR_TO]}
                        value={values[KEY_TIME_INSUR_TO]}
                        onChange={(date) => {
                            reverseCalFeeStatus()
                        }}
                        options={
                            {
                                enableTime: false,
                                noCalendar: true,
                                dateFormat: "H:i",
                                disableMobile: "true"
                            }
                        }
                    />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={5} className="d-flex mb-1">
                    <FormattedMessage id={getKeyLang(`insuranceFee`)} />
                    :
                    <span>&nbsp;</span>
                    <div className="font-weight-bold text-primary">
                        {
                            value_fieldMeta.value
                        }
                    </div>
                    <span>&nbsp;</span>
                    <span>
                        {/* (<FormattedMessage id={getKeyLang(`vndPerOne`)} />) */}
                        triệu đồng / người
                    </span>
                </Col>

                <Col xs={12} md={7} className="">
                    {/* an optimization for mobile view */}
                    <RowStyleForSlider >
                        <Col >
                            <Slider
                                min={10}
                                max={30}
                                step={10}
                                marks={{ 10: 10, 30: 30 }}
                                value={value_fieldMeta.value}
                                onChange={(value) => {
                                    reverseCalFeeStatus()
                                    setFieldValue(KEY_INSUR_VALUE, value)
                                }}
                                handle={MyHandle}
                                tipProps={{
                                    prefixCls: "rc-slider-tooltip"
                                }}
                            />
                        </Col>
                    </RowStyleForSlider>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={6} md={3}>
                    <FormattedMessage id={getKeyLang(`insurancePersAmount`)} />
                </Col>
                <Col xs={6} md={3}>
                    <div>
                        <span className="text-bold-300 text-primary font-weight-bold">
                            {
                                beneficiaries.length
                            }
                        </span>
                        <span>&nbsp;</span>
                        <FormattedMessage id={getKeyLang(`people`)} />
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={10} />
                <Col>
                    <Button
                        className='mr-1 mb-2 round btn-mobile-round'
                        outline color='primary'
                        onClick={handleCalFee}
                    >
                        <FormattedMessage id={getKeyLang(`HanlerFee`)} />
                    </Button>
                </Col>
            </Row>
            {
                hasCalFeeDone &&
                <CalFeeDone
                    dataFees={dataFees}
                    contractId={contractId}
                    paymentType={paymentType}
                    companyId={companyId}
                    dispatch={dispatch}
                />
            }
        </div>
    )
}

export default StepForm