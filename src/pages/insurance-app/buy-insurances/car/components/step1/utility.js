import { KEY_CONTRACT_ID } from "../../../../../../redux/reducers/insurance-app/buyInsurancesCar"
import { convertStrToNumber } from "../../../../../../ultity"
import {
    KEY_GTBH_YEUCAU, KEY_MANUFACTURER_NAME,
    KEY_BRAND_NAME, KEY_NUMBER_PLATE, KEY_YEAR_PRODUCT, KEY_GT_XE_KHAIBAO,
    KEY_VEHICLE_STATUS, KEY_PURPOSE, KEY_ORIGIN_PRODUCT, KEY_VEHICLE_TYPE, KEY_CHASSIS_NUMBER,
    KEY_ENGINE_NUMBER, KEY_SEATS, KEY_LOADS, KEY_CAPACITY_TYPE, CAPACITY_TYPE_SEAT, CAPACITY_TYPE_LOAD, CAPACITY_TYPE_ALL,
} from './formikConfig'
import moment from "moment"

export const findItemIn = (list, key, foundCallback) => {
    const found = list?.find(elt => elt.label === key)
    if (found) {
        foundCallback && foundCallback(found)
    }
}

export const setBrandName = (brandName, sugg_Automaker, manufacturerName, setSugg_LineVehicle, setFieldValue) => {
    findItemIn(sugg_Automaker, manufacturerName, (foundManufactor) => {
        setSugg_LineVehicle(foundManufactor.brands)
        if (!brandName || !foundManufactor.brands?.find(elt => elt.label.includes(brandName))) {
            return
        }
        setFieldValue(KEY_BRAND_NAME, brandName)
    })
}

export const fillMultipleStepInfo = (setFieldValue, info) => {
    const {
        requireVehicle, contractValue, /* sometime requireVehicle is the same as contractValue */
        manufacturerName, brandName,
        sugg_Automaker, setSugg_LineVehicle,
    } = info

    let _contract_requireValue = contractValue
    if (requireVehicle) {
        _contract_requireValue = requireVehicle
    }

    if (manufacturerName) {
        setFieldValue(KEY_MANUFACTURER_NAME, manufacturerName)
        setBrandName(brandName, sugg_Automaker, manufacturerName, setSugg_LineVehicle, setFieldValue)
    }

    if (_contract_requireValue) {
        setFieldValue(KEY_GTBH_YEUCAU, _contract_requireValue)
    }

    Object.keys(info).forEach(prop => {
        if (prop !== "requireVehicle" &&
            prop !== "contractValue" &&
            prop !== "manufacturerName" &&
            prop !== "brandName" &&
            prop !== "sugg_Automaker" &&
            prop !== "setSugg_LineVehicle") {
            setFieldValue(prop, info[prop])
        }
    })
}

export const getDefault_updateContractInfoObject = (contractId, requireVehicle) => {
    return ({
        id: contractId,
        contractValue: convertStrToNumber(requireVehicle),
    })
}

export const getDefault_vehicleInfoObject = (values) => {
    const obj = {
        contractId: values[KEY_CONTRACT_ID],
        vehicleStatus: values[KEY_VEHICLE_STATUS],
        numberPlate: values[KEY_NUMBER_PLATE],
        usage: values[KEY_PURPOSE],
        issPlace: values[KEY_ORIGIN_PRODUCT],
        issDate: values[KEY_YEAR_PRODUCT],
        vehicleTypeId: values[KEY_VEHICLE_TYPE],
        manufacturerName: values[KEY_MANUFACTURER_NAME],
        brandName: values[KEY_BRAND_NAME],
        initValue: convertStrToNumber(values[KEY_GT_XE_KHAIBAO]),
        contractValue: convertStrToNumber(values[KEY_GTBH_YEUCAU]),
        frameNo: values[KEY_CHASSIS_NUMBER],
        machineNo: values[KEY_ENGINE_NUMBER],
    }
    switch (values[KEY_CAPACITY_TYPE]) {
        case CAPACITY_TYPE_SEAT:
            obj.seats = Number.parseInt(values[KEY_SEATS])
            break
        case CAPACITY_TYPE_LOAD:
            obj.loads = Number.parseFloat(values[KEY_LOADS])
            break
        case CAPACITY_TYPE_ALL:
            obj.seats = Number.parseInt(values[KEY_SEATS])
            obj.loads = Number.parseFloat(values[KEY_LOADS])
            break
        default:
            break
    }
    return obj
}

export const getDefault_updateVehicleInfoObject = (vehicleId, values) => {
    let obj = getDefault_vehicleInfoObject(values)
    obj["id"] = vehicleId
    return obj
}

export const getDefault_contractInfoObject = (requireVehicle, initValue) => {
    return ({
        contractType: "CC",
        contractValue: convertStrToNumber(requireVehicle),
        vehicleValue: convertStrToNumber(initValue),
    })
}

export const getDefault_templateContractInfoObject = (requireVehicle, initValue, templateId) => {
    const obj = getDefault_contractInfoObject(requireVehicle, initValue)
    obj["id"] = templateId
    return obj
}
