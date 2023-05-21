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
import Slider from 'rc-slider'
import { RcHandle } from '../../../../../components/elite-app/HandleComponent'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'

const InsuranceCarPeople = ({ onChangeEnableInsurance, onChangeInsuranceValue, seats }) => {

  const INSURANCE_CODE = INSURANCE_SETTING_DEFAULTS.CAR_CONNGUOI.key
  const intl = useIntl()
  const { contract, type } = useSelector(state => state.app.buyInsurance)

  const insurance = contract.insurances.find(item => item.insuranceCode === INSURANCE_CODE)
  const insuranceIndex = contract.insurances.findIndex(item => item.insuranceCode === INSURANCE_CODE)
  const dispatch = useDispatch()

  const onChangeEnabled = (e) => {
    onChangeEnableInsurance(INSURANCE_CODE, e.target.checked)
  }

  const onChangeNumberInCar = (e, form) => {
    if(type === INSURANCE_TYPES.TD) {
      let { value = '' } = e.target
      insurance.count1 = Utils.getValueInRange(value, seats)
      const newContract = { ...contract }
      newContract.insurances[INSURANCE_CODE] = insurance
      dispatch(actionSaveContract(newContract))
    } else {
      let { value = '' } = e.target
      insurance.count1 = Utils.getValueInRange(value, seats)
      onChangeInsuranceValue(INSURANCE_CODE, insurance)
    }
  }

  const onChangeInsuranceLiability = (value) => {
    const newContract = { ...contract }
    newContract.insurances[insuranceIndex]['liability1'] = value * 1000000
    dispatch(actionSaveContract(newContract))
  }

  return (
    <div className='insurance-item'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <img src={logoCompany} />
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
            {/*<div className='d-flex justify-content-between' dangerouslySetInnerHTML={{*/}
            {/*  __html: intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.liability`) }, { value: insurance.liability1 / 1000000 })*/}
            {/*}} />*/}
            <div className='d-flex justify-content-between'>
              <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}.liability`)}
                                values={{
                                  span: chunk => <span style={{ marginLeft: '5px', textAlign: 'right' }}>{chunk}</span>,
                                  value: insurance.liability1 / 1000000
                                }} />
            </div>
            {
              type === INSURANCE_TYPES.TD ? (
                <div>
                  <Slider
                    min={20}
                    max={50}
                    step={10}
                    marks={{ 20: 20, 50: 50 }}
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
              <Field name='numberInCar'>
                {({ field, form }) => (
                  <FormGroup className='form-label-group'>
                    <Input type='number'
                           step={1}
                           min={1}
                           max={seats}
                           name='numberInCar'
                           onChange={(e) => onChangeNumberInCar(e, form)}
                           placeholder={intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.numberPeople`) })}
                           value={field.value}
                           className={`form-control ${form.errors.numberInCar && 'is-invalid'}`} />
                    <Label> <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}.numberPeople`)} /> </Label>
                  </FormGroup>
                )}
              </Field>
            </div>
          </div>
        </div> : null
      }
    </div>
  )
}

export default InsuranceCarPeople
