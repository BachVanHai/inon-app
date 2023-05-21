import {AppId} from "base-app"
import {FormattedMessage} from "react-intl/lib";
import React from "react";

export const API_GET_ROLES = '/nth/accesscontrol/api/roles'
export const API_GET_ALL_ROLES = '/nth/accesscontrol/api/all-roles'
export const API_GET_USER_ROLES = '/nth/accesscontrol/api/get-user-group-roles'
export const API_GET_CREATABLE_USER_GROUPS = '/nth/accesscontrol/api/creatable-groups'
export const API_USER_GROUPS = '/nth/accesscontrol/api/user-groups'
export const API_UPDATE_USER_GROUP_ROLES =
    '/nth/accesscontrol/api/update-user-group-roles'
export const API_GET_ACCOUNT_IN_GROUP = '/nth/user/api/group-users'
export const API_CHECK_USER_EXIST =
    '/nth/user/api/check-user-exits-by-phone-number'
export const API_USERS = '/nth/user/api/users'
export const API_CHANGE_USER_STATUS = '/nth/user/api/change-user-status'
export const API_USER_APPROVAL = '/nth/user/api/user-approval'
export const API_INSURANCE_SETTINGS = '/nth/user/api/user-insurance-settings'
export const API_USERS_SUGGESTIONS = '/nth/user/api/user-suggestions'
export const API_USERS_EXPORT_REPORT = '/nth/user/api/users/export/excel'
export const API_USERS_IMPORT_USERS = '/nth/user/api/import-excel/users'
export const API_DOWNLOAD_RESULT_FILE = '/nth/user/api/export-excel/users'
export const API_GET_INSURANCE_LIST_BY_COMPANY = '/nth/user/api/insurance-list-by-insurance-company'
export const API_APPROVE_WAITING_PARTNER = '/nth/onboarding/api/partner-approved'
export const API_REJECT_WAITING_PARTNER = '/nth/onboarding/api/partner-rejected'
export const API_PARTNER_OG = '/nth/onboarding/api/partner-ogs'
export const API_GET_USER_WAITING_APPROVE =
    '/nth/onboarding/api/waiting-approve-partners'
export const API_GET_USER_WAITING_APPROVE_SUGGESTIONS =
    '/nth/onboarding/api/suggestion-partners'


// ====================HELP CENTER ===============
export const API_GET_ALL_QUESTION_PUBLIC = '' 
export const API_GET_ALL_QUESTION_MANAGEMENT = '/nth/utilities/api/manager/questions'
export const API_GET_ALL_CATEGORIES_QUESTION = '/nth/utilities/api/authenticate/category-questions' 
export const API_CREATE_QUESTION = '/nth/utilities/api/questions' 
export const API_ADD_FILE = '/nth/file/api/upload-docs' 
export const API_UPDATE_QUESTION = '/nth/utilities/api/questions' 
export const API_CREATE_CATEGORY_QUESTION = "/nth/utilities/api/questions"
export const API_GET_LIST_ACCOUNTS_PENDING = '/nth/user/api/users?size=99999'
export const API_USER_GROUP_AUTHENTICATE = "/nth/accesscontrol/api/user-groups"
export const API_UPDATE_STATUS_QUESTION = '/nth/utilities/api/questions-status'
export const API_GET_QUESTION_PUBLIC = '/nth/utilities/api/authenticate/questions'
export const API_SEARCH_QUESTION = '/nth/utilities/api/authenticate/questions'
export const API_CREATE_CATEGORY = '/nth/utilities/api/category-questions'


// ===================SUPPORT================
export const API_CREATE_USER_SUPPORT_USER = "/nth/utilities/api/hc-users"
export const API_CREATE_REQUEST_USER = "/nth/utilities/api/hc-support-books"
export const API_ADD_FILE_INFO_HC_USER = "/nth/utilities/api/hc-messages"
export const API_ADD_FILE_SUPPORT = "/nth/file/api/upload-file/message"
export const API_CREATE_PERMISSION = "/nth/utilities/api/hc-decentralizations"
export const API_UPDATE_USER_SUPPORT = "/nth/utilities/api/hc-users"
export const API_UPDATE_SUPPORT_PUBLIC = "/nth/utilities/api/hc-users"
export const API_UPDATE_SUPPORT_PRIVATE = "/nth/utilities/api/hc-support-books"
export const API_UPDATE_PERMISSION ="/nth/utilities/api/hc-decentralizations"
export const API_GET_ALL_MY_SUPPORT ="/nth/utilities/api/hc-support-books"
export const API_GET_ALL_SUPPORT_MANAGEMENT ="/nth/utilities/api/hc-support-book/manager"
export const API_GET_ONE_SUPPORT  = "/nth/utilities/api/hc-support-books"
export const API_GET_ALL_PERMISSION = "/nth/utilities/api/hc-decentralizations"
export const API_GET_PERMISSION_BY_ID = "/nth/utilities/api/hc-decentralizations"
export const API_DELETE_PERMISSION = "/nth/utilities/api/hc-decentralizations"
export const API_GET_DEPARTMANT_BY_TYPE = "/nth/utilities/api/hc-decentralization"
export const API_READER_MESSAGE = "/nth/utilities/api/authenticate/hc-message/reader"

