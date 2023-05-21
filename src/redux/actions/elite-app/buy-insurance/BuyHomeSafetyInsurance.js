import { BuyInsuranceService } from '../../../../services/elite-app/buyInsurance'
import { getTotalFeeVAT } from '../../../../ultity'
import {
  ACTION_SAVE_CONTRACT,
  ACTION_SAVE_STEP_DATA,
  actionNextStep,
} from './BuyInsuranceStep'

export const actionHomeSafetyNextStep2 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, type, refId } = await getState().app.buyInsurance
    let customerRes
    if (contract && contract.id) {
      customerRes = await BuyInsuranceService.updateContractOwner(getCustomerFromStepData(stepData, refId), contract.id)
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: {
            ...customerRes.data,
            baseFee: contract.baseFee,
            insuranceMoney: contract.insuranceMoney,
            insurances: contract.insurances,
            ownerId: customerRes.data.ownerId
          }
        }
      })
    }
    else {
      customerRes = await BuyInsuranceService.createContractHomeSafety(getCustomerFromStepData(stepData, refId))
      if (customerRes.status !== 200 || !customerRes.data) {
        return
      }
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: { contract: { ...contract, ...customerRes.data, ...customerRes.data.ownerId } }
      })
    }
    dispatch(actionNextStep())
  }
}

export const actionHomeSafetyNextStep3 = (stepData) => {
  return async (dispatch, getState) => {

    const { contract } = await getState().app.buyInsurance
    let customerRes;

    if (stepData && stepData.id) {
      customerRes = await BuyInsuranceService.updateBeneficiary(getListCustomerFromStepData(stepData, true), contract?.id)
      if (!customerRes || customerRes.status !== 200) {
        return
      }
    } else {
      customerRes = await BuyInsuranceService.createBeneficiary(getListCustomerFromStepData(stepData, false), contract?.id)
      if (!customerRes || customerRes.status !== 200) {
        return
      }
    }
    const customers = getStepDataFromListCustomer(customerRes?.data?.beneficiaries, stepData)
    dispatch({ type: ACTION_SAVE_STEP_DATA, payload: { step: '2', data: customers } })

    // update insurances
    let insurances = contract.insurances
    insurances.forEach(item => item.value = contract?.baseFee)
    insurances.forEach(item => item.liability = contract?.insuranceMoney * 1000000)
    const insurancesRes = await BuyInsuranceService.updateInsurancesHomeSafety(insurances)
    if (!insurancesRes || insurancesRes.status !== 200) return

    const insurancesFee = await BuyInsuranceService.calculateInsuranceFeeHomeSafety(contract?.id)
    if (!insurancesFee || insurancesFee.status !== 200) return

    const theFistDataFeeInfo = insurancesFee.data[0]
    const _totalFeeVAT = getTotalFeeVAT(theFistDataFeeInfo, "ATM")
    const updateContractFee = await BuyInsuranceService.updateContractFeeHomeSafety(
      contract?.id, { totalFeeVAT: _totalFeeVAT, companyId: theFistDataFeeInfo?.companyId, paymentType: "ATM" }
    )
    if (!updateContractFee || updateContractFee.status !== 200) return

    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: {
        contract: { ...contract, contractCode: updateContractFee?.data?.contractCode },
        feeDetails: insurancesFee?.data
      }
    })

    dispatch(actionNextStep())
  }
}

export const actionHomeSafetyNextStep4 = () => {
  return async (dispatch, getState) => {
    const { contract, paymentMethod } = getState().app.buyInsurance
    let insurances = [...contract.insurances]
    insurances.forEach(item => item.paymentType = paymentMethod)
    const insurancesRes = await BuyInsuranceService.updateInsurancesHomeSafety(insurances)
    if (insurancesRes.status !== 200 && !insurancesRes.data) return

    const res = await BuyInsuranceService.payContractHomeSafety(contract.id)
    if (res.status !== 200 || !res.data) {
      return
    }
    window.location.replace(res.data.url)
  }
}

// ================ Private method ===================================================================

const getListCustomerFromStepData = (stepData, updateFlag) => {
  let customers = []
  const moreInsured = stepData.moreInsured.map(item => {
    let itemAlt = { ...item }
    delete itemAlt.insuranceForm
    delete itemAlt.numberGCN
    if (!updateFlag) delete itemAlt.id
    itemAlt.isBuyer = false
    return itemAlt
  })

  const customer = { ...stepData }
  delete customer.moreInsured
  delete customer.insuranceForm
  delete customer.numberGCN
  if (!updateFlag) {
    delete customer.id
    customer.relationship = "SELF"
  }
  customer.isBuyer = false
  customers.push(customer)

  return [...customers, ...moreInsured]
}

const getStepDataFromListCustomer = (customerRes, stepData) => {
  let stepDataAlt
  stepDataAlt = { ...customerRes[0], ...stepData, id: customerRes[0]?.id }
  stepDataAlt.moreInsured.forEach((item, index) => item.id = customerRes[index + 1]?.id)
  const moreInsured = stepData.moreInsured.map((item, index) => {
    return { ...customerRes[index + 1], ...item }
  }
  )
  stepDataAlt = { ...stepDataAlt, moreInsured: moreInsured }
  return stepDataAlt
}

const getCustomerFromStepData = (stepData, refId) => {
  return {
    addresses: [{
      city: stepData.cityName,
      detail: stepData.address,
      district: stepData.districtName,
      type: 'HOME',
      ward: stepData.wardName
    }],
    icType: stepData.icType,
    icNo: stepData.icNo,
    email: stepData.email,
    fullName: stepData.ownerName,
    phoneNumber: stepData.phoneNumber,
    address: stepData.address,
    type: 'GUEST',
    isBuyer: stepData.isBuyer,
    refId
  }
}
