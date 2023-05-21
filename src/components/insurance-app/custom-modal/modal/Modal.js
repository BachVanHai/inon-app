import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CustomModal = ({ isOpen, modalTitle, modalContent, modalFooter, okBtnLabel, okAction,
    isCentered, className, cssStyled }) => {
    const handleOK = () => {
        okAction && okAction()
    }

    return (
        <Modal isOpen={isOpen} className={className} centered={isCentered}>
            <ModalHeader cssModule={{
                'modal-title': cssStyled || ''
            }} >
                {
                    modalTitle
                }
            </ModalHeader>

            <ModalBody>
                {
                    modalContent
                }
            </ModalBody>

            <ModalFooter>
                {
                    modalFooter ? modalFooter
                        :
                        <Button color="primary" onClick={handleOK}>
                            {
                                okBtnLabel
                            }
                        </Button>
                }
            </ModalFooter>
        </Modal>
    )
}

export default CustomModal