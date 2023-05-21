import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { Col, FormGroup, Row } from 'reactstrap'
import { Select } from 'base-app'
import { useFillAddresses } from './useFillAddresses'
import { getKeyLang } from '../../../../configs/insurance-app'
import * as config from '../../buy-insurances-page/formik-config'

const AddressesRowComp = ({
    formikSetFieldValue,
    keysMap = { KEY_CITY: "city", KEY_DISTRICT: "district", KEY_WARD: "ward" },
    formikGetFieldMeta = null,
    zIndex = "custom-zindex8",
    maxMenuHeight = 180,
    required = false,
    ...props
}) => {
    const { cities, districts, wards, loadDitrictsByCity, loadWardsByDistrict } = useFillAddresses(formikSetFieldValue, keysMap, formikGetFieldMeta)
    const { KEY_CITY, KEY_DISTRICT, KEY_WARD } = keysMap
    const subtractOneZindex = (zIndexStr) => {
        return zIndexStr.replace(/\d/, value => Number(value) - 1)
    }
    const subtractTwoZindex = (zIndexStr) => {
        return zIndexStr.replace(/\d/, value => Number(value) - 2)
    }

    return (
        <Row {...props}>
            <Col xs={12} md={4} >
                {
                    useMemo(() => {
                        return (
                            <FormattedMessage
                                id={getKeyLang(`${required ? 'City.required' : 'City'}`)}
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
                                                    className={`${zIndex ? `${zIndex}` : "custom-zindex8"}  mb-2`}
                                                    onChange={({ id, label }) => {
                                                        loadDitrictsByCity(id)
                                                        formikSetFieldValue(KEY_CITY, label)
                                                    }}
                                                    value={cities.find(city => city.label === formikGetFieldMeta(KEY_CITY).value)}
                                                    options={cities}
                                                    placeholder={msg}
                                                    isClearable={false}
                                                    maxMenuHeight={maxMenuHeight}
                                                    styles={formikGetFieldMeta(KEY_CITY).error ? config.selectErrorStyles : config.selectNormalStyles}
                                                />
                                            </FormGroup>
                                        )
                                    }
                                }
                            </FormattedMessage>
                        )
                    }, [cities.length, formikGetFieldMeta(KEY_CITY).value, formikGetFieldMeta(KEY_CITY).error])
                }
            </Col>

            <Col xs={12} md={4} >
                {
                    useMemo(() => {
                        return (
                            <FormattedMessage
                                id={getKeyLang(`${required ? 'District.required' : 'District'}`)}
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
                                                    className={`${zIndex ? `${subtractOneZindex(zIndex)}` : "custom-zindex7"} mb-2`}
                                                    onChange={({ id, label }) => {
                                                        loadWardsByDistrict(id)
                                                        formikSetFieldValue(KEY_DISTRICT, label)
                                                    }}
                                                    value={districts.find(district => district.label === formikGetFieldMeta(KEY_DISTRICT).value)}
                                                    options={districts}
                                                    placeholder={msg}
                                                    isClearable={false}
                                                    maxMenuHeight={maxMenuHeight}
                                                    styles={formikGetFieldMeta(KEY_DISTRICT).error ? config.selectErrorStyles : config.selectNormalStyles}
                                                />
                                            </FormGroup>
                                        )
                                    }
                                }
                            </FormattedMessage>
                        )
                    }, [districts.length, formikGetFieldMeta(KEY_DISTRICT).value, formikGetFieldMeta(KEY_DISTRICT).error])
                }
            </Col>

            <Col xs={12} md={4} >
                {
                    useMemo(() => {
                        return (
                            <FormattedMessage
                                id={getKeyLang(`${required ? 'Ward.required' : 'Ward'}`)}
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
                                                    className={`${zIndex ? `${subtractTwoZindex(zIndex)}` : "custom-zindex6"} mb-2`}
                                                    onChange={({ id, label }) => {
                                                        formikSetFieldValue(KEY_WARD, label)
                                                    }}
                                                    value={wards.find(ward => ward.label === formikGetFieldMeta(KEY_WARD).value)}
                                                    options={wards}
                                                    placeholder={msg}
                                                    isClearable={false}
                                                    maxMenuHeight={maxMenuHeight}
                                                    styles={formikGetFieldMeta(KEY_WARD).error ? config.selectErrorStyles : config.selectNormalStyles}
                                                />
                                            </FormGroup>
                                        )
                                    }
                                }
                            </FormattedMessage>
                        )
                    }, [wards.length, formikGetFieldMeta(KEY_WARD).value, formikGetFieldMeta(KEY_WARD).error])
                }
            </Col>
        </Row>
    )
}

export default AddressesRowComp
