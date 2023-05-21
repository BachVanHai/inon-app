import { showConfirmAlert } from 'base-app'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  getKeyLang,
  INSURANCE_SETTING_DEFAULTS,
  INSURANCE_TYPES,
  MAIN_ADDITIONAL_TERMS
} from '../../../../configs/elite-app'
import { history } from '../../../../history'
import { BuyInsuranceService } from '../../../../services/elite-app/buyInsurance'
import {
  ACTION_BUY_NEW,
  ACTION_CONFIRM_PAYMENT,
  ACTION_SAVE_CONTRACT,
  ACTION_SAVE_VEHICLE,
  actionResetStepData
} from './BuyInsuranceStep'
import { actionNextStep } from '../contract-management/ContractManagement'
import { convertStrToNumber, isObjEmpty } from '../../../../ultity'
import { resetState } from '../../insurance-app/buyInsurancesHealthCare'
import { NAME_BUY_INSURANCES_HEALTH_CARE } from '../../../../configs/insurance-app'


export const actionCarNextStep2 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, vehicle, type, refId } = await getState().app.buyInsurance
    if (contract && contract.id) {
      let customer = getCustomerFromStepData(stepData)
      customer.id = contract.ownerId
      const customerRes = await BuyInsuranceService.updateCustomer(customer)
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }

      const vehicleRes = await BuyInsuranceService.updateVehicle(
        getVehicleFromStepData(stepData, contract.id, vehicle.id)
      )
      if (vehicleRes.status !== 200 || !vehicleRes.data) {
        return
      }

      let insurances = contract.insurances
      let insuranceCarPeople = insurances.find(
        (item) =>
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
      )
      if (stepData.seats) {
        insuranceCarPeople.count1 = stepData.seats
      }
      let insuranceCarGood = insurances.find(
        (item) =>
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
      )
      if (stepData.loads) {
        insuranceCarGood.count1 = stepData.loads
      }
      const insuranceCarPeopleIdx = insurances.findIndex(
        (item) =>
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
      )
      if (insuranceCarPeopleIdx) {
        insurances[insuranceCarPeopleIdx] = insuranceCarPeople
      }
      const insuranceCarGoodIdx = insurances.findIndex(
        (item) =>
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
      )
      if (insuranceCarGoodIdx) {
        insurances[insuranceCarGoodIdx] = insuranceCarGood
      }
      const ownerId = contract.ownerId
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: { ...contract, ownerId, insurances },
          vehicle: vehicleRes.data
        }
      })
    } else {
      const customerRes = await BuyInsuranceService.createCustomer(
        getCustomerFromStepData(stepData)
      )
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }

      const ownerId = customerRes.data.id
      const contractRes = await BuyInsuranceService.createContract(
        getContractFromStepData(stepData, ownerId, refId)
      )
      if (contractRes.status !== 200 || !contractRes.data) {
        return
      }

      // Enable default insurance
      contractRes.data.insurances = contractRes.data.insurances.map((item) => {
        if (
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
        ) {
          item.isEnable =
            stepData.capacityType === 'ALL' || stepData.capacityType === 'SEAT'
        } else if (
          item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
        ) {
          item.isEnable =
            stepData.capacityType === 'ALL' || stepData.capacityType === 'LOAD'
        } else {
          item.isEnable = true
        }
        return item
      })
      const vehicleRes = await BuyInsuranceService.createVehicle(
        getVehicleFromStepData(stepData, contractRes.data.id)
      )
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: { ...contractRes.data, ownerId },
          vehicle: vehicleRes.data
        }
      })
    }
    // Calculate Fee Default
    if (type !== INSURANCE_TYPES.TD) {
      dispatch(actionCalculationCarInsuranceFeeDefault())
    } else {
      dispatch(actionLoadCarInsuranceDefaultSetting())
    }
  }
}

