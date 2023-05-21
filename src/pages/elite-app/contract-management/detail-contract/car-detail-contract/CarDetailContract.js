import React, { useState } from 'react'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import moment from 'moment'
import { Utils } from '../../../../../ultity'
import VehicleInformation from '../VehicleInformation'
import CarSurchargesPromotions from './CarSurchargesPromotions'
import { BaseAppUltils } from 'base-app'
import CarProfilePhoto from './CarProfilePhoto'
import ContractInformation from '../ContractInformation'

const CarDetailContract = ({ contract }) => {
  const CAR_TNDS = 'CAR_TNDS'
  const CAR_VATCHAT = 'CAR_VATCHAT'
  const CAR_CONNGUOI = 'CAR_CONNGUOI'
  const CAR_HANGHOA = 'CAR_HANGHOA'

  const [nestedModal, setNestedModal] = useState(false)

  const toggleNested = () => {
    setNestedModal(!nestedModal)
  }

  const CAR_TNDS_BB_AND_TN_INSURANCE_TYPES = [
    { type: 'CAR_TNDS', keyLang: 'contractManagement.carTNDSMandatoryInsuranceFees' },
    { type: 'CAR_TNDS_TN', keyLang: 'contractManagement.carTNDSFreeInsuranceFees' }
  ]

  const carInsuranceFees = (contract, type) => {
    let carInsurance = contract.insurances.find((item) => item.insuranceCode === type)
    if (carInsurance && carInsurance.isEnable) {
      return carInsurance.fee
    } else return 0
  }

  const carEffectDate = (contract, type) => {
    let carInsurance = contract.insurances.find((item) => item.insuranceCode === type)
    if (carInsurance.isEnable) {
      let startDate = null
      let endDate = null
      if (carInsurance) {
        if (carInsurance.startValueDate) {
          startDate = carInsurance.startValueDate.substring(0, 10) + " " + carInsurance.startValueDate.substring(11, 16)
        }
        if (carInsurance.endValueDate) {
          endDate = carInsurance.endValueDate.substring(0, 10) + " " + carInsurance.endValueDate.substring(11, 16)
        }
      }
      return { startDate, endDate }
    } else return null
  }

  const additionalTerm = (contract) => {
    let insuranceAddons = contract.insuranceAddons.filter((item) => item.isEnable)
    if (insuranceAddons.length > 0) {
      return insuranceAddons
    } else return null
  }

  const showProfilePhoto = (contract) => {
    let carInsuranceMaterial = contract.insurances.filter(item => item.insuranceCode === CAR_VATCHAT)
    if (carInsuranceMaterial.length > 0 && carInsuranceMaterial[0].isEnable) {
      setNestedModal(true)
    } else {
      return BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang('contractManagement.doNotUploadProfiles')} />)
    }
  }

  return (
    <>
      {
        contract ? (
          <div className='bg-white car-detail-contract mx-2'>
            <ContractInformation contract={contract} />
            <div className='car-detail-contract-content'>
              <VehicleInformation contract={contract} />
              {CAR_TNDS_BB_AND_TN_INSURANCE_TYPES.map(item => {
                  if (carInsuranceFees(contract, item.type)) {
                    return <div className='row align-items-center py-2'>
                      <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
                        <FormattedMessage id={getKeyLang(item.keyLang)} />
                      </div>
                      <div
                        className='col-md-6 col-12 dark-green'>{Utils.numberFormat(carInsuranceFees(contract, item.type))}</div>
                    </div>
                  }
                }
              )}

              {carEffectDate(contract, CAR_TNDS_BB_AND_TN_INSURANCE_TYPES[0].type) ? (
                <>
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.effectFrom')} /></div>
                    <div className='col-md-6 col-12 dark-green'>{carEffectDate(contract, CAR_TNDS).startDate}</div>
                  </div>
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.effectTo')} /></div>
                    <div className='col-md-6 col-12 dark-green'>{carEffectDate(contract, CAR_TNDS).endDate}</div>
                  </div>
                </>
              ) : null}

              {
                carInsuranceFees(contract, CAR_VATCHAT) ? (
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.carMaterialInsuranceFees')} /></div>
                    <div
                      className='col-md-6 col-12 dark-green'>{Utils.numberFormat(carInsuranceFees(contract, CAR_VATCHAT))}</div>
                  </div>
                ) : null
              }

              {
                additionalTerm(contract) !== null ? (
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
                      <FormattedMessage id={getKeyLang('contractManagement.additionalTerm')} />
                    </div>
                    <div className='col-md-6 col-12'>
                      {additionalTerm(contract).map((item) => {
                        return <div className='dark-green mb-1'>{item.addonCode} - {item.addonDesc}</div>
                      })
                      }
                    </div>
                  </div>
                ) : null
              }

              <div className='row align-items-center py-2'>
                <div className='col-6 font-weight-bold'>
                  <FormattedMessage id={getKeyLang('contractManagement.profilePhoto')} />
                </div>
                <div className='col-6'>
                  <div className='show-photo' onClick={() => showProfilePhoto(contract)}>
                    <FormattedMessage id={getKeyLang('contractManagement.lookPhoto')} />
                  </div>
                </div>
              </div>

              {
                carInsuranceFees(contract, CAR_CONNGUOI) ? (
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.accidentsPeopleVehicleInsuranceFees')} />
                    </div>
                    <div
                      className='col-md-6 col-12 dark-green'>{Utils.numberFormat(carInsuranceFees(contract, CAR_CONNGUOI))}</div>
                  </div>
                ) : null
              }

              {
                carInsuranceFees(contract, CAR_HANGHOA) ? (
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
                      <FormattedMessage id={getKeyLang('contractManagement.goodVehicleInsuranceFees')} /></div>
                    <div
                      className='col-md-6 col-12 dark-green'>{Utils.numberFormat(carInsuranceFees(contract, CAR_HANGHOA))}</div>
                  </div>
                ) : null
              }

              {carEffectDate(contract, CAR_CONNGUOI) ? (
                <>
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.effectFrom')} /></div>
                    <div className='col-md-6 col-12 dark-green'>{carEffectDate(contract, CAR_TNDS)?.startDate}</div>
                  </div>
                  <div className='row align-items-center py-2'>
                    <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
                      id={getKeyLang('contractManagement.effectTo')} /></div>
                    <div className='col-md-6 col-12 dark-green'>{carEffectDate(contract, CAR_TNDS)?.endDate}</div>
                  </div>
                </>
              ) : null}

              <CarSurchargesPromotions contract={contract} />

            </div>
          </div>
        ) : null
      }
      <CarProfilePhoto modal={nestedModal} toggle={toggleNested} contract={contract} />
    </>
  )
}

export default CarDetailContract
