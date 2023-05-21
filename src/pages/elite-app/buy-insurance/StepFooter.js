import React from 'react'
import { Button, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'
import { useDispatch, useSelector } from 'react-redux'
import { actionNextStep, actionPrevStep , actionResetStepData } from '../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { useHistory } from 'react-router-dom'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'

export const StepFooter = ({
  onClickNext,
  onClickDone,
  onClickBuyNew,
  errors = {},
  disabled
}) => {
  const { activeStep, paymentStatus, type , steps , paymentMethod} = useSelector(
    (state) => state.app.buyInsurance
  )
  const { authToken } = useSelector((state) => state.auth?.guest)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClickNext = () => {
    if (onClickNext) {
      onClickNext()
    }
     else {
      dispatch(actionNextStep())
    }
  }

  const onClickBackHome = () => {
    dispatch(actionResetStepData())
    history.push('/home')
  }

  const onClickRepayment = () => {
    dispatch(actionPrevStep())
  }
  return (
    <>
      <p className='text-danger font-weight-bold'>
        {Object.keys(errors).length ? (
          <FormattedMessage id={getKeyLang('insurance.missingFieldRequired')} />
        ) : (
          ''
        )}
      </p>
      <div className='step-footer'>
        {paymentStatus === 'SUCCESS' && !authToken ? (
          <div className='text-danger text-center font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('insurance.missingLoginRegister')}
            />
          </div>
        ) : null}
        <div
          className={
            'd-flex mt-2 ' +
            (activeStep === 0 && type !== 'homesafety'
              ? 'justify-content-end'
              : 'justify-content-center')
          }
        >
          {activeStep > 0 && activeStep < Object.keys(steps).length ? (
            <Button
              type='button'
              className='ml-2'
              onClick={() => dispatch(actionPrevStep())}
            >
              <FormattedMessage id={getKeyLang('insurance.step.back')} />
            </Button>
          ) : activeStep === Object.keys(steps).length ? (
            <>
              {paymentStatus === 'SUCCESS' ? (
                <Button type='button' className='ml-2' onClick={onClickBuyNew}>
                  <FormattedMessage id={getKeyLang('insurance.step.buyNew')} />
                </Button>
              ) : (
                <Button
                  type='button'
                  className='ml-2'
                  onClick={() => onClickBackHome()}
                >
                  <FormattedMessage
                    id={getKeyLang('insurance.step.backHome')}
                  />
                </Button>
              )}
            </>
          ) : null}
          {activeStep < Object.keys(steps).length ? (
            <Button
              color='primary'
              disabled={disabled}
              className='ml-2'
              onClick={handleClickNext}
            >
             <FormattedMessage
                id={getKeyLang(
                  `insurance.step.${activeStep === 3 && paymentMethod !== PAYMENT_TYPE_FUND_TRANSFER ? 'payment' : activeStep === 3 && paymentMethod === PAYMENT_TYPE_FUND_TRANSFER ? '4' : 'continue'}`
                )}
              />
            </Button>
          ) : (
            <>
              {paymentStatus === 'SUCCESS' ? (
                <Button className='ml-2' color='primary' onClick={onClickDone}>
                  {activeStep === Object.keys(steps).length && authToken ? (
                    <FormattedMessage id={getKeyLang('insurance.step.done')} />
                  ) : (
                    <FormattedMessage id={getKeyLang('insurance.step.login')} />
                  )}
                </Button>
              ) : (
                <Button
                  className='ml-2'
                  color='primary'
                  onClick={() => onClickRepayment()}
                >
                  <FormattedMessage
                    id={getKeyLang('insurance.step.repayment')}
                  />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
