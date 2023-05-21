import { FormattedMessage } from 'base-app'
import React from 'react'
import { Cpu } from 'react-feather'
import { useIntl } from 'react-intl'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../configs/insurance-app'
import { intlConvertToVnd } from '../../../../../ultity'
import { KEY_PACKAGE_SELECTED} from './formikConfig'
import { subStringMoney } from './utility'

const PopupInfoInsurance = ({ isOpen, toggle, getFieldMeta ,packages ,packageShowDetail }) => {
  const intl = useIntl()
  const insurance = packages.find((elt) => elt.value === packageShowDetail)
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader
        cssModule={{ 'modal-title': 'w-100 text-center mt-1' }}
        toggle={toggle}
      >
        {insurance?.msgField}
      </ModalHeader>
      <ModalBody>
        <h5 className='text-center font-weight-bold mb-2'>
          <FormattedMessage
            id={getKeyLang('healthCareInsurance.interestInsurancePersonal')}
          />
        </h5>
        <Row >
          <Col md="8" xs="12" className='mb-2' >
            <FormattedMessage id={getKeyLang('healthCareInsurance.die')} />
          </Col>
          <Col className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2' md="4" xs="12">{intlConvertToVnd(insurance?.fee1,intl)} VNĐ</Col>
        </Row>
        <Row >
          <Col  md="8" xs="12" className='mb-2'>
            <FormattedMessage id={getKeyLang('healthCareInsurance.accident')} />
          </Col>
          <Col className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'  md="4" xs="12">{intlConvertToVnd(insurance?.fee2 ,intl)} VNĐ</Col>
        </Row>
        <Row>
          <Col  md="8" xs="12" className='mb-2'>
            <FormattedMessage id={getKeyLang('healthCareInsurance.surgery')} />
          </Col>
          <Col className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2' md="4" xs="12">{intlConvertToVnd(insurance?.fee3,intl)} VNĐ</Col>
        </Row>
        <h5 className='text-center font-weight-bold mb-2'>
          <FormattedMessage
            id={getKeyLang('healthCareInsurance.interestCard')}
          />
        </h5>
        <Row>
          <Col md="8" xs="12" className='mb-2'>
            <FormattedMessage id={getKeyLang('healthCareInsurance.ATM')} />
          </Col>
          <Col className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2' md="4" xs="12">
            {subStringMoney(insurance?.fee4,2)}trđ/vụ;tối đa {subStringMoney(insurance?.maxFee4,2)}trđ/năm
          </Col>
        </Row>
        <Row>
          <Col md="8" xs="12" className='mb-2'>
            <FormattedMessage id={getKeyLang('healthCareInsurance.cheat')} />
          </Col>
          <Col className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2' md="4" xs="12">
            {subStringMoney(insurance?.fee5,2)}trđ/vụ;tối đa {subStringMoney(insurance?.maxFee5,2)}trđ/năm
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default PopupInfoInsurance
