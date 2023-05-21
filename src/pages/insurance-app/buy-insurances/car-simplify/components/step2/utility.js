import {
  KEY_TOTAL_FEE_VAT,
  PAYMENT_TYPE_ATM,
  PAYMENT_TYPE_BONUS,
  PAYMENT_TYPE_DEBT,
  PAYMENT_TYPE_FUND_TRANSFER,
  PAYMENT_TYPE_QR_CODE,
  PAYMENT_TYPE_VISA_MASTER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import {
  getDefault_updateCompanyIdObjAndCustomer,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import {
  BASE,
  KEY_MT3_OR_MT2_ID,
  KEY_OWNER_ID,
  KEY_VEHICLE_ID
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import {
  convertDateTimeToReadble,
  hasRequestFail
} from '../../../../../../ultity'
// import { getDefault_insurancesObj } from '../../../motor/components/step2/utility'
import {
  KEY_ADDRESS,
  KEY_FULLNAME,
  KEY_COUPON_CODE,
  KEY_PHONE_NUMBER,
  KEY_EMAIL,
  KEY_FRAME_NUMBER,
  KEY_MACHINE_NUMBER,
  KEY_CITY,
  KEY_DISTRICT,
  KEY_WARD,
  KEY_DURATION_BBTNDS,
  KEY_TOGGLE_BBTNDS,
  KEY_DATE_INSUR_FROM,
  KEY_TIME_INSUR_FROM,
  KEY_DATE_INSUR_TO,
  KEY_TIME_INSUR_TO,
  KEY_TOGGLE_TNLPL,
  KEY_NUM_IN_CAR,
  KEY_XTRIEU_NGUOI_VU,
  KEY_BRAND_NAME,
  KEY_XTRIEU_NGUOI_TREN_XE
} from './formikConfig'
import {
  KEY_CHASSIS_NUMBER,
  KEY_CONTRACT_ID,
  KEY_ENGINE_NUMBER,
  KEY_LOADS,
  KEY_MANUFACTURER_NAME,
  KEY_MANUFACTURER_VEHICLE,
  KEY_NUMBER_PLATE,
  KEY_ORIGIN_PRODUCT,
  KEY_PURPOSE,
  KEY_SEATS,
  KEY_VEHICLE_STATUS,
  KEY_VEHICLE_TYPE,
  KEY_YEAR_PRODUCT
} from '../step1/formikConfig'
import {
  getDefault_createContractObj,
  getDefault_createVehicleObj,
  getDefault_updateVehicleObj
} from '../../../motor/components/step1/utility'
import {
  initialValues as step_1_initialValues,
  KEY_LINE_VEHICLE
} from '../../../motor/components/step1/formikConfig'
import { initialValues as step_3_initialValues } from '../../../motor/components/step3/formikConfig'
import {
  getDefault_createContactObj,
  getDefault_updateContractObj
} from '../../../motor/components/step3/utility'
import {
  KEY_CONTRACT_INFO,
  KEY_STEP_2,
  KEY_TOTAL_FEE
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import moment from 'moment'
import { KEY_CONTRACT_CODE } from '../../../../../../redux/reducers/insurance-app/utility'
export const getDefault_payInfoObj = (paymentType, values) => {
  return {
    paymentType: paymentType,
    couponCode: values[KEY_COUPON_CODE] || null,
    printedCertType: 'NONE',
    certNo: ''
  }
}

export const getDefault_debtInfoObj = () => {
  return {
    paymentType: PAYMENT_TYPE_DEBT,
    couponCode: null,
    printedCertType: 'NONE',
    certNo: null
  }
}

export const getDefault_bonusInfoObj = () => {
  return {
    paymentType: PAYMENT_TYPE_BONUS,
    couponCode: null,
    printedCertType: 'NONE',
    certNo: null
  }
}

export const getDefault_updateCompanyIdObj = (contractId, companyId) => {
  return {
    id: contractId,
    companyId: companyId
  }
}

export const getRightFee = (
  atmPayFee,
  qrPayFee,
  visaMasterPayFee,
  funTransferPayFee,
  paymentType
) => {
  let vatFee = 0
  switch (paymentType) {
    case PAYMENT_TYPE_DEBT:
      break
    case PAYMENT_TYPE_FUND_TRANSFER:
      vatFee = funTransferPayFee
      break
    case PAYMENT_TYPE_ATM:
      vatFee = atmPayFee
      break
    case PAYMENT_TYPE_VISA_MASTER:
      vatFee = visaMasterPayFee
      break
    case PAYMENT_TYPE_QR_CODE:
      vatFee = qrPayFee
      break
    default:
      break
  }
  return vatFee
}

/** do everything section */
export const updateVehicle = async (dispatch, updateVehicleInfo) => {
  const res = await Service.updateVehicle(updateVehicleInfo)
  if (hasRequestFail(res.status)) return

  dispatch(
    updateProps([
      {
        prop: KEY_VEHICLE_ID,
        value: res.data.id
      },
      {
        prop: KEY_MT3_OR_MT2_ID,
        value: res.data.vehicleType.id
      }
    ])
  )
}

export const createVehicle = async (
  dispatch,
  createContractInfo,
  createVehicleInfo
) => {
  const res1 = await Service.createContract(createContractInfo)
  if (hasRequestFail(res1.status)) return null

  dispatch(
    updateProps([
      {
        prop: BASE.KEY_CONTRACT_INFO,
        value: res1.data
      },
      {
        prop: BASE.KEY_CONTRACT_ID,
        value: res1.data.id
      }
    ])
  )

  createVehicleInfo['contractId'] = res1.data.id

  const res2 = await Service.createVehicle(createVehicleInfo)
  if (hasRequestFail(res2.status)) return null

  dispatch(
    updateProps([
      {
        prop: KEY_VEHICLE_ID,
        value: res2.data.id
      },
      {
        prop: KEY_MT3_OR_MT2_ID,
        value: res2.data.vehicleType.id
      }
    ])
  )
  return res1.data
}

export const updateCompanyId = async (contractId, companyId) => {
  await Service.update_companyId({ companyId: companyId, id: contractId })
}

export const calculateFee = async (
  dispatch,
  contractId,
  insurances_blueprint = [],
  values_step_2 , 
  first
) => {
  const _insurances = getDefault_insurancesObj(
    insurances_blueprint,
    values_step_2
  )
  const res1 = await Service.updateInsurance(_insurances)
  if (hasRequestFail(res1.status)) return

  const res2 = await Service.getContractFee(contractId)
  if (hasRequestFail(res2.status)) return
  if (hasRequestFail(res2.status) && first) {
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_HAS_CAL_FEE_DONE,
          value: true
        }
      ])
    )
  }

  const ctRes = await Service.getConstractInfo(contractId)
  if (hasRequestFail(ctRes.status)) return
  dispatch(
    updateProps([
      {
        prop: BASE.KEY_HAS_CAL_FEE_DONE,
        value: true
      },
      {
        prop: BASE.KEY_DATA_FEES,
        value: res2.data
      },
      {
        prop: KEY_CONTRACT_INFO,
        value: ctRes.data
      }
    ])
  )
}

