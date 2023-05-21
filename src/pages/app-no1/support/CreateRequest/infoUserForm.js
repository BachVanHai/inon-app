import { BaseFormGroup, FormattedMessage, Radio, Select } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import { HIGH, LIST_CHANNEL, MEDIUM } from '../utility'
import { DROP } from './utility'

const InfoUserForm = ({
  handleOnchangeFieldName,
  setUserName,
  setUserEmail,
  setUserPhoneNumber,
  prioritized,
  setPrioritized,
  setFieldValue,
  setchannelType
}) => {
  const intl = useIntl()
  return (
    <div>
      <h6 className='font-weight-bold mb-2' style={{ color: '#106D5A' }}>
        <FormattedMessage id={getKeyLang('support.detail.infoCustommer')} />
      </h6>
      <Row>
        <Col lg='6' md='12'>
          <BaseFormGroup
            messageId={getKeyLang('support.create.fullName')}
            fieldName='name'
            errors
          />
        </Col>
        <Col lg='6' md='12'>
          <BaseFormGroup
            messageId={getKeyLang('support.create.phoneNumber')}
            fieldName='phoneNumber'
            errors
          />
        </Col>
      </Row>
      <Row>
        <Col lg='6' md='12'>
          <BaseFormGroup
            messageId={getKeyLang('support.create.email')}
            fieldName='email'
            errors
          />
        </Col>
        <Col lg='6' md='12'>
          <Select
            options={LIST_CHANNEL}
            placeholder={intl.formatMessage({
              id: getKeyLang('support.create.channel')
            })}
            onChange={(original) => setchannelType(original.value)}
          />
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col md={8}>
          <Row>
            <Col md='3' xs='12'>
              <div className='mb-1 d-flex align-items-center'>
                <span style={{ marginTop: '2px' }}>
                  <FormattedMessage
                    id={getKeyLang('support.create.priority')}
                  />
                </span>
              </div>
            </Col>
            <Col md='3' xs='12'>
              <div className='d-flex align-items-center mb-1'>
                <Radio
                  checked={prioritized === DROP}
                  onChange={() => {
                    setPrioritized(DROP)
                    setFieldValue('priority', DROP)
                  }}
                />
                <span>
                  <FormattedMessage
                    id={getKeyLang('support.create.noPriority')}
                  />
                </span>
              </div>
            </Col>
            <Col md='3' xs='12'>
              <div className='d-flex align-items-center mb-1'>
                <Radio
                  checked={prioritized === MEDIUM}
                  onChange={() => {
                    setPrioritized(MEDIUM)
                    setFieldValue('priority', MEDIUM)
                  }}
                />
                <span>
                  <FormattedMessage id={getKeyLang('support.create.medium')} />
                </span>
              </div>
            </Col>
            <Col md='3' xs='12'>
              <div className='d-flex align-items-center mb-1'>
                <Radio
                  checked={prioritized === HIGH}
                  onChange={() => {
                    setPrioritized(HIGH)
                    setFieldValue('priority', HIGH)
                  }}
                />
                <span>
                  <FormattedMessage id={getKeyLang('support.create.high')} />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default InfoUserForm
