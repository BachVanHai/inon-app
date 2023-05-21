import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import {
    KEY_FULLNAME, KEY_ADDRESS, KEY_PHONE_NUMBER, KEY_NUMBER_PLATE,
    KEY_VEHICLE_TYPE, KEY_MANUFACTURER_VEHICLE, KEY_LINE_VEHICLE,
} from '../step1/formikConfig'
import { initialValues, KEY_COUPON_CODE, KEY_EMAIL, KEY_FRAME_NUMBER, KEY_MACHINE_NUMBER, validate, validationSchema } from './formikConfig'
import { REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { useDispatch } from 'react-redux'
import { updateProps, pay } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_STEP_2, KEY_VEHICLE_ID } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { doEverything, getDefault_bonusInfoObj, getDefault_debtInfoObj, getDefault_payInfoObj } from './utility'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { fillMultipleStepInfo, handleBonus, handleDebt, hasRequestFail, isObjEmpty } from '../../../../../../ultity'
import { SIMPLIFY_MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { KEY_DEBT_ACCOUNT_INFO } from '../../../../../../redux/reducers/insurance-app/appConfig'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import { BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer'
import { nullStrRegex, PAYMENT_TYPE_FUND_TRANSFER, PAYMENT_TYPE_QR_CODE } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import FormContract from './FormContract'
import FeesForm from './FeesForm'
import QrCode from '../../../../../../components/insurance-app/common-forms/bank-tranfer/QrCode'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [BASE.KEY_COMPANY_ID]: companyId,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_PAYMENT_TYPE]: paymentType,
        [BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
        [BASE.KEY_TOTAL_FEE]: totalFee,
        [BASE.KEY_STEP_1]: step_1,
        [KEY_STEP_2]: step_2,
        [BASE.KEY_DATA_FEES]: dataFees,
        [KEY_VEHICLE_ID]: vehicleId,
        [BASE.KEY_CONTRACT_CODE]: contractCode,
        [BASE.KEY_ACTIVE_STEP]: activeStep,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo,
    } = useSelector(state => state.app[NAME_APP_CONFIG])

    const [isValidateOnChange, setValidateOnChange] = useState(true)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const saveAction = async (values) => {
        const _step_1 = { ...step_1 }
        _step_1[KEY_FULLNAME] = values[KEY_FULLNAME]
        _step_1[KEY_ADDRESS] = values[KEY_ADDRESS]
        _step_1[KEY_PHONE_NUMBER] = values[KEY_PHONE_NUMBER]
        _step_1[KEY_EMAIL] = values[KEY_EMAIL]

        _step_1[KEY_VEHICLE_TYPE] = values[KEY_VEHICLE_TYPE]
        _step_1[KEY_NUMBER_PLATE] = values[KEY_NUMBER_PLATE]
        _step_1[KEY_MANUFACTURER_VEHICLE] = values[KEY_MANUFACTURER_VEHICLE]
        _step_1[KEY_LINE_VEHICLE] = values[KEY_LINE_VEHICLE]
        const res = await Service.getContractInfo(contractId)
        dispatch(updateProps([
            {
                prop: BASE.KEY_STEP_1,
                value: _step_1
            },
            {
                prop: KEY_STEP_2,
                value: values
            },
            {
                prop: BASE.KEY_CONTRACT_INFO,
                value: res.data
            },
            // {
            //     prop : BASE.KEY_TOTAL_FEE , 

            // }
        ]))

        return doEverything(dispatch, _step_1, values, vehicleId, companyId, contractId, contractInfo)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: () => { },
    })
    async function _pay() {
        const email = formik.values[KEY_EMAIL]
        const phoneNumber = formik.values[KEY_PHONE_NUMBER]
        if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
            return false
        }
        else if (formik.errors.email || formik.errors.phoneNumber) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
            return false
        }else {
            await saveAction(formik.values)
            dispatch(pay(contractId, getDefault_payInfoObj(paymentType, formik.values), SIMPLIFY_MAX_STEP))
        }
    }

    async function _debt() {
        // enableValidateOnChange()
        // const email = formik.values[KEY_EMAIL]
        // const phoneNumber = formik.values[KEY_PHONE_NUMBER]
        // if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
        //     BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
        //     return false
        // }
        // else if (formik.errors.email || formik.errors.phoneNumber) {
        //     BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
        //     return false
        // }else {
            
        // }  
        await saveAction(formik.values)
        handleDebt(
            totalFee, debtAccountInfo,
            () => {
                dispatch(pay(contractId, getDefault_debtInfoObj(), SIMPLIFY_MAX_STEP))
            },
            () => {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />)
            }
        )
    }

    async function _bonus() {
        // return console.log("_bonus_invoke!!!!")
        await saveAction(formik.values)
        handleBonus(
            totalFee,
            () => {
                dispatch(pay(contractId, getDefault_bonusInfoObj(), SIMPLIFY_MAX_STEP))
            },
            () => {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.dontHaveEnoughBonusPoint`)} />)
            }
        ).then()
    }

    const toggleAgreeCallback = () => {
        enableValidateOnChange()
        const email = formik.values[KEY_EMAIL]
        const phoneNumber = formik.values[KEY_PHONE_NUMBER]
        if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
            return false
        }
        else if (formik.errors.email || formik.errors.phoneNumber) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
            return false
        } 
        if (agreedTermOfServicesStatus) {
            dispatch(updateProps([
                {
                    prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                    value: false
                }
            ]))
            return
        }
        dispatch(updateProps([
            {
                prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
                value: true
            }
        ]))
    }

    /** It's really important to have this useEffect above the other one, so please don't change its position! */
    React.useEffect(() => {
        if (isObjEmpty(step_2)) return
        fillMultipleStepInfo(step_2, initialValues, formik.setValues)
    }, [])

    React.useEffect(() => {
        if (isObjEmpty(step_1)) { return }

        const {
            [KEY_FULLNAME]: fullname,
            [KEY_ADDRESS]: address,
            [KEY_PHONE_NUMBER]: phoneNumber,
            [KEY_EMAIL]: email,

            [KEY_VEHICLE_TYPE]: vehicleType,
            [KEY_NUMBER_PLATE]: numberPlate,
            [KEY_MANUFACTURER_VEHICLE]: manufactureVehicleName,
            [KEY_LINE_VEHICLE]: lineVehicle,

            [KEY_FRAME_NUMBER]: frameNumber,
            [KEY_MACHINE_NUMBER]: machineNumber,
        } = step_1
        let _values
        if (isObjEmpty(step_2)) {
            _values = { ...initialValues }
        } else {
            _values = { ...step_2 }
        }

        _values[KEY_FULLNAME] = fullname
        _values[KEY_ADDRESS] = address
        _values[KEY_PHONE_NUMBER] = phoneNumber
        _values[KEY_EMAIL] = email

        _values[KEY_VEHICLE_TYPE] = vehicleType
        _values[KEY_NUMBER_PLATE] = numberPlate
        _values[KEY_MANUFACTURER_VEHICLE] = manufactureVehicleName
        _values[KEY_LINE_VEHICLE] = lineVehicle

        _values[KEY_FRAME_NUMBER] = frameNumber
        _values[KEY_MACHINE_NUMBER] = machineNumber

        formik.setValues(_values)
    }, [])

    return (
        <FormikProvider value={formik}>
            <StepBase>
                <CardBody>
                    <FormContract
                        enableValidateOnChange={enableValidateOnChange}
                        stepInfo={{ step_1, step_2 }}
                        companyId={companyId}
                        contractId={contractId}
                        vehicleId={vehicleId}
                        contractInfo={contractInfo}
                        paymentType={paymentType}
                        datafees={dataFees}
                        contractCode={contractInfo.contractCode}
                        activeStep={activeStep}
                    />
                </CardBody>
            </StepBase>

            <StepBase>
                <CardBody>
                    <PaymentType
                        paymentType={paymentType}
                        isHideIcon={true}
                        keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                        callbacks={{
                            radioChange: async (e) => {
                                const val = e.target.value
                                dispatch(updateProps([
                                    {
                                        prop: BASE.KEY_PAYMENT_TYPE,
                                        value: val
                                    }
                                ]))
                                const res = await Service.getContractInfo(contractId)
                                if (hasRequestFail(res.status)) return

                                dispatch(updateProps([
                                    {
                                        prop: BASE.KEY_CONTRACT_INFO,
                                        value: res.data
                                    }
                                ]))
                            }
                        }}
                    />
                </CardBody>
            </StepBase>

            <StepBase >
                <CardBody>
                    <FeesForm
                        paymentType={paymentType}
                        dispatch={dispatch}
                        contractInfo={contractInfo}
                        companyId={companyId}
                        toggleAgree={{
                            agreedTermOfServicesStatus,
                            toggleAgreeCallback
                        }}
                    />
                </CardBody>
            </StepBase>

            {
                render(
                    agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_FUND_TRANSFER,
                    <BankTransferInfo
                        contractCode={contractInfo.contractCode}
                        totalFeeInclVAT={ contractInfo['discountValue'] !== null ? Number(totalFee - contractInfo['discountValue']) : totalFee }
                        getBankTransferInfo={Service.gettAllBanks}
                    />
                )
            }
            {
                render(
                    agreedTermOfServicesStatus, paymentType, PAYMENT_TYPE_QR_CODE,
                    <QrCode
                        contractCode={contractInfo.contractCode}
                        totalFeeInclVAT={ contractInfo['discountValue'] !== null ? Number(totalFee - contractInfo['discountValue']) : totalFee }
                    />
                )
            }

            <StepBase>
                <CardFooter>
                    <FooterView
                        // beforeSubmitClicked={beforePayClickInvoke}
                        enableValidateOnChange={enableValidateOnChange}
                        handleSubmitClick={_pay}
                        handlePayDebtClick={_debt}
                        handlePayBonusClick={_bonus}

                        constantVals={{ MAX_STEP: SIMPLIFY_MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                        backStep={() => {
                            return (dispatch) => {
                                dispatch(updateProps([
                                    {
                                        prop: KEY_STEP_2,
                                        value: formik.values
                                    },
                                    {
                                        prop: BASE.KEY_ACTIVE_STEP,
                                        value: 1
                                    },
                                ]))
                            }
                        }}
                    />
                </CardFooter>
            </StepBase>
        </FormikProvider>
    )
}

export default Step
