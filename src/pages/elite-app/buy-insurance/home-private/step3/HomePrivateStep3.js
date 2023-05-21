import { Checkbox, Select } from 'base-app'
import moment from 'moment'
import React, { useState } from 'react'
import { Check } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import RenderBankTransfer from '../../../../../components/elite-app/bank-tranfer/RenderBankTransfer'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../configs/elite-app'
import { actionHomePrivateNextStep4 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomePrivateInsurance'
import { actionNextStep, ACTION_CONFIRM_PAYMENT } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { Utils } from '../../../../../ultity'
import { getAccepterms } from '../../BuyInsurance'
import { StepFooter } from '../../StepFooter'

const HomePrivateStep3 = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const termsAndConditions = "https://sit2.inon.vn/resources/pdf/terms-and-conditions.pdf"

  const [isAccepted, setIsAccepted] = useState(false)
  const {
    insuranceHomePrivate,
    stepData,
    contract,
    feeDetails,
    paymentMethod,
    contractHomePrivateInfo
  } = useSelector((state) => state.app.buyInsurance)
  const PAYMENT_METHODS = {
    ATM: 'ATM',
    VISA_MASTER: 'VISA_MASTER',
    QR_CODE: 'QR_CODE'
  }
  const onClickNext = () => {
    if (paymentMethod === PAYMENT_TYPE_FUND_TRANSFER) {
      dispatch(actionNextStep())
      dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: 'SUCCESS' })
    }else{
      dispatch(actionHomePrivateNextStep4())
    }
   
  }

  const toggleAccepted = () => {
    setIsAccepted((prevState) => !prevState)
  }

  const getPaymentFee = () => {
    switch (paymentMethod) {
      case PAYMENT_METHODS.ATM:
        return feeDetails.ATMPayFee
      case PAYMENT_METHODS.VISA_MASTER:
        return feeDetails.VISA_MASTERPayFee
      case PAYMENT_METHODS.QR_CODE:
        return feeDetails.QR_CODEPayFee
      default:
        return 0
    }
  }
  const getTypeTheHouse = () => {
    switch (contractHomePrivateInfo.houseType) {
      case 'APARTMENT':
        return 'Chung cư'
      case 'TOWNHOUSE':
        return 'Nhà liền kề/biệt thự'
      case 'OTHER':
        return 'Khác'
      default:
        break
    }
  }
  return (
    <div>
      <div className='d-flex contract-number mb-2 mt-2'>
        <div className='mr-2 '>
          <FormattedMessage className="font-weight-bold" id={getKeyLang('insurance.contractNumber')} />
        </div>
        <div>{contractHomePrivateInfo.contractCode}</div>
      </div>

      <div className='d-flex align-items-center mb-1'>
        <div className='payment-content-label font-weight-bold'>
          <FormattedMessage
            id={getKeyLang(`insurance.homeprivate.step3.brandIsurance`)}
          />
        </div>
        <div className='ml-1 text-left text-buyer-insurance'>{feeDetails.companyFullName}</div>
      </div>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage id={getKeyLang('insurance.effectiveDateFrom')} />
          </div>
          <div className='info-box'>
            {moment(contractHomePrivateInfo.startDate).format("DD/MM/YYYY")}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage id={getKeyLang('insurance.effectiveDateTo')} />
          </div>
          <div className='info-box'>
            {moment(contractHomePrivateInfo.endDate).format("DD/MM/YYYY")}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang(
                'insurance.homeprivate.step3.PeopleInsured'
              )}
            />
          </div>
          <div className='info-box'>
            {contract.buyerName}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.IDNumber')}
            />
          </div>
          <div className='info-box'>{contractHomePrivateInfo.icNo}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.dateRange')}
            />
          </div>
          <div className='info-box'>{moment(contractHomePrivateInfo.issuedDate).format('DD/MM/YYYY')}</div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.issuedBy')}
            />
          </div>
          <div className='info-box'>{contractHomePrivateInfo.issuedPlace}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.phoneNumber')}
            />
          </div>
          <div className='info-box'>{contractHomePrivateInfo.phoneNumber}</div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.email')}
            />
          </div>
          <div className='text-buyer-insurance'>{contractHomePrivateInfo.email}</div>
        </Col>
      </Row>
      <div className='d-flex mt-2 justify-content-between'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(`insurance.homeprivate.step3.theHouseIsInsured`)}
          />
        </div>
        <div className='mb-1 text-buyer-insurance' style={{maxWidth : "66%"}}>{`${contractHomePrivateInfo.detail}, ${contractHomePrivateInfo.ward}, ${contractHomePrivateInfo.district}, ${contractHomePrivateInfo.city}`}</div>
      </div>
      <div className='d-flex justify-content-between'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(`insurance.homeprivate.step3.typeTheHouse`)}
          />
        </div>
        <div className='mb-1 text-buyer-insurance'>{getTypeTheHouse()}</div>
      </div>
      <div className='d-flex justify-content-between mt-1'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(
              `insurance.homeprivate.step3.propertyInsurancePremiums`
            )}
          />
        </div>
        <div className='mb-1 text-buyer-insurance'>
          {Utils.numberFormat(feeDetails.feeMaterial)}
        </div>
      </div>

      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang(
                'insurance.homeprivate.step3.levelOfResponsibility'
              )}
            />
          </div>
          <div className='text-buyer-insurance'>
            {Utils.numberFormat(stepData[2].insuranceAddOnMaterialcompensationLimit)}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.coverage')}
            />
          </div>
          <div className='text-buyer-insurance'>
            {stepData[2].insuranceCoverage == 1
              ? 'Cơ bản'
              : 'Toàn diện'}
          </div>
        </Col>
      </Row>

      <div className='d-flex justify-content-between mt-2'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(
              `insurance.homeprivate.step3.insurancePremiumsInsideTheHouse`
            )}
          />
        </div>
        <div className='ml-1 text-buyer-insurance'>{isNaN(feeDetails.feeAsset) ? Utils.numberFormat(0) : Utils.numberFormat(feeDetails.feeAsset)}</div>
      </div>

      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang(
                'insurance.homeprivate.step3.levelOfResponsibility'
              )}
            />
          </div>
          <div className='text-buyer-insurance'>
            {Utils.numberFormat(stepData[2].insuranceAddOnAssetcompensationLimit)}
          </div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step3.coverage')}
            />
          </div>
          <div className='info-box'>
            {stepData[2].insuranceCoverage == 1
              ? 'Cơ bản'
              : 'Toàn diện'}
          </div>
        </Col>
      </Row>

      <div className='d-flex justify-content-between mt-1'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(`insurance.homeprivate.step3.serviceFeesIncrease`)}
          />
        </div>
        <div className='mb-1 ml-1 text-buyer-insurance'>
          {Utils.numberFormat(getPaymentFee())}
        </div>
      </div>
      <div className='d-flex justify-content-between mt-1'>
        <div className="font-weight-bold">
          <FormattedMessage
            id={getKeyLang(`insurance.homeprivate.step3.promotionDiscount`)}
          />
        </div>
        <div className='mb-1 ml-1'>{feeDetails.reduceFee}</div>
      </div>

      <div className='total-fee'>
        <div className='total-fee-title'>
          <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
        </div>
        <div className='total-fee-content text-buyer-insurance'>
          {Utils.numberFormat(feeDetails.feeInsurance + getPaymentFee())}
        </div>
      </div>

      <div className='d-flex align-items-center'>
        <Checkbox
          color='primary'
          icon={<Check className='vx-icon' size={16} />}
          onChange={toggleAccepted}
        />
        <div>
          {
            getAccepterms(intl)
          }
        </div>
      </div>
      <RenderBankTransfer isAccepted={isAccepted} contractCode={contractHomePrivateInfo.contractCode} totalFee={feeDetails.feeInsurance} />
      <StepFooter disabled={!isAccepted} onClickNext={onClickNext} />
    </div>
  )
}

export default HomePrivateStep3
