import { HttpClient } from 'base-app'
import moment from 'moment'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { API_CREATE_CONTACT, NAME_BUY_INSURANCES_HEALTH_CARE } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesAntin'
import { BASE, KEY_STEP_2 } from '../../../../../../redux/reducers/insurance-app/buyInsurancesAntin'
import { hasRequestFail, isArrayEmpty } from '../../../../../../ultity'
import { KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_CITY, KEY_CREDIT_CONTRACT_NO, KEY_CREDIT_DURATION, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_LOAN, KEY_PHONE_NUMBER, KEY_WARD } from './formikConfig'
export const API_CONTRACTS_ANTIN = "nth/personalinsurance/api/contract-credit"
export const RELATIONSHIP_SELF = 'SELF'
export const RELATIONSHIP_GRANDFATHER = 'GRANDFATHER'
export const RELATIONSHIP_GRANDMOTHER = 'GRANDMOTHER'
export const RELATIONSHIP_FATHER = 'FATHER'
export const RELATIONSHIP_MOTHER = 'MOTHER'
export const RELATIONSHIP_WIFE = 'WIFE'
export const RELATIONSHIP_HUSBAND = 'HUSBAND'
export const RELATIONSHIP_CHILD = 'CHILD'
export const RELATIONSHIP_OLDERBROTHER = 'OLDERBROTHER'
export const RELATIONSHIP_OLDERSISTER = 'OLDERSISTER'
export const RELATIONSHIP_BROTHER = 'BROTHER'
export const RELATIONSHIP_SISTER = 'SISTER'
export const RELATIONSHIP_GRANDCHILDREN = 'GRANDCHILDREN'
export const RELATIONSHIP_OTHER = 'OTHER'
export const createContract = (data ,values , step_2) => {
    return async (dispatch ) => {
        try {
            const res = await HttpClient.post(`${API_CONTRACTS_ANTIN}`, data)
            if (hasRequestFail(res.status)) return
            let _step_2 = {...step_2}
            _step_2['creditContractNo'] = values?.addtinalPeople[0]?.creditContractNo
            _step_2['loan'] = values?.addtinalPeople[0]?.loan
            _step_2['creditDuration'] = values?.addtinalPeople[0]?.creditDuration
            dispatch(updateProps([
                {
                    prop : KEY_STEP_2 , 
                    value : _step_2
                },
                {
                    prop: BASE.KEY_CONTRACT_ID,
                    value: res.data.id
                },
                {
                    prop: BASE.KEY_CONTRACT_CODE,
                    value: res.data.contractCode
                },
                {
                    prop: BASE.KEY_PAYMENT_TYPE,
                    value: PAYMENT_TYPE_FUND_TRANSFER
                },
                {
                    prop: BASE.KEY_COMPANY_ID,
                    value: res.data.companyId
                },
                {
                    prop: BASE.KEY_CONTRACT_INFO,
                    value: res.data
                },
                {
                    prop : BASE.KEY_ACTIVE_STEP ,
                    value : 2
                }
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getDefault_createContractObj = (values) => {
    const {
        [KEY_ADDTIONAL_PEOPLE]: addtinalPeople,
    } = values
    const _beneficiaries = addtinalPeople.map((elt) => {
        return (
        {
                  "addresses": [
                {
                    "city": elt[KEY_CITY],
                    "detail": elt[KEY_ADDRESS],
                    "district": elt[KEY_DISTRICT],
                    "ward": elt[KEY_WARD],
                    "isDefault": true,
                    "type": "HOME",
                }
            ],
            "phoneNumber": elt[KEY_PHONE_NUMBER],
            "dateOfBirth":  elt[KEY_DATE_BIRTH],
            "fullName": elt[KEY_FULLNAME],
            "icType": elt[KEY_IC_TYPE],
            "gender": elt[KEY_GENDER],
            "email": elt[KEY_EMAIL],
            "icNo":  elt[KEY_IC_NO],
            "creditContractNo": elt[KEY_CREDIT_CONTRACT_NO],
            "loan": Number(elt[KEY_LOAN].replaceAll(',' , '')),
            "creditDuration": Number(elt[KEY_CREDIT_DURATION])
        }
        )
    })

    return _beneficiaries[0]
}
export const API_INSURANCE_CREDIT = "nth/personalinsurance/api/insurance-credit"
export const updateCreditContract = (contractId, contractData , insuranceDate ,values , step_2) => {
    return async (dispatch, getState) => {
        try {
            const contractRes = await HttpClient.put(`${API_CREATE_CONTACT}`, contractData)
            const insuranceRes = await HttpClient.put(`${API_INSURANCE_CREDIT}/${contractId}`, insuranceDate)
            if (contractRes.status === 200 && insuranceRes.status === 200) {
                let _step_2 = {...step_2}
                _step_2['creditContractNo'] = values?.addtinalPeople[0]?.creditContractNo
                _step_2['loan'] = values?.addtinalPeople[0]?.loan
                _step_2['creditDuration'] = values?.addtinalPeople[0]?.creditDuration
                // dispatch to redux 
                dispatch(
                    updateProps([
                        {
                            prop : KEY_STEP_2 , 
                            value : _step_2
                        },
                        {
                            prop : BASE.KEY_ACTIVE_STEP ,
                            value : 2
                        }
                    ])
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const API_BENEFICIARIES = "/nth/personalinsurance/api/beneficiaries-hcac"
export const updateBeneficiaries = (contractId, data) => {
    return async (dispatch, getState) => {
        try {
            const res = await HttpClient.put(`${API_BENEFICIARIES}?contractId=${contractId}`, data)
            if (hasRequestFail(res.status)) return
            if (isArrayEmpty(res.data)) return

            const { [BASE.KEY_CONTRACT_INFO]: contractInfo, } = getState()["app"][NAME_BUY_INSURANCES_HEALTH_CARE]

            contractInfo["owner"] = res.data[0]
            contractInfo["beneficiaries"] = res.data.slice(1)

            dispatch(updateProps([
                {
                    prop: BASE.KEY_ACTIVE_STEP,
                    value: 2
                },
                {
                    prop: BASE.KEY_CONTRACT_INFO,
                    value: contractInfo
                },
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getObject_insurances = (id ,values , step_2) => {
    const {addtinalPeople} = values
    return {
        "id": id,
        "description": "Bảo hiểm tín dụng",
        "isEnable": true,
        "liability" : Number(step_2?.responsibility.replaceAll(',' , '')) ,
        "duration": Number(step_2?.duration),
        "startValueDate":  moment(step_2?.dateInsuranceFrom).utc(true).toISOString() ,
        "endValueDate":  moment(step_2?.dateInsuranceTo).utc(true).toISOString(),
        "unit": "VND",
        "insuranceCode": "CS",
        "creditContractNo":addtinalPeople[0]?.creditContractNo,
        "loan": Number(addtinalPeople[0]?.loan.replaceAll(',' , '')),
        "creditDuration": Number(addtinalPeople[0]?.creditDuration),
    }
}


export const getDefault_updateOwnerContactObj = (idContact, info) => {
    const { icType, icNo, fullname, dateOfBirth,
        gender, phoneNumber, email, [KEY_CITY]: ownerCity, [KEY_DISTRICT]: ownerDistrict,
        [KEY_WARD]: ownerWard, [KEY_ADDRESS]: ownerAddr } = info?.addtinalPeople[0]
    return ({
        id: idContact,
        icType: icType ? icType : null,
        icNo: icNo ? icNo : null,
        issuedDate: null,
        issuedPlace: null,
        fullName: fullname ? fullname : null,
        dateOfBirth: dateOfBirth ? dateOfBirth : null,
        gender: gender ? gender : null,
        phoneNumber: phoneNumber ? phoneNumber : null,
        email: email ? email : null,
        type: null,
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