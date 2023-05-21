import { BaseFormGroup, HttpClient, Select } from 'base-app'
import React from 'react'
import { CheckCircle } from "react-feather"
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Col, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import BaseInfo from '../../../../../../components/elite-app/infoBase/InfoBase'
import { API_GET_ALL_BANK, getKeyLang } from '../../../../../../configs/insurance-app'
import { hasRequestFail } from '../../../../../../ultity'
import { REDUX_STATE_NAME } from '../../stepsManager'
import FullAddress from './FullAddress'

const AddtionalPeople = ({
    index,
    keyMaps = {
        KEY_IC_TYPE: "string",
        KEY_IC_NO: "string",
        KEY_FULLNAME: "string",
        KEY_DATE_BIRTH: "string",
        KEY_GENDER: "string",
        KEY_PHONE_NUMBER: "string",
        KEY_EMAIL: "string",
        KEY_ADDRESS: "string",
        KEY_CITY: "string",
        KEY_DISTRICT: "string",
        KEY_WARD: "string",
        KEY_STK: "string",
        KEY_ACCOUNT_NUMBER: "string",
        KEY_BANK: "string",
    },
    stepInfo,
    className , enableValidateOnChange }) => {
    const intl = useIntl()
    const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched, } = stepInfo
    const {
        KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL,
        KEY_ADDRESS, KEY_CITY, KEY_WARD, KEY_DISTRICT, KEY_BANK, KEY_ACCOUNT_NUMBER, KEY_STK, KEY_RELATIONSHIP
    } = keyMaps
    const [_sugg_Bank, setSugg_Bank] = React.useState([])
    React.useEffect(() => {
        const getAllBank = async () => {
            const res = await HttpClient.get(`${API_GET_ALL_BANK}`,
                {
                    params: {
                        date: new Date().getMilliseconds()
                    },
                    isBackgroundRequest: true,
                }
            )
            if (hasRequestFail(res.status)) { return }
            const banks = []
            res.data.forEach((bank) => {
                bank.value = bank.en?.toUpperCase()
                bank.label = bank.vn + " " + bank.en
                banks.push(bank)
            })
            setSugg_Bank(banks)
        }

        getAllBank()
    }, [])

    return (
        <div className={className}>
            <>
                <BaseInfo
                    index={index}
                    reduxName={REDUX_STATE_NAME}
                    stepInfo={{ sugg_gender, IDTypes }}
                    keyMaps={{
                        KEY_IC_TYPE: KEY_IC_TYPE,
                        KEY_IC_NO: KEY_IC_NO,
                        KEY_FULLNAME: KEY_FULLNAME,
                        KEY_DATE_BIRTH: KEY_DATE_BIRTH,
                        KEY_GENDER: KEY_GENDER,
                        KEY_PHONE_NUMBER: KEY_PHONE_NUMBER,
                        KEY_EMAIL: KEY_EMAIL,
                    }}
                    enableValidateOnChange={enableValidateOnChange}
                />

                <FullAddress
                    zIndex="custom-zindex5"
                    keysMap={{
                        KEY_CITY: KEY_CITY,
                        KEY_DISTRICT: KEY_DISTRICT,
                        KEY_WARD: KEY_WARD,
                        KEY_ADDRESS: KEY_ADDRESS
                    }}
                    className={"mb-1"}
                />

                <Row className='mt-2'>
                    <Col xs={12} md={6}>
                        <Select
                            readOnly
                            isClearable={false}
                            closeMenuOnSelect={true}
                            classNamePrefix='select mt-1'
                            className="custom-zindex3 mb-2"
                            placeholder={intl.formatMessage({ id: getKeyLang(`BankName`) })}
                            styles={errors[KEY_BANK] ? selectErrorStyles : selectNormalStyles}
                            value={_sugg_Bank.find(elt => elt.value === getFieldMeta(KEY_BANK).value)}
                            maxMenuHeight={128}
                            options={_sugg_Bank}
                            onChange={(original) => {
                                setFieldValue(KEY_BANK, original.value)
                            }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <BaseFormGroup
                            fieldName={KEY_STK}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`heath-care.stkRequried`)}
                        />
                    </Col>
                </Row>
            </>
            {/* {
                getFieldMeta(KEY_IC_TYPE).value &&
               
            } */}
        </div >
    )
}

export default AddtionalPeople