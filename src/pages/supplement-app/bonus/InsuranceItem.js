
import React, { useEffect } from 'react'
import { DatePicker } from "base-app"
import { useState } from "react"
import { ChevronDown, DollarSign } from "react-feather"
import { FormattedMessage } from "react-intl"
import { Col, Row, Collapse, Modal, ModalHeader } from 'reactstrap'
import StatisticsCards from "../../../components/supplement-app/StatisticsCard"
import { getKeyLang } from "../../../configs/supplement-app"
import classNames from 'classnames'
import moment from 'moment'

const InsuranceItem = ({ insurance, onChangeEndValueDate, onChangeSettingValue , readOnly}) => {
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


    const onChangeItemValue = (value, code) => {
        onChangeSettingValue(value, code)
    }

    const onChangeDate = (value) => {
        onChangeEndValueDate(moment(value[0]).format('YYYY-MM-DDT00:00:00[z]'))
    }



    return (
        <React.Fragment>
            <Col
                sm='12'
                className={classNames('bonus', {
                    'collapse-collapsed': status === 'Closed',
                    'collapse-shown': status === 'Opened',
                    closing: status === 'Closing...',
                    opening: status === 'Opening...'
                })}
            >
                <Row className='d-flex justify-content-between mt-2'>
                    <div className='font-weight-bold'>
                        <FormattedMessage
                            id={getKeyLang(`bonus.insurance.${insurance.keyLang}`)}
                        />
                    </div>
                    <div style={{ minWidth: '30px' }}>
                        <ChevronDown
                            className='collapse-icon cursor-pointer'
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
                    {insurance.insurances && insurance.isEnabled &&
                        insurance.insurances.map((insurance2) => (
                            insurance2.isEnabled ? <div key={insurance2.id}>
                                <div className='text-center font-weight-bold bg-primary text-white p-1'>
                                    <FormattedMessage
                                        id={getKeyLang(`bonus.insurance.${insurance2.keyLang}`)}
                                    />
                                </div>
                                <Row className='m-0' style={{backgroundColor : '#f1f1f1'}}>
                                    {insurance2.insurances.map((item) => item.isEnabled ? (
                                        <Col xs={12} md={6} lg={4} className='p-0 p-md-1 p-lg-3' key={item.id}>
                                            <StatisticsCards
                                                icon={<DollarSign className='danger' size={22} />}
                                                hideChart
                                                iconRight
                                                readOnly={readOnly}
                                                iconBg="primary"
                                                value={item.setting.value || 0}
                                                maxValue={item.setting.maxValue || 0}
                                                id={item.name || ''}
                                                onChangeValue={onChangeItemValue}
                                                statTitle={<FormattedMessage
                                                    id={getKeyLang(`bonus.insurance.${item.keyLang}`)}
                                                />}
                                            />
                                        </Col>
                                    ) : '')}
                                </Row>
                            </div> : ''
                        ))}
                    <div className='text-center font-weight-bold bg-primary text-white p-1'>
                        <FormattedMessage
                            id={getKeyLang(`bonus.effectiveDate`)}
                        />
                    </div>
                    <DatePicker className='form-control position-relative bg-white mt-1' disabled={readOnly} options={{ dateFormat: 'm/d/Y' }} onChange={onChangeDate} value={insurance.startValueDate} />
                </Collapse>
            </Col>
        </React.Fragment>
    )
}

export default InsuranceItem
