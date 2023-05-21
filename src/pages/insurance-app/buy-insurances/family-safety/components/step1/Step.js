import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { useFormik, FormikProvider } from 'formik'
import Person from './Person'
import Organization from './Organization'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
    PERSON_TAB, ORGANIZATION_TAB, initialValues_pers, validate_organization, validate_pers,
    validationSchema_pers, initialValues_organization, validationSchema_organization
} from './formikConfig'
import { getDefault_customerObj, getDefault_updateCustomerObj } from './utility'
import {
    nextStep,
    updateStepInfo,
    createContract,
    updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import Service from '../../../../../../services/insurance-app/buyInsurancesFamilySafety'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import {
    KEY_ACTIVE_STEP, KEY_BUYER_TYPE, KEY_CONTRACT_ID,
    KEY_STEP_1, MAX_STEP, TYPE_BUYER_GROUP, TYPE_BUYER_PERSONAL
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import FooterView from '../../views/FooterView'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

const Step1 = () => {
    const dispatch = useDispatch()
    const { [KEY_STEP_1]: step_1, [KEY_CONTRACT_ID]: contractId, [KEY_ACTIVE_STEP]: activeStep }
        = useSelector(state => state.app[REDUX_STATE_NAME])
    const { tabActive } = step_1
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const [_tabActive, setTabActive] = useState(tabActive || PERSON_TAB)

    const next = (values) => {
        const stepInfo = { ...values, tabActive: _tabActive }
        dispatch(updateStepInfo(stepInfo))
        dispatch(nextStep(activeStep))

        if (contractId) {
            stepInfo[`contractId`] = contractId
            Service.updateContract(
                getDefault_updateCustomerObj(stepInfo), contractId
            )
            return
        }
        dispatch(
            createContract(
                getDefault_customerObj(stepInfo)
            )
        )
    }

    const enableValidateOnChange = () => {
        setValidateOnChange(true)
    }

    const decideSubmitCallback = (persSubmit, organizationSubmit) => {
        if (_tabActive === PERSON_TAB) {
            return persSubmit
        }
        return organizationSubmit
    }

    const formik_pers = useFormik({
        initialValues: initialValues_pers,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema_pers,
        validate: validate_pers,
        onSubmit: next,
    })

    const formik_organizatino = useFormik({
        initialValues: (initialValues_organization),
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema_organization,
        validate: validate_organization,
        onSubmit: next,
    })

    const toggle = (tab) => {
        if (_tabActive !== tab) {
            setTabActive(tab)
        }
    }

    return (
        <StepBase titleMsg={getStepComponent(activeStep).title}>
            <CardBody>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            active={_tabActive === PERSON_TAB}
                            onClick={() => {
                                toggle(PERSON_TAB)
                                dispatch(
                                    updateProps(
                                        [
                                            {
                                                prop: KEY_BUYER_TYPE,
                                                value: TYPE_BUYER_PERSONAL
                                            },
                                        ]
                                    )
                                )
                            }}
                        >
                            <FormattedMessage id={getKeyLang(`Pers`)} />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={_tabActive === ORGANIZATION_TAB}
                            onClick={() => {
                                toggle(ORGANIZATION_TAB)
                                dispatch(
                                    updateProps(
                                        [
                                            {
                                                prop: KEY_BUYER_TYPE,
                                                value: TYPE_BUYER_GROUP
                                            },
                                        ]
                                    )
                                )
                            }}
                        >
                            <FormattedMessage id={getKeyLang(`organization`)} />
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='py-50 mt-2' activeTab={_tabActive}>
                    <TabPane tabId={PERSON_TAB}>
                        <FormikProvider value={formik_pers}>
                            <Person className={`mb-1`}
                                formik={formik_pers}
                                stepInfo={step_1}
                            />
                        </FormikProvider>
                    </TabPane>
                    <TabPane tabId={ORGANIZATION_TAB}>
                        <FormikProvider value={formik_organizatino}>
                            <Organization className={`mb-1`}
                                formik={formik_organizatino}
                                stepInfo={step_1}
                            />
                        </FormikProvider>
                    </TabPane>
                </TabContent>
            </CardBody>
            <CardFooter>
                <FooterView
                    handleSubmitClick={decideSubmitCallback(formik_pers.handleSubmit, formik_organizatino.handleSubmit)}
                    enableValidateOnChange={enableValidateOnChange}
                    constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
                />
            </CardFooter>
        </StepBase>
    )
}

export default Step1
