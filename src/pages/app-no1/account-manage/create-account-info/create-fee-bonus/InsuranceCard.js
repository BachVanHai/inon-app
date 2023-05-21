import React, {useCallback, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Collapse, Row} from "reactstrap";
import classNames from "classnames";
import {Check, ChevronDown, ChevronRight} from "react-feather";
import {FormattedMessage} from "react-intl";
import {ADD_ON_INSURANCE, ADD_SETTING_INSURANCE, getKeyLang} from "../../../../../configs/app-no1";
import {AppId, BaseAppConfigs, Checkbox} from "base-app";
import AddOnInsurance from "./AddOnInsurance";
import InsuranceInfo from "./InsuranceInfo";
import Toggle from "react-toggle";
import {useSelector} from "react-redux";

const InsuranceCard = ({insurance, onChangeStatus, userId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState('Closed')
    const [, updateState] = useState()
    const {groupId} = useSelector(state => state.auth.user)
    const forceUpdate = useCallback(() => updateState({}), [])

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

    const onClickCheckEnabled = (e, item) => {
        item.isEnabled = e.target.checked
        onChangeStatus(item)
        forceUpdate()
    }

    const onClickGotoBonusSettings = () => {
        const canViewAll = [BaseAppConfigs.USER_ROLE.ADMIN, BaseAppConfigs.USER_ROLE.HTKD].indexOf(groupId) >= 0;
        const url = `${window.location.origin}/${BaseAppConfigs.getContextPath(AppId.SUPPLEMENT_APP)}/bonus/${canViewAll ? 'all' : 'partner'}/?userId=${userId}`
        window.open(url)
    }

    const onClickGotoFeeSettings = (insuranceSetting) => {
        const canViewAll = [BaseAppConfigs.USER_ROLE.ADMIN, BaseAppConfigs.USER_ROLE.HTKD].indexOf(groupId) >= 0;
        const type = canViewAll ? 'ALL' : 'AGENCY'
        const vehicle = insuranceSetting.code.startsWith('MOTOBIKE') ? 'MOTOR' : 'CAR'
        const host = `${window.location.origin}/${BaseAppConfigs.getContextPath(AppId.INSURANCE_APP)}`;
        const url = `${host}/insurance-fee/fee-partner-config/?userId=${userId}&type=${type}&vehicle=${vehicle}`
        window.open(url)
    }

    return (
        <React.Fragment>
            <Card
                key={insurance.id}
                className={classNames('insurance-card card-action', {
                    'collapse-collapsed': status === 'Closed',
                    'collapse-shown': status === 'Opened',
                    closing: status === 'Closing...',
                    opening: status === 'Opening...'
                })}
            >
                <CardHeader>
                    <CardTitle className='col-10 p-0 text-uppercase'>{insurance.name}</CardTitle>
                    <div style={{minWidth: '30px'}}>
                        <ChevronDown
                            className='collapse-icon'
                            size={24}
                            onClick={toggleCollapse}
                        />
                    </div>
                </CardHeader>
                <Collapse
                    isOpen={isOpen}
                    onExited={onExited}
                    onEntered={onEntered}
                    onExiting={onExiting}
                    onEntering={onEntering}
                >
                    <CardBody>
                        {insurance.insurances &&
                        insurance.insurances.map((item) => (
                            <div key={item.code} className='insurance-box card p-1 p-lg-2'>
                                <div className='d-flex align-items-center'>
                    <span className='mr-2 font-weight-bold text-prim'>
                      <FormattedMessage
                          id={getKeyLang(`account.insurance.${item.keyLang}`)}
                      />
                    </span>
                                    <Checkbox
                                        color='primary'
                                        checked={item.isEnabled}
                                        icon={<Check className='vx-icon' size={16}/>}
                                        onChange={(e) => onClickCheckEnabled(e, item)}
                                    />
                                </div>
                                {item.insurances.map((insuranceSetting) =>
                                    insuranceSetting.code === ADD_ON_INSURANCE ? (
                                        <AddOnInsurance
                                            insurance={insuranceSetting}
                                            onClickCheckEnabled={onClickCheckEnabled}
                                        />
                                    ) : (
                                        <div>
                                            <Col
                                                sm='12'
                                                md='6'
                                                className='insurance-setting-item p-2'
                                            >
                                                <Row className='d-flex justify-content-between mt-2'>
                                                    <Col
                                                        sm='12'
                                                        md='9'
                                                        className='font-weight-bold d-flex align-items-center p-0'
                                                    >
                                                        <FormattedMessage
                                                            id={getKeyLang(
                                                                `account.insurance.${insuranceSetting.keyLang}`
                                                            )}
                                                        />
                                                        <div style={{minWidth: '20px'}}>
                                                            <InsuranceInfo
                                                                insuranceSetting={insuranceSetting}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col sm='12' md='3' className='mt-2 md-0 p-0'>
                                                        <Toggle
                                                            icons={false}
                                                            checked={insuranceSetting.isEnabled}
                                                            onChange={(e) =>
                                                                onClickCheckEnabled(e, insuranceSetting)
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                                {!insuranceSetting.code.startsWith(
                                                    ADD_SETTING_INSURANCE
                                                ) ? (
                                                    <React.Fragment>
                                                        <Row className='d-flex justify-content-between mt-2'>
                                                            <Col className='font-weight-bold' sm='8'>
                                                                <FormattedMessage
                                                                    id={getKeyLang(
                                                                        `account.createFeeAndBonus.feeRate`
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col sm='3'>
                                                              <span className='cursor-pointer'
                                                                    onClick={() => onClickGotoFeeSettings(insuranceSetting)}>
                                                                <ChevronRight size={24}/>
                                                              </span>
                                                            </Col>
                                                        </Row>
                                                        <Row className='d-flex justify-content-between mt-2'>
                                                            <Col className='font-weight-bold' sm='8'>
                                                                <FormattedMessage
                                                                    id={getKeyLang(
                                                                        `account.createFeeAndBonus.bonusPoint`
                                                                    )}
                                                                />
                                                            </Col>
                                                            <Col sm='3'>
                                                              <span className='cursor-pointer'
                                                                    onClick={onClickGotoBonusSettings}>
                                                                <ChevronRight size={24}/>
                                                              </span>
                                                            </Col>
                                                        </Row>
                                                    </React.Fragment>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                            <hr/>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </CardBody>
                </Collapse>
            </Card>
        </React.Fragment>
    )
}

export default InsuranceCard
