import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader
} from 'reactstrap'
import {
  FormattedMessage,
  AppId
} from 'base-app'
import mediaImg1 from '../../../../assets/images/insurance-app/icons/icon-car.png'
import mediaImg2 from '../../../../assets/images/insurance-app/icons/icon-motor.png'
import mediaImg3 from '../../../../assets/images/insurance-app/icons/icon-home-safety.png'
import mediaImg4 from '../../../../assets/images/insurance-app/icons/travel.png'
import { history } from '../../../../history'
import { useSelector } from 'react-redux'

const FeeManageBSHComponent = (props) => {

  const [editable, setEditable] = useState(props.role === 'SYSTEM' ? true : false)
  const roles = useSelector((state) => state.navbar.roles)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='letter-uppercase'><FormattedMessage
          id={`${AppId.INSURANCE_APP}.InsuranceSelect`} /></CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='12'>
            <span className='label-text align-middle'> <b><FormattedMessage
              id={`${AppId.INSURANCE_APP}.InsuranceVehicle`} /></b></span>
            <br />
          </Col>
          {(props.role === 'SYSTEM' && roles.find(el => el.menuPath === '/insurance-fee/system/car'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === '/insurance-fee/lx-partner/car'))
          || (props.role === 'INDIVIDUAL' && roles.find(el => el.menuPath === '/insurance-fee/personal/car'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === 'insurance-fee/customer/car'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance-fee/partner/car'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance/insurance-fee/car')
          || (props).role === 'ALL' && roles.find(el => el.menuPath === '/insurance-fee/all/car')) ?

            <Col md='6' sm='12'>
              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={() =>
                  // history.push("/fee/car")
                  history.push({
                    pathname: '/insurance/insurance-fee/feeCar',
                    state: { role: props.role, editable: editable }
                  })
                }>
                <img
                  className='rounded-circle mr-50'
                  src={mediaImg1}
                  alt='user avatar'
                  height='58'
                  width='58'
                />
                <span><FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceCar`} /></span>
              </div>
            </Col>
            : null}
          {(props.role === 'SYSTEM' && roles.find(el => el.menuPath === '/insurance-fee/system/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === '/insurance-fee/lx-partner/motobike'))
          || (props.role === 'INDIVIDUAL' && roles.find(el => el.menuPath === '/insurance-fee/personal/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === 'insurance-fee/customer/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance-fee/partner/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance/insurance-fee/motobike'))
          || (props.role === 'ALL' && roles.find(el => el.menuPath === '/insurance-fee/all/motobike')) ?
            <Col md='6' sm='12'>

              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={() =>
                  history.push({
                    pathname: '/insurance/insurance-fee/feeMotor',
                    state: { role: props.role, editable: editable }
                  })
                }>
                <img
                  className='rounded-circle mr-50'
                  src={mediaImg2}
                  alt='user avatar'
                  height='58'
                  width='58'
                />
                <span><FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceMotor`} /></span>
              </div>
            </Col>
            : null}
        </Row>
        <Row>
        <Col sm='12'>
            <span className='label-text align-middle'> <b><FormattedMessage
              id={`${AppId.INSURANCE_APP}.peopleInsurance`} /></b></span>
            <br />
          </Col>
          {(props.role === 'SYSTEM' && roles.find(el => el.menuPath === '/insurance-fee/system/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === '/insurance-fee/lx-partner/motobike'))
          || (props.role === 'INDIVIDUAL' && roles.find(el => el.menuPath === '/insurance-fee/personal/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === 'insurance-fee/customer/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance-fee/partner/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance/insurance-fee/motobike'))
          || (props.role === 'ALL' && roles.find(el => el.menuPath === '/insurance-fee/all/motobike')) ?
            <Col md='6' sm='12'>

              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={() =>
                  history.push({
                    pathname: '/insurance/insurance-fee/feeAnTin',
                    state: { role: props.role, editable: editable }
                  })
                }>
                <img
                  className='rounded-circle mr-50'
                  src={mediaImg3}
                  alt='user avatar'
                  height='58'
                  width='58'
                />
                <span><FormattedMessage id={`${AppId.INSURANCE_APP}.antin.title`} /></span>
              </div>
            </Col>
            : null}
        </Row>
        <Row>
        <Col sm='12'>
            <span className='label-text align-middle'> <b><FormattedMessage
              id={`${AppId.INSURANCE_APP}.travelInsurances`} /></b></span>
            <br />
          </Col>
          {/* // BH DU LICH QUOC TE */}
          {(props.role === 'SYSTEM' && roles.find(el => el.menuPath === '/insurance-fee/system/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === '/insurance-fee/lx-partner/motobike'))
          || (props.role === 'INDIVIDUAL' && roles.find(el => el.menuPath === '/insurance-fee/personal/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === 'insurance-fee/customer/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance-fee/partner/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance/insurance-fee/motobike'))
          || (props.role === 'ALL' && roles.find(el => el.menuPath === '/insurance-fee/all/motobike')) ?
            <Col md='6' sm='12'>

              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={() =>
                  history.push({
                    pathname: '/insurance/insurance-fee/feeTravelWordwide',
                    state: { role: props.role, editable: editable }
                  })
                }>
                <img
                  className='rounded-circle mr-50'
                  src={mediaImg4}
                  alt='user avatar'
                  height='50'
                  width='50'
                />
                <span><FormattedMessage id={`${AppId.INSURANCE_APP}.travelInsurance`} /></span>
              </div>
            </Col>
            : null}
            {/* // BH DU LICH TRONG NUOC */}
            {(props.role === 'SYSTEM' && roles.find(el => el.menuPath === '/insurance-fee/system/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === '/insurance-fee/lx-partner/motobike'))
          || (props.role === 'INDIVIDUAL' && roles.find(el => el.menuPath === '/insurance-fee/personal/motobike'))
          || (props.role === 'NONRESIDENT' && roles.find(el => el.menuPath === 'insurance-fee/customer/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance-fee/partner/motobike'))
          || (props.role === 'AGENCY' && roles.find(el => el.menuPath === '/insurance/insurance-fee/motobike'))
          || (props.role === 'ALL' && roles.find(el => el.menuPath === '/insurance-fee/all/motobike')) ?
            <Col md='6' sm='12'>

              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={() =>
                  history.push({
                    pathname: '/insurance/insurance-fee/feeTravelDomestic',
                    state: { role: props.role, editable: editable }
                  })
                }>
                <img
                  className='rounded-circle mr-50'
                  src={mediaImg4}
                  alt='user avatar'
                  height='50'
                  width='50'
                />
                <span><FormattedMessage id={`${AppId.INSURANCE_APP}.travel.domestic`} /></span>
              </div>
            </Col>
            : null}
        </Row>
      </CardBody>
    </Card>
  )
}
export default FeeManageBSHComponent
