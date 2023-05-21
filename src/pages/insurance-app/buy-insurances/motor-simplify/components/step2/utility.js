import {
    PAYMENT_TYPE_ATM,
    PAYMENT_TYPE_BONUS,
    PAYMENT_TYPE_DEBT,
    PAYMENT_TYPE_FUND_TRANSFER,
    PAYMENT_TYPE_QR_CODE,
    PAYMENT_TYPE_VISA_MASTER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_MT3_OR_MT2_ID, KEY_OWNER_ID, KEY_VEHICLE_ID } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { hasRequestFail } from '../../../../../../ultity'
import { getDefault_insurancesObj } from "../../../motor/components/step2/utility"
import { KEY_ADDRESS, KEY_FULLNAME, KEY_COUPON_CODE, KEY_PHONE_NUMBER, KEY_EMAIL } from './formikConfig'
import { KEY_FRAME_NUMBER, KEY_LINE_VEHICLE, KEY_MACHINE_NUMBER, KEY_MANUFACTURER_VEHICLE, KEY_NUMBER_PLATE, KEY_VEHICLE_TYPE } from '../step1/formikConfig'
import { getDefault_createContractObj, getDefault_createVehicleObj, getDefault_updateVehicleObj } from '../../../motor/components/step1/utility'
import { initialValues as step_1_initialValues } from '../../../motor/components/step1/formikConfig'
import { initialValues as step_3_initialValues } from '../../../motor/components/step3/formikConfig'
import { getDefault_createContactObj, getDefault_updateContractObj } from '../../../motor/components/step3/utility'

export const getDefault_payInfoObj = (paymentType, values) => {
    return ({
        "paymentType": paymentType,
        "couponCode": values[KEY_COUPON_CODE] || null,
        "printedCertType": "NONE",
        "certNo": "",
    })
}

export const getDefault_debtInfoObj = () => {
    return ({
        "paymentType": PAYMENT_TYPE_DEBT,
        "couponCode": null,
        "printedCertType": "NONE",
        "certNo": null
    })
}

export const getDefault_bonusInfoObj = () => {
    return ({
        "paymentType": PAYMENT_TYPE_BONUS,
        "couponCode": null,
        "printedCertType": "NONE",
        "certNo": null
    })
}


export const getDefault_updateCompanyIdObj = (contractId, companyId) => {
    return {
      id: contractId,
      companyId: companyId
    }
  }

