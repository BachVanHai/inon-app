import { HttpClient } from 'base-app'
import moment from 'moment'
import bshIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_BSH_1.svg'
import pviIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_PVI.svg'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesTravelDomestic'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { KEY_ADDONS } from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import { REDUX_STATE_NAME } from '../stepsManager'
import {
  KEY_INSURANCE_CODE,
  KEY_JOIN_GAME_NUMBER,
  KEY_PACKAGE_SELECTED,
  KEY_PERSON_INSURANCE_TYPE,
  OPTS1,
  OPTS2,
  OPTS3
} from './formikConfig'
export const API_INSURANCES_HCAC = '/nth/personalinsurance/api/insurances/hcac'
export const API_CONTRACTS_HCAC_FEE_INSURANCE_ =
  '/nth/personalinsurance/api/contracts/hcac-feeInsurance'
export const getBodyDateInsurance = (start, end) => {
  return {
    startValueDate: moment(start).toISOString(),
    endValueDate: moment(end).toISOString()
  }
}
export const API_UPDATE_ADDONS = 'nth/homeinsurance/api/insurance-add-on-travel'
export const API_UPDATE_INSURANCES = 'nth/homeinsurance/api/insurances-travel'
export const API_GET_FEE_INSURANCES =
  'nth/homeinsurance/api/authenticate/contracts-travel-fee'
export const actionFeeInsuranceAndUpdateInsurances = (
  contractId,
  values,
  addOns , 
  setFieldValue
) => {
  return async (dispatch, getState) => {
    const { contractInfo } = getState()['app'][REDUX_STATE_NAME]
    const _addOns = getObj_UpdateAddOns(values, addOns)
    const insurancesRes = await HttpClient.put(
      `${API_UPDATE_INSURANCES}?contractId=${contractId}`,
      getObj_UpdateInsurance(values, contractInfo.insurances[0].id, _addOns)
    )
    const addOnsRes = await HttpClient.put(
      `${API_UPDATE_ADDONS}?contractId=${contractId}`,
      _addOns
    )
    if (addOnsRes.status === 200 && insurancesRes.status === 200) {
      dispatch(
        updateProps([
          {
            prop: KEY_ADDONS,
            value: _addOns
          }
        ])
      )
      // after update insurance => get fee insurance
      const resFeeInsurances = await HttpClient.post(
        `${API_GET_FEE_INSURANCES}?contractId=${contractId}`,
        {
          id: contractId
        }
      )
      if (resFeeInsurances.status === 200) {
        const newData = resFeeInsurances.data.map((_elt) => {
          return {
            ..._elt,
            companyId: '06',
            logo: ARR_COMPANIES[1].image,
            totalFeeInsurance: _elt.totalFee,
            nameDetail: ARR_COMPANIES[1].nameDetail
          }
        })
        dispatch(
          updateProps([
            {
              prop: BASE.KEY_DATA_FEES,
              value: newData
            },
            {
              prop: BASE.KEY_TOTAL_FEE,
              value: newData[0].totalFee
            }
          ])
        )
      }
    }
  }
}
export const subStringMoney = (money, end) => {
  return money ? money.toString().slice(0, end) : 0
}

export const getDefault_updateCompanyIdContractObj = (
  contractInfo,
  companyId
) => {
  let _contractInfo = { ...contractInfo }
  delete _contractInfo['owner']
  delete _contractInfo['beneficiaries']
  delete _contractInfo['paymentType']
  delete _contractInfo['totalFeeInclVAT']
  _contractInfo['companyId'] = companyId
  return _contractInfo
}
export const ARR_COMPANIES = [
  {
    companyId: '01',
    id: '01',
    companyName: 'BSH',
    nameDetail: 'CompanyBSH',
    image: bshIcon
  },
  {
    companyId: '06',
    id: '06',
    companyName: 'PVI',
    nameDetail: 'BuyInsurance.Car.PVI',
    image: pviIcon
  }
]
export const enabledCompanies = ['06']
export const getObjUpdateInsurance = (
  insurId,
  packageName,
  startDate,
  endDate,
  duration
) => {
  return {
    id: insurId,
    packageName: packageName,
    startValueDate: startDate,
    endValueDate: endDate,
    duration: duration
  }
}

