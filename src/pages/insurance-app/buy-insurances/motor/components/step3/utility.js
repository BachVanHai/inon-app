import { KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER, KEY_PHONE_NUMBER, KEY_EMAIL, KEY_ADDRESS, KEY_CITY, KEY_DISTRICT, KEY_WARD } from "./formikConfig"

export const getDefault_createContactObj = (values) => {
    return ({
        "icType": values[KEY_IC_TYPE],
        "icNo": values[KEY_IC_NO],
        "fullName": values[KEY_FULLNAME],
        "dateOfBirth": values[KEY_DATE_BIRTH],
        "gender": values[KEY_GENDER],
        "phoneNumber": values[KEY_PHONE_NUMBER],
        "email": values[KEY_EMAIL],
        "address": values[KEY_ADDRESS],
        "type": "INV",
        "addresses": [
            {
                "type": "HOME",
                "city": values[KEY_CITY],
                "district": values[KEY_DISTRICT],
                "ward": values[KEY_WARD],
                "detail": values[KEY_ADDRESS]
            }
        ]
    })
}

export const getDefault_updateContractObj = (contractId) => {
    return ({
        "id": contractId,
        "ownerId": null // fill this latter when createContact
    })
}