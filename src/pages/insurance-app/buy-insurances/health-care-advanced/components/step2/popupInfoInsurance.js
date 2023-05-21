import { FormattedMessage } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { intlConvertToVnd } from '../../../../../../ultity'
import { subStringMoney } from './utility'

const PopupInfoInsurance = ({
  isOpen,
  toggle,
  getFieldMeta,
  packages,
  packageShowDetail
}) => {
  const intl = useIntl()
  const insurance = packages.find((elt) => elt.value === packageShowDetail)
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader
      className='font-weight-bold text-uppercase'
        cssModule={{ 'modal-title': 'w-100 text-center mt-1' }}
        toggle={toggle}
      >
        {insurance?.msgField}
      </ModalHeader>
      <ModalBody>
        <h5 className='font-weight-bold mb-2'>
          <FormattedMessage
            id={getKeyLang('heath-care-advanced.detail.range.bassic')}
          />
        </h5>
        <Row>
          <Col md='8' xs='12' className='mb-2 font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('heath-care-advanced.detail.fee1')}
            />
          </Col>
          <Col
            className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
            md='4'
            xs='12'
          >
            {intlConvertToVnd(insurance?.fee1, intl)} VNĐ
          </Col>
        </Row>
        <Row>
          <Col md='8' xs='12' className='mb-2 font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('heath-care-advanced.detail.fee2')}
            />
          </Col>
          <Col
            className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
            md='4'
            xs='12'
          >
            {intlConvertToVnd(insurance?.fee2, intl)} VNĐ
          </Col>
        </Row>
        <Row>
          <Col md='8' xs='12' className='mb-2 font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('heath-care-advanced.detail.fee3')}
            />
          </Col>
          <Col
            className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
            md='4'
            xs='12'
          >
            {intlConvertToVnd(insurance?.fee3, intl)} VNĐ
          </Col>
        </Row>
        <Row>
          <Col md='8' xs='12' className='mb-2 font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('heath-care-advanced.detail.fee4')}
            />
          </Col>
          <Col
            className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
            md='4'
            xs='12'
          >
            {intlConvertToVnd(insurance?.fee4, intl)} VNĐ
          </Col>
        </Row>
        <div>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee5')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee5, intl)} VNĐ
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee6')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee6, intl)} VNĐ
            </Col>
          </Row>
          <div className='mb-2'>
            <FormattedMessage
              id={getKeyLang('heath-care-advanced.detail.moreBenifit')}
            />
          </div>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee7')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee7, intl)} VNĐ
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee8')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee8, intl)} VNĐ
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee9')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee9, intl)} VNĐ
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee10')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee10, intl)} VNĐ
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee11')}
              />
            </Col>
          </Row>
          <Row>
            <Col md='8' xs='12' className='mb-2'>
              <FormattedMessage
                id={getKeyLang('heath-care-advanced.detail.fee12')}
              />
            </Col>
            <Col
              className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
              md='4'
              xs='12'
            >
              {intlConvertToVnd(insurance?.fee11, intl)} VNĐ
            </Col>
          </Row>
        </div>
        {insurance.rangeAddons && (
          <>
            <Row>
              <Col md='8' xs='12' className='mb-2 font-weight-bold text-lg-1'>
                <FormattedMessage
                  id={getKeyLang('heath-care-advanced.detail.range.advanced')}
                />
              </Col>
            </Row>
            <Row>
              <Col md='8' xs='12' className='mb-2'>
                <FormattedMessage
                  id={getKeyLang('heath-care-advanced.detail.fee13')}
                />
              </Col>
              <Col
                className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
                md='4'
                xs='12'
              >
                {intlConvertToVnd(insurance?.fee12, intl)} VNĐ
              </Col>
            </Row>
            <Row>
              <Col md='8' xs='12' className='mb-2'>
                <FormattedMessage
                  id={getKeyLang('heath-care-advanced.detail.fee14')}
                />
              </Col>
              <Col
                className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
                md='4'
                xs='12'
              >
                {intlConvertToVnd(insurance?.fee13, intl)} VNĐ
              </Col>
            </Row>
            <Row>
              <Col md='8' xs='12' className='mb-2'>
                <FormattedMessage
                  id={getKeyLang('heath-care-advanced.detail.fee15')}
                />
              </Col>
              <Col
                className='text-lg-right text-md-right text-sm-left font-weight-bold mb-2'
                md='4'
                xs='12'
              >
                {intlConvertToVnd(insurance?.fee14, intl)} VNĐ
              </Col>
            </Row>
          </>
        )}
        <div>
          <span className='italic primary  font-weight-bold'>
            <FormattedMessage id={getKeyLang(insurance?.footerText)} />{' '}
          </span>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default PopupInfoInsurance
