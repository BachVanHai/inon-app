import '../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import React, { useState } from 'react'
import moment from 'moment'
import { FormattedMessage, useIntl } from 'react-intl'
import { CheckCircle } from "react-feather"
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { Select, BaseFormGroup, Button, BaseFormDatePicker, BaseAppUltils } from 'base-app'
import { NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_MOTOR, NAME_BUY_INSURANCES_VTA, getKeyLang } from '../../../configs/insurance-app'
import { useFormikContext } from 'formik'
import { DATE_FORMAT, GENDER_TYPE_FEMALE, GENDER_TYPE_MALE, GENDER_TYPE_OTHER, ID_TYPE_CCCD, ID_TYPE_CMND, ID_TYPE_HC, ID_TYPE_MST, selectErrorStyles, selectNormalStyles } from '../../insurance-app/buy-insurances-page/formik-config'
import Service from '../../../services/insurance-app/appConfig'
import { hasRequestFail } from '../../../ultity'
import { useHistory } from 'react-router-dom'
import { idOcr_postImageCompleted } from '../../insurance-app/common-forms/ocr-input/completedCallbacks'
import { OcrInput, OCR_TYPE_ID_PERSON } from '../../insurance-app/common-forms/ocr-input/OcrInput'
import UploadFileOCR from '../../../pages/elite-app/buy-insurance/UploadFileOCR'
/**
    @example
    const IDTypes = [
        {
            label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
            content: "ID_TYPE_CMND",
            value: 1,
        },
    ]
    const sugg_gender = [
        {
            value: 1,
            content: "GENDER_TYPE_MALE",
            label: <FormattedMessage id={getKeyLang(`Male`)} />
        },
    ]
    const setAddressesCallback = (addresses) =>{
        if (isArrayEmpty(addresses) || isObjEmpty(addresses)) {
            addresses = [{ city: "", district: "", ward: "", detail: "" }]
        }
        const { city, district, ward, detail } = addresses[0]

        setFieldValue(KEY_ADDRESS, detail || "")
        setFieldValue(KEY_CITY, city || "")
        setFieldValue(KEY_DISTRICT, district || "")
        setFieldValue(KEY_WARD, ward || "")
    }
    return (
         <InfoBase
            index={0} reduxName={REDUX_STATE_NAME}
            setAddressesCallback={setAddressesCallback}
            stepInfo={{sugg_gender, IDTypes}} // can ommited
            isHideGender={false} // can ommited
            keyMaps={{
                KEY_IC_TYPE: KEY_IC_TYPE,
                KEY_IC_NO: KEY_IC_NO,
                KEY_FULLNAME: KEY_FULLNAME,
                KEY_DATE_BIRTH: KEY_DATE_BIRTH,
                KEY_GENDER: KEY_GENDER,
                KEY_PHONE_NUMBER: KEY_PHONE_NUMBER,
                KEY_EMAIL: KEY_EMAIL,
                KEY_ADDRESS: KEY_ADDRESS,
            }}
        />
    )
 */

