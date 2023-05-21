import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardBody, CardFooter, } from 'reactstrap'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import Completed from './Completed'
import { FormikProvider, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { initialValues, KEY_INVOICE_TYPE, KEY_IS_SAVE_TEMPLATE, KEY_TEMPLATE_NAME, validate, validationSchema } from './formikConfig'
import { ACTION_BUY_NEW, ACTION_GO_HOME, KEY_ACTIVE_STEP, KEY_COMPLETED_CONTRACT_ACTION_TYPE, KEY_CONTRACT_ID, KEY_ID_CONTACT, KEY_PAY_CONTRACT_STATUS, MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { backStep, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import * as copr from './formik-config/copr'
import * as insurBuyer from './formik-config/insurBuyer'
import * as pers from './formik-config/pers'
import { resetState } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { getDefault_persOrCoprObj, getDefault_insurBuyerObj, getDefault_completeContractObj } from './utility'
import { backHome } from '../../../../../../ultity'
import { completeContract } from '../../../../../../redux/actions/insurance-app/appConfig'

const Step6 = () => {
    const {
        [KEY_ACTIVE_STEP]: activeStep,
        [KEY_PAY_CONTRACT_STATUS]: payContractStatus,
        [KEY_CONTRACT_ID]: contractId,
        [KEY_COMPLETED_CONTRACT_ACTION_TYPE]: completedActionType,
        [KEY_ID_CONTACT]: idContact
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }
    const dispatch = useDispatch()

    function submit(values) {
        const completedAction = () => {
            switch (completedActionType) {
                case ACTION_BUY_NEW:
                    dispatch(resetState())
                    break
                case ACTION_GO_HOME:
                    backHome()
                    break
            }
        }
        values[KEY_ID_CONTACT] = idContact
        dispatch(
            completeContract(
                values[KEY_INVOICE_TYPE],
                getDefault_insurBuyerObj(values),
                getDefault_persOrCoprObj(values),
                getDefault_completeContractObj(values, contractId),
                completedAction
            )
        )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        onSubmit: submit,
        validate: validate
    })

    const _keys = {
        invoiceTypeInsurBuyer: {
            KEY_ID_PERSON_TYPE: insurBuyer.KEY_ID_PERSON_TYPE,
            KEY_NAME: insurBuyer.KEY_NAME,
            KEY_ADDRESS: insurBuyer.KEY_ADDRESS,
            KEY_PHONE_NUMBER: insurBuyer.KEY_PHONE_NUMBER,
            KEY_EMAIL: insurBuyer.KEY_EMAIL,
            KEY_IC_NO: insurBuyer.KEY_IC_NO,
        },
        invoiceTypePers: {
            KEY_ID_PERSON_TYPE: pers.KEY_ID_PERSON_TYPE,
            KEY_IC_NO: pers.KEY_IC_NO,
            KEY_ADDRESS: pers.KEY_ADDRESS,
            KEY_PHONE_NUMBER: pers.KEY_PHONE_NUMBER,
            KEY_EMAIL: pers.KEY_EMAIL,
            KEY_NAME: pers.KEY_NAME,
        },
        invoiceTypeCops: {
            KEY_TAX_ID: copr.KEY_TAX_ID,
            KEY_NAME_COPR: copr.KEY_NAME_COPR,
            KEY_ADDRESS: copr.KEY_ADDRESS,
            KEY_PHONE_NUMBER: copr.KEY_PHONE_NUMBER,
            KEY_EMAIL: copr.KEY_EMAIL,
        },
        KEY_INVOICE_TYPE: KEY_INVOICE_TYPE,
        KEY_IS_SAVE_TEMPLATE: KEY_IS_SAVE_TEMPLATE,
        KEY_TEMPLATE_NAME: KEY_TEMPLATE_NAME
    }

    const goHome = () => {
        dispatch(
            updateProps([
                {
                    prop: KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: ACTION_GO_HOME
                }
            ])
        )
        enableValidateOnChange()
        formik.handleSubmit()
    }

    const newContract = () => {
        dispatch(
            updateProps([
                {
                    prop: KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: ACTION_BUY_NEW
                }
            ])
        )
        enableValidateOnChange()
        formik.handleSubmit()
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title} >
            <CardBody>
                <FormikProvider value={formik}>
                    <Completed
                        payContractStatus={payContractStatus}
                        keys={_keys}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    handleSubmitClick={formik.handleSubmit}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    backStep={backStep.bind(null, activeStep)}
                    handleGoHome={goHome}             // can omitted
                    handleNewContract={newContract}   // can omitted
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step6