import React from 'react'
import logoBSH from "../../assets/images/insurance-app/buy-insurance/Logo_BSH_1.svg"
import logoVBI from "../../assets/images/insurance-app/buy-insurance/Logo_VBI_1.svg"
import logoVNI from "../../assets/images/insurance-app/buy-insurance/Logo_VNI.svg"
import logoXTI from "../../assets/images/insurance-app/buy-insurance/Logo_XTI.svg"
import logoPTI from "../../assets/images/insurance-app/buy-insurance/Logo_PTI.svg"
import logoPVI from "../../assets/images/insurance-app/buy-insurance/Logo_PVI.svg"

import {
    AppId,
} from 'base-app'
import { FormattedMessage } from 'react-intl'

/*
@base-api
*/
export const API_DEV_URL = 'https://apidev.inon.vn'
export const API_SIT_URL = 'https://apisit.inon.vn'

/*
@base-api
*/
export const API_URL = 'https://apisit.inon.vn'
export const API_PAY_CONSTRACT = '/nth/vehicleinsurance/api/contracts/pay'
export const API_GET_ROLES = 'API_GET_ROLES'
export const API_CHECK_INFO_CONTACT_BY_ID = '/nth/contactmanager/api/customers/check'
export const API_CHECK_INFO_VEHICLE = '/nth/vehicleinsurance/api/vehicles/check'
export const API_CREATE_VEHICLE = '/nth/vehicleinsurance/api/vehicles'
export const API_CREATE_CONSTRACT = '/nth/vehicleinsurance/api/contracts'
export const API_CREATE_CONTACT = '/nth/contactmanager/api/customers'
export const API_UPDATE_INSURANCE = '/nth/vehicleinsurance/api/insurances'
export const API_GET_CONTACT = '/nth/contactmanager/api/customers'
export const API_UPDATE_INSURANCE_ADDONS = '/nth/vehicleinsurance/api/insurance-addons'
export const API_GET_CONSTRACT = '/nth/vehicleinsurance/api/contracts'
export const API_GET_CAR_MANUFACTURERS = '/nth/datacollection/api/car-manufacturers'
export const API_GET_ALL_BANK = '/nth/datacollection/api/allBanks'
export const API_GET_CAR_VEHICLE = '/nth/vehicleinsurance/api/vehicle-types/car'
export const API_GET_CONTACT_BY_CONTRACTID = '/nth/vehicleinsurance/api/contract/owner'
export const API_GET_CONTRACT_FEE = '/nth/vehicleinsurance/api/contracts/fee'
export const API_COMPLETE_CONSTRACT = '/nth/vehicleinsurance/api/contracts/additional'
export const API_GET_CITY = '/nth/datacollection/api/cities'
export const API_GET_DISTRICTS = '/nth/datacollection/api/districts'
export const API_GET_WARDS = '/nth/datacollection/api/wards'
export const API_APPROVED_CONSTRACT = '/nth/flowapproval/api/contract-approvals'
export const API_GET_CONSTRACTS_CAR_PENDING = '/nth/vehicleinsurance/api/contracts/approval/pending/CC'
export const API_GET_CONSTRACTS_MOTOR_PENDING = '/nth/vehicleinsurance/api/contracts/approval/pending/MC?sort=id,DESC'
export const API_GET_BANK_TRANSFER_INFO = '/nth/insurancecompany/api/banks'
export const API_GET_ROLES1 = 'API_GET_ROLES'
export const API_CHECK_INFO_BY_ID = '/nth/contactmanager/api/customers/check/'
export const API_GET_CITI = '/nth/datacollection/api/cities'
export const API_GET_WARD = '/nth/datacollection/api/wards'
export const API_CHECK_NUMBERPLATE = '/nth/vehicleinsurance/api/vehicles/check/'
export const API_GET_MANUFACTURERS = '/nth/datacollection/api/moto-manufacturers'
export const API_CHECK_CONTACT = '/nth/contactmanager/api/customers/check/'
export const API_GET_CONTRACT = '/nth/vehicleinsurance/api/contract/owner/'
export const API_UPDATE_CONTRACT = '/nth/vehicleinsurance/api/contracts'
export const API_GET_FEE = '/nth/vehicleinsurance/api/contracts/fee/'
export const API_GET_TYPE = '/nth/vehicleinsurance/api/vehicle-types/motor'
export const API_GET_BANK_COMPANY = '/nth/insurancecompany/api/banks'
export const API_UPLOAD_FILE = 'nth/file/api/upload'
export const API_GET_VEHICLE_TEMPLATE_LIST = '/nth/vehicleinsurance/api/contracts/temp?number=0&size=20'
export const API_CONFIRM_CONSTRACT = '/nth/vehicleinsurance/api/contracts/vnpay/confirm' //  '/nth/payments/api/vnpay/confirm-payment'
export const API_API_TEST_PAY = '/nth/vehicleinsurance/api/contracts/pay-test/'
export const API_GET_CONSTRACTS_CAR_ALL = '/nth/vehicleinsurance/api/contract-manager/all-contracts/CC'
export const API_GET_CONSTRACTS_CAR_PARTNERS = '/nth/vehicleinsurance/api/contract-manager/partner-contracts/CC'
export const API_GET_CONSTRACTS_CAR_PERS = '/nth/vehicleinsurance/api/contract-manager/my-contracts/CC'
export const API_GET_CONSTRACTS_MOTO_ALL = '/nth/vehicleinsurance/api/contract-manager/all-contracts/MC'
export const API_GET_CONSTRACTS_PARTNER = '/nth/vehicleinsurance/api/contract-manager/partner-contracts/MC'
export const API_GET_CONSTRACTS_MOTO_PERS = '/nth/vehicleinsurance/api/contract-manager/my-contracts/MC'
export const API_GET_PARTNER = '/nth/user/api/users'
export const API_GET_MANAGE_SYSTEM_FEE = '/nth/vehicleinsurancefee/api/fee-manager'
export const API_UPDATE_MANAGE_SYSTEM_FEE_CAR = '/nth/vehicleinsurancefee/api/fee-manager/car/update'
export const API_UPDATE_MANAGE_SYSTEM_FEE_MOTOR = '/nth/vehicleinsurancefee/api/fee-manager/motor/update'
export const API_GET_MANAGE_SYSTEM_FEE_APRROVE = '/nth/vehicleinsurancefee/api/fee-manager/approval/01'
export const API_GET_MANAGE_SYSTEM_FEE_APRROVE_DETAIL = '/nth/vehicleinsurancefee/api/fee-manager'
export const API_APPROVE_MANAGE_SYSTEM_FEE = '/nth/vehicleinsurancefee/api/fee-manager/approval'
export const API_GET_CONFIG_ACCOUNT = '/nth/account/api/my-accounts'
export const API_GET_ADD_TERMS = '/nth/vehicleinsurance/api/insurance-addons'
export const API_VEHICLE_INSUR_MIN_MAX_SEATS_LOADS = '/nth/vehicleinsurance/api/authenticate/min-max-seats-and-loads-by-vehicle-type'
export const API_CONTRACTS_COMPANY_ID = "/api/contracts-companyId"
export const API_GET_COMPANY = '/nth/insurancecompany/api/company-configs/INSURANCE_APP'
/*
@config api
*/
export const API_GET_CONFIG_FEE_BHVC = '/nth/vehicleinsurancefee/api/bhvc/config/01'
export const API_VEHICLE_INSURANCEFEE_CONFIG = '/nth/vehicleinsurancefee/api/bhvc/config'
export const API_GET_MY_DEBT_ACCOUNT = '/nth/account/api/account-manager/my-account'
/*
@ocr api
*/
export const API_OCR_CAR_ID_PERSON_OCR = '/nth/user/api/ocr-scan/ocr/card'
export const API_OCR_CAR_VEHICLE_INSPECTOR = '/nth/user/api/ocr-scan/ocr/vehicle_inspection'
export const API_OCR_CAR_VEHICLE_REGISTRATION = '/nth/user/api/ocr-scan/ocr/vehicle_registration'
export const API_OCR_MOTOR_ID_PERSON_OCR = '/nth/user/api/ocr-scan/ocr/card'
export const API_OCR_MOTOR_VEHICLE_INSPECTOR = '/nth/user/api/ocr-scan/ocr/vehicle_inspection'
export const API_OCR_MOTOR_VEHICLE_REGISTRATION = '/nth/user/api/ocr-scan/ocr/vehicle_registration'

