import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, FormattedMessage } from 'base-app'
import { getKeyLang, PAYMENT_METHODS } from '../../../../../configs/elite-app'
import PaymentMethods from '../../payment-method/PaymentMethods'
import { Col, Row, Table } from 'reactstrap'
import '../../../../../assets/scss/elite-app/buy-insurance/vta/vta-step2.scss'
import moment from 'moment'
import { Utils } from '../../../../../ultity'
import { StepFooter } from '../../StepFooter'
import { actionVTANextStep4 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVtaInsurance'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { getAccepterms } from '../../BuyInsurance'
import { ACE, BM, BT, CON, DN, TextStyled, VC } from '../utility'
import RenderBankTransfer from '../../../../../components/elite-app/bank-tranfer/RenderBankTransfer'
import { actionNextStep, ACTION_CONFIRM_PAYMENT } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'

const VtaStep3 = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [isAccepted, setIsAccepted] = useState(false)
  const { contract, feeDetails, paymentMethod, stepData } = useSelector(
    (state) => state.app.buyInsurance
  )
  const { buyerInfo, beneficiariesInfo } = useSelector(
    (state) => state.app.buyInsurance.contract
  )
  const onClickSubmit = () => {
    if (paymentMethod === PAYMENT_TYPE_FUND_TRANSFER) {
      dispatch(actionNextStep())
      dispatch({ type: ACTION_CONFIRM_PAYMENT, payload: 'SUCCESS' })
    }else{
      dispatch(actionVTANextStep4())

    }
  }

  const toggleAccepted = () => {
    setIsAccepted((prevState) => !prevState)
  }

  const getPaymentFee = () => {
    switch (paymentMethod) {
      case PAYMENT_METHODS.ATM:
        return feeDetails.paymentFeeATM
      case PAYMENT_METHODS.VISA:
        return feeDetails.paymentFeeVISA
      case PAYMENT_METHODS.QR:
        return feeDetails.paymentFeeQRCode
      default:
        return 0
    }
  }
  //handle render relation ship in table
  const getRelationShip = (relationship) => {
    switch (relationship) {
      case BT:
        return <FormattedMessage id={getKeyLang('insurance.vta.YOURSELF')} />
      case BM:
        return <FormattedMessage id={getKeyLang('insurance.vta.PARENT')} />
      case VC:
        return <FormattedMessage id={getKeyLang('insurance.vta.COUPLE')} />
      case CON:
        return <FormattedMessage id={getKeyLang('insurance.vta.CHILD')} />
      case ACE:
        return <FormattedMessage id={getKeyLang('insurance.vta.SIBLINGS')} />
        case DN:
          return <FormattedMessage id={getKeyLang('insurance.vta.enterprise')} />
      default:
        return null
    }
  }
  return (
    <div>
      <div className='d-flex contract-number'>
        <div className='mr-2'>
          <FormattedMessage id={getKeyLang('insurance.contractNumber')} />
        </div>
        <div>{feeDetails.contractCode}</div>
      </div>

      <div className='title-info mt-1'>
        <FormattedMessage id={getKeyLang('insurance.buyerInformation')} />
      </div>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.contractInfo.fullName')}
            />
          </div>
          <div className='text-buyer-insurance'>{buyerInfo.fullName}</div>
        </Col>

        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeSafety.icNumber')}
            />
          </div>
          <div className='text-buyer-insurance'>{buyerInfo.icNo}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeSafety.phoneNumber')}
            />
          </div>
          <div className='text-buyer-insurance'>{buyerInfo.phoneNumber}</div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage id={getKeyLang('insurance.homeSafety.email')} />
          </div>
          <div className='text-buyer-insurance'>{buyerInfo?.email}</div>
        </Col>
        <Col xs={12} md={4} className='contract-info'>
          <div className='info-label'>
            <FormattedMessage id={getKeyLang('insurance.owner.address')} />
          </div>
          <TextStyled className='text-buyer-insurance' maxWidth={'80%'}>
            {buyerInfo?.address +
              buyerInfo.addresses[0].ward +
                ', ' +
                buyerInfo.addresses[0].district +
                ', ' +
                buyerInfo.addresses[0].city}
          </TextStyled>
        </Col>
      </Row>

      <div className='title-info mt-3'>
        <FormattedMessage
          id={getKeyLang('insurance.insuredPersonInformation')}
        />
      </div>

      <Table responsive className='mt-2 d-none d-md-table'>
        <thead className='text-center'>
          <tr>
            <th>
              <FormattedMessage
                id={getKeyLang('insurance.contractInfo.fullName')}
              />
            </th>
            <th>
              <FormattedMessage
                id={getKeyLang('insurance.vta.relationshipWithBuyer')}
              />
            </th>
            <th>
              <FormattedMessage id={getKeyLang('insurance.vta.icType')} />
            </th>
            <th>
              <FormattedMessage id={getKeyLang('insurance.vta.dateBirthday')} />
            </th>
            <th>
              <FormattedMessage
                id={getKeyLang('insurance.homeSafety.phoneNumber')}
              />
            </th>
            <th>
              <FormattedMessage id={getKeyLang('insurance.homeSafety.email')} />
            </th>
          </tr>
        </thead>
        <tbody>
          {stepData[1]?.moreInsured.map((item) => (
            <tr className='text-center'>
              <td>{item?.fullName}</td>
              <td>{getRelationShip(item?.buyerRelation)}</td>
              <td>{item?.icNo === "" ? "-" : item?.icNo}</td>
              <td>{moment(item?.dateOfBirth).format('DD/MM/YYYY')}</td>
              <td>{item?.phoneNumber === '' ? "-" : item?.phoneNumber}</td>
              <td>{item?.email === '' ? "-" : item?.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='d-block d-md-none'>
        {stepData[1]?.moreInsured.map((item, index) => (
          <div key={index}>
            <h5 className={`${index === 0 ? "mt-1" : ""} font-weight-bold success`}>
              <FormattedMessage id={getKeyLang('insurance.vta.people')} />
              <span>{ index + 1}</span>
            </h5>
            <Row>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage
                    id={getKeyLang('insurance.contractInfo.fullName')}
                  />
                </div>
                <div className='text-buyer-insurance'>{item?.fullName}</div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage
                    id={getKeyLang('insurance.vta.relationshipWithBuyer')}
                  />
                </div>
                <div className='text-buyer-insurance'>
                  {getRelationShip(item?.buyerRelation)}
                </div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage id={getKeyLang('insurance.vta.icType')} />
                </div>
                <div className='text-buyer-insurance'>
                  {item?.icNo}
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage
                    id={getKeyLang('insurance.vta.dateBirthday')}
                  />
                </div>
                <div className='text-buyer-insurance'>
                  {moment(item?.dateOfBirth).format('DD/MM/YYYY')}
                </div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage
                    id={getKeyLang('insurance.homeSafety.phoneNumber')}
                  />
                </div>
                <div className='text-buyer-insurance'>{item?.phoneNumber === "" ? "-" : item?.phoneNumber}</div>
              </Col>
              <Col xs={12} md={4} className='contract-info'>
                <div className='info-label'>
                  <FormattedMessage
                    id={getKeyLang('insurance.homeSafety.email')}
                  />
                </div>
                <div className='text-buyer-insurance'>{item?.email === "" ? "-" : item?.email}</div>
              </Col>
            </Row>
            <br />
          </div>
        ))}
      </div>

      <div className='mt-2'>
        <PaymentMethods />
      </div>

      <div className='title-info mt-3 mb-2'>
        <FormattedMessage id={getKeyLang('insurance.paymentDetail')} />
      </div>

      <div className='payment-content'>
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage id={getKeyLang('insurance.insuranceCompany')} />
          </div>
          <div className='mb-1 ml-1'>{feeDetails.companyFullName}</div>
        </div>
        {/* package name  */}
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage
              id={getKeyLang('insurance.contractInfo.packageName')}
            />
          </div>
          <div className='mb-1 ml-1'>
            {beneficiariesInfo[0]?.packageName === 'GOI1' && (
              <FormattedMessage id={getKeyLang('insurance.vta.package1')} />
            )}
            {beneficiariesInfo[0]?.packageName === 'GOI2' && (
              <FormattedMessage id={getKeyLang('insurance.vta.package2')} />
            )}
            {beneficiariesInfo[0]?.packageName === 'GOI3' && (
              <FormattedMessage id={getKeyLang('insurance.vta.package3')} />
            )}
          </div>
        </div>
        {/* duration insurance  */}
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage
              id={getKeyLang('insurance.duration')}
            />
          </div>
          <div className='mb-1 ml-1'>
            {beneficiariesInfo[0]?.duration + ' '}
            <FormattedMessage id={getKeyLang('insurance.durationUnit')} />
          </div>
        </div>
        {/* from date  */}
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage id={getKeyLang('contractManagement.dayFrom')} />
          </div>
          <div className='mb-1 ml-1'>
            {moment(beneficiariesInfo[0]?.startDate).format('DD/MM/YYYY')}
          </div>
        </div>
        {/* to date */}
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage id={getKeyLang('contractManagement.dayTo')} />
          </div>
          <div className='mb-1 ml-1'>
            {moment(beneficiariesInfo[0]?.endDate).format('DD/MM/YYYY')}
          </div>
        </div>
        {/* ==========fee insurance vnd/nguoi ============= */}
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage id={getKeyLang('insurance.vta.feeOnePerson')} />
          </div>
          <div className='mb-1 ml-1'>
            {Utils.numberFormat(beneficiariesInfo[0]?.feeInsurance)}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage
              id={getKeyLang('insurance.homeSafety.numberOfInsured')}
            />
          </div>
          <div className='mb-1 ml-1'>{contract.beneficiariesInfo.length}</div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='payment-content-label'>
            <FormattedMessage id={getKeyLang('insurance.fee.service')} />
          </div>
          <div className='mb-1 ml-1'>
            {Utils.numberFormat(getPaymentFee() || 0)}
          </div>
        </div>
      </div>

      <div className='total-fee'>
        <div className='total-fee-title'>
          <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
        </div>
        <div className='total-fee-content'>
          {Utils.numberFormat(feeDetails.feeInsurance + getPaymentFee())}
        </div>
      </div>

      <div className='d-flex align-items-center mt-3'>
        <Checkbox
          color='primary'
          icon={<Check className='vx-icon' size={16} />}
          onChange={toggleAccepted}
        />
        <div>{getAccepterms(intl)}</div>
      </div>
      <RenderBankTransfer isAccepted={isAccepted} contractCode={feeDetails.contractCode} totalFee={feeDetails.feeInsurance} />
      <StepFooter disabled={!isAccepted} onClickNext={onClickSubmit} />
    </div>
  )
}

export default VtaStep3
