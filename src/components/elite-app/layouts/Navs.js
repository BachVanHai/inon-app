import React, { useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'reactstrap'
import '../../../assets/scss/elite-app/layouts/navs.scss'
import UserDropdown from '../UserDropDown'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Bells, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'
import logoWebIcon from '../../../assets/images/elite-app/layouts/navs/logo-web.svg'
import logoIconMobile from '../../../assets/images/elite-app/layouts/header/logo.svg'
import vietnamFlagIcon from '../../../assets/images/elite-app/layouts/header/vietnamFlagIcon.png'
import unitedStateFlagIcon from '../../../assets/images/elite-app/layouts/header/unitedStateFlagIcon.png'
import search from '../../../assets/images/elite-app/layouts/navs/search-icon.png'

const Navs = () => {

  const history = useHistory()
  const { authToken } = useSelector(state => state.auth?.guest)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [flag, setFlag] = useState(1)
  const isAuthenticated = !!authToken


  return (
    <article className="navs-container">
      <Nav className='justify-content-between'>
        <NavItem>
          <div className="ml-2 cursor-pointer" onClick={() => history.push("/home")}>
            <img className="d-md-block d-none" src={logoWebIcon}  alt="Logo Web Icon"/>
            <img className="d-md-none d-block" src={logoIconMobile}  alt="Logo Icon Mobile"/>
          </div>
        </NavItem>

        <div className='d-flex align-items-center'>
          <img className="mr-1 cursor-pointer" src={search}  alt="Search icon"/>
          <NavItem className="cursor-pointer">
            {/*<img src={bell}  alt="Bell icon"/>*/}
            <Bells />
          </NavItem>
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <NavItem className='header-web-right-account font-weight-bold mx-1 cursor-pointer'>
              <div onClick={() => history.push('/login')}>
                <FormattedMessage id={getKeyLang("header.account")} />
              </div>
            </NavItem>)}
          <NavItem className="d-none d-md-block">
            <div className='language d-flex'>
              <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle caret color='none'>
                  {flag === 1 ? <img src={vietnamFlagIcon}  alt="Viet Nam Flag Icon"/> : <img src={unitedStateFlagIcon}  alt="United State Flag Icon"/>}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setFlag(1)}>
                    <img src={vietnamFlagIcon}  alt="Viet Nam Flag Icon"/>
                  </DropdownItem>
                  <DropdownItem onClick={() => setFlag(2)}>
                    <img src={unitedStateFlagIcon}  alt="United State Flag Icon"/>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavItem>
        </div>
      </Nav>
    </article>
  )
}

export default Navs
