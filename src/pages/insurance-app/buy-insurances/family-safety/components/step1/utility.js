import { KEY_ADDRESS } from "./formikConfig"

export const getDefault_customerObj = ({ [KEY_ADDRESS]: address, city, district, ward, email, fullName, icType, icNo, phoneNumber }) => {
    return ({
        "icNo": icNo,
        "email": email,
        "isBuyer": true,
        "address": address,
        "fullName": fullName,
        "icType": icType || "CMND",
        "phoneNumber": phoneNumber,
        "addresses": [
            {
                "city": city,
                "detail": address,
                "district": district,
                "ward": ward,
                "type": "HOME"
            }
        ],
        "dateOfBirth": "2021-06-23",
        "gender": "MALE",
        "type": "BANK",
        "branchName": "BRANCH_NAME_1",
    })
}

export const getDefault_updateCustomerObj = ({ [KEY_ADDRESS]: address, city, district, ward, email, fullName, icType, icNo, phoneNumber }) => {
    return ({
        "icNo": icNo,
        "email": email,
        "address": address,
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "icType": icType || "CMND",
        "addresses": [
            {
                "city": city || "",
                "detail": address || "",
                "district": district || "",
                "ward": ward || "",
                "type": "HOME"
            }
        ],
        "isBuyer": true,
        "gender": "MALE",
        "type": "BANK",
        "branchName": "BRANCH_NAME_1",
    })
}