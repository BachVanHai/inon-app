import React from 'react';
import { ROLE_PARTNER } from '../../../configs/insurance-app';
import InsuranceManageComponent from "./OverallView"
class InsuranceManagePartnerPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <InsuranceManageComponent role={ROLE_PARTNER} />
        )
    }
}

export default InsuranceManagePartnerPage