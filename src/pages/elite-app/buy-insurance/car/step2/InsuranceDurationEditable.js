import React from 'react'
import DurationOfInsurance from '../../DurationOfInsurance'
import { getKeyLang } from '../../../../../configs/elite-app'
import { FormattedMessage } from 'base-app'
import Toggle from 'react-toggle'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'

const InsuranceDurationEditable = ({ onChangeEnableInsurance, insuranceCode, setFieldError, setFieldTouched }) => {

  const INSURANCE_CODE = insuranceCode
  const { contract } = useSelector(state => state.app.buyInsurance)
  const insurance = contract.insurances.find(item => item.insuranceCode === INSURANCE_CODE)
  const insuranceIndex = contract.insurances.findIndex(item => item.insuranceCode === INSURANCE_CODE)
  const dispatch = useDispatch()

  const onChangeEnabled = (e) => {
    onChangeEnableInsurance(INSURANCE_CODE, e.target.checked)
  }


  const onChangeEffectiveDate = (date) => {
    const newContract = { ...contract }
    insurance.startValueDate = moment(date[0]).toISOString()
    insurance.endValueDate = moment(date[0]).add(insurance.duration, 'months').toISOString()
    newContract.insurances[insuranceIndex] = { ...insurance }
    dispatch(actionSaveContract(newContract))
  }

  const onChangeDuration = (duration) => {
    const newContract = { ...contract }
    insurance.duration = duration
    insurance.endValueDate = moment(insurance.startValueDate).add(duration, 'months').toISOString()
    newContract.insurances[insuranceIndex] = { ...insurance }
    dispatch(actionSaveContract(newContract))
  }

  return (
    <div className='insurance-item'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className="d-flex align-items-center">
          <img src={logoCompany} />
          <div className='insurance-name'>
            <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}`)} />
          </div>
        </div>
        <Toggle icons={false} checked={insurance?.isEnable}
                onChange={onChangeEnabled} />
      </div>
      {insurance?.isEnable ? <div className='mt-2'>
        <DurationOfInsurance onChangeEffectiveDateFrom={onChangeEffectiveDate}
                             setFieldError={setFieldError}
                             setFieldTouched={setFieldTouched}
                             duration={insurance.duration}
                             onChangeDuration={onChangeDuration}
                             insurance={insurance} />
      </div> : null}
    </div>
  )
}
export default InsuranceDurationEditable
