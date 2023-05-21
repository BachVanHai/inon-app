import React from 'react'
import { FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS, INSURANCE_TYPES } from '../../../../../configs/elite-app'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { useIntl } from 'react-intl'
import { Field } from 'formik'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Utils } from '../../../../../ultity'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import Slider from 'rc-slider'
import { RcHandle } from '../../../../../components/elite-app/HandleComponent'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'

const InsuranceCarGoods = ({ insurances, onChangeEnableInsurance, onChangeInsuranceValue, loads }) => {

  const INSURANCE_CODE = INSURANCE_SETTING_DEFAULTS.CAR_HANGHOA.key
  const intl = useIntl()
  const { contract, type } = useSelector(state => state.app.buyInsurance)
  const insuranceIndex = contract.insurances.findIndex(item => item.insuranceCode === INSURANCE_CODE)
  const insurance = insurances.find(item => item.insuranceCode === INSURANCE_CODE)
  const dispatch = useDispatch()


  const onChangeEnabled = (e) => {
    onChangeEnableInsurance(INSURANCE_CODE, e.target.checked)
  }

  const onChangeGrossTon = (e, form) => {
    let { value = '' } = e.target
    insurance.count1 = Utils.getValueInRange(value, loads)
    onChangeInsuranceValue(INSURANCE_CODE, insurance)
  }

  const onChangeInsuranceLiability = (value) => {
    const newContract = { ...contract }
    newContract.insurances[insuranceIndex]['liability1'] = value * 1000000
    dispatch(actionSaveContract(newContract))
  }


  return (
    <>
      <div className='insurance-item'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <img src={logoCompany} alt='' />
            <div className='insurance-name'>
              <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}`)} />
            </div>
          </div>
          <Toggle icons={false} checked={insurance?.isEnable}
                  onChange={onChangeEnabled} />
        </div>
        {
          insurance?.isEnable ? <div className='insurance-content mt-2'>
            <div className='py-1 mb-3'>
              <div className='d-flex justify-content-between'>
                <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}.liability`)}
                                  values={{
                                    span: chunk => <span
                                      style={{ marginLeft: '5px', textAlign: 'right' }}>{chunk}</span>,
                                    value: insurance.liability1 / 1000000
                                  }} />
              </div>
              {
                type === INSURANCE_TYPES.TD ? (
                  <div>
                    <Slider
                      min={10}
                      max={50}
                      step={10}
                      marks={{ 10: 10, 50: 50 }}
                      value={insurance.liability1 / 1000000}
                      handle={RcHandle}
                      onChange={onChangeInsuranceLiability}
                    />
                  </div>
                ) : null
              }
            </div>

            <div>
              <div className='p-0'>
                <Field name='grossTon'>
                  {({ field, form }) => (
                    <FormGroup className='form-label-group'>
                      <Input type='number'
                             step={0.1}
                             min={0.1}
                             max={loads}
                             name='grossTon'
                             onChange={(e) => onChangeGrossTon(e, form)}
                             placeholder={intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.loads`) })}
                             value={field.value}
                             className={`form-control ${form.errors.grossTon && 'is-invalid'}`} />
                      <Label> <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}.loads`)} /> </Label>
                    </FormGroup>
                  )}
                </Field>

                <div className='mb-1 mt-2' dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(
                    { id: getKeyLang(`insurance.${INSURANCE_CODE}.info`) })
                }} />
              </div>
            </div>
          </div> : null
        }

      </div>
      {/*<div className='border p-2 p-md-3 insurance-item mt-2'>*/}

      {/*  {*/}
      {/*    insurance?.isEnable ? <>*/}
      {/*      <Row className='py-1'>*/}
      {/*        <Col xs={12} md={4} className='text' dangerouslySetInnerHTML={{*/}
      {/*          __html: intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.liability`) }, { value: insurance.liability1 / 1000000 })*/}
      {/*        }} />*/}
      {/*        {*/}
      {/*          type === INSURANCE_TYPES.TD ? (*/}
      {/*            <Col xs={12} md={8}>*/}
      {/*              <Slider*/}
      {/*                min={10}*/}
      {/*                max={50}*/}
      {/*                step={10}*/}
      {/*                marks={{ 10: 10, 50: 50 }}*/}
      {/*                value={insurance.liability1 / 1000000}*/}
      {/*                handle={RcHandle}*/}
      {/*                onChange={onChangeInsuranceLiability}*/}
      {/*              />*/}
      {/*            </Col>*/}
      {/*          ) : ''*/}
      {/*        }*/}
      {/*      </Row>*/}
      {/*      <div className='py-1'>*/}
      {/*        <Col xs={12} md={6} className='p-0'>*/}
      {/*          <Field name='grossTon'>*/}
      {/*            {({ field, form }) => (*/}
      {/*              <FormGroup className='form-label-group'>*/}
      {/*                <Input type='number'*/}
      {/*                       step={0.1}*/}
      {/*                       min={0}*/}
      {/*                       max={loads}*/}
      {/*                       name='grossTon'*/}
      {/*                       onChange={(e) => onChangeGrossTon(e, form)}*/}
      {/*                       placeholder={intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.loads`) })}*/}
      {/*                       value={field.value}*/}
      {/*                       className={`form-control ${form.errors.numberInCar && 'is-invalid'}`} />*/}
      {/*                <Label> <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}.loads`)} /> </Label>*/}
      {/*              </FormGroup>*/}
      {/*            )}*/}
      {/*          </Field>*/}
      {/*        </Col>*/}
      {/*        <div className='py-1'>*/}
      {/*          <div className='text' dangerouslySetInnerHTML={{*/}
      {/*            __html: intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.info`) })*/}
      {/*          }} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </> : null*/}
      {/*  }*/}
      {/*</div>*/}
    </>

  )
}

export default InsuranceCarGoods