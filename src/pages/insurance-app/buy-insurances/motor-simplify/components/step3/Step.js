import React, { useState } from 'react'
import { CardBody, CardFooter } from 'reactstrap'
import { FormikProvider, useFormik } from 'formik'
import { initialValues, invoiceTypeCops, invoiceTypeInsurBuyer, invoiceTypePers, KEY_INVOICE_TYPE, KEY_IS_SAVE_TEMPLATE, KEY_TEMPLATE_NAME, validate, validationSchema } from './formikConfig'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import StepForm from './StepForm'
import { useDispatch } from 'react-redux'
import { BASE, KEY_OWNER_ID, SIMPLIFY_MAX_STEP } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { useSelector } from 'react-redux'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { backHome } from '../../../../../../ultity'
import { resetState } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { completeContract } from '../../../../../../redux/actions/insurance-app/appConfig'
import { INVOICE_TYPE_COPR, INVOICE_TYPE_PERS } from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { ID_TYPE_CMND } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

const Step = () => {
    const dispatch = useDispatch()
    const { [BASE.KEY_ACTIVE_STEP]: activeStep,
        [BASE.KEY_PAY_CONTRACT_STATUS]: payContractStatus,
        [BASE.KEY_COMPLETED_CONTRACT_ACTION_TYPE]: completedActionType,
        [BASE.KEY_CONTRACT_ID]: contractId,
        [KEY_OWNER_ID]: ownerId,
    } = useSelector(state => state.app[REDUX_STATE_NAME])
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const submit = (values) => {
        const completedAction = () => {
            switch (completedActionType) {
                case BASE.ACTION_BUY_NEW:
                    dispatch(resetState())
                    break
                case BASE.ACTION_GO_HOME:
                    backHome()
                    break
            }
        }

        const getDefault_insurBuyerObj = (values) => {
            return ({
                fullName: values[invoiceTypeInsurBuyer.KEY_NAME],
                phoneNumber: values[invoiceTypeInsurBuyer.KEY_PHONE_NUMBER],
                email: values[invoiceTypeInsurBuyer.KEY_EMAIL],
                address: values[invoiceTypeInsurBuyer.KEY_ADDRESS],
                icNo: values[invoiceTypeInsurBuyer.KEY_IC_NO],
                id: ownerId,
            })
        }
        const getDefault_persOrCoprObj = (values) => {
            return ({
                icType: ID_TYPE_CMND,
                icNo: values[invoiceTypePers.KEY_IC_NO] || values[invoiceTypeCops.KEY_TAX_ID],
                fullName: values[invoiceTypePers.KEY_NAME] || values[invoiceTypeCops.KEY_NAME_COPR],
                phoneNumber: values[invoiceTypePers.KEY_PHONE_NUMBER] || values[invoiceTypeCops.KEY_PHONE_NUMBER],
                email: values[invoiceTypePers.KEY_EMAIL] || values[invoiceTypeCops.KEY_EMAIL],
                address: values[invoiceTypePers.KEY_ADDRESS] || values[invoiceTypeCops.KEY_ADDRESS],
                type: values[KEY_INVOICE_TYPE] === INVOICE_TYPE_PERS ? INVOICE_TYPE_PERS : INVOICE_TYPE_COPR
            })
        }
        const getDefault_completeContractObj = (values, contractId) => {
            return ({
                id: contractId,
                taxInvoiceType: values[KEY_INVOICE_TYPE],
                taxInvoiceReceiverId: "",
                certReceiverId: "",
                isSaveTemplate: values[KEY_IS_SAVE_TEMPLATE],
                templateName: values[KEY_TEMPLATE_NAME],
            })
        }

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
        validate: validate,
        onSubmit: submit,
    })

    const goHome = () => {
        dispatch(
            updateProps([
                {
                    prop: BASE.KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: BASE.ACTION_GO_HOME
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
                    prop: BASE.KEY_COMPLETED_CONTRACT_ACTION_TYPE,
                    value: BASE.ACTION_BUY_NEW
                }
            ])
        )
        enableValidateOnChange()
        formik.handleSubmit()
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <FormikProvider value={formik}>
                    <StepForm
                        formik={formik}
                        payContractStatus={payContractStatus}
                    />
                </FormikProvider>
            </CardBody>

            <CardFooter>
                <FooterView
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: SIMPLIFY_MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                    handleNewContract={newContract}
                    handleGoHome={goHome}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step