export const actionCarNextStep3 = (customer, transferBeneficiariesData) => {
  return async (dispatch, getState) => {
    if (customer) {
      const customerRes = await BuyInsuranceService.createCustomer(customer)
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }
      const transferBeneficiaries = {
        beneficiaryId: customerRes.id,
        benefitValue: transferBeneficiariesData.benefitValue,
        id: transferBeneficiariesData.id,
        ownerId: transferBeneficiariesData.ownerId
      }
      const contractRes = await BuyInsuranceService.updateContract(
        transferBeneficiaries
      )
      if (contractRes.status !== 200 || !contractRes.data) {
        return
      }
    }

    let { contract, feeDetails } = getState().app.buyInsurance
    const { companyId } = feeDetails.find((item) => item.isSelected) || {}

    const insurancesRes = await Promise.all([
      BuyInsuranceService.updateInsurances(contract.insurances),
      BuyInsuranceService.updateInsuranceAddons(contract.insuranceAddons)
    ])
    if (insurancesRes[0].status !== 200 || insurancesRes[1].status !== 200) {
      return
    }
    const salerId = getState().auth?.guest?.user?.id
    const calcFeeRes = await BuyInsuranceService.calculateInsuranceFee(
      contract.id
    )
    const contractRes = await BuyInsuranceService.updateContract({
      id: contract.id,
      companyId,
      salerId
    })
    if (contractRes.status !== 200 || !contractRes.data) {
      return
    }
    const { insurances, insuranceAddons, ...newContractData } = contractRes.data
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: {
        contract: { ...contract, ...newContractData },
        feeDetails: getFeeDetails(calcFeeRes?.data || feeDetails, feeDetails)
      }
    })
    dispatch(actionNextStep())
  }
}

export const actionCarNextStep4 = () => {
  return async (dispatch, getState) => {
    const { contract, paymentMethod } = getState().app.buyInsurance
    const res = await BuyInsuranceService.payContract(contract.id, {
      paymentType: paymentMethod
    })
    if (res.status !== 200 || !res.data) {
      return
    }
    window.location.replace(res.data.url)
  }
}

export const actionCompleteCarContract = (values, isBackHome, authToken) => {
  return async (dispatch, getState) => {
    const { paymentStatus } = getState().app.buyInsurance
    const { contract } = getState().app.buyInsurance
    if (paymentStatus === 'SUCCESS') {
      if (
        values &&
        (values['exportInvoiceType'] === 'PERSONAL' ||
          values.exportInvoiceType === 'ORGANIZATION')
      ) {
        let icType
        if (values.exportInvoiceType === 'ORGANIZATION') {
          icType = 'MST'
        } else {
          icType = values.icType
        }
        const info = {
          icType: icType,
          icNo: values.icNumber,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          addresses: [
            {
              detail: values.address,
              type: 'HOME',
              city: '1',
              district: '1',
              ward: '1'
            }
          ],
          type: values['exportInvoiceType'] === 'PERSONAL' ? 'INV' : 'ORG'
        }
        const resComplete = await BuyInsuranceService.createContact(info)
        if (!resComplete || resComplete.status !== 200) {
          return
        }
        const contract1 = {
          id: contract.id,
          taxInvoiceType:
            values['exportInvoiceType'] === 'PERSONAL'
              ? 'OTHER_INV'
              : 'OTHER_ORG',
          taxInvoiceReceiverId: resComplete?.data.id
        }
        const resCompleteContract = await BuyInsuranceService.completeContract(
          contract1
        )
        if (!resCompleteContract || resCompleteContract.status !== 200) {
          return
        }
      } else if (values && values['exportInvoiceType'] === 'OWNER') {
        const info = {
          id: contract.ownerId,
          icType: values.icType,
          icNo: values.icNumber,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          addresses: [
            {
              detail: values.address,
              type: 'OTHER',
              city: '1',
              district: '1',
              ward: '1'
            }
          ]
        }
        const resComplete = await BuyInsuranceService.updateContact(info)
        if (!resComplete || resComplete.status !== 200) {
          return
        }
        const contract1 = {
          id: contract.id,
          taxInvoiceType: values['exportInvoiceType'],
          taxInvoiceReceiverId: resComplete?.data.id
        }
        const resCompleteContract = await BuyInsuranceService.completeContract(
          contract1
        )
        if (!resCompleteContract || resCompleteContract.status !== 200) {
          return
        }
      }

      dispatch(actionResetStepData())
      if (isBackHome) {
        // Check if you are logged in or not
        if (!authToken) {
          history.push('/login')
        } else history.push('/home')
      } else {
        dispatch({ type: ACTION_BUY_NEW })
      }
    }
  }
}

