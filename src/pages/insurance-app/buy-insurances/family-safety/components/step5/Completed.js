import 'react-toggle/style.css'
import React from 'react';
import Original from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'

const Completed = ({ payContractStatus }) => {
    return (
        <Original
            payContractStatus={payContractStatus}
        />
    )
}

export default Completed
