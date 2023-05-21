import React, { useState, useEffect } from 'react'
import { getCarManufacturers, nextStep, getCarVehicle, createConstract, updateSpecificProp, getConstractInfo } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { CardBody, CardFooter, } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BaseAppUltils } from 'base-app'
import { useIntl } from 'react-intl'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import { useFormik, FormikProvider } from 'formik'
import { initialValues, KEY_GTBH_YEUCAU, KEY_GT_XE_KHAIBAO, validate, validationSchema } from './formikConfig'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import Step1Form from './StepForm'
import { fillMultipleStepInfo, getDefault_contractInfoObject, getDefault_updateContractInfoObject, getDefault_updateVehicleInfoObject, getDefault_vehicleInfoObject } from './utility'
import { hasRequestFail, isObjEmpty } from '../../../../../../ultity'
import { updateConstract } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { KEY_ACTIVE_STEP, KEY_CONTRACT_ID, KEY_CONTRACT_INFO, KEY_STEP_1, KEY_SUGG_AUTOMAKER, KEY_SUGG_VEHICLE, KEY_VEHICLE_ID, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { getKeyLang } from '../../../../../../configs/insurance-app'

const Step1 = () => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const {
        [KEY_VEHICLE_ID]: vehicleId, [KEY_CONTRACT_INFO]: contractInfo,
        [KEY_CONTRACT_ID]: contractId, [KEY_STEP_1]: step_1, [KEY_ACTIVE_STEP]: activeStep,
        [KEY_SUGG_VEHICLE]: sugg_Vehicle, [KEY_SUGG_AUTOMAKER]: sugg_Automaker }
        = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        const _nextStep = () => {
            dispatch(nextStep(activeStep))
        }
        dispatch(updateSpecificProp(KEY_STEP_1, values))

        if (contractId) {
            if (isObjEmpty(contractInfo)) {
                dispatch(
                    getConstractInfo(contractId)
                )
            }
            dispatch(
                updateConstract(
                    getDefault_updateContractInfoObject(contractId, values[KEY_GTBH_YEUCAU]),
                    getDefault_updateVehicleInfoObject(vehicleId, { contractId, ...values }),
                    _nextStep
                )
            )
            return
        }
        dispatch(
            createConstract(
                getDefault_contractInfoObject(values[KEY_GTBH_YEUCAU], values[KEY_GT_XE_KHAIBAO]),
                getDefault_vehicleInfoObject({ contractId, ...values }),
                _nextStep
            )
        )
    }

    const handleCheckInfoCar = async (setFieldValue, numberPlate, setSugg_LineVehicle, resetForm) => {
        try {
            const res = await Service.checkInfoVehicle(numberPlate)
            if (hasRequestFail(res.status)) {
                BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`alert.notExistIcNo`) }))
                return
            }

            const { brandName, vehicleType, vehicleStatus, manufacturerName, frameNo, vehicleTypeId,
                machineNo, issPlace, issDate, initValue, seats, loads, contractValue, usage } = res.data
            const info = {
                brandName, vehicleStatus, manufacturerName, frameNo,
                machineNo, issPlace, issDate, initValue, seats, loads, contractValue, usage,
                vehicleType: vehicleTypeId, capacityType: vehicleType.capacityType,
                sugg_Automaker, setSugg_LineVehicle,
                inonType: vehicleType.code, businessStatus: vehicleType.businessStatus,
                issDate : issDate !== null ? issDate : ''
            }
            fillMultipleStepInfo(setFieldValue, info)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getCarVehicle())
        dispatch(getCarManufacturers())
    }, [])

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <Step1Form
                        formik={formik}
                        stepInfo={step_1}
                        addtionalInfo={{ sugg_Vehicle, sugg_Automaker, }}
                        callbacks={{ handleCheckInfoCar }}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step1