import { history } from '../history'
import { BaseAppUltils } from 'base-app'
import moment from 'moment'
import {
  DATE_FORMAT, KEY_TOTAL_FEE, KEY_TOTAL_FEE_VAT,
  nullStrRegex, PAYMENT_TYPE_ATM, PAYMENT_TYPE_FUND_TRANSFER, PAYMENT_TYPE_QR_CODE,
  PAYMENT_TYPE_VISA_MASTER, TEXT_NO_VALUE
} from '../components/insurance-app/buy-insurances-page/formik-config'
import React, { useMemo } from 'react'
import { BaseAppConfigs } from 'base-app'
import { useSelector } from 'react-redux'
import {
  NAME_BUY_INSURANCES_PERSONAL_HOME, NAME_BUY_INSURANCES_VTA, INSURANCE_TYPE_HOME_SAFETY, INSURANCE_TYPE_MOTOR,
  INSURANCE_TYPE_PERSONAL_HOME, INSURANCE_TYPE_VTA, PATH_NTH_HOMEINSURANCE, PATH_NTH_PERSONALINSURANCE,
  NAME_BUY_INSURANCES_FAMILY_SAFETY, NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_MOTOR, PATH_NTH_VEHICLEINSURANCE, INSURANCE_TYPE_CAR, getDefault_buyInsurancesName, NAME_BUY_INSURANCES_MULTIPLE_HOME, NAME_BUY_INSURANCE_MOTORS, NAME_BUY_INSURANCES_CARS, NAME_BUY_INSURANCES_HEALTH_CARE, INSURANCE_TYPE_HEALTH_CARE, INSURANCE_TYPE_HEALTH_CARE_CONTRACT, INSURANCE_TYPE_TRAVEL, NAME_BUY_INSURANCES_TRAVEL, INSURANCE_TYPE_TRAVEL_GET_CONTRACT, NAME_BUY_INSURANCES_ANTIN, INSURANCE_TYPE_ANTIN_CONTRACT_CONFIRM, INSURANCE_TYPE_ANTIN_CONTRACT, INSURANCE_TYPE_TRAVEL_DS, NAME_BUY_INSURANCES_TRAVEL_DOMESTIC,
} from "../configs/insurance-app"
import Service from '../services/insurance-app/buyInsuranceMotor'
import * as carAction from '../redux/actions/insurance-app/buyInsurancesCar'
import * as familyAction from '../redux/actions/insurance-app/buyInsurancesFamilySafety'
import * as homeAction from '../redux/actions/insurance-app/buyInsurancesPersonalHome'
import * as vtaAction from '../redux/actions/insurance-app/buyInsurancesVta'
import * as motorAction from '../redux/actions/insurance-app/buyInsurancesMotor'
import * as motorsAction from '../redux/actions/insurance-app/buyInsurancesMotors'
import * as carsAction from '../redux/actions/insurance-app/buyInsurancesCars'
import * as multipleHomeAction from '../redux/actions/insurance-app/buyInsuranceMultiple'
import * as healthAction from '../redux/actions/insurance-app/buyInsurancesHealthCare'
import * as travelAction from '../redux/actions/insurance-app/buyInsurancesTravel'
import * as antinInsAction from '../redux/actions/insurance-app/buyInsurancesAntin'
import * as travelDomesticAction from '../redux/actions/insurance-app/buyInsurancesTravelDomestic'

import styled from 'styled-components'
import { _currenAvatar } from '../pages/elite-app/support/utility'
import { DATE_TIME_ZONE_FORMAT } from '../configs/elite-app'
export const TextBreakable = styled.div`
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
`
export const MAX_INIT_CAR_VALUE = 8000000000
export const NODE_ENV_TYPE_DEVELOPMENT = "development"
export const NODE_ENV_TYPE_PRODUCTION = "production"
export const API_DEV_URL = 'https://apidev.inon.vn'
export const API_SIT_URL = 'https://apisit.inon.vn'
export const API_PROD_URL = 'https://apisit.inon.vn'
export const APP_TYPE = 'web-develop-sit'

