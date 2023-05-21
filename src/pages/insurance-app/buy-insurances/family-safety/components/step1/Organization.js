import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import React, { useEffect } from 'react'
import { Col, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { BaseAppUltils, BaseFormGroup, Button } from 'base-app'
import { CheckCircle } from "react-feather"
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { useDispatch } from 'react-redux'
import {
    initialValues_organization, KEY_ADDRESS, KEY_CITY, KEY_DISTRICT, KEY_EMAIL,
    KEY_FULLNAME, KEY_IC_NO, KEY_PHONE_NUMBER, KEY_WARD
} from './formikConfig'
import { fillMultipleStepInfo, hasRequestFail, isObjEmpty } from '../../../../../../ultity'
import FullAddressRowComp from '../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
import Service from '../../../../../../services/insurance-app/buyInsurancesFamilySafety'

const Organization = ({ stepInfo, className, formik }) => {
    const { errors, touched, values, setValues } = formik
    const dispatch = useDispatch()

    const checkInfoContact = (id, failCallback) => {
        return async (dispatch) => {
            try {
                const res = await Service.checkInfoContact(id)
                if (hasRequestFail(res.status)) {
                    failCallback && failCallback()
                    return
                }

                const { fullName, email, icType, addresses, phoneNumber, icNo } = res.data
                const { city, district, ward, detail } = addresses[0]
                let stepInfo = {
                    fullName, email, icType, city, district, ward, detail, phoneNumber, icNo
                }
                fillMultipleStepInfo(stepInfo, initialValues_organization, setValues)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (isObjEmpty(stepInfo)) return
        fillMultipleStepInfo(stepInfo, initialValues_organization, setValues)
    }, [])

    return (
        <div className={className}>
            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <InputGroup className="form-label-group">
                        <BaseFormGroup
                            fieldName={KEY_IC_NO}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`TaxID`)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="check" onClick={() => {
                                const failCallback = () => {
                                    BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("alert.notExistIcNo")} />)
                                }
                                dispatch(checkInfoContact(values.icNo, failCallback))
                            }}
                                className="custom-check-btn"
                            >
                                <span className="font-weight-bold"><FormattedMessage id={getKeyLang(`Check`)} /></span>
                                <CheckCircle size={14} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="position-relative">
                        <BaseFormGroup
                            fieldName={KEY_FULLNAME}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`NameCorp`)}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative" >
                        <BaseFormGroup
                            fieldName={KEY_PHONE_NUMBER}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`PhoneNum`)}
                            type="tel"
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className="form-label-group position-relative">
                        <BaseFormGroup
                            fieldName={KEY_EMAIL}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`EmailTitle`)}
                            type="email"
                        />
                    </FormGroup>
                </Col>
            </Row>

            <FullAddressRowComp
                zIndex="custom-zindex8"
                keysMap={{
                    KEY_CITY: KEY_CITY,
                    KEY_DISTRICT: KEY_DISTRICT,
                    KEY_WARD: KEY_WARD,
                    KEY_ADDRESS: KEY_ADDRESS
                }}
            />
        </div>
    )
}

export default Organization
