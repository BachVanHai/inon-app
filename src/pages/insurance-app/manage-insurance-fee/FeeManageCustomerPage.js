import React from 'react';
import FeeManageComponent from "./component/FeeManageComponent"
class FeeManageCustomerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleClick = () => {
    }

    render() {
        return (
            <FeeManageComponent role="NONRESIDENT"/>
        );
    }
}
export default FeeManageCustomerPage