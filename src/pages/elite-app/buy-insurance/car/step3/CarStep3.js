import React, { useState } from 'react'
import { StepFooter } from '../../StepFooter'
import { useDispatch, useSelector } from 'react-redux'
import { actionCarNextStep4 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { Checkbox, FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS } from '../../../../../configs/elite-app'
import { Col, Row } from 'reactstrap'
import { Utils } from '../../../../../ultity'
import moment from 'moment'
import { useIntl } from 'react-intl'
import { Check } from 'react-feather'
import RenderBankTransfer from '../../../../../components/elite-app/bank-tranfer/RenderBankTransfer'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { actionNextStep, ACTION_CONFIRM_PAYMENT } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const PAYMENT_METHODS = {
  ATM: 'ATM',
  VISA: 'VISA_MASTER',
  QR: 'QR_CODE'
}

const CarStep3 = () => {
  const { contract, stepData, vehicle, feeDetails, paymentMethod, type } = useSelector(state => state.app.buyInsurance)
  const [isAccepted, setIsAccepted] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()

  const fee = feeDetails.find(item => item.isSelected)
  const insuranceAddons = contract.insuranceAddons.filter(item => item.isEnable).map(item => item.addonCode).join(', ')

  const isNeedFrameNoAndMachineNo = vehicle?.frameNo && vehicle?.machineNo
  const isNeedManufacturerNameAndBrandName = vehicle?.manufacturerName && vehicle?.brandName
  const TDNS = 'tnds'

  const onClickNext = () => {
    if (paymentMethod === PAYMENT_TYPE_FUND_TRANSFER) {
      dispatch(actionNextStep())
      dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: 'SUCCESS' })
    }else{
      dispatch(actionCarNextStep4())
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

  return <div>
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
    <h4 className='text-primary text-uppercase mt-2'><FormattedMessage
      id={getKeyLang('insurance.vehicleInformation')} /></h4>
    <Row>
      <Col xs={12} md={4} className='contract-info'>
        <div className='info-label'>
          <FormattedMessage id={getKeyLang('insurance.vehicleType.text')} />
        </div>
        <div className='info-box'>
          {vehicle.vehicleType.name}
        </div>
      </Col>

      {!stepData[1]?.isRegistered ? <Col xs={12} md={4} className='contract-info'>
        <div className='info-label'><FormattedMessage id={getKeyLang('insurance.numberPlate.text')} /></div>
        <div className='info-box'>
          {vehicle.numberPlate}
        </div>
      </Col> : null}
    </Row>

    {
      isNeedManufacturerNameAndBrandName &&
      <Row className='mt-1'>
        {
          vehicle.manufacturerName && type !== TDNS ? (
            <Col xs={12} md={4} className='contract-info'>
              <div className='info-label'><FormattedMessage id={getKeyLang('insurance.carManufacturer.text')} /></div>
              <div className='info-box'>
                {vehicle.manufacturerName}
              </div>
            </Col>
          ) : null
        }
        {
          vehicle.brandName && type !== TDNS ? <Col xs={12} md={4} className='contract-info'>
            <div className='info-label'><FormattedMessage id={getKeyLang('insurance.brandName.text')} /></div>
            <div className='info-box'>
              {vehicle.brandName}
            </div>
          </Col> : null
        }
      </Row>
    }
    {
      isNeedFrameNoAndMachineNo &&
      <Row className='mt-1'>
        {
          vehicle.frameNo && (
            <Col xs={12} md={4} className='contract-info'>
              <div className='info-label'><FormattedMessage id={getKeyLang('insurance.frameNumber.text')} /></div>
              <div className='info-box'>
                {vehicle.frameNo}
              </div>
            </Col>
          )
        }
        {
          vehicle.machineNo && (
            <Col xs={12} md={4} className='contract-info'>
              <div className='info-label'><FormattedMessage id={getKeyLang('insurance.machineNumber.text')} /></div>
              <div className='info-box'>
                {vehicle.machineNo}
              </div>
            </Col>
          )
        }
      </Row>
    }

    <Row className='mt-2'>
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
          Object.keys(fee?.details).filter(key => fee.details[key]).map(key => key === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key ?
            (
              <>
                <tr key={key}>
                  <td><FormattedMessage id={getKeyLang(`insurance.fee.${key}`)} /></td>
                  <td className='text-right'>{Utils.numberFormat(fee.details[key])}</td>
                </tr>
                <tr key={key}>
                  <td><FormattedMessage id={getKeyLang(`insurance.additionTerms`)} /></td>
                  <td className='text-right'>{insuranceAddons}</td>
                </tr>
              </>
            )
            : (
              <tr key={key}>
                <td><FormattedMessage id={getKeyLang(`insurance.fee.${key}`)} /></td>
                <td className='text-right'>{Utils.numberFormat(fee.details[key])}</td>
              </tr>
            ))
        }
        <tr>
          <td><FormattedMessage id={getKeyLang(`insurance.fee.totalInsuranceFee`)} /></td>
          <td className='text-right'>{Utils.numberFormat(fee.totalFee)}</td>
        </tr>
        <tr>
          <td><FormattedMessage id={getKeyLang(`insurance.fee.service`)} /></td>
          <td className='text-right'>{Utils.numberFormat(getPaymentFee() || 0)}</td>
        </tr>
        <tr>
          <td><FormattedMessage id={getKeyLang(`insurance.fee.promote`)} /></td>
          <td className='text-right'>{Utils.numberFormat(contract.discount || 0)}</td>
        </tr>

      </tbody>
    </table>
    <hr />

    <div className='d-flex justify-content-between px-1 mb-3'>
      <h4 className='text-primary text-uppercase'>
        <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
      </h4>
      <h4 className='text-primary text-uppercase'>
        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(fee.totalFee + getPaymentFee())}
      </h4>
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

    <RenderBankTransfer isAccepted={isAccepted} contractCode={contract.contractCode} totalFee={fee.totalFee} />

    <StepFooter disabled={!isAccepted} onClickNext={onClickNext} />
  </div>
}

export default CarStep3