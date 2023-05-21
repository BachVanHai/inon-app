import { COMPANIES, INSURANCE_TYPE_MOTOR } from '../../../../../../configs/insurance-app'
import { nextStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_MT3_OR_MT2_ID, KEY_OWNER_ID, KEY_STEP_2, KEY_STEP_3, KEY_VEHICLE_ID, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { fillMultipleStepInfo, hasRequestFail } from '../../../../../../ultity'
import { getDefault_insurancesObj } from '../step2/utility'
import { KEY_FRAME_NUMBER, KEY_LINE_VEHICLE, KEY_MACHINE_NUMBER, KEY_MANUFACTURER_VEHICLE, KEY_NUMBER_PLATE, KEY_USER_ADDRESS, KEY_USER_NAME, KEY_VEHICLE_TYPE } from './formikConfig'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { initialValues as step_2_initialValues } from '../step2/formikConfig'
import { initialValues as step_3_initialValues, KEY_ADDRESS, KEY_FULLNAME } from '../step3/formikConfig'
import { getDefault_createContactObj, getDefault_updateContractObj } from '../step3/utility'

export const setManufacturerVehicle = (original, setFieldValue, setLineVehicles) => {
    setFieldValue(KEY_MANUFACTURER_VEHICLE, original.label)
    const convertedBrands = original.brands.map((elt, index) => {
        elt.value = index
        elt.label = elt.brand
        return elt
    })
    setLineVehicles(convertedBrands || [])
    setFieldValue(KEY_LINE_VEHICLE, undefined)
}

export const _fillMultipleStepInfo = (stepInfo, initialValues, setValues) => {
    fillMultipleStepInfo(stepInfo, initialValues, setValues)
}

export const getDefault_createContractObj = () => {
    return ({
        contractType: INSURANCE_TYPE_MOTOR
    })
}

export const getDefault_createVehicleObj = (values) => {
    return ({
        "numberPlate": values[KEY_NUMBER_PLATE],
        "vehicleTypeId": values[KEY_VEHICLE_TYPE],
        "manufacturerName": values[KEY_MANUFACTURER_VEHICLE],
        "brandName": values[KEY_LINE_VEHICLE],
        "frameNo": values[KEY_FRAME_NUMBER],
        "machineNo": values[KEY_MACHINE_NUMBER],
    })
}

export const getDefault_updateVehicleObj = (vehicleId, values) => {
    const obj = getDefault_createVehicleObj(values)
    obj["id"] = vehicleId
    return obj
}

/* things section */
export const doEverything = (step_1) => {
    return async (dispatch) => {
        /* start declare */
        const _createVehicle = async (createContractInfo, createVehicleInfo, values_step_1) => {
            dispatch(updateProps([
                {
                    prop: BASE.KEY_STEP_1,
                    value: values_step_1
                }
            ]))
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
            return res1.data
        }
        /* step 2 */
        const _updateCompanyId = async (contractId, companyId) => {
            await Service.update_companyId({ companyId: companyId, id: contractId })
        }
        const _calculateFee = async (contractId, insurances_blueprint, values_step_2) => {
            dispatch(updateProps([
                {
                    prop: KEY_STEP_2,
                    value: values_step_2
                }
            ]))
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
                {
                    prop: BASE.KEY_COMPANY_ID,
                    value: res2.data[0].companyId
                },
            ]))
        }
        /* step 3 */
        const _createContact = async (contractId, contactInfo, updateContractInfo, values_step_3) => {
            dispatch(updateProps([
                {
                    prop: KEY_STEP_3,
                    value: values_step_3
                }
            ]))
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
            ]))
        }
        /* end decclare */

        /* implement start  */
        /* step 1 */
        const contractInfo = await _createVehicle(
            getDefault_createContractObj(),
            getDefault_createVehicleObj(step_1),
            step_1
        )
        const contractId = contractInfo.id
        /* step 2 */
        await _updateCompanyId(contractId, null)
        await _calculateFee(contractId, contractInfo?.insurances, step_2_initialValues)
        await Service.updateCompanyId({ id: contractId, companyId: COMPANIES[0].companyId }) /* for some reason, only this api work - blame backend devs instead ok? */
        /* step 3 */
        const step_3 = { ...step_3_initialValues }
        step_3[KEY_FULLNAME] = step_1[KEY_USER_NAME]
        step_3[KEY_ADDRESS] = step_1[KEY_USER_ADDRESS]
        await _createContact(
            contractId,
            getDefault_createContactObj(step_3),
            getDefault_updateContractObj(contractId),
            step_3
        )

        dispatch(nextStep(MAX_STEP - 2))
    }
}