export const actionConfirmPayment = () => {
  return async (dispatch, getState) => {
    const { type, contract } = getState().app.buyInsurance
    let res
    if (type === 'homesafety') {
      res = await BuyInsuranceService.paymentConfirmHomeSafety(
        window.location.href
      )
    } else if (type === 'homeprivate') {
      res = await BuyInsuranceService.confirmPayInsuranceHomePrivate(
        window.location.href
      )
    } else if (type === 'vta') {
      res = await BuyInsuranceService.confirmPayInsuranceVTA(
        window.location.href
      )
    }  else if (type === 'bc') {
      res = await BuyInsuranceService.confirmPayInsuranceBC(
        window.location.href
      )
    } else {
      res = await BuyInsuranceService.paymentConfirm(window.location.href)
    }

    if (res.status !== 200 || !res.data) {
      history.push('/')
      return
    }
    let status
    if (res.data.RspCode === '00') {
      status = 'SUCCESS'
      if (!getState().auth?.guest?.authToken) {
        // Save contract id
        saveContractIds(contract.id, type)
      }
    } else if (res.data.RspCode === '99') {
      status = 'TIMEOUT'
    } else {
      status = 'FAIL'
    }
    dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: status })
    history.push(`/buy-insurance/${type}`)
  }
}

export const actionCalculationCarInsuranceFeeDefault = () => {
  return async (dispatch, getState) => {
    const { contract, type, stepData, vehicle } = getState().app.buyInsurance
    let { insurances, insuranceAddons } = getDefaultCarInsuranceFee(
      contract,
      stepData,
      type
    )

    insurances = updateInsuranceEffectiveDate(insurances)

    const insurancesRes = await Promise.all([
      BuyInsuranceService.updateInsurances(insurances),
      BuyInsuranceService.updateInsuranceAddons(insuranceAddons)
    ])
    if (insurancesRes[0].status !== 200 || insurancesRes[1].status !== 200) {
      return
    }
    const calcFeeRes = await BuyInsuranceService.calculateInsuranceFee(
      contract.id
    )
    if (calcFeeRes.status !== 200) {
      return
    }
    contract.insurances = insurances.map((insurance) => {
      insurance.isEnable =
        getInsuranceBuyAbleByInsuranceType(type).indexOf(
          insurance.insuranceCode
        ) >= 0
      if (
        insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
      ) {
        insurance.liability1 =
          INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.liability1
        insurance.isEnable =
          vehicle.vehicleType.capacityType === 'SEAT' ||
          vehicle.vehicleType.capacityType === 'ALL'
      }
      if (
        insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
      ) {
        insurance.liability1 = INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.liability1
        insurance.isEnable =
          vehicle.vehicleType.capacityType === 'LOAD' ||
          vehicle.vehicleType.capacityType === 'ALL'
      }
      return insurance
    })

    contract.insuranceAddons.sort(
      (a, b) =>
        MAIN_ADDITIONAL_TERMS.indexOf(a.addonCode) -
        MAIN_ADDITIONAL_TERMS.indexOf(b.addonCode)
    )
    contract.insuranceAddons = [...contract.insuranceAddons].map(
      (item, index) => {
        item.isEnable = index < 5
        return item
      }
    )

    const feeDetails = getFeeDetails(calcFeeRes.data)
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: { contract: { ...contract }, feeDetails }
    })
    dispatch(actionNextStep())
  }
}