export const ELASTICSEARCH_URL = '/nth/dashboard/api/es'
export const BH_URL = '/nth/vehicleinsurance/api/contract-manager/all-contracts/insurance-company'

export const ADD_SETTING_INSURANCE = 'ADD_SETTING'
export const ADD_ON_INSURANCE = 'ADD_ON'

export const INTRO_TOTAL_STEP = 4

export const USER_TYPE = {
  KD: 'KD',
  HTKD: 'HTKD'
}

export const getKeyLang = (key) => {
  return `${AppId.APP_NO1}.${key}`
}


export const addAppContextPath = (url) => {
  return '/app' + url
}

export const CHART_TYPE = {
    REVENUE: 'REVENUE_CHART',
    BONUS: 'BONUS_CHART',
    DEBT: 'DEBT_CHART',
    CONTRACT: 'CONTRACT_CHART',
    ACCOUNT: 'ACCOUNT_CHART'
}

export const TIME_TYPE = {
    ALL: 'ALL',
    CURRENT_DAY: 'CURRENT_DAY',
    CURRENT_WEEK: 'CURRENT_WEEK',
    LAST_WEEK: 'LAST_WEEK',
    CURRENT_MONTH: 'CURRENT_MONTH',
    LAST_MONTH: 'LAST_MONTH',
    CURRENT_YEAR: 'CURRENT_YEAR',
    LAST_YEAR: 'LAST_YEAR',
}

export const TIMES = [
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.all")}/>,
        value: TIME_TYPE.ALL
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.current_week")}/>,
        value: TIME_TYPE.CURRENT_WEEK
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.last_week")}/>,
        value: TIME_TYPE.LAST_WEEK
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.current_month")}/>,
        value: TIME_TYPE.CURRENT_MONTH
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.last_month")}/>,
        value: TIME_TYPE.LAST_MONTH
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.current_year")}/>,
        value: TIME_TYPE.CURRENT_YEAR
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeType.last_year")}/>,
        value: TIME_TYPE.LAST_YEAR
    }
]

export const TIMES_REVENUE = [
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.day")}/>,
        value: TIME_TYPE.CURRENT_DAY
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.week")}/>,
        value: TIME_TYPE.CURRENT_WEEK
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.month")}/>,
        value: TIME_TYPE.CURRENT_MONTH
    },
    {
        label: <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.year")}/>,
        value: TIME_TYPE.CURRENT_YEAR
    }
]

export const COMPANY_ID = {
    BSH: "01",
    VBI: "02",
    VNI: "03",
    XTI: "04",
    PTI: "05"
}

export const DEBT_TYPE = {
    ALL: 'ALL',
    UNDUE: 'UNDUE',
    OUT_DATE: 'OUT_DATE'
}

export const ACCOUNT_TYPE = {
    ALL: 'ALL',
    KHCN: 'KHCN',
    HT_IO: 'HT_IO',
    L1_30_DT: 'L1_30_DT',
    LX_DT: 'LX_DT',
    HT_DT: 'HT_DT',
    DT_LK: 'DT_LK',
    DT_CD: 'DT_CD',
}

export const INSURANCE_TYPE = {
    ALL: 'ALL',
    CAR: 'CC',
    MOTOR: 'MC',
    HOME_SAFETY: 'HC',
    VTA: 'VTA',
    HOME_PRIVATE: 'PHC'
}

export const REVENUE_TYPES = [
    {key: 'ALL', value: "home.chart.revenue.ALL", checked: true, color: "green"},
    {key: 'CC', value: "home.chart.revenue.CC", checked: false, color: "#9B2EC7"},
    {key: 'MC', value: "home.chart.revenue.MC", checked: false, color: "#886C94"},
    {key: 'VTA', value: "home.chart.revenue.VTA", checked: false, color: "#6E52FA"},
    {key: 'HC', value: "home.chart.revenue.HC", checked: false, color: "#FBE391"},
    {key: 'PHC', value: "home.chart.revenue.HFC", checked: false, color: "#C7962E"},
]

