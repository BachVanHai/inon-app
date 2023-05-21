import {
    KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME,
    KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_RELATIONSHIPS, KEY_WARD,
} from "../step1/formikConfig"
import moment from "moment"
import { isArrayEmpty } from "../../../../../../ultity"
import { KEY_PACKAGE_SELECTED, KEY_DURATION_SELECTED } from './formikConfig'

const createBuyerObj = (values) => {
    const { [KEY_IC_TYPE]: icType, [KEY_IC_NO]: icNo, [KEY_FULLNAME]: fullName,
        [KEY_DATE_BIRTH]: dateOfBirth, [KEY_PHONE_NUMBER]: phoneNumber, [KEY_EMAIL]: email,
        [KEY_WARD]: ward, [KEY_ADDRESS]: address,
        [KEY_CITY]: city, [KEY_DISTRICT]: district,
        [KEY_GENDER]: gender } = values

    return ({
        "icNo": icNo,
        "icType": icType,
        "email": email,
        "gender": gender,
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "dateOfBirth": moment(dateOfBirth).utc(true).toISOString(),
        "isBuyer": true,
        "addresses": [
            {
                "city": city,
                "district": district,
                "ward": ward,
                "detail": address,
                "type": "HOME",
            }
        ],
    })
}

const createdBeneficiariesObj = (beneficiaries, values) => {
    const { [KEY_PACKAGE_SELECTED]: packageSelected, [KEY_DURATION_SELECTED]: durationSelected } = values
    return beneficiaries.map((person) => {
        const { [KEY_IC_TYPE]: icType, [KEY_IC_NO]: icNo, [KEY_FULLNAME]: fullName,
            [KEY_DATE_BIRTH]: dateOfBirth, [KEY_GENDER]: gender,
            [KEY_PHONE_NUMBER]: phoneNumber, [KEY_EMAIL]: email, [KEY_RELATIONSHIPS]: relationship,
            [KEY_CITY]: city, [KEY_DISTRICT]: district, [KEY_WARD]: ward, [KEY_ADDRESS]: address } = person

        return ({
            "icNo": icNo,
            "email": email,
            "icType": icType,
            "gender": gender,
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "relationship": relationship,
            "dateOfBirth": moment(dateOfBirth).utc(true).toISOString(),
            "packageName": packageSelected,
            "duration": durationSelected,
            "isBuyer": false,
            "addresses": [
                {
                    "city": city,
                    "district": district,
                    "ward": ward,
                    "detail": address,
                    "type": "HOME",
                }
            ],
        })
    })
}

export const getDefault_createdContractInfoObj = (values) => {
    const { [KEY_ADDTIONAL_PEOPLE]: beneficiaries } = values

    return ([
        createBuyerObj(values),
        ...createdBeneficiariesObj(beneficiaries, values)
    ])
}

export const getDefault_updateContractInfoObj = (contractId, values, contractInfo) => {
    let { buyers, beneficiaries } = contractInfo
    if (isArrayEmpty(buyers)) {
        buyers = [{ buyer: { id: "default_val", address: "default_val" } }]
    }
    let { id: buyerId, addresses: buyerAddresses } = buyers[0]["buyer"]

    if (isArrayEmpty(beneficiaries)) {
        beneficiaries = [{
            idInsurance: "default_id", beneficiaryId: "default_val",
            addresses: [{ id: "default_val", customerId: "default_val" }]
        }]
    }
    if (isArrayEmpty(buyerAddresses)) {
        buyerAddresses = [{ id: "default_val", customerId: "default_val" }]
    }
    const { id: buyerAddressId, customerId: buyerAddressCustomerId } = buyerAddresses[0]

    const buyerObj = createBuyerObj(values)
    buyerObj["id"] = buyerId
    buyerObj["contractId"] = contractId
    buyerObj["addresses"][0]["id"] = buyerAddressId
    buyerObj["addresses"][0]["customerId"] = buyerAddressCustomerId

    let formBeneficiaries = createdBeneficiariesObj(values[KEY_ADDTIONAL_PEOPLE], values)
    for (let i = 0; i < formBeneficiaries.length; ++i) {
        formBeneficiaries[i]["contractId"] = contractId
        if (beneficiaries[i]) {
            formBeneficiaries[i]["id"] = beneficiaries[i]["beneficiaryId"]
            formBeneficiaries[i]["idInsurance"] = beneficiaries[i]["idInsurance"]

            const { address, addresses } = beneficiaries[i]
            const _addresses = addresses ? addresses : address
            formBeneficiaries[i]["addresses"][0]["id"] = _addresses[0]["id"]
            formBeneficiaries[i]["addresses"][0]["customerId"] = _addresses[0]["customerId"]
        }
    }
    return ([
        buyerObj,
        ...formBeneficiaries
    ])
}