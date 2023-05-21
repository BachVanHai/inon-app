import '../../../../assets/scss/insurance-app/buy-insurances/overall.scss'
import React from 'react'
import HeaderView from './views/HeaderView'
import BodyView from './views/BodyView'
import PageWrapper from '../../../../components/insurance-app/common-page/page-context'
import { useDispatch, useSelector } from 'react-redux'
import { resetState, setAddtionalTerm, updateProps } from '../../../../redux/actions/insurance-app/buyInsurancesCar'
import {
    KEY_ACTIVE_STEP, KEY_ADD_TERMS_ALL, KEY_ADD_TERMS_MAIN, KEY_CONTRACT_ID, KEY_STEP_1, KEY_STEP_2,
    KEY_STEP_3, MAX_STEP, REDUX_STATE_NAME
} from '../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { isArrayEmpty, isObjEmpty } from '../../../../ultity'
import { initialValues, KEY_BUSINESS_STATUS, KEY_CAPACITY_TYPE, KEY_INON_TYPE, KEY_VEHICLE_TYPE } from './components/step1/formikConfig'
import {
    initialValues as step2_initialValues, KEY_BH_INCREASE, KEY_DURATION_BBTNDS, KEY_DURATION_BHVC,
    KEY_TOGGLE_BBTNDS, KEY_TOGGLE_HH, KEY_TOGGLE_TNDSTN, KEY_TOGGLE_TNLPL, KEY_TOGGLE_VC, KEY_XTRIEU_HANGHOA_VANCHUYEN, KEY_XTRIEU_NGUOI_TREN_XE, KEY_XTRIEU_NGUOI_VU,
    KEY_XTRIEU_TAISAN_VU, KEY_XTRIEU_TAI_HANHKHACH
} from './components/step2/formikConfig'
import {
    initialValues as step3_initialValues, KEY_ADDRESS, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL,
    KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_WARD
} from './components/step3/formikConfig'
import { KEY_LAST_ENDPOINT_PATH } from '../../../../redux/reducers/insurance-app/utility'
import { PATH_BUY_INSURANCES_CAR } from '../../../../configs/insurance-app'

