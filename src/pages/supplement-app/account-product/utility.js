import { BaseAppUltils } from 'base-app'
import moment from 'moment'
import * as XLSX from 'xlsx'
export const EKYC = 'EKYC'
export const SHOP_NAME = 'SHOPNAME'
export const NICK_NAME = 'NICK_NAME'
export const FRAUD = 'FRAUD'
export const VERIFIED = 'VERIFIED'
export const PATH_MANAGMENT_PAGE = '/supplement/account-product/management'
export let DATE_FORMAT = 'YYYY-MM-DD'

export const REG_FILE_NAME = /[^.]+$/
export const convertISOtoDate = (date) => {
  return moment(date).utc(false).format('YYYY-MM-DD')
}
export const TEMPLATE_EXEL = {
  cifFccOpenDate: null,
  accFccNo: null,
  cifFcc: null,
  ebankPresenterCode: null,
  ebankCustomerName: null,
  kycLevelBank: null,
  ebankCheckInfo: null,
  ebankDescription: null,
  ebankAccType: null,
  month: null
}
export const FILTER_TYPE_ACCOUNT = [
  {
    type: 'eKYC',
    name: 'eKYC'
  },
  {
    type: 'Shopname',
    name: 'Shopname'
  },
  {
    type: 'Nickname',
    name: 'Nickname'
  }
]
export const FILTER_EBANK_CHECK_INFO = [
  {
    type: 'VERIFIED',
    name: 'VERIFIED'
  },
  {
    type: 'FRAUD',
    name: 'FRAUD'
  }
]
export const checkFormatFile = (file, format) => {
  const fileNameAfterDot = REG_FILE_NAME.exec(file.name)
  //if name file === "format" => return
  if (fileNameAfterDot[0] !== format) {
    return false
  } else {
    return true
  }
}
//check template file
export const handleCheckTemplateFileExel = (data) => {
  let isTemplate
  data.map((_elt) => {
    const _key = Object.keys(_elt)
    // if length key array === 10 => return true <==> return false
    if (_key.length === 10) {
      isTemplate = true
    } else {
      isTemplate = false
    }
  })
  return isTemplate
}
export const handleReadFileExel = (file, resolve, reject) => {
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload = (e) => {
    const bufferArray = e.target.result
    const wb = XLSX.read(bufferArray, {
      type: 'buffer',
      cellDates: true,
      blankCell: false
    })
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws, {
      raw: true,
      dateNF: 'YYYY-MM-DD'
      // defval: null
    })
    if (handleCheckTemplateFileExel(data)) {
      if (checkIstemplateExel(data)) {
        resolve(data)
      }else{
        BaseAppUltils.toastError(
          'Dữ liệu sai hoặc bị để trống , vui lòng kiểm tra lại dữ liệu !'
        )
      }
    } else {
      BaseAppUltils.toastError(
        'Dữ liệu không đúng định dạng , vui lòng chọn file khác !'
      )
      return
    }
  }
  fileReader.onerror = (error) => {
    reject(error)
  }
}
export const checkIstemplateExel = (data) => {
  let isTemplate
  for (let i = 0; i < data.length; i++) {
    const obj1Length = Object.keys(data[i]).length
    const obj2length = Object.keys(TEMPLATE_EXEL).length
    if (obj1Length === obj2length) {
      isTemplate = true
      continue;
    } else {
      isTemplate = false
      break;
    }
  }
  return isTemplate
}