export const actionLoadCarInsuranceDefaultSetting = () => {
  return async (dispatch, getState) => {
    const { contract, stepData } = getState().app.buyInsurance
    const carPeople = contract.insurances.find(
      (item) =>
        item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
    )
    const carGoods = contract.insurances.find(
      (item) =>
        item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
    )

    carPeople.count1 = carPeople.count1 || stepData[1]?.seats
    carGoods.count1 = carGoods.count1 || stepData[1]?.loads
    carGoods.liability1 = carGoods.liability1 || 10000000
    carPeople.liability1 = carPeople.liability1 || 10000000

    contract.insurances = updateInsuranceEffectiveDate(contract.insurances)

    contract.insuranceAddons.sort(
      (a, b) =>
        MAIN_ADDITIONAL_TERMS.indexOf(a.addonCode) -
        MAIN_ADDITIONAL_TERMS.indexOf(b.addonCode)
    )
    contract.insuranceAddons = contract.insuranceAddons.map((item, index) => {
      item.isEnable = index < 5
      return item
    })
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: { contract: { ...contract } }
    })
    dispatch(actionNextStep())
  }
}

// ======================= MOTOR Action ====================================

export const actionMotorNextStep2 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, vehicle, refId } = getState().app.buyInsurance
    if (contract && contract.id) {
      const vehicleRes = await BuyInsuranceService.updateVehicle(
        getVehicleFromStepData(stepData, contract.id, vehicle.id)
      )
      if (vehicleRes.status !== 200 || !vehicleRes.data) {
        return
      }
      dispatch({ type: ACTION_SAVE_VEHICLE, payload: vehicleRes.data })
    } else {
      const customerRes = await BuyInsuranceService.createCustomer(
        getCustomerFromStepData(stepData)
      )
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }
      const ownerId = customerRes.data.id
      const contractRes = await BuyInsuranceService.createContract(
        getContractFromStepData(stepData, customerRes.data.id, refId)
      )
      if (contractRes.status !== 200 || !contractRes.data) {
        return
      }
      // Enable default insurance

      contractRes.data.insurances = contractRes.data.insurances.map((item) => {
        item.isEnable = true
        stepData.vehicleType === 21 ? (item.count1 = 3) : (item.count1 = 2)
        return item
      })
      const vehicleRes = await BuyInsuranceService.createVehicle(
        getVehicleFromStepData(stepData, contractRes.data.id)
      )
      const {
        insurances
      } = getDefaultMotorInsuranceFee(contractRes.data)
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: { ...contractRes.data, ownerId, insurances },
          vehicle: vehicleRes.data
        }
      })
    }
    dispatch(actionCalculationMotorInsuranceFee())
    dispatch(actionNextStep())
  }
}

export const actionCalculationMotorInsuranceFee = () => {
  return async (dispatch, getState) => {
    const { contract } = getState().app.buyInsurance

    const insurancesRes = await BuyInsuranceService.updateInsurances(contract.insurances)
    if (insurancesRes.status !== 200) {
      return
    }
    const calcFeeRes = await BuyInsuranceService.calculateInsuranceFee(
      contract.id
    )
    if (calcFeeRes.status !== 200) {
      return
    }
    const feeDetails = getFeeMotorDetails(calcFeeRes.data)
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: { contract: { ...contract }, feeDetails }
    })
  }
}

const getDefaultMotorInsuranceFee = (contract) => {
  let insurances = contract.insurances.map((item) => {
    let newItem
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.MOTOR_TNDS.key) {
      newItem = {
        ...item,
        ...INSURANCE_SETTING_DEFAULTS.MOTOR_TNDS,
        isEnable: true
      }
    }
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.MOTOR_CONNGUOI.key) {
      newItem = {
        ...item,
        ...INSURANCE_SETTING_DEFAULTS.MOTOR_CONNGUOI,
        isEnable: true
      }
    }
    return newItem
  })
  insurances = updateInsuranceEffectiveDate(insurances)
  return { insurances }
}

