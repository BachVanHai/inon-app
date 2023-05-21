import { BaseAppUltils } from 'base-app'
import { FieldArray } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import * as config from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { idOcr_postImageCompleted } from '../../../../../components/insurance-app/common-forms/ocr-input/completedCallbacks'
import TitleRow from '../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { getKeyLang, URL_RESOURCES } from '../../../../../configs/insurance-app'
import Service from '../../../../../services/insurance-app/appConfig'
import { fillMultipleStepInfo, formatingDate, hasRequestFail, isArrayEmpty, isObjEmpty } from '../../../../../ultity'
import AddtionalPeople from './form-components/AddtionalPeople'
import { addtionalPeopleInitValue, IDTypes, KEY_ACCOUNT_NUMBER, KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_BANK, KEY_CITY, KEY_CLICKED_CLOSE_POPUP, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_STK, KEY_WARD, sugg_gender } from './formikConfig'

const AddtionalPeopleBlock = ({
    index, keyMaps, errors, touched, IDTypes,
    setFieldValue, values, getFieldMeta, resetForm, setValues, sugg_gender , enableValidateOnChange
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
                    KEY_STK : keyMaps.KEY_STK ,
                    KEY_ACCOUNT_NUMBER: keyMaps.KEY_ACCOUNT_NUMBER,
                    KEY_BANK: keyMaps.KEY_BANK,
                }}
                enableValidateOnChange={enableValidateOnChange}
            />
        </>
    )
}

const StepForm = ({ stepInfo, className, formik , enableValidateOnChange }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(true)
    const intl = useIntl()
    const { step_1 } = stepInfo
    const { errors, touched, setFieldValue, values, getFieldMeta, resetForm, setValues, initialValues } = formik

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
        // return console.log(`exelData`, exelData)
        const convert = (val, type = KEY_DATE_BIRTH) => {
            if (!val) return "no_value"

            if (type === KEY_DATE_BIRTH) {
                return ""
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
            return ""
        }

        const _addtionalPeople = exelData.map((person, index) => {
            let _per = { ...addtionalPeopleInitValue }
            if (index > 0) {
                _per[KEY_IC_TYPE] = IDTypes[0].content
                _per[KEY_FULLNAME] = person[0]
                // _per[KEY_DATE_BIRTH] = convert(person[1]) // dateOfBirth: 19880213 => 1988-02-13
                _per[KEY_GENDER] = convert(person[2], KEY_GENDER) // gender "NAM" => "MALE"
                _per[KEY_IC_NO] = person[3]
                _per[KEY_PHONE_NUMBER] = person[4]
                _per[KEY_EMAIL] = person[5]
                _per[KEY_ADDRESS] = person[6]
                _per[KEY_BANK] = person[7]
                _per[KEY_ACCOUNT_NUMBER] = person[8]

                return _per
            }
            return null
        })

        _addtionalPeople.shift()
        const _values = { ...values }
        _values[KEY_ADDTIONAL_PEOPLE] = _addtionalPeople

        setValues(_values)
    }

    const downloadFileCallback = () => {
        let fileName = formatingDate().toString().replace(/-/g, "_") + "_example"
        return [URL_RESOURCES + "/beneficiary-template.xlsx", fileName]
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
    const togglePopup = () =>{
        setIsOpenPopup(!isOpenPopup)
       setFieldValue([KEY_CLICKED_CLOSE_POPUP],true)
    }
    React.useEffect(() => {
        if (isObjEmpty(step_1)) { return }
        fillMultipleStepInfo(step_1, initialValues, setValues)
    }, [])

    return (
        <div className={className}>
          {/* {
                getFieldMeta([KEY_CLICKED_CLOSE_POPUP]).value ? null : <PopupConditionBuyInsurance isOpen={isOpenPopup} togglePopup={togglePopup}/>
            } */}
            <TitleRow
                 msg={<FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} />}
                className="mt-1"
            />

            <Row className="mb-2">
                <Col xs={12} md={7} className="mb-1">
                    <div className='mb-1 mt-1'>
                        (*) Độ tuổi tham gia từ 17 đến 65 tuổi
                    </div>
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
                                                    KEY_STK : `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_STK}`,
                                                    KEY_ACCOUNT_NUMBER: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_ACCOUNT_NUMBER}`,
                                                    KEY_BANK: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_BANK}`,
                                                }}
                                                index={index} remove={remove}
                                                errors={errors} touched={touched}
                                                setFieldValue={setFieldValue} values={values} getFieldMeta={getFieldMeta}
                                                resetForm={resetForm} setValues={setValues}
                                                sugg_gender={sugg_gender} IDTypes={IDTypes}
                                                enableValidateOnChange={enableValidateOnChange}
                                            />
                                        )
                                    })
                                }
                            </>
                        )
                    }
                }
            </FieldArray>
        </div >
    )
}

export default StepForm