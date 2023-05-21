import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter, } from 'reactstrap'
import {
    backStep, getConfigFeeBHVC, nextStep, updateCompanyId,
    updateProps, updateSpecificProp, update_companyId
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import StepForm from './StepForm'
import {
    initialValues, KEY_ADDTIONAL_TERM_ALL, KEY_ADDTIONAL_TERM_MAIN, KEY_BASE_FEE_INCREASE_MAX,
    KEY_BASE_FEE_INCREASE_MIN, KEY_DURATION_BHVC, KEY_TOGGLE_VC, validate, validationSchema
} from './formikConfig'
import { useFormik, FormikProvider } from 'formik'
import { fillInsuranceInfo, getDefault_updateCompanyIdObj } from './utility'
import { BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'
import { NAME_APP_CONFIG, getKeyLang } from '../../../../../../configs/insurance-app'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import {
    KEY_ADD_TERMS_ALL, KEY_ADD_TERMS_MAIN, MAX_STEP, KEY_STEP_2, KEY_HAS_CAL_FEE_DONE, KEY_DATA_FEES,
    KEY_COMPANY_ID, KEY_TOTAL_FEE, KEY_CONTRACT_INFO, KEY_ACTIVE_STEP,
    KEY_CONTRACT_ID, KEY_MIN_FEE, KEY_FEE_BHVC, KEY_STEP_1, KEY_BH_INC_MAX, KEY_BH_INC_MIN
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import FooterView from '../../views/FooterView'
import { convertNumberToCurrency, getDataFee, hasRequestFail } from '../../../../../../ultity'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { KEY_IS_LOADING } from '../../../../../../redux/reducers/insurance-app/appConfig'
import * as formikConfig from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const Step2 = () => {
    const dispatch = useDispatch()
    const { [KEY_CONTRACT_INFO]: contractInfo, [KEY_STEP_2]: step_2, [KEY_STEP_1]: step_1, [KEY_ACTIVE_STEP]: activeStep,
        [KEY_CONTRACT_ID]: contractId, [KEY_COMPANY_ID]: companyId, [KEY_HAS_CAL_FEE_DONE]: isCalFee, [KEY_DATA_FEES]: dataFees,
        [KEY_ADD_TERMS_MAIN]: addTermsMain, [KEY_ADD_TERMS_ALL]: addTermsAll, [KEY_MIN_FEE]: minimumFee,
        [KEY_FEE_BHVC]: feeBHVC, [KEY_BH_INC_MAX]: baseIncMax, [KEY_BH_INC_MIN]: baseIncMin , [KEY_TOTAL_FEE] : totalFeeIns
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const { [KEY_IS_LOADING]: isLoading } = useSelector(state => state.app[NAME_APP_CONFIG])

    const [isValidateOnChange, setValidateOnChange] = useState(true)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const isSmallerThanMinimumFee = (values) => {
        if (values[KEY_TOGGLE_VC]) {
            if (minimumFee !== undefined && (feeBHVC !== undefined && feeBHVC < minimumFee)) {
                return true
            }
            if (minimumFee === undefined) {
                return false
            }
        }
        return false
    }
    const miniumToCurrency = convertNumberToCurrency(minimumFee)
    const next = (values) => {
        /// check => if minium of 12 month < totalFeeIns/values[KEY_DURATION_BHVC]
        const valueFeeDurationChoose = totalFeeIns/values[KEY_DURATION_BHVC]
        const miniumFeeOf12Month = minimumFee/12
        if (valueFeeDurationChoose < miniumFeeOf12Month && values[KEY_TOGGLE_VC] ) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.minumOf12month`)}  values={{
                minimumFee : miniumToCurrency
              }} />)
            return
        }
        if (isLoading) {
            return
        }
        if (!isCalFee) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`CalFeeToNext`)} />)
            return
        }
        if (isSmallerThanMinimumFee(values)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.minimumFee`)} />)
            return
        }
        dispatch(nextStep(activeStep))

        if (values[KEY_TOGGLE_VC]) {
            dispatch(
                updateProps([
                    {
                        prop: KEY_ADD_TERMS_MAIN,
                        value: values[KEY_ADDTIONAL_TERM_MAIN]
                    },
                    {
                        prop: KEY_ADD_TERMS_ALL,
                        value: values[KEY_ADDTIONAL_TERM_ALL]
                    },
                ])
            )
        }
        dispatch(
            updateProps([
                {
                    prop: KEY_STEP_2,
                    value: values
                },
                {
                    prop: KEY_TOTAL_FEE,
                    value: getDataFee(dataFees, companyId)[formikConfig.KEY_TOTAL_FEE]
                },
            ])
        )

        dispatch(
            updateCompanyId(
                getDefault_updateCompanyIdObj(contractId, companyId)
            )
        )
    }

    const disableContinueBtn = () => {
        dispatch(updateSpecificProp(KEY_HAS_CAL_FEE_DONE, false))
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })
    const callFee = async () => {
        try {
            disableContinueBtn()
            if (isLoading) return
            const insurances = fillInsuranceInfo(contractInfo, formik)
            const resUpdate = await Service.updateInsurance(insurances)
            if (hasRequestFail(resUpdate.status)) { return }

            const addTerms = [...addTermsMain, ...addTermsAll]
            await Service.updateInsuranceAddon(addTerms)

            const feeRes = await Service.getContractFee(contractId)
            if (hasRequestFail(feeRes.status)) { return }

            dispatch(
                updateProps([
                    {
                        prop: KEY_DATA_FEES,
                        value: feeRes.data
                    },
                    {
                        prop: KEY_COMPANY_ID,
                        value: feeRes.data[0].companyId
                    },
                    {
                        prop: KEY_TOTAL_FEE,
                        value: feeRes.data[0].totalFee
                    },
                    {
                        prop: KEY_HAS_CAL_FEE_DONE,
                        value: true
                    }
                ])
            )
            if (feeRes.data[0].CAR_VATCHAT) {
                dispatch(
                    updateProps([
                        {
                            prop: KEY_FEE_BHVC,
                            value: feeRes.data[0].CAR_VATCHAT
                        },
                    ])
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(update_companyId(null, contractId)) // reset companyId to avoid calculate fee errors
    }, [])

    useEffect(() => {
        formik.setFieldValue(KEY_BASE_FEE_INCREASE_MIN, baseIncMin)
        formik.setFieldValue(KEY_BASE_FEE_INCREASE_MAX, baseIncMax)
    }, [baseIncMin, baseIncMax])

    useEffect(() => {
        dispatch(getConfigFeeBHVC(companyId))
    }, [companyId])

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title} >
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        stepInfo={{ step_1, step_2 }}
                        dispatch={dispatch}
                        addtionalInfo={{ isCalFee, dataFees, companyId, isLoading }}
                        callbacks={{ callFee, disableContinueBtn }}
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

export default Step2