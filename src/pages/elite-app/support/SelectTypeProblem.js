import { FormattedMessage } from 'base-app'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../configs/elite-app'
import RadioTypeProblem from './RadioTypeProblem'
import { ASSURANCE_COMPENSATION, CUSTOMER_SERVICE, FEEDBACK, OTHER, PAYMENT, PRODUCT, TECHNOLOGY } from './utility'
const SelectTypeProblem = ({setFieldValue , typeChecked , setTypeChecked}) => {
    const handleChangeTypeRequest = (type) =>{
      setFieldValue("type", type)
    }
  return (
    <div>
      <h6 className="font-weight-bold mt-1" style={{ color: '#106D5A' }}>
        <FormattedMessage id={getKeyLang('support.create.detailRequest')} />
      </h6>
      <span>
        <FormattedMessage
          id={getKeyLang('support.create.question.detailRequest')}
        />
      </span>
      <div>
        <Row>
          <Col lg="6" md="12">
            <RadioTypeProblem type={typeChecked} typeChecked={PRODUCT} setTypeChecked={setTypeChecked} label="support.create.radio.product" labelDetail="support.create.radio.product.detail" isShowLabelDetail={true} setFieldValue={setFieldValue}/>
          </Col>
          <Col lg="6" md="12">
          <RadioTypeProblem type={typeChecked} typeChecked={CUSTOMER_SERVICE} setTypeChecked={setTypeChecked}  label="support.create.radio.serviceCustomer" labelDetail="support.create.radio.serviceCustomer.detail" isShowLabelDetail={true} setFieldValue={handleChangeTypeRequest}/>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
          <RadioTypeProblem type={typeChecked} typeChecked={PAYMENT} setTypeChecked={setTypeChecked}  label="support.create.radio.payment" labelDetail="support.create.radio.payment.detail" isShowLabelDetail={true} setFieldValue={handleChangeTypeRequest}/>
          </Col>
          <Col lg="6" md="12">
          <RadioTypeProblem type={typeChecked} typeChecked={FEEDBACK} setTypeChecked={setTypeChecked}  label="support.create.radio.report" labelDetail="support.create.radio.report.detail" isShowLabelDetail={true} setFieldValue={handleChangeTypeRequest}/>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <RadioTypeProblem type={typeChecked} typeChecked={TECHNOLOGY} setTypeChecked={setTypeChecked} label="support.create.radio.skill" labelDetail="support.create.radio.skill.detail" isShowLabelDetail={true} setFieldValue={handleChangeTypeRequest}/>
          </Col>
          <Col lg="6" md="12">
          <RadioTypeProblem type={typeChecked} typeChecked={ASSURANCE_COMPENSATION} setTypeChecked={setTypeChecked}  label="support.create.radio.insurance" labelDetail="support.create.radio.insurance.detail" isShowLabelDetail={true} setFieldValue={handleChangeTypeRequest}/>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <RadioTypeProblem type={typeChecked} typeChecked={OTHER} setTypeChecked={setTypeChecked} label="support.create.radio.other" isShowLabelDetail={false} setFieldValue={handleChangeTypeRequest}/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SelectTypeProblem
