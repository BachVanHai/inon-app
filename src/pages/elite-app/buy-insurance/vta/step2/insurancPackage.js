import { FormattedMessage } from 'base-app'
import React from 'react'
import * as Icon from 'react-feather'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap'
import { getKeyLang } from '../../../../../configs/elite-app'
import { INSURANCE_PACKAGE } from './utility'

const InsurancPackage = ({
  insurancePackage,
  handleChangeInsurancPackage,
  setFieldValue
}) => {
  return (
    <Row className={'insurance-package-desktop'}>
      {INSURANCE_PACKAGE.map((_elt, index) => (
        <Col xs={12} md={4} key={index}>
          <Card
            className={`${
              insurancePackage === _elt.value ? 'card-active' : ''
            } cursor-pointer`}
            onClick={() =>
              handleChangeInsurancPackage(_elt.value, setFieldValue)
            }
          >
            <CardHeader className='d-flex justify-content-center flex-column'>
              <span className='text-center mb-1'>
                <Icon.Shield
                  size={30}
                  color={_elt.value === insurancePackage ? '#fff' : '#28c77c'}
                />
              </span>
              <h2
                className={`${
                  insurancePackage === _elt.value ? 'text-white' : 'success'
                } text-white font-weight-bold`}
              >
                <FormattedMessage
                  id={getKeyLang('insurance.vta.step2.card.title')}
                />
                <span>{index + 1}</span>
              </h2>
              <h3
                className={`${
                  insurancePackage === _elt.value ? 'text-white' : 'text-dark'
                }`}
              >
                ({_elt.type})
              </h3>
            </CardHeader>
            <CardBody>
              <h6
                className={`${
                  insurancePackage === _elt.value ? 'text-yellow' : 'text-dark'
                } font-weight-bold text-center mb-2`}
              >
                {_elt.interestTitle}
              </h6>
              <div className='text-center mb-2'>{_elt.interestMoney}</div>
              <h6
                className={`${
                  insurancePackage === _elt.value ? 'text-yellow' : 'text-dark'
                } font-weight-bold text-center mb-2`}
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
            <CardFooter className='d-flex justify-content-center'>
              {insurancePackage !== _elt.value ? (
                <Button
                  onClick={() =>
                    handleChangeInsurancPackage(_elt.value, setFieldValue)
                  }
                >
                  <FormattedMessage
                    id={getKeyLang('insurance.vta.selectPackage')}
                  />
                </Button>
              ) : (
                <Icon.Check size={40} color='#ffd503' />
              )}
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default InsurancPackage
