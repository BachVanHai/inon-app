import React, { useState } from 'react'
import '../../../assets/scss/elite-app/layouts/side-nav.scss'
import logo from '../../../assets/images/elite-app/layouts/side-nav/logo.svg'
import motorVehicleInsuranceIcon from '../../../assets/images/elite-app/layouts/side-nav/motor-vehicle-insurance.svg'
import personalInsuranceIcon from '../../../assets/images/elite-app/layouts/side-nav/personal-insurance.svg'
import motorInsuranceIcon from '../../../assets/images/elite-app/layouts/side-nav/motor-insurance.svg'
import homeInsuranceIcon from '../../../assets/images/elite-app/layouts/side-nav/homeinsuranceIcon.svg'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import vietnamFlagIcon from '../../../assets/images/elite-app/layouts/header/vietnamFlagIcon.png'
import unitedStateFlagIcon from '../../../assets/images/elite-app/layouts/header/unitedStateFlagIcon.png'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import SupportIcon from '../../../assets/images/elite-app/support/supportIcon.svg'

const HelpCenterItemStyled = styled.div`
  .sidenav__contract.d-flex.align-items-center:hover svg {
    opacity: 0.5;
  }

  .sidenav__contract.d-flex.align-items-center:hover img {
    opacity: 0.5;
  }
`
const INSURANCE_TYPES = [
  {
    type: 'motorVehicleInsurance',
    icon: motorVehicleInsuranceIcon,
    keyLang: 'home.carInsurance'
  },
  {
    type: 'personalInsurance',
    icon: personalInsuranceIcon,
    keyLang: 'home.personalInsurance'
  },
  {
    type: 'motorInsurance',
    icon: motorInsuranceIcon,
    keyLang: 'home.motorInsurance'
  },
  {
    type: 'homeInsurance',
    icon: homeInsuranceIcon,
    keyLang: 'home.homeInsurance'
  }
]

