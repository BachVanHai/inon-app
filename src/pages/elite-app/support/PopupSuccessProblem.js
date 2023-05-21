import { FormattedMessage } from 'base-app'
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../../configs/elite-app'

const PopupSuccessProblem = ({ isOpenModal, closePopUp }) => {
  return (
    <Modal isOpen={isOpenModal} className='modal-dialog-centered'>
      <ModalHeader toggle={closePopUp} cssModule={{'modal-title': 'w-100 text-center'}}>
      <div className="d-flex justify-content-center text-uppercase font-weight-bold">
      <FormattedMessage id={getKeyLang("support.create.popup.title")} />
      </div>
      </ModalHeader>
      <ModalBody>
        <FormattedMessage id={getKeyLang('suppot.create.requestFinish')} />
      </ModalBody>
    </Modal>
  )
}

export default PopupSuccessProblem
