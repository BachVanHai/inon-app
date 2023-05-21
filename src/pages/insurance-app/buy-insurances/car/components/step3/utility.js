import { fillMultipleStepInfo as _fillMultipleStepInfo } from '../../../../../../ultity'
import {
    initialValues, KEY_ADDRESS, KEY_BENEFICIARY_BRANCH, KEY_BENEFICIARY_ADDRESS,
    KEY_BENEFIARRY_BANK_SELETECTED, KEY_CITY, KEY_DISTRICT, KEY_WARD
} from './formikConfig'

export const CUSTOMER_BANK = 'BANK'

export const fillMultipleStepInfo = (stepInfo, setValues) => {
    return _fillMultipleStepInfo(stepInfo, initialValues, setValues)
}

export const getDefault_ownerContactObj = (info) => {
    const { idType, idOwnerNum, issuedDate, idPlace, ownerName, dateOfBirth,
        ownerSex, ownerPhone, ownerEmail, custType, [KEY_CITY]: ownerCity,
        [KEY_DISTRICT]: ownerDistrict, [KEY_WARD]: ownerWard, [KEY_ADDRESS]: ownerAddr } = info

    return ({
        icType: idType,
        icNo: idOwnerNum,
        issuedDate: issuedDate ? issuedDate : null,
        issuedPlace: idPlace ? idPlace : null,
        fullName: ownerName,
        dateOfBirth: dateOfBirth ? dateOfBirth : null,
        gender: ownerSex ? ownerSex : null,
        phoneNumber: ownerPhone,
        email: ownerEmail,
        type: custType,
        addresses: [
            {
                type: "HOME",
                city: ownerCity ? ownerCity : null,
                district: ownerDistrict ? ownerDistrict : null,
                ward: ownerWard ? ownerWard : null,
                detail: ownerAddr ? ownerAddr : null
            }
        ]
    })
}

export const getDefault_updateOwnerContactObj = (idContact, info) => {
    const { idType, idOwnerNum, issuedDate, idPlace, ownerName, dateOfBirth,
        ownerSex, ownerPhone, ownerEmail, custType, [KEY_CITY]: ownerCity, [KEY_DISTRICT]: ownerDistrict,
        [KEY_WARD]: ownerWard, [KEY_ADDRESS]: ownerAddr } = info

    return ({
        id: idContact,
        icType: idType ? idType : null,
        icNo: idOwnerNum ? idOwnerNum : null,
        issuedDate: issuedDate ? issuedDate : null,
        issuedPlace: idPlace ? idPlace : null,
        fullName: ownerName ? ownerName : null,
        dateOfBirth: dateOfBirth ? dateOfBirth : null,
        gender: ownerSex ? ownerSex : null,
        phoneNumber: ownerPhone ? ownerPhone : null,
        email: ownerEmail ? ownerEmail : null,
        type: custType ? custType : null,
        addresses: [
            {
                type: "HOME",
                city: ownerCity ? ownerCity : null,
                district: ownerDistrict ? ownerDistrict : null,
                ward: ownerWard ? ownerWard : null,
                detail: ownerAddr ? ownerAddr : null
            }
        ]
    })
}

export const getDefault_alterBeneficiaryContactObj = (info) => {
    const { [KEY_BENEFIARRY_BANK_SELETECTED]: bankName,
        [KEY_BENEFICIARY_BRANCH]: banchName,
        [KEY_BENEFICIARY_ADDRESS]: bankAddr,
    } = info

    return ({
        fullName: bankName,
        branchName: banchName,
        address: bankAddr,
        type: CUSTOMER_BANK
    })
}


export const getDefault_updateAlterBeneficiaryContactObj = (info, idContactAlter) => {
    const obj = getDefault_alterBeneficiaryContactObj(info)
    obj["id"] = idContactAlter
    return obj
}
