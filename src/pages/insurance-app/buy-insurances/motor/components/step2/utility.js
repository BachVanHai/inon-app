import { convertDateTimeToReadble, isArrayEmpty } from '../../../../../../ultity'
import {
    KEY_ADD_RESPONSIBILITY_VALUE, KEY_AMOUNT_PEOPLE_EACH_CAR, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION,
    KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_TOGGLE_BBTNDS, KEY_TOGGLE_TAI_NAN
} from './formikConfig'

export const getDefault_updateCompanyIdObj = (contractId, companyId) => {
    return ({
        "id": contractId,
        "companyId": companyId
    })
}

export const getDefault_insurancesObj = (baseInsurances, values) => {
    const {
        [KEY_DURATION]: duration,
        [KEY_TOGGLE_BBTNDS]: toggleBBTNDS,
        [KEY_DATE_INSUR_FROM]: valueDateStart,
        [KEY_TIME_INSUR_FROM]: valueTimeStart,
        [KEY_DATE_INSUR_TO]: valueDateEnd,
        [KEY_TIME_INSUR_TO]: valueTimeEnd,

        [KEY_TOGGLE_TAI_NAN]: toggleTainan,
        [KEY_AMOUNT_PEOPLE_EACH_CAR]: numInCar,
        [KEY_ADD_RESPONSIBILITY_VALUE]: addResponsibilityValue
    } = values

    return baseInsurances.map((elt) => {
        switch (elt.insuranceCode) {
            case "MOTOR_TNDS":
                if (toggleBBTNDS) {
                    elt.isEnable = true
                    elt.duration = duration
                    elt.startValueDate = convertDateTimeToReadble(valueDateStart, valueTimeStart)
                    elt.endValueDate = convertDateTimeToReadble(valueDateEnd, valueTimeEnd)
                }
                return elt
            case "MOTOR_CONNGUOI":
                if (toggleTainan) {
                    elt.isEnable = true
                    elt.count1 = numInCar
                    elt.liability1 = addResponsibilityValue * 1_000_000
                } else {
                    elt.isEnable = false
                }
                return elt
            default:
                return elt
        }
    })
}