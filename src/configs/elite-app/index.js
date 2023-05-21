import React from 'react'
import { AppId, FormattedMessage } from 'base-app'
import carIcon from '../../assets/images/elite-app/home/products/car-icon.png'
import motorIcon from '../../assets/images/elite-app/home/products/motor-icon.png'
import homeInsuranceIcon from '../../assets/images/elite-app/home/products/homeinsuranceicon.png';
import personalIcon from '../../assets/images/elite-app/home/products/personal-icon.png'

export const ANDROID_APP_LINK = 'https://play.google.com/store/apps/details?id=com.inon.vn'
export const IOS_APP_LINK = 'https://apps.apple.com/app/id1574202853'
export const DOWNLOAD_APP_LINK = 'https://sit2.inon.vn/download-app.html'


export const API_VEHICLE_REGISTRATION_OCR =
  '/nth/user/api/ocr-scan/ocr/vehicle_registration'
export const API_VEHICLE_INSPECTION_OCR =
  '/nth/user/api/ocr-scan/ocr/vehicle_inspection'
export const API_IDENTIFICATION_OCR = '/nth/user/api/ocr-scan/ekyc/card'
export const API_GET_CAR_VEHICLE =
  '/nth/vehicleinsurance/api/authenticate/vehicle-types/car'
export const API_CUSTOMER = '/nth/contactmanager/api/authenticate/customers'
export const API_INSURANCE_ADDONS =
  '/nth/vehicleinsurance/api/authenticate/insurance-addons'
export const API_INSURANCES =
  '/nth/vehicleinsurance/api/authenticate/insurances'
export const API_VEHICLE = '/nth/vehicleinsurance/api/authenticate/vehicles'
export const API_CONTRACT = '/nth/vehicleinsurance/api/authenticate/contracts'
export const API_CONTRACT_COMPANY = '/nth/vehicleinsurance/api/contracts-companyId'
export const API_GET_CAR_MANUFACTURERS =
  '/nth/datacollection/api/authenticate/car-manufacturers'
export const API_GET_MIN_MAX_SEAT_AND_LOAD_BY_VEHICLE_TYPE =
  '/nth/vehicleinsurance/api/authenticate/min-max-seats-and-loads-by-vehicle-type'
export const API_GET_MOTOR_VEHICLE =
  '/nth/vehicleinsurance/api/authenticate/vehicle-types/motor'
export const API_UPLOAD_FORM = '/nth/file/api/upload'
export const API_COMPLETE_CONTRACT =
  '/nth/vehicleinsurance/api/authenticate/contracts/additional'
export const API_CREATE_CONTACT =
  '/nth/contactmanager/api/authenticate/customers'
export const API_ALL_VEHICLE_CONTRACTS =
  '/nth/vehicleinsurance/api/contract-manager/contracts'
export const API_ALL_PERSONAL_CONTRACTS =
  '/nth/personalinsurance/api/contract-manager/contracts'
export const API_ALL_HOME_CONTRACTS =
  '/nth/homeinsurance/api/contract-manager/contracts'
export const API_ALL_BANK = '/nth/datacollection/api/allBanks'
export const API_GET_BANK_COMPANY_AUTHENTICATE = '/nth/insurancecompany/api/authenticate/banks'
// ======================= HOME SAFETY API ====================================
export const API_BENEFICIARIES =
  '/nth/personalinsurance/api/authenticate/beneficiaries'
export const API_INSURANCES_HOMESAFETY =
  '/nth/personalinsurance/api/authenticate/insurances'
export const API_CONTRACT_FEE_HOMESAFETY =
  '/nth/personalinsurance/api/authenticate/contract/fee'
export const API_CONTRACT_HOMESAFETY =
  '/nth/personalinsurance/api/authenticate/contracts'
export const API_UPDATE_CONTRACT_FEE =
  '/nth/personalinsurance/api/authenticate/contract'
export const API_CONTRACT_OWNER =
  '/nth/personalinsurance/api/authenticate/contract-owner'