export const API_OCR_VEHICLE_REGISTRATION = '/nth/user/api/ocr-scan/ocr/vehicle_registration'
export const API_OCR_VEHICLE_INSPECTOR = '/nth/user/api/ocr-scan/ocr/vehicle_inspection'
export const API_OCR_ID_PERSON = '/nth/user/api/ocr-scan/ocr/card'
/*
@buy-insurances - family-safety api
*/
export const API_CONTRACT_OWNER = '/nth/personalinsurance/api/contract-owner'
export const API_AUTHENTICATE_CONTRACTS = '/nth/personalinsurance/api/authenticate/contracts'
export const API_CONTRACTS_VNPAY_CONFIRM = '/nth/personalinsurance/api/contracts/vnpay/confirm'
export const API_CONTRACTS = '/nth/personalinsurance/api/contracts'
export const API_CONTRACT = '/nth/personalinsurance/api/contract'
export const API_CONTRACTS_PAY = '/nth/personalinsurance/api/contracts/pay'
export const API_BENEFICIARIES = '/nth/personalinsurance/api/beneficiaries'
export const API_INSURANCES = '/nth/personalinsurance/api/insurances'
export const API_CONTRACTS_FEE = '/nth/personalinsurance/api/contract/fee'
export const API_CONTRACT_SAVECONTRACT = '/nth/personalinsurance/api/contract/savecontract'
export const API_CONTRACT_ISGCN = '/nth/personalinsurance/api/authenticate/contract/home-safety/isgcn'
/*
@buy-insurances - personal-home api
*/
export const API_HOME_INSURANCE_CONTRACTS = '/nth/homeinsurance/api/contracts'
export const API_HOME_INSURANCE_INSURANCES = '/nth/homeinsurance/api/insurances-list'
export const API_HOME_INSURANCE_FEE_INSURANCE = '/nth/homeinsurance/api/feeInsurance'
export const API_HOME_INSURANCE_CONTRACT = '/nth/homeinsurance/api/contract'
export const API_HOME_INSURANCE_CONTRACTS_PAY = '/nth/homeinsurance/api/contracts/pay'
export const API_HOME_INSURANCE_CONTRACTS_VNPAY_CONFIRM = '/nth/homeinsurance/api/contracts/vnpay/confirm'
export const API_HOME_INSURANCE_CONTRACT_PAYMENT_CHANNEL = "/nth/homeinsurance/api/contract/payment-channel"
/*
@buy-insurances - vta-insur api
*/
export const API_VTA_INSURANCE_INSURANCE_PTI_VTA = "/nth/personalinsurance/api/contract-pti/VTA"
export const API_VTA_INSURANCE_INSURANCE_PTI = "/nth/personalinsurance/api/contract-pti"
export const API_VTA_INSURANCE_PTI = "/nth/personalinsurance/api/insurance-pti"
export const API_VTA_INSURANCE_FEE_PTI = "/nth/personalinsurance/api/fee-insurance-pti"
export const API_VTA_INSURANCE_PAYMENT_URL = "/nth/personalinsurance/api/contract-pti/pay"
export const API_VTA_INSURANCE_CONTRACTS_VNPAY_CONFIRM = "/nth/personalinsurance/api/contract-pti/vnpay/confirm"
export const API_VTA_INSURANCE_EXEL_TEMPLATE = "https://sit2.inon.vn/resources/templates/VTA-template.xlsx"
export const API_CHECK_ENOUGH_BONUS_POINT_VALUE = "/nth/bonusmanager/api/check-enough-bonus-point"

