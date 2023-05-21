import React from 'react'
import { FormattedMessage, HttpClient } from 'base-app'
import { getKeyLang, NAME_BUY_INSURANCES_HEALTH_CARE } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { hasRequestFail, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { KEY_ACCOUNT_NUMBER, KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_BANK, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_GENDER, KEY_IC_NO, KEY_IC_TYPE, KEY_PHONE_NUMBER, KEY_RELATIONSHIP, KEY_STK, KEY_WARD } from './formikConfig'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import moment from 'moment'
import { updateInsurancePackages } from '../step2/utility'
import { REDUX_STATE_NAME } from '../stepsManager'
import { ACTION_SAVE_CONTRACT } from '../../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
export const API_CONTRACTS_HCAC = "nth/personalinsurance/api/contracts/hcac"
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
export const createContract = (data) => {
    return async (dispatch ) => {
        try {
            const res = await HttpClient.post(`${API_CONTRACTS_HCAC}`, data)
            if (hasRequestFail(res.status)) return
            const startDate = moment().utc(true).format("YYYY-MM-DD H:mm:ss")
            const enDate = moment().utc(true).add(1,'y').format("YYYY-MM-DD H:mm:ss")
            dispatch(
                updateInsurancePackages(
                    res.data.id,
                    { "packageName": "GOI3","duration": 12 , "startValueDate": moment(startDate).toISOString() , "endValueDate" :  moment(enDate).toISOString()  }
                )
            )
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
    } = values
    // console.log(_beneficiaries[0]);
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
            "bankName": elt[KEY_BANK],
            "accountNumber":  elt[KEY_STK] ,
            "phoneNumber": elt[KEY_PHONE_NUMBER],
            "dateOfBirth": elt[KEY_DATE_BIRTH],
            "fullName": elt[KEY_FULLNAME],
            "icType": elt[KEY_IC_TYPE],
            "gender": elt[KEY_GENDER],
            "email": elt[KEY_EMAIL],
            "icNo": elt[KEY_IC_NO],
            "cardNumber" : elt[KEY_STK],
            "relationship" : RELATIONSHIP_SELF,
            "duration": 12,
            "issuedPlace": "Ha Noi",
            "issuedDate": "2018-04-06",
            "branchName": "Nguyen",
            "type": "BANK",
            "companyId" : companyId
        })
    })

    return ([
        // {
        //     "addresses": [
        //         {
        //             "city": _beneficiaries[0].addresses[0].city,
        //             "detail": _beneficiaries[0].addresses[0].detail,
        //             "district": _beneficiaries[0].addresses[0].district,
        //             "ward": _beneficiaries[0].addresses[0].ward,
        //             "isDefault": true,
        //             "type": "HOME",
        //         }
        //     ],
        //     "icNo": _beneficiaries[0][KEY_IC_NO],
        //     "email":  _beneficiaries[0][KEY_EMAIL],
        //     "icType":  _beneficiaries[0][KEY_IC_TYPE],
        //     "gender":  _beneficiaries[0][KEY_GENDER],
        //     "fullName":  _beneficiaries[0].fullName,
        //     "dateOfBirth":  _beneficiaries[0][KEY_DATE_BIRTH],
        //     "phoneNumber":  _beneficiaries[0][KEY_PHONE_NUMBER],
        //     "accountNumber": "123456789" ,
        //     // "cardNumber" : _beneficiaries[0][KEY_ACCOUNT_NUMBER],
        //     "duration": 12,
        //     "isBuyer": true,
        //     "issuedDate": "2018-04-06",
        //     "issuedPlace": "Ha Noi",
        //     "accountNumber": "123456789",
        //     "branchName": "Nguyen",
        //     "bankName": 'TPBANK',
        //     "type": "BANK",
        // },
        ..._beneficiaries
    ])
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
    return arr.map((elt, index) => {
        if (index === 0) {
            elt["id"] = owner.id
            elt["addresses"][0]["customerId"] = owner.id
            elt["addresses"][0]["id"] = owner.addresses[0].id
        } else {
            if (index - 1 < beneficiaries.length) {
                elt["id"] = beneficiaries[index - 1].id
                elt["addresses"][0]["customerId"] = beneficiaries[index - 1].id
                elt["addresses"][0]["id"] = beneficiaries[index - 1].addresses[0].id
            }
        }
        return elt
    })
}

export const relationships = [
    {
        label: <FormattedMessage id={getKeyLang(`myself`)} />,
        content: RELATIONSHIP_SELF,
        value: 0,
    },
    {
        label: <FormattedMessage id={getKeyLang(`grandFather`)} />,
        content: RELATIONSHIP_GRANDFATHER,
        value: 1,
    },
    {
        label: <FormattedMessage id={getKeyLang(`grandMother`)} />,
        content: RELATIONSHIP_GRANDMOTHER,
        value: 2,
    },
    {
        label: <FormattedMessage id={getKeyLang(`father`)} />,
        content: RELATIONSHIP_FATHER,
        value: 3,
    },
    {
        label: <FormattedMessage id={getKeyLang(`mother`)} />,
        content: RELATIONSHIP_MOTHER,
        value: 4,
    },
    {
        label: <FormattedMessage id={getKeyLang(`wife`)} />,
        content: RELATIONSHIP_WIFE,
        value: 5,
    },
    {
        label: <FormattedMessage id={getKeyLang(`husband`)} />,
        content: RELATIONSHIP_HUSBAND,
        value: 6,
    },
    {
        label: <FormattedMessage id={getKeyLang(`child`)} />,
        content: RELATIONSHIP_CHILD,
        value: 7,
    },
    {
        label: <FormattedMessage id={getKeyLang(`olderBrother`)} />,
        content: RELATIONSHIP_OLDERBROTHER,
        value: 8,
    },
    {
        label: <FormattedMessage id={getKeyLang(`olderSister`)} />,
        content: RELATIONSHIP_OLDERSISTER,
        value: 9,
    },
    {
        label: <FormattedMessage id={getKeyLang(`brother`)} />,
        content: RELATIONSHIP_BROTHER,
        value: 10,
    },
    {
        label: <FormattedMessage id={getKeyLang(`sister`)} />,
        content: RELATIONSHIP_SISTER,
        value: 11,
    },
    {
        label: <FormattedMessage id={getKeyLang(`grandChildren`)} />,
        content: RELATIONSHIP_GRANDCHILDREN,
        value: 12,
    },
    {
        label: <FormattedMessage id={getKeyLang(`Other`)} />,
        content: RELATIONSHIP_OTHER,
        value: 13,
    },
]
