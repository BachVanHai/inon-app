import { BaseAppConfigs, BaseAppUltils, HttpClient } from 'base-app'
import moment from 'moment'
import {
  API_CONTRACT,
  API_CUSTOMER,
  API_GET_CAR_MANUFACTURERS,
  API_GET_CAR_VEHICLE,
  API_GET_MOTOR_VEHICLE,
  API_IDENTIFICATION_OCR,
  API_INSURANCES,
  API_INSURANCES_HOMESAFETY,
  API_INSURANCE_ADDONS,
  API_PAY_INSURANCES_HOME_PRIVATE,
  API_UPDATE_COMPANY,
  API_UPDATE_CONTRACT_FEE,
  API_UPDATE_INSURANCE_HOME_PRIVATE,
  API_UPLOAD_FORM,
  API_VEHICLE,
  API_VEHICLE_INSPECTION_OCR,
  API_VEHICLE_REGISTRATION_OCR,
  DATE_TIME_ZONE_FORMAT,
  API_UPDATE_CONTRACT_HOME_PRIVATE,
  API_PAY_HOME_PRIVATE_CONFIRM,
  API_GET_MIN_MAX_SEAT_AND_LOAD_BY_VEHICLE_TYPE,
  API_CONTRACT_VTA,
  API_CONTRACT_FEE_VTA,
  API_UPDATE_CONTRACT_FEE_VTA,
  API_GET_BUYER_BENEFICIARIES_VTA,
  API_CONTRACT_PAYMENTS,
  API_PAY_VTA_CONFIRM,
  API_CONTRACT_COMPANY,
  API_UPDATE_PAY_METHOD_VTA,
  API_UPDATE_CONTRACT_SALER,
  API_UPDATE_PERSONAL_CONTRACTS,
  API_GET_INFO_CONTRACT_HOMEPRIVATE,
  API_CONTRACT_OWNER,
  API_CONTRACT_HOMESAFETY,
  API_BENEFICIARIES,
  API_CONTRACT_FEE_HOMESAFETY,
  API_CREATE_CONTACT,
  API_COMPLETE_CONTRACT,
  API_ALL_VEHICLE_CONTRACTS,
  API_ALL_BANK,
  API_CONTRACT_HOMEINSURANCE,
  API_FEE_INSURANCE_HOME_PRIVATE,
  API_BUY_INSURANCE_HOME_PRIVATE,
  API_ALL_PERSONAL_CONTRACTS,
  API_ALL_HOME_CONTRACTS,
  API_UPDATE_HOME_CONTRACTS,
  API_CHECK_GCENTITY,
  API_GET_BANK_COMPANY_AUTHENTICATE,
  API_GET_CONFIG_BHVC
} from '../../configs/elite-app'

export class BuyInsuranceService {

  // ======================= MOTOR & CAR ====================================

  static getCarVehicleOptions() {
    return HttpClient.get(`${API_GET_CAR_VEHICLE}`, {
      isBackgroundRequest: true
    })
  }

  static getCarManufacturers() {
    return HttpClient.get(`${API_GET_CAR_MANUFACTURERS}`, {
      isBackgroundRequest: true
    })
  }

  static getMinMaxSeatLoadVehicleType(formData) {
    return HttpClient.get(`${API_GET_MIN_MAX_SEAT_AND_LOAD_BY_VEHICLE_TYPE}`, {
      params: formData,
      isBackgroundRequest: true
    })
  }

  static getMotorVehicleOptions() {
    return HttpClient.get(`${API_GET_MOTOR_VEHICLE}`, {
      isBackgroundRequest: true
    })
  }

  static createContract(contract) {
    return HttpClient.post(`${API_CONTRACT}`, contract)
  }

  static updateContractOwner(customer, contractId) {
    return HttpClient.put(`${API_CONTRACT_OWNER}/${contractId}`, customer)
  }

  static updateContract(contract) {
    return HttpClient.put(`${API_CONTRACT}`, contract)
  }

  static updateContractCompany(contract) {
    return HttpClient.put(`${API_CONTRACT_COMPANY}`, contract)
  }

  static createCustomer(customer) {
    return HttpClient.post(`${API_CUSTOMER}`, customer)
  }

  static updateCustomer(customer) {
    return HttpClient.put(`${API_CUSTOMER}`, customer)
  }

  static createVehicle(vehicle) {
    return HttpClient.post(`${API_VEHICLE}`, vehicle)
  }

  static updateVehicle(vehicle) {
    return HttpClient.put(`${API_VEHICLE}`, vehicle)
  }

  static updateInsurances(insurances) {
    return HttpClient.put(
      `${API_INSURANCES}`,
      updateContractEffectiveDate(insurances)
    )
  }

  static updateInsuranceAddons(insuranceAddons) {
    return HttpClient.put(`${API_INSURANCE_ADDONS}`, insuranceAddons)
  }

