import React, {useState } from 'react'
import { Button, FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_TYPES } from '../../../../../configs/elite-app'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Minus, Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { actionCalculationInsuranceFee } from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'

const AdditionalTerms = () => {

  const params = useParams()
  const { contract , type } = useSelector(state => state.app.buyInsurance)
  const [isShowMoreTerms, setIsShowMoreTerms] = useState(false)
  const dispatch = useDispatch()


  const toggleShowMoreTerms = () => {
    setIsShowMoreTerms(prevState => !prevState)
  }

  const onChangeAdditionalTerm = (item, checked) => {
    const newContract = { ...contract }
    newContract.insuranceAddons.find(value => value.addonCode === item.addonCode).isEnable = checked
    dispatch(actionSaveContract(newContract))
    if (type !== INSURANCE_TYPES.TD) {
      dispatch(actionCalculationInsuranceFee())
    }
  }

  return (
    <div className="mt-4">
      <div className='insurance-item'>
        <div className='d-flex align-items-center'>
          <img src={logoCompany} />
          <div className='insurance-name'>
            <FormattedMessage id={getKeyLang('insurance.additionTerms')} />
          </div>
        </div>
        <div className='insurance-content mt-2'>
          {
            contract.insuranceAddons.map((item, index) => index < 5 || isShowMoreTerms ? (
              <div key={item.addonCode}
                   className='py-1 d-flex justify-content-between align-items-center'>
                <div className='text'>
                  <FormattedMessage id={getKeyLang(`insurance.additionTerms.${item.addonCode}`)} />
                </div>
                <Toggle icons={false} checked={item.isEnable}
                        onChange={e => onChangeAdditionalTerm(item, e.target.checked)} />
              </div>
            ) : null)
          }

          {
            params.type === INSURANCE_TYPES.TD ? (
              <div className='py-1 d-flex justify-content-between align-items-center '>
                <div className='text'><FormattedMessage id={getKeyLang(`insurance.additionTerms.addMoreTerms`)} /></div>
                <div>
                  {
                    isShowMoreTerms ? (
                      <Button.Ripple onClick={toggleShowMoreTerms}
                                     className='btn-icon custom-round-oval'
                                     color='primary'>
                        <Minus size={16} />
                      </Button.Ripple>
                    ) : (
                      <Button.Ripple onClick={toggleShowMoreTerms}
                                     className='btn-icon custom-round-oval'
                                     color='primary'>
                        <Plus size={16} />
                      </Button.Ripple>
                    )
                  }
                </div>
              </div>
            ) : null
          }
          <div className='pt-1 d-flex justify-content-between align-items-center'>
            <div className='text'><FormattedMessage id={getKeyLang(`insurance.additionTerms.compensation`)} /></div>
            <div className='compensation'>
              500.000đ/vụ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalTerms
