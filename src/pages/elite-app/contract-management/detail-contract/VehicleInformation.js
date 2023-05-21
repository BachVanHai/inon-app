import React from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { getKeyLang } from '../../../../configs/elite-app'

const VehicleInformation = ({ contract }) => {

  const vehicle = contract.vehicles.length ? contract.vehicles[0] : null

  const getContractType = (contract) => {
    switch (contract.contractType) {
      case 'CC':
        return <FormattedMessage id={getKeyLang("home.carInsurance")} />
      case 'MC':
        return <FormattedMessage id={getKeyLang('insurance.title.motor')} />
      case 'VTA':
        return <FormattedMessage id={getKeyLang('insurance.vta')} />
      case 'HC':
        return <FormattedMessage id={getKeyLang('insurance.title.homesafety')} />
      case 'PHC':
        return <FormattedMessage id={getKeyLang("insurance.title.homeprivate")} />
      default:
        return <FormattedMessage id={getKeyLang("home.carInsurance")} />
    }
  }

  const renderVehicalInfo = [
    { col1: 'contractManagement.vehicleType', col2: vehicle ? vehicle.vehicleType.name : null },
    { col1: 'contractManagement.numberPlate', col2: vehicle ? vehicle.numberPlate : null },
    { col1: 'contractManagement.frameNumber', col2: vehicle ? vehicle.frameNo : null },
    { col1: 'contractManagement.machineNumber', col2: vehicle ? vehicle.machineNo : null },
    { col1: 'contractManagement.contractType', col2: getContractType(contract) ? getContractType(contract) : null }
]

  return (
    renderVehicalInfo.map(item => (
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang(item.col1)} />
        </div>
        <div className='col-md-6 col-12 dark-green'>{item.col2}</div>
      </div>
    ))
  )
}

export default VehicleInformation
