import { FormattedMessage, HttpClient } from 'base-app'
import moment from 'moment'
import React from 'react'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { NAME_BUY_INSURANCES_HEALTH_CARE, getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import { BASE, KEY_INSURANCE_INFO } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import { hasRequestFail, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { updateInsurancePackages } from '../step2/utility'
import { KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_BANK, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_NO_BENEFICIARY, KEY_IC_TYPE, KEY_IC_TYPE_BENEFICIARY, KEY_NAME_BENEFICIARY, KEY_PHONE_NUMBER, KEY_RELATIONSHIP, KEY_STK, KEY_WARD } from './formikConfig'
export const API_CONTRACTS_HCAC = "nth/personalinsurance/api/health-care-advance"
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
export const RELATIONSHIP_ACE = 'ACR'
export const createContract = (data) => {
    return async (dispatch ) => {
        try {
            const res = await HttpClient.post(`${API_CONTRACTS_HCAC}`, data)
            if (res.status !== 200) return
            const insurances = res.data.insurances[0]
            dispatch(updateProps([
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
                },
                {
                    prop : KEY_INSURANCE_INFO , 
                    value : insurances
                }
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getDefault_createContractObj = (values , companyId) => {
    const {
        [KEY_ADDTIONAL_PEOPLE]: addtinalPeople,
        [KEY_IC_TYPE]: icType,
        [KEY_IC_NO]: icNo,
        [KEY_FULLNAME]: fullName,
        [KEY_DATE_BIRTH]: dateOfBirth,
        [KEY_PHONE_NUMBER]: phoneNumber,
        [KEY_EMAIL]: email,
        [KEY_GENDER]: gender,
        [KEY_CITY]: city,
        [KEY_DISTRICT]: district,
        [KEY_WARD]: ward,
        [KEY_ADDRESS]: address,
        [KEY_IC_TYPE_BENEFICIARY]: icTypeBeneficiary,
        [KEY_IC_NO_BENEFICIARY]: icnoBeneficiary,
        [KEY_NAME_BENEFICIARY]: nameBeneficiary,
    } = values
    const _beneficiaries = addtinalPeople.map((elt) => {
        return ({
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
            "address": elt[KEY_ADDRESS],
            "isBuyer": false,
            "insured": true,
            "bankName": "",
            "phoneNumber": elt[KEY_PHONE_NUMBER],
            "dateOfBirth": elt[KEY_DATE_BIRTH],
            "fullName": elt[KEY_FULLNAME],
            "icType": elt[KEY_IC_TYPE],
            "gender": elt[KEY_GENDER],
            "email": elt[KEY_EMAIL],
            "icNo": elt[KEY_IC_NO],
            "relationship" : elt[KEY_RELATIONSHIP],
            "companyId" : companyId
        })
    })

    return (
        [
            {
                "addresses": [
                    {
                        "city": city,
                        "detail": address,
                        "district": district,
                        "ward": ward,
                        "isDefault": true,
                        "type": "HOME"
                    }
                ],
                "icNo": icNo,
                "email": email,
                "icType": icType,
                "gender": gender,
                "fullName": fullName,
                "dateOfBirth": dateOfBirth,
                "phoneNumber": phoneNumber,
                "isBuyer": true,
                "issuedDate": "2018-04-06",
                "issuedPlace": "Ha Noi",
                "branchName": "Bach",
                "type": "BANK"
            },
            ..._beneficiaries,
            {
                "isBuyer": false,
                "insured": false,
                "fullName": nameBeneficiary,
                "icType": icTypeBeneficiary,
                "icNo": icnoBeneficiary,
                "addresses": [
                    {
                        "city": city,
                        "detail": address,
                        "district": district,
                        "ward": ward,
                        "isDefault": true,
                        "type": "HOME"
                    }
                ]
            }
        ]
    )
}

export const API_BENEFICIARIES = "/nth/personalinsurance/api/health-care-advance"
export const updateBeneficiaries = (contractId, data) => {
    return async (dispatch, getState) => {
        try {
            const res = await HttpClient.put(`${API_BENEFICIARIES}?contractId=${contractId}`, data)
            if (res.status !== 200) return
            const insurances = res.data.insurances[0]
            dispatch(updateProps([
                {
                    prop: BASE.KEY_ACTIVE_STEP,
                    value: 2
                },
                {
                    prop : BASE.KEY_CONTRACT_INFO,
                    value : res.data
                },
                {
                    prop : KEY_INSURANCE_INFO , 
                    value : insurances
                }
              
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateContract = async (contractId , duration) => {
    const res = await HttpClient.put(`${API_CONTRACTS_HCAC}?contractId=${contractId}` , duration)
    if (hasRequestFail(res.status)) return

    // dispatch(updateProps([
    //     {
    //         prop: BASE.KEY_ACTIVE_STEP,
    //         value: 2
    //     },
    // ]))

}

export const getDefault_updateBeneficiariesObj = (values, contractInfo , companyId) => {
    let { owner, beneficiaries } = contractInfo
    if (isObjEmpty(owner)) {
        owner = { "id": "", "addresses": [{ "id": "" }] }
    }
    if (isArrayEmpty(beneficiaries)) {
        beneficiaries = [{ "id": "", "addresses": [{ "id": "" }] }]
    }
    const arr = getDefault_createContractObj(values , companyId)
    return arr
}

export const _RELATIONSHIPS = [
    {
        label: <FormattedMessage id={getKeyLang(`father`)} />,
        content: RELATIONSHIP_FATHER,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`mother`)} />,
        content: RELATIONSHIP_MOTHER,
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`wife`)} />,
        content: RELATIONSHIP_WIFE,
        value:3,
    },
    {
        label: <FormattedMessage id={getKeyLang(`husband`)} />,
        content: RELATIONSHIP_HUSBAND,
        value: 4,
    },
    {
        label: <FormattedMessage id={getKeyLang(`child`)} />,
        content: RELATIONSHIP_CHILD,
        value: 5,
    },
    {
        label: <FormattedMessage id={getKeyLang(`siblings`)} />,
        content: RELATIONSHIP_ACE,
        value: 6,
    },
]
