import React from 'react'
import { ROLE_PERSONAL } from '../../../configs/insurance-app'
import InsuranceManageComponent from "./OverallView"
class InsuranceManagePersPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <InsuranceManageComponent role={ROLE_PERSONAL} />
        )
    }
}

export default InsuranceManagePersPage