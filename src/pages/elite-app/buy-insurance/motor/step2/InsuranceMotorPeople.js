import React from 'react'
import { Checkbox, FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS } from '../../../../../configs/elite-app'
import Toggle from 'react-toggle'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Label, Row, FormGroup } from 'reactstrap'
import { useIntl } from 'react-intl'
import { Check } from 'react-feather'
import { actionCalculationMotorInsuranceFee } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const InsuranceMotorPeople = ({ vehicle, onChangeEnableInsurance, onChangeLiability, seats }) => {
  const OPTION1 = 5000000;
  const OPTION2 = 10000000
  const INSURANCE_CODE = INSURANCE_SETTING_DEFAULTS.MOTOR_CONNGUOI.key
  const { contract, type, feeDetails } = useSelector(state => state.app.buyInsurance)
  const insurance = contract.insurances.find(item => item.insuranceCode === INSURANCE_CODE)
  const insuranceIndex = contract.insurances.findIndex(item => item.insuranceCode === INSURANCE_CODE)
  const intl = useIntl()
  const dispatch = useDispatch();

  const onChangeInsuranceLiability = (option, checked) => {
    const newContract = { ...contract }
    if (option === 1) {
      newContract.insurances[insuranceIndex]['liability1'] = OPTION1
      insurance.liability1 = OPTION1
    } else if (option === 2) {
      newContract.insurances[insuranceIndex]['liability1'] = OPTION2
      insurance.liability1 = OPTION2
    }
    dispatch(actionSaveContract(newContract))
    dispatch(actionCalculationMotorInsuranceFee())
  }

  const onChangeEnabled = (e) => {
    onChangeEnableInsurance(INSURANCE_CODE, e.target.checked)
  }

  return (
    <div className='insurance-item mt-4'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className="d-flex align-items-center">
          <img src={logoCompany} />
          <div className='insurance-name'>
            <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}`)} />
          </div>
        </div>
        <Toggle className="ml-1" icons={false} checked={insurance?.isEnable}
          onChange={onChangeEnabled} />
      </div>
      <div className="insurance-content mt-2">
        <Row className="mb-2 pt-1">
          <Col>
            <FormattedMessage id={getKeyLang('insurance.MOTOR_CONNGUOI.liability')} />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs={12} md={6}>
            <FormGroup className='d-flex align-items-center'>
              <Checkbox
                checked={insurance.liability1 === OPTION1}
                color='primary'
                className='mb-1'
                icon={<Check className='vx-icon' size={16} />}
                onClick={(e) => onChangeInsuranceLiability(1, e.target.checked)}
              />
              <Label className="mb-1">
                <FormattedMessage id={getKeyLang('insurance.MOTOR_CONNGUOI.liability.option1')} />
              </Label>
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup className='d-flex align-items-center'>
              <Checkbox
                checked={insurance.liability1 === OPTION2}
                color='primary'
                className='mb-1'
                icon={<Check className='vx-icon' size={16} />}
                onClick={(e) => onChangeInsuranceLiability(2, e.target.checked)}
              />
              <Label className="mb-1"><FormattedMessage id={getKeyLang('insurance.MOTOR_CONNGUOI.liability.option2')} /></Label>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormattedMessage id={getKeyLang('insurance.CAR_CONNGUOI.numberPeople')} />
          </Col>
          <Col>
            {vehicle.vehicleType.carType === 'MT3' ? (
              <div>3 người</div>
            ) : (<div>2 người</div>)}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default InsuranceMotorPeople
