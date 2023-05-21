import React, { useState } from 'react';
import {
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  CardTitle
} from "reactstrap"
import {
  FormattedMessage,
  AppId
} from 'base-app'
import classnames from "classnames"
import { tabsBasic } from "../../../components/insurance-app/tab/TabSourceCode"
import FeeManageBSHApproveView from './component/FeeManageBSHApproveView'
import icInOn from "../../../assets/images/insurance-app/buy-insurance/ic_inon.png"

const FeeManageApprovePage = (props) => {
  const [activeTab, setActiveTab] = useState("1")
  const [active, setActive] = useState("1")
  // const [role, setRole] = useState(props.location.state.role)
  // const [editable, setEditable] = useState(props.location.state.editable)
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const formik = props.formik;

  return (
    <React.Fragment>

      <div className="margin-bottom-14">
        <span > <img src={icInOn} /> <span className="align-middle letter-uppercase"> <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeManage`} /> </span> {'>'}  <span className="align-middle text-title-color letter-uppercase"> <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeManageApprove`} /></span> </span>
      </div>

      <Row>
        <Col sm="12">
          {/* <Card> */}
          {/* <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader> */}
          {/* <CardBody className="pt-2"> */}
          {/* Hãng bảo hiểm */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: active === "1"
                    })}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    BSH
                    </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="py-50" activeTab={active}>
                <TabPane tabId="1">
                  {/* Hello */}
                  <FeeManageBSHApproveView />
                  {/* role={props.location.state.role}/> */}


                </TabPane>
                {/* <TabPane tabId="2">
                  </TabPane> */}
              </TabContent>
            </TabPane>
            <TabPane className="component-code" tabId="2">
              {tabsBasic}
            </TabPane>
          </TabContent>
          {/* </CardBody> */}
          {/* </Card> */}
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default FeeManageApprovePage
