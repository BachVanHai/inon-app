import {
  BaseFormGroup,
  CurrencyInput,
  FormattedMessage,
  Select
} from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../../ultity'
import {
  KEY_GOODS_TYPE,
  KEY_GOODS_NAME,
  KEY_GOODS_AMOUNT,
  KEY_GOODS_WEIGHT,
  KEY_GOODS_VALUE,
  KEY_GOODS_PROCEDURE,
  KEY_VEHICEL_TYPE,
  KEY_ADD_VEHICEL
} from '../formikConfig'
import { GOODS_TYPE_LIST } from '../utility'

const ColInputShowUnitMoney = styled(Col)`
  position: relative;
  .vnd-text {
    position: absolute;
    right: 15px;
    top: 0;
    height: 38px;
    line-height: 38px;
    padding-right: 17px;
    padding-left: 15px;
    background-color: #338955;
    z-index: 0;
    border-radius: 0 5px 5px 0;
    color: white;
  }
`
const GoodsInfo = ({
  errors,
  touched,
  getFieldMeta,
  setFieldValue,
  values,
  goodsTypeSugg,
  setVehicelTypeSugg
}) => {
  const intl = useIntl()
  return (
    <div>
      <Row>
        <Col md='6' xs='12' className='mb-1'>
          <Select
            options={goodsTypeSugg}
            value={goodsTypeSugg.find(_elt => _elt.value === getFieldMeta(KEY_GOODS_TYPE).value)}
            placeholder={
              <FormattedMessage id={getKeyLang(`goods.goodsType`)} />
            }
            styles={
              getFieldMeta(KEY_GOODS_TYPE).error
                ? selectErrorStyles
                : selectNormalStyles
            }
            onChange={(original) => {
              setFieldValue(KEY_GOODS_TYPE, original.value)
              setVehicelTypeSugg(original?.transportations)
              // if change set vehicel type === empty
              let addtionalVehicel = getFieldMeta(KEY_ADD_VEHICEL).value
              const _addtionalVehicel = addtionalVehicel.map(_elt => {
                return {
                  ..._elt, 
                  vehicelType : ""
                }
              })
              setFieldValue(KEY_ADD_VEHICEL , _addtionalVehicel) 
            }}
          />
        </Col>
        <Col md='6' xs='12' className='mb-1'>
          <BaseFormGroup
            fieldName={KEY_GOODS_NAME}
            errors={errors}
            touched={touched}
            type='text'
            messageId={getKeyLang('goods.goodsName')}
          />
        </Col>
      </Row>
      <Row>
        <ColInputShowUnitMoney
          xs={12}
          md={3}
          errors={errors}
          fieldName={KEY_GOODS_AMOUNT}
          className={'col__input-relative'}
        >
             <BaseFormGroup
            fieldName={KEY_GOODS_AMOUNT}
            errors={errors}
            touched={touched}
            type='number'
            messageId={getKeyLang('goods.goodsAmount')}
          />
        </ColInputShowUnitMoney>

        <ColInputShowUnitMoney
          xs={12}
          md={3}
          errors={errors}
          fieldName={KEY_GOODS_WEIGHT}
          className={'col__input-relative mb-2'}
        >
          <FormGroup className={'form-label-group'}>
            <CurrencyInput
              id='loan'
              value={values[KEY_GOODS_WEIGHT]}
              onChange={(e) => {
                setFieldValue(KEY_GOODS_WEIGHT, e.target.value)
              }}
              placeholder={getKeyLang('goods.goodsWeight')}
              className={`form-control form-label-group ${
                errors[KEY_GOODS_WEIGHT] ? 'is-invalid' : false
              }`}
            />
            <Label>
              {intl.formatMessage({ id: getKeyLang('goods.goodsWeight') })}
            </Label>
          </FormGroup>
          <span className='vnd-text'>KG</span>
        </ColInputShowUnitMoney>

        <ColInputShowUnitMoney
          xs={12}
          md={6}
          errors={errors}
          fieldName={KEY_GOODS_VALUE}
          className={'col__input-relative mb-2'}
        >
          <FormGroup className={'form-label-group'}>
            <CurrencyInput
              id='loan'
              value={values[KEY_GOODS_VALUE]}
              onChange={(e) => {
                setFieldValue(KEY_GOODS_VALUE, e.target.value)
              }}
              placeholder={getKeyLang('goods.goodsValue')}
              className={`form-control form-label-group ${
                errors[KEY_GOODS_VALUE] ? 'is-invalid' : false
              }`}
            />
            {errors[KEY_GOODS_VALUE] && (
              <div
                style={{
                  fontSize: '.8rem',
                  position: 'absolute',
                  left: '4px',
                  bottom: '-20px'
                }}
                className='text-danger'
              >
                {errors[KEY_GOODS_VALUE]}
              </div>
            )}
            <Label>
              {intl.formatMessage({ id: getKeyLang('goods.goodsValue') })}
            </Label>
          </FormGroup>
          <span className='vnd-text'>VNĐ</span>
        </ColInputShowUnitMoney>
      </Row>
      <Row>
        <Col xs='12' md='12' className='mb-1'>
          <BaseFormGroup
            fieldName={KEY_GOODS_PROCEDURE}
            errors={errors}
            touched={touched}
            type='text'
            messageId={getKeyLang('goods.goodsProcedure')}
          />
        </Col>
      </Row>
    </div>
  )
}

export default GoodsInfo
