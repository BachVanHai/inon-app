import { BuyInsuranceService } from '../../../../services/elite-app/buyInsurance'
import { ACTION_SAVE_CONTRACT, actionNextStep } from './BuyInsuranceStep'

export const actionVtaNextStep2 = (stepData) => {
  return async (dispatch, getState) => {
    dispatch(actionNextStep())
  }
}

export const actionVTANextStep3 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, type, refId  } = await getState().app.buyInsurance
    let contractRes
    if (contract && contract.id) {
      contractRes = await BuyInsuranceService.updateContractVTA(contract.id, getListCustomerFromStepData(stepData, refId, true, contract))
    } else {
      contractRes = await BuyInsuranceService.createContractVTA(getListCustomerFromStepData(stepData, refId ))
    }
    if (contractRes.status !== 200 || !contractRes.data) {
      return
    }
    const insurancesFee = await BuyInsuranceService.calculateInsuranceFeeVTA(contractRes.data.id, stepData.insuranceType)
    if (!insurancesFee || insurancesFee.status !== 200) return

    const insurances = [...insurancesFee.data.insurances]
    const feeDetails = { ...insurancesFee.data }
    delete feeDetails.insurances
    const buyerAndBeneficiariesInfo = await BuyInsuranceService.getBuyerAndBeneficiariesInfoVTA(contractRes.data.id)
    if (!buyerAndBeneficiariesInfo || buyerAndBeneficiariesInfo.status !== 200) return
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: {
        contract: {
          ...contract, ...contractRes.data, ...contractRes.data.ownerId,
          buyerInfo: buyerAndBeneficiariesInfo.data.buyers[0].buyer,
          beneficiariesInfo: buyerAndBeneficiariesInfo.data.beneficiaries,
          insurances
        },
        feeDetails: feeDetails
      }
    })
    dispatch(actionNextStep())

  }
}

export const actionVTANextStep4 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, paymentMethod } = getState().app.buyInsurance
    const res = await BuyInsuranceService.payContractVTA(contract.id, paymentMethod)
    if (res.status !== 200 || !res.data) {
      return
    }
    window.location.replace(res.data.url)
  }
}
const getListCustomerFromStepData = (stepData, refId, updateFlag, contract) => {
  const data = []
  const buyerInfo = {
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
    fullName: stepData.fullName,
    phoneNumber: stepData.phoneNumber,
    address: stepData.address,
    isBuyer: true
  }
  if (updateFlag) buyerInfo.id = contract.buyerInfo.id

  data.push(buyerInfo)

  const moreInsured = stepData.moreInsured.map((item, index) => {
    const itemAlt = {
      addresses: [{
        city: item.cityName,
        detail: item.address,
        district: item.districtName,
        type: 'HOME',
        ward: item.wardName
      }],
      icType: item.icType,
      icNo: item.icNo,
      email: item.email,
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      address: item.address,
      isBuyer: false,
      duration: item.duration,
      packageName: item.packageName,
      relationship: item.buyerRelation,
      gender: item.gender,
      dateOfBirth: item.dateOfBirth
    }
    if (updateFlag){
      if(contract.beneficiariesInfo[index]) {
        itemAlt.id = contract.beneficiariesInfo[index].beneficiaryId
        itemAlt.idInsurance = contract.beneficiariesInfo[index].idInsurance
      }
      else itemAlt.id = null

    }
    return itemAlt
  })
  return [...data, ...moreInsured]
}
