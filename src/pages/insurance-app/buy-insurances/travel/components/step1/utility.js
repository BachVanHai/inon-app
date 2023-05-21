import { HttpClient } from 'base-app'
import moment from 'moment'
import { DATE_FORMAT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import {
  KEY_ADDTIONAL_PEOPLE, KEY_CITY,
  KEY_DATE_BIRTH,
  KEY_DISTRICT,
  KEY_EMAIL,
  KEY_FULLNAME,
  KEY_GENDER,
  KEY_IC_NO, KEY_PHONE_NUMBER, KEY_WARD
} from './formikConfig'
export const API_READ_FILE_EXEL = 'nth/personalinsurance/api/export-beneficiaries' 
export const API_CONTRACTS_TRAVEL_INSURANCE =
  'nth/personalinsurance/api/travel-contracts'
export const API_CREATE_INSURANCES =
  'nth/personalinsurance/api/travel-insurances'
export const API_GET_FEE_INSURANCES =
  'nth/personalinsurance/api/travel-insurances/fee-insurance'

export const createContract = (data) => {
  return async (dispatch) => {
    try {
      // create contract
      const resContract = await HttpClient.post(
        API_CONTRACTS_TRAVEL_INSURANCE,
        data
      )
      if (resContract.status === 200) {
        dispatch(
          updateProps([
            {
              prop: BASE.KEY_ACTIVE_STEP,
              value: 2
            },
            {
              prop: BASE.KEY_CONTRACT_INFO,
              value: resContract.data
            },
            {
              prop: BASE.KEY_CONTRACT_CODE,
              value: resContract.data.contractCode
            },
            {
              prop: BASE.KEY_COMPANY_ID,
              value: resContract.data.companyId
            },
            {
              prop: BASE.KEY_CONTRACT_ID,
              value: resContract.data.id
            }
          ])
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getDefault_createContractObj = (values) => {
  const {
    [KEY_ADDTIONAL_PEOPLE]: addtinalPeople,
    [KEY_FULLNAME]: fullName,
    [KEY_PHONE_NUMBER]: phoneNumber,
    [KEY_EMAIL]: email,
    [KEY_CITY]: city,
    [KEY_DISTRICT]: district,
    [KEY_WARD]: ward
  } = values
  const _beneficiaries = addtinalPeople.map((elt) => {
    return {
      isBuyer: false,
      dateOfBirth: moment(elt[KEY_DATE_BIRTH]).utc(true).format(DATE_FORMAT),
      fullName: elt[KEY_FULLNAME],
      gender: elt[KEY_GENDER],
      icNo: elt[KEY_IC_NO]
    }
  })

  return [
    {
      addresses: [
        {
          city: city,
          detail: '',
          district: district,
          ward: ward,
          isDefault: true,
          type: 'HOME'
        }
      ],
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      isBuyer: true
    },
    ..._beneficiaries
  ]
}

export const API_BENEFICIARIES = 'nth/personalinsurance/api/travel-beneficiary'
export const updateBeneficiaries = (contractId, data) => {
  return async (dispatch, getState) => {
    try {
      const res = await HttpClient.put(
        `${API_BENEFICIARIES}?contractId=${contractId}`,
        data
      )
      if (res.status === 200) {
        dispatch(
          updateProps([
            {
              prop: BASE.KEY_ACTIVE_STEP,
              value: 2
            },
          ])
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateContract = async (contractId, duration) => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const getDefault_updateBeneficiariesObj = (
  values,
  contractInfo,
  companyId
) => {
  const arr = getDefault_createContractObj(values, companyId)
  return arr.map((_elt) => {
    return {
      ..._elt,
      id: contractInfo.ownerId
    }
  })
}
