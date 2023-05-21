import { BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import {
  nullStrRegex,
  PAYMENT_TYPE_FUND_TRANSFER,
  PAYMENT_TYPE_QR_CODE
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import BankTransferInfo from '../../../../../../components/insurance-app/common-forms/bank-tranfer'
import QrCode from '../../../../../../components/insurance-app/common-forms/bank-tranfer/QrCode'
import { render } from '../../../../../../components/insurance-app/common-forms/bank-tranfer/utility'
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import {
  getKeyLang,
  NAME_APP_CONFIG
} from '../../../../../../configs/insurance-app'
import {
  payContractSimplify,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { KEY_DEBT_ACCOUNT_INFO } from '../../../../../../redux/reducers/insurance-app/appConfig'
import {
  KEY_ACTIVE_STEP,
  KEY_AGREED_TERM_OF_SERVICES_STATUS,
  KEY_COMPANY_ID,
  KEY_CONTRACT_ID,
  KEY_CONTRACT_INFO,
  KEY_DATA_FEES,
  KEY_PAYMENT_TYPE,
  KEY_STEP_1,
  KEY_SUGG_AUTOMAKER,
  KEY_SUGG_VEHICLE,
  KEY_TOTAL_FEE
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import {
  BASE,
  KEY_STEP_2,
  KEY_VEHICLE_ID,
  SIMPLIFY_MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { KEY_CONTRACT_CODE } from '../../../../../../redux/reducers/insurance-app/utility'
import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import {
  fillMultipleStepInfo,
  handleBonus,
  handleDebt,
  hasRequestFail,
  isObjEmpty
} from '../../../../../../ultity'
import { getDefault_updateOwnerContactObj } from '../../../car/components/step3/utility'
import { KEY_COUPON_CODE } from '../../../motor-simplify/components/step2/formikConfig'
import FooterView from '../../views/FooterView'
import { KEY_PHONE_NUMBER } from '../step1/formikConfig'
import { REDUX_STATE_NAME } from '../stepsManager'
import FeesForm from './FeesForm'
import FormContract from './FormContract'
import {
  initialValues,
  KEY_EMAIL,
  KEY_MAX_NUM_IN_CAR,
  KEY_NUM_IN_CAR,
  validate,
  validationSchema
} from './formikConfig'
import {
  getContract,
  getDefault_bonusInfoObj,
  getDefault_debtInfoObj,
  getDefault_payInfoObj,
  updateCustomer
} from './utility'

const Step = () => {
  const dispatch = useDispatch()
  const {
    [KEY_TOTAL_FEE]: totalFee,
    [KEY_COMPANY_ID]: companyId,
    [KEY_CONTRACT_INFO]: contractInfo,
    [KEY_CONTRACT_ID]: contractId,
    [KEY_ACTIVE_STEP]: activeStep,
    [KEY_PAYMENT_TYPE]: paymentType,
    [KEY_STEP_2]: step_2,
    [KEY_AGREED_TERM_OF_SERVICES_STATUS]: agreedTermOfServicesStatus,
    [KEY_STEP_1]: step_1,
    [KEY_VEHICLE_ID]: vehicleId,
    [KEY_DATA_FEES]: dataFees,
    [KEY_CONTRACT_CODE]: contractCode,
    [KEY_SUGG_VEHICLE]: sugg_Vehicle,
    [KEY_SUGG_AUTOMAKER]: sugg_Automaker
  } = useSelector((state) => state.app[REDUX_STATE_NAME])
  const { [KEY_DEBT_ACCOUNT_INFO]: debtAccountInfo } = useSelector(
    (state) => state.app[NAME_APP_CONFIG]
  )
  const [isValidateOnChange, setValidateOnChange] = useState(true)
  const enableValidateOnChange = () => {
    setValidateOnChange(true)
  }
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: isValidateOnChange,
    validateOnBlur: isValidateOnChange,
    validate: validate,
    validationSchema: validationSchema,
    onSubmit: () => {}
  })
  const toggleValidateChange = (status) => {
    formik.setErrors({})
    setValidateOnChange(status)
  }
  async function _pay() {
    const email = formik.values[KEY_EMAIL]
    const phoneNumber = formik.values[KEY_PHONE_NUMBER]
    if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
        return false
    }
    else if (formik.errors.ownerEmail || formik.errors.ownerPhone) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
        return false
    }else {
      dispatch(
        updateCustomer(
          getDefault_updateOwnerContactObj(contractInfo.owner.id, formik.values),
          formik.values,
          step_1
        )
      )
      dispatch(
        payContractSimplify(
          contractId,
          getDefault_payInfoObj(paymentType, formik.values),
          SIMPLIFY_MAX_STEP
        )
      )
    }   
  }

  async function _debt() {
    dispatch(
      updateCustomer(
        getDefault_updateOwnerContactObj(contractInfo.owner.id, formik.values),
        formik.values,
        step_1
      )
    )
    handleDebt(
      totalFee,
      debtAccountInfo,
      () => {
        dispatch(payContractSimplify(contractId, getDefault_debtInfoObj()))
      },
      () => {
        BaseAppUltils.toastError(
          <FormattedMessage id={getKeyLang(`alert.reachLimitDebt`)} />
        )
      }
    )
  }

  async function _bonus() {
    const email = formik.values[KEY_EMAIL]
    const phoneNumber = formik.values[KEY_PHONE_NUMBER]
    if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
        return false
    }
    else if (formik.errors.ownerEmail || formik.errors.ownerPhone) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
        return false
    }else {
      dispatch(
      updateCustomer(
        getDefault_updateOwnerContactObj(contractInfo.owner.id, formik.values),
        formik.values,
        step_1
      )
    )
    handleBonus(
      totalFee,
      () => {
        dispatch(
          payContractSimplify(
            contractId,
            getDefault_bonusInfoObj(),
            SIMPLIFY_MAX_STEP
          )
        )
      },
      () => {
        BaseAppUltils.toastError(
          <FormattedMessage id={getKeyLang(`alert.dontHaveEnoughBonusPoint`)} />
        )
      }
    ).then()
    }
   
  }

  const beforePayClickInvoke = () => {
    enableValidateOnChange()
    formik.handleSubmit() /* this will invoke validateOnChange */

    const email = formik.values[KEY_EMAIL]
    const phoneNumber = formik.values[KEY_PHONE_NUMBER]
    /** return false, everything will work normaly as expect */
    if (
      (email && !email.match(nullStrRegex)) ||
      (phoneNumber && !phoneNumber.match(nullStrRegex))
    )
      return false

    BaseAppUltils.toastError(
      <FormattedMessage id={getKeyLang('error.required.emailOrPhoneNumber')} />
    )
    /** return true if you want to cancel submit action  */
    return true
  }

  const toggleAgreeCallback = () => {
    const email = formik.values[KEY_EMAIL]
    const phoneNumber = formik.values[KEY_PHONE_NUMBER]
    if (email && email.match(nullStrRegex) || phoneNumber && phoneNumber.match(nullStrRegex)) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.required.emailOrPhoneNumber")} />)
        return false
    }
    else if (formik.errors.ownerEmail || formik.errors.ownerPhone) {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang("error.invalid.emailOrPhoneNumber")} />)
        return false
    }
    if (agreedTermOfServicesStatus) {
      dispatch(
        updateProps([
          {
            prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
            value: false
          }
        ])
      )
      return
    }
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_AGREED_TERM_OF_SERVICES_STATUS,
          value: true
        }
      ])
    )
  }

  /** It's really important to have this useEffect above the other one, so please don't change its position! */
  React.useEffect(() => {
    dispatch(getContract(contractId))
    if (isObjEmpty(step_1)) return
    fillMultipleStepInfo(step_1, initialValues, formik.setValues)
    formik.setFieldValue(KEY_NUM_IN_CAR , step_1.seats)
    formik.setFieldValue(KEY_MAX_NUM_IN_CAR , step_1.seats)
    if (isObjEmpty(step_2)) return
    fillMultipleStepInfo(step_2, initialValues, formik.setValues)
  }, [])

  return (
    <FormikProvider value={formik}>
      <StepBase>
        <CardBody>
          <FormContract
            enableValidateOnChange={enableValidateOnChange}
            stepInfo={{ step_1, step_2 }}
            companyId={companyId}
            contractId={contractId}
            vehicleId={vehicleId}
            contractInfo={contractInfo}
            paymentType={paymentType}
            datafees={dataFees}
            contractCode={contractCode}
            sugg_Vehicle={sugg_Vehicle}
            sugg_Automaker={sugg_Automaker}
            formik={formik}
            toggleValidateChange={toggleValidateChange}
          />
        </CardBody>
      </StepBase>

      <StepBase>
        <CardBody>
          <PaymentType
            paymentType={paymentType}
            isHideIcon={true}
            keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
            callbacks={{
              radioChange: async (e) => {
                const val = e.target.value
                dispatch(
                  updateProps([
                    {
                      prop: BASE.KEY_PAYMENT_TYPE,
                      value: val
                    }
                  ])
                )
                const res = await Service.getContractInfo(contractId)
                if (hasRequestFail(res.status)) return

                dispatch(
                  updateProps([
                    {
                      prop: BASE.KEY_CONTRACT_INFO,
                      value: res.data
                    }
                  ])
                )
              }
            }}
          />
        </CardBody>
      </StepBase>

      <StepBase>
        <CardBody>
          <FeesForm
            paymentType={paymentType}
            dispatch={dispatch}
            contractInfo={contractInfo}
            companyId={companyId}
            toggleAgree={{
              agreedTermOfServicesStatus,
              toggleAgreeCallback
            }}
          />
        </CardBody>
      </StepBase>

      {render(
        agreedTermOfServicesStatus,
        paymentType,
        PAYMENT_TYPE_FUND_TRANSFER,
        <BankTransferInfo
          contractCode={contractInfo.contractCode}
          totalFeeInclVAT={contractInfo['discountValue'] !== null ?  Number(totalFee - contractInfo['discountValue']) : totalFee}
          getBankTransferInfo={Service.gettAllBanks}
        />
      )}
      {render(
        agreedTermOfServicesStatus,
        paymentType,
        PAYMENT_TYPE_QR_CODE,
        <QrCode
          contractCode={contractInfo.contractCode}
          totalFeeInclVAT={totalFee}
        />
      )}

      <StepBase>
        <CardFooter>
          <FooterView
            // beforeSubmitClicked={beforePayClickInvoke}
            enableValidateOnChange={enableValidateOnChange}
            handleSubmitClick={_pay}
            handlePayDebtClick={_debt}
            handlePayBonusClick={_bonus}
            constantVals={{
              MAX_STEP: SIMPLIFY_MAX_STEP,
              REDUX_STATE_NAME: REDUX_STATE_NAME
            }}
            backStep={() => {
              return (dispatch) => {
                dispatch(
                  updateProps([
                    {
                      prop: KEY_STEP_2,
                      value: formik.values
                    },
                    {
                      prop: BASE.KEY_ACTIVE_STEP,
                      value: 1
                    }
                  ])
                )
              }
            }}
          />
        </CardFooter>
      </StepBase>
    </FormikProvider>
  )
}

export default Step
