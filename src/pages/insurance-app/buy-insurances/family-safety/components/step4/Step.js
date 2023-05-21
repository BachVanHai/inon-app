import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import {
  setAgreedTermOfServicesStatus,
  backStep,
  assignPaymentType
} from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import Contract from './form-components/Contract'
import BankTransferInfo from './form-components/BankTransferInfo'
import {
  getContract,
  payContract
} from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { BaseAppUltils } from 'base-app'
import {
  NAME_APP_CONFIG,
  getKeyLang
} from '../../../../../../configs/insurance-app'
import {
  KEY_ACTIVE_STEP,
  KEY_AGREED_TERM_OF_SERVICES_STATUS,
  KEY_CONTRACT_ID,
  KEY_DATA_FEES,
  KEY_PAYMENT_TYPE,
  MAX_STEP,
  KEY_CONTRACT_INFO,
  KEY_TOTAL_FEE,
  KEY_COMPANY_ID
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { REDUX_STATE_NAME } from '../stepsManager'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import FooterView from '../../views/FooterView'
import {
  PAYMENT_TYPE_BONUS,
  PAYMENT_TYPE_DEBT,
  PAYMENT_TYPE_FUND_TRANSFER
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { handleBonus, handleDebt } from '../../../../../../ultity'
import { getDataFee } from './utility'
import {
  KEY_DEBT_ACCOUNT_INFO,
  KEY_IS_LOADING
} from '../../../../../../redux/reducers/insurance-app/appConfig'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'

import lgbh from '../../../../../../assets/images/insurance-app/icons/lgbh.png'
import { Col, FormGroup, Row } from 'reactstrap'
import { Check } from 'react-feather'
// import { ATM, VISA_MASTER, QR_CODE, FUND_TRANSFER, BONUS } from '../../utility'
import { setIncompletedCalFee } from '../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { ATM, FUND_TRANSFER, VISA_MASTER } from '../step3/utility'
import {FormattedMessage , Radio} from 'base-app'
const Step4 = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const {
    [KEY_ACTIVE_STEP]: activeStep,
    [KEY_TOTAL_FEE]: totalFee,
    [KEY_COMPANY_ID]: companyId,
    [KEY_CONTRACT_ID]: contractId,
    [KEY_DATA_FEES]: dataFees,
    [KEY_PAYMENT_TYPE]: paymentType,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
    [KEY_CONTRACT_INFO]: contractInfo
  } = useSelector((state) => state.app[REDUX_STATE_NAME])
  const {
    [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo,
    [KEY_IS_LOADING]: isLoading
  } = useSelector((state) => state.app[NAME_APP_CONFIG])
  const {hasCalFeeDone} = contractInfo
  const toggleAgreeTermOfService = () => {
    if (agreedTermOfServicesStatus) {
      dispatch(setAgreedTermOfServicesStatus(false))
      return
    }
    dispatch(setAgreedTermOfServicesStatus(true))
  }

  const debt = () => {
    if (isLoading || !totalFee || !agreedTermOfServicesStatus) return

    handleDebt(
      totalFee,
      debtAccountInfo,
      () => {
        dispatch(payContract(contractId, PAYMENT_TYPE_DEBT))
      },
      () =>
        BaseAppUltils.toastError(
          intl.formatMessage({ id: getKeyLang(`alert.reachLimitDebt`) })
        )
    )
  }
  const handleRadioPaymentTypeClick = (paymentType) => {
    dispatch(assignPaymentType(paymentType))
  }
  const bonus = () => {
    if (isLoading || !totalFee || !agreedTermOfServicesStatus) return

    handleBonus(
      totalFee,
      () => {
        dispatch(payContract(contractId, PAYMENT_TYPE_BONUS))
      },
      () =>
        BaseAppUltils.toastError(
          intl.formatMessage({
            id: getKeyLang(`alert.dontHaveEnoughBonusPoint`)
          })
        )
    ).then()
  }

  const pay = () => {
    if (!agreedTermOfServicesStatus) {
      BaseAppUltils.toastError(
        intl.formatMessage({ id: getKeyLang(`alert.termOfServices`) })
      )
      return
    }
    dispatch(payContract(contractId, paymentType))
  }

  const decidePaymentTypeCheck = (typeCheck) => {
    if (paymentType === typeCheck) {
        return true
    }
    return false
}
const reverseCalFeeStatus = () => {
    if (hasCalFeeDone) {
        dispatch(setIncompletedCalFee())
    }
}

  useEffect(() => {
    if (isLoading) return
    dispatch(getContract(contractId))
  }, [])

  return (
    <div>
      <StepBase>
        <CardBody>
          <div className='d-flex align-items-center cursor-pointer mt-1'>
            <img className='rounded-circle mr-50' src={lgbh} alt='ic' />
            <span className='align-middle font-medium-1 colorPrimary uppercase'>
              <b>
                <FormattedMessage id={getKeyLang(`PaymentMethod`)} /> *
              </b>
            </span>
          </div>
          <Row className='mt-2'>
            <Col xs={12} md={6}>
              <FormGroup>
                <Radio
                  name='checkOnly'
                  color='success successPayment'
                  icon={<Check className='vx-icon' size={16} />}
                  label={
                    <FormattedMessage id={getKeyLang(`MethodBankTransfer`)} />
                  }
                  value={FUND_TRANSFER}
                  defaultChecked={decidePaymentTypeCheck(FUND_TRANSFER)}
                  onChange={() => {
                    reverseCalFeeStatus()
                    handleRadioPaymentTypeClick(FUND_TRANSFER)
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Radio
                  name='checkOnly'
                  color='success successPayment'
                  icon={<Check className='vx-icon' size={16} />}
                  label={<FormattedMessage id={getKeyLang(`MethodVisa`)} />}
                  value={VISA_MASTER}
                  defaultChecked={decidePaymentTypeCheck(VISA_MASTER)}
                  onChange={() => {
                    reverseCalFeeStatus()
                    handleRadioPaymentTypeClick(VISA_MASTER)
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Radio
                  name='checkOnly'
                  color='success successPayment'
                  icon={<Check className='vx-icon' size={16} />}
                  label={<FormattedMessage id={getKeyLang(`MethodATMN`)} />}
                  defaultChecked={decidePaymentTypeCheck(ATM)}
                  onChange={() => {
                    reverseCalFeeStatus()
                    handleRadioPaymentTypeClick(ATM)
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </StepBase>
      <StepBase>
        <CardBody>
          <Contract
            stepInfo={{ paymentType, ...contractInfo }}
            toggleAgreeTermOfService={toggleAgreeTermOfService}
            agreedTermOfServicesStatus={agreedTermOfServicesStatus}
            dataFee={getDataFee(dataFees, paymentType, companyId)}
            handleRadioPaymentTypeClick={handleRadioPaymentTypeClick}
          />
        </CardBody>
      </StepBase>
      {render(
        agreedTermOfServicesStatus,
        paymentType,
        PAYMENT_TYPE_FUND_TRANSFER,
        <BankTransferInfo stepInfo={contractInfo} />
      )}
      <StepBase>
        <CardFooter>
          <FooterView
            handleSubmitClick={pay}
            handlePayDebtClick={debt}
            handlePayBonusClick={bonus}
            constantVals={{
              MAX_STEP: MAX_STEP,
              REDUX_STATE_NAME: REDUX_STATE_NAME
            }}
            backStep={backStep.bind(null, activeStep)}
          />
        </CardFooter>
      </StepBase>
    </div>
  )
}

export default Step4
