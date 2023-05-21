import React, { useState, useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap"
import classnames from "classnames"
import FeeCarManageBSHView from './FeeCarManageBSHView'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { COMPANIES } from '../../../../configs/insurance-app'
import FeeAntinManageBSHView from './FeeAntinManageBSHView';
import { HttpClient } from 'base-app';
import { useSelector } from 'react-redux';

const FeeAntinManageView = ({ location }) => {
  const { user} = useSelector(state => state.auth) 
  const [companySelected, setCompanySelected] = useState("01")
  const [role, setRole] = useState(typeof (location.state) !== 'undefined' && typeof (location.state.role) !== 'undefined' ? location.state.role : '')
  const [editable, setEditable] = useState(typeof (location.state) !== 'undefined' && typeof (location.state.editable) !== 'undefined' ? location.state.editable : '')
  const [userId, setUserId] = useState(typeof (location.state) !== 'undefined' && typeof (location.state.userId) !== 'undefined' ? location.state.userId : '')
  const [childUserArr, setChildUserArr] = useState([])

 
  const onChangeCompany = tab => {
    if (tab !== companySelected) {
      setCompanySelected(tab)
    }
  }
  useEffect(() => {
    if (typeof (location.state) !== 'undefined' && typeof (location.state.role) !== 'undefined' && typeof (location.state.editable) !== 'undefined') {
      setRole(location.state.role)
      setEditable(location.state.editable)
    } else {
      Utils.goBackHome()
    }
  }, [])

  return (
    <Row>
      <Col sm="12">
        <Nav tabs>
          {
            COMPANIES.map((item) => (
              <NavItem key={item.id}>
                <NavLink className={classnames({active: companySelected === item.id})} onClick={() => {onChangeCompany(item.id)}}>{item.name}</NavLink>
              </NavItem>
            ))
          }
        </Nav>
        <TabContent className="py-50" activeTab={companySelected}>
          <FeeAntinManageBSHView companyId={companySelected} role={role} editable={editable} data={role === 'VIEW' ? location.state.data : ''} userId={userId} childUserArr={childUserArr} />
        </TabContent>
      </Col>
    </Row>
  )
}
export default FeeAntinManageView
