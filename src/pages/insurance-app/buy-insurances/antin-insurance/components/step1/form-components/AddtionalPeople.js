import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CurrencyInput, Select } from 'base-app'
import BaseInfo from '../../../../../../../components/insurance-app/buy-insurances-page/step/InfoBase'
import {
  API_GET_ALL_BANK,
  getKeyLang
} from '../../../../../../../configs/insurance-app'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import TitleRow from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { REDUX_STATE_NAME } from '../../stepsManager'
import { BaseFormGroup, HttpClient } from 'base-app'
import {
  Col,
  InputGroup,
  InputGroupAddon,
  Row,
  Button,
  FormGroup,
  Label
} from 'reactstrap'
import { CheckCircle } from 'react-feather'
import FullAddress from './FullAddress'
import { hasRequestFail } from '../../../../../../../ultity'
import { useIntl } from 'react-intl'
import { relationships } from '../utility'
import { KEY_ADDTIONAL_PEOPLE } from '../formikConfig'
import styled from 'styled-components'
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
const AddtionalPeople = ({
  index,
  keyMaps = {
    KEY_IC_TYPE: 'string',
    KEY_IC_NO: 'string',
    KEY_FULLNAME: 'string',
    KEY_DATE_BIRTH: 'string',
    KEY_GENDER: 'string',
    KEY_PHONE_NUMBER: 'string',
    KEY_EMAIL: 'string',
    KEY_ADDRESS: 'string',
    KEY_CITY: 'string',
    KEY_DISTRICT: 'string',
    KEY_WARD: 'string',
    KEY_STK: 'string',
    KEY_ACCOUNT_NUMBER: 'string',
    KEY_BANK: 'string',
    KEY_RELATIONSHIP: 'string',
    KEY_LOAN: 'string',
    KEY_CREDIT_CONTRACT_NO: 'string',
    KEY_CREDIT_DURATION: 'string'
  },
  stepInfo,
  className
}) => {
  const intl = useIntl()
  const {
    setFieldValue,
    getFieldMeta,
    sugg_gender,
    IDTypes,
    errors,
    touched,
    values
  } = stepInfo
  const {
    KEY_IC_TYPE,
    KEY_IC_NO,
    KEY_FULLNAME,
    KEY_DATE_BIRTH,
    KEY_GENDER,
    KEY_PHONE_NUMBER,
    KEY_EMAIL,
    KEY_ADDRESS,
    KEY_CITY,
    KEY_WARD,
    KEY_DISTRICT,
    KEY_LOAN,
    KEY_CREDIT_CONTRACT_NO,
    KEY_CREDIT_DURATION
  } = keyMaps
  return (
    <div className={className}>
      {/* <TitleRow msg={"* Người thứ " + (index + 1)} type="s" /> */}

      {!getFieldMeta(KEY_IC_TYPE).value && (
        <>
          <Row className='mt-2'>
            <Col xs={12} md={6}>
              <Select
                readOnly
                closeMenuOnSelect={true}
                isSearchable={false}
                classNamePrefix='select mt-1'
                className='custom-zindex7'
                onChange={({ content }) => {
                  setFieldValue(KEY_IC_TYPE, content)
                }}
                value={IDTypes.find(
                  (type) => type.content === getFieldMeta(KEY_IC_TYPE).value
                )}
                options={IDTypes}
                placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                isClearable={false}
                styles={
                  getFieldMeta(KEY_IC_TYPE).error
                    ? selectErrorStyles
                    : selectNormalStyles
                }
              />
            </Col>

            <Col xs={12} md={6}>
              <InputGroup className='form-label-group'>
                <BaseFormGroup
                  fieldName={KEY_IC_NO}
                  errors={errors}
                  touched={touched}
                  messageId={getKeyLang(`IDPers`)}
                />

                <InputGroupAddon addonType='append'>
                  <Button
                    color='check'
                    className='custom-check-btn'
                    onClick={() => {}}
                  >
                    <span className='font-weight-bold'>
                      <FormattedMessage id={getKeyLang(`Check`)} />
                    </span>
                    <CheckCircle size={14} />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </>
      )}

      {getFieldMeta(KEY_IC_TYPE).value && (
        <>
          <BaseInfo
            index={index}
            reduxName={REDUX_STATE_NAME}
            stepInfo={{ sugg_gender, IDTypes }}
            keyMaps={{
              KEY_IC_TYPE: KEY_IC_TYPE,
              KEY_IC_NO: KEY_IC_NO,
              KEY_FULLNAME: KEY_FULLNAME,
              KEY_DATE_BIRTH: KEY_DATE_BIRTH,
              KEY_GENDER: KEY_GENDER,
              KEY_PHONE_NUMBER: KEY_PHONE_NUMBER,
              KEY_EMAIL: KEY_EMAIL,
              KEY_ADDRESS: KEY_ADDRESS
            }}
          />

          <FullAddress
            zIndex='custom-zindex5'
            keysMap={{
              KEY_CITY: KEY_CITY,
              KEY_DISTRICT: KEY_DISTRICT,
              KEY_WARD: KEY_WARD,
              KEY_ADDRESS: KEY_ADDRESS
            }}
            className={'mb-1'}
          />

          <Row>
            <Col xs={12} md={4}>
              <BaseFormGroup
                fieldName={KEY_CREDIT_CONTRACT_NO}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`antin.numberHDTD`)}
              />
            </Col>
            <ColInputShowUnitMoney
              xs={12}
              md={4}
              errors={errors}
              fieldName={KEY_LOAN}
              className={'col__input-relative'}
            >
              <FormGroup className={'form-label-group'}>
                <CurrencyInput
                  id='loan'
                  value={values.addtinalPeople[0]?.loan}
                  onChange={(e) => {
                    setFieldValue(KEY_LOAN, e.target.value)
                  }}
                  placeholder={getKeyLang('antin.loan')}
                  className={`form-control form-label-group ${
                    errors[KEY_ADDTIONAL_PEOPLE] &&
                    errors[KEY_ADDTIONAL_PEOPLE][0]?.loan
                      ? 'is-invalid'
                      : false
                  }`}
                />
                <Label>
                  {intl.formatMessage({ id: getKeyLang('antin.loan') })}
                </Label>
              </FormGroup>
              <span className='vnd-text'>VNĐ</span>
            </ColInputShowUnitMoney>
            <ColInputShowUnitMoney
            errors={errors}
            fieldName={KEY_CREDIT_DURATION}
              xs={12}
              md={4}
              className={'col__input-relative'}
            >
              <BaseFormGroup
                type='number'
                fieldName={KEY_CREDIT_DURATION}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`antin.durationLoan`)}
              />
              <span className='vnd-text'>Tháng</span>
            </ColInputShowUnitMoney>
          </Row>
        </>
      )}
    </div>
  )
}

export default AddtionalPeople
