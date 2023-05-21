import { Checkbox } from 'base-app'
import React, { useState } from 'react'
import { Check } from 'react-feather'
import { FormattedMessage } from 'react-intl/lib'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ALL, INDIVIDUAL, PARTNER } from '../utility'
const CheckboxSelectCustomerPublic = ({handleChecked , getFieldMeta , applyForType}) => {
  const [emptyCheckPartNerBoxStatus, setEmptyCheckBoxPartNerStatus] = useState(true);
  const [emptyCheckIndividualBoxStatus, setEmptyCheckBoxIndividualStatus] = useState(true);
  return (
    <div>
      <div className={`${!emptyCheckPartNerBoxStatus || !emptyCheckIndividualBoxStatus ? '' :  'border-danger'}`} style={{paddingLeft:"10px",paddingTop : "4px" , borderRadius:"2px"}}>
        <div className='d-flex mb-2 align-items-center'>
              <Checkbox
              defaultChecked={applyForType[0] === ALL ||applyForType[0] === PARTNER }
                color='primary'
                onClick={(e) => {
                  if(!e.target.checked) setEmptyCheckBoxPartNerStatus(true)
                  else setEmptyCheckBoxPartNerStatus(false)
                  handleChecked(PARTNER)}}
                icon={<Check className='vx-icon' size={16} />}
              />
          <FormattedMessage id={getKeyLang('helpcenter.create.salesPartner')} />
        </div>
        <div className='d-flex mb-2 align-items-center'>
              <Checkbox
                defaultChecked={applyForType[0] === ALL ||applyForType[0] === INDIVIDUAL}
                  onClick={(e) => {
                    if(!e.target.checked) setEmptyCheckBoxIndividualStatus(true)
                    else setEmptyCheckBoxIndividualStatus(false)
                    handleChecked(INDIVIDUAL)}}
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