export const createContact = async (
  dispatch,
  contractId,
  contactInfo,
  updateContractInfo
) => {
  const res1 = await Service.createContact(contactInfo)
  if (hasRequestFail(res1.status)) return

  dispatch(
    updateProps([
      {
        prop: KEY_OWNER_ID,
        value: res1.data.id
      }
    ])
  )
  updateContractInfo['ownerId'] = res1.data.id
  const res2 = await Service.updateContract(updateContractInfo)
  if (hasRequestFail(res2.status)) return

  const res3 = await Service.getContractInfo(contractId)
  if (hasRequestFail(res3.status)) return

  dispatch(
    updateProps([
      {
        prop: BASE.KEY_CONTRACT_INFO,
        value: res3.data
      },
      {
        prop: BASE.KEY_CONTRACT_CODE,
        value: res3.data.contractCode
      }
    ])
  )
}

/**
 * func that literally doing everything
 */
export const doEverything = async (
  dispatch,
  step_1,
  step_2,
  vehicleId,
  companyId,
  contractId,
  contractInfo
) => {
  const _step_1 = { ...step_1_initialValues }
  _step_1[KEY_NUMBER_PLATE] = step_1[KEY_NUMBER_PLATE]
  _step_1[KEY_VEHICLE_TYPE] = step_1[KEY_VEHICLE_TYPE]
  _step_1[KEY_FRAME_NUMBER] = step_1[KEY_FRAME_NUMBER]
  _step_1[KEY_MACHINE_NUMBER] = step_1[KEY_MACHINE_NUMBER]
  _step_1[KEY_MANUFACTURER_VEHICLE] = step_1[KEY_MANUFACTURER_VEHICLE]
  _step_1[KEY_LINE_VEHICLE] = step_1[KEY_LINE_VEHICLE]

  let _contractId, _contractInfo
  if (contractId) {
    await updateVehicle(
      dispatch,
      getDefault_updateVehicleObj(vehicleId, _step_1)
    )
    _contractInfo = contractInfo
    _contractId = contractId
  } else {
    _contractInfo = await createVehicle(
      dispatch,
      getDefault_createContractObj(),
      getDefault_createVehicleObj(_step_1)
    )
    _contractId = _contractInfo.id
  }

  // await updateCompanyId(_contractId, null)


  const _step_2 = { ...step_2 }
  await calculateFee(dispatch, _contractId, _contractInfo.insurances, _step_2)
  // await Service.updateCompanyId({ id: _contractId, companyId })

  await Service.updateConstract(getDefault_updateCompanyIdObj(_contractId , companyId))


  const _step_3 = { ...step_3_initialValues }
  _step_3[KEY_FULLNAME] = step_1[KEY_FULLNAME]
  _step_3[KEY_ADDRESS] = step_1[KEY_ADDRESS]
  _step_3[KEY_PHONE_NUMBER] = step_1[KEY_PHONE_NUMBER]
  _step_3[KEY_EMAIL] = step_1[KEY_EMAIL]

  await createContact(
    dispatch,
    _contractId,
    getDefault_createContactObj(_step_3),
    getDefault_updateContractObj(_contractId)
  )
}
export const get_Insurance_Update_Object = (insurance, values) => {
  const insurances = insurance.map((_elt) => {
    if (values.toggleTNLPL && _elt.insuranceCode === 'CAR_CONNGUOI') {
      _elt['liability1'] = Number(values.xTrieuNguoiTrenXe + '000000')
    }
    return {
      ..._elt,
      isEnable:
        (values.toggleTNLPL && _elt.insuranceCode === 'CAR_CONNGUOI') ||
        (values.toggleBBTNDS && _elt.insuranceCode === 'CAR_TNDS')
          ? true
          : false,
      startValueDate:
        _elt.startValueDate === null
          ? moment().toISOString()
          : values.startValueDate,
      count1:
        values.toggleTNLPL && _elt.insuranceCode === 'CAR_CONNGUOI'
          ? Number(values.numInCar)
          : values.toggleBBTNDS && _elt.insuranceCode === 'CAR_TNDS'
          ? null
          : null,
      duration: values.durationBBTNDS,
      fee:
        values.toggleTNLPL && _elt.insuranceCode === 'CAR_CONNGUOI'
          ? 0
          : _elt.fee,
      value1:
        values.toggleTNLPL && _elt.insuranceCode === 'CAR_CONNGUOI'
          ? null
          : _elt.value1,
      endValueDate:
        _elt.startValueDate === null
          ? moment().add('y', 1).toISOString()
          : values.endValueDate
    }
  })
  return insurances
}
export const updateCustomer = (ownerInfo, values, step_1) => {
  return async (dispatch) => {
    const _step_1 = { ...step_1 }
    _step_1[KEY_FULLNAME] = values[KEY_FULLNAME]
    _step_1[KEY_ADDRESS] = values[KEY_ADDRESS]
    _step_1[KEY_PHONE_NUMBER] = values[KEY_PHONE_NUMBER]
    _step_1[KEY_EMAIL] = values[KEY_EMAIL]
    await Service.updateContact(ownerInfo)
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_STEP_1,
          value: _step_1
        },
        {
          prop: KEY_STEP_2,
          value: values
        }
      ])
    )
  }
}
export const updateVehicelAndCalFee = (vehicelId , values ,contractId , insurances ,  activeStep , _nextStep) => {
  return async (dispatch) => {
    const res = await Service.updateVehicle(getDefault_vehicleInfoObject(values ,vehicelId ,contractId ))
    if (res.status !== 200 ) return
    calculateFee(
      dispatch,
      contractId,
      insurances,
      values
    )
    dispatch(
      updateProps([
        {
          prop: KEY_STEP_2,
          value: values
        }
      ])
    )
    if (activeStep === 1) {
      _nextStep()
    }
  }
}
export const updateInsurancAndCalFee = (
  contractId,
  companyId,
  insurances,
  values
) => {
  return async (dispatch) => {
    updateCompanies(contractId, companyId , dispatch)
    calculateFee(
      dispatch,
      contractId,
      get_Insurance_Update_Object(insurances, values),
      values
    )
    dispatch(
      updateProps([
        {
          prop: KEY_STEP_2,
          value: values
        }
      ])
    )
  }
}
export const getDefault_updateCompanyId = (contractId, companyId, ownerId) => {
  return {
    id: contractId,
    companyId: companyId
  }
}
export const updateCompanies = async (contractId, companyId ,dispatch) => {
  const res =  await Service.updateConstract(
    getDefault_updateCompanyId(contractId, companyId)
  )
  dispatch(
    updateProps([
      {
        prop: KEY_CONTRACT_CODE,
        value: res.data.contractCode
      }
    ])
  )
}
export const getContract = (contractId) => {
  return async (dispatch) => {
    const res = await Service.getConstractInfo(contractId)
    if (hasRequestFail(res.status)) return
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_CONTRACT_INFO,
          value: res.data
        },
        {
          prop: BASE.KEY_CONTRACT_CODE,
          value: res.data.contractCode
        }
      ])
    )
  }
}