/*
@buy-insurances - excel
*/
export const API_UPLOAD_EXCEL_VEHICLE = 'nth/file/api/upload-file-vehicle'
export const API_FILE_BUY_CAR_INSURANCE = "nth/file/api/file-buy-car-insurance"
export const API_FILES_CONTRACTS = "nth/file/api/files-contracts"
export const URL_RESOURCES = "https://sit2.inon.vn/resources/templates"

// PERSONAL HOME MULTIPLE API - excel
export const API_READ_FILE_EXEL_PERSONAL_HOME_MULTIPLE = '/nth/file/api/upload-file-vehicle?excelType=HC'
export const API_CREATE_CONTRACT_PERSONAL_HOME_MULTIPLE = '/nth/file/api/file-buy-car-insurance?contractType=PHC'
export const API_PAYMENT_HOME_PERSONAL_MULTIPLE = '/nth/file/api/file-vnpay-url'
export const API_CONFIRM_PAYMENT_PERSONAL_MULTIPE = "/nth/file/api/files-vnpay-confirm?contractType=PHC"
export const API_DOWNLOAD_FILE_TEMPLATE = 'https://sit2.inon.vn/resources/templates/HOME-template.xlsx'
export const API_UPDATE_PAYMENT_TYPE = "/nth/file/api/file-contracts-payment"
export const API_GET_PACKAGE_HEATH_CARE_INSURANCE = '/nth/personalinsurance/api/authenticate/insurance-types?code=BC'

