import React, { useState } from 'react'
import { actionMotorNextStep4 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { useIntl } from 'react-intl'
import { Checkbox, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import moment from 'moment'
import { Utils } from '../../../../../ultity'
import { Check } from 'react-feather'
import { StepFooter } from '../../StepFooter'
import RenderBankTransfer from '../../../../../components/elite-app/bank-tranfer/RenderBankTransfer'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { actionNextStep, ACTION_CONFIRM_PAYMENT } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const PAYMENT_METHODS = {
  ATM: 'ATM',
  VISA: 'VISA_MASTER',
  QR: 'QR_CODE'
}
const MotorStep3 = () => {
  const { contract, stepData, vehicle, feeDetails, paymentMethod } = useSelector(state => state.app.buyInsurance)
  const [isAccepted, setIsAccepted] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()

  const fee = feeDetails.find(item => item.isSelected)

  const onClickNext = () => {
    if (paymentMethod === PAYMENT_TYPE_FUND_TRANSFER) {
      dispatch(actionNextStep())
      dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: 'SUCCESS' })
    } else {
      dispatch(actionMotorNextStep4())
    }
  }

  const getPaymentFee = () => {
    switch (paymentMethod) {
      case PAYMENT_METHODS.ATM:
        return contract.atmPayFee
      case PAYMENT_METHODS.VISA:
        return contract.visaMasterPayFee
      case PAYMENT_METHODS.QR:
        return contract.qrPayFee
      default:
        return 0
    }
  }

  const toggleAccepted = () => {
    setIsAccepted(prevState => !prevState)
  }
  return (
    <div>
      <h3 className='text-primary text-uppercase font-weight-bold'>
        <FormattedMessage id={getKeyLang('insurance.contract')} />
      </h3>
      <h4 className='mt-2'>
        <FormattedMessage id={getKeyLang('insurance.contractNumber')} />: {contract.contractCode}
      </h4>
      <h4 className='text-primary text-uppercase mt-2'><FormattedMessage
        id={getKeyLang('insurance.ownerInformation')} /></h4>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.ownerName')} /></div>
          <div className='info-box'>
            {stepData[1].ownerName}
          </div>
        </Col>
      </Row>
      <h4 className='text-primary text-uppercase mt-2'>
        <FormattedMessage id={getKeyLang('insurance.vehicleInformation')} />
      </h4>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.vehicleType.text')} /></div>
          <div className='info-box'>
            {vehicle.vehicleType.name}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.numberPlate.text')} /></div>
          <div className='info-box'>
            {vehicle.numberPlate}
          </div>
        </Col>
      </Row>
      <Row className='mt-1'>
        {
          vehicle.frameNo ? (
            <Col xs={12} md={4} className='contract-info'>
              <div className='info-label'><FormattedMessage id={getKeyLang('insurance.frameNumber.text')} /></div>
              <div className='info-box'>
                {vehicle.frameNo}
              </div>
            </Col>
          ) : null
        }
        {
          vehicle.machineNo ? (
            <Col xs={12} md={4} className='contract-info'>
              <div className='info-label'><FormattedMessage id={getKeyLang('insurance.machineNumber.text')} /></div>
              <div className='info-box'>
                {vehicle.machineNo}
              </div>
            </Col>
          ) : null
        }
      </Row>
      <Row className='mt-1'>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.insuranceCompany')} /></div>
          <div className='info-box'>
            {feeDetails.find(item => item.isSelected) ? feeDetails.find(item => item.isSelected).companyName : null}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.effectiveDateFrom')} /></div>
          <div className='info-box'>
            {moment(contract.insurances[0].startValueDate).format('DD/MM/YYYY')}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'><FormattedMessage id={getKeyLang('insurance.effectiveDateTo')} /></div>
          <div className='info-box'>
            {moment(contract.insurances[0].endValueDate).format('DD/MM/YYYY')}
          </div>
        </Col>
      </Row>
      <h4 className='text-primary text-uppercase my-3'><FormattedMessage
        id={getKeyLang('insurance.paymentDetail')} /></h4>
      <table className='table table-striped'>
        <tbody>
          {
            Object.keys(fee?.details).filter(key => fee.details[key]).map(key =>
            (
              <tr key={key}>
                <td><FormattedMessage id={getKeyLang(`insurance.fee.${key}`)} /></td>
                <td className='text-right'>{Utils.numberFormat(fee.details[key])}</td>
              </tr>
            ))
          }
          <tr>
            <td><FormattedMessage id={getKeyLang(`insurance.fee.totalInsuranceFee`)} /></td>
            <td className='text-right'>{Utils.numberFormat(contract.totalFee)}</td>
          </tr>
          <tr>
            <td><FormattedMessage id={getKeyLang(`insurance.fee.service`)} /></td>
            <td className='text-right'>{Utils.numberFormat(getPaymentFee() || 0)}</td>
          </tr>
          <tr>
            <td><FormattedMessage id={getKeyLang(`insurance.fee.promote`)} /></td>
            <td className='text-right'>{Utils.numberFormat(contract.discountValue || 0)}</td>
          </tr>

        </tbody>
      </table>
      <hr />
      <div className='d-flex align-items-center justify-content-between px-2 mb-3'>
        <h4 className='text-primary text-uppercase'>
          <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
        </h4>
        <h4 className='text-primary text-uppercase'>{contract.discountValue !== null ? Utils.numberFormat(contract.totalFee + getPaymentFee() - contract.discountValue) :  Utils.numberFormat(contract.totalFee + getPaymentFee())}</h4>
      </div>
      <div className='d-flex align-items-center mb-2'>
        <Checkbox
          color='primary'
          icon={<Check className='vx-icon' size={16} />}
          onChange={toggleAccepted}
        />
        <div>
          <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: getKeyLang('insurance.acceptTerms') }) }} />
        </div>
      </div>
      <RenderBankTransfer isAccepted={isAccepted} contractCode={contract.contractCode} totalFee={contract.discountValue !== null ?  contract.totalFee - contract.discountValue : contract.totalFee} />
      <StepFooter disabled={!isAccepted} onClickNext={onClickNext} />
    </div>
  )
}

export default MotorStep3