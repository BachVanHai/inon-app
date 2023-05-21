import React from 'react'
import { Checkbox, FormattedMessage } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import BankTranferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import {
  getKeyLang,
  NAME_APP_CONFIG
} from '../../../../../../configs/insurance-app'
import { pay } from '../../../../../../redux/actions/insurance-app/appConfig'
import {
  ACTION_UPDATE_PROPS_HOME,
  backStep,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsuranceMultiple'
import { KEY_DEBT_ACCOUNT_INFO } from '../../../../../../redux/reducers/insurance-app/appConfig'
import {
  KET_CONTRACT_GROUP_ID,
  KEY_ACTIVE_STEP,
  KEY_AGREED_TERM_OF_SERVICES_STATUS,
  KEY_COMPANY_ID,
  KEY_COMPANY_NAME,
  KEY_DATA_FEES,
  KEY_PAYMENT_TYPE,
  KEY_PAY_CONTRACT_STATUS,
  KEY_STEP_1,
  KEY_TOTAL_FEE,
  MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import Service from '../../../../../../services/insurance-app/buyInsuranceCar'
import { buyInsurancePersonHomeMultipleService } from '../../../../../../services/insurance-app/buyInsurancePersonHomeMultiple'
import { intlConvertToVnd } from '../../../../../../ultity'
import { KEY_COUPON_CODE } from '../../../personal-home/components/step2/formikConfig'
import { RANGE_DEDUCTIBLE } from '../../utility'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import FeeInsurance from './feeInsurance'
import TableInfoData from './tableInfoData'

const Step2 = () => {
  const formik = useFormik({
    validateOnChange: true
  })
  const { [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo } = useSelector(
    (state) => state.app[NAME_APP_CONFIG]
  )
  const { errors, touched } = formik
  const intl = useIntl()
  const dispatch = useDispatch()
  const [agreePayment, setAgreePayment] = useState(false)

  const toggleAccepted = () => {
    setAgreePayment(!agreePayment)
    if (agreePayment) {
      dispatch(
        updateProps([
          {
            prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
            value: false
          }
        ])
      )
      return
    }
    dispatch(
      updateProps([
        {
          prop: KEY_AGREED_TERM_OF_SERVICES_STATUS,
          value: true
        }
      ])
    )
  }
  const changePaymentType = async (type) => {
    const contract = {
      contractGroupId: contractGroupId,
      paymentType: type
    }
    const res = await buyInsurancePersonHomeMultipleService.updatePaymentType(
      contract
    )
    if (res.status === 200) {
      setPayment(type)
    }
  }
  const {
    [KEY_PAYMENT_TYPE]: paymentType,
    [KEY_ACTIVE_STEP]: activeStep,
    [KEY_STEP_1]: step1Data,
    [KEY_TOTAL_FEE]: totalFee,
    [KEY_DATA_FEES]: dataFees,
    [KEY_COMPANY_NAME]: companyName,
    [KET_CONTRACT_GROUP_ID]: contractGroupId,
    [KEY_COMPANY_ID]: companyId
  } = useSelector((state) => state.app[REDUX_STATE_NAME])
  const [payment, setPayment] = useState(paymentType)
  console.log(paymentType)
  const next = () => {
    dispatch(
      pay(
        null,
        null,
        {
          MAX_STEP: MAX_STEP,
          KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
          KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS,
          ACTION_UPDATE_PROPS: ACTION_UPDATE_PROPS_HOME
        },
        buyInsurancePersonHomeMultipleService.payment,
        null,
        {
          contractGroupId: contractGroupId,
          transactionCode: contractGroupId,
          amount: `${totalFee}`,
          paymentType: paymentType
        }
      )
    )
  }
  const debt = () => {
    dispatch(
      pay(
        null,
        null,
        {
          MAX_STEP: MAX_STEP,
          KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
          KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS,
          ACTION_UPDATE_PROPS: ACTION_UPDATE_PROPS_HOME
        },
        buyInsurancePersonHomeMultipleService.payment,
        null,
        {
          contractGroupId: contractGroupId,
          transactionCode: contractGroupId,
          amount: `${totalFee}`,
          paymentType: paymentType
        }
      )
    )
  }

  const bonus = () => {
    dispatch(
      pay(
        null,
        null,
        {
          MAX_STEP: MAX_STEP,
          KEY_ACTIVE_STEP: KEY_ACTIVE_STEP,
          KEY_PAY_CONTRACT_STATUS: KEY_PAY_CONTRACT_STATUS,
          ACTION_UPDATE_PROPS: ACTION_UPDATE_PROPS_HOME
        },
        buyInsurancePersonHomeMultipleService.payment,
        null,
        {
          contractGroupId: contractGroupId,
          transactionCode: contractGroupId,
          amount: `${totalFee}`,
          paymentType: paymentType
        }
      )
    )
  }

  const feeRows = [
    {
      msgField: <FormattedMessage id={getKeyLang(`insurance.feeInsurance`)} />,
      content: `${intlConvertToVnd(totalFee, intl)} VNĐ`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`FeeVAT`)} />,
      content: `${intlConvertToVnd(dataFees?.feeVAT, intl)} VNĐ`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`ValueGiftCode`)} />,
      content: `${intlConvertToVnd(dataFees?.promotionDiscount, intl)} VNĐ`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
      content: `${intlConvertToVnd(totalFee, intl)} VNĐ`,
      isTotalFee: true
    }
  ]
  return (
    <div>
      <StepBase titleMsg={getStepComponent(activeStep).title}>
        <CardBody>
          <FormikProvider value={formik}>
            <div className='d-flex flex-column'>
              <h4 className='mb-2'>Lô hợp đồng</h4>
              <span className='mb-2'>Mã số hợp đồng : {contractGroupId}</span>
              <span className='mb-2'>Hãng bảo hiểm : {companyName}</span>
              <span className='mb-2'>Thông tin bảo hiểm</span>
            </div>
            <div className='mb-2'>
              <TableInfoData data={step1Data} intl={intl} />
            </div>
            <Row className='mb-2'>
              <Col md='6' xs='12' className='font-weight-bold'>
                <h5>
                  <FormattedMessage id={getKeyLang('deductionLimit')} />
                </h5>
              </Col>
              <Col md='6' xs='12'>
                <span className='font-weight-bold text-primary'>
                  {RANGE_DEDUCTIBLE}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <PaymentType
                  paymentType={paymentType}
                  isHideIcon={true}
                  touched={touched}
                  errors={errors}
                  keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
                  callbacks={{
                    radioChange: (e) => {
                      // disableContinueBtn && disableContinueBtn()
                      changePaymentType(e.target.value)
                      dispatch(
                        updateProps([
                          {
                            prop: KEY_PAYMENT_TYPE,
                            value: e.target.value
                          }
                        ])
                      )
                    }
                  }}
                />
              </Col>
            </Row>
            <FeeInsurance data={step1Data} feeRows={feeRows} />
            <div className='d-flex align-items-center justify-content-start'>
              <Checkbox
                color='primary'
                icon={<Check className='vx-icon' size={16} />}
                onChange={toggleAccepted}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({
                    id: getKeyLang('insurance.acceptTerms')
                  })
                }}
              />
            </div>
          </FormikProvider>
        </CardBody>
        <CardFooter>
          <FooterView
            handleSubmitClick={next}
            handlePayDebtClick={debt}
            handlePayBonusClick={bonus}
            backStep={backStep.bind(null, activeStep)}
            constantVals={{
              MAX_STEP: MAX_STEP,
              REDUX_STATE_NAME: REDUX_STATE_NAME
            }}
          />
        </CardFooter>
      </StepBase>
      {payment === 'FUND_TRANSFER' && agreePayment ? (
        <Card>
          <CardBody>
            <BankTranferInfo
              contractCode={contractGroupId}
              totalFeeInclVAT={totalFee}
              getBankTransferInfo={Service.getBankTransferInfo}
            />
          </CardBody>
        </Card>
      ) : null}
    </div>
  )
}

export default Step2
