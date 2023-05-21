import React from 'react'
import {
    PATH_BUY_INSURANCES_CAR, PATH_BUY_INSURANCES_CARS, PATH_BUY_INSURANCES_FAMILY_SAFETY, PATH_BUY_INSURANCES_MOTOR,
    PATH_BUY_INSURANCES_MOTORS, PATH_BUY_INSURANCES_MOTOR_SIMPLIFY, PATH_BUY_INSURANCES_PERSONAL_HOME,
    PATH_BUY_INSURANCES_VTA, getKeyLang, PATH_BUY_HOME_PERSONAL_MULTIPLE, PATH_BUY_INSURANCES_HEALTH_CARE, PATH_BUY_INSURANCES_CAR_SIMPLIFY, PATH_BUY_INSURANCES_TRAVEL, PATH_AN_IN_INSUR, PATH_BUY_INSURANCES_TRAVEL_DOMESTIC, PATH_BUY_INSURANCES_GOODS, PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED
} from "../../../../configs/insurance-app"
import { FormattedMessage } from 'react-intl'

const vehicleInsurances = [
    {
        pathName: PATH_BUY_INSURANCES_CAR,
        title: <FormattedMessage id={getKeyLang("InsuranceCar")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_CARS,
        title: <FormattedMessage id={getKeyLang("InsuranceCars")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_MOTOR,
        title: <FormattedMessage id={getKeyLang("InsuranceMotor")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_MOTORS,
        title: <FormattedMessage id={getKeyLang("InsuranceMotors")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_MOTOR_SIMPLIFY,
        title: <FormattedMessage id={getKeyLang("InsuranceMotor")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_CAR_SIMPLIFY,
        title: <FormattedMessage id={getKeyLang("carSimplify")} />,
    },
]

const humanInsurances = [
    {
        pathName: PATH_BUY_INSURANCES_VTA,
        title: <FormattedMessage id={getKeyLang("vtaInsurance")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_FAMILY_SAFETY,
        title: <FormattedMessage id={getKeyLang("homeSafetyInsurance")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_HEALTH_CARE,
        title: <FormattedMessage id={getKeyLang("healthCareInsurance")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED,
        title: <FormattedMessage id={getKeyLang("heathcareAdvanced.insurance")} />,
    },
    {
        pathName: PATH_AN_IN_INSUR,
        title: <FormattedMessage id={getKeyLang("antin.title")} />,
    },
]

const assestInsurances = [
    {
        pathName: PATH_BUY_INSURANCES_PERSONAL_HOME,
        title: <FormattedMessage id={getKeyLang("personalHomeInsurance")} />,
    },
    {
        pathName: PATH_BUY_HOME_PERSONAL_MULTIPLE,
        title: <FormattedMessage id={getKeyLang("insurance.homePersonMultiple.titleSelect")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_GOODS,
        title: <FormattedMessage id={getKeyLang("goods.title")} />,
    },
]


const travelInsurances = [
    {
        pathName: PATH_BUY_INSURANCES_TRAVEL,
        title: <FormattedMessage id={getKeyLang("travelInsurance")} />,
    },
    {
        pathName: PATH_BUY_INSURANCES_TRAVEL_DOMESTIC,
        title: <FormattedMessage id={getKeyLang("travel.domestic")} />,
    }
]


export const getNameFromLocationPath = (locationPath) => {
    const find = (insurances) => {
        const _location_arr = locationPath.split("/")
        const _entryLocationPath = _location_arr[_location_arr.length - 1]

        return insurances.find(elt => {
            const _elt_arr = elt.pathName.split("/")
            const _entryPath = _elt_arr[_elt_arr.length - 1]
            return _entryPath === _entryLocationPath
        })
    }

    const foundVehicle = find(vehicleInsurances)
    const foundPerson = find(humanInsurances)
    const foundAsset = find(assestInsurances)
    const foundTravel = find(travelInsurances)

    return foundVehicle && <span>{"Bảo hiểm xe cơ giới -> "}{foundVehicle.title}</span>
        || foundPerson && <span>{"Bảo hiểm con người -> "}{foundPerson.title}</span>
        || foundAsset && <span>{"Bảo hiểm tài sản -> "}{foundAsset.title}</span>
        ||foundTravel && <span>{"Bảo hiểm du lịch và chuyến đi -> "}{foundTravel.title}</span>
}