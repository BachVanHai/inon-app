import React, { useEffect } from 'react'
import { GeneralInfo as GeneralInfoBase } from 'base-app'
import { Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Navs from '../../../components/elite-app/layouts/Navs'
import styled from 'styled-components'

const GeneralInfoContainer = styled.div`
  background-color: #f3f5f7 !important;
  min-height: 100vh;
`

const GeneralInfo = ({ activeTab }) => {

  const {authToken} = useSelector(state => state.auth?.guest)
  const history = useHistory()

  useEffect(() => {
    if (!authToken) {
      history.push('/')
    }
  }, [authToken])

  return (
    <GeneralInfoContainer>
      <Navs />
      <Col xs={12} md={8} className='mx-auto my-4'>
        <GeneralInfoBase activeTab={activeTab} />
      </Col>
    </GeneralInfoContainer>
  )
}

export default GeneralInfo
