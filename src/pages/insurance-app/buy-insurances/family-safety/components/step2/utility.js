import moment from 'moment'
import { RELATIONSHIP_SELF } from './formikConfig'

export const getDefault_createBeneficiarieGroupInfo = ({ contractId, addtionalPeople }) => {
    return addtionalPeople.map((elt) => {
        const { icType, icNo, dateOfBirth, fullName, gender, phoneNumber, email, relationship } = elt
        let obj = {}
        if (email) {
            obj.email = email
        }
        if (phoneNumber) {
            obj.phoneNumber = phoneNumber
        }
        return ({
            "icNo": icNo,
            "icType": icType,
            "gender": gender,
            "fullName": fullName,
            "contractId": contractId,
            "dateOfBirth": moment(dateOfBirth).utc(true).toISOString(),
            "relationship": relationship || RELATIONSHIP_SELF,
            "isBuyer": false,
            "type": "BANK",
            ...obj
        })
    })
}

export const getDefault_updateBeneficiarieGroupInfo = ({ ids, contractId, addtionalPeople }) => {
    return addtionalPeople.map((elt, index) => {
        const { icType, icNo, dateOfBirth, fullName, email, phoneNumber, gender, relationship } = elt
        let obj = {}
        if (email) {
            obj.email = email
        }
        if (phoneNumber) {
            obj.phoneNumber = phoneNumber
        }
        return ({
            "icNo": icNo,
            "id": ids[index],
            "gender": gender,
            "icType": icType,
            "fullName": fullName,
            "contractId": contractId,
            "dateOfBirth": moment(dateOfBirth).utc(true).toISOString(),
            "relationship": relationship || RELATIONSHIP_SELF,
            "isBuyer": false,
            "type": "BANK",
            ...obj
        })
    })
}