export class Utils {
  static removeSpecialCharNumberPlate(value) {
    return value ? value.replace(/[^a-zA-Z0-9.-]/g, '') : ''
  }

  static removeSpecialChar(value) {
    return value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '')
  }

  static getValueInRange(value, max) {
    if (!value) {
      return value
    }
    return +value >= max ? max : value
  }

  static numberFormat = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  static mapLabelToValueList = (list) => {
    return list.map(item => ({ ...item, value: item.label }))
  }
}

export function convertStrToNumber(potentialStr) {
  if (isValueEmpty(potentialStr)) {
    return 0
  }
  if (typeof potentialStr === 'string') {
    return Number(potentialStr.replace(/[^\d]/g, ''))
  }
  if (typeof potentialStr === 'number') {
    return potentialStr
  }
  return 4500000
}

export function isObject(item) {
  return (typeof item === 'object' && !Array.isArray(item) && item !== null)
}

export function isValueEmpty(potentialInput) {
  if (Array.isArray(potentialInput)) return true
  if (isObject(potentialInput)) return true
  const _potentialInput = potentialInput?.toString()
  if (!_potentialInput || _potentialInput.match(nullStrRegex)) {
    return true
  }
  return false
}

export function isValueNumber(potentialInput) {
  if (Array.isArray(potentialInput)) return false
  if (isObject(potentialInput)) return false
  if (isValueEmpty(potentialInput)) return false
  if (isNaN(potentialInput)) return false
  return true
}

