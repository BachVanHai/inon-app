import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { Select } from 'base-app'
import BaseInfo from '../../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import {
    KEY_ADDTIONAL_PEOPLE, relationships,
    KEY_GENDER as ORIGINAL_KEY_GENDER,
    KEY_DISTRICT as ORIGINAL_KEY_DISTRICT,
    KEY_ADDRESS as ORIGINAL_KEY_ADDRESS,
    KEY_WARD as ORIGINAL_KEY_WARD,
    KEY_CITY as ORIGINAL_KEY_CITY,
    KEY_RELATIONSHIPS as ORIGINAL_KEY_RELATIONSHIPS,
    KEY_IC_TYPE as ORIGINAL_KEY_IC_TYPE
} from '../formikConfig'
import { ID_TYPE_MST, selectErrorStyles, selectNormalStyles } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isArrayEmpty } from '../../../../../../../ultity'
import TitleRow from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { REDUX_STATE_NAME } from '../../stepsManager'

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
        KEY_RELATIONSHIPS: "string",
        KEY_INSUR_PACKAGE: "string",
        KEY_RANGE_DATE: "string"
    },
    stepInfo,
    className }) => {
    const { setFieldValue, getFieldMeta, setValues, values, sugg_gender, IDTypes, } = stepInfo
    const {
        KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL,
        KEY_ADDRESS, KEY_RELATIONSHIPS,
    } = keyMaps
    const addtionalPeople = getFieldMeta(KEY_ADDTIONAL_PEOPLE).value
    const buyerIcType = getFieldMeta(ORIGINAL_KEY_IC_TYPE).value

    const RELATIONSHIP_DN = relationships[5].content
    const RELATIONSHIP_BANTHAN = relationships[0].content

    const decideWhatRelationshipsWillShow = () => {
        let _relationships = [...relationships]
        if (buyerIcType === ID_TYPE_MST) {
            _relationships = relationships.filter(elt => elt.content === RELATIONSHIP_DN)
        }
        if (buyerIcType !== ID_TYPE_MST) {
            _relationships = relationships.filter(elt => elt.content !== RELATIONSHIP_DN)
        }
        if (!isArrayEmpty(addtionalPeople)) {
            const foundIndex = addtionalPeople.findIndex(elt => elt[ORIGINAL_KEY_RELATIONSHIPS] === RELATIONSHIP_BANTHAN)
            if (foundIndex > -1) {
                _relationships = _relationships.filter((elt) => {
                    if (index !== foundIndex) {
                        if (elt.content === RELATIONSHIP_BANTHAN) {
                            return false
                        }
                    }
                    return true
                })
            }
        }
        return _relationships
    }

    React.useEffect(() => {
        if (buyerIcType === ID_TYPE_MST) {
            const _addtinalPeople = addtionalPeople.map(person => {
                person[ORIGINAL_KEY_RELATIONSHIPS] = RELATIONSHIP_DN
                return person
            })
            setFieldValue(KEY_ADDTIONAL_PEOPLE, _addtinalPeople)
        }
    }, [buyerIcType])

    return (
        <div className={className}>
            <TitleRow msg={"* Người thứ " + (index + 1)} type="s" />

            <Row className="mt-2">
                <Col xs={12} md={6}>
                    <Select
                        readOnly
                        maxMenuHeight={120}
                        isClearable={false}
                        closeMenuOnSelect={true}
                        classNamePrefix='select mt-1'
                        className="custom-zindex8"
                        onChange={({ content }) => {
                            if (content === RELATIONSHIP_BANTHAN && !isArrayEmpty(getFieldMeta(KEY_ADDTIONAL_PEOPLE).value)) {
                                const _values = { ...values }
                                const banthan_beneficiary = _values[KEY_ADDTIONAL_PEOPLE][index]
                                const excludesProps = [
                                    ORIGINAL_KEY_GENDER, ORIGINAL_KEY_DISTRICT,
                                    ORIGINAL_KEY_WARD, ORIGINAL_KEY_CITY, ORIGINAL_KEY_ADDRESS
                                ]
                                Object.keys(banthan_beneficiary).forEach((prop) => {
                                    if (excludesProps.indexOf(prop) === -1) {
                                        banthan_beneficiary[prop] = _values[prop]
                                    }
                                })
                                setValues(_values)
                            }
                            setFieldValue(KEY_RELATIONSHIPS, (content))
                        }}
                        value={decideWhatRelationshipsWillShow().find(type => type.content === getFieldMeta(KEY_RELATIONSHIPS).value)}
                        options={decideWhatRelationshipsWillShow()}
                        placeholder={<FormattedMessage id={getKeyLang(`relativeWithBuyer`)} />}
                        styles={getFieldMeta(KEY_RELATIONSHIPS).error ? selectErrorStyles : selectNormalStyles}
                        defaultValue={decideWhatRelationshipsWillShow().find(type => type.content === getFieldMeta(KEY_RELATIONSHIPS).value)}
                    />
                </Col>
            </Row>

            {
                getFieldMeta(KEY_RELATIONSHIPS).value &&
                <BaseInfo
                    index={index}
                    reduxName={REDUX_STATE_NAME}
                    stepInfo={{ sugg_gender, IDTypes }}
                    isHideGender={true}
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
            }
        </div >
    )
}

export default AddtionalPeople