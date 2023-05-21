import { FormattedMessage } from 'base-app'
import React from 'react'
import { Cpu } from 'react-feather'
import { useIntl } from 'react-intl'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { intlConvertToVnd } from '../../../../../../ultity'
import { KEY_PACKAGE_SELECTED } from './formikConfig'
import { subStringMoney } from './utility'

const PopupInfoInsurance = ({
  isOpen,
  toggle,
  getFieldMeta,
  packages,
  packageShowDetail,
  getTitlePackage
}) => {
  const intl = useIntl()
  const insurance = packages.find((elt) => elt.value === packageShowDetail)
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader
        cssModule={{ 'modal-title': 'w-100 text-center mt-1 font-weight-bold text-uppercase' }}
        toggle={toggle}
      >
        {getTitlePackage(insurance?.name)}
        {/* {insurance?.msgField} */}
      </ModalHeader>
      <ModalBody>
        <h5 className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('travel.interestInsurance1')} />
        </h5>
        <Row>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL1} 
          </Col>
        </Row>
        <Row>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL2} 
          </Col>
        </Row>
        <Row>
          <Col md='8' xs='12' className='mb-2'>
            <FormattedMessage id={getKeyLang('healthCareInsurance.surgery')} />
          </Col>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL3} 
          </Col>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL4}
          </Col>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL5}
          </Col>
        </Row>
        <h5 className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('travel.interestInsurance2')} />
        </h5>
        <Row>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL6}
          </Col>
        </Row>
        <h5 className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('travel.interestInsurance3')} />
        </h5>
        <Row>
          <Col
            className='text-left  mb-2'
            md='12'
            xs='12'
          >
            {insurance?.tienBHQL7}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default PopupInfoInsurance
