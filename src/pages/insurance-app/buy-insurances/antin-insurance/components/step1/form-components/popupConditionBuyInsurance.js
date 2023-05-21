import { Button, Checkbox, FormattedMessage } from 'base-app'
import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { Check } from 'react-feather'

const PopupConditionBuyInsurance = ({ isOpen, togglePopup }) => {
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader toggle={togglePopup}>
        <span className='font-weight-bold'>
          <FormattedMessage id={getKeyLang('antin.title')} />
        </span>
      </ModalHeader>
      <ModalBody className='mt-1 mb-1'>
        <span className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('antin.condition')} />
        </span>
        <div className='d-flex align-items-center mb-1 mt-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('antin.condition.1')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('antin.condition.2')} />
        </div>
        <div className='d-flex align-items-center mb-2'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('antin.condition.3')} />
        </div>
      </ModalBody>
      <ModalFooter className='d-flex justify-content-end'>
        {/* <Button color='primary'>Mua ngay</Button> */}
        <a
          href='https://sit2.inon.vn/resources/pdf/term-and-condition-BAT.pdf'
          target={'_blank'}
        >
          <u className='cursor-pointer text-dark'>Xem thêm quy tắc sản phẩm</u>
        </a>
      </ModalFooter>
    </Modal>
  )
}

export default PopupConditionBuyInsurance
