
import React from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
    Input
} from 'reactstrap'
import {
    AppId
} from 'base-app'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import PropTypes from 'prop-types'
import CurrencyInput from '../../../../components/insurance-app/input/CurrencyInput'

class EditInputComponent extends React.Component {

    constructor(props) {
        super(props);

        this.updateData = this.updateData.bind(this);
        this.state = { value: props.value, type: props.type }
    }

    static propTypes = {
        value: PropTypes.number,
        onUpdate: PropTypes.func.isRequired
    }

    static defaultProps = {
        value: 0
    }
    getValue() {
        console.log(this.state.value)
        return this.state.value
    }

    closeEditor() {
        // console.log(this.state.value)
        return this.props.value;
    }
    componentDidMount() {
        // this.nameInput.focus();
    }


    updateData() {
        this.props.onUpdate(this.state.value);
    }
    render() {
        const { type, onUpdate, ...rest } = this.props;
        let input;
        if (type === 'NUM') {
            input = <CurrencyInput
                {...rest}
                className={`form-control form-label-group`}
                key="range"
                // ref={(Input) => { this.nameInput = Input; }}
                type="text"
                placeholder={`${AppId.INSURANCE_APP}.Input`}
                value={this.state.value}
                onChange={e => {
                    this.setState({ value: e.target.value });
                }}
                autoFocus
            />
        } else {
            input = <Input
                {...rest}
                key="range"
                ref={(Input) => { this.nameInput = Input; }}
                value={this.state.value}
                onChange={e => {
                    if (this.state.type === 'PERCENT')
                        this.setState({ value: Utils.floatFomat(e.target.value) });
                    else if (this.state.type === 'NUM')
                        this.setState({ value: Utils.removeChar(e.target.value) });
                    else
                        this.setState({ value: e.target.value });
                }}
                autoFocus
            />
        }
        return [
            input
        ];
    }
}

export default EditInputComponent