export const API_UPDATE_PERSONAL_CONTRACTS = '/nth/personalinsurance/api/contracts/update'
export const API_CHECK_GCENTITY = '/nth/personalinsurance/api/authenticate/contract/home-safety/isgcn'

// ======== home private insurance api ======
export const API_CONTRACT_HOMEINSURANCE =
  '/nth/homeinsurance/api/authenticate/contracts'
export const API_CONTRACT_FEE_HOMEINSURANCE =
  '/nth/homeinsurance/api/authenticate/feeInsurance'
export const API_INSURANCE_HOME_PRIVATE =
  '/nth/homeinsurance/api/authenticate/insurances'
export const API_FEE_INSURANCE_HOME_PRIVATE =
  '/nth/homeinsurance/api/authenticate/feeInsurance'
export const API_BUY_INSURANCE_HOME_PRIVATE =
  '/nth/homeinsurance/api/insurance-add-ons'
export const API_UPDATE_INSURANCE_HOME_PRIVATE =
  '/nth/homeinsurance/api/authenticate/insurances-list'
export const API_UPDATE_COMPANY = '/nth/homeinsurance/api/authenticate/company'
export const API_PAY_INSURANCES_HOME_PRIVATE =
  '/nth/homeinsurance/api/authenticate/contracts/pay'
export const API_UPDATE_CONTRACT_HOME_PRIVATE = '/nth/homeinsurance/api/authenticate/contracts/FH'
export const API_PAY_HOME_PRIVATE_CONFIRM = '/nth/homeinsurance/api/authenticate/contracts/vnpay/confirm'
export const API_GET_INFO_CONTRACT_HOMEPRIVATE = '/nth/homeinsurance/api/authenticate/contract'
export const API_UPDATE_HOME_CONTRACTS = '/nth/homeinsurance/api/contracts/update-salerid'


// ======== VTA insurance api ======
export const API_CONTRACT_VTA =
  '/nth/personalinsurance/api/authenticate/contract-pti'
export const API_CONTRACT_FEE_VTA =
  '/nth/personalinsurance/api/authenticate/fee-insurance-pti'
export const API_UPDATE_CONTRACT_FEE_VTA =
  '/nth/personalinsurance/api/authenticate/insurance-pti'
export const API_GET_BUYER_BENEFICIARIES_VTA =
  '/nth/personalinsurance/api/authenticate/contract-pti'
export const API_CONTRACT_PAYMENTS =
  '/nth/personalinsurance/api/authenticate/contract-pti/pay'
export const API_PAY_VTA_CONFIRM = '/nth/personalinsurance/api/authenticate/contract-pti/vnpay/confirm'
export const API_UPDATE_PAY_METHOD_VTA = '/nth/personalinsurance/api/authenticate/payment-method-pti'
export const API_CONFIRM_PAYMENT_BC = ''
export const API_PAY_CONSTRACT= '/nth/vehicleinsurance/api/authenticate/contracts/pay'


// =========HELP CENTER =======

export const API_GET_QUESTION_PUBLIC = '/nth/utilities/api/authenticate/category-questions'
export const API_SEARCH_QUESTION = '/nth/utilities/api/authenticate/questions'

// ==============SUPPORT===============
export const API_CREATE_USER_SUPPORT_PUBLIC = "/nth/utilities/api/authenticate/hc-users"
export const API_CREATE_REQUEST_PUBLIC = "/nth/utilities/api/authenticate/hc-support-books"
export const API_ADD_FILE_SUPPORT = "/nth/file/api/upload-file/message"
export const API_ADD_FILE_INFO_HC_PUBLIC = "/nth/utilities/api/authenticate/hc-messages"

// ==================== renewal insurance ================
export const API_GET_CONTRACT_BY_ID = '/nth/vehicleinsurance/api/authenticate/renewal-vehicle-contract'
export const API_GET_FEE_CONTRACT_RENEWAL = '/nth/vehicleinsurance/api/authenticate/contracts/fee/'
export const API_GET_CONTRACT_BY_CONTRACT_ID = '/nth/vehicleinsurance/api/authenticate/renewal-contract/'

