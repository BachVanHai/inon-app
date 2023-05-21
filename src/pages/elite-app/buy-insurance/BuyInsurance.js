import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import "../../../assets/scss/elite-app/layouts/components.scss"
import Navs from '../../../components/elite-app/layouts/Navs'
import { getKeyLang } from "../../../configs/elite-app"
import {
  loadStepsByInsuranceType
} from '../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import BuyInsuranceStep0 from './BuyInsuranceStep0'
import BuyInsuranceSteps from './BuyInsuranceSteps'
import { StepFooter } from './StepFooter'

export const getAccepterms = (intl) => {
  return <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: getKeyLang('insurance.acceptTerms') }) }} />
}

const BuyInsurance = () => {
  const params = useParams()
  const { activeStep } = useSelector((state) => state.app.buyInsurance)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStepsByInsuranceType(params.type))
  }, [])

  return (
    <>
      <Navs />
      <div className='buy-insurance-container bg-secondary bg-lighten-4' >
        {activeStep > 0 ? (
          <div className='mx-auto buy-insurance'>
            <BuyInsuranceSteps />
          </div>
        ) : (
          <div className='p-md-3 p-lg-3 p-1'>
            <BuyInsuranceStep0 insuranceType={params.type} />
            {!['homesafety'].includes(params.type) && <StepFooter />}
          </div>
        )}
      </div>
    </>
  )
}

export default BuyInsurance
