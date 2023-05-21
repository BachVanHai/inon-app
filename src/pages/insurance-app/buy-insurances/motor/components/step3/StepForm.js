import React from 'react'
import InfoBase from '../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import { REDUX_STATE_NAME } from '../stepsManager'
import { fillMultipleStepInfo, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import FullAddressRowComp from '../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
import { initialValues, KEY_ADDRESS, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_WARD } from './formikConfig'

const StepForm = ({ formik, stepInfo, className }) => {
    const { setFieldValue, setValues } = formik

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
        if (isObjEmpty(stepInfo)) return
        fillMultipleStepInfo(stepInfo, initialValues, setValues)
    }, [])

    return (
        <div className={className}>
            <InfoBase
                reduxName={REDUX_STATE_NAME}
                setAddressesCallback={setAddressesCallback}
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

            <FullAddressRowComp
                zIndex="custom-zindex5"
                keysMap={{
                    KEY_CITY: KEY_CITY,
                    KEY_DISTRICT: KEY_DISTRICT,
                    KEY_WARD: KEY_WARD,
                    KEY_ADDRESS: KEY_ADDRESS
                }}
            />
        </div >
    )
}

export default StepForm