const SideNav = ({
  isOpenMenu,
  insuranceType,
  setInsuranceType,
  toggleMenu,
  setSideNavType
}) => {
  const history = useHistory()
  const intl = useIntl()
  const { authToken } = useSelector((state) => state.auth?.guest)
  const isAuthenticated = !!authToken
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [flag, setFlag] = useState(1)

  const onClickContractManagement = () => {
    if (isAuthenticated) {
      history.push('/contract-management')
    }
  }

  return (
    <nav className={'sidenav' + (!isOpenMenu ? ' open' : '')}>
      {/*web*/}
      <section className='sidenav__web'>
        <div className='sidenav__web__top'>
          <div
            className={'sidenav__logo ' + (isOpenMenu ? 'd-flex' : 'd-none')}
          >
            <img src={logo} alt='Logo' />
          </div>
          <div className='sidenav__insurances'>
            {INSURANCE_TYPES.map((item,index) => (
              <div
              key={index}
                className={
                  'd-flex mb-1' +
                  (insuranceType === item.type ? ' active-insurance' : '')
                }
              >
                <div className='box-item' />
                <div
                  className='item p-1 active-item'
                  onClick={() => {
                    setInsuranceType(item.type)
                    setSideNavType('products')
                  }}
                >
                  <div className='item__icon mr-1'>
                    <img src={item.icon} alt='Motor vehicle insurance icon' />
                  </div>
                  <div className='font-weight-bold'>
                    <FormattedMessage id={getKeyLang(item.keyLang)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='sidenav__web__bottom'>
          <div
            className={
              'sidenav__contract d-flex align-items-center' +
              (!isAuthenticated ? ' sidenav__contract-inactive' : '')
            }
            onClick={() => onClickContractManagement()}
          >
            <svg
              className='mx-2'
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className='sidenav__contract__icon'
                d='M20.9548 21.6305H11.3281'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                className='sidenav__contract__icon'
                d='M20.9548 16.0485H11.3281'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                className='sidenav__contract__icon'
                d='M15.0024 10.4801H11.3291'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                className='sidenav__contract__icon'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M21.2116 3.66602C21.2116 3.66602 10.9756 3.67135 10.9596 3.67135C7.27964 3.69402 5.00098 6.11535 5.00098 9.80868V22.07C5.00098 25.782 7.29698 28.2127 11.009 28.2127C11.009 28.2127 21.2436 28.2087 21.261 28.2087C24.941 28.186 27.221 25.7634 27.221 22.07V9.80868C27.221 6.09668 24.9236 3.66602 21.2116 3.66602Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className='mr-2 sidenav__contract__text' id='popTop'>
              <FormattedMessage
                id={getKeyLang('sidenav.contract.management')}
              />
            </div>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className='sidenav__contract__icon'
                d='M9 6L15 12L9 18'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div
              className='bg-white tooltiptext'
              onClick={() => history.push('/login')}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({
                  id: getKeyLang('sidenav.login.notice')
                })
              }}
            />
          </div>
          {/* help center  */}
          <HelpCenterItemStyled>
            <div
              style={{
                marginTop: '-50px'
              }}
              className={'sidenav__contract d-flex align-items-center '}
              onClick={() => {
                setInsuranceType('')
                setSideNavType('helpcenter')
              }}
            >
              <svg
                style={{
                  marginLeft: '18px'
                }}
                className='sidenav__contract__icon'
                xmlns='http://www.w3.org/2000/svg'
                width='42'
                fill='#ffffff'
                version='1'
                viewBox='0 0 514 514'
              >
                <path
                  className='sidenav__contract__icon'
                  d='M1502 4299c-46-23-72-55-90-108-9-25-12-379-12-1336V1552l28-53c20-39 38-58 71-76l45-23 1057 2 1057 3 39 31c79 63 73-27 73 1139v1040l-26 55c-20 45-76 106-292 323s-278 273-326 297l-59 30h-761c-754 0-761 0-804-21zm1448-376c0-140 5-264 10-285 14-50 55-97 105-119 35-16 69-19 298-19h257v-963c0-736-3-966-12-975-17-17-2019-17-2036 0-9 9-12 311-12 1300 0 1215 1 1288 18 1297 11 7 253 10 695 11h677v-247zm400-28l255-255h-515v255c0 140 1 255 3 255 1 0 117-115 257-255z'
                  transform='matrix(.1 0 0 -.1 0 514)'
                />
                <path
                  className='sidenav__contract__icon'
                  d='M2338 3537c-119-34-199-131-214-260-6-51-4-58 19-81 54-54 123-24 138 59 20 107 67 135 224 135 127 0 165-13 203-70 21-30 23-45 20-106-4-94-32-131-131-177-139-65-197-163-197-333 0-87 2-97 25-119 24-24 57-31 90-19 29 12 45 60 45 141 0 108 36 165 122 193 68 23 130 80 168 154 33 66 35 74 35 170-1 119-19 170-85 236-70 70-113 84-275 87-94 2-156-2-187-10zM2436 2490c-112-34-121-190-14-246 83-43 188 27 188 125 0 48-33 96-80 115-45 18-52 18-94 6zM1720 1960c-28-28-29-168-2-193 23-21 52-22 77-3 16 11 20 29 23 88 3 63 1 77-18 101-25 32-52 35-80 7zM2002 1964c-20-14-22-24-22-98 0-89 13-116 57-116 39 0 53 30 53 118 0 72-2 83-22 96-12 9-27 16-33 16s-21-7-33-16zM2284 1972c-23-15-34-53-34-116 0-53 4-70 20-86 24-24 48-25 78-4 20 13 22 24 22 95 0 66-3 82-20 99-21 21-47 25-66 12zM2550 1960c-28-28-29-168-2-193 23-21 52-22 77-3 16 11 20 29 23 88 3 63 1 77-18 101-25 32-52 35-80 7zM2832 1964c-20-14-22-24-22-98 0-89 13-116 57-116 39 0 53 30 53 118 0 72-2 83-22 96-12 9-27 16-33 16s-21-7-33-16zM3101 1954c-30-38-30-155-1-184 24-24 48-25 78-4 20 13 22 24 22 95 0 66-3 82-20 99-27 27-55 25-79-6z'
                  transform='matrix(.1 0 0 -.1 0 514)'
                />
                <path
                  className='sidenav__contract__icon'
                  d='M1225 4026c-23-14-51-43-65-68l-25-43V2600c0-723 3-1327 7-1342 12-40 57-89 103-109 38-18 92-19 1073-19 910 0 1037 2 1070 15 73 31 112 86 112 160v45h-75c-66 0-75-2-75-18 0-10-5-23-12-30-9-9-250-12-1025-12H1300l-5 23c-3 12-4 596-3 1297l3 1275 33 10 32 9v146h-47c-33 0-61-8-88-24z'
                  transform='matrix(.1 0 0 -.1 0 514)'
                />
              </svg>
              <div
                style={{ marginLeft: '15px' }}
                className='sidenav__contract__text'
                id='popTop'
              >
                <FormattedMessage id={getKeyLang('helpcenter.sideBar.title')} />
              </div>
              <div style={{ marginLeft: '15px' }}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    className='sidenav__contract__icon'
                    d='M9 6L15 12L9 18'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </HelpCenterItemStyled>
          {/* support */}
          <HelpCenterItemStyled>
            <div
              style={{
                marginTop: '-50px'
              }}
              className={'sidenav__contract d-flex align-items-center'}
              onClick={() => {
                setInsuranceType('')
                setSideNavType('support')
              }}
            >
              <svg
                className='ml-2'
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                fill='#fff'
                baseProfile='tiny-ps'
                version='1.2'
                viewBox='0 0 160 164'
              >
                <g>
                  <path
                    d='M96.9 13.5c11.2 2.7 21.5 8.8 31.1 18.4 8.7 8.8 13.5 16.2 16.9 26.3 1.3 3.7 2.6 5.7 4.7 6.8 5.5 3.1 7 18.4 2.9 31.3-2.8 8.7-4.4 9.9-11.8 9.1-3.4-.3-6.6-1-7.1-1.5-.6-.6-.3-8.2.9-20.3l1.8-19.4-3.5-7.3c-6.9-14.5-19.7-26.3-33.6-31.1-5.6-1.9-8.7-2.3-19.2-2.3-15.1 0-22.2 2-32.8 9.5-8.8 6.2-14.2 12.5-19.3 22.5-4.6 9-4.6 8.2-1.8 35.2.8 7.8 1 12.6.4 13.2-1.8 1.6-12.9 2.3-14.8.9-2.6-2-5.9-12.5-6.4-20.8-.6-10 1.3-17 4.9-18.8 1.9-.9 3.3-3 5.3-8.1 8.2-21.5 24.8-37.1 46-43.2 7.8-2.3 26.5-2.5 35.4-.4z'
                    className='shp0'
                  ></path>
                  <path
                    fillRule='evenodd'
                    d='M98.4 74.3c23 10.6 32.2 37.1 20.6 59.7-3.2 6.2-12.5 15.2-19 18.2-8.7 4.1-16.5 5.3-25.7 3.9-6.7-1.1-8.4-1-12.2.3-5.8 2.1-15.4 2.1-17.5 0-2.2-2.1-2.1-2.4 1.8-7.9l3.5-4.8-3.4-4.4c-5.8-7.6-7.9-14.4-8-25.3 0-11.6 1.8-17.5 8.1-26 4.8-6.6 12.6-12.3 20.7-15.2 8.1-2.9 23.2-2.1 31.1 1.5zm-15.9 3c-7.8-.3-9.8 0-14.9 2.1-11.2 4.7-18.3 12.5-21.7 23.8-3.7 11.9-1.2 24.1 7 34.2 3.6 4.5 3.9 7.3 1.1 10.9-1.1 1.4-2 2.8-2 3.1 0 1.2 4.1.6 10-1.4 4.7-1.6 6.5-1.8 8.7-.9 4.9 1.9 17.2 1.4 23.6-1.1 8-3 16.5-11.1 20.3-19.2 2.5-5.5 2.9-7.5 2.9-15.3 0-8.2-.3-9.7-3.3-15.7-3.7-7.5-10.4-14.3-17.9-17.8-3.6-1.8-7-2.4-13.8-2.7z'
                    className='shp0'
                  ></path>
                  <path
                    d='M64.2 109.7c2.2 2 2.3 7 .1 9.5-3.5 3.9-11.3.8-11.3-4.5 0-1.2.7-3.3 1.6-4.5 1.8-2.7 6.9-3 9.6-.5zM86.2 109.7c2.6 2.3 2.4 7.8-.4 9.7-4.9 3.4-10.8.8-10.8-4.7 0-1.7.7-3.9 1.7-4.9 2-2.2 7-2.3 9.5-.1zM108.4 110.2c3.4 4.8.4 10.8-5.2 10.8-5.6 0-8.5-6.8-4.7-11 2.5-2.8 7.9-2.7 9.9.2z'
                    className='shp0'
                  ></path>
                </g>
              </svg>
              <div
                style={{ marginLeft: '25px' }}
                className='sidenav__contract__text'
                id='popTop'
              >
                <FormattedMessage id={getKeyLang('support.sideNav.title')} />
              </div>
              <div style={{ marginLeft: '75px' }}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    className='sidenav__contract__icon'
                    d='M9 6L15 12L9 18'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </HelpCenterItemStyled>
        </div>
      </section>

      {/*mobile*/}
      <section className='sidenav__mobile'>
        <div
          style={{ marginBottom: '140px' }}
          className={
            'sidenav__mobile__item' +
            (!isAuthenticated ? ' sidenav__mobile__item-inactive' : '')
          }
          onClick={() => onClickContractManagement()}
        >
          <svg
            className='mx-1'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='sidenav__contract__icon'
              d='M20.9548 21.6305H11.3281'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              className='sidenav__contract__icon'
              d='M20.9548 16.0485H11.3281'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              className='sidenav__contract__icon'
              d='M15.0024 10.4801H11.3291'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              className='sidenav__contract__icon'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M21.2116 3.66602C21.2116 3.66602 10.9756 3.67135 10.9596 3.67135C7.27964 3.69402 5.00098 6.11535 5.00098 9.80868V22.07C5.00098 25.782 7.29698 28.2127 11.009 28.2127C11.009 28.2127 21.2436 28.2087 21.261 28.2087C24.941 28.186 27.221 25.7634 27.221 22.07V9.80868C27.221 6.09668 24.9236 3.66602 21.2116 3.66602Z'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='mr-2 sidenav__mobile__contract' id='popTop'>
            <FormattedMessage id={getKeyLang('sidenav.contract.management')} />
          </div>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='sidenav__contract__icon'
              d='M9 6L15 12L9 18'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div
            className='bg-white tooltiptext'
            onClick={() => history.push('/login')}
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({
                id: getKeyLang('sidenav.login.notice')
              })
            }}
          ></div>
        </div>
        {/* help center  */}
        <div
          style={{ marginBottom: '70px' }}
          className={
            'sidenav__mobile__item' +
            (!isAuthenticated ? ' sidenav__mobile__item-inactive' : '')
          }
          onClick={() => {
            toggleMenu()
            setInsuranceType('')
            setSideNavType('helpcenter')
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='42'
            fill='#ffffff'
            style={{
              marginLeft : "10px"
            }}
            version='1'
            viewBox='0 0 514 514'
          >
            <path
              d='M1502 4299c-46-23-72-55-90-108-9-25-12-379-12-1336V1552l28-53c20-39 38-58 71-76l45-23 1057 2 1057 3 39 31c79 63 73-27 73 1139v1040l-26 55c-20 45-76 106-292 323s-278 273-326 297l-59 30h-761c-754 0-761 0-804-21zm1448-376c0-140 5-264 10-285 14-50 55-97 105-119 35-16 69-19 298-19h257v-963c0-736-3-966-12-975-17-17-2019-17-2036 0-9 9-12 311-12 1300 0 1215 1 1288 18 1297 11 7 253 10 695 11h677v-247zm400-28l255-255h-515v255c0 140 1 255 3 255 1 0 117-115 257-255z'
              transform='matrix(.1 0 0 -.1 0 514)'
            />
            <path
              d='M2338 3537c-119-34-199-131-214-260-6-51-4-58 19-81 54-54 123-24 138 59 20 107 67 135 224 135 127 0 165-13 203-70 21-30 23-45 20-106-4-94-32-131-131-177-139-65-197-163-197-333 0-87 2-97 25-119 24-24 57-31 90-19 29 12 45 60 45 141 0 108 36 165 122 193 68 23 130 80 168 154 33 66 35 74 35 170-1 119-19 170-85 236-70 70-113 84-275 87-94 2-156-2-187-10zM2436 2490c-112-34-121-190-14-246 83-43 188 27 188 125 0 48-33 96-80 115-45 18-52 18-94 6zM1720 1960c-28-28-29-168-2-193 23-21 52-22 77-3 16 11 20 29 23 88 3 63 1 77-18 101-25 32-52 35-80 7zM2002 1964c-20-14-22-24-22-98 0-89 13-116 57-116 39 0 53 30 53 118 0 72-2 83-22 96-12 9-27 16-33 16s-21-7-33-16zM2284 1972c-23-15-34-53-34-116 0-53 4-70 20-86 24-24 48-25 78-4 20 13 22 24 22 95 0 66-3 82-20 99-21 21-47 25-66 12zM2550 1960c-28-28-29-168-2-193 23-21 52-22 77-3 16 11 20 29 23 88 3 63 1 77-18 101-25 32-52 35-80 7zM2832 1964c-20-14-22-24-22-98 0-89 13-116 57-116 39 0 53 30 53 118 0 72-2 83-22 96-12 9-27 16-33 16s-21-7-33-16zM3101 1954c-30-38-30-155-1-184 24-24 48-25 78-4 20 13 22 24 22 95 0 66-3 82-20 99-27 27-55 25-79-6z'
              transform='matrix(.1 0 0 -.1 0 514)'
            />
            <path
              d='M1225 4026c-23-14-51-43-65-68l-25-43V2600c0-723 3-1327 7-1342 12-40 57-89 103-109 38-18 92-19 1073-19 910 0 1037 2 1070 15 73 31 112 86 112 160v45h-75c-66 0-75-2-75-18 0-10-5-23-12-30-9-9-250-12-1025-12H1300l-5 23c-3 12-4 596-3 1297l3 1275 33 10 32 9v146h-47c-33 0-61-8-88-24z'
              transform='matrix(.1 0 0 -.1 0 514)'
            />
          </svg>
          <div className='mr-2 sidenav__mobile__contract' id='popTop'>
            <FormattedMessage id={getKeyLang('helpcenter.sideBar.title')} />
          </div>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='sidenav__contract__icon'
              d='M9 6L15 12L9 18'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        {/* support  */}
        <div
          className={
            'sidenav__mobile__item' +
            (!isAuthenticated ? ' sidenav__mobile__item-inactive' : '')
          }
          onClick={() => {
            toggleMenu()
            setInsuranceType('')
            setSideNavType('support')
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            style={{marginLeft:"15px"}}
            fill='#fff'
            baseProfile='tiny-ps'
            version='1.2'
            viewBox='0 0 160 164'
          >
            <g>
              <path
                d='M96.9 13.5c11.2 2.7 21.5 8.8 31.1 18.4 8.7 8.8 13.5 16.2 16.9 26.3 1.3 3.7 2.6 5.7 4.7 6.8 5.5 3.1 7 18.4 2.9 31.3-2.8 8.7-4.4 9.9-11.8 9.1-3.4-.3-6.6-1-7.1-1.5-.6-.6-.3-8.2.9-20.3l1.8-19.4-3.5-7.3c-6.9-14.5-19.7-26.3-33.6-31.1-5.6-1.9-8.7-2.3-19.2-2.3-15.1 0-22.2 2-32.8 9.5-8.8 6.2-14.2 12.5-19.3 22.5-4.6 9-4.6 8.2-1.8 35.2.8 7.8 1 12.6.4 13.2-1.8 1.6-12.9 2.3-14.8.9-2.6-2-5.9-12.5-6.4-20.8-.6-10 1.3-17 4.9-18.8 1.9-.9 3.3-3 5.3-8.1 8.2-21.5 24.8-37.1 46-43.2 7.8-2.3 26.5-2.5 35.4-.4z'
                className='shp0'
              ></path>
              <path
                fillRule='evenodd'
                d='M98.4 74.3c23 10.6 32.2 37.1 20.6 59.7-3.2 6.2-12.5 15.2-19 18.2-8.7 4.1-16.5 5.3-25.7 3.9-6.7-1.1-8.4-1-12.2.3-5.8 2.1-15.4 2.1-17.5 0-2.2-2.1-2.1-2.4 1.8-7.9l3.5-4.8-3.4-4.4c-5.8-7.6-7.9-14.4-8-25.3 0-11.6 1.8-17.5 8.1-26 4.8-6.6 12.6-12.3 20.7-15.2 8.1-2.9 23.2-2.1 31.1 1.5zm-15.9 3c-7.8-.3-9.8 0-14.9 2.1-11.2 4.7-18.3 12.5-21.7 23.8-3.7 11.9-1.2 24.1 7 34.2 3.6 4.5 3.9 7.3 1.1 10.9-1.1 1.4-2 2.8-2 3.1 0 1.2 4.1.6 10-1.4 4.7-1.6 6.5-1.8 8.7-.9 4.9 1.9 17.2 1.4 23.6-1.1 8-3 16.5-11.1 20.3-19.2 2.5-5.5 2.9-7.5 2.9-15.3 0-8.2-.3-9.7-3.3-15.7-3.7-7.5-10.4-14.3-17.9-17.8-3.6-1.8-7-2.4-13.8-2.7z'
                className='shp0'
              ></path>
              <path
                d='M64.2 109.7c2.2 2 2.3 7 .1 9.5-3.5 3.9-11.3.8-11.3-4.5 0-1.2.7-3.3 1.6-4.5 1.8-2.7 6.9-3 9.6-.5zM86.2 109.7c2.6 2.3 2.4 7.8-.4 9.7-4.9 3.4-10.8.8-10.8-4.7 0-1.7.7-3.9 1.7-4.9 2-2.2 7-2.3 9.5-.1zM108.4 110.2c3.4 4.8.4 10.8-5.2 10.8-5.6 0-8.5-6.8-4.7-11 2.5-2.8 7.9-2.7 9.9.2z'
                className='shp0'
              ></path>
            </g>
          </svg>
          <div className='ml-1 sidenav__mobile__contract' id='popTop'>
            <FormattedMessage id={getKeyLang('support.sideNav.title')} />
          </div>
          <svg
          style={{
            marginLeft : "60px"
          }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='sidenav__contract__icon'
              d='M9 6L15 12L9 18'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='language'>
          <UncontrolledButtonDropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
            direction='up'
          >
            <DropdownToggle caret color='none'>
              {flag === 1 ? (
                <div className='d-flex align-items-center'>
                  <img src={vietnamFlagIcon} alt='Viet Nam flag icon' />
                  <div className='text-white ml-1'>
                    <FormattedMessage id={getKeyLang('sidenav.language.vn')} />
                  </div>
                </div>
              ) : (
                <div className='d-flex align-items-center'>
                  <img src={unitedStateFlagIcon} alt='United state flag icon' />
                  <div className='text-white ml-1'>
                    <FormattedMessage id={getKeyLang('sidenav.language.en')} />
                  </div>
                </div>
              )}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setFlag(1)}>
                <img src={vietnamFlagIcon} alt='Viet Nam flag icon' />
              </DropdownItem>
              <DropdownItem onClick={() => setFlag(2)}>
                <img src={unitedStateFlagIcon} alt='United state flag icon' />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </section>
    </nav>
  )
}

export default SideNav
