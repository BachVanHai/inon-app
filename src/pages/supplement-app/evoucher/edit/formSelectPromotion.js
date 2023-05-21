import { BaseFormGroup, Radio } from 'base-app'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Col, Label, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/supplement-app'
import { DivMarginTop, PERCENT,VND, PREPAY,   SpanStyled, SAME_PRICE } from './utility'
const SelectHiddenLabel = styled.div`
.form-label-group{
  label{
    visibility: hidden;
  }
  input{
    &::placeholder{
    visibility: hidden;
   }
  }
}
`
const FormSelectPromotion = ({ setFieldValue  , isEdit , original ,initialValues}) => {
  const [valueDiscountStatus, setValueDiscountStatus] = useState(false)
  const [sameProductPriceStatus, setSameProductPriceStatus] = useState(false)
  const [percentDiscountStatus, setPercentDiscountStatus] = useState(false)
  const [freeStatus, setFreeStatus] = useState(false)
  const handleEnableRadioChecked = (
    fieldEnable,
    disable
  ) => {
    if (fieldEnable == 'valueDiscount') {
      setValueDiscountStatus(true)
      setSameProductPriceStatus(disable)
      setPercentDiscountStatus(disable)
      setFreeStatus(disable)
    }
    if (fieldEnable == 'sameProductPrice') {
      setValueDiscountStatus(disable)
      setSameProductPriceStatus(true)
      setPercentDiscountStatus(disable)
      setFreeStatus(disable)
    }
    if (fieldEnable == 'percentDiscount') {
      setValueDiscountStatus(disable)
      setSameProductPriceStatus(disable)
      setPercentDiscountStatus(true)
      setFreeStatus(disable)
    }
    if (fieldEnable == 'free') {
      setValueDiscountStatus(disable)
      setSameProductPriceStatus(disable)
      setPercentDiscountStatus(disable)
      setFreeStatus(true)
    }
  }
  useEffect(() => {
   switch (original.voucherType) {
     case VND:
      setValueDiscountStatus(true)
       break;
       case PERCENT:
        setPercentDiscountStatus(true);
        break;
        case SAME_PRICE:
          setSameProductPriceStatus(true);
        break;
        case PREPAY:
          setFreeStatus(true);
        break;
     default:
       break;
   }
  }, [original]);
  return (
    <div style={!isEdit ? {
      pointerEvents: "none",
      opacity: 0.7,
        } : null}>
      <div className='mb-2'>
        <span className='font-weight-bold' style={{ fontSize: '18px' }}>
          <FormattedMessage id={getKeyLang('evoucher.create.promotionForm')} />
        </span>
      </div>
      <div className='mb-2' >
        <div className='d-flex'>
          <Radio
            checked={valueDiscountStatus}
            onClick={() => {
              handleEnableRadioChecked('valueDiscount', false)
              setFieldValue('voucherType', VND)
            }}
          />
          <SpanStyled>
            <FormattedMessage
              id={getKeyLang('evoucher.create.valueDiscount')}
            />
          </SpanStyled>
        </div>
      </div>

      {valueDiscountStatus ? (
        <>
          <Row>
            <Col md={1}>
              <DivMarginTop style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.reduce')} />
              </DivMarginTop>
            </Col>
            <Col md={3}>
              <div>
                <SelectHiddenLabel>
                  <BaseFormGroup
                    type={`number`}
                    messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                    fieldName={`discountValue`}
                  />
                </SelectHiddenLabel>
              </div>
            </Col>
            <Col>
              <DivMarginTop style={{
                marginTop: "20px",
                width: "340px"
              }}>
                <FormattedMessage
                  id={getKeyLang('evoucher.create.appliesToTheMinimumContract')}
                />
              </DivMarginTop>
            </Col>
            <Col md={2}>
              <SelectHiddenLabel>
                <BaseFormGroup
                  type={`number`}
                  messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                  fieldName={`minContractValue`}
                />
              </SelectHiddenLabel>
            </Col>
            <Col>
              <div style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.copper')} />
              </div>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
      <div className='mb-2'>
        <div className='d-flex'>
          <Radio
            checked={percentDiscountStatus}
            id='check'
            onClick={() => {
              setFieldValue('voucherType', PERCENT)
              handleEnableRadioChecked('percentDiscount', false)
            }}
          />
          <SpanStyled>
            <FormattedMessage
              id={getKeyLang('evoucher.create.percentDiscount')}
            />
          </SpanStyled>
        </div>
      </div>
      {percentDiscountStatus ? (
        <>
          <Row>
            <Col md={1}>
              <DivMarginTop style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.reduce')} />
              </DivMarginTop>
            </Col>
            <Col>
              <SelectHiddenLabel>
                <BaseFormGroup
                  type="number"
                  messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                  fieldName={`discountValue`}
                />
              </SelectHiddenLabel>
            </Col>
            <Col md={4}>
              <div style={{
                marginTop: "20px"
              }}>
                <FormattedMessage
                  id={getKeyLang('evoucher.create.percentOfTheMaximumValue')}
                />
              </div>

            </Col>
            <Col>
              <SelectHiddenLabel>
                <BaseFormGroup
                  type={`number`}
                  messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                  fieldName={`maxDiscountValue`}
                />
              </SelectHiddenLabel>
            </Col>
            <Col>
              <div style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.copper')} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <div style={{
                marginTop: "20px"
              }}>
                <FormattedMessage
                  id={getKeyLang('evoucher.create.precent.appliesToTheMinimumContract')}
                />
              </div>
            </Col>
            <Col>
              <SelectHiddenLabel>
                <BaseFormGroup
                  type={`number`}
                  messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                  fieldName={`minContractValue`}
                />
              </SelectHiddenLabel>
            </Col>
            <Col>
              <div style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.copper')} />
              </div>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
      <div className='mb-2'>
        <Label className='d-flex'>
          <Radio
            id='check'
            checked={sameProductPriceStatus}
            onClick={() => {
              setFieldValue('voucherType', SAME_PRICE)
              handleEnableRadioChecked('sameProductPrice', false)
            }}
          />
          <SpanStyled>
            <FormattedMessage
              id={getKeyLang('evoucher.create.sameProductPrice')}
            />
          </SpanStyled>
        </Label>
      </div>
      {sameProductPriceStatus ? (
        <>
          <Row>
            <Col md={2} className="mb-2">
              <DivMarginTop style={{
                marginTop: "20px"
              }}>
                <FormattedMessage id={getKeyLang('evoucher.create.applyPrice')} />
              </DivMarginTop>
            </Col>
            <Col md={6} className="">
              <SelectHiddenLabel>
                <BaseFormGroup
                  type={`number`}
                  messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                  fieldName={`samePrice`}
                />
              </SelectHiddenLabel>
            </Col>
            <Col md={4} className="mb-2">
              <DivMarginTop style={{
                marginTop: "20px"
              }}>
                <FormattedMessage
                  id={getKeyLang('evoucher.create.forInsuranceProducts')}
                />
              </DivMarginTop>
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
      <div className='mb-2'>
        <div className='d-flex'>
          <Radio
            id='check'
            checked={freeStatus}
            onClick={() => {
              setFieldValue('voucherType', PREPAY)
              handleEnableRadioChecked('free', false)
            }}
          />
          <SpanStyled>
            <FormattedMessage id={getKeyLang('evoucher.create.free')} />
          </SpanStyled>
        </div>
      </div>
      {freeStatus ? (
        <>
          <DivMarginTop>
            <FormattedMessage id={getKeyLang('evoucher.create.applyForFree')} />
          </DivMarginTop>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default FormSelectPromotion
