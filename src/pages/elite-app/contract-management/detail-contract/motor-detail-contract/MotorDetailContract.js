import React from 'react'
import { Badge } from 'reactstrap'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import { Utils } from '../../../../../ultity'
import '../../../../../assets/scss/elite-app/contract-management/detail-contract/motor-detail-contract/motor-detail-contract.scss'
import VehicleInformation from '../VehicleInformation'
import ContractInformation from '../ContractInformation'

const MotorDetailContract = ({ contract }) => {
  const MOTOR_TNDS = 'MOTOR_TNDS'
  const MOTOR_CONNGUOI = 'MOTOR_CONNGUOI'

  const statusType = (type) => {
    switch (type) {
      case 'FINISH':
        return <Badge color='success'><FormattedMessage id={getKeyLang('contractManagement.successStatus')} /></Badge>
      default:
        return ''
    }
  }

  const motorInsuranceFees = (contract, type, keyLang) => {
    const motorInsurance = contract.insurances.filter(
      (item) => item.insuranceCode === type
    )
    if (motorInsurance.length > 0 && motorInsurance[0].isEnable) {
      return motorInsurance[0].fee
    } else return null
  }

  const motorEffectDate = (contract) => {
    const motorInsurance = contract.insurances.filter(item => item.insuranceCode === MOTOR_TNDS)
    if (motorInsurance.length > 0 && motorInsurance[0].isEnable) {
      return {
        startDate: motorInsurance[0].startValueDate.substring(0, 10) + " " + motorInsurance[0].startValueDate.substring(11, 16),
        endDate: motorInsurance[0].endValueDate.substring(0, 10) + " " + motorInsurance[0].endValueDate.substring(11, 16)
      }
    } else return null
  }

  return (
    <div className='bg-white motor-detail-contract mx-2'>
      <ContractInformation contract={contract} />
      <div>
        <VehicleInformation contract={contract} />
        {motorInsuranceFees(contract, MOTOR_TNDS) ? (
          <div className='row align-items-center py-2'>
            <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
              id={getKeyLang('contractManagement.motorTNDSMandatoryInsuranceFees')} /></div>
            <div
              className='col-md-6 col-12 dark-green'>{Utils.numberFormat(motorInsuranceFees(contract, MOTOR_TNDS))}</div>
          </div>
        ) : null}

        {motorInsuranceFees(contract, MOTOR_CONNGUOI) ? (
          <div className='row align-items-center py-2'>
            <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
              id={getKeyLang('contractManagement.motorTNDSFreeInsuranceFees')} /></div>
            <div
              className='col-md-6 col-12 dark-green'>{Utils.numberFormat(motorInsuranceFees(contract, MOTOR_CONNGUOI))}</div>
          </div>
        ) : null}

        {
          motorEffectDate(contract) ? (
            <div className='row align-items-center py-2'>
              <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                id={getKeyLang('contractManagement.effectFrom')} /></div>
              <div className='col-md-6 col-12 dark-green'>{motorEffectDate(contract).startDate}</div>
            </div>
          ) : null
        }
        {
          motorEffectDate(contract) ? (
            <div className='row align-items-center py-2'>
              <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                id={getKeyLang('contractManagement.effectTo')} /></div>
              <div className='col-md-6 col-12 dark-green'>{motorEffectDate(contract).endDate}</div>
            </div>
          ) : null
        }
        <div className='row align-items-center py-2'>
          <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
            <FormattedMessage id={getKeyLang('contractManagement.vatFees')} />:
          </div>
          <div className='col-md-6 col-12 dark-green'>{Utils.numberFormat(contract.vatfee)}</div>
        </div>

        <div className='row align-items-center py-2'>
          <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
            <FormattedMessage id={getKeyLang('contractManagement.feesTotal')} />:
          </div>
          <div className='col-md-6 col-12 dark-green'>{Utils.numberFormat(contract.totalFee)}</div>
        </div>

        <div className='row align-items-center py-2'>
          <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
            <FormattedMessage id={getKeyLang('contractManagement.paymentType')} />:
          </div>
          <div className='col-md-6 col-12 dark-green'>
            <FormattedMessage id={getKeyLang(`contractManagement.${contract.paymentType}`)} />
          </div>
        </div>

        <div className='row align-items-center py-2'>
          <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
            <FormattedMessage id={getKeyLang('contractManagement.status')} />:
          </div>
          <div className='col-md-6 col-12 dark-green'>{statusType(contract.latestApprovalStatus)}</div>
        </div>
      </div>
    </div>
  )
}

export default MotorDetailContract