const InfoBase = ({
    reduxName,
    setAddressesCallback,
    stepInfo = {},
    isHideGender,
    keyMaps = {
        KEY_IC_TYPE: "key",
        KEY_IC_NO: "key",
        KEY_FULLNAME: "key",
        KEY_DATE_BIRTH: "key",
        KEY_GENDER: "key",
        KEY_PHONE_NUMBER: "key",
        KEY_EMAIL: "key",
    }, className , enableValidateOnChange }) => {
    const intl = useIntl()
    let { sugg_gender, IDTypes } = stepInfo
    const history = useHistory()
    const { errors, touched, setFieldValue, getFieldMeta , values } = useFormikContext()
    const [uploadIdentifyFile, setUploadIdentifyFile] = useState(false)
    const { KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL } = keyMaps

    if (!sugg_gender) {
        sugg_gender = [
            {
                value: 1,
                content: GENDER_TYPE_MALE,
                label: <FormattedMessage id={getKeyLang(`Male`)} />
            },
            {
                value: 2,
                content: GENDER_TYPE_FEMALE,
                label: <FormattedMessage id={getKeyLang(`Female`)} />,
            },
            {
                value: 3,
                content: GENDER_TYPE_OTHER,
                label: <FormattedMessage id={getKeyLang(`Other`)} />,
            }
        ]
    }
    if (!IDTypes) {
        IDTypes = [
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
    }
    const isVehiclePage = reduxName === NAME_BUY_INSURANCES_CAR || reduxName === NAME_BUY_INSURANCES_MOTOR
    const isMsgFiieldNotRequired = reduxName === NAME_BUY_INSURANCES_CAR || reduxName === NAME_BUY_INSURANCES_MOTOR || reduxName === NAME_BUY_INSURANCES_VTA
    
    const renderIdPersPlaceHolderAlongWithMST = () => {
        if (getFieldMeta(KEY_IC_TYPE).value === ID_TYPE_MST) {
            return getKeyLang("mst")
        }
        if (isMsgFiieldNotRequired && isVehiclePage) {
            return getKeyLang(`idPers`)
        }
        return getKeyLang(`IDPers`)
    }

    const renderNamePlaceHolderAlongWithMST = () => {
        if (getFieldMeta(KEY_IC_TYPE).value === ID_TYPE_MST) {
            return getKeyLang("NameCorpOrEnprise")
        }
        return getKeyLang("Name")
    }
    const setUploadIdentifyOrNot = () => {
        setUploadIdentifyFile(!uploadIdentifyFile)
        enableValidateOnChange && enableValidateOnChange()
      }
    return (
        <div className={className}>
            <Row className="mt-1 mb-3">
                <Col xs={12} md={6}>
                <UploadFileOCR
                values={values}
                type='identificationFile'
                setUploadIdentifyOrNot={setUploadIdentifyOrNot}
                typeInsurance="bc"
                formik={values}
              />
                </Col>
            </Row>

            <Row className="mt-1">
                <Col xs={12} md={6}>
                    {
                        React.useMemo(() => {
                            return (
                                <Select
                                    readOnly
                                    closeMenuOnSelect={true}
                                    classNamePrefix='select mt-1'
                                    className="custom-zindex7 mb-2"
                                    onChange={({ content }) => {
                                        setFieldValue(KEY_IC_TYPE, content)
                                    }}
                                    value={IDTypes.find(type => type.content === getFieldMeta(KEY_IC_TYPE).value)}
                                    options={IDTypes}
                                    placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                                    isClearable={false}
                                    styles={getFieldMeta(KEY_IC_TYPE).error ? selectErrorStyles : selectNormalStyles}
                                />
                            ) // eslint-disable-next-line
                        }, [getFieldMeta(KEY_IC_TYPE).value, getFieldMeta(KEY_IC_TYPE).error])
                    }
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative">
                        {
                            React.useMemo(() => {
                                return (
                                    <BaseFormGroup
                                        fieldName={KEY_IC_NO}
                                        errors={errors}
                                        touched={touched}
                                        messageId={getKeyLang(`IDPers`)}
                                        className="mb-2"
                                    />
                                )// eslint-disable-next-line
                            }, [getFieldMeta(KEY_IC_NO).value, getFieldMeta(KEY_IC_NO).error])
                        }
                    </FormGroup>
                </Col>

            </Row>

            <Row className={"mt-2"}>
                <Col xs={12} md={isHideGender ? 6 : 4} >
                    <FormGroup className="position-relative">
                        {
                            React.useMemo(() => {
                                return (
                                    <BaseFormGroup
                                        fieldName={KEY_FULLNAME}
                                        errors={errors}
                                        touched={touched}
                                        messageId={renderNamePlaceHolderAlongWithMST()}
                                        className="mb-2"
                                    />
                                )
                            }, [
                                getFieldMeta(KEY_FULLNAME).value,
                                getFieldMeta(KEY_FULLNAME).error,
                                getFieldMeta(KEY_IC_TYPE).value
                            ])
                        }
                    </FormGroup>
                </Col>

                <Col xs={12} md={isHideGender ? 6 : 4}>
                    {
                        React.useMemo(() => {
                            if (getFieldMeta(KEY_IC_TYPE).value === ID_TYPE_MST) {
                                return null
                            }
                            return (
                                <BaseFormDatePicker
                                    messageId={isMsgFiieldNotRequired ? getKeyLang("dateOfBirth") : getKeyLang(`DateOfBirth`)}
                                    fieldName={KEY_DATE_BIRTH}
                                    errors={errors}
                                    touched={touched}
                                    className={`${getFieldMeta(`${KEY_DATE_BIRTH}`).error && "is-invalid"} mb-2`}
                                    options={
                                        {
                                            maxDate: moment().utc(true).subtract(1, 'd').format(DATE_FORMAT),
                                            minDate: reduxName === 'buyInsuranceHealthCare' ? moment().utc(true).subtract(65, 'y').format(DATE_FORMAT) :  moment().utc(true).subtract(70, 'y').format(DATE_FORMAT),
                                            enableTime: false
                                        }
                                    }
                                />
                            )// eslint-disable-next-line
                        }, [getFieldMeta(KEY_DATE_BIRTH).value, getFieldMeta(KEY_DATE_BIRTH).error, getFieldMeta(KEY_IC_TYPE).value])
                    }
                </Col>

                <Col xs={12} md={4} >
                    {
                        React.useMemo(() => {
                            if (getFieldMeta(KEY_IC_TYPE).value === ID_TYPE_MST || isHideGender) {
                                return null
                            }
                            return (
                                <Select
                                    readOnly
                                    closeMenuOnSelect={true}
                                    classNamePrefix='select mt-1'
                                    className="custom-zindex9 mb-2"
                                    onChange={({ content }) => {
                                        setFieldValue(KEY_GENDER, content)
                                    }}
                                    value={sugg_gender.find(gen => gen.content === getFieldMeta(KEY_GENDER).value)}
                                    options={sugg_gender}
                                    placeholder={intl.formatMessage({ id: getKeyLang(`Sex`) })}
                                    isClearable={false}
                                    styles={getFieldMeta(KEY_GENDER).error ? selectErrorStyles : selectNormalStyles}
                                />
                            )// eslint-disable-next-line
                        }, [getFieldMeta(KEY_GENDER).value, getFieldMeta(KEY_GENDER).error, getFieldMeta(KEY_IC_TYPE).value])
                    }
                </Col>
            </Row>

            <Row className="mt-2">
                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative" >
                        {
                            React.useMemo(() => {
                                return (
                                    <BaseFormGroup
                                        fieldName={KEY_PHONE_NUMBER}
                                        errors={errors}
                                        touched={touched}
                                        messageId={isMsgFiieldNotRequired ? getKeyLang(`PartnerPhone`) : getKeyLang(`PhoneNum`)}
                                        className="mb-2"
                                    />
                                )// eslint-disable-next-line
                            }, [getFieldMeta(KEY_PHONE_NUMBER).value, getFieldMeta(KEY_PHONE_NUMBER).error])
                        }
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative">
                        {
                            React.useMemo(() => {
                                return (
                                    <BaseFormGroup
                                        fieldName={KEY_EMAIL}
                                        errors={errors}
                                        className="mb-2"
                                        touched={touched}
                                        messageId={isMsgFiieldNotRequired ? getKeyLang(`Email`) : getKeyLang(`EmailTitle`)}
                                    />
                                )// eslint-disable-next-line
                            }, [getFieldMeta(KEY_EMAIL).value, getFieldMeta(KEY_EMAIL).error])
                        }
                    </FormGroup>
                </Col>
            </Row>
        </div >
    )
}

export default InfoBase
