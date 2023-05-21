import { KEY_BUYER_ID, KEY_CONTRACT_ID } from "../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome"
import {
    initialValues,
    KEY_ADDRESS,
    KEY_ADDTIONAL_ADDRESSES,
    KEY_CITY,
    KEY_DATE_BIRTH,
    KEY_DISTRICT,
    KEY_EMAIL,
    KEY_FULL_NAME,
    KEY_GENDER,
    KEY_HOUSE_TYPE,
    KEY_IC_NO,
    KEY_IC_TYPE,
    KEY_INSURED_TYPE,
    KEY_ISSUED_DATE,
    KEY_ISSUED_PLACE,
    KEY_PHONE_NUMBER,
    KEY_TIME_USED,
    KEY_TOGGLE_IS_ADDRESS_EQUAL,
    KEY_WARD
} from './formikConfig'
import { fillMultipleStepInfo as _fillMultipleStepInfo } from '../../../../../../ultity'

export const getDefault_createContractObj = (values) => {
    const obj = {
        "customerRequest": {
            "addresses": [
                {
                    "city": values[KEY_CITY],
                    "detail": values[KEY_ADDRESS],
                    "district": values[KEY_DISTRICT],
                    "ward": values[KEY_WARD],
                    "isDefault": true,
                    "type": "HOME",
                }
            ],
            "icNo": values[KEY_IC_NO],
            "email": values[KEY_EMAIL],
            "gender": values[KEY_GENDER],
            "icType": values[KEY_IC_TYPE],
            "fullName": values[KEY_FULL_NAME],
            "phoneNumber": values[KEY_PHONE_NUMBER],
            "dateOfBirth": values[KEY_DATE_BIRTH],
            "issuedDate": values[KEY_ISSUED_DATE],
            "issuedPlace": values[KEY_ISSUED_PLACE],
            "type": "BANK"
        },
        "houseOwnerType": values[KEY_INSURED_TYPE],
        "theSameAddress": values[KEY_TOGGLE_IS_ADDRESS_EQUAL],
        "houseType": values[KEY_HOUSE_TYPE],
        "usedTime": values[KEY_TIME_USED],
    }

    if (!values[KEY_TOGGLE_IS_ADDRESS_EQUAL]) {
        obj["houseAddressDTO"] = {
            "city": values[KEY_ADDTIONAL_ADDRESSES][0][KEY_CITY],
            "district": values[KEY_ADDTIONAL_ADDRESSES][0][KEY_DISTRICT],
            "ward": values[KEY_ADDTIONAL_ADDRESSES][0][KEY_WARD],
            "detail": values[KEY_ADDTIONAL_ADDRESSES][0][KEY_ADDRESS],
        }
    }

    return obj
}

export const getDefault_updateContractObj = (values) => {
    const obj = getDefault_createContractObj(values)
    obj["customerRequest"]["id"] = values[KEY_BUYER_ID]
    obj["contractId"] = values[KEY_CONTRACT_ID]

    return obj
}

export const fillMultipleStepInfo = (stepInfo, setFieldValue, setValues) => {
    return _fillMultipleStepInfo(stepInfo, initialValues, setValues)
}
