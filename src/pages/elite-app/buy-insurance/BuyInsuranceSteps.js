import React from 'react'
import classnames from 'classnames'
import { FormattedMessage, BaseAppUltils } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'

import { useSelector } from 'react-redux'
import CarStep1 from './car/step1/CarStep1'
import CarStep2 from './car/step2/CarStep2'
import CarStep3 from './car/step3/CarStep3'
import CarStep4 from './car/step4/CarStep4'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import stepActive from '../../../assets/images/elite-app/buy-insurance/step-active-icon.png'
import stepActiveMobile from '../../../assets/images/elite-app/buy-insurance/step-active-mobile-icon.png'
import stepDone from '../../../assets/images/elite-app/buy-insurance/step-done-icon.png'
import stepDoneMobile from '../../../assets/images/elite-app/buy-insurance/step-done-mobile-icon.png'
import MotorStep1 from './motor/step1/MotorStep1'
import MotorStep2 from './motor/step2/MotorStep2'
import MotorStep3 from './motor/step3/MotorStep3'
import MotorStep4 from './motor/step4/MotorStep4'
import HomeSafetyStep1 from './home-safety/step1/HomeSafetyStep1'
import HomeSafetyStep2 from './home-safety/step2/HomeSafetyStep2'
import HomeSafetyStep3 from './home-safety/step3/HomeSafetyStep3'
import HomeSafetyStep4 from './home-safety/step4/HomeSafetyStep4'
import HomePrivateStep1 from './home-private/step1/HomePrivateStep1'
import HomePrivateStep2 from './home-private/step2/HomePrivateStep2'
import HomePrivateStep3 from './home-private/step3/HomePrivateStep3'
import HomePrivateStep4 from './home-private/step4/HomePrivateStep4'
import VtaStep1 from './vta/step1/VtaStep1'
import VtaStep2 from './vta/step2/VtaStep2'
import VtaStep3 from './vta/step3/VtaStep3'
import VtaStep4 from './vta/step4/VtaStep4'
import BestchoiseStep1 from './health-care/step1'
import BestchoiseStep2 from './health-care/step2'
import BestchoiseStep3 from './health-care/step3'
import BestchoiseStep4 from './health-care/step4'


const BuyInsuranceStep = () => {
  const { activeStep, steps, type } = useSelector(
    (state) => state.app.buyInsurance
  )

  const CONTENT_STEP_COMPONENTS = {
    CarStep1,
    CarStep2,
    CarStep3,
    CarStep4,
    MotorStep1,
    MotorStep2,
    MotorStep3,
    MotorStep4,
    HomeSafetyStep1,
    HomeSafetyStep2,
    HomeSafetyStep3,
    HomeSafetyStep4,
    HomePrivateStep1,
    HomePrivateStep2,
    HomePrivateStep3,
    HomePrivateStep4,
    VtaStep1,
    VtaStep2,
    VtaStep3,
    VtaStep4,
    BestchoiseStep1,
    BestchoiseStep2,
    BestchoiseStep3,
    BestchoiseStep4
  }

  return (
    <>
      <div className='steps-mobile d-flex flex-column d-md-none'>
        <div className='d-flex align-items-center justify-content-center'>
          {Object.keys(steps).map((key, index) => (
            <div
              key={key}
              className={classnames('step', {
                active: +key === activeStep,
                done: +key < activeStep
              })}
            >
              <div className='logo-company'>
                {+key < activeStep ? <img src={stepDoneMobile} /> : null}
                {+key === activeStep ? <img src={stepActiveMobile} /> : null}
              </div>
              {index !== Object.keys(steps).length - 1 ? (
                <div className='divider' style={{ width: Object.keys(steps).length === 3 ? '28vw' : '19vw' }}></div>
              ) : null}
            </div>
          ))}
        </div>

        <div className='d-flex step-name-container w-100'>
          {Object.keys(steps).map((key, index) => (
            <div
              key={key}
              style={{ width: (100 / Object.keys(steps).length) + '%' }}
              className={classnames('step-name text-center', {
                active: +key === activeStep,
                done: +key < activeStep,
              })}
            >
              {
                Object.keys(steps).length === 4 && <FormattedMessage
                  id={getKeyLang(`insurance.stepMobile.${key}`)}
                />
              }
              {
                Object.keys(steps).length === 3 && <FormattedMessage
                  id={getKeyLang(`insurance.stepMobile.vta.${key}`)}
                />
              }
            </div>
          ))}
        </div>
      </div>

      <div className='title font-weight-bold'>
        <FormattedMessage id={getKeyLang(`insurance.title.${type}`)} />
      </div>
      <div className='buy-insurance-steps'>
        {
          <>
            <div className='steps-web d-none d-md-block'>
              {Object.keys(steps).map((key, index) => (
                <div
                  key={key}
                  className={classnames('step', {
                    active: +key === activeStep,
                    done: +key < activeStep
                  })}
                >
                  <div className='mr-1'>
                    <div className='logo-company'>
                      {+key < activeStep ? <img src={stepDone} /> : null}
                      {+key === activeStep ? <img src={stepActive} /> : null}
                    </div>
                    <div
                      className={classnames('divider', {
                        'd-none': index === Object.keys(steps).length - 1
                      })}
                    ></div>
                  </div>
                  <div className='text-uppercase'>
                    <div className='step-number'>
                      <FormattedMessage id={getKeyLang('insurance.step')} />{' '}
                      {' ' + (index + 1)}
                    </div>
                    <div className='step-name'>
                      {
                        Object.keys(steps).length === 4 &&
                        <FormattedMessage id={getKeyLang(`insurance.step.${key}`)} />
                      }
                      {
                        Object.keys(steps).length === 3 &&
                        <FormattedMessage id={getKeyLang(`insurance.step.vta.${key}`)} />
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='step-content'>
              {React.createElement(
                CONTENT_STEP_COMPONENTS[steps[activeStep].component], { key: "some-unique-id-that-doing-nothing" }
              )}
            </div>
          </>
        }
      </div>
    </>
  )
}

export default BuyInsuranceStep