// =================== config bhvc insurance ================
export const API_GET_CONFIG_BHVC = '/nth/vehicleinsurancefee/api/authenticate/bhvc/config'
export const DATE_TIME_ZONE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[z]'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// =============== buy insurance on zalo ====================
export const API_GET_CONTRACT_BUY_ON_ZALO = '/nth/vehicleinsurance/api/authenticate/contracts/buy-insurance-on-zalo' 

export const getKeyLang = (key) => {
  return `${AppId.ELITE_APP}.${key}`
}

export const INSURANCE_TYPES = {
  BHVC: 'bhvc',
  BHVC_TNDS: 'bhvc-tnds',
  TNDS: 'tnds',
  TD: 'td',
  MOTOR: 'motor'
}

export const INSURANCE_ALLOW_TRANSFER_BENEFICIARIES = [
  'bhvc',
  'bhvc-tnds',
  'td'
]

export const VEHICLE_STATUS_OPTIONS = [
  {
    value: 'NEW',
    label: <FormattedMessage id={getKeyLang('insurance.vehicleStatus.new')} />
  },
  {
    value: 'OLD',
    label: <FormattedMessage id={getKeyLang('insurance.vehicleStatus.old')} />
  },
  {
    value: 'ROLLOVER',
    label: (
      <FormattedMessage id={getKeyLang('insurance.vehicleStatus.rollover')} />
    )
  }
]

export const VEHICLE_USES_OPTIONS = [
  {
    value: 'KD',
    label: <FormattedMessage id={getKeyLang('insurance.vehicleUses.KD')} />
  },
  {
    value: 'KKD',
    label: <FormattedMessage id={getKeyLang('insurance.vehicleUses.KKD')} />
  }
]

export const ISSUE_PLACE_OPTIONS = [
  {
    value: 'VIETNAM',
    label: <FormattedMessage id={getKeyLang('insurance.issuePlace.vietnam')} />
  },
  {
    value: 'IMPORT',
    label: <FormattedMessage id={getKeyLang('insurance.issuePlace.import')} />
  }
]

export const INSURANCE_SETTING_DEFAULTS = {
  CAR_TNDS: {
    key: 'CAR_TNDS',
    liability1: 20000000
  },
  CAR_TNDS_TN: {
    key: 'CAR_TNDS_TN',
    liability1: 20000000,
    liability2: 20000000,
    liability3: 20000000
  },
  CAR_CONNGUOI: {
    key: 'CAR_CONNGUOI',
    liability1: 20000000
  },
  CAR_VATCHAT: {
    key: 'CAR_VATCHAT',
    liability1: 20000000
  },
  CAR_HANGHOA: {
    key: 'CAR_HANGHOA',
    liability1: 20000000
  },
  MOTOR_TNDS: {
    key: 'MOTOR_TNDS'
  },
  MOTOR_CONNGUOI: {
    key: 'MOTOR_CONNGUOI',
    liability1: 5000000
  }
}

export const MAIN_ADDITIONAL_TERMS = [
  'BS01',
  'BS02',
  'BS06',
  'BS09',
  'BS13',
  'BS03',
  'BS04',
  'BS05',
  'BS07',
  'BS08',
  'BS10',
  'BS11',
  'BS12',
  'BS14'
]

