import { Checkbox, FormattedMessage } from 'base-app'
import React from 'react'
import { Check } from 'react-feather'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'

const PopupConditionBuyInsurance = ({ isOpen, togglePopup }) => {
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='lg'>
      <ModalHeader toggle={togglePopup}>
        <span className='font-weight-bold'>
          <FormattedMessage id={getKeyLang('goods.title')} />
        </span>
      </ModalHeader>
      <ModalBody className='mt-1 mb-1'>
        <span className='font-weight-bold mb-2'>
          <FormattedMessage id={getKeyLang('goods.condition')} />
        </span>
        <div className='d-flex align-items-center mb-1 mt-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition1')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition2')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition3')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition4')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition5')} />
        </div>
        <div className='d-flex align-items-center mb-1'>
          <Checkbox icon={<Check className='vx-icon' size={16} />} checked />{' '}
          <FormattedMessage id={getKeyLang('goods.condition6')} />
        </div>
     
      </ModalBody>
      <ModalFooter className='d-flex justify-content-end'>
        {/* <Button color='primary'>Mua ngay</Button> */}
        <a
          href='https://sit2.inon.vn/resources/pdf/InOn%20-%20Quy%20t%E1%BA%AFc%20B%E1%BA%A3o%20hi%E1%BB%83m%20h%C3%A3ng%20h%C3%B3a.pdf'
          target={'_blank'}
        >
          <u className='cursor-pointer text-dark'>Xem thêm quy tắc sản phẩm</u>
        </a>
      </ModalFooter>
    </Modal>
  )
}

export default PopupConditionBuyInsurance
