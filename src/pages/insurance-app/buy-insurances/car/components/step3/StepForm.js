import React from 'react'
import { Col, Row } from 'reactstrap'
import Info from '../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import SubBeneificiaryInfo from './form-components/SubBeneificiaryInfo'
import {
    KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER,
    KEY_PHONE_NUMBER, KEY_EMAIL, KEY_ADDRESS, KEY_CITY, KEY_DISTRICT, KEY_WARD,
    KEY_TOGGLE_CHUYENQUYEN_TH, KEY_BENEFIARRY_BANK_SELETECTED, IDTypes,
    KEY_BENEFICIARY_BRANCH, KEY_BENEFICIARY_ADDRESS, KEY_BENEFICIARY_LIMIT
} from './formikConfig'
import FullAddressRow from '../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
import ToggleRow from '../../../../../../components/insurance-app/common-forms/toggle-row/ToggleRow'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { fillMultipleStepInfo } from './utility'
import { REDUX_STATE_NAME } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { KEY_NAME, KEY_ADDRESS as BUYER_KEY_ADDRESS } from '../step1/formikConfig'

const StepForm = ({ className, stepInfo, formik }) => {
    const { setFieldValue, getFieldMeta, setValues, values } = formik
    const { step_1, step_3 } = stepInfo

    const setAddressesCallback = (addresses) => {
        if (isArrayEmpty(addresses) || isObjEmpty(addresses)) {
            addresses = [{ city: "", district: "", ward: "", detail: "" }]
        }
        const { city, district, ward, detail } = addresses[0]

        setFieldValue(KEY_ADDRESS, detail || "")
        setFieldValue(KEY_CITY, city || "")
        setFieldValue(KEY_DISTRICT, district || "")
        setFieldValue(KEY_WARD, ward || "")
    }

    React.useEffect(() => {
        if (step_1[KEY_NAME] || step_1[BUYER_KEY_ADDRESS]) {
            fillMultipleStepInfo({ [KEY_FULLNAME]: step_1[KEY_NAME], [KEY_ADDRESS]: step_1[BUYER_KEY_ADDRESS] }, setValues)
        }
    }, [])

    React.useEffect(() => {
        if (isObjEmpty(step_3)) return
        fillMultipleStepInfo(step_3, setValues)
    }, [])

    return (
        <div className={className}>
            <Info
                reduxName={REDUX_STATE_NAME}
                setAddressesCallback={setAddressesCallback}
                stepInfo={{ IDTypes }}
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

            <FullAddressRow
                keysMap={{
                    KEY_CITY: KEY_CITY,
                    KEY_DISTRICT: KEY_DISTRICT,
                    KEY_WARD: KEY_WARD,
                    KEY_ADDRESS: KEY_ADDRESS
                }}
            />

            <ToggleRow
                values={values}
                msgField={getKeyLang(`AlterBeneficiary`)}
                fieldName={KEY_TOGGLE_CHUYENQUYEN_TH}
                toggleOnChange={() => {
                    if (getFieldMeta(KEY_TOGGLE_CHUYENQUYEN_TH).value) {
                        setFieldValue(KEY_TOGGLE_CHUYENQUYEN_TH, false)
                        return
                    }
                    setFieldValue(KEY_TOGGLE_CHUYENQUYEN_TH, true)
                }}
                className="mt-3"
            />

            <Row>
                <Col md={12}>
                    {
                        getFieldMeta(KEY_TOGGLE_CHUYENQUYEN_TH).value &&
                        <SubBeneificiaryInfo
                            callbacks={{
                                banksSelectChange: (original) => {
                                    setFieldValue(KEY_BENEFIARRY_BANK_SELETECTED, original.value)
                                },
                                branchInputChange: (e) => {
                                    setFieldValue(KEY_BENEFICIARY_BRANCH, e.target.value)
                                },
                                addressInputChange: (e) => {
                                    setFieldValue(KEY_BENEFICIARY_ADDRESS, e.target.value)
                                },
                                currencyInputChange: (e) => {
                                    setFieldValue(KEY_BENEFICIARY_LIMIT, e.target.value)
                                },
                            }}
                            keyNames={{
                                KEY_BANKS_SELECT: KEY_BENEFIARRY_BANK_SELETECTED,
                                KEY_BRANCH_NAME_INPUT: KEY_BENEFICIARY_BRANCH,
                                KEY_ADDRESS_INPUT: KEY_BENEFICIARY_ADDRESS,
                                KEY_CURRENCY_INPUT: KEY_BENEFICIARY_LIMIT
                            }}
                        />
                    }
                </Col>
            </Row>
        </div>
    )
}

export default StepForm