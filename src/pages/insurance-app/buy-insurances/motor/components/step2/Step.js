import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { backStep, nextStep, updateProps, updateCompanyId, update_companyId } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE, KEY_STEP_2 } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { getDefault_insurancesObj, getDefault_updateCompanyIdObj } from './utility'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import { hasRequestFail } from '../../../../../../ultity'
import { MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { BaseAppUltils } from 'base-app'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { useIntl } from 'react-intl'

const Step = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const { [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_CONTRACT_INFO]: contractInfo,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [BASE.KEY_HAS_CAL_FEE_DONE]: hasCalFee,
        [BASE.KEY_DATA_FEES]: dataFees,
        [BASE.KEY_PAYMENT_TYPE]: paymentType,
        [BASE.KEY_COMPANY_ID]: companyId,
        [KEY_STEP_2]: step_2,
        [BASE.KEY_STEP_1]: step_1,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        if (!hasCalFee) {
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang("alert.needCalFee") }))
            return
        }
        dispatch(nextStep(activeStep))
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_2,
                    value: values
                }
            ])
        )
        dispatch(
            updateCompanyId(
                getDefault_updateCompanyIdObj(contractId, companyId)
            )
        )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })

    const revertCalFeeStatus = () => {
        dispatch(updateProps([
            {
                prop: BASE.KEY_HAS_CAL_FEE_DONE,
                value: false
            }
        ]))
    }

    const calculateFee = async () => {
        const _insurances = getDefault_insurancesObj(contractInfo.insurances, formik.values)
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

    React.useEffect(() => {
        if (contractId) {
            dispatch(update_companyId(null, contractId))
        }
    }, [contractId])

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik} dispatch={dispatch}
                        callbacks={{ calculateFee, revertCalFeeStatus }}
                        variables={{ hasCalFee, dataFees, paymentType, contractId, companyId }}
                        stepInfo={{ step_1, step_2 }}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    backStep={backStep.bind(null, activeStep)}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step