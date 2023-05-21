import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import moment from 'moment'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import ToggleRow from "../../../../../../components/insurance-app/common-forms/toggle-row/ToggleRow"
import RadioRow from '../../../../../../components/insurance-app/common-forms/toggle-row/RadioRow'
import SliderRow from '../../../../../../components/insurance-app/common-forms/slider-row'
import { getTextClassesBy } from '../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import Button from 'reactstrap/lib/Button'
import {
    initialValues,
    KEY_ADD_RESPONSIBILITY_VALUE, KEY_AMOUNT_PEOPLE_EACH_CAR, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO,
    KEY_DURATION, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_TOGGLE_BBTNDS, KEY_TOGGLE_TAI_NAN,
    sliderInfo
} from './formikConfig'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import CalFeeDone from './form-components/CalFeeDone'
import { fillMultipleStepInfo, isObjEmpty } from '../../../../../../ultity'
import { KEY_VEHICLE_TYPE } from '../step1/formikConfig'

const StepForm = ({ stepInfo, formik, callbacks, variables, className }) => {
    const { step_1, step_2 } = stepInfo
    const intl = useIntl()
    const { getFieldMeta, setFieldValue, setValues } = formik
    const { calculateFee, revertCalFeeStatus } = callbacks
    const { hasCalFee, dataFees, paymentType, contractId, companyId } = variables

    const handleChecks = (val) => {
        revertCalFeeStatus && revertCalFeeStatus()
        setFieldValue(KEY_ADD_RESPONSIBILITY_VALUE, val)
    }

    const _defaulChecks = [
        {
            value: 5,
            handleChange: handleChecks,
            title: 5 + intl.formatMessage({ id: getKeyLang(`AboutManUnit`) }),
        },
        {
            value: 10,
            handleChange: handleChecks,
            title: 10 + intl.formatMessage({ id: getKeyLang(`AboutManUnit`) }),
        },
    ]
    
    React.useEffect(() => {
        if (step_1[KEY_VEHICLE_TYPE] === 21) { /* label: xe mô tô 3 bánh  */
            setFieldValue(KEY_AMOUNT_PEOPLE_EACH_CAR, 3)
        } else {
            setFieldValue(KEY_AMOUNT_PEOPLE_EACH_CAR, 2)
        }
    }, [])

    React.useEffect(() => {
        if (isObjEmpty(step_2)) return
        fillMultipleStepInfo(step_2, initialValues, setValues)
    }, [])

    return (
        <div className={className}>
            <ToggleRow
                msgField={getKeyLang(`BHBBTNDSCCXMTXM`)}
                fieldName={KEY_TOGGLE_BBTNDS}
            />
            {
                getFieldMeta(KEY_TOGGLE_BBTNDS).value &&
                <SliderRow
                    disableContinueBtn={revertCalFeeStatus}
                    sliderValue={getFieldMeta(KEY_DURATION).value}
                    sliderInfo={sliderInfo}
                    sliderOnChange={(value) => {
                        revertCalFeeStatus && revertCalFeeStatus()

                        setFieldValue(KEY_DURATION, value)
                        setFieldValue(KEY_DATE_INSUR_TO,
                            moment(getFieldMeta(KEY_DATE_INSUR_FROM).value)
                                .add(value, 'M')
                                .format(DATE_FORMAT)
                        )
                    }}
                    keyNames={{
                        KEY_DURATION: KEY_DURATION,
                        KEY_DATE_INSUR_FROM: KEY_DATE_INSUR_FROM,
                        KEY_TIME_INSUR_FROM: KEY_TIME_INSUR_FROM,
                        KEY_DATE_INSUR_TO: KEY_DATE_INSUR_TO,
                        KEY_TIME_INSUR_TO: KEY_TIME_INSUR_TO,
                    }}
                />
            }

            <ToggleRow
                msgField={getKeyLang(`BHTNNNTXMTXM`)}
                fieldName={KEY_TOGGLE_TAI_NAN}
                toggleOnChange={() => {
                    revertCalFeeStatus && revertCalFeeStatus()

                    if (getFieldMeta(KEY_TOGGLE_TAI_NAN).value) {
                        setFieldValue(KEY_TOGGLE_TAI_NAN, false)
                        return
                    }
                    setFieldValue(KEY_TOGGLE_TAI_NAN, true)
                }}
            />
            {
                getFieldMeta(KEY_TOGGLE_TAI_NAN).value &&
                <>
                    <Row>
                        <Col xs={12} md={12} className="text-italic text-secondary">
                            <FormattedMessage id={getKeyLang("TimeTNDSBBXM")} />
                        </Col>
                    </Row>
                    <RadioRow
                        msgField={getKeyLang(`AddResponsibility`)}
                        fieldName={KEY_ADD_RESPONSIBILITY_VALUE}
                        checks={_defaulChecks}
                        isHideImage={true}
                        className="mt-2"
                    />
                    <Row>
                        <Col xs={8} md={6} className={getTextClassesBy("s")}>
                            <FormattedMessage id={getKeyLang("NumInCar")} />:
                        </Col>

                        <Col xs={4} md={6} className={getTextClassesBy("s")}>
                            {
                                getFieldMeta(KEY_AMOUNT_PEOPLE_EACH_CAR).value
                            }
                            <span>&nbsp;</span>
                            <FormattedMessage id={getKeyLang("people")} />
                        </Col>
                    </Row>
                </>
            }

            <Row className="my-2">
                <Col xs={12} md={9} />
                <Col xs={12} md={3}>
                    <Button outline color='primary' className='mr-1 round btn-mobile-round' onClick={calculateFee}>
                        <FormattedMessage id={getKeyLang("HanlerFee")} />
                    </Button>
                </Col>
            </Row>
            {
                hasCalFee &&
                <CalFeeDone
                    dataFees={dataFees}
                    contractId={contractId}
                    paymentType={paymentType}
                    companyId={companyId}
                />
            }
        </div >
    )
}

export default StepForm