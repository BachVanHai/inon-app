import React, { useState } from 'react'
import { getKeyLang, INSURANCE_ALLOW_TRANSFER_BENEFICIARIES } from '../../../../../configs/elite-app'
import { BaseFormGroup, BaseFormGroupSelect, FormattedMessage, useBankList } from 'base-app'
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Label } from 'reactstrap'
import Toggle from 'react-toggle'
import classnames from 'classnames';
import CurrencyInput from '../../../../../components/elite-app/input/CurrencyInput'
import { Field } from 'formik'
import { convertStrToNumber } from '../../../../../ultity'

const TransferBeneficiaries = ({ type, errors, touched, values, handleChange, setErrors }) => {

  const [activeTab, setActiveTab] = useState('1');
  const [maskOptions, setMaskOptions] = useState({ integerLimit: { ...values.requireVehicle } })
  const { banks } = useBankList()
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const onChangeTransferBeneficiariesLevel = (e, form) => {
    const value = parseInt(e.target.value.replace(/,/g, ''));
    if (value === 0) {
      form.setFieldValue('transferBeneficiariesLevel', '')
    } else {
      const requireVehicle = convertStrToNumber(values ? values.requireVehicle : 0)
      if (value > requireVehicle) {
        form.setFieldValue('transferBeneficiariesLevel', e.target.value.slice(0, -1))
      } else {
        form.setFieldValue('transferBeneficiariesLevel', e.target.value)
      }
    }
  }

  return (
    INSURANCE_ALLOW_TRANSFER_BENEFICIARIES.includes(type) ? (
      <div className="mt-3">
        <div className='d-flex justify-content-between'>
          <h4 className='text-uppercase text-primary font-weight-bold'>
            <FormattedMessage id={getKeyLang('insurance.transferBeneficiariesLevel')} />
          </h4>
          <div>
            <Toggle icons={false} onChange={handleChange} defaultChecked={values.transferBeneficiariesEnabled} name='transferBeneficiariesEnabled' value={values.transferBeneficiariesEnabled} />
          </div>
        </div>
        <div className={values.transferBeneficiariesEnabled ? 'd-block' : 'd-none'}>
          <div className="mb-2 font-weight-bold">
            <FormattedMessage id={getKeyLang('insurance.transferBeneficiariesNote')} />
          </div>
          <Nav tabs className="mb-3">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                <FormattedMessage id={getKeyLang('insurance.bank')} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                disabled
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                <FormattedMessage id={getKeyLang('insurance.individual')} />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row className="mb-2">
                <Col className="mb-2 mb-md-0" xs={12} md={6}>
                  <BaseFormGroupSelect
                    touched={touched}
                    errors={errors}
                    isShowErrorMessage={false}
                    options={banks}
                    messageId={getKeyLang('insurance.bankName')}
                    fieldName='transferBankName'
                  />
                </Col>
                <Col xs={12} md={6}>
                  <BaseFormGroup
                    touched={touched}
                    errors={errors}
                    isShowErrorMessage={false}
                    type='text'
                    messageId={getKeyLang('insurance.bankBranch')}
                    fieldName='transferBankBranch'
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <BaseFormGroup
                    touched={touched}
                    errors={errors}
                    isShowErrorMessage={false}
                    type='text'
                    messageId={getKeyLang('insurance.bankAddress')}
                    fieldName='transferBankAddress'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field name="transferBeneficiariesLevel">
                    {
                      ({ field, form }) => (
                        <FormGroup className='form-label-group'>
                          <CurrencyInput maskOptions={maskOptions} id='transferBeneficiariesLevel'
                            className={`form-control form-label-group ${touched.transferBeneficiariesLevel && errors.transferBeneficiariesLevel && 'is-invalid'}`}
                            placeholder={getKeyLang('insurance.transferBeneficiariesLevel')}
                            type='text'
                            value={field.value}
                            onChange={(e) => onChangeTransferBeneficiariesLevel(e, form)}
                          />
                          <Label> <FormattedMessage id={getKeyLang('insurance.transferBeneficiariesLevel')} /> </Label>
                        </FormGroup>
                      )
                    }
                  </Field>

                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">

            </TabPane>
          </TabContent>
        </div>
      </div>
    ) : null
  )
}

export default TransferBeneficiaries