export const BONUS_TYPES = [
    {key: 'ALL', value: "home.chart.bonus.ALL", checked: true, color: "green"},
    {key: 'CC', value: "home.chart.bonus.CC", checked: false, color: "#9B2EC7"},
    {key: 'MC', value: "home.chart.bonus.MC", checked: false, color: "#886C94"},
    {key: 'VTA', value: "home.chart.bonus.VTA", checked: false, color: "#6E52FA"},
    {key: 'HC', value: "home.chart.bonus.HC", checked: false, color: "#FBE391"},
    {key: 'PHC', value: "home.chart.bonus.HFC", checked: false, color: "#C7962E"},
]

export const DEBT_TYPES = [
    {key: 'UNDUE', value: "home.chart.debt.UNDUE", checked: true, color: "#FBE391", type: "bar"},
    {key: 'OUT_DATE', value: "home.chart.debt.OUT_DATE", checked: true, color: "#C7962E", type: "bar"},
    {key: 'ALL', value: "home.chart.debt.ALL", checked: true, color: "green", type: "line"}
]

export const CONTRACT_TYPES = [
    {key: 'ALL', value: "home.chart.contract.ALL", checked: true, color: "green"},
    {key: 'CC', value: "home.chart.contract.CC", checked: false, color: "#9B2EC7"},
    {key: 'MC', value: "home.chart.contract.MC", checked: false, color: "#886C94"},
    {key: 'VTA', value: "home.chart.contract.VTA", checked: false, color: "#6E52FA"},
    {key: 'HC', value: "home.chart.contract.HC", checked: false, color: "#FBE391"},
    {key: 'PHC', value: "home.chart.contract.HFC", checked: false, color: "#C7962E"},
]

export const ACCOUNT_DT_TYPES = [
    {key: 'ALL', value: "home.chart.account.ALL", checked: true, color: "green"},
    {key: ACCOUNT_TYPE.DT_LK, value: "home.chart.account.DT_LK", checked: false, color: "#9B2EC7"},
    {key: ACCOUNT_TYPE.DT_CD, value: "home.chart.account.DT_CD", checked: false, color: "#886C94"},
    {key: ACCOUNT_TYPE.HT_DT, value: "home.chart.account.HT_DT", checked: false, color: "#6E52FA"},
]

export const ACCOUNT_ADMIN_TYPES = [
    {key: ACCOUNT_TYPE.ALL, value: "home.chart.account.ALL", checked: true, color: "green"},
    {key: ACCOUNT_TYPE.KHCN, value: "home.chart.account.KHCN", checked: false, color: "#9B2EC7"},
    {key: ACCOUNT_TYPE.HT_IO, value: "home.chart.account.HT_IO", checked: false, color: "#886C94"},
    {key: ACCOUNT_TYPE.L1_30_DT, value: "home.chart.account.L1_30_DT", checked: false, color: "#6E52FA"},
    {key: ACCOUNT_TYPE.LX_DT, value: "home.chart.account.LX_DT", checked: false, color: "#FBE391"},
    {key: ACCOUNT_TYPE.HT_DT, value: "home.chart.account.HT_DT", checked: false, color: "#C7962E"},
]

export const INSURANCE_COMPANY = [
    {
        label: <FormattedMessage id={getKeyLang("home.insuranceCompany.ALL")}/>,
        value: null
    },
    {
        label: 'BSH',
        value: COMPANY_ID.BSH
    },
    {
        label: 'VBI',
        value: COMPANY_ID.VBI
    },
    {
        label: 'VNI',
        value: COMPANY_ID.VNI
    },
    {
        label: 'XTI',
        value: COMPANY_ID.XTI
    },
    {
        label: 'PTI',
        value: COMPANY_ID.PTI
    },
]

export const getXAxisNameByTimeType = (timeType) => {
    switch (timeType.value) {
        case TIME_TYPE.ALL:
        case TIME_TYPE.CURRENT_WEEK:
        case TIME_TYPE.LAST_WEEK:
            return 'Ngày'
        case TIME_TYPE.CURRENT_MONTH:
        case TIME_TYPE.LAST_MONTH:
            return 'Tuần'
        case TIME_TYPE.CURRENT_YEAR:
        case TIME_TYPE.LAST_YEAR:
            return "Tháng"
        default: return "Ngày"
    }
}
