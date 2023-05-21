import { AppId } from 'base-app'

export const API_GET_INSURANCE_LIST_BY_COMPANY =
  '/nth/user/api/insurance-list-by-insurance-company'

export const API_GET_BONUS_BY_TYPE = '/nth/bonusmanager/api/bonuses-by-type'
export const API_GET_BONUS_BY_PARTNER = '/nth/bonusmanager/api/bonuses-by-partner'
export const API_GET_BONUS_DRAFT_SETTINGS = '/nth/bonusmanager/api/bonus-draft-settings'
export const API_BONUSES = '/nth/bonusmanager/api/bonuses'
export const API_BONUSES_APPROVAL = '/nth/bonusmanager/api/bonuses-approval'
export const API_BONUSES_HISTORY = '/nth/bonusmanager/api/bonus-transactions'
export const API_EXPORT_BONUS_HISTORY = '/nth/bonusmanager/api/bonus-transactions/export'
export const API_UPDATE_BONUS_HISTORY_PAID = '/nth/bonusmanager/api/bonus-transaction-paid'
export const API_USERS = '/nth/user/api/users'
export const API_PARENT_USER = '/nth/user/api/users'
export const API_USER_INSURANCE_SETTINGS = '/nth/user/api/user-insurance-settings'
export const API_GET_CONTRACT = '/nth/vehicleinsurance/api/contracts'
/**
 * DEBT
 */
export const API_CONTRACT_MANAGER_DEBT_CONTRACTS = '/api/contract-manager/debt-contracts'
export const API_GET_LIST_DEBT_CONTRACT = '/nth/vehicleinsurance/api/contract-manager/debt-contracts'
export const API_GET_LIST_ALL_DEBT_ACCOUNT = '/nth/account/api/account-manager/all'
export const API_GET_LIST_ALL_PARTNERS_DEBT_ACCOUNT = '/nth/account/api/account-manager/partners'
export const API_CREATE_DEBT_ACCOUNT = '/nth/account/api/create-account'
export const API_GET_LIST_ACCOUNTS_PENDING = '/nth/account/api/pending-accounts'
export const API_APPROVAL_ACCOUNT = '/nth/account/api/approval-account'
export const API_EDIT_ACOUNT = '/nth/account/api/edit-account'
export const API_DELETE_DEBT_CONTRACT = '/nth/account/api/account-manager/delete'
export const API_DELETE_DRAFT_DEBT_CONTRACT = '/nth/account/api/account-manager/delete-draft'
export const API_MY_DEBT_ACCOUNT = '/nth/account/api/account-manager/my-account'
export const API_CONFIRM_BANK_TRANS = '/nth/account/api/account-manager/confirm-trans'

export const API_GET_ALL_TYPE_NOTIFICATION = "/nth/notification/api/notification-types"
export const API_GET_ALL_NOTIFICATION_REJECTED = "/nth/notification/api/notification-status"
export const API_GET_ALL_NOTIFICATION = "/nth/notification/api/notification-template-allStatus"
export const API_APPROVAL_NOTIFICATION = "/nth/notification/api/notifications/approve"
export const API_CREATE_NOTIFICATION = "/nth/notification/api/notification-template?name=admin&status=NEW"
export const API_EDIT_NOTIFICATION = "/nth/notification/api/notification-template"
export const API_DELETE_NOTIFICATION = "/nth/notification/api/notification-template"
export const API_INFO_NOTIFICATION = "/nth/notification/api/notification-template"
export const API_SAVE_DRAFT_NOTIFICATION = "/nth/notification/api/notification-template?name=admin&status=DRAFT"
export const API_USER_GROUP_AUTHENTICATE = "/nth/accesscontrol/api/user-groups"

// ======================EVOUCHER====================

export const API_GET_ALL_EVOUCHER = "/nth/promotion/api/promotion-configs"
export const API_GET_INFO_EVOUCHER = "/nth/promotion/api/promotion-configs"
export const API_CREATE_EVOUCHER = "/nth/promotion/api/promotion-configs"
export const API_UPDATE_EVOUCHER = "/nth/promotion/api/promotion-configs"
export const API_ACTIVED_EVOUCHER = "/nth/promotion/api/promotion-configs/approval"
export const API_FINISH_EVOUCHER = "/nth/promotion/api/promotion-configs/finish"
export const API_REJECT_EVOUCHER = "/nth/promotion/api/promotion-configs/reject"
export const API_GET_ALL_COMPANY_EVOUCHER = "/nth/promotion/api/insurance/companies"
export const API_GET_ALL_INSURANCE_COMPANIES = "/nth/promotion/api/insurance-companies"
export const API_GET_ALL_PRODUCT_EVOUCHER = "/nth/promotion/api/category-insurances"
export const API_GET_INSURANCE_CONFIG_TEMPLATE = "/nth/promotion/api/insurance-config-templates/templates"
export const API_DOWNLOAD_PROMOTION = "/nth/promotion/api/promotion/vouchers/excel"
export const API_CREATE_TEST = "/nth/promotion/api/promotion-configs"
export const API_DELETE_PROMOTION = "/nth/promotion/api/promotion-configs"


// ===================== ACCOUNT PRODUCTS ==================
export const API_ACCOUNT_PRODUCTS = '/nth/dashboard/api/bank-accounts'
// export const API_GET_ACCOUNT_TPBANK = '/bank-accounts'

export const BONUS_TYPE = {
  SYSTEM: 'SYSTEM',
  PERSONAL: 'PERSONAL',
  CUSTOMER: 'CUSTOMER',
  LX_PARTNER: 'LX-PARTNER',
  PARTNER: 'PARTNER',
  ALL: 'ALL'
}

export const DATE_FORMAT = 'DD-MM-YYYY'

export const getKeyLang = (key) => {
  return `${AppId.SUPPLEMENT_APP}.${key}`
}

export const INSURANCE_COMPANIES = [
  { id: 1, name: 'BSH' },
  { id: 2, name: 'VBI' },
  { id: 3, name: 'VNI' },
  { id: 4, name: 'XTI' },
  { id: 5, name: 'PTI' }
]

export const removeAccents = (str) => {
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

export const filterMethod = (filter, row) => {
  if (filter.value === '') {
    return true
  }
  return removeAccents(row[filter.id]).includes(filter.value.toLowerCase())
}

export function intlConvertToVnd(numberVal, intl) {
  if (isNaN(numberVal)) {
    return 0
  }
  return Intl.NumberFormat(
    intl.locale === 'vi' ? 'vn' : 'es'
  ).format(numberVal)
}

export function sleepingFor(ms = 150) {
  let f = 0
  return new Promise((resolve, reject) => {
    try {
      clearTimeout(f)
      f = setTimeout(() => {
        resolve && resolve()
      }, ms)
    } catch (e) {
      reject && reject(e)
    }
  })
}

export function hasRequestFail(statusCode) {
  if (statusCode === 2000 || statusCode === 201) {
    return false
  }
  return true
}

export const addAppContextPath = (url) => {
  return '/supplement' + url
}
