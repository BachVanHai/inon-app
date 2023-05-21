import { Checkbox, FormattedMessage } from 'base-app'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'
import BankTransferInfo from '../../../../../components/elite-app/bank-tranfer/BankTransferInfo'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { render } from '../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import { getKeyLang, PAYMENT_METHODS } from '../../../../../configs/elite-app'
import { COMPANIES } from '../../../../../configs/insurance-app'
import Service from '../../../../../services/insurance-app/appConfig'
import { Utils } from '../../../../../ultity'
import { getAccepterms } from '../../BuyInsurance'
import PaymentMethods from '../../payment-method/PaymentMethods'
import { StepFooter } from '../../StepFooter'
import { KEY_DURATION_SELECTED } from '../step2/formikConfig'
import { ARR_COMPANIES } from '../step2/utility'
import { getDefault_updatePaymentContractObj, updateContract } from './utility'
export const TextStyled = styled.span`
  max-width: ${(p) => p.maxWidth || "80%"};
  word-break: break-word;
`
const StepForm = ({ stepInfo, className, handleSubmit , isAccepted ,
    setIsAccepted }) => {
    const {
        contractInfo, contractCode, step_2,  step_1,  totalFee , dataFees , companyId } = stepInfo
    const { paymentMethod } = useSelector(
        (state) => state.app.buyInsurance
    )
    const dataFeeFind = dataFees.find(_elt => _elt?.companyId === companyId).feeInsurances
    const dispatch = useDispatch()
    const toggleAccepted = () => {
        setIsAccepted((prevState) => !prevState)
    }
    const updatePaymentType = (paymentMethod) => {
        dispatch(
            updateContract(
                getDefault_updatePaymentContractObj(paymentMethod, contractInfo)
            )
        )
    }
    const getPaymentFee = () => {
        switch (paymentMethod) {
            case PAYMENT_METHODS.FUND_TRANSFER:
                return dataFeeFind.feeFUND_TRANSFER
            case PAYMENT_METHODS.ATM:
                return dataFeeFind.feeATM
            case PAYMENT_METHODS.VISA:
                return dataFeeFind.feeVISA_MASTER
            case PAYMENT_METHODS.QR:
                return dataFeeFind.feeQR_CODE
            default:
                return 0
        }
    }
    const intl = useIntl()
    useEffect(() => {
    }, [contractInfo]);
    return (
        <div className={className}>
            <div className='d-flex contract-number'>
                <div className='mr-2'>
                    <FormattedMessage id={getKeyLang('insurance.contractNumber')} />
                </div>
                <div>{contractCode}</div>
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
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.fullname}</div>
                </Col>

                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage
                            id={getKeyLang('insurance.homeSafety.icNumber')}
                        />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.icNo}</div>
                </Col>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage
                            id={getKeyLang('insurance.vta.dateBirthday')}
                        />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.dateOfBirth}</div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage
                            id={getKeyLang('insurance.homeSafety.phoneNumber')}
                        />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.phoneNumber}</div>
                </Col>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage id={getKeyLang('insurance.homeSafety.email')} />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.email}</div>
                </Col>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage id={getKeyLang('insurance.owner.address')} />
                    </div>
                    <TextStyled className='text-buyer-insurance' maxWidth={'80%'}>
                        {step_1.addtinalPeople[0]?.detail} {step_1.addtinalPeople[0]?.district === "" ? null : `, ${step_1.addtinalPeople[0]?.district}`} {step_1.addtinalPeople[0]?.ward === "" ? null : `, ${step_1.addtinalPeople[0]?.ward}`} {step_1.addtinalPeople[0]?.city === "" ? null : `, ${step_1.addtinalPeople[0]?.city}`}


                    </TextStyled>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage
                            id={getKeyLang('insurance.homeprivate.step2.bankName')}
                        />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.bank}</div>
                </Col>
                <Col xs={12} md={4} className='contract-info'>
                    <div className='info-label'>
                        <FormattedMessage id={getKeyLang('heath-care.stkRequried')} />
                    </div>
                    <div className='text-buyer-insurance'>{step_1.addtinalPeople[0]?.accountNumber}</div>
                </Col>
            </Row>

            <div className='mt-2'>
                <PaymentMethods handleCallBack={updatePaymentType} />
            </div>
            {/* insurance info  */}

            <div className='title-info mt-3 mb-2'>
                <FormattedMessage id={getKeyLang('insurance.paymentDetail')} />
            </div>

            <div className='payment-content'>
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('insurance.insuranceCompany')} />
                    </div>
                    <div className='mb-1 ml-1'>{
                        ARR_COMPANIES.find(_elt => _elt.id === companyId )?.nameDetail
                    }</div>
                </div>
                {/* package name  */}
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage
                            id={getKeyLang('insurance.contractInfo.packageName')}
                        />
                    </div>
                    <div className='mb-1 ml-1'>
                        {step_2?.packageName === 'GOI1' && (
                            <FormattedMessage id={getKeyLang('insurance.vta.package1')} />
                        )}
                        {step_2?.packageName === 'GOI2' && (
                            <FormattedMessage id={getKeyLang('insurance.vta.package2')} />
                        )}
                        {step_2?.packageName === 'GOI3' && (
                            <FormattedMessage id={getKeyLang('insurance.vta.package3')} />
                        )}
                         {step_2?.packageName === 'GOI4' && (
                            <FormattedMessage id={getKeyLang('insurance.heathCare.package4')} />
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
                        {/* {beneficiariesInfo[0]?.duration + ' '} */}
                        {
                            `${step_2[KEY_DURATION_SELECTED] } `
                        }
                        <FormattedMessage id={getKeyLang('insurance.durationUnit')} />

                    </div>
                </div>
                {/* from date  */}
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('contractManagement.dayFrom')} />
                    </div>
                    <div className='mb-1 ml-1'>
                        {moment(step_2?.startValueDate).format('DD/MM/YYYY')}
                    </div>
                </div>
                {/* to date */}
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('contractManagement.dayTo')} />
                    </div>
                    <div className='mb-1 ml-1'>
                        {moment(step_2?.endValueDate).format('DD/MM/YYYY')}
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('heath-care.insuranceFee')} />
                    </div>
                    <div className='mb-1 ml-1'>
                        {Utils.numberFormat(totalFee || 0)}
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('insurance.fee.service')} />
                    </div>
                    <div className='mb-1 ml-1'>
                        {Utils.numberFormat(getPaymentFee() || 0)}
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='payment-content-label'>
                        <FormattedMessage id={getKeyLang('insurance.fee.promote')} />
                    </div>
                    <div className='mb-1 ml-1'>
                        {Utils.numberFormat(0)}
                    </div>
                </div>
            </div>

            <div className='total-fee'>
                <div className='total-fee-title'>
                    <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
                </div>
                <div className='total-fee-content'>
                    {Utils.numberFormat(totalFee + getPaymentFee())}
                </div>
            </div>

            {/* check box  */}

            <div className='d-flex align-items-center mt-1 mb-2'>
                <Checkbox
                    color='primary'
                    icon={<Check className='vx-icon' size={16} />}
                    onChange={toggleAccepted}
                />
                <div>{getAccepterms(intl)}</div>
            </div>
            <div className='mb-2'>
                {
                    render(isAccepted, PAYMENT_TYPE_FUND_TRANSFER, paymentMethod,
                        <BankTransferInfo
                            totalFeeInclVAT={totalFee + getPaymentFee()}
                            getBankTransferInfo={Service.getBankTransferInfo}
                            contractCode={contractCode}
                        />
                    )
                }
            </div>
            <StepFooter
                disabled={!isAccepted}
                onClickNext={() => {
                    handleSubmit()
                }}
            />

        </div >
    )
}

export default StepForm