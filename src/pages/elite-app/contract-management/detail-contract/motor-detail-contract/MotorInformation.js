import React from 'react'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'

const MotorInformation = ({contract}) => {

  return (
    <>
      <tr>
        <td><FormattedMessage id={getKeyLang('contractManagement.vehicleType')} />:
        </td>
        <td>{contract.vehicles.length ? contract.vehicles[0].vehicleType.name : null}s</td>
      </tr>
      <tr>
        <td>
          <FormattedMessage id={getKeyLang('contractManagement.numberPlate')} />:
        </td>
        <td>{contract.vehicles.length ? contract.vehicles[0].numberPlate : null}</td>
      </tr>
      <tr>
        <td>
          <FormattedMessage id={getKeyLang('contractManagement.frameNumber')} />:
        </td>
        <td>{contract.vehicles.length ? contract.vehicles[0].frameNo : null}</td>
      </tr>
      <tr>
        <td>
          <FormattedMessage id={getKeyLang('contractManagement.machineNumber')} />:
        </td>
        <td>{contract.vehicles.length ? contract.vehicles[0].machineNo : null}</td>
      </tr>
    </>
  )
}

export default MotorInformation
