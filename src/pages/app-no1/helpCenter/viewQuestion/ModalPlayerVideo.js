import React from 'react'
import ReactPlayer from 'react-player'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalPlayerVideo = ({ isOpen, closeModal, original }) => {
  return (
    <Modal isOpen={isOpen} size="xl">
      <ModalHeader toggle={closeModal}></ModalHeader>
      <ModalBody>
        <ReactPlayer
          url={original !== null ? original : null}
          className='react-player'
          playing
          width="100%"
          height="calc(100vh - 100px)"
          controls={false}
        />
      </ModalBody>
    </Modal>
  )
}

export default ModalPlayerVideo
