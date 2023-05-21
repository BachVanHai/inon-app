import { Checkbox, FormattedMessage, Button } from 'base-app'
import React, { useState } from 'react'
import { Check } from 'react-feather'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/elite-app'
const ModalStyled = styled(Modal)`
  .modal-content {
    display: flex !important;
    flex-direction: column !important;
    background: #fff9ec !important;
    border: 1px solid #ffb800 !important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
    .modal-header {
      background: #fff9ec !important;
    }
    button {
      border-radius: 16px !important;
      font-weight: bold !important;
      background: #ff9900 !important;
      color: white !important;
    }
  }
`
const PopupInfoBuyInsurance = () => {
  const [isOpen, setIsOpen] = useState(true)
  const ClosePopup = () => {
    setIsOpen(false)
  }
  return (
    <ModalStyled isOpen={isOpen} size='lg' className='modal-dialog-centered'>
      <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }}>
        <span className='font-weight-bold'>
          <FormattedMessage id={getKeyLang('insurance.tnds')} />
        </span>
      </ModalHeader>
      <ModalBody className='mb-1'>
        <ul>
          <li className='mb-2'>
            <FormattedMessage id={getKeyLang('buyNewIns.condition1')} />
          </li>
          <li className='mb-2'>
            <FormattedMessage id={getKeyLang('buyNewIns.condition2')} />
          </li>
          <li className='mb-2'>
            <FormattedMessage id={getKeyLang('buyNewIns.condition3')} />
          </li>
        </ul>
        <div class='d-flex justify-content-center'>
          {' '}
          <Button onClick={ClosePopup} color='primary'>
            Tôi đã hiểu !
          </Button>
        </div>
      </ModalBody>
    </ModalStyled>
  )
}

export default PopupInfoBuyInsurance
