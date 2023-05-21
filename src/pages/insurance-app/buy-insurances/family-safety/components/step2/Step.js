import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { FormikProvider, useFormik } from 'formik'
import { CardBody, CardFooter } from 'reactstrap'
import {
    initialValues_group, validationSchema_group, validate, addtionalPeopleDefault,
    KEY_ADDTIONAL_PEOPLE, KEY_FULLNAME, KEY_GCN_CONTRACT_PREFIX, KEY_IC_NO, KEY_IC_TYPE, KEY_DATE_BIRTH,
    KEY_EMAIL, KEY_PHONE_NUMBER, KEY_RELATIONSHIP, KEY_GENDER
} from './formikConfig'
import { getDefault_createBeneficiarieGroupInfo, getDefault_updateBeneficiarieGroupInfo } from './utility'
import { nextStep, updateStepInfo, createBeneficiary, updateBeneficiary, backStep } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { KEY_ACTIVE_STEP, KEY_BENEFICIARIES, KEY_CONTRACT_ID, KEY_STEP_2, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import Group from './form-components/Group'
import FooterView from '../../views/FooterView'
import { BaseAppUltils } from 'base-app'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import Service from '../../../../../../services/insurance-app/buyInsurancesFamilySafety'
import { hasRequestFail } from '../../../../../../ultity'

const Step2 = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const { [KEY_STEP_2]: step_2, [KEY_CONTRACT_ID]: contractId,
        [KEY_BENEFICIARIES]: beneficiaries, [KEY_ACTIVE_STEP]: activeStep }
        = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const next = (values) => {
        const stepInfo = { ...values, contractId }
        dispatch(updateStepInfo(stepInfo))
        dispatch(nextStep(activeStep))

        if (beneficiaries.length === 0) {
            dispatch(
                createBeneficiary(
                    getDefault_createBeneficiarieGroupInfo(stepInfo)
                )
            )
        } else {
            let _idArr = []
            beneficiaries.forEach((elt) => {
                _idArr.push(elt.id)
            })
            stepInfo["ids"] = _idArr

            dispatch(
                updateBeneficiary(
                    getDefault_updateBeneficiarieGroupInfo(stepInfo)
                )
            )
        }
    }

    const formik_group = useFormik({
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        initialValues: initialValues_group,
        validationSchema: validationSchema_group,
        validate: validate,
        onSubmit: next,
    })

    const handleCheckGCN = async (printedCertNo) => {
        const res = await Service.getContractIsGcn(printedCertNo)
        if (hasRequestFail(res.status)) {
            formik_group.setFieldValue(KEY_GCN_CONTRACT_PREFIX, initialValues_group[KEY_GCN_CONTRACT_PREFIX])
            BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`alert.notExistPrintedCertNo`) }))
            return
        }
        const { beneficiary } = res.data

        const final = beneficiary.map((elt) => {
            const _clone = { ...addtionalPeopleDefault }
            _clone[KEY_FULLNAME] = elt.fullName
            _clone[KEY_IC_NO] = elt.icNo
            _clone[KEY_IC_TYPE] = elt.icType
            _clone[KEY_DATE_BIRTH] = elt.dateOfBirth
            _clone[KEY_EMAIL] = elt.email
            _clone[KEY_PHONE_NUMBER] = elt.phoneNumber
            _clone[KEY_RELATIONSHIP] = elt.relationship
            _clone[KEY_GENDER] = elt.gender
            return _clone
        })
        formik_group.setFieldValue(KEY_ADDTIONAL_PEOPLE, final)
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title} >
            <CardBody>
                <FormikProvider value={formik_group}>
                    <Group className={`mb-1`}
                        formik={formik_group}
                        stepInfo={step_2}
                        handleCheckGCN={handleCheckGCN}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik_group.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    backStep={backStep.bind(null, activeStep)}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step2