import { FormattedMessage } from 'base-app'
import React from 'react'
import { getKeyLang } from '../../../../../configs/elite-app'
import { ButtonCloseLiveChat } from '../utility'
import logoInOn from '../../../../../assets/images/app-no1/home/ic_logo_sm.svg'
const Header = ({handleCloseLiveChat}) => {
  return (
    <div className='d-flex justify-content-between'>
      <span className='d-flex align-items-center font-weight-bold'>
          <img src={logoInOn} alt="" width={20} />
      <FormattedMessage id={getKeyLang('support.sideNav.title')} />
      </span>
      <div>
       <ButtonCloseLiveChat onClick={handleCloseLiveChat}>X</ButtonCloseLiveChat>
      </div>
    </div>
  )
}

export default Header