/** @buy-insurance - health-care-and-card */
/** please check pages/insurance-app/health-care folder, i've stored health-care-and-card api in that path */

/** utility section */
/*
@route-path
*/
export const PATH_BUY_INSURANCE = '/buy-insurance'
export const PATH_BUY_INSURANCES_VTA = '/buy-insurances/vta'
export const PATH_BUY_INSURANCES_CAR = '/buy-insurances/car'
export const PATH_BUY_INSURANCES_CARS = '/buy-insurances/cars'
export const PATH_BUY_INSURANCES_MOTOR = '/buy-insurances/motor'
export const PATH_BUY_INSURANCES_MOTORS = '/buy-insurances/motors'
export const PATH_BUY_INSURANCES_MOTOR_SIMPLIFY = '/buy-insurances/motor-simplify'
export const PATH_BUY_INSURANCES_CAR_SIMPLIFY = '/buy-insurances/car-simplify'
export const PATH_BUY_INSURANCES_FAMILY_SAFETY = '/buy-insurances/family-safety'
export const PATH_BUY_INSURANCES_PERSONAL_HOME = '/buy-insurances/personal-home'
export const PATH_BUY_INSURANCES_HEALTH_CARE = '/buy-insurances/health-care'
export const PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED = '/buy-insurances/health-care-advenced'
export const PATH_BUY_INSURANCES_TRAVEL = '/buy-insurances/travel'
export const PATH_BUY_INSURANCES_TRAVEL_DOMESTIC = '/buy-insurances/travel-domestic'
export const PATH_BUY_INSURANCES_VEHICLE_TEMPLATE = PATH_BUY_INSURANCE + '/vehicle/template'
export const PATH_CONTRACTS_MANAGE = '/contracts'
export const PATH_VNPAY_RETURN = '/vnpayreturn'
export const PATH_AN_IN_INSUR = '/buy-insurance/antin'
export const PATH_BUY_INSURANCES_GOODS = '/buy-insurance/goods'

