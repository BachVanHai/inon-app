import React from 'react'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../configs/elite-app'
import { Badge } from 'reactstrap'
import '../../../../assets/scss/elite-app/contract-management/detail-contract/contract-information.scss'

const ContractInformation = ({ contract }) => {

  const insurances = contract?.insurances?.filter(item => item.isEnable)
  let insurancesDate;
  if(contract.contractType === 'PHC') {
    insurancesDate = insurances?.map(item => (
      new Date(item.endDate))
    )
  } else {
    insurancesDate = insurances?.map(item => (
      new Date(item.endValueDate))
    )
  }

  const monthDiff = (d1, d2) => {
    let months
    months = (d2.getFullYear() - d1.getFullYear()) * 12
    months -= d1.getMonth()
    months += d2.getMonth()
    return months <= 0 ? 0 : months
  }

  const effectiveDateOfContract = () => {
    const now = new Date()
    let validCheck = true
    let effectiveTimeArr = []

    if (insurancesDate?.length > 0) {
      effectiveTimeArr = insurancesDate.map(item => {
        if (item > now) {
          return monthDiff(now, item)
        } else validCheck = false
      })
    }
    if (!validCheck) {
      return false
    } else {
      return Math.max(...effectiveTimeArr)
    }
  }

  return <div className='row align-items-center mb-2 bg-white'>
    <h3 className='contract-info col'><FormattedMessage id={getKeyLang('contractManagement.contractInfo')} /></h3>
    <div className='col text-right'>
      <div className='d-inline-block mr-2 effective font-weight-bold'>Hiệu lực</div>
      {effectiveDateOfContract() === false ? <Badge color='danger'>
        <FormattedMessage id={getKeyLang('contractManagement.expired')} />
      </Badge> : <Badge color='info'>
        {`${effectiveDateOfContract()} tháng`}
      </Badge>}
    </div>
  </div>
}

export default ContractInformation