export const getRightFee = (atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType) => {
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
export const updateVehicle = async (dispatch, updateVehicleInfo ,nextStep,activeStep) => {
    const res = await Service.updateVehicle(updateVehicleInfo)
    if (hasRequestFail(res.status)) return
    dispatch(updateProps([
        {
            prop: KEY_VEHICLE_ID,
            value: res.data.id
        },
        {
            prop: KEY_MT3_OR_MT2_ID,
            value: res.data.vehicleType.id
        },
    ]))
    if (res.status === 200  && nextStep && activeStep) {
        dispatch(nextStep(activeStep))
    }
}

export const createVehicle = async (dispatch, createContractInfo, createVehicleInfo ,activeStep ,nextStep) => {
    const res1 = await Service.createContract(createContractInfo)
    if (hasRequestFail(res1.status)) return null

    dispatch(updateProps([
        {
            prop: BASE.KEY_CONTRACT_INFO,
            value: res1.data
        },
        {
            prop: BASE.KEY_CONTRACT_ID,
            value: res1.data.id
        },
    ]))

    createVehicleInfo["contractId"] = res1.data.id

    const res2 = await Service.createVehicle(createVehicleInfo)
    if (hasRequestFail(res2.status)) return null

    dispatch(updateProps([
        {
            prop: KEY_VEHICLE_ID,
            value: res2.data.id
        },
        {
            prop: KEY_MT3_OR_MT2_ID,
            value: res2.data.vehicleType.id
        },
    ]))
    if (res1.status === 200 && res2.status ===200) {
        dispatch(nextStep(activeStep))
    }
    return res1.data
}

export const updateCompanyId = async (contractId, companyId) => {
    await Service.update_companyId({ companyId: companyId, id: contractId })
}

export const calculateFee = async (dispatch, contractId, insurances_blueprint = [], values_step_2) => {
    const _insurances = getDefault_insurancesObj(insurances_blueprint, values_step_2)
    const res1 = await Service.updateInsurance(_insurances)
    if (hasRequestFail(res1.status)) return

    const res2 = await Service.getFee(contractId)
    if (hasRequestFail(res2.status)) return

    dispatch(updateProps([
        {
            prop: BASE.KEY_HAS_CAL_FEE_DONE,
            value: true
        },
        {
            prop: BASE.KEY_DATA_FEES,
            value: res2.data
        },
    ]))
}

export const createContact = async (dispatch, contractId, contactInfo, updateContractInfo) => {
    const res1 = await Service.createContact(contactInfo)
    if (hasRequestFail(res1.status)) return

    dispatch(updateProps([
        {
            prop: KEY_OWNER_ID,
            value: res1.data.id
        },
    ]))
    updateContractInfo["ownerId"] = res1.data.id
    const res2 = await Service.updateContract(updateContractInfo)
    if (hasRequestFail(res2.status)) return

    const res3 = await Service.getContractInfo(contractId)
    if (hasRequestFail(res3.status)) return

    dispatch(updateProps([
        {
            prop: BASE.KEY_CONTRACT_INFO,
            value: res3.data
        },
        {
            prop: BASE.KEY_CONTRACT_CODE,
            value: res3.data.contractCode
        },
    ]))
}

/** 
 * func that literally doing everything
 */
 export const doEverything = async (dispatch, step_1, step_2, vehicleId, companyId, contractId, contractInfo ,activeStep ,nextStep) => {
    const _step_1 = { ...step_1_initialValues }
    _step_1[KEY_NUMBER_PLATE] = step_1[KEY_NUMBER_PLATE]
    _step_1[KEY_VEHICLE_TYPE] = step_1[KEY_VEHICLE_TYPE]
    _step_1[KEY_FRAME_NUMBER] = step_1[KEY_FRAME_NUMBER]
    _step_1[KEY_MACHINE_NUMBER] = step_1[KEY_MACHINE_NUMBER]
    _step_1[KEY_MANUFACTURER_VEHICLE] = step_1[KEY_MANUFACTURER_VEHICLE]
    _step_1[KEY_LINE_VEHICLE] = step_1[KEY_LINE_VEHICLE]

    let _contractId, _contractInfo
    if (contractId) {
        await updateVehicle(dispatch,
            getDefault_updateVehicleObj(vehicleId, _step_1)
        )
        _contractInfo = contractInfo
        _contractId = contractId
    } else {
        _contractInfo = await createVehicle(dispatch,
            getDefault_createContractObj(),
            getDefault_createVehicleObj(_step_1)
            , activeStep , nextStep
        )
        _contractId = _contractInfo?.id
    }

    // await updateCompanyId(_contractId, null)

   
    const _step_2 = { ...step_2 }
    await calculateFee(dispatch,
        _contractId, _contractInfo?.insurances, _step_2
    )
    await Service.updateContract(getDefault_updateCompanyIdObj(_contractId , companyId))

    const _step_3 = { ...step_3_initialValues }
    _step_3[KEY_FULLNAME] = step_1[KEY_FULLNAME]
    _step_3[KEY_ADDRESS] = step_1[KEY_ADDRESS]
    _step_3[KEY_PHONE_NUMBER] = step_1[KEY_PHONE_NUMBER]
    _step_3[KEY_EMAIL] = step_1[KEY_EMAIL]

    await createContact(dispatch,
        _contractId,
        getDefault_createContactObj(_step_3),
        getDefault_updateContractObj(_contractId)
    )
}