export const PATH_NTH_VEHICLEINSURANCE = "/nth/vehicleinsurance"
export const PATH_NTH_PERSONALINSURANCE = "/nth/personalinsurance"
export const PATH_NTH_HOMEINSURANCE = "/nth/homeinsurance"
export const PATH_BUY_HOME_PERSONAL_MULTIPLE = '/buy-insurance/home-personal-multiple'
export const PATH_BUY_ANTIN_INSURANCE = '/buy-insurance/antin'
export const ROLE_ALL = "all"
export const ROLE_PERSONAL = "personal"
export const ROLE_PARTNER = "partner"
// example "http://localhost:8126/api/contract-manager/approval?approvalStatus=APPROVED"
export const API_CONTRACT_MANAGER_APPROVAL = "/api/contract-manager/approval"
export const API_CONTRACT_MANAGER_EXPORT = "/api/contract-manager/export"
// example "http://localhost:8126/api/contract-manager/all-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-25T08:22:41.673Z"
export const API_CONTRACT_MANAGER_ALL_CONTRACTS = "/api/contract-manager/all-contracts"
// example "http://localhost:8126/api/contract-manager/partner-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-22T08:22:41.673Z"
export const API_CONTRACT_MANAGER_PARTNER_CONTRACTS = "/api/contract-manager/partner-contracts"
// example "http://localhost:8126/api/contract-manager/my-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-25T08:22:41.673Z"
export const API_CONTRACT_MANAGER_PERSONAL_CONTRACTS = "/api/contract-manager/my-contracts"
// contract-manager
export const API_CONTRACT_MANAGER = "/api/contract-manager"
export const API_CONTRACT_MANAGER_CANCEL_CONTRACT = "/api/contract-manager/cancel-contract"
//bonus-manager
export const API_CHECK_ENOUGH_BONUS_POINT = "/nth/bonusmanager/api/check-enough-bonus-point"

export const API_GET_CONFIG_INSURANCE_ENABLE = '/nth/utilities/api/authenticate/app-config-system/insuranceBuyEnable'
export const API_CANCEL_CONTRACT = 'api/contract-manager/reason-for-reject'
/*
@insuranceType
*/
export const INSURANCE_TYPE_CAR = "CC"
export const INSURANCE_TYPE_CARS = "CCS"  // this type just for check in front-end, not for api
export const INSURANCE_TYPE_MOTOR = "MC"
export const INSURANCE_TYPE_CAR_SIMPLIFY = 'CCSP'
export const INSURANCE_TYPE_MOTORS = "MCS" // this type just for check in front-end, not for api
export const INSURANCE_TYPE_HOME_SAFETY = "HC"
export const INSURANCE_TYPE_PERSONAL_HOME = "PHC"
export const INSURANCE_TYPE_VTA = "VTA"
export const INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE = "PHCM" // this type just for check in front-end, not for api
export const INSURANCE_TYPE_HEALTH_CARE = "HCAC"
export const INSURANCE_TYPE_HEALTH_CARE_CONTRACT = "BC"
export const INSURANCE_TYPE_HEALTH_CARE_ADVANDCED = "VC"
export const INSURANCE_TYPE_MOTOR_SIMPLIFY = "MCSP"
export const INSURANCE_TYPE_ANTIN_CONTRACT = "CS"
export const INSURANCE_TYPE_ANTIN_CONTRACT_CONFIRM = "CS"
export const INSURANCE_TYPE_TRAVEL_DOMESTIC_CONTRACT_CONFIRM = "TD"
export const INSURANCE_TYPE_TRAVEL = "TV"
export const INSURANCE_TYPE_TRAVEL_DS = "TD"
export const INSURANCE_TYPE_TRAVEL_DOMESTIC = "TVTN"
export const INSURANCE_TYPE_TRAVEL_GET_CONTRACT = "TA"
export const INSURANCE_TYPE_GOODS = "HH"
export const INSURANCE_TYPE_GOODS_CONFIRM = "GS"
export const FICO_MANAGER_ID = '14625'

