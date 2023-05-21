import React, { useState, useEffect } from 'react'
import {
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'
import FeeMotorManageBSHView from './FeeMotorManageBSHView'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { COMPANIES } from '../../../../configs/insurance-app'

const FeeMotorManageView = (props) => {
  const [companySelected, setCompanySelected] = useState('01')
  const [role, setRole] = useState(typeof (props.location.state) !== 'undefined' && typeof (props.location.state.role) !== 'undefined' ? props.location.state.role : '')
  const [editable, setEditable] = useState(typeof (props.location.state) !== 'undefined' && typeof (props.location.state.editable) !== 'undefined' ? props.location.state.editable : '')
  const [userId, setUserId] = useState(typeof (props.location.state) !== 'undefined' && typeof (props.location.state.userId) !== 'undefined' ? props.location.state.userId : '')

  const onChangeCompany = tab => {
    if (tab !== companySelected) {
      setCompanySelected(tab)
    }
  }

  useEffect(() => {
    if (typeof (props.location.state) !== 'undefined' && typeof (props.location.state.role) !== 'undefined' && typeof (props.location.state.editable) !== 'undefined') {
      setRole(props.location.state.role)
      setEditable(props.location.state.editable)
    } else {
      Utils.goBackHome()
    }
  }, [])

  const formik = props.formik

  return (
    <Row>
      <Col sm='12'>
        <Nav tabs>
          {
            COMPANIES.map((item) => (
              <NavItem key={item.id}>
                <NavLink className={classnames({ active: companySelected === item.id })} onClick={() => {
                  onChangeCompany(item.id)
                }}>{item.name}</NavLink>
              </NavItem>
            ))
          }
        </Nav>
        <TabContent className='py-50'>
          <FeeMotorManageBSHView companyId={companySelected} role={role} editable={editable}
                                 data={role === 'VIEW' ? props.location.state.data : ''} userId={userId} />
        </TabContent>
      </Col>
    </Row>
  )
}
export default FeeMotorManageView
