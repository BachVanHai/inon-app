import React from 'react';
import { ROLE_ALL } from '../../../configs/insurance-app';
import InsuranceManageComponent from "./OverallView"
class InsuranceManageAllPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <InsuranceManageComponent role={ROLE_ALL} />
        )
    }
}

export default InsuranceManageAllPage