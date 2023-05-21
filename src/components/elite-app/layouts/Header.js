import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Dropdown,
  DropdownToggle, NavItem
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import UserDropdown from '../UserDropDown'
import '../../../assets/scss/elite-app/layouts/header.scss'
import logo from '../../../assets/images/elite-app/layouts/header/logo.svg'
import searchIcon from '../../../assets/images/elite-app/layouts/header/search.svg'
import vietnamFlagIcon from '../../../assets/images/elite-app/layouts/header/vietnamFlagIcon.png'
import unitedStateFlagIcon from '../../../assets/images/elite-app/layouts/header/unitedStateFlagIcon.png'
import { Bells, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'

const Header = ({ isOpenMenu, toggleMenu, togglePromotion, setTogglePromotion, setInsuranceType ,setSideNavType }) => {

  const history = useHistory()
  const { authToken } = useSelector(state => state.auth?.guest)
  const { user } = useSelector(state => state.auth.guest)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [flag, setFlag] = useState(1)
  const isAuthenticated = !!authToken

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className='w-100 header'>
      <div className='header-web h-100'>
        <div className="d-flex header-web-left">
          <div className='welcome'>
            <div className="welcome-text">
              <FormattedMessage id={getKeyLang("header.welcome")} />
            </div>
            {user?.fullName ? <div className='font-weight-bold welcome-user-name'>{user?.fullName}</div> : null}
            👋
          </div>

          <div className='search-bell ml-2'>

            <div className="search-bell-input">
              <input type='text' placeholder="Tìm kiếm"/>
              <img className="cursor-pointer" src={searchIcon} />
            </div>
            {/*<div className={"mx-2 cursor-pointer" + (!isAuthenticated ? " d-none" : "") }>*/}
            {/*  <img src={bellIcon}/>*/}
            {/*</div>*/}
            <div className={"mx-2" + (!isAuthenticated ? " d-none" : "") }>
              <Bells />
            </div>
            <div>
              {isAuthenticated ? (
                <UserDropdown setInsuranceType={setInsuranceType}/>
              ) : (
                <NavItem className='header-web-right-account ml-2' onClick={() => history.push("/login")}>
                  <div>
                    <FormattedMessage id={getKeyLang("header.account")} />
                  </div>
                </NavItem>)}
            </div>

          </div>
        </div>
        <div className='language d-flex'>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret color='none'>
              {flag === 1 ? <img src={vietnamFlagIcon}  alt="Viet Name Flag Icon"/> : <img src={unitedStateFlagIcon}  alt="United state flag icon"/>}
            </DropdownToggle>
            {/*<DropdownMenu>*/}
            {/*  <DropdownItem onClick={() => setFlag(1)}>*/}
            {/*    <img src={vietnamFlagIcon} />*/}
            {/*  </DropdownItem>*/}
            {/*  <DropdownItem onClick={() => setFlag(2)}>*/}
            {/*    <img src={unitedStateFlagIcon} />*/}
            {/*  </DropdownItem>*/}
            {/*</DropdownMenu>*/}
          </Dropdown>
        </div>
      </div>

      <div className='header-mobile px-1'>
        <div className='header-mobile-left'>
          {togglePromotion ? <button className={'hamburger' + (!isOpenMenu ? ' menu-close' : '')} onClick={toggleMenu}>
            <span className='line'/>
            <span className='line'/>
            <span className='line'/>
          </button> : (
            <button className='hamburger menu-close' onClick={setTogglePromotion}>
              <span className='line'/>
              <span className='line'/>
              <span className='line'/>
            </button>
          )}
          <div onClick={()=> {
            setSideNavType('products')
            setInsuranceType('motorVehicleInsurance')
            }}><img className='logo' src={logo}  alt="Logo"/></div>
        </div>

        {togglePromotion ? <div className={'header-mobile-right' + (!isOpenMenu === true ? ' d-none' : '')}>

          <div className="position-relative">
            <input className="header-mobile-right-input" type='text' />
            <img className='header-mobile-right-search-icon position-absolute' src={searchIcon} />
          </div>
          <div>
            {isAuthenticated ? <div className="d-flex align-items-center">
                <Bells/>
                <UserDropdown setInsuranceType={setInsuranceType} />
              </div> :
              <div onClick={() => history.push("/login")} className='header-mobile-right-account ml-1'>
                <FormattedMessage id={getKeyLang("header.account")} />
              </div>}
          </div>
        </div> : null}

      </div>
    </div>
  )
}

export default Header
