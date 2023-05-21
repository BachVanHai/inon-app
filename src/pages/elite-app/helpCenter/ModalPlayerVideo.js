import React from 'react'
import ReactPlayer from 'react-player'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalPlayerVideo = ({ isOpen, closeModal, original }) => {
  return (
    <Modal isOpen={isOpen} size="lg" className="modal-dialog-centered">
      <ModalHeader toggle={closeModal}></ModalHeader>
      <ModalBody>
        <ReactPlayer
          url={original !== null ? original : null}
          className='react-player'
          width="100%"
          // height="auto"
          controls={true}
          light={true}
        />
      </ModalBody>
    </Modal>
  )
}

export default ModalPlayerVideo
