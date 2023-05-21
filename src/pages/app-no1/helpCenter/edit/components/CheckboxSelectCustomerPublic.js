import { Checkbox } from 'base-app'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { FormattedMessage } from 'react-intl/lib'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ALL, INDIVIDUAL, PARTNER } from '../utility'

const CheckboxSelectCustomerPublic = ({handleChecked , applyForType , errors}) => {
  let applyType = applyForType[0]
  const [emptyCheckPartNerBoxStatus, setEmptyCheckBoxPartNerStatus] = useState(false);
  const [emptyCheckIndividualBoxStatus, setEmptyCheckBoxIndividualStatus] = useState(false);
  useEffect(() => {
  }, [applyForType])
  return (
    <div>
    <div className={`${!emptyCheckPartNerBoxStatus || !emptyCheckIndividualBoxStatus ? '' :  'border-danger'} ${errors.applyFor === undefined ? '' : 'border-danger'}`} style={{paddingLeft:"10px",paddingTop : "4px" , borderRadius:"2px"}}>
      <div className='d-flex mb-2 align-items-center '>
        <Checkbox
        defaultChecked={applyType !== undefined ? applyType === PARTNER ||applyType === ALL : null }
          color='primary'
          onClick={(e) => {
            if(!e.target.checked) setEmptyCheckBoxPartNerStatus(true)
            else setEmptyCheckBoxPartNerStatus(false)
            handleChecked(e.target.checked , PARTNER)}}
          icon={<Check className='vx-icon' size={16} />}
        />
        <FormattedMessage id={getKeyLang('helpcenter.create.salesPartner')} />
      </div>
      <div className='d-flex mb-2 align-items-center'>
        <Checkbox
        defaultChecked={applyType !== undefined ? applyType === INDIVIDUAL ||applyType === ALL : null }
          onClick={(e) => {
            if(!e.target.checked) setEmptyCheckBoxIndividualStatus(true)
            else setEmptyCheckBoxIndividualStatus(false)
            handleChecked(e.target.checked , INDIVIDUAL)}}
          color='primary'
          icon={<Check className='vx-icon' size={16} />}
        />
        <FormattedMessage
          id={getKeyLang('helpcenter.create.individualCustomers')}
        />
      </div>
    </div>
  </div>
  )
}

export default CheckboxSelectCustomerPublic