export function isObjEmpty(obj) {
  if (!obj) return true
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export function isArrayEmpty(arr) {
  if (!arr) return true
  if (Array.isArray(arr) && arr.length > 0) {
    return false
  }
  return true
}

export function convertNumberToCurrency(num) {
  if (typeof num === 'number') {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return 0
}

export function intlConvertToVnd(numberVal, intl) {
  if (isNaN(numberVal)) { return 0 }
  return Intl.NumberFormat(
    intl.locale === 'vi' ? 'vn' : 'es'
  ).format(numberVal)
}

export function hasRequestFail(statusCode) {
  if (statusCode === 200 || statusCode === 201) {
    return false
  }
  return true
}
/**
 @example
 const [finalResult, timeStr, dateStr] = formatingISOStringDate(str)
 */
export function formatingISOStringDate(str) {
  if (isValueEmpty(str)) return TEXT_NO_VALUE
  const parts = str.slice(0, -1).split('T')
  const convertedTime = parts[1].replace(/(:\d\d)(?!(:\d\d)).*$/, "")
  return [`${convertedTime} ${parts[0]}`, convertedTime, parts[0]]
}

// startDate :"2021-09-13T18:07:00Z"
export function formatingDate(value) {
  return moment(value).format(DATE_FORMAT)
}

export function formatDateTime(value) {
  return moment(value, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss') + 'Z'
}

/**
 * @description There is no need for using toISOString() with this function
 */
export function convertDateTimeToReadble(date = '2021-8-12', time = '14:00') {
  let _date = moment(date).format(DATE_FORMAT)
  return formatDateTime(_date + ' ' + time)
}

export function sleepingFor(ms = 150) {
  let index = 0
  return new Promise((resolve, reject) => {
    try {
      clearTimeout(index)
      index = setTimeout(() => {
        resolve && resolve()
      }, ms)
    } catch (err) {
      reject && reject(err)
    }
  })
}


export function downloadFile(urlData, filename = 'untitled.png') {
  var a = document.createElement('a')
  a.href = urlData
  a.download = filename
  const uniqueId = 'a' + BaseAppUltils.generateUUID()
  a.id = uniqueId
  document.body.appendChild(a)
  a.click()
  document.querySelector(`#${uniqueId}`).remove()
}

export function removeAccents(str) {
  if (!str) return ''
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ', 'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ'
  ]
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
    var char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str.toLowerCase()
}

/**
 * filter.value : user input\
 * row[filter.id] : row's content
 * @description
 *  filter: {id: 'fullName', value: '4'}\
 *  row : \
 contractCode: undefined\
 fullName: "1 HTDT 4 tạo đối tác 5"\
 latestApprovalStatus: undefined\
 ...
 */
export function TreeTable_filterMethod_noAccents(filter, row) {
  if (filter.value.trim() === '') {
    return true
  }
  if (!isNaN(filter.value)) {
    const rg = new RegExp(filter.value)
    if (!row[filter.id]) {
      return false
    }
    return row[filter.id].toString().match(rg)
  }
  const filterLowerCase = filter.value.toLowerCase()
  const filterRegex = new RegExp(filterLowerCase.replace(/\s*/g, '.*?'))

  return (row[filter.id]).toLowerCase().match(filterRegex)
}

export function TreeTable_filterMethod(filter, row) {
  if (filter.value.trim() === '') {
    return true
  }
  if (!isNaN(filter.value)) {
    const rg = new RegExp(filter.value)
    if (!row[filter.id]) {
      return false
    }
    return row[filter.id].toString().match(rg)
  }
  const filterLowerCase = filter.value.toLowerCase()
  const filterRegex = new RegExp(filterLowerCase.replace(/\s*/g, '.*?'))
  return removeAccents(row[filter.id]).match(filterRegex)
}

export function getAddressesValue(addresses) {
  if (isArrayEmpty(addresses)) return TEXT_NO_VALUE
  const { city, detail, ward, district } = addresses[0]
  if (detail) {
    return city && `${detail} (${ward}, ${district}, ${city})` || detail || TEXT_NO_VALUE
  }
  return city && `${ward}, ${district}, ${city}` || TEXT_NO_VALUE
}

export function backHome() {
  history.push('/app/home')
}

export const useGetUserSignIn = () => {
  const tempUser = {
    id: "000",
    userSettings: { avatar: _currenAvatar },
    username: "temp-user",
    fullName: "Khách vãng lai",
    groupId: "TU.TU"
  }
  const { user: user_from_elite_page } = useSelector(state => state.auth.guest)
  const user = useSelector(state => state.auth.user)
  return user_from_elite_page || user || tempUser
}

export const useIsUserInOn = () => {
  const { groupId } = useGetUserSignIn()
  const inOnRegex = /^\S+?\.IO$/i
  return groupId.match(inOnRegex)
}

export function useCheckUserRole() {
  const { groupId } = useGetUserSignIn()
  const insurCompanyGroupUser = useMemo(() => {
    let group = []
    group.push(BaseAppConfigs.USER_ROLE.BH)
    return group
  }, [])
  const partnersGroupUser = useMemo(() => {
    let group = []
    group.push(BaseAppConfigs.USER_ROLE.DTL1)
    group.push(BaseAppConfigs.USER_ROLE.DTL2)
    group.push(BaseAppConfigs.USER_ROLE.DTL3)
    group.push(BaseAppConfigs.USER_ROLE.DTL4)
    group.push(BaseAppConfigs.USER_ROLE.DTL5)
    return group
  }, [])
  const adminGroupUser = useMemo(() => {
    let group = []
    group.push(BaseAppConfigs.USER_ROLE.ADMIN)
    return group
  }, [])
  const ktGroupUser = useMemo(() => {
    let group = []
    group.push(BaseAppConfigs.USER_ROLE.KT)
    return group
  }, [])
  return useMemo(() => (
    [
      groupId,
      adminGroupUser,
      ktGroupUser,
      partnersGroupUser,
      insurCompanyGroupUser
    ]
  ) // eslint-disable-next-line
    , [])
}

export function useIsCompanyUser() {
  const [groupId, a, b, c, insurCompanyGroupUser] = useCheckUserRole() // eslint-disable-line
  if (insurCompanyGroupUser.includes(groupId)) {
    return true
  }
  return false
}

export function useIsRootUser() {
  const [groupId, adminGroupUser, ktGroupUser] = useCheckUserRole()
  if (ktGroupUser.includes(groupId) || adminGroupUser.includes(groupId)) {
    return true
  }
  return false
}

export function useIsKT() {
  const [groupId, adminGroupUser, ktGroupUser] = useCheckUserRole() // eslint-disable-line
  if (ktGroupUser.includes(groupId)) {
    return true
  }
  return false
}

export function useIsAdmin() {
  const [groupId, adminGroupUser] = useCheckUserRole()
  if (adminGroupUser.includes(groupId)) {
    return true
  }
  return false
}

export function getDataFee(dataFees, companyId) {
  const found = dataFees.find(elt => elt.companyId === companyId)
  if (!found) {
    return ({
      [KEY_TOTAL_FEE_VAT]: 0,
      [KEY_TOTAL_FEE]: 0
    })
  }
  if (found[KEY_TOTAL_FEE]) {
    found[KEY_TOTAL_FEE_VAT] = found[KEY_TOTAL_FEE]
  } else if (found[KEY_TOTAL_FEE_VAT]) {
    found[KEY_TOTAL_FEE] = found[KEY_TOTAL_FEE_VAT]
  }
  return found
}
/**
 @example
  handleDebt(
      totalFee, debtAccountInfo,
      () => {
        dispatch(
          debtContract(contractId, PAYMENT_TYPE_DEBT)
        )
      },
      () => {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />)
      }
    )
 */
export function handleDebt(totalFee, debtAccountInfo, successCallback, failCallback) {
  const {
    currentDebt, totalDebt, currentDailyDebt, currentMonthlyDebt, transactionLimit, dailyLimit, monthlyLimit
  } = debtAccountInfo

  // let remnantDebt = Number(totalDebt - currentDebt)
  let remnantDebt = 0
  if (isNaN(remnantDebt)) {
    remnantDebt = 0
  }

  if (remnantDebt > 0 ||
    remnantDebt + currentMonthlyDebt + totalFee > monthlyLimit ||
    remnantDebt + currentDailyDebt + totalFee > dailyLimit ||
    totalFee > transactionLimit) {

    failCallback && failCallback()
    return
  }
  successCallback && successCallback()
}

export async function handleBonus(totalFee, successCallback, failCallback) {

  const res = await Service.checkEnoughBonusPointValue(totalFee)
  if (res.status !== 200 || !res.data) {
    failCallback && failCallback()
    return
  }
  successCallback && successCallback()
}

export function fillMultipleStepInfo(stepInfo, initialValues, setValues) {
  let _values = { ...initialValues }
  Object.keys(stepInfo).forEach((prop) => {
    if (stepInfo[prop] === undefined || stepInfo[prop] === null || stepInfo[prop] === '') {
      _values[prop] = initialValues[prop]
    } else {
      _values[prop] = stepInfo[prop]
    }
  })
  setValues(_values)
  return _values
}

export function getRightPaymentVATFee(paymentType, dataFeeElt) {
  if (!dataFeeElt || !paymentType)
    return 0
  const {
    paymentFeeATM, feeATM, ATMPayFee,
    paymentFeeQRCode, feeQR_CODE, QR_CODEPayFee,
    paymentFeeVISA, feeVISA_MASTER, VISA_MASTERPayFee,
    FUND_TRANSFERPayFee, feeFUND_TRANSFER,
  } = dataFeeElt

  switch (paymentType) {
    case PAYMENT_TYPE_ATM:
      return Number(paymentFeeATM || feeATM || ATMPayFee || 0)

    case PAYMENT_TYPE_QR_CODE:
      return Number(paymentFeeQRCode || feeQR_CODE || QR_CODEPayFee || 0)

    case PAYMENT_TYPE_VISA_MASTER:
      return Number(paymentFeeVISA || feeVISA_MASTER || VISA_MASTERPayFee || 0)

    case PAYMENT_TYPE_FUND_TRANSFER:
      return Number(FUND_TRANSFERPayFee || feeFUND_TRANSFER || 0)

    default:
      return 0
  }
}

export function getTotalFeeVAT(dataFeeElt, paymentType) {
  if (dataFeeElt) {
    const { totalFeeInsurance, feeInsurance } = dataFeeElt
    if (feeInsurance || totalFeeInsurance) {
      return getRightPaymentVATFee(paymentType, dataFeeElt) + Number(feeInsurance || totalFeeInsurance)
    }
  }
  return 0
}

export const getInsuranceBy = (insuranceType) => {
  switch (insuranceType) {
    case INSURANCE_TYPE_CAR:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_CAR)
    case INSURANCE_TYPE_HOME_SAFETY:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_FAMILY_SAFETY)
    case INSURANCE_TYPE_MOTOR:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_MOTOR)
    case INSURANCE_TYPE_PERSONAL_HOME:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_PERSONAL_HOME)
    case INSURANCE_TYPE_VTA:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_VTA)
    case INSURANCE_TYPE_HEALTH_CARE:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_HEALTH_CARE)
    case INSURANCE_TYPE_TRAVEL:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_TRAVEL)
    case INSURANCE_TYPE_ANTIN_CONTRACT:
      return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_ANTIN)
    case INSURANCE_TYPE_TRAVEL_DS:
        return getDefault_buyInsurancesName(NAME_BUY_INSURANCES_TRAVEL_DOMESTIC)
    default:
      return null
  }
}