const CarOveralView = ({ location }) => {
    const { [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep } = useSelector(state => state.app[REDUX_STATE_NAME])
    const dispatch = useDispatch()

    React.useEffect(() => {
        /** assign name-path to make this buy-insurance-car redux-state become unique, 
         * avoid the conflict with other buy-insurance-car redux-state */
        dispatch(updateProps([
            {
                prop: KEY_LAST_ENDPOINT_PATH,
                value: PATH_BUY_INSURANCES_CAR
            }
        ]))
    }, [])

    React.useEffect(() => {
        const fillStep1 = (contractInfo) => {
            if (isArrayEmpty(contractInfo.vehicles)) {
                contractInfo.vehicles = [
                    {
                        "vehicleType": {
                            "id": "",
                            "capacityType": "",
                            "businessStatus": "",
                            "inonType": "",
                        }
                    }
                ]
            }
            const vehicle = contractInfo.vehicles[0]
            let _initialValues = { ...initialValues }
            for (let prop in _initialValues) {
                _initialValues[prop] = vehicle[prop]
            }
            _initialValues[KEY_VEHICLE_TYPE] = vehicle.vehicleType.id
            _initialValues[KEY_CAPACITY_TYPE] = vehicle.vehicleType.capacityType
            _initialValues[KEY_BUSINESS_STATUS] = vehicle.vehicleType.businessStatus
            _initialValues[KEY_INON_TYPE] = vehicle.vehicleType.code
            return _initialValues
        }

        const fillStep2 = (contractInfo) => {
            if (isArrayEmpty(contractInfo.insurances)) {
                contractInfo.insurances = [
                    {
                        "duration": "",
                        "isEnable": false,
                        "insuranceCode": "",
                        "feeRate1": "",
                        "liability1": "",
                        "liability2": "",
                        "liability3": "",
                    }
                ]
            }
            if (isArrayEmpty(contractInfo.insuranceAddons)) {
                contractInfo.insuranceAddons = [
                    {
                        "addonCode": "",
                        "buyEnable": false,
                    }
                ]
            }
            let _step2_initValues = { ...step2_initialValues }
            contractInfo.insurances.forEach((insur) => {
                const { duration, isEnable, insuranceCode, feeRate1, liability1, liability2, liability3 } = insur
                switch (insuranceCode) {
                    case "CAR_TNDS":
                        _step2_initValues[KEY_TOGGLE_BBTNDS] = isEnable
                        _step2_initValues[KEY_DURATION_BBTNDS] = duration
                        break
                    case "CAR_TNDS_TN":
                        _step2_initValues[KEY_TOGGLE_TNDSTN] = isEnable
                        _step2_initValues[KEY_XTRIEU_NGUOI_VU] = +liability1 / 1_000_000
                        _step2_initValues[KEY_XTRIEU_TAISAN_VU] = +liability2 / 1_000_000
                        _step2_initValues[KEY_XTRIEU_TAI_HANHKHACH] = +liability3 / 1_000_000
                        break
                    case "CAR_VATCHAT":
                        _step2_initValues[KEY_TOGGLE_VC] = isEnable
                        _step2_initValues[KEY_DURATION_BHVC] = duration
                        _step2_initValues[KEY_BH_INCREASE] = feeRate1
                        if (isEnable) {
                            const { addTermsMains, addTermsAlls } = setAddtionalTerm(contractInfo.insuranceAddons)
                            _step2_initValues[KEY_ADD_TERMS_MAIN] = addTermsMains
                            _step2_initValues[KEY_ADD_TERMS_ALL] = addTermsAlls
                        }
                        break
                    case "CAR_CONNGUOI":
                        _step2_initValues[KEY_TOGGLE_TNLPL] = isEnable
                        _step2_initValues[KEY_XTRIEU_NGUOI_TREN_XE] = +liability1 / 1_000_000
                        break
                    case "CAR_HANGHOA":
                        _step2_initValues[KEY_TOGGLE_HH] = isEnable
                        _step2_initValues[KEY_XTRIEU_HANGHOA_VANCHUYEN] = +liability1 / 1_000_000
                        break
                    default:
                        break
                }
            })

            return _step2_initValues
        }

        const fillStep3 = (contractInfo) => {
            if (isObjEmpty(contractInfo.owner)) {
                contractInfo.owner = {
                    "icType": "",
                    "icNo": "",
                    "fullName": "",
                    "dateOfBirth": "",
                    "phoneNumber": "",
                    "email": "",
                    "gender": "",
                    "addresses": "",
                }
            }
            let _step3_initialValues = { ...step3_initialValues }
            const { icType, icNo, fullName, dateOfBirth, phoneNumber,
                email, gender, addresses,
            } = contractInfo.owner

            _step3_initialValues[KEY_IC_TYPE] = icType
            _step3_initialValues[KEY_IC_NO] = icNo
            _step3_initialValues[KEY_FULLNAME] = fullName
            _step3_initialValues[KEY_DATE_BIRTH] = dateOfBirth
            _step3_initialValues[KEY_PHONE_NUMBER] = phoneNumber
            _step3_initialValues[KEY_EMAIL] = email
            _step3_initialValues[KEY_GENDER] = gender

            _step3_initialValues[KEY_CITY] = addresses[0]["city"]
            _step3_initialValues[KEY_DISTRICT] = addresses[0]["district"]
            _step3_initialValues[KEY_WARD] = addresses[0]["ward"]
            _step3_initialValues[KEY_ADDRESS] = addresses[0]["detail"]
            // _step3_initialValues[KEY_TOGGLE_CHUYENQUYEN_TH] = 3
            // _step3_initialValues[KEY_BENEFIARRY_BANK_SELETECTED] = 3
            // _step3_initialValues[KEY_BENEFICIARY_BRANCH] = 3
            // _step3_initialValues[KEY_BENEFICIARY_ADDRESS] = 3
            // _step3_initialValues[KEY_BENEFICIARY_LIMIT] = 3
            return _step3_initialValues
        }

        let contractInfo = location?.state?.data
        if (isObjEmpty(contractInfo)) return
        if (contractId || activeStep === MAX_STEP) {
            /* this thing happened when user have paid contract or already have created contract in the past  */
            dispatch(resetState())
        }
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_1,
                    value: fillStep1(contractInfo)
                },
                {
                    prop: KEY_STEP_2,
                    value: fillStep2(contractInfo)
                },
                {
                    prop: KEY_STEP_3,
                    value: fillStep3(contractInfo)
                },
            ])
        )
    }, [])

    return (
        <PageWrapper value={location} className="buy-insurances">
            <HeaderView />
            <BodyView />
        </PageWrapper>
    )
}

export default CarOveralView
