import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_SETTING_DEFAULTS, INSURANCE_TYPES } from '../../../../../configs/elite-app'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { RcHandle } from '../../../../../components/elite-app/HandleComponent'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import logoCompany from '../../../../../assets/images/elite-app/buy-insurance/logo-company-icon.svg'

export const InsuranceTNDSTN = ({ onChangeEnableInsurance }) => {

  const INSURANCE_CODE = INSURANCE_SETTING_DEFAULTS.CAR_TNDS_TN.key
  const intl = useIntl()
  const { contract, type, vehicle } = useSelector(state => state.app.buyInsurance)
  const insurance = contract.insurances.find(item => item.insuranceCode === INSURANCE_CODE)
  const [liability3Min, setLiability3Min] = useState(10)
  const [liability3Max, setLiability3Max] = useState(200)
  const [liability3Disable, setLiability3Disable] = useState(false)
  const insuranceIndex = contract.insurances.findIndex(item => item.insuranceCode === INSURANCE_CODE)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const inonTypesExcludesive = ['VAN', 'TB<10', 'TAI>10', 'TB>10', 'R', 'DK', 'RSS', 'PICKUP', 'XKKD']
  //   const busCarExcludesive = 'XB'
  //   if (vehicle.usage === 'KKD') {
  //     if (vehicle.vehicleType.code === busCarExcludesive) { // bus car is an exception
  //       setLiability3Min(0)
  //       setLiability3Max(200)
  //       setLiability3Disable(false)
  //       insurance.liability3 = 0
  //       contract.insurances[insuranceIndex] = insurance
  //       dispatch(actionSaveContract(contract))
  //       return
  //     }
  //     setLiability3Min(10)
  //     setLiability3Max(200)
  //     setLiability3Disable(true)
  //     insurance.liability3 = 0
  //     contract.insurances[insuranceIndex] = insurance
  //     dispatch(actionSaveContract(contract))
  //   } else if (inonTypesExcludesive.find(vehicle.vehicleType.code)) {
  //     setLiability3Min(0)
  //     setLiability3Max(200)
  //     setLiability3Disable(true)
  //     insurance.liability3 = 0
  //     contract.insurances[insuranceIndex] = insurance
  //     dispatch(actionSaveContract(contract))
  //   }
  // }, [])

  const onChangeEnabled = (e) => {
    onChangeEnableInsurance(INSURANCE_CODE, e.target.checked)
  }

  const onChangeInsuranceLiability = (index, value) => {
    const newContract = { ...contract }
    newContract.insurances[insuranceIndex]['liability' + index] = value * 1000000
    dispatch(actionSaveContract(newContract))
  }

  return (
    <div className='insurance-item'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <img src={logoCompany} />
          <div className='insurance-name'>
            <FormattedMessage id={getKeyLang(`insurance.${INSURANCE_CODE}`)} />
          </div>
        </div>
        <Toggle icons={false}
                disabled={!contract.insurances.find(item => item.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_TNDS.key)?.isEnable}
                checked={insurance?.isEnable}
                onChange={onChangeEnabled} />
      </div>
      {
        insurance?.isEnable ? (
          <div className='insurance-content mt-2'>
            <div className='py-1'>
              <div dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: getKeyLang(`insurance.${INSURANCE_CODE}.additional`) })
              }} />
            </div>
            <div className='py-1'>
              <div className='d-flex justify-content-between' dangerouslySetInnerHTML={{
                __html: intl.formatMessage(
                  { id: getKeyLang(`insurance.${INSURANCE_CODE}.person`) },
                  { value: insurance.liability1 / 1000000 })
              }} />
              {
                type === INSURANCE_TYPES.TD ? (
                  <div>
                    <Slider
                      min={10}
                      max={200}
                      step={10}
                      marks={{ 10: 10, 200: 200 }}
                      value={insurance.liability1 / 1000000}
                      handle={RcHandle}
                      onChange={(value) => onChangeInsuranceLiability(1, value)}
                    />
                  </div>
                ) : null
              }
            </div>
            <div className='py-1'>
              <div className='d-flex justify-content-between' dangerouslySetInnerHTML={{
                __html: intl.formatMessage(
                  { id: getKeyLang(`insurance.${INSURANCE_CODE}.asset`) },
                  { value: insurance.liability2 / 1000000 })
              }} />
              {
                type === INSURANCE_TYPES.TD ? (
                  <div>
                    <Slider
                      min={10}
                      max={400}
                      step={10}
                      marks={{ 10: 10, 400: 400 }}
                      value={insurance.liability2 / 1000000}
                      handle={RcHandle}
                      onChange={(value) => onChangeInsuranceLiability(2, value)}
                    />
                  </div>
                ) : null
              }
            </div>

            <div className='py-1'>
              <div className='mb-1 d-flex justify-content-between' dangerouslySetInnerHTML={{
                __html: intl.formatMessage(
                  { id: getKeyLang(`insurance.${INSURANCE_CODE}.passenger`) },
                  { value: insurance.liability3 / 1000000 })
              }} />
              {
                type === INSURANCE_TYPES.TD ? (
                  <div>
                    <Slider
                      min={liability3Min}
                      max={liability3Max}
                      disabled={liability3Disable}
                      step={10}
                      marks={liability3Min === 0 ? { 0: 0, 200: 200 } : { 10: 10, 200: 200 }}
                      value={insurance.liability3 / 1000000}
                      handle={RcHandle}
                      onChange={(value) => onChangeInsuranceLiability(3, value)}
                    />
                  </div>
                ) : null
              }
            </div>

            {/*{*/}
            {/*  type !== INSURANCE_TYPES.TD ? (*/}
            {/*    <div className='pt-1'>*/}
            {/*      <div className='text' dangerouslySetInnerHTML={{*/}
            {/*        __html: intl.formatMessage(*/}
            {/*          { id: getKeyLang(`insurance.${INSURANCE_CODE}.limited`) })*/}
            {/*      }} />*/}
            {/*    </div>*/}
            {/*  ) : null*/}
            {/*}*/}
          </div>
        ) : null
      }
    </div>
  )
}