export const getInsuranceType = (reduxName) => {
  switch (reduxName) {
    case NAME_BUY_INSURANCES_VTA:
      return INSURANCE_TYPE_VTA
    case NAME_BUY_INSURANCES_FAMILY_SAFETY:
      return INSURANCE_TYPE_HOME_SAFETY
    case NAME_BUY_INSURANCES_PERSONAL_HOME:
      return INSURANCE_TYPE_PERSONAL_HOME
    case NAME_BUY_INSURANCES_CAR:
      return INSURANCE_TYPE_CAR
    case NAME_BUY_INSURANCES_MOTOR:
      return INSURANCE_TYPE_MOTOR
    case NAME_BUY_INSURANCES_HEALTH_CARE:
        return INSURANCE_TYPE_HEALTH_CARE_CONTRACT
    case NAME_BUY_INSURANCES_TRAVEL:
        return INSURANCE_TYPE_TRAVEL_GET_CONTRACT
    case NAME_BUY_INSURANCES_ANTIN:
        return INSURANCE_TYPE_ANTIN_CONTRACT
    case NAME_BUY_INSURANCES_TRAVEL_DOMESTIC:
        return INSURANCE_TYPE_TRAVEL_DS
    default:
      return null
  }
}

export const getBasePath = (reduxName) => {
  switch (reduxName) {
    case NAME_BUY_INSURANCES_VTA:
      return PATH_NTH_PERSONALINSURANCE
    case NAME_BUY_INSURANCES_FAMILY_SAFETY:
      return PATH_NTH_PERSONALINSURANCE
    case NAME_BUY_INSURANCES_PERSONAL_HOME:
      return PATH_NTH_HOMEINSURANCE
    case NAME_BUY_INSURANCES_MULTIPLE_HOME:
      return PATH_NTH_HOMEINSURANCE
    case NAME_BUY_INSURANCES_CAR:
      return PATH_NTH_VEHICLEINSURANCE
    case NAME_BUY_INSURANCES_MOTOR:
      return PATH_NTH_VEHICLEINSURANCE
    case NAME_BUY_INSURANCE_MOTORS:
      return PATH_NTH_VEHICLEINSURANCE
    case NAME_BUY_INSURANCES_CARS:
      return PATH_NTH_VEHICLEINSURANCE
    case NAME_BUY_INSURANCES_HEALTH_CARE:
        return PATH_NTH_PERSONALINSURANCE
    case NAME_BUY_INSURANCES_TRAVEL:
        return PATH_NTH_PERSONALINSURANCE
    case NAME_BUY_INSURANCES_ANTIN:
        return PATH_NTH_PERSONALINSURANCE
    case NAME_BUY_INSURANCES_TRAVEL_DOMESTIC:
        return PATH_NTH_HOMEINSURANCE
    default:
      return null
  }
}