export const getKeyLang = (key) => {
    return `${AppId.INSURANCE_APP}.${key}`
}

export const IMAGE_RESIZE_CONFIG = {
    width: 1820,
    height: 1820
}

export const COMPANIES = [
    {
        id: '01',
        name: 'BSH',
        logo: logoBSH,
        companyId: '01',
        companyName: "BSH",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.BSH`)} />,
    },
    {
        id: '02',
        name: 'VBI',
        logo: logoVBI,
        companyId: '02',
        companyName: "VBI",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.VBI`)} />
    },
    {
        id: '03',
        name: 'VNI',
        logo: logoVNI,
        companyId: "03",
        companyName: "VNI",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.VNI`)} />
    },
    {
        id: '04',
        name: 'XTI',
        logo: logoXTI,
        companyId: '04',
        companyName: "XTI",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.XTI`)} />
    },
    {
        id: '05',
        name: 'PTI',
        logo: logoPTI,
        companyId: '05',
        companyName: "PTI",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.PTI`)} />
    },
    {
        id: '06',
        name: 'PVI',
        logo: logoPVI,
        companyId: '06',
        companyName: "PVI",
        title: <FormattedMessage id={getKeyLang(`BuyInsurance.Car.PVI`)} />
    },
]

export function getCompanyById(companyId) {
    const found = COMPANIES.find(elt => elt.id === companyId)
    if (found) {
        return found
    }
    return undefined
}

/*
@paid
*/
export const PAID_FAIL = "PAID_FAIL"
export const PAID_DEBT_SUCCESS = "PAID_DEBT_SUCCESS"
export const PAID_BONUS_SUCCESS = "PAID_BONUS_SUCCESS"
export const PAID_SUCCESS = "PAID_SUCCESS"
export const PAID_WAITING = "PAID_WAITING"
/*
 * REDUX_STATE_NAME
 */
export const NAME_CHAT_BOX = 'chatBox'
export const NAME_APP_CONFIG = 'insuranceAppConfig'
export const NAME_BUY_INSURANCES_CAR = 'buyInsurancesCar'
export const NAME_BUY_INSURANCES_VTA = 'buyInsurancesVta'
export const NAME_BUY_INSURANCES_CARS = 'buyInsurancesCars'
export const NAME_BUY_INSURANCES_MOTOR = 'buyInsurancesMotor'
export const NAME_BUY_INSURANCE_MOTORS = 'buyInsurancesMotors'
export const NAME_BUY_INSURANCE_MOTOR_SIMPLIFY = 'buyInsurancesMotorSimplify'
export const NAME_BUY_INSURANCES_FAMILY_SAFETY = 'buyInsurancesFamilySafety'
export const NAME_BUY_INSURANCES_PERSONAL_HOME = 'buyInsurancesPersonalHome'
export const NAME_BUY_INSURANCES_MULTIPLE_HOME = 'buyInsuranceHomeMultiple'
export const NAME_BUY_INSURANCES_HEALTH_CARE = 'buyInsuranceHealthCare'
export const NAME_BUY_INSURANCES_ANTIN = 'buyInsuranceAntin'
export const NAME_BUY_INSURANCES_TRAVEL = 'buyInsuranceTravel'
export const NAME_BUY_INSURANCES_GOODS = 'buyInsuranceGoods'
export const NAME_BUY_INSURANCES_TRAVEL_DOMESTIC = 'buyInsuranceTravelDomestic'
export const NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED = 'buyInsuranceHealthCareAdvanced'

/**
    @example
    getDefault_buyInsurancesName(reduxName).reduxName
    getDefault_buyInsurancesName(reduxName).fullName
    getDefault_buyInsurancesName(reduxName).pathName
 */
export const getDefault_buyInsurancesName = (REDUX_STATE_NAME) => {
    const map = {
        [NAME_BUY_INSURANCES_CAR]: {
            reduxName: NAME_BUY_INSURANCES_CAR,
            fullName: "Bảo hiểm xe ô tô",
            pathName: "Mua bảo hiểm -> Bảo hiểm xe cơ giới -> Bảo hiểm xe ô tô",
        },
        [NAME_BUY_INSURANCES_FAMILY_SAFETY]: {
            reduxName: NAME_BUY_INSURANCES_FAMILY_SAFETY,
            fullName: "Bảo hiểm bảo an toàn gia",
            pathName: "Mua bảo hiểm -> Bảo hiểm con người -> Bảo hiểm bảo an toàn gia",
        },
        [NAME_BUY_INSURANCES_PERSONAL_HOME]: {
            reduxName: NAME_BUY_INSURANCES_PERSONAL_HOME,
            fullName: "Bảo hiểm toàn diện nhà tư nhân",
            pathName: "Mua bảo hiểm -> Bảo hiểm tài sản -> Bảo hiểm toàn diện nhà tư nhân",
        },
        [NAME_BUY_INSURANCES_VTA]: {
            reduxName: NAME_BUY_INSURANCES_VTA,
            fullName: "Bảo hiểm vững tâm an",
            pathName: "Mua bảo hiểm -> Bảo hiểm con người -> Bảo hiểm vững tâm an",
        },
        [NAME_BUY_INSURANCES_MOTOR]: {
            reduxName: NAME_BUY_INSURANCES_MOTOR,
            fullName: "Bảo hiểm xe máy",
            pathName: "Mua bảo hiểm -> Bảo hiểm xe cơ giới -> Bảo hiểm xe máy",
        },
        [NAME_BUY_INSURANCES_MULTIPLE_HOME]: {
            reduxName: NAME_BUY_INSURANCES_MULTIPLE_HOME,
            fullName: "Bảo hiểm nhà",
            pathName: "Mua bảo hiểm -> Bảo hiểm nhà",
        },
        [NAME_BUY_INSURANCES_HEALTH_CARE]: {
            reduxName: NAME_BUY_INSURANCES_HEALTH_CARE,
            fullName: "BEST CHOICE - Bảo hiểm sức khoẻ toàn diện và thẻ ngân hàng",
            pathName: "",
        },
        [NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED]: {
            reduxName: NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED,
            fullName: "Bảo hiểm sức khoẻ nâng cao",
            pathName: "",
        },
        [NAME_BUY_INSURANCES_ANTIN]: {
            reduxName: NAME_BUY_INSURANCES_ANTIN,
            fullName: "Bảo an tín - bảo hiểm sức khỏe người vay tiêu dùng",
            pathName: "Mua bảo hiểm -> Bảo an tín - bảo hiểm sức khỏe người vay tiêu dùng",
        },
        [NAME_BUY_INSURANCES_TRAVEL]: {
            reduxName: NAME_BUY_INSURANCES_TRAVEL,
            fullName: "Bảo hiểm du lịch quốc tế",
            pathName: "Mua bảo hiểm -> Bảo hiểm du lịch và chuyến đi ->Bảo hiểm du lịch quốc tế",
        },
        [NAME_BUY_INSURANCES_TRAVEL_DOMESTIC]: {
            reduxName: NAME_BUY_INSURANCES_TRAVEL_DOMESTIC,
            fullName: "Bảo hiểm du lịch trong nước",
            pathName: "Mua bảo hiểm -> Bảo hiểm du lịch và chuyến đi ->Bảo hiểm du lịch trong nước",
        },
        "default": {
            reduxName: "No name found",
            fullName: "Không tìm được cái tên phù hợp",
            pathName: "Mua bảo hiểm -> not found",
        },
    }
    if (!map[REDUX_STATE_NAME]) {
        return map["default"]
    }
    return map[REDUX_STATE_NAME]
}

export const addAppContextPath = (url) => {
    return '/insurance' + url
}