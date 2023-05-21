import React, { useEffect, useState } from 'react'
import companyLogo from '../../../../assets/images/app-no1/intro/company-logo.svg'
import step1CoverImage from '../../../../assets/images/app-no1/intro/step1-cover-image.svg'
import step2CoverImage from '../../../../assets/images/app-no1/intro/step2-cover-image.svg'
import step3CoverImage from '../../../../assets/images/app-no1/intro/step3-cover-image.svg'

import nextStepIcon from '../../../../assets/images/app-no1/intro/next-step-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { actionActiveStep, actionNextStep, actionPrevStep } from '../../../../redux/actions/app-no1/intro/Intro'
import { AppId, FormattedMessage } from 'base-app'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

const IntroSteps = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { activeStep } = useSelector((state) => state.app.intro)
  const [activeStepClass, setActiveStepClass] = useState(null)
  const [steps, setSteps] = useState([])
  const [benefit1, setBenefit1] = useState(null)
  const [benefit2, setBenefit2] = useState(null)
  const [benefit3, setBenefit3] = useState(null)

  const handlers = useSwipeable({
    onSwipedRight: eventData => {
      if(activeStep > 1) {
        dispatch(actionPrevStep())
      }
    },
    onSwipedLeft: eventData => {
      if(activeStep < 4) {
        dispatch(actionNextStep())
      }
    }
  });

  useEffect(() => {
    switch (activeStep) {
      case 1:
        setActiveStepClass('intro-step1')
        setSteps(['step-1', 'step-2', 'step-3'])
        setBenefit1('intro.step1.benefit1')
        setBenefit2('intro.step1.benefit2')
        setBenefit3('intro.step1.benefit3')
        break
      case 2:
        setActiveStepClass('intro-step2')
        setSteps(['step-2', 'step-1', 'step-3'])
        setBenefit1('intro.step2.benefit1')
        setBenefit2('intro.step2.benefit2')
        setBenefit3('intro.step2.benefit3')
        break
      case 3:
        setActiveStepClass('intro-step3')
        setSteps(['step-2', 'step-3', 'step-1'])
        setBenefit1('intro.step3.benefit1')
        setBenefit2('intro.step3.benefit2')
        setBenefit3('intro.step3.benefit3')
        break
      case 4 :
        localStorage.setItem('isIntroDone', 'true')
        history.push('/home')
        break
      default:
        break
    }
  }, [activeStep])

  const onClickNextStep = () => {
    dispatch(actionNextStep())
  }

  const onChangeActiveStep = (activeStep) => {
    dispatch(actionActiveStep(activeStep))
  }

  return (
    <div {...handlers} className={`${activeStepClass} intro-steps`}>

      <div className='w-100 d-flex justify-content-center company-logo my-2'>
        <img src={companyLogo} alt='' />
      </div>

      <div className='w-100 cover-image overflow-hidden d-flex justify-content-center'>
        <img className={`${steps[0]}`} src={step1CoverImage} alt='' />
        <img className={`${steps[1]}`} src={step2CoverImage} alt='' />
        <img className={`${steps[2]}`} src={step3CoverImage} alt='' />
      </div>

      <div className='intro-steps-benefit'>
        <div className='intro-steps-title font-weight-bold overflow-hidden'>
          <div className={`vw-100 position-absolute ${steps[0]}`}>
            <FormattedMessage id={`${AppId.APP_NO1}.intro.step1.slogan`} />
          </div>
          <div className={`vw-100 position-absolute ${steps[1]}`}>
            <FormattedMessage id={`${AppId.APP_NO1}.intro.step2.slogan`} />
          </div>
          <div className={`vw-100 position-absolute ${steps[2]}`}>
            <FormattedMessage id={`${AppId.APP_NO1}.intro.step3.slogan`} />
          </div>

        </div>
        <ul className='intro-steps-content'>
          <li><FormattedMessage id={`${AppId.APP_NO1}.${benefit1}`} /></li>
          <li><FormattedMessage id={`${AppId.APP_NO1}.${benefit2}`} /></li>
          <li><FormattedMessage id={`${AppId.APP_NO1}.${benefit3}`} /></li>
        </ul>
      </div>

      <div className='intro-steps-footer d-flex justify-content-between align-items-baseline'>
        <div className='d-flex intro-steps-footer-steps'>
          <div className={activeStep === 1 ? 'active-step-icon' : 'inactive-step-icon'} onClick={() => onChangeActiveStep(1)}></div>
          <div className={activeStep === 2 ? 'active-step-icon' : 'inactive-step-icon'} onClick={() => onChangeActiveStep(2)}></div>
          <div className={activeStep === 3 ? 'active-step-icon' : 'inactive-step-icon'} onClick={() => onChangeActiveStep(3)}></div>
        </div>
        <div className='intro-steps-footer-steps-next-step' onClick={onClickNextStep}>
          <img src={nextStepIcon} alt='' />
        </div>
      </div>
    </div>
  )
}

export default IntroSteps
