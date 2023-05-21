import { HttpClient } from 'base-app'
import moment from 'moment'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesGoods'
import {
  BASE,
  KEY_ADDONS
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesGoods'
export const API_READ_FILE_EXEL = 'nth/homeinsurance/api/export-beneficiaries'
export const API_CONTRACTS_TRAVEL_INSURANCE =
  'nth/homeinsurance/api/authenticate/contract-cargo-insurance'
export const API_CREATE_INSURANCES = 'nth/homeinsurance/api/travel-insurances'
export const API_GET_FEE_INSURANCES =
  'nth/homeinsurance/api/travel-insurances/fee-insurance'

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
            },
            {
              prop: KEY_ADDONS,
              value: resContract.data.insuranceAddOns
            }
          ])
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getDefault_createContractObj = (
  values,
  contractId,
  addOns,
  insurances,
  ownerId,
  beneficiariesId,
  transportationDTOSId,
  cdtyInfoDTOId
) => {
  const {
    fullname,
    phoneNumber,
    email,
    city,
    district,
    ward,
    detail,
    // hàng hoá
    goodsName,
    goodsAmount,
    goodsWeight,
    goodsValue,
    goodsProcudure,
    goodsType,
    // người thụ hưởng
    fullnameBeneficiary,
    emailBeneficiary,
    phoneNumberBeneficiary,
    citybeneficiary,
    districtBeneficiary,
    wardbeneficiary,
    addressBeneficiary,
    // phương tiện
    vehicels
  } = values
  const _vehicels = vehicels.map(
    ({
      vehicelType,
      vehicelName,
      vehicelNumberPlate,
      vehicelContractNo,
      vehicelContractNoDate,
      vehicelInvoiceNumber,
      vehicelInvoiceNumberDate
    }) => {
      return {
        contractId: transportationDTOSId ? contractId : undefined,
        id: transportationDTOSId,
        vehicleType: vehicelType,
        vehicleName: vehicelName,
        numberPlate: vehicelNumberPlate,
        contractCarriage: vehicelContractNo,
        contractCarriageDate: convertDateToISOstring(vehicelContractNoDate),
        shippingBill: vehicelInvoiceNumber,
        shippingBillDate: convertDateToISOstring(vehicelInvoiceNumberDate)
      }
    }
  )
  return {
    id: contractId ? contractId : undefined,
    owner: {
      id: ownerId,
      addresses: [
        {
          city: city,
          detail: detail,
          district: district,
          ward: ward,
          isDefault: true,
          type: 'HOME'
        }
      ],

      email: email,
      fullName: fullname,
      phoneNumber: phoneNumber
    },
    beneficiaries: [
      {
        addresses: [
          {
            city: citybeneficiary,
            detail: addressBeneficiary,
            district: districtBeneficiary,
            ward: wardbeneficiary,
            isDefault: true,
            type: 'HOME'
          }
        ],
        id: beneficiariesId ? beneficiariesId : undefined,
        email: emailBeneficiary,
        fullName: fullnameBeneficiary,
        phoneNumber: phoneNumberBeneficiary
      }
    ],
    cdtyInfoDTO: {
      contractId: cdtyInfoDTOId ? contractId : undefined,
      id: cdtyInfoDTOId ? cdtyInfoDTOId : undefined,
      packageType: goodsType,
      packageName: goodsName,
      numberOfPackage: Number(
        removeCommaBetweenStringAndConvertToNumber(goodsAmount)
      ),
      weightOfPackage: Number(
        removeCommaBetweenStringAndConvertToNumber(goodsWeight)
      ),
      packing: goodsProcudure,
      value: Number(removeCommaBetweenStringAndConvertToNumber(goodsValue))
    },
    transportationDTOS: _vehicels,
    insurances: insurances ? insurances : undefined,
    insuranceAddOns: addOns ? addOns : undefined
  }
}

export const API_BENEFICIARIES =
  'nth/homeinsurance/api/authenticate/contract-cargo-insurance-info'
export const updateBeneficiaries = (data) => {
  return async (dispatch, getState) => {
    const res = await HttpClient.put(`${API_BENEFICIARIES}`, data)
    if (res.status === 200) {
      dispatch(
        updateProps([
          {
            prop: BASE.KEY_ACTIVE_STEP,
            value: 2
          },
          {
            prop : BASE.KEY_CONTRACT_INFO , 
            value :res.data
          }
        ])
      )
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
  contractId,
  addOns,
  insurances,
  ownerId,
  beneficiariesId,
  transportationDTOSId,
  cdtyInfoDTOId
) => {
  const obj = getDefault_createContractObj(
    values,
    contractId,
    addOns,
    insurances,
    ownerId,
    beneficiariesId,
    transportationDTOSId,
    cdtyInfoDTOId
  )
  return obj
}
export const GOODS_TYPE_LIST = [
  {
    label: 'Hàng than, xi măng, clinker',
    value: '1'
  },
  {
    label:
      'Hàng xăng dầu, vật liệu nổ, kính tấm, thủy tinh, sành sứ, đồ sừng, ngà, sơn, mài, đồi mồi',
    value: '2'
  },
  {
    label:
      ' Hàng xá (hàng dạng hạt/bột, dạng lỏng chở bằng tàu/xe bồn chuyên dụng,thép, quặng, kim loại màu)',
    value: '3'
  },
  {
    label: 'Hàng siêu trường siêu trọng',
    value: '4'
  },
  {
    label: 'Các mặt hàng khác',
    value: '5'
  }
]
export const removeCommaBetweenStringAndConvertToNumber = (str) => {
  const isNumber = !isNaN(str);
  return isNumber ? str : Number(str.replaceAll(',', ''))
}
export const convertDateToISOstring = (date) => {
  return moment(date).toISOString()
}