  static calculateInsuranceFee(contractId) {
    return HttpClient.get(`${API_CONTRACT}/fee/${contractId}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }

  static payContract(contractId, contractInfo) {
    return HttpClient.post(`${API_CONTRACT}/pay/${contractId}`, contractInfo)
  }

  static paymentConfirm(returnURL) {
    return HttpClient.post(
      `${API_CONTRACT}/vnpay/confirm`,
      { returnURL },
      {isBackgroundRequest: true}
    )
  }

  // ======================= HOME SAFETY ====================================

  static createContractHomeSafety(customer) {
    return HttpClient.post(`${API_CONTRACT_HOMESAFETY}`, customer, {
      params: { contractType: 'HC' }
    })
  }

  static updateContractHomeSafety(customer) {
    return HttpClient.put(`${API_CONTRACT_HOMESAFETY}`, customer)
  }

  static createBeneficiary(beneficiaries, contractId) {
    return HttpClient.post(`${API_BENEFICIARIES}/${contractId}`, beneficiaries)
  }

  static updateBeneficiary(beneficiaries, contractId) {
    return HttpClient.put(`${API_BENEFICIARIES}/${contractId}`, beneficiaries)
  }

  static updateInsurancesHomeSafety(insurances) {
    return HttpClient.put(
      `${API_INSURANCES_HOMESAFETY}`,
      updateContractEffectiveDate(insurances)
    )
  }

  static calculateInsuranceFeeHomeSafety(contractId) {
    return HttpClient.get(`${API_CONTRACT_FEE_HOMESAFETY}/${contractId}`)
  }

  static payContractHomeSafety(contractId) {
    return HttpClient.get(`${API_CONTRACT_HOMESAFETY}/pay/${contractId}`)
  }

  static updateContractFeeHomeSafety(contractId, contractInfo, buyerType = "P") {
    return HttpClient.put(
      `${API_UPDATE_CONTRACT_FEE}/${buyerType}/${contractId}`,
      contractInfo
    )
  }

  static updateContractHomeSafetyAndVTA(contract) {
    return HttpClient.put(`${API_UPDATE_PERSONAL_CONTRACTS}`, contract, { params: { isBackgroundRequest: true } })
  }

  static updateContractHomePrivate(contract) {
    return HttpClient.put(`${API_UPDATE_HOME_CONTRACTS}`, contract, { params: { isBackgroundRequest: true } })
  }

  static paymentConfirmHomeSafety(returnURL) {
    return HttpClient.post(
      `${API_CONTRACT_HOMESAFETY}/vnpay/confirm`,
      { returnURL },
      {isBackgroundRequest: true}
    )
  }

  static uploadFile(formData) {
    return HttpClient.post(`${API_UPLOAD_FORM}`, formData)
  }

  static uploadVehicleRegistrationFileOCR(formData, config) {
    return HttpClient.post(`${API_VEHICLE_REGISTRATION_OCR}`, formData, config)
  }

  static uploadVehicleInspectionFileOCR(formData, config) {
    return HttpClient.post(`${API_VEHICLE_INSPECTION_OCR}`, formData, config)
  }

  static uploadIdentificationFileOCR(formData, config) {
    return HttpClient.post(`${API_IDENTIFICATION_OCR}`, formData, config)
  }

  static updateContact(values) {
    return HttpClient.put(`${API_CREATE_CONTACT}`, values)
  }

  static createContact(values) {
    return HttpClient.post(`${API_CUSTOMER}`, values)
  }

  static completeContract(values) {
    return HttpClient.put(`${API_COMPLETE_CONTRACT}`, values)
  }

  static getAllVehicleContracts() {
    return HttpClient.get(`${API_ALL_VEHICLE_CONTRACTS}`)
  }

  static getAllPersonalContracts() {
    return HttpClient.get(`${API_ALL_PERSONAL_CONTRACTS}`)
  }

  static getAllHomeContracts() {
    return HttpClient.get(`${API_ALL_HOME_CONTRACTS}`)
  }

  static async getPrintedMatters(contractId, contractCode) {
    // const url = 'https://apidev.inon.vn/nth/file/api/file?contractId=49ae347a-cc4a-4248-8e95-9a18aa031e4f&docType=cert'
    const url = `${BaseAppConfigs.API_GET_FILE}?contractId=${contractId}&docType=cert`
    const res = await HttpClient.get(url, {
      headers: { 'Content-Type': 'application/pdf' },
      responseType: 'blob'
    })
    return new File([new Blob([res.data])], `${contractCode}.pdf`)
  }

  static getAllBanks() {
    return HttpClient.get(`${API_ALL_BANK}`, {
      params: { date: new Date().getMilliseconds() }
    })
  }

  static gettAllBanksCompanies() {
    return HttpClient.get(`${API_GET_BANK_COMPANY_AUTHENTICATE}`,
        {
            isBackgroundRequest: true
        })
}

  static getBeneficiaryByPrintedCertNo(printedCertNo) {
    return HttpClient.get(`${API_CHECK_GCENTITY}`, {
      params: {
        printedCertNo
      }
    })
  }

  // ======================= HOME PRIVATE ====================================

  static updateInsuranceHomePrivate = (contract, contractId) => {
    return HttpClient.put(
      `${API_CONTRACT_HOMEINSURANCE}/${contractId}`,
      contract
    )
  }

  static createContracteHomePrivate = (customer) => {
    return HttpClient.post(`${API_CONTRACT_HOMEINSURANCE}/FH`, customer)
  }

  static createInsuranceHomePrivate = (insurance) => {
    return HttpClient.post(`${API_CONTRACT_HOMEINSURANCE}`, insurance)
  }

  static feeInsuranceHomePrivate = (contractId) => {
    return HttpClient.get(`${API_FEE_INSURANCE_HOME_PRIVATE}/${contractId}`,
      {
        params: { uuid: BaseAppUltils.generateUUID() }
      })
  }

  static buyIsuranceHomePrivate = (isurance) => {
    return HttpClient.post(`${API_BUY_INSURANCE_HOME_PRIVATE}`, isurance)
  }

  static updateInsuranceList = (contractId, data) => {
    return HttpClient.put(
      `${API_UPDATE_INSURANCE_HOME_PRIVATE}/${contractId}`,
      data
    )
  }

  static updateCompanyInsuranceHomePrivate = (contractId, data) => {
    return HttpClient.put(`${API_UPDATE_COMPANY}/${contractId}`, data)
  }

  static payInsuranceHomePrivate = (contractId, companyId, paymenthod) => {
    return HttpClient.get(`${API_PAY_INSURANCES_HOME_PRIVATE}/${contractId}/${companyId}?paymentType=${paymenthod}`)
  }

  static updateContractIsuranceHomePrivate = (data) => {
    return HttpClient.put(`${API_UPDATE_CONTRACT_HOME_PRIVATE}`, data)
  }

  static getInfoContractHomePrivate = (id, companyId) => {
    return HttpClient.get(`${API_GET_INFO_CONTRACT_HOMEPRIVATE}?contractId=${id}&companyId=${companyId}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static confirmPayInsuranceHomePrivate = (returnURL) => {
    return HttpClient.post(
      `${API_PAY_HOME_PRIVATE_CONFIRM}`,
      { returnURL },
      {isBackgroundRequest: true}
    )
  }

  // ======================= VUNG TAM AN ====================================
  static createContractVTA(customers) {
    return HttpClient.post(`${API_CONTRACT_VTA}/VTA`, customers)
  }

  static updateContractVTA(contractId, customers) {
    return HttpClient.put(`${API_CONTRACT_VTA}/${contractId}`, customers)
  }

  static calculateInsuranceFeeVTA(contractId, type) {
    return HttpClient.get(`${API_CONTRACT_FEE_VTA}/${type === 'PERSONAL' ? 'personal' : 'group'}`, { params: { contractId, uuid: BaseAppUltils.generateUUID() } })
  }

  static updateContractFeeVTA(contractId, contractInfo) {
    return HttpClient.put(
      `${API_UPDATE_CONTRACT_FEE_VTA}`,
      { contractInfo },
      { params: contractId }
    )
  }

  static getBuyerAndBeneficiariesInfoVTA(contractId) {
    return HttpClient.get(`${API_GET_BUYER_BENEFICIARIES_VTA}`, { params: { contractId, uuid: BaseAppUltils.generateUUID() } })
  }

  static payContractVTA(contractId, paymentType) {
    return HttpClient.get(`${API_CONTRACT_PAYMENTS}/${contractId}`, { params: { paymentType } })
  }

  static confirmPayInsuranceVTA = (returnURL) => {
    return HttpClient.post(
      `${API_PAY_VTA_CONFIRM}`,
      { returnURL },
      {isBackgroundRequest: true}
    )
  }

  static confirmPayInsuranceBC = (returnURL) => {
    return HttpClient.post(
      `${'/nth/personalinsurance/api/contracts-hcac/vnpay/confirm'}`,
      { returnURL },
      {isBackgroundRequest: true}
    )
  }

  static updatePaymentMethodVTA(contractId, paymentType) {
    return HttpClient.put(`${API_UPDATE_PAY_METHOD_VTA}/${contractId}`, null, { params: { paymentType } })
  }
  static getConfigBHVC(id) {
    return HttpClient.get(`${API_GET_CONFIG_BHVC}/${id}`)
  }
}

const updateContractEffectiveDate = (insurances) => {
  return insurances.map((insurance) => {
    const startValueDate = moment(insurance.startValueDate).format(
      DATE_TIME_ZONE_FORMAT
    )
    const endValueDate = moment(insurance.endValueDate).format(
      DATE_TIME_ZONE_FORMAT
    )
    return { ...insurance, startValueDate, endValueDate }
  })
}