export const RELATIONSHIP_T0_HOUSE_HOLDER = [
  {
    label: (
      <FormattedMessage id={getKeyLang('insurance.homeSafety.GRANDFATHER')} />
    ),
    value: 'GRANDFATHER'
  },
  {
    label: (
      <FormattedMessage id={getKeyLang('insurance.homeSafety.GRANDMOTHER')} />
    ),
    value: 'GRANDMOTHER'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.FATHER')} />,
    value: 'FATHER'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.MOTHER')} />,
    value: 'MOTHER'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.WIFE')} />,
    value: 'WIFE'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.HUSBAND')} />,
    value: 'HUSBAND'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.CHILD')} />,
    value: 'CHILD'
  },
  {
    label: (
      <FormattedMessage id={getKeyLang('insurance.homeSafety.OLDERBROTHER')} />
    ),
    value: 'OLDERBROTHER'
  },
  {
    label: (
      <FormattedMessage id={getKeyLang('insurance.homeSafety.OLDERSISTER')} />
    ),
    value: 'OLDERSISTER'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.BROTHER')} />,
    value: 'BROTHER'
  },
  {
    label: (
      <FormattedMessage id={getKeyLang('insurance.homeSafety.GRANDCHILDREN')} />
    ),
    value: 'GRANDCHILDREN'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.homeSafety.OTHER')} />,
    value: 'OTHER'
  }
]

export const BUYER_RELATIONSHIP = [
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.YOURSELF')} />,
    value: 'BT'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.PARENT')} />,
    value: 'BM'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.COUPLE')} />,
    value: 'VC'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.CHILD')} />,
    value: 'CON'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.SIBLINGS')} />,
    value: 'ACE'
  }
]

export const BUYER_RELATIONSHIP_NOT_SELF = [
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.PARENT')} />,
    value: 'BM'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.COUPLE')} />,
    value: 'VC'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.CHILD')} />,
    value: 'CON'
  },
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.SIBLINGS')} />,
    value: 'ACE'
  }
]
export const RELATIONSHIP_TO_ENTERPRISE = [
  {
    label: <FormattedMessage id={getKeyLang('insurance.vta.enterprise')} />,
    value: 'DN'
  }
]

export const GENDERS = [
  {
    label: <FormattedMessage id={getKeyLang("insurance.vta.MALE")} />,
    value: "MALE"
  },
  {
    label: <FormattedMessage id={getKeyLang("insurance.vta.FEMALE")} />,
    value: "FEMALE"
  },
  {
    label: <FormattedMessage id={getKeyLang("insurance.vta.OTHER")} />,
    value: 'OTHER'
  }
]

export const IC_TYPES_OPTIONS = [
  {value: 'HOCHIEU', label: <FormattedMessage id='common.icType.passport'/>},
  {
    value: 'CMND',
    label: <FormattedMessage id='common.icType.personalID'/>
  },
  {
    value: 'CCCD',
    label: <FormattedMessage id='common.icType.citizenIdentify'/>
  }
]

export const PAYMENT_METHODS = {
  ATM: 'ATM',
  VISA: 'VISA_MASTER',
  QR: 'QR_CODE',
  FUND_TRANSFER : 'FUND_TRANSFER'
}

export const COMPANY_NAME = {
  BSH: 'BSH',
  VNI: 'VNI',
  PTI: 'PTI'
}

export const INSURANCE_PRODUCTS = {
  'motorVehicleInsurance': [
    {
      key: 'tnds',
      image: carIcon,
      price: '437.000'
    },
    {
      key: 'bhvc',
      image: carIcon,
      price: '4.545.000'
    },
    {
      key: 'bhvc-tnds',
      image: carIcon,
      price: '4.999.000'
    },
    {
      key: 'td',
      image: carIcon,
      price: '5.000.000'
    }
  ],
  'personalInsurance': [
    {
      key: 'homesafety',
      image: personalIcon,
      price: '15.000'
    },
    {
      key: 'vta',
      image: personalIcon,
      price: '130.000'
    },
    {
      key : 'bc',
      image: personalIcon,
      price: '400.000'
    }
  ],
  'motorInsurance': [
    {
      key: 'motor',
      image: motorIcon,
      price: '55.000'
    }
  ],
  'homeInsurance' : [
    {
      key : 'homeprivate',
      image: homeInsuranceIcon,
      price: '55.000'
    }
  ],
  'homeprivate' : [
    {
      key : 'homeprivate',
      image: homeInsuranceIcon,
      price: '55.000'
    }
  ],
}