export const getObj_UpdateInsurance = (values, id, addOns) => {
  const {
    packageName,
    startValueDate,
    endValueDate,
    insuranceMoney,
    insuranceDeduction,
    duration,
    startPoint,
    endPoint,
    arrivePoint,
    personInsurnaceType,
    joinGame ,
    insuranceCode
  } = values
  return {
    id: id,
    duration: duration,
    startedDate: moment(startValueDate).utc(true).toISOString(),
    endDate: moment(endValueDate).utc(true).toISOString(),
    insuranceAddOns: addOns,
    unit: 'VND',
    isEnable: true,
    fromPoint: startPoint,
    toPoint: arrivePoint,
    endPoint: endPoint,
    isConvey: false,
    coverage: packageName,
    value: Number(insuranceMoney + '000000'),
    insuranceCode: insuranceCode,
    deduct: Number(insuranceDeduction/100),
    joinGame: joinGame === 0 || joinGame === '' ? 1  :joinGame
  }
}

export const PERSON_INSURANCE_OPTIONS = [
  {
    value: OPTS1,
    mgs: 'Không tham gia các môn thể thao mạo hiểm',
    subMgs: '(Không có phụ phí bảo hiểm)',
    detail: '',
    fieldName: KEY_PERSON_INSURANCE_TYPE
  },
  {
    value: OPTS2,
    mgs: 'Khảo sát thám hiểm',
    subMgs: '(Có có phụ phí bảo hiểm)',
    detail: '',
    fieldName: KEY_PERSON_INSURANCE_TYPE
  },
]
export const RANGE_INSURANCE_OPTIONS = [
  {
    value: 'BASIC',
    mgs: 'Phạm vi bảo hiểm cơ bản',
    detail: true,
    fieldName: KEY_PACKAGE_SELECTED,
    type: 'BASIC'
  },
  // {
  //   value: 'ADVANCE',
  //   mgs: 'Phạm vi bảo hiểm toàn diện (cơ bản+ bổ sung)',
  //   detail: true,
  //   subMgs:
  //     '*Phạm vi bảo hiểm toàn diện chỉ áp dụng khi Số tiền bảo hiểm từ 50 triệu đồng/người trở lên.',
  //   fieldName: KEY_PACKAGE_SELECTED,
  //   type: 'ADVANCE'
  // }
]
export const rangeAdvandceOption = {
  value: 'ADVANCE',
  mgs: 'Phạm vi bảo hiểm toàn diện (cơ bản+ bổ sung)',
  detail: true,
  subMgs:
    '*Phạm vi bảo hiểm toàn diện chỉ áp dụng khi Số tiền bảo hiểm từ 50 triệu đồng/người trở lên.',
  fieldName: KEY_PACKAGE_SELECTED,
  type: 'ADVANCE'
}
export const PACKAGE_INSURANCE = [
  {
    name: 'QUYỀN LỢI BẢO HIỂM CƠ BẢN',
    type: 'BASIC',
    leftHeader: 'Quyền lợi bảo hiểm',
    rightHeader: 'Số tiền bảo hiểm (STBH)/ người',
    contents: [
      {
        title: 'Phạm vi bảo hiểm cơ bản',
        content: `Số tiền bảo hiểm tối đa <span class="text-danger font-weight-bold"> 100 triệu đồng</span>`
      },
      {
        title: 'Tử vong do tai nạn',
        content: `Toàn bộ <span class="text-danger font-weight-bold">100% STBH</span>`
      },
      {
        title: 'Tử vong do ốm đau, bệnh tật (bao gồm dịch bệnh Covid-19)',
        content: `Chi trả <span class="text-danger font-weight-bold">50% STBH</span>`
      },
      {
        title: 'Thương tật do tai nạn',
        content: `Chi trả tiền bảo hiểm theo quy định tại Bảng tỷ lệ trả tiền bảo hiểm ban hành kèm theo Quyết định 05/TC-BH ngày 02/01/1993 của Bộ Tài chính`
      },
      {
        title: 'Hậu quả sau tai nạn',
        content: `Trong vòng 1 năm kể từ ngày xảy ra tai nạn, NĐBH bị chết hoặc vết thương trầm trọng hơn do hậu quả của tai nạn đó, Hãng bảo hiểm chi trả phần chênh lệch còn lại giữa STBH phải trả cho từng trường hợp này với số tiền đã trả trước đó.`
      },
      {
        title: 'Phí bảo hiểm',
        content: `<span class="text-danger font-weight-bold">0.015%STBH/ người/ngày</span>`
      },
      {
        title: 'Phụ phí bảo hiểm (nếu có)',
        content: `- trường hợp NĐBH khảo sát thám hiểm: <span class="text-danger font-weight-bold">0.1% STBH/người/ngày</span>
        `
      }
    ]
  },
  {
    name: 'QUYỀN LỢI BẢO HIỂM TOÀN DIỆN',
    type: 'ADVANCE',
    leftHeader: 'Quyền lợi bảo hiểm',
    rightHeader: 'Số tiền bảo hiểm (STBH)/ người',
    contents: [
      {
        title: 'Phạm vi bảo hiểm cơ bản',
        content: `Số tiền bảo hiểm tối đa <span class="text-danger font-weight-bold"> 100 triệu đồng</span>`
      },
      {
        title: 'Tử vong do tai nạn',
        content: `Toàn bộ <span class="text-danger font-weight-bold">100% STBH</span>`
      },
      {
        title: 'Tử vong do ốm đau, bệnh tật (bao gồm dịch bệnh Covid-19)',
        content: `Chi trả <span class="text-danger font-weight-bold">50% STBH</span>`
      },
      {
        title: 'Thương tật do tai nạn',
        content: `Chi trả tiền bảo hiểm theo quy định tại Bảng tỷ lệ trả tiền bảo hiểm ban hành kèm theo Quyết định 05/TC-BH ngày 02/01/1993 của Bộ Tài chính`
      },
      {
        title: 'Hậu quả sau tai nạn',
        content: `Trong vòng 1 năm kể từ ngày xảy ra tai nạn, NĐBH bị chết hoặc vết thương trầm trọng hơn do hậu quả của tai nạn đó, Hãng bảo hiểm chi trả phần chênh lệch còn lại giữa STBH phải trả cho từng trường hợp này với số tiền đã trả trước đó.`
      },
      {
        title: 'Phí bảo hiểm',
        content: `<span class="text-danger font-weight-bold">0.015%STBH/ người/ngày</span>`
      }
    ]
  },
  {
    type: 'ADVANCE_2',
    name : "",
    leftHeader: 'Quyền lợi bảo hiểm',
    rightHeader: 'Chuyến đi một chiều',
    rightHeader2: 'Chuyến đi khứ hồi',
    contents: [
      {
        title: 'Hủy chuyến đi',
        content: `Lên đến giá trị vé vận chuyển ban đầu 
        Tối đa <span class="text-danger font-weight-bold">30,000,000 vnđ</span>`,
        contentSecond: `Lên đến giá trị vé vận chuyển ban đầu
        Tối đa <span class="text-danger font-weight-bold">30,000,000 vnđ</span>`
      },
      {
        title: 'Rút ngắn chuyến đi',
        content: `Không áp dụng`,
        contentSecond: `Lên đến giá trị vé vận chuyển ban đầu
        Tối đa <span class="text-danger font-weight-bold"> 30,000,000 vnđ </span>`
      },
      {
        title: 'Nhận hành lý chậm',
        content: `Tối đa <span class="text-danger font-weight-bold">1,600,000 vnđ</span> (480,000 vnđ cho mỗi 8h liên tục đến chậm )`,
        contentSecond: `Tối đa <span class="text-danger font-weight-bold"> 1,600,000 vnđ </span> (480,000 vnđ cho mỗi 8h liên tục đến chậm )`
      },
      {
        title: 'Hành lý và vật dụng cá nhân mang theo',
        content: `Tối đa <span class="text-danger font-weight-bold">5,000,000 vnđ</span> (giới hạn cho mỗi món đồ là 2,500,000 vnđ)`,
        contentSecond: `Tối đa <span class="text-danger font-weight-bold">5,000,000</span> vnđ (giới hạn cho mỗi món đồ là 2,500,000 vnđ )`
      },
      {
        title: 'Mất giấy tờ tùy thân',
        content: `Tối đa <span class="text-danger font-weight-bold"> 5,000,000 vnđ </span>`,
        contentSecond: `Tối đa <span class="text-danger font-weight-bold"> 5,000,000 vnđ </span>`
      },
      {
        title: 'Chuyến đi bị trì hoãn',
        content: `Tối đa <span class="text-danger font-weight-bold"> 10,000,000 vnđ </span> (2,500,000 vnđ cho mỗi 12h liên tục bị trì hoãn)`,
        contentSecond: `Tối đa <span class="text-danger font-weight-bold"> 10,000,000 vnđ </span> (2,500,000 vnđ cho mỗi 12h liên tục bị trì hoãn)`
      },
      {
        title: 'Phí bảo hiểm',
        content: ` <span class="text-danger font-weight-bold">17,000 vnđ </span>/ người/ chuyến đi`,
        contentSecond: ` <span class="text-danger font-weight-bold"> 38,000 vnđ </span>/ người/ chuyến đi`
      }
    ]
  }
]
export const API_GET_CONTRACT =
  'nth/homeinsurance/api/insurance-add-on-travel-contract-id'