const getFeeMotorDetails = (feeDetails) => {
  return feeDetails.map((item, index) => {
    const fee = {
      ...item,
      isSelected: index === 0,
      details: {
        MOTOR_TNDS: item.MOTOR_TNDS,
        MOTOR_CONNGUOI: item.MOTOR_CONNGUOI
      }
    }
    return fee
  })
}

export const actionMotorNextStep3 = () => {
  return async (dispatch, getState) => {
    const { contract, feeDetails } = getState().app.buyInsurance
    const { companyId } = feeDetails.find((item) => item.isSelected) || {}
    const insurancesRes = await BuyInsuranceService.updateInsurances(
      contract.insurances
    )
    if (insurancesRes.status !== 200) {
      return
    }
    const calcFeeRes = await BuyInsuranceService.calculateInsuranceFee(
      contract.id
    )
    const salerId = getState().auth?.guest.user?.id
    const contractRes = await BuyInsuranceService.updateContract({
      id: contract.id,
      companyId,
      salerId
    })
    if (contractRes.status !== 200 || !contractRes.data) {
      return
    }
    const { insurances, ...newContractData } = contractRes.data
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: {
        contract: { ...contract, ...newContractData },
        feeDetails: getMotorFeeDetails(calcFeeRes?.data || feeDetails, feeDetails)
      }
    })
    dispatch(actionNextStep())
  }
}

export const actionResetContractCompanyId = () => {
  return async (dispatch, getState) => {
    const { contract } = getState().app.buyInsurance
    await BuyInsuranceService.updateContractCompany({ id: contract.id, companyId: null })
  }
}

export const actionSaveFeeDetails = (feeDetails) => {
  return (dispatch, getState) => {
    let { contract } = getState().app.buyInsurance

    dispatch({ type: ACTION_SAVE_CONTRACT, payload: { contract, feeDetails } })
  }
}

const getMotorFeeDetails = (data, feeDetails) => {

  let feeDetail
  if (feeDetails) {
    feeDetail = feeDetails.find(item => item.isSelected)
  }

  return data.map((item, index) => {

    const itemAlt = { ...item }
    if (feeDetail) {
      item['MOTOR_CONNGUOI'] = feeDetail['MOTOR_CONNGUOI']
    }

    const fee = {
      ...item,
      isSelected: feeDetail ? feeDetail.companyId === item.companyId : index === 0,
      details: {
        MOTOR_TNDS: itemAlt.MOTOR_TNDS,
        MOTOR_CONNGUOI: itemAlt.MOTOR_CONNGUOI
      }
    }
    return fee
  })
}

export const actionMotorNextStep4 = () => {
  return async (dispatch, getState) => {
    const { contract, paymentMethod } = getState().app.buyInsurance
    const res = await BuyInsuranceService.payContract(contract.id, {
      paymentType: paymentMethod
    })
    if (res.status !== 200 || !res.data) {
      return
    }
    window.location.replace(res.data.url)
  }
}

// =================================== Others Actions ==========================================================================

export const actionCalculationInsuranceFee = () => {
  return async (dispatch, getState) => {
    const { contract } = getState().app.buyInsurance
    const insurancesRes = await Promise.all([
      BuyInsuranceService.updateInsurances(contract.insurances),
      BuyInsuranceService.updateInsuranceAddons(contract.insuranceAddons)
    ])
    if (insurancesRes[0].status !== 200 || insurancesRes[1].status !== 200) {
      return
    }
    const calcFeeRes = await BuyInsuranceService.calculateInsuranceFee(
      contract.id
    )
    if (calcFeeRes.status !== 200) {
      return
    }
    const feeDetails = getFeeDetails(calcFeeRes.data)
    dispatch({ type: ACTION_SAVE_CONTRACT, payload: { feeDetails } })
  }
}

