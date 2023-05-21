import { Checkbox, FormattedMessage } from 'base-app'
import React from 'react'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'

const PopupConditionBuyInsurance = ({ isOpen, togglePopup }) => {
  const intl = useIntl()
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader toggle={togglePopup}>
        <span className='font-weight-bold'>
          <FormattedMessage id={getKeyLang('travel.domestic')} />
        </span>
      </ModalHeader>
      <ModalBody className='mt-1 mb-1'>
        <span className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('travel.domestic.condition')} />
        </span>
        <div className='d-flex align-items-center mb-1 mt-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('travel.domestic.condition1')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('travel.domestic.condition2')} />
        </div>
      {/* phạm vi  */}
      <span className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('travel.domestic.range')} />
        </span>
        <div className='d-flex align-items-center mb-1 mt-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('travel.domestic.range.condition1')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: getKeyLang('travel.domestic.range.condition2') }) }} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('travel.domestic.range.condition3')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('travel.domestic.range.condition4')} />
        </div>
      </ModalBody>
      <ModalFooter className='d-flex justify-content-end'>
        {/* <Button color='primary'>Mua ngay</Button> */}
        <a
          href='https://sit2.inon.vn/resources/pdf/domestic-insurance-rules-vn.pdf'
          target={'_blank'}
        >
          <u className='cursor-pointer text-dark'>Xem thêm quy tắc sản phẩm</u>
        </a>
      </ModalFooter>
    </Modal>
  )
}

export default PopupConditionBuyInsurance