export const API_GET_CONTRACT_TRAVEL =
  'nth/homeinsurance/api/contracts-travel-id'
export const getAddOns_Contract = (contractId) => {
  return async (dispatch) => {
    const res = await HttpClient.get(
      `${API_GET_CONTRACT}/?contractId=${contractId}`
    )
    const resContract = await HttpClient.get(
      `${API_GET_CONTRACT_TRAVEL}/?contractId=${contractId}`
    )
    if (res.status === 200 && resContract.status === 200) {
      dispatch(
        updateProps([
          {
            prop: KEY_ADDONS,
            value: res.data
          },
          {
            prop: BASE.KEY_CONTRACT_INFO,
            value: resContract.data
          }
        ])
      )
    }
  }
}
export const getObj_UpdateAddOns = (values, addOns) => {
  return addOns.map((__addOns) => {
    switch (__addOns.addonCode) {
      case 'TDBS1':
        __addOns.isEnable =
          values[KEY_PERSON_INSURANCE_TYPE] === OPTS1 ? true : false
        return __addOns
      case 'TDBS2':
        __addOns.isEnable =
          values[KEY_PERSON_INSURANCE_TYPE] === OPTS2 ? true : false
        return __addOns
      case 'TDBS3':
        __addOns.isEnable =
          values[KEY_PERSON_INSURANCE_TYPE] === OPTS3 ? true : false
        return __addOns
    }
    return __addOns
  })
}

export const ADDITIONAL_INSURANCE_BENEFITS = [
  {
    value: 'ONEWAY',
    mgs: 'Chuyến đi 1 chiều',
    detail: true,
    fieldName: KEY_INSURANCE_CODE,
    type: 'ONEWAY'
  },
  {
    value: 'ROUND',
    mgs: 'Chuyến đi khứ hồi',
    detail: true,
    fieldName: KEY_INSURANCE_CODE,
    type: 'ROUND'
  },
]

