import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ToggleRow from "../../../../../../../components/insurance-app/common-forms/toggle-row/ToggleRow"
import RadioRow from '../../../../../../../components/insurance-app/common-forms/toggle-row/RadioRow'
import SliderRow from '../../../../../../../components/insurance-app/common-forms/slider-row'
import { getTextClassesBy } from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import {
    KEY_ADD_RESPONSIBILITY_VALUE, KEY_AMOUNT_PEOPLE_EACH_CAR, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO,
    KEY_DURATION, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_TOGGLE_BBTNDS, KEY_TOGGLE_TAI_NAN, sliderInfo
} from '../formikConfig'
import CalFeeDone from './CalFeeDone'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { calculateFee } from '../utility'
import { useDispatch } from 'react-redux'
import { isObjEmpty } from '../../../../../../../ultity'

const Info = styled.div`
    background-color: #f4f9f4;
    padding: .5rem;
`
const InfoRow = styled(Row)`
    min-height: 3.4rem;
`

const ButtonStyled = styled.div`
    cursor: pointer;
    padding: 5px 13px;
    border: solid 1px;
    border-color: ${p => p.borderColor || "inherit"};
    border-radius: .5rem;
`

const EditableDuration = ({ saveCallback, title, details, contractInfo, dataFees, contractId, paymentType, companyId, className, revertCalFeeStatus }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [lastSavedValues, setLastSavedValues] = React.useState({})
    const { setFieldValue, getFieldMeta, values, setValues } = useFormikContext()

    const getInsurInfoValues = () => {
        const _values = {}

        _values[KEY_TOGGLE_BBTNDS] = values[KEY_TOGGLE_BBTNDS]
        _values[KEY_DURATION] = values[KEY_DURATION]
        _values[KEY_DATE_INSUR_FROM] = values[KEY_DATE_INSUR_FROM]
        _values[KEY_TIME_INSUR_FROM] = values[KEY_TIME_INSUR_FROM]
        _values[KEY_DATE_INSUR_TO] = values[KEY_DATE_INSUR_TO]
        _values[KEY_TIME_INSUR_TO] = values[KEY_TIME_INSUR_TO]
        _values[KEY_TOGGLE_TAI_NAN] = values[KEY_TOGGLE_TAI_NAN]
        _values[KEY_ADD_RESPONSIBILITY_VALUE] = values[KEY_ADD_RESPONSIBILITY_VALUE]
        _values[KEY_AMOUNT_PEOPLE_EACH_CAR] = values[KEY_AMOUNT_PEOPLE_EACH_CAR]

        return _values
    }

    const _infoValues = getInsurInfoValues()

    const toggleModify = () => {
        if (!isEditMode) {
            setLastSavedValues({ ...values })
            setIsEditMode(true)
            return
        }
        setIsEditMode(false)
        saveCallback && saveCallback()
    }

    const cancelModify = () => {
        setIsEditMode(false)
        setValues(lastSavedValues)
    }

    const handleChecks = (val) => {
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
        if (isObjEmpty(contractInfo) || !contractId) return
        calculateFee(dispatch, contractId, contractInfo.insurances, values)
    }, [JSON.stringify(_infoValues)])

    return (
        <div className={className}>
            <Row className="mb-1">
                <Col xs={12} md={12} className="">
                    <b className="font-medium-4 font-weight-bold text-primary-highlight letter-uppercase">{title}</b>
                </Col>
            </Row>

            {
                !isEditMode ?
                    <Info>
                        {
                            details.map((elt, index) => {
                                return (
                                    <InfoRow key={index}>
                                        <Col xs={6} md={4} className="primary d-flex align-items-center pl-2">
                                            <span className=''>{elt.label}</span>
                                        </Col>

                                        <Col xs={6} md={8} className="d-flex align-items-center pl-2">
                                            <span>{elt.content}</span>
                                        </Col>
                                    </InfoRow>
                                )
                            })
                        }
                    </Info>
                    :
                    <div className='mt-1'>
                        <ToggleRow
                            msgField={getKeyLang(`BHBBTNDSCCXMTXM`)}
                            fieldName={KEY_TOGGLE_BBTNDS}
                            isHideIcon={true}
                        />
                        {
                            getFieldMeta(KEY_TOGGLE_BBTNDS).value &&
                            <SliderRow
                                disableContinueBtn={revertCalFeeStatus}
                                sliderValue={getFieldMeta(KEY_DURATION).value}
                                sliderInfo={sliderInfo}
                                sliderOnChange={(value) => {
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
                            isHideIcon={true}
                            toggleOnChange={() => {
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

                        <CalFeeDone
                            dataFees={dataFees}
                            contractId={contractId}
                            paymentType={paymentType}
                            companyId={companyId}
                            className="mt-2"
                        />
                    </div>
            }

            <div className='mt-1 font-medium-2 d-flex justify-content-end'>
                <ButtonStyled className='text-primary'
                    onClick={toggleModify}
                    borderColor={"green"}
                >
                    {
                        isEditMode ?
                            <FormattedMessage id={getKeyLang("SaveFee")} />
                            :
                            <FormattedMessage id={getKeyLang("change")} />
                    }
                </ButtonStyled>

                {
                    isEditMode &&
                    <ButtonStyled className='ml-2'
                        onClick={cancelModify}

                    >
                        <FormattedMessage id={getKeyLang("ConfirmCancel")} />
                    </ButtonStyled>
                }
            </div>
        </div>
    )
}

export default EditableDuration
