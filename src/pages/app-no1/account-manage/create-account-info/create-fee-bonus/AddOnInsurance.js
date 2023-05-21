import React, {useState} from "react";
import {Col, Collapse, Row} from "reactstrap";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";
import {getKeyLang} from "../../../../../configs/app-no1";
import {ChevronDown} from "react-feather";
import InsuranceInfo from "./InsuranceInfo";
import Toggle from "react-toggle";

const AddOnInsurance = ({insurance, onClickCheckEnabled}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState('Closed')

    const toggleCollapse = () => {
        setIsOpen(!isOpen)
    }

    const onEntered = () => {
        setStatus('Opened')
    }

    const onExiting = () => {
        setStatus('Closing...')
    }

    const onEntering = () => {
        setStatus('Opening...')
    }

    const onExited = () => {
        setStatus('Closed')
    }

    return (
        <div>
            <Col
                sm='12'
                md='6'
                className={classNames('insurance-setting-item', {
                    'collapse-collapsed': status === 'Closed',
                    'collapse-shown': status === 'Opened',
                    closing: status === 'Closing...',
                    opening: status === 'Opening...'
                })}
            >
                <Row className='d-flex justify-content-between mt-2'>
                    <div className='font-weight-bold'>
                        <FormattedMessage
                            id={getKeyLang(`account.insurance.${insurance.keyLang}`)}
                        />
                    </div>
                    <div style={{minWidth: '30px'}}>
                        <ChevronDown
                            className='collapse-icon'
                            size={24}
                            onClick={toggleCollapse}
                        />
                    </div>
                </Row>
                <Collapse
                    className='mt-2'
                    isOpen={isOpen}
                    onExited={onExited}
                    onEntered={onEntered}
                    onExiting={onExiting}
                    onEntering={onEntering}
                >
                    {insurance.insurances.map((item) => (
                        <Row className='d-flex justify-content-between mt-2' key={item.id}>
                            <Col sm={12} md={9} className='d-flex align-items-center p-0'>
                                <FormattedMessage
                                    id={getKeyLang(`account.insurance.${item.keyLang}`)}
                                />
                                <div style={{minWidth: '20px'}}>
                                    <InsuranceInfo insuranceSetting={item}/>
                                </div>
                            </Col>
                            <Col sm={12} md={3} className='p-0 mt-2 md-0'>
                                <Toggle
                                    icons={false}
                                    checked={item.isEnabled}
                                    onChange={(e) => onClickCheckEnabled(e, item)}
                                />
                            </Col>
                        </Row>
                    ))}
                </Collapse>
            </Col>
            <hr/>
        </div>
    )
}

export default AddOnInsurance
