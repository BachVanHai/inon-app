import React from 'react'
import Origin from '../../../../../components/insurance-app/buy-insurances-page/footer'

const FooterView = ({
    constantVals = { MAX_STEP: 5, REDUX_STATE_NAME: "stateName" }, beforeSubmitClicked,
    enableValidateOnChange, handleSubmitClick, backStep, handlePayDebtClick, handlePayBonusClick,
    handleGoHome, handleNewContract
}) => {

    return (
        <Origin
            constantVals={constantVals}
            backStep={backStep}
            enableValidateOnChange={enableValidateOnChange}
            beforeSubmitClicked={beforeSubmitClicked} // can omitted
            handleSubmitClick={handleSubmitClick}
            handleGoHome={handleGoHome}
            handleNewContract={handleNewContract}
            handlePayDebtClick={handlePayDebtClick}
            handlePayBonusClick={handlePayBonusClick}
        />
    )
}

export default FooterView