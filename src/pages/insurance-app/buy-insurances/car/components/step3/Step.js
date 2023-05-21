import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import { BaseAppUltils } from 'base-app'
import { useFormik, FormikProvider } from 'formik'
import { FormattedMessage } from 'react-intl'
import {
    backStep, createOwnerContact, nextStep, updateOwnerContactAndContract,
    updateSpecificProp
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import StepForm from './StepForm'
import {
    initialValues, KEY_BENEFICIARY_LIMIT, KEY_TOGGLE_CHUYENQUYEN_TH, validate, validationSchema
} from './formikConfig'
import {
    getDefault_alterBeneficiaryContactObj, getDefault_ownerContactObj,
    getDefault_updateAlterBeneficiaryContactObj, getDefault_updateOwnerContactObj
} from './utility'
import { KEY_TOGGLE_BBTNDS, KEY_TOGGLE_VC } from '../step2/formikConfig'
import {
    KEY_STEP_3, KEY_STEP_2, MAX_STEP, KEY_CONTRACT_ID, KEY_ID_CONTACT, KEY_ACTIVE_STEP, KEY_ID_CONTACT_ALTER, KEY_STEP_1
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { KEY_ADDRESS, KEY_GT_XE_KHAIBAO, KEY_NAME } from '../step1/formikConfig'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { convertStrToNumber } from '../../../../../../ultity'

const Step3 = () => {
    const dispatch = useDispatch()
    const { [KEY_STEP_3]: step_3,
        [KEY_STEP_1]: step_1,
        [KEY_STEP_2]: step_2,
        [KEY_CONTRACT_ID]: contractId,
        [KEY_ID_CONTACT]: idContact,
        [KEY_ACTIVE_STEP]: activeStep,
        [KEY_ID_CONTACT_ALTER]: idContactAlter,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)

    const next = (values) => {
        if (values[KEY_TOGGLE_CHUYENQUYEN_TH]) {
            const _convertGtXeKhaiBao = convertStrToNumber(step_1[KEY_GT_XE_KHAIBAO])
            const _convertBeneLimit = convertStrToNumber(values[KEY_BENEFICIARY_LIMIT])
            if (_convertGtXeKhaiBao < _convertBeneLimit) {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.gtXeKhaiBao.alterBeneficiary`)} />)
                return
            }
        }

        dispatch(updateSpecificProp(KEY_STEP_3, values))
        const completedCallback = () => {
            if (step_2[KEY_TOGGLE_BBTNDS] && !step_2[KEY_TOGGLE_VC]) {
                dispatch(updateSpecificProp(KEY_ACTIVE_STEP, 5))
                return
            }
            dispatch(nextStep(activeStep))
        }
        if (idContact) {
            dispatch(
                updateOwnerContactAndContract(
                    getDefault_updateOwnerContactObj(idContact, values),        // ownerUpdateContactInfo
                    idContact,                                                  // ownerId
                    idContactAlter,                                             // ...
                    contractId,
                    values[KEY_TOGGLE_CHUYENQUYEN_TH],
                    getDefault_updateAlterBeneficiaryContactObj(values, idContactAlter),
                    getDefault_alterBeneficiaryContactObj(values),
                    values[KEY_BENEFICIARY_LIMIT],
                    completedCallback
                )
            )
            return
        }
        dispatch(
            createOwnerContact(
                getDefault_ownerContactObj(values),                             // ownerContactInfo
                contractId,                                                     // contractId
                values[KEY_TOGGLE_CHUYENQUYEN_TH],
                getDefault_alterBeneficiaryContactObj(values),
                values[KEY_BENEFICIARY_LIMIT],
                completedCallback
            )
        )
    }

    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        validate: validate,
        onSubmit: next,
    })

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title} >
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        stepInfo={{ step_3, step_1 }}
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

export default Step3