export const getAction = (reduxName) => {
  switch (reduxName) {
    case NAME_BUY_INSURANCES_VTA:
      return vtaAction
    case NAME_BUY_INSURANCES_FAMILY_SAFETY:
      return familyAction
    case NAME_BUY_INSURANCES_PERSONAL_HOME:
      return homeAction
    case NAME_BUY_INSURANCES_CAR:
      return carAction
    case NAME_BUY_INSURANCES_MOTOR:
      return motorAction
    case NAME_BUY_INSURANCE_MOTORS:
      return motorsAction
    case NAME_BUY_INSURANCES_CARS:
      return carsAction
    case NAME_BUY_INSURANCES_MULTIPLE_HOME:
      return multipleHomeAction
    case NAME_BUY_INSURANCES_HEALTH_CARE:
      return healthAction
    case NAME_BUY_INSURANCES_TRAVEL:
      return travelAction
    case NAME_BUY_INSURANCES_ANTIN:
      return antinInsAction
    case NAME_BUY_INSURANCES_TRAVEL_DOMESTIC:
      return travelDomesticAction
    default:
      return null
  }
}

/**
* @example
+ const {startValueDate, showTime} = updateInsuranceEffectiveDate()
+ */
export const updateInsuranceEffectiveDate = () => {
  const currentTime = new Date().getHours()
  let showTime = currentTime
  const date = new Date()
  if (currentTime > 0 && currentTime < 8) {
    date.setHours(12, 0, 0)
    showTime = 12
  } else if (currentTime >= 8 && currentTime < 12) {
    date.setHours(18, 0, 0)
    showTime = 18
  } else {
    date.setDate(date.getDate() + 1)
    date.setHours(12, 0, 0)
    showTime = 12
  }
  return ({
    startValueDate: new Date(date),
    showTime: showTime
  })
}

