import React, { useEffect } from 'react'
import { useIntl } from "react-intl"
import { useDispatch } from 'react-redux'
import { history } from "../../../history"
import {
    addAppContextPath, getKeyLang,
} from '../../../configs/insurance-app'
import { assignInsuranceType } from '../../../redux/actions/insurance-app/appConfig'
import useConfirm from '../../../components/insurance-app/custom-modal/confirm/useConfirm'
import { getMyDebtAccount } from "../../../redux/actions/insurance-app/appConfig"
import Original from "../../../components/insurance-app/buy-insurances-page"
import * as ul from '../../../redux/reducers/insurance-app/utility'

const BuyInsuranceCarPage = () => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const [openConfirm, ConfirmModal] = useConfirm(
        intl.formatMessage({ id: getKeyLang(`confirm.title.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.content.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.yesBtnLabel.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.noBtnLabel.newContract`) })
    )

    const handleInsuranceClick = (reduxState, ENDPOINT_PATH, INSURANCE_TYPE, action, MAX_STEP) => {
        const letUserIn = (ENDPOINT_PATH, INSURANCE_TYPE) => {
            history.push(addAppContextPath(ENDPOINT_PATH))
            dispatch(assignInsuranceType(INSURANCE_TYPE))
        }

        const setupObj = {
            yesAction: () => { /** it invoke when user click "yesBtn" aka the agree-reset button */
                action && dispatch(action.resetState())
                letUserIn(ENDPOINT_PATH, INSURANCE_TYPE)
            },
            noAction: () => { /** it invoke when user click "no" aka the continue button */
                if (reduxState[ul.KEY_LAST_ENDPOINT_PATH] &&
                    reduxState[ul.KEY_LAST_ENDPOINT_PATH] !== ENDPOINT_PATH) {
                    /** avoid redux-state conflict when current-insurance !== last-insurance, so we have to reset all state to default */
                    action && dispatch(action.resetState())
                }
                letUserIn(ENDPOINT_PATH, INSURANCE_TYPE)
            }
        }
        
        /* it's happened when client has clicked paid button */
        if (MAX_STEP && reduxState.activeStep === MAX_STEP) {
            letUserIn(ENDPOINT_PATH, INSURANCE_TYPE)
            action && dispatch(action.resetState())
            return
        }
        if (!reduxState.contractId && reduxState.activeStep <= 1) {
            letUserIn(ENDPOINT_PATH, INSURANCE_TYPE)
            action && dispatch(action.resetState())
            return
        }

        openConfirm(setupObj)
    }

    useEffect(() => {
        dispatch(getMyDebtAccount())
    }, [])

    return (
        <>
            {ConfirmModal}
            <Original pageType="buy-insurance" handleInsuranceClick={handleInsuranceClick} isShowTemplateBtn={true} />
        </>
    )
}

export default BuyInsuranceCarPage