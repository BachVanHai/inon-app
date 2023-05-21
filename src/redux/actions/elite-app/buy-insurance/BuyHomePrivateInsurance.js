import { BuyInsuranceService } from '../../../../services/elite-app/buyInsurance'
import { ACTION_SAVE_CONTRACT, actionNextStep } from './BuyInsuranceStep'
import * as moment from 'moment'

export const actionHomePrivateNextStep2 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract } = await getState().app.buyInsurance
    const TODAY = moment().utc().format(`YYYY-MM-DD ${moment().format("H:mm")}`)
    const bankRes = await BuyInsuranceService.getAllBanks()
    const salerId = getState().auth?.guest.user?.id

    if (contract && contract.id) {
      const contractResHome = await BuyInsuranceService.updateContractIsuranceHomePrivate(
        getInsuranceHomePrivate(
          stepData,
          contract.id,
          contract.insurances[0].id,
          salerId
        )
      )
      if (contractResHome.status !== 200 || !contractResHome.data) {
        return
      }
      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: {
            ...contractResHome.data,
            insurances: contract.insurances,
          }
        }
      })
    } else {

      const contractResHome = await BuyInsuranceService.createContracteHomePrivate(
        getInsuranceHomePrivate(stepData, null, null, salerId)
      )
      if (contractResHome.status !== 201 || !contractResHome.data) {
        return
      }
      const contractRes = await BuyInsuranceService.updateInsuranceList(
        contractResHome.data.id,
        getDataUpdateInsurances()
      )
      if (contractRes.status !== 200 || !contractRes.data) {
        return
      }
      const feeRes = await BuyInsuranceService.feeInsuranceHomePrivate(
        contractResHome.data.id
      )
      if (feeRes.status !== 200 || !feeRes.data[0]) {
        return
      }
      contractResHome.data.insurances[0] = contractRes.data[0]
      contractResHome.data.insurances[0].startValueDate = moment(TODAY).toDate()
      contractResHome.data.insurances[0].endDate = moment(TODAY).toDate()
      contractResHome.data.insurances[0].minStartValueDate = moment(TODAY).toDate()
      contractResHome.data.insurances[0].effectime = moment(TODAY).format('H:mm')

      dispatch({
        type: ACTION_SAVE_CONTRACT,
        payload: {
          contract: {
            ...contract,
            ...contractResHome.data,
            ...contractResHome.data.ownerId
          },
          feeDetails: feeRes?.data[0],
          bankList : bankRes.data
        }
      })
    }
    dispatch(actionNextStep())
  }
}


export const actionHomePrivateNextStep3 = (stepData) => {
  return async (dispatch, getState) => {
    const { contract, paymentMethod } = getState().app.buyInsurance
    const contractRes = await BuyInsuranceService.updateInsuranceList(
      contract.id,
      getDataUpdateIsuranceListStep3(stepData,paymentMethod)
    )
    if (contractRes.status !== 200 || !contractRes.data) {
      return
    }
    const feeRes = await BuyInsuranceService.feeInsuranceHomePrivate(
      contract.id
    )
    if (feeRes.status !== 200 || !feeRes.data[0]) {
      return
    }
    const contractInfoRes = await BuyInsuranceService.getInfoContractHomePrivate(contract.id,feeRes.data[0].companyId)
    dispatch({
      type : ACTION_SAVE_CONTRACT ,
      payload : {
        feeDetails: feeRes?.data[0],
        contractHomePrivateInfo : contractInfoRes?.data
      }
    })
    dispatch(actionNextStep())
  }
}