export const actionMapUserIdForContract = () => {
  return async (dispatch, getState) => {
    let contractIds = JSON.parse(localStorage.getItem('contractIds'))
    const { authToken } = getState().auth?.guest
    if (!contractIds || !authToken) {
      return
    }
    const salerId = getState().auth?.guest.user?.id
    for (const item of contractIds) {
      let contractRes
      if (['homesafety', 'vta'].includes(item.contractType)) {
        contractRes = await BuyInsuranceService.updateContractHomeSafetyAndVTA(
          { id: item.id, salerId, latestApprovalStatus: 'FINISH' }
        )
      } else if (item.contractType === 'homeprivate') {
        contractRes = await BuyInsuranceService.updateContractHomePrivate(
          { id: item.id, salerId, latestApprovalStatus: 'FINISH' }
        )
      } else {
        contractRes = await BuyInsuranceService.updateContract({
          id: item.id,
          salerId,
          latestApprovalStatus: 'FINISH'
        })
      }
      if (!contractRes || contractRes.status !== 200) {
        return
      }
      contractIds = contractIds.filter((i) => i.id !== item.id)
    }
    localStorage.setItem('contractIds', JSON.stringify(contractIds))
  }
}

export const actionCheckPendingContract = (insuranceType, onCancel) => {
  return async (dispatch, getState) => {
    const { type, activeStep } = getState().app.buyInsurance
    if (
      !window.location.href.includes(`/buy-insurance/${type}`) &&
      !window.location.href.includes('/vnpayreturn') &&
      activeStep > 0
    ) {
      dispatch(
        showConfirmAlert({
          title: (
            <FormattedMessage id={getKeyLang('insurance.pendingContract')} />
          ),
          isShow: true,
          cancelBtnText: (
            <FormattedMessage
              id={getKeyLang('insurance.pendingContract.cancel')}
            />
          ),
          confirmBtnText: (
            <FormattedMessage
              id={getKeyLang('insurance.pendingContract.continue')}
            />
          ),
          content: (
            <FormattedMessage
              id={getKeyLang('insurance.pendingContract.info')}
            />
          ),
          onCancel: () => {
            dispatch(actionResetStepData())
            if (onCancel) {
              onCancel()
              if (type === 'bc') {
                dispatch(resetState())
              }
            }
          },
          onConfirm: () => {
            history.push(`/buy-insurance/${type || insuranceType}`)
          }
        })
      )
    } else {
      if (onCancel) {
        onCancel()
      }
    }
  }
}

// ================ Private method ===================================================================
const getDefaultCarInsuranceFee = (contract, stepData, type) => {
  const currentDate = new Date()
  const startValueDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 12)
  const endValueDate = new Date(currentDate)

  const insurances = contract.insurances.map((item) => {
    let newItem = {}
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN.key) {
      newItem = {
        ...item,
        ...INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN,
        startValueDate,
        endValueDate,
        isEnable: type !== INSURANCE_TYPES.BHVC
      }
    }
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key) {
      newItem = {
        ...item,
        ...INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI,
        startValueDate,
        endValueDate,
        count1: stepData[1]?.seats,
        isEnable:
          stepData[1]?.capacityType === 'SEAT' ||
          stepData[1]?.capacityType === 'ALL'
      }
    }
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key) {
      newItem = {
        ...item,
        ...INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA,
        startValueDate,
        endValueDate,
        count1: stepData[1]?.loads,
        isEnable:
          stepData[1]?.capacityType === 'LOAD' ||
          stepData[1]?.capacityType === 'ALL'
      }
    }
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key) {
      newItem = {
        ...item,
        startValueDate,
        endValueDate,
        isEnable: type !== INSURANCE_TYPES.TNDS
      }
    }
    if (item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key) {
      newItem = {
        ...item,
        startValueDate,
        endValueDate,
        isEnable: type !== INSURANCE_TYPES.BHVC
      }
    }
    return newItem
  })
  contract.insuranceAddons.sort(
    (a, b) =>
      MAIN_ADDITIONAL_TERMS.indexOf(a.addonCode) -
      MAIN_ADDITIONAL_TERMS.indexOf(b.addonCode)
  )
  const insuranceAddons = contract.insuranceAddons.map((item, index) => {
    item.isEnable = type !== INSURANCE_TYPES.TNDS && index < 5
    return item
  })
  return { insurances, insuranceAddons }
}

