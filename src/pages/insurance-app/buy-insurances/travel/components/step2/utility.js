import { FormattedMessage, HttpClient } from 'base-app'
import moment from 'moment'
import React from 'react'
import { BASE, KEY_INSURANCES_ID } from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import bshIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_BSH_1.svg'
import pviIcon from '../../../../../../assets/images/insurance-app/buy-insurance/Logo_PVI.svg'
import * as getKeyLangInsuranceApp from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import { KEY_HAS_CAL_FEE_DONE } from '../../../../../../redux/reducers/insurance-app/utility'
import { API_CREATE_INSURANCES, API_GET_FEE_INSURANCES } from '../step1/utility'
export const API_INSURANCES_HCAC = '/nth/personalinsurance/api/insurances/hcac'
export const API_CONTRACTS_HCAC_FEE_INSURANCE_ =
  '/nth/personalinsurance/api/contracts/hcac-feeInsurance'

/** 
 * @example
 *  data = {
      "packageName": "GOI3",
      "duration": 12
    } 
*/
export const getBodyDateInsurance = (start, end) => {
  return {
    startValueDate: moment(start).toISOString(),
    endValueDate: moment(end).toISOString()
  }
}


export const actionFeeInsuranceAndUpdateInsurances = (contractId , values) => {
  return async (dispatch , getState) => {
    const { [KEY_INSURANCES_ID]: insuranceId, } = getState()["app"][getKeyLangInsuranceApp.NAME_BUY_INSURANCES_TRAVEL]
    // if insurance created => update inusurance <===> create insurances
    if (insuranceId) {
      await HttpClient.put(`${API_CREATE_INSURANCES}`, getObj_UpdateInsurance(values , insuranceId))
    }else{
      const resCreateInsurances = await HttpClient.post(`${API_CREATE_INSURANCES}/${contractId}`, getObj_UpdateInsurance(values))
      if (resCreateInsurances.status === 200) {
        dispatch(
          updateProps([
            {
              prop : KEY_INSURANCES_ID , 
              value: resCreateInsurances.data.id
            }
          ])
        )
      }
    }
    // after create or update insurance => get fee insurance
    const resFeeInsurances = await HttpClient.get(
      `${API_GET_FEE_INSURANCES}?contractId=${contractId}`
    )
    if (resFeeInsurances.status === 200) {
      const newData = resFeeInsurances.data
      .filter((_elt) => enabledCompanies.includes(_elt.companyId))
      .map((item) => {
        const iconCompany = ARR_COMPANIES.find(
          (_elt) => _elt.companyId.toString() === item.companyId.toString()
        )
        return {
          ...item,
          logo: iconCompany !== undefined ? iconCompany.image : '', 
          totalFeeInsurance : item.feeInsurances.totalFeeInsurance,
          nameDetail : iconCompany.nameDetail
        }
      })
      dispatch(
        updateProps([
          {
            prop: BASE.KEY_DATA_FEES,
            value: newData
          }
        ])
      )
    }
  
  }
}
export const actionUpdateCompanyId = (contractId , values , companyId) => {

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
export const enabledCompanies = ['01', '06']
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
export const INSURANCE_MONEY_ARR_BASIC =  [
  {
    label: '100,000,000 vnđ',
    value: 100000000
  },
  {
    label: '200,000,000 vnđ',
    value: 200000000
  },
  {
    label: '300,000,000 vnđ',
    value: 300000000
  },
  {
    label: '400,000,000 vnđ',
    value: 400000000
  },
  {
    label: '500,000,000 vnđ',
    value: 500000000
  },
  {
    label: '600,000,000 vnđ',
    value: 600000000
  },
  {
    label: '700,000,000 vnđ',
    value: 700000000
  },
  {
    label: '800,000,000 vnđ',
    value: 800000000
  },
  {
    label: '900,000,000 vnđ',
    value: 900000000
  },
  {
    label: '1,000,000,000 vnđ',
    value: 1000000000
  }
]
export const INSURANCE_MONEY_ARR = [
  {
    label: '250,000,000 vnđ',
    value: 250000000
  },
  {
    label: '500,000,000 vnđ',
    value: 500000000
  },
  {
    label: '700,000,000 vnđ',
    value: 700000000
  },
  {
    label: '1,000,000,000 vnđ',
    value: 1000000000
  }
]

export const PACKAGES_INSURANCES = [
  {
    name: 'BASIC',
    outsideTheCard: [
      'Tử vong (bao gồm Covid-19): 100% STBH',
      'Thương tật do tai nạn: Mức chi trả theo BTLTTTT',
      'Điều trị nội trú do ốm bệnh(bao gồm Covid-19) : tối đa 15% STBH',
      'Điều trị ngoại trú do ốm bệnh (bao gồm Covid-19): tối đa 10% STBH',
      'Chi phí hồi hương: tối đa 100% STBH'
    ],
    //when click to button
    tienBHQL1:
      'Tử vong do mọi nguyên nhân (bao gồm dịch bệnh Covid): toàn bộ số tiền bảo hiểm ( 100 % STBH)',
    tienBHQL2:
      'Thương tật do tai nạn:  tối đa ko quá mức chi trả theo Bảng tỉ lệ trả tiền bảo hiểm thương tật',
    tienBHQL3:
      'Điều trị nội trú do ốm bệnh (bao gồm dịch bệnh Covid ) :chi phí thực tế và trợ cấp, tối đa 15% STBH',
    tienBHQL4:
      'Điều trị ngoại trú do ốm bệnh (bao gồm dịch bệnh Covid) :chi phí thực tế, tối đa 10% STBH',
    tienBHQL5: 'Chi phí hồi hương:  chi phí thực tế, tối đa 100% STBH',
    tienBHQL6:
      'Hành lý và vật dụng riêng bị mất, thiệt hại: Giới hạn 20% STBH quyền lợi về hành lý đối với mỗi khoản mục',
    tienBHQL7: 'Áp dụng với tổn thất về hành lý là  200,000 VNĐ/vụ'
  },
  {
    name: 'ADVANCE',
    outsideTheCard: [
      'Tử vong (bao gồm Covid-19): 100% STBH',
      'Thương tật do tai nạn: Mức chi trả theo BTLTTTT',
      'Điều trị nội trú do ốm bệnh(bao gồm Covid-19) :tối đa 100% STBH',
      'Điều trị ngoại trú do ốm bệnh (bao gồm Covid-19): tối đa 10% STBH',
      'Chi phí hồi hương: tối đa 100% STBH'
    ],
    //when click to button
    tienBHQL1:
      'Tử vong do mọi nguyên nhân (bao gồm dịch bệnh Covid): toàn bộ số tiền bảo hiểm ( 100 % STBH)',
    tienBHQL2:
      'Thương tật do tai nạn:  tối đa ko quá mức chi trả theo Bảng tỉ lệ trả tiền bảo hiểm thương tật',
    tienBHQL3:
      'Điều trị nội trú do ốm bệnh (bao gồm dịch bệnh Covid ) :chi phí thực tế và trợ cấp, tối đa 100% STBH',
    tienBHQL4:
      'Điều trị ngoại trú do ốm bệnh (bao gồm dịch bệnh Covid) :chi phí thực tế, tối đa 10% STBH',
    tienBHQL5: 'Chi phí hồi hương:  chi phí thực tế, tối đa 100% STBH',
    tienBHQL6:
      'Hành lý và vật dụng riêng bị mất, thiệt hại: Giới hạn 20% STBH quyền lợi về hành lý đối với mỗi khoản mục',
    tienBHQL7:
      'Mức miễn thường không khấu trừ:Áp dụng với tổn thất về hành lý là  200,000 VNĐ/vụ'
  }
]
export const getObj_UpdateInsurance = (values , id) => {
  const {
    packageName,
    startValueDate,
    endValueDate,
    insuranceMoney,
    insuranceDeduction , 
    duration
  } = values
  return {
    id : id ? id : undefined,
    packageName: packageName,
    duration: duration,
    startValueDate: moment(startValueDate).utc(true).toISOString(),
    endValueDate: moment(endValueDate).utc(true).toISOString() ,
    insuranceMoney: insuranceMoney,
    reduce: Number(insuranceDeduction)
  }
}

