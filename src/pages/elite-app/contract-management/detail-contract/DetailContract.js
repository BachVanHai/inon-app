import React from 'react'
import MotorDetailContract from './motor-detail-contract/MotorDetailContract'
import CarDetailContract from './car-detail-contract/CarDetailContract'
import PersonalDetailContract from './personal-detail-contract/PersonalDetailContract'

const DetailContract = ({contract, modal, toggle}) => {

  if(contract.contractType === 'CC') {
    return <CarDetailContract contract={contract} modal={modal} toggle={toggle}/>
  }else if(contract.contractType === 'MC') {
    return <MotorDetailContract contract={contract} modal={modal} toggle={toggle} />
  } else if(contract.contractType === 'VTA' || contract.contractType === 'HC') {
      return <PersonalDetailContract contract={contract} />
  } else if(contract.contractType === 'PHC') {
    return <PersonalDetailContract contract={contract} />
  }
}

export default DetailContract