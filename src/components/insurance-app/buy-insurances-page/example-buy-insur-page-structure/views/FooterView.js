import React from 'react'
import Origin from '../../footer'
// import Origin from '../../../../../components/insurance-app/buy-insurances-page/footer'

const FooterView = ({ constantVals = { MAX_STEP: 5, REDUX_STATE_NAME: "stateName" },
    handleSubmitClick, resetState, backStep, handlePayDebtClick, enableValidateOnChange
}) => {
    
    return (
        <Origin
            constantVals={constantVals} handleSubmitClick={handleSubmitClick}
            resetState={resetState} backStep={backStep}
            handlePayDebtClick={handlePayDebtClick}
            enableValidateOnChange={enableValidateOnChange}
        />
    )
}

export default FooterView