export const actionHomePrivateNextStep4 = () => {
  return async (dispatch, getState) => {
    const { contract , feeDetails , paymentMethod } = getState().app.buyInsurance
    const res = await BuyInsuranceService.payInsuranceHomePrivate(contract.id,feeDetails.companyId,paymentMethod)
    if (res.status !== 200 || !res.data) {
      return
    }
    window.location.replace(res.data.url)
  }
}
const getInsuranceHomePrivate = (values, contractId, id = null, salerId) => {

  let houseTypeForm
  if (values.houseType === 1) {
    houseTypeForm = 'APARTMENT'
  } else if (values.houseType === 2) {
    houseTypeForm = 'TOWNHOUSE'
  } else if (values.houseType === 3) {
    houseTypeForm = 'OTHER'
  }
  return {
    contractId: contractId || undefined,
    customerRequest: {
      id: id || undefined,
      addresses: [
        {
          city: values.cityName || undefined,
          detail: values.address || undefined,
          district: values.districtName || undefined,
          isDefault: true,
          type: 'HOME' || undefined,
          ward: values.wardName || undefined
        }
      ],

      email: values.email || undefined,
      fullName: values.fullName || undefined,
      icNo: values.icNo || undefined,
      icType: values.icType.value || undefined,
      issuedDate: values.issuedDate || undefined,
      issuedPlace: values.issuedPlace || undefined,
      phoneNumber: values.phoneNumber || undefined,
      type: 'BANK'
    },
    houseAddressDTO: {
      city: values.theSameAddress ? values.cityName : values.houseAddressDTO[0].cityName  || undefined ,
      detail:  values.theSameAddress ? values.address : values.houseAddressDTO[0].address || undefined,
      district: values.theSameAddress ? values.districtName : values.houseAddressDTO[0].districtName || undefined,
      ward: values.theSameAddress ? values.wardName : values.houseAddressDTO[0].wardName || undefined
    },
    houseOwnerType: values.houseOwnerType || undefined,
    houseType: houseTypeForm || "APARTMENT",
    theSameAddress: values.theSameAddress || false,
    usedTime: values.usedTime || undefined,
    coverage: 'BASIC',
    salerId: salerId
  }
}

const getDataUpdateInsurances = (stepData) => {
  return [
    {
      assetOption: true,
      bankOption: true,
      beneficiaryBankDTO: {
        address: undefined,
        benefitTransferRate: undefined,
        branch: undefined,
        name: undefined
      },
      deduct: 3000000,
      duration: 3,
      insuranceAddOnAsset: {
        compensationLimit: 10000000,
        coverage: 'BASIC',
        insuranceAddOn: 'ASSET',
        unit: 'VND'
      },
      insuranceAddOnMaterial: {
        compensationLimit: 10000000,
        coverage: 'BASIC',
        insuranceAddOn: 'MATERIAL',
        unit: 'VND'
      },
      isEnable: true,
      materialOption: true,
      paymentChannel: 'ATM',
      promoCode: 'string',
      unit: 'VND'
    }
  ]
}


const getDataUpdateIsuranceListStep3 = (stepData,paymentMethod) =>{
  return [
    {
      assetOption: stepData.assetOption || false,
      bankOption: true,
      beneficiaryBankDTO: {
        address: stepData.beneficiaryBankDTOaddress || undefined,
        benefitTransferRate: stepData.beneficiaryBankDTObenefitTransferRate || undefined,
        branch: stepData.beneficiaryBankDTObranch || undefined,
        name: stepData.beneficiaryBankDTOname || undefined
      },
      deduct: 3000000,
      duration: stepData.duration || 3,
      insuranceAddOnAsset: {
        compensationLimit:stepData.insuranceAddOnAssetcompensationLimit ||  10000000,
        coverage: stepData.insuranceCoverage || 'BASIC',
        insuranceAddOn: 'ASSET',
        unit: 'VND'
      },
      insuranceAddOnMaterial: {
        compensationLimit: stepData.insuranceAddOnMaterialcompensationLimit ||10000000,
        coverage: stepData.insuranceCoverage || 'BASIC',
        insuranceAddOn: 'MATERIAL',
        unit: 'VND'
      },
      isEnable: true,
      materialOption: true,
      paymentChannel:paymentMethod || 'ATM',
      promoCode: 'string',
      unit: 'VND',
      startedDate: stepData.startedDate || undefined,
      endDate: stepData.endDate || undefined
    }
  ]
}