const getCustomerFromStepData = (stepData, refId) => {
  return {
    addresses: [
      {
        city: stepData.cityName,
        detail: stepData.address,
        district: stepData.districtName,
        type: 'HOME',
        ward: stepData.wardName
      }
    ],
    email: stepData.email,
    fullName: stepData.ownerName,
    phoneNumber: stepData.phoneNumber,
    type: 'GUEST',
    isBuyer: stepData.isBuyer,
    refId
  }
}

const getContractFromStepData = (stepData, ownerId, refId) => {
  return {
    refId,
    contractValue: convertStrToNumber(stepData?.requireVehicle),
    contractType: stepData?.contractType,
    vehicleValue: convertStrToNumber(stepData?.initValue),
    ownerId: ownerId
  }
}

const getVehicleFromStepData = (stepData, contractId, id = null) => {
  return {
    id: id || undefined,
    brandName: stepData.brandName || undefined,
    contractId: contractId || undefined,
    contractValue: stepData.requireVehicle
      ? convertStrToNumber(stepData.requireVehicle)
      : undefined,
    frameNo: stepData.frameNo || undefined,
    initValue: stepData.initValue
      ? convertStrToNumber(stepData.initValue)
      : undefined,
    issDate: stepData.issDate || undefined,
    issPlace: stepData.issPlace || undefined,
    loads: stepData.loads || undefined,
    machineNo: stepData.machineNo || undefined,
    manufacturerName: stepData.manufacturerName || undefined,
    numberPlate: stepData.numberPlate || undefined,
    seats: stepData.seats || undefined,
    usage: stepData.usage || undefined,
    vehicleStatus: stepData.vehicleStatus || 'NEW',
    vehicleTypeId: stepData.vehicleType || undefined
  }
}

const getFeeDetails = (data, feeDetails) => {
  let selectedCompany
  if (feeDetails) {
    selectedCompany = feeDetails.find(item => item.isSelected)
  }
  return data.map((item, index) => {
    return {
      ...item,
      isSelected: selectedCompany ? selectedCompany.companyId === item.companyId : index === 0,
      details: {
        CAR_CONNGUOI: item.CAR_CONNGUOI,
        CAR_HANGHOA: item.CAR_HANGHOA,
        CAR_TNDS: item.CAR_TNDS,
        CAR_VATCHAT: item.CAR_VATCHAT,
        CAR_TNDS_TN: item.CAR_TNDS_TN?.value1 + item.CAR_TNDS_TN?.value2 + item.CAR_TNDS_TN?.value3
      }
    }
  })
}

const getInsuranceBuyAbleByInsuranceType = (insuranceType) => {
  switch (insuranceType) {
    case 'bhvc':
      return [
        INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key,
        INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key,
        INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
      ]
    case 'tnds':
      return [
        INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key,
        INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN.key,
        INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key,
        INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
      ]
    case 'bhvc-tnds':
    case 'td':
      return [
        INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key,
        INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN.key,
        INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key,
        INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key,
        INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
      ]
    case 'motor':
      return []
    case 'homeprivate':
      return []
  }
}

const saveContractIds = (id, contractType) => {

  let contractIds = JSON.parse(localStorage.getItem('contractIds'))
  if (!contractIds) {
    contractIds = []
  }
  contractIds.push({ id, contractType })
  localStorage.setItem('contractIds', JSON.stringify(contractIds))
}

const updateInsuranceEffectiveDate = (insurances) => {
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
