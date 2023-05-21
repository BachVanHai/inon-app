import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Select } from 'base-app'
import BaseInfo from '../../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import { API_GET_ALL_BANK, getKeyLang } from '../../../../../../../configs/insurance-app'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import TitleRow from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { REDUX_STATE_NAME } from '../../stepsManager'
import { BaseFormGroup, HttpClient } from 'base-app'
import { Col, InputGroup, InputGroupAddon, Row, Button } from 'reactstrap'
import { CheckCircle } from "react-feather"
import FullAddress from './FullAddress'
import { hasRequestFail } from '../../../../../../../ultity'
import { useIntl } from 'react-intl'
import { relationships } from '../utility'
import { KEY_RELATIONSHIP } from '../formikConfig'

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
        KEY_STK : "string",
        KEY_ACCOUNT_NUMBER: "string",
        KEY_BANK: "string",
        KEY_RELATIONSHIP : "string"
    },
    stepInfo,
    className }) => {
    const intl = useIntl()
    const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched, } = stepInfo
    const {
        KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL,
        KEY_ADDRESS, KEY_CITY, KEY_WARD, KEY_DISTRICT, KEY_BANK, KEY_ACCOUNT_NUMBER , KEY_STK , KEY_RELATIONSHIP
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
            {/* <TitleRow msg={"* Người thứ " + (index + 1)} type="s" /> */}

            {
                !getFieldMeta(KEY_IC_TYPE).value &&
                <>
                    <Row className="mt-2">
                        <Col xs={12} md={6}>
                            <Select
                                readOnly
                                closeMenuOnSelect={true}
                                isSearchable={false}
                                classNamePrefix='select mt-1'
                                className="custom-zindex7"
                                onChange={({ content }) => {
                                    setFieldValue(KEY_IC_TYPE, content)
                                }}
                                value={IDTypes.find(type => type.content === getFieldMeta(KEY_IC_TYPE).value)}
                                options={IDTypes}
                                placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                                isClearable={false}
                                styles={getFieldMeta(KEY_IC_TYPE).error ? selectErrorStyles : selectNormalStyles}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <InputGroup className="form-label-group">
                                <BaseFormGroup
                                    fieldName={KEY_IC_NO}
                                    errors={errors}
                                    touched={touched}
                                    messageId={getKeyLang(`IDPers`)}
                                />

                                <InputGroupAddon addonType="append">
                                    <Button color="check"
                                        className="custom-check-btn"
                                        onClick={() => { }}
                                    >
                                        <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                        <CheckCircle size={14} />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                </>
            }

            {
                getFieldMeta(KEY_IC_TYPE).value &&
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
                            KEY_ADDRESS: KEY_ADDRESS,
                        }}
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

                    <Row>
                        <Col xs={12} md={6}>
                            <Select
                                readOnly
                                isClearable={false}
                                closeMenuOnSelect={true}
                                classNamePrefix='select mt-1'
                                className="custom-zindex3"
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
                        {/* <Col xs={12} md={6}>
                            <BaseFormGroup
                                fieldName={KEY_ACCOUNT_NUMBER}
                                errors={errors}
                                touched={touched}
                                messageId={getKeyLang(`${errors.addtinalPeople && errors.addtinalPeople[0].accountNumber || getFieldMeta(KEY_STK).value === "" ? "star.cardNumberRequried" : "star.cardNumber" }`)}
                            />
                        </Col> */}
                        {/* <Col xs={12} md={3}>
                        <Select
                                readOnly
                                closeMenuOnSelect={true}
                                isSearchable={false}
                                classNamePrefix='select mt-1'
                                className="custom-zindex7"
                                onChange={({ content }) => {
                                    setFieldValue(KEY_RELATIONSHIP, content)
                                }}
                                value={relationships.find(type => type.content === getFieldMeta(KEY_RELATIONSHIP).value)}
                                options={relationships}
                                placeholder={<FormattedMessage id={getKeyLang(`relativeWithBuyerRequired`)} />}
                                isClearable={false}
                                styles={getFieldMeta(KEY_RELATIONSHIP).error ? selectErrorStyles : selectNormalStyles}
                            />
                        </Col> */}
                    </Row>
                </>
            }
        </div >
    )
}

export default AddtionalPeople
