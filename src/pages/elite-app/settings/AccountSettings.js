import React, { useEffect } from 'react'
import { AccountSettings as AccountSettingBase  } from 'base-app'
import { Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Navs from '../../../components/elite-app/layouts/Navs'
import styled from 'styled-components'

const AccountSettingsContainer = styled.div`
  background-color: #f3f5f7 !important;
  min-height: 100vh;
`

const AccountSettings = ({ activeTab }) => {

  const {authToken} = useSelector(state => state.auth?.guest)
  const history = useHistory()

  useEffect(() => {
    if (!authToken) {
      history.push('/')
    }
  }, [authToken])

  return (
    <AccountSettingsContainer>
      <Navs />
      <Col xs={12} md={8} className='mx-auto py-5'>
        <AccountSettingBase activeTab={activeTab} />
      </Col>
    </AccountSettingsContainer>

  )
}

export default AccountSettings
