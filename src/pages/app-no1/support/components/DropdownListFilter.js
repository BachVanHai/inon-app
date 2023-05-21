import { FormattedMessage } from 'base-app'
import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/app-no1'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import {
  ACCOUNTANT,
  ASSURANCE_COMPENSATION,
  CUSTOMER_SERVICE,
  FEEDBACK,
  OPERATE,
  OTHER,
  PAYMENT,
  PRODUCT,
  TECHNOLOGY
} from '../utility'
import { isArrayEmpty } from '../../../../ultity'
import { getAllPermission } from '../../../../redux/actions/app-no1/permissionManagement'

const DropDownStyle = styled.div`
  .btn-primary {
    ${'' /* height :"20px"; */}
    weight : 140px !important;
    padding: 0;
    padding-left: 15px;
    background: none !important;
    &:hover {
      background: none !important;
    }
  }
  .btn-primary:hover {
    box-shadow: none;
  }

  .dropdown .dropdown-menu .dropdown-item {
    width: 100%;
  }
`
const DropdownListFilter = ({ setRequest, availableData,availablePermission}) => {
  const { user } = useSelector((state) => state.auth)
  const [isOpenFilterDropdown, setIsOpenFilterDropdown] = useState(false)
  const handleToggleFilterDropdown = () => {
    setIsOpenFilterDropdown(!isOpenFilterDropdown)
  }
  const userLogin = availablePermission.filter(_elt =>{
    return Number(_elt.userId) === user.id
  })
  const handleGetAll = () => {
    setRequest(availableData)
  }
  const handleFilter = () => {
    const filter = !isArrayEmpty(availableData) ? availableData.filter((_elt) => {
      return _elt.supporterInOnIdName === user.fullName
    }) : []
    setRequest(filter)
  }
  const handleFilterByDepartment = () =>{
    const dataFilter = availableData.filter(elt =>{
      const departmemntType = elt.type === PRODUCT ? OPERATE : elt.type === ASSURANCE_COMPENSATION ? OPERATE : elt.type === CUSTOMER_SERVICE ? OPERATE : elt.type === FEEDBACK ? OPERATE  : elt.type === OTHER ? OPERATE : elt.type === TECHNOLOGY ? TECHNOLOGY :  elt.type === PAYMENT ? ACCOUNTANT  : null
      const department = userLogin.map(_elt => _elt.department)
      return  department.includes(departmemntType)
    })
    setRequest(dataFilter);
  }
  return (
    <DropDownStyle>
      <Dropdown
        isOpen={isOpenFilterDropdown}
        toggle={handleToggleFilterDropdown}
      >
        <DropdownToggle color='primary' size='sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='40px'
            width='40px'
            fill='#338955'
            baseProfile='tiny-ps'
            version='1.2'
            viewBox='0 0 100 59'
          >
            <g>
              <g>
                <g>
                  <path
                    fillRule='evenodd'
                    d='M94.97 6.52c0 .59-.47 1.06-1.05 1.06H6.03c-.58 0-1.06-.47-1.06-1.06V2.74c0-.58.48-1.05 1.06-1.05h87.89c.58 0 1.05.47 1.05 1.05v3.78zM84.46 23.35c0 .58-.47 1.05-1.05 1.05H16.54c-.58 0-1.05-.47-1.05-1.05v-3.79c0-.58.47-1.05 1.05-1.05h66.87c.58 0 1.05.47 1.05 1.05v3.79zM73.95 40.17c0 .58-.47 1.05-1.06 1.05H27.05c-.58 0-1.05-.47-1.05-1.05v-3.79c0-.58.47-1.05 1.05-1.05h45.84c.59 0 1.06.47 1.06 1.05v3.79zM63.43 53.21v3.78c0 .58-.47 1.06-1.05 1.06H37.57c-.58 0-1.05-.48-1.05-1.06v-3.78c0-.58.47-1.05 1.05-1.05h24.81c.58 0 1.05.47 1.05 1.05z'
                    className='shp0'
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => handleGetAll()}>
            <FormattedMessage id={getKeyLang('filter.all')} />
          </DropdownItem>
          <DropdownItem onClick={() => handleFilter()}>
            <FormattedMessage
              id={getKeyLang('support.management.specifiedRequest')}
            />
          </DropdownItem>
          {
            userLogin.length !== 0 && userLogin[0].decentralization !== "AD_OP"  ?
            <DropdownItem onClick={() => handleFilterByDepartment()}>
            <FormattedMessage
              id={getKeyLang('support.management.departmentRequestment')}
            />
          </DropdownItem> : null
          }
        </DropdownMenu>
      </Dropdown>
    </DropDownStyle>
  )
}

export default DropdownListFilter
