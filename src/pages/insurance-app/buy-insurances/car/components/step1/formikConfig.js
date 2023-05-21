
import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as Yup from 'yup'
import { getKeyLang } from '../../../../../../configs/insurance-app'

import {
    ALERT_EMPTY, ALERT_INVALID, ALERT_MIN, ALERT_MIN_VND, numberRegex,
    selectErrorStyleRemoveRight, selectErrorStyles, selectErrorStylesRemoveLeft,
    selectNormalStyleRemoveLeft, selectNormalStyles, selectNormalStylesRemoveRight
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isValueNumber, sleepingFor } from '../../../../../../ultity'

export const errorStyles = selectErrorStyles
export const normalStyles = selectNormalStyles

export const normalStyleRemoveLeft = selectNormalStyleRemoveLeft
export const normalStylesRemoveRight = selectNormalStylesRemoveRight
export const errorStyleRemoveRight = selectErrorStyleRemoveRight
export const errorStylesRemoveLeft = selectErrorStylesRemoveLeft


export const VEHICLE_STATUS_NEW = "NEW"
export const VEHICLE_STATUS_OLD = "OLD"
export const VEHICLE_STATUS_ROLLOVER = "ROLLOVER"

export const CAPACITY_TYPE_SEAT = "SEAT"
export const CAPACITY_TYPE_LOAD = "LOAD"
export const CAPACITY_TYPE_ALL = "ALL"

export const sugg_vehicleStatus = [
    {
        temp: VEHICLE_STATUS_NEW,
        label: <FormattedMessage id={getKeyLang(`NewVehicle`)} />,
        value: 1
    },
    {
        temp: VEHICLE_STATUS_OLD,
        label: <FormattedMessage id={getKeyLang(`OldVehicle`)} />,
        value: 2,
    },
    {
        temp: VEHICLE_STATUS_ROLLOVER,
        label: <FormattedMessage id={getKeyLang(`ReplaceVehicle`)} />,
        value: 3,
    }
]

export const sugg_Purpose = [
    {
        temp: "KD",
        value: 1,
        label: <FormattedMessage id={getKeyLang(`VehicleTypeKD`)} />,
    },
    {
        temp: "KKD",
        value: 2,
        label: <FormattedMessage id={getKeyLang(`VehicleTypeKKD`)} />,
    }
]

export const sugg_Purpose_KD = [
    {
        temp: "KD",
        value: 1,
        label: <FormattedMessage id={getKeyLang(`VehicleTypeKD`)} />,
    },
]

export const sugg_Purpose_KKD = [
    {
        temp: "KKD",
        value: 1,
        label: <FormattedMessage id={getKeyLang(`VehicleTypeKKD`)} />,
    }
]

export const sugg_OriginProd = [
    {
        temp: "VIETNAM",
        value: 1,
        label: <FormattedMessage id={getKeyLang(`VehicleOrgiVN`)} />,

    },
    {
        temp: "IMPORT",
        value: 2,
        label: <FormattedMessage id={getKeyLang(`VehicleOrgiNK`)} />,
    }
]

export const KEY_VEHICLE_STATUS = "vehicleStatus"
export const KEY_NUMBER_PLATE = "numberPlate"
export const KEY_VEHICLE_TYPE = "vehicleType"
export const KEY_CAPACITY_TYPE = "capacityType"
export const KEY_MANUFACTURER_NAME = "manufacturerName"
export const KEY_BRAND_NAME = "brandName"
export const KEY_PURPOSE = "usage"
export const KEY_CHASSIS_NUMBER = "frameNo"
export const KEY_ENGINE_NUMBER = "machineNo"
export const KEY_GT_XE_KHAIBAO = "initValue"
export const KEY_GTBH_YEUCAU = "contractValue"
export const KEY_ORIGIN_PRODUCT = "issPlace"
export const KEY_YEAR_PRODUCT = "issDate"

