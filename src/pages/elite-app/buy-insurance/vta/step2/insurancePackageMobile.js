import { FormattedMessage } from 'base-app'
import classnames from 'classnames'
import React, { useState } from 'react'
import * as Icon from 'react-feather'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { getKeyLang } from '../../../../../configs/elite-app'
import { INSURANCE_PACKAGE, NAV_ITEMS } from './utility'
const InsurancePackageMobile = ({
  insurancePackage = 'GOI3',
  handleChangeInsurancPackage,
  setFieldValue
}) => {
  const [activeTab, setActiveTab] = useState(insurancePackage)
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  return (
    <div className='insurance-package-mobile'>
      <Nav tabs className='d-flex justify-content-center'>
        {NAV_ITEMS.map((_elt, index) => (
          <NavItem key={index}>
            <NavLink
              className={classnames({ active: activeTab === _elt.value })}
              onClick={() => {
                toggle(_elt.value)
                handleChangeInsurancPackage(_elt.value, setFieldValue)
              }}
            >
              {_elt.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {INSURANCE_PACKAGE.map((_elt, index) => (
          <TabPane tabId={_elt.value} key={index}>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader className='d-flex justify-content-center flex-column'>
                  <span className='text-center mb-1'>
                    <Icon.Shield size={30} color={'#28c77c'} />
                  </span>
                  <h2 className={`${'success'} text-white font-weight-bold`}>
                    <FormattedMessage
                      id={getKeyLang('insurance.vta.step2.card.title')}
                    />
                    <span>{index + 1}</span>
                  </h2>
                </CardHeader>
                <CardBody>
                  <h6
                    className={`
                    text-green-light font-weight-bold text-center mb-2`}
                  >
                    {_elt.interestTitle}
                  </h6>
                  <div className='text-center mb-2'>{_elt.interestMoney}</div>
                  <h6
                    className={`text-green-light font-weight-bold text-center mb-2`}
                  >
                    {_elt.fundTitle}
                  </h6>
                  <div className='text-center mb-2 font-weight-bold'>
                    {_elt.deadTitle}
                  </div>
                  <div className='text-center mb-2'>{_elt.deadMoney}</div>
                  <div className='font-weight-bold text-center mb-2 font-weight-bold'>
                    {_elt.hospitalTitle}
                  </div>
                  <div className='text-center mb-2'>{_elt.hospitalMoney}</div>
                  <div className='font-weight-bold text-center mb-2 font-weight-bold'>
                    {_elt.treatmentTitle}
                  </div>
                  <div className='text-center mb-2'>{_elt.treatmentMoney}</div>
                </CardBody>
              </Card>
            </Col>
          </TabPane>
        ))}
      </TabContent>
    </div>
  )
}

export default InsurancePackageMobile
