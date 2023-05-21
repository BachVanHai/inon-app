import { FieldArray } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { fillMultipleStepInfo, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import AddtionalPeople from './form-components/AddtionalPeople'
import PopupConditionBuyInsurance from './form-components/popupConditionBuyInsurance'
import { IDTypes, KEY_ACCOUNT_NUMBER, KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_BANK, KEY_CITY, KEY_CLICKED_CLOSE_POPUP, KEY_CREDIT_CONTRACT_NO, KEY_CREDIT_DURATION, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_LOAN, KEY_PHONE_NUMBER, KEY_RELATIONSHIP, KEY_STK, KEY_WARD, sugg_gender } from './formikConfig'

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
                    KEY_STK : keyMaps.KEY_STK ,
                    KEY_ACCOUNT_NUMBER: keyMaps.KEY_ACCOUNT_NUMBER,
                    KEY_BANK: keyMaps.KEY_BANK,
                    KEY_RELATIONSHIP : keyMaps.KEY_RELATIONSHIP,
                    KEY_LOAN : keyMaps.KEY_LOAN,
                    KEY_CREDIT_CONTRACT_NO : keyMaps.KEY_CREDIT_CONTRACT_NO,
                    KEY_CREDIT_DURATION : keyMaps.KEY_CREDIT_DURATION,
                }}
            />
        </>
    )
}

const StepForm = ({ stepInfo, className, formik }) => {
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
          {
                getFieldMeta([KEY_CLICKED_CLOSE_POPUP]).value ? null : <PopupConditionBuyInsurance isOpen={isOpenPopup} togglePopup={togglePopup}/>
            }
            <Row className="mb-2">
                <Col xs={12} md={7} className="mb-1">
                    <div className='mb-1 mt-1'>
                        (*) Độ tuổi tham gia từ 18 đến 65 tuổi
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
                                                    KEY_RELATIONSHIP: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_RELATIONSHIP}`,
                                                    KEY_CREDIT_CONTRACT_NO: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_CREDIT_CONTRACT_NO}`,
                                                    KEY_LOAN: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_LOAN}`,
                                                    KEY_CREDIT_DURATION: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_CREDIT_DURATION}`
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
                            </>
                        )
                    }
                }
            </FieldArray>
        </div >
    )
}

export default StepForm