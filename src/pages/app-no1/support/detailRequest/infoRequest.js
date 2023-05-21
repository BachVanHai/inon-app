import { FormattedMessage } from 'base-app'
import React, { useState } from 'react'
import * as Icon from 'react-feather'
import { Card, Col, Collapse, Row } from 'reactstrap'
import '../../../../assets/scss/app-no1/support.scss'
import { getKeyLang } from '../../../../configs/app-no1'
import {
  ASSURANCE_COMPENSATION,
  convertDateISOstring,
  CUSTOMER_SERVICE, EMAIL, FEEDBACK, HOTLINE, OTHER,
  PAYMENT,
  PRODUCT, SOCIAL, TECHNOLOGY,
  WEBSITE
} from '../utility'
import { default_activedIcons } from '../../../../components/elite-app/chat-box/VoteModal'

const InfoRequest = ({ info }) => {
  const [collapseStatus, setCollapseStatus] = useState(false)
  const toggle = () => {
    setCollapseStatus(!collapseStatus)
  }
  const score = info?.voteScore ? info?.voteScore.charAt(0) : null
  const comment = info?.voteScore ? info?.voteScore.substring(4) : null
  const filterScore = default_activedIcons.filter(_elt => {
    return _elt.contentValue === Number(score)
  })

  return (
    <Row className='detail-request'>
      <Col md='12' lg='6' xs='12'>
        <div className='mb-1'>
          <Row>
            <Col md='12' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage
                  id={getKeyLang('support.myrequest.table.requestCode')}
                />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              {info?.code}
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage
                  id={getKeyLang('support.myrequest.table.classify')}
                />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              {info?.type === PRODUCT ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.product')}
                />
              ) : info?.type === CUSTOMER_SERVICE ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.serviceCustomer')}
                />
              ) : info?.type === ASSURANCE_COMPENSATION ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.insurance')}
                />
              ) : info?.type === FEEDBACK ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.report')}
                />
              ) : info?.type === TECHNOLOGY ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.skill')}
                />
              ) : info?.type === PAYMENT ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.payment')}
                />
              ) : info?.type === OTHER ? (
                <FormattedMessage
                  id={getKeyLang('support.create.radio.other')}
                />
              ) : null}
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage
                  id={getKeyLang('account.exportReportOption.createdDate')}
                />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              {convertDateISOstring(info?.createdDate)}
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage id={getKeyLang('support.create.channel')} />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              {info.fromChannel === WEBSITE
                ? 'Website'
                : info.fromChannel === EMAIL
                  ? 'Email'
                  : info.fromChannel === HOTLINE
                    ? 'Hotline'
                    : info.fromChannel === SOCIAL
                      ? 'Social'
                      : info.fromChannel === OTHER
                        ? 'Khác'
                        : '-'}
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage
                  id={getKeyLang('support.management.handlingStaff')}
                />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              {info?.supporterInOnIdName}
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage id={getKeyLang('support.detail.voteScore')} />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>

              <div>
                {filterScore.map((_elt, index) => (
                  <div className="d-flex align-items-center" key={index}>
                    <img src={_elt.imgUrl_color} alt="" width="25" />
                    <div className="ml-1">{_elt.content}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
        <div className='mb-1'>
          <Row>
            <Col md='6' lg='4' xs='6'>
              <span className='font-weight-bold'>
                <FormattedMessage id={getKeyLang('support.detail.comment')} />
              </span>
            </Col>
            <Col md='6' lg='6' xs='6'>
              <div>{info?.voteScore === null || info?.voteScore === "" ? '-' : comment}</div>
            </Col>
          </Row>
        </div>
      </Col>
      {/* =====right==== */}
      <Col md='12' lg='6' xs='12'>
        <div className='detail-user-mobile'>
          <div
            color='primary'
            onClick={() => toggle()}
            style={{ marginBottom: '1rem' }}
            className='btn-collapse'
          >
            <div className='d-flex justify-content-between cursor-pointer'>
              <h4
                style={{
                  color: collapseStatus ? '#338955' : null
                }}
              >
                <FormattedMessage
                  id={getKeyLang('support.detail.infoCustommer')}
                />
              </h4>
              <div>
                {collapseStatus ? (
                  <Icon.ArrowDown color={collapseStatus ? '#338955' : null} />
                ) : (
                  <Icon.ArrowRight />
                )}
              </div>
            </div>
          </div>
          <Collapse isOpen={collapseStatus}>
            <Card>
              <div>
                <div className='mb-1'>
                  <Row>
                    <Col md='6' lg='3' xs='6'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.fullName')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='6' xs='6'>
                      {info?.hCUser?.name}
                    </Col>
                  </Row>
                </div>
                {info?.hCUser?.userIdInOn !== null ? (
                  <div className='mb-1'>
                    <Row>
                      <Col md='6' lg='3' xs='6'>
                        <span className='font-weight-bold'>
                          <FormattedMessage
                            id={getKeyLang('account.accountCode')}
                          />
                        </span>
                      </Col>
                      <Col md='6' lg='6' xs='6'>
                        {info?.hCUser?.userIdInOn}
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <div className='mb-1'>
                  <Row>
                    <Col md='6' lg='3' xs='6'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.phoneNumber')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='6' xs='6'>
                      {info?.hCUser?.phoneNumber}
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row>
                    <Col md='6' lg='3' xs='6'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.email')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='6' xs='6'>
                      {info?.hCUser?.email}
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row>
                    <Col md='6' lg='3' xs='6'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('support.detail.description')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='6' xs='6'>
                      {info?.note}
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Collapse>
        </div>
        <div className='detail-user-desktop'>
          <div className='mb-1'>
            <h5 className='font-weight-bold'>
              <FormattedMessage
                id={getKeyLang('support.detail.infoCustommer')}
              />
            </h5>
          </div>
          <div className='mb-1'>
            <Row>
              <Col md='6' lg='3' xs='6'>
                <span className='font-weight-bold'>
                  <FormattedMessage
                    id={getKeyLang('partner.account.fullName')}
                  />
                </span>
              </Col>
              <Col md='6' lg='6' xs='6'>
                {info?.hCUser?.name}
              </Col>
            </Row>
          </div>
          {info?.hCUser?.userIdInOn !== null ? (
            <div className='mb-1'>
              <Row>
                <Col md='6' lg='3' xs='6'>
                  <span className='font-weight-bold'>
                    <FormattedMessage id={getKeyLang('account.accountCode')} />
                  </span>
                </Col>
                <Col md='6' lg='6' xs='6'>
                  {info?.hCUser?.userIdInOn}
                </Col>
              </Row>
            </div>
          ) : null}
          <div className='mb-1'>
            <Row>
              <Col md='6' lg='3' xs='6'>
                <span className='font-weight-bold'>
                  <FormattedMessage
                    id={getKeyLang('partner.account.phoneNumber')}
                  />
                </span>
              </Col>
              <Col md='6' lg='6' xs='6'>
                {info?.hCUser?.phoneNumber}
              </Col>
            </Row>
          </div>
          <div className='mb-1'>
            <Row>
              <Col md='6' lg='3' xs='6'>
                <span className='font-weight-bold'>
                  <FormattedMessage id={getKeyLang('partner.account.email')} />
                </span>
              </Col>
              <Col md='6' lg='6' xs='6'>
                {info?.hCUser?.email}
              </Col>
            </Row>
          </div>
          <div className='mb-1'>
            <Row>
              <Col md='6' lg='3' xs='6'>
                <span className='font-weight-bold'>
                  <FormattedMessage
                    id={getKeyLang('support.detail.description')}
                  />
                </span>
              </Col>
              <Col md='6' lg='6' xs='6'>
                {info?.note}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default InfoRequest