export const getDefault_insurancesObj = (baseInsurances, values) => {
  const {
    [KEY_DURATION_BBTNDS]: duration,
    [KEY_TOGGLE_BBTNDS]: toggleBBTNDS,
    [KEY_DATE_INSUR_FROM]: valueDateStart,
    [KEY_TIME_INSUR_FROM]: valueTimeStart,
    [KEY_DATE_INSUR_TO]: valueDateEnd,
    [KEY_TIME_INSUR_TO]: valueTimeEnd,
    [KEY_TOGGLE_TNLPL]: toggleTainan,
    [KEY_NUM_IN_CAR]: numInCar,
    [KEY_XTRIEU_NGUOI_TREN_XE]: addResponsibilityValue
  } = values

  return baseInsurances.map((elt) => {
    switch (elt.insuranceCode) {
      case 'CAR_TNDS':
        if (toggleBBTNDS) {
          elt.buyEnable = true
          elt.isEnable = true
          elt.duration = duration
          elt.startValueDate = convertDateTimeToReadble(
            valueDateStart,
            valueTimeStart
          )
          elt.endValueDate = convertDateTimeToReadble(
            valueDateEnd,
            valueTimeEnd
          )
        }
        return elt
      case 'CAR_CONNGUOI':
        if (toggleTainan) {
          elt.buyEnable = true
          elt.isEnable = true
          elt.count1 = numInCar
          elt.liability1 = addResponsibilityValue * 1_000_000
        } else {
          elt.isEnable = false
          elt.startValueDate = convertDateTimeToReadble(
            valueDateStart,
            valueTimeStart
          )
          elt.endValueDate = convertDateTimeToReadble(
            valueDateEnd,
            valueTimeEnd
          )
        }
        return elt
      default:
        elt.startValueDate = convertDateTimeToReadble(
          valueDateStart,
          valueTimeStart
        )
        elt.endValueDate = convertDateTimeToReadble(valueDateEnd, valueTimeEnd)
        return elt
    }
  })
}
export const getDefault_vehicleInfoObject = (values , vehicelId , contractId) => {
  const obj = {
      "id": vehicelId,
      "contractId": contractId,
      "vehicleStatus": "NEW",
      "numberPlate": values[KEY_NUMBER_PLATE],
      "usage":  values[KEY_PURPOSE],
      "issPlace": "VIETNAM",
      "issDate": moment(values[KEY_YEAR_PRODUCT]).utc(true).toISOString(),
      "vehicleTypeId": values[KEY_VEHICLE_TYPE],
      "manufacturerName":  values[KEY_MANUFACTURER_NAME],
      "brandName": values[KEY_BRAND_NAME],
      "initValue": 0,
      "contractValue": 0,
      "frameNo": values[KEY_CHASSIS_NUMBER],
      "machineNo": values[KEY_ENGINE_NUMBER],
      "seats": Number(values[KEY_SEATS]),
      "loads" : values[KEY_LOADS]
  }
  return obj
}