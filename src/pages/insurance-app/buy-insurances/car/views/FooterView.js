import React from 'react'
import Origin from '../../../../../components/insurance-app/buy-insurances-page/footer'
/**
 @example
    <Footer
         constantVals={{ MAX_STEP: MAX_STEP, REDUX_STATE_NAME: REDUX_STATE_NAME }}
         backStep={backStep.bind(null, activeStep)}
         handleSubmitClick={handleSubmitClick}
         handlePayDebtClick={handlePayDebtClick}
         enableValidateOnChange={enableValidateOnChange}
         handleGoHome={handleGoHome}             // can omitted
         handleNewContract={handleNewContract}   // can omitted
       />
 */
const FooterView = ({ constantVals = { MAX_STEP: 5, REDUX_STATE_NAME: "stateName" },
    handleSubmitClick, backStep, handlePayDebtClick, handlePayBonusClick, enableValidateOnChange, handleGoHome, handleNewContract }) => {

    return (
        <Origin
            constantVals={constantVals}
            handleSubmitClick={handleSubmitClick}
            backStep={backStep}
            handlePayDebtClick={handlePayDebtClick}
            handlePayBonusClick={handlePayBonusClick}
            enableValidateOnChange={enableValidateOnChange}
            handleGoHome={handleGoHome}
            handleNewContract={handleNewContract}
        />
    )
}

export default FooterView
