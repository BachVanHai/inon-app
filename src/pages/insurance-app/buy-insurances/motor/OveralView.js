import '../../../../assets/scss/insurance-app/buy-insurances/overall.scss'
import React from 'react'
import HeaderView from './views/HeaderView'
import BodyView from './views/BodyView'
import { BASE, KEY_STEP_2, KEY_STEP_3, MAX_STEP } from '../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { REDUX_STATE_NAME } from './components/stepsManager'
import { useDispatch } from 'react-redux'
import { isArrayEmpty, isObjEmpty } from '../../../../ultity'
import {
    initialValues as step1_initValues, KEY_FRAME_NUMBER, KEY_LINE_VEHICLE, KEY_MANUFACTURER_VEHICLE,
    KEY_NUMBER_PLATE, KEY_VEHICLE_TYPE, KEY_MACHINE_NUMBER
} from './components/step1/formikConfig'
import { resetState, updateProps } from '../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import {
    initialValues as step3_initValues, KEY_ADDRESS, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL,
    KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_WARD
} from './components/step3/formikConfig'
import {
    initialValues as step2_initialValues, KEY_ADD_RESPONSIBILITY_VALUE,
    KEY_AMOUNT_PEOPLE_EACH_CAR, KEY_DURATION
} from './components/step2/formikConfig'
import { TEXT_NO_VALUE } from '../../../../components/insurance-app/buy-insurances-page/formik-config'
import { PATH_BUY_INSURANCES_MOTOR } from '../../../../configs/insurance-app'
import { KEY_LAST_ENDPOINT_PATH } from '../../../../redux/reducers/insurance-app/utility'

const OverallView = ({ location }) => {
    const dispatch = useDispatch()
    const { [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_ACTIVE_STEP]: activeStep
    } = useSelector(state => state.app[REDUX_STATE_NAME])

    /** assign name-path to make this buy-insurance-motor redux-state become unique, 
      * avoid the conflict with other buy-insurance-motor redux-state */
    React.useEffect(() => {
        dispatch(updateProps([
            {
                prop: KEY_LAST_ENDPOINT_PATH,
                value: PATH_BUY_INSURANCES_MOTOR
            }
        ]))
    }, [])

    React.useEffect(() => {
        const fillStep1 = (contractInfo) => {
            if (isArrayEmpty(contractInfo.vehicles)) {
                contractInfo.vehicles = [
                    {
                        "manufacturerName": TEXT_NO_VALUE,
                        "numberPlate": TEXT_NO_VALUE,
                        "brandName": TEXT_NO_VALUE,
                        "machineNo": TEXT_NO_VALUE,
                        "vehicleType": {
                            "id": TEXT_NO_VALUE,
                        }
                    }
                ]
            }
            const vehicle = contractInfo.vehicles[0]
            let _initialValues = { ...step1_initValues }

            _initialValues[KEY_NUMBER_PLATE] = vehicle.numberPlate
            _initialValues[KEY_FRAME_NUMBER] = vehicle.frameNo
            _initialValues[KEY_MACHINE_NUMBER] = vehicle.machineNo

            _initialValues[KEY_VEHICLE_TYPE] = vehicle.vehicleType.id
            _initialValues[KEY_MANUFACTURER_VEHICLE] = vehicle.manufacturerName
            _initialValues[KEY_LINE_VEHICLE] = vehicle.brandName
            return _initialValues
        }

        const fillStep2 = (contractInfo) => {
            const _initialValues = { ...step2_initialValues }
            const { insurances } = contractInfo
            if (!isArrayEmpty(insurances)) {
                insurances.forEach(elt => {
                    const { insuranceCode, duration, isEnable, liability1, count1 } = elt
                    if (isEnable) {
                        if (insuranceCode === "MOTOR_TNDS") {
                            _initialValues[KEY_DURATION] = duration
                        }
                        if (insuranceCode === "MOTOR_CONNGUOI") {
                            _initialValues[KEY_ADD_RESPONSIBILITY_VALUE] = liability1
                            _initialValues[KEY_AMOUNT_PEOPLE_EACH_CAR] = count1
                        }
                    }
                })
            }
            return _initialValues
        }

        const fillStep3 = (contractInfo) => {
            if (isObjEmpty(contractInfo.owner)) {
                contractInfo.owner = {
                    "icType": TEXT_NO_VALUE,
                    "icNo": TEXT_NO_VALUE,
                    "fullName": TEXT_NO_VALUE,
                    "dateOfBirth": TEXT_NO_VALUE,
                    "phoneNumber": TEXT_NO_VALUE,
                    "email": TEXT_NO_VALUE,
                    "gender": TEXT_NO_VALUE,
                    "addresses": TEXT_NO_VALUE,
                }
            }
            let _initialValues = { ...step3_initValues }
            const { icType, icNo, fullName, dateOfBirth, phoneNumber,
                email, gender, addresses,
            } = contractInfo.owner

            _initialValues[KEY_IC_TYPE] = icType
            _initialValues[KEY_IC_NO] = icNo
            _initialValues[KEY_FULLNAME] = fullName
            _initialValues[KEY_DATE_BIRTH] = dateOfBirth
            _initialValues[KEY_PHONE_NUMBER] = phoneNumber
            _initialValues[KEY_EMAIL] = email
            _initialValues[KEY_GENDER] = gender

            _initialValues[KEY_CITY] = addresses[0]["city"]
            _initialValues[KEY_DISTRICT] = addresses[0]["district"]
            _initialValues[KEY_WARD] = addresses[0]["ward"]
            _initialValues[KEY_ADDRESS] = addresses[0]["detail"]

            return _initialValues
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
                    prop: BASE.KEY_STEP_1,
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
        <div className="buy-insurances">
            <HeaderView />
            <BodyView />
        </div>
    )
}

export default OverallView