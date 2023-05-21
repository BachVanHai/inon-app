import { BaseFormGroup, Select } from 'base-app'
import React from 'react'
import { CheckCircle } from "react-feather"
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Col, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import BaseInfo from '../../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import TitleRow from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { isArrayEmpty } from '../../../../../../../ultity'
import { REDUX_STATE_NAME } from '../../stepsManager'
import { _RELATIONSHIPS } from '../utility'
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
        KEY_RELATIONSHIP : "string"
    },
    stepInfo,
    className }) => {
    const intl = useIntl()
    const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched, } = stepInfo
    const {
        KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL,
        KEY_ADDRESS, KEY_CITY, KEY_WARD, KEY_DISTRICT, KEY_RELATIONSHIP
    } = keyMaps
    return (
        <div className={className}>
            <TitleRow msg={"* Người thứ " + (index + 1)} type="s" />
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
                        moreField={<Select
                            isClearable={false}
                            closeMenuOnSelect={true}
                            classNamePrefix='select mt-1'
                            className="custom-zindex8"
                            placeholder={intl.formatMessage({ id: getKeyLang(`heath-care-advanced.relativeWithBuyer`) })}
                            options={_RELATIONSHIPS}
                            styles={getFieldMeta(KEY_RELATIONSHIP).error ? selectErrorStyles : selectNormalStyles}
                            value={getFieldMeta(KEY_RELATIONSHIP).value !== "" ? !isArrayEmpty(_RELATIONSHIPS) && _RELATIONSHIPS.find(elt => elt.content == getFieldMeta(KEY_RELATIONSHIP).value) : ""}
                            onChange={(original) => {
                                setFieldValue(KEY_RELATIONSHIP, original.content)
                            }} 
                            />}
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
                </>
            }
        </div >
    )
}

export default AddtionalPeople