export const updateContractEffectiveDateToAPI = (insurances) => {
  return insurances.map((insurance) => {
    const startValueDate = moment(insurance.startValueDate).utc(false).format(
      DATE_TIME_ZONE_FORMAT
    )
    const endValueDate = moment(insurance.endValueDate).utc(false).format(
      DATE_TIME_ZONE_FORMAT
    )
    return { ...insurance, startValueDate, endValueDate }
  })
}

export const updateInsuranceEffectiveDateToDisplay = (insurances) => {
  return insurances.map((insurance) => {
    const currentTime = new Date().getHours()
    const date = new Date()
    if (currentTime > 0 && currentTime < 8) {
      date.setHours(12, 0, 0)
    } else if (currentTime >= 8 && currentTime < 12) {
      date.setHours(18, 0, 0)
    } else {
      date.setDate(date.getDate() + 1)
      date.setHours(12, 0, 0)
    }
    insurance.startValueDate = new Date(date)
    insurance.minStartValueDate = new Date(date)
    date.setMonth(date.getMonth() + insurance.duration)
    insurance.endValueDate = new Date(date)
    
    return insurance
  })
}

export function debounceFunc(func, timeout = 1000) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}



export let selectErrorStyles = {
  control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectNormalStyles = {
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectNormalStyleRemoveLeft = {
  control: (provided) => ({
      ...provided,
      // borderLeftStyle: "hidden",
      borderRadius: "0px 5px 5px 0px !important"
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectNormalStylesRemoveRight = {
  control: (provided) => ({
      ...provided,
      borderRadius: "5px 0px 0px 5px !important"
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      }
  }
}

export let selectErrorStyleRemoveRight = {
  control: (provided, state) => ({
      ...provided,
      borderRadius: "5px 0px 0px 5px !important",
      borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectErrorStylesRemoveLeft = {
  control: (provided, state) => ({
      ...provided,
      borderLeftStyle: "hidden",
      borderRadius: "0px 5px 5px 0px !important",
      borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}
