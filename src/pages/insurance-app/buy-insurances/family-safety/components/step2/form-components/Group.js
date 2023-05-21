import '../../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useMemo, useEffect } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row, } from 'reactstrap'
import styled from 'styled-components'
import { FieldArray } from 'formik'
import * as Icon from 'react-feather'
import { BaseFormGroup, Button, Select } from 'base-app'
import { FormattedMessage } from 'react-intl'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import AddtionalPerson from './AddtionalPerson'
import {
    INSURANCE_TYPE_RENEWALS, addtionalPeopleDefault, KEY_INSURANCE_TYPES, KEY_GCN_CONTRACT_PREFIX,
    insuranceTypes as formikInsuranceTypes, KEY_ADDTIONAL_PEOPLE,
} from '../formikConfig'
import { isObjEmpty } from '../../../../../../../ultity'

const IconXStyled = styled(Icon.X)`cursor:pointer;`

const Group = ({ stepInfo , className, formik, handleCheckGCN }) => {
    const { errors, touched, setFieldValue, values } = formik
    const {
        // tabActive, /* at the moment, we don't need tabActive */
        [KEY_ADDTIONAL_PEOPLE]: addtionalPeople, [KEY_INSURANCE_TYPES]: insuranceTypes,
        [KEY_GCN_CONTRACT_PREFIX]: gcnContractPrefix
    } = stepInfo
    const _insuranceTypes = formikInsuranceTypes

    useEffect(() => {
        if (isObjEmpty(stepInfo)) {
            return
        }
        setFieldValue(KEY_ADDTIONAL_PEOPLE, addtionalPeople || [])
        setFieldValue(KEY_GCN_CONTRACT_PREFIX, gcnContractPrefix || "")
        setFieldValue(KEY_INSURANCE_TYPES, insuranceTypes || "")
    }, [])

    return (
        <div className={className}>
            <Row>
                <Col xs={12} md={6}>
                    {
                        useMemo(() => {
                            return (
                                <FormattedMessage
                                    id={getKeyLang(`insuranceForm`)}
                                    className="formattedMessage"
                                >
                                    {
                                        (msg) => {
                                            return (
                                                <FormGroup className="mb-0">
                                                    <Select
                                                        readOnly
                                                        closeMenuOnSelect={true}
                                                        classNamePrefix='select mt-1'
                                                        className="custom-zindex8"
                                                        onChange={(original) => {
                                                            setFieldValue(KEY_INSURANCE_TYPES, original.content)
                                                        }}
                                                        value={_insuranceTypes.find(elt => elt.content === values[KEY_INSURANCE_TYPES])}
                                                        options={_insuranceTypes}
                                                        placeholder={msg}
                                                        isClearable={false}
                                                    />
                                                </FormGroup>
                                            )
                                        }
                                    }
                                </FormattedMessage>
                            )
                        }, [values[KEY_INSURANCE_TYPES]])
                    }
                </Col>

                <Col xs={12} md={6}>
                    {
                        values[KEY_INSURANCE_TYPES] === INSURANCE_TYPE_RENEWALS &&
                        <InputGroup className="form-label-group">
                            <BaseFormGroup
                                fieldName={KEY_GCN_CONTRACT_PREFIX}
                                errors={errors}
                                touched={touched}
                                messageId={getKeyLang(`GCN`)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="check" onClick={() => handleCheckGCN(values[KEY_GCN_CONTRACT_PREFIX])}
                                    className="custom-check-btn"
                                >
                                    <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                    <CheckCircle size={14} />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    }
                </Col>
            </Row>

            {/* Thông tin chủ hộ */}
            <Row>
                <Col xs={12} md={6} >
                    <div className="font-weight-bold font-medium-3 text-italic text-primary">
                        <FormattedMessage id={getKeyLang("houseOwnerInfo")} />
                    </div>
                </Col>
            </Row>
            {/* ----- */}

            <FieldArray name={KEY_ADDTIONAL_PEOPLE}>
                {
                    ({ insert, remove, push }) => {
                        let { [KEY_ADDTIONAL_PEOPLE]: _addtionalPeople } = values
                        if (!Array.isArray(_addtionalPeople)) {
                            _addtionalPeople = []
                        }
                        return (
                            <>
                                {
                                    _addtionalPeople.map((person, index) => {
                                        return (
                                            <div className="mt-1" key={index}>
                                                {
                                                    index !== 0 &&
                                                    <div className="d-flex justify-content-end">
                                                        <IconXStyled
                                                            style={{ color: "red" }} className='vx-icon' size={26}
                                                            onClick={() => { remove(index) }}
                                                        />
                                                    </div>
                                                }
                                                <AddtionalPerson formik={formik} index={index} className="mt-1" />
                                                {
                                                    (index < _addtionalPeople.length - 1) &&
                                                    <div style={{ backgroundColor: "#d8d8d8", height: "1px", width: " 100%", marginTop: "2rem" }} />
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <Row className="mb-3 mt-1">
                                    <Col xs={12} md={8} />
                                    <Col cs={12} md={4} >
                                        <Button
                                            color="primary" className={`w-100`}
                                            onClick={() => {
                                                push(addtionalPeopleDefault)
                                            }}
                                        >
                                            <FormattedMessage id={getKeyLang(`addPerson`)} />
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )
                    }
                }
            </FieldArray>
        </div>
    )
}

export default Group