export const KEY_SEATS = "seats"
export const KEY_LOADS = "loads"
export const KEY_MIN_SEATS = "minSeats"
export const KEY_MIN_LOADS = "minLoads"
export const KEY_MAX_SEATS = "maxSeats"
export const KEY_MAX_LOADS = "maxLoads"
export const KEY_INON_TYPE = "inonType"
export const KEY_BUSINESS_STATUS = "businessStatus"

export const KEY_NAME = "fullname"
export const KEY_ADDRESS = "address"

export const initialValues = ({
    [KEY_VEHICLE_STATUS]: "",
    [KEY_NUMBER_PLATE]: "",
    [KEY_VEHICLE_TYPE]: "",
    [KEY_CAPACITY_TYPE]: "",
    [KEY_MANUFACTURER_NAME]: "",
    [KEY_BRAND_NAME]: "",
    [KEY_PURPOSE]: "",
    [KEY_CHASSIS_NUMBER]: "",
    [KEY_ENGINE_NUMBER]: "",
    [KEY_GT_XE_KHAIBAO]: "",
    [KEY_GTBH_YEUCAU]: "",
    [KEY_ORIGIN_PRODUCT]: "",
    [KEY_YEAR_PRODUCT]: "",

    [KEY_SEATS]: 0,
    [KEY_LOADS]: 0,
    [KEY_MIN_SEATS]: 0,
    [KEY_MIN_LOADS]: 0,
    [KEY_MAX_SEATS]: 60,
    [KEY_MAX_LOADS]: 60,
    [KEY_INON_TYPE]: "",
    [KEY_BUSINESS_STATUS]: "",

    [KEY_NAME]: "",
    [KEY_ADDRESS]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const {
            [KEY_MIN_SEATS]: minSeats, [KEY_MIN_LOADS]: minLoads,
            [KEY_MAX_SEATS]: maxSeats, [KEY_MAX_LOADS]: maxLoads,
            [KEY_SEATS]: seats, [KEY_LOADS]: loads,
            [KEY_CAPACITY_TYPE]: capacityType,

            [KEY_NUMBER_PLATE]: numberPlate,
            [KEY_CHASSIS_NUMBER]: chassyNumber,
            [KEY_ENGINE_NUMBER]: engineNumber
        } = values

        if (!numberPlate || numberPlate.match(/^\s*$/)) {
            if (!chassyNumber || chassyNumber.match(/^\s*$/)) {
                errors[KEY_CHASSIS_NUMBER] = ALERT_EMPTY
            }
            if (!engineNumber || engineNumber.match(/^\s*$/)) {
                errors[KEY_ENGINE_NUMBER] = ALERT_EMPTY
            }
        }

        if (capacityType === "SEAT" || capacityType === "ALL") {
            if (!isValueNumber(seats) || seats < minSeats || seats > maxSeats) {
                errors[KEY_SEATS] = <FormattedMessage id={getKeyLang('insurance.seatsMaxMinNotice')} values={{ minSeats, maxSeats }} />
            }
        }
        if (capacityType === "LOAD" || capacityType === "ALL") {
            if (!isValueNumber(loads) || loads < minLoads || loads > maxLoads) {
                errors[KEY_LOADS] = <FormattedMessage id={getKeyLang('insurance.loadsMaxMinNotice')} values={{ minLoads, maxLoads }} />
            }
        }

        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_VEHICLE_STATUS]: Yup.string()
        .required(ALERT_EMPTY)
    ,
  
    [KEY_VEHICLE_TYPE]: Yup.string()
        .matches(numberRegex, ALERT_INVALID)
        .required(ALERT_EMPTY)
    ,
    [KEY_MANUFACTURER_NAME]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_BRAND_NAME]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_PURPOSE]: Yup.string()
        .required(ALERT_EMPTY)
    ,
  
    [KEY_GT_XE_KHAIBAO]: Yup.string()
        .min(8, ALERT_MIN_VND)
        .required(ALERT_EMPTY)
    ,
    [KEY_ORIGIN_PRODUCT]: Yup.string()
        .required(ALERT_EMPTY)
    ,
    [KEY_YEAR_PRODUCT]: Yup.string()
        .required(ALERT_EMPTY)
    ,
})