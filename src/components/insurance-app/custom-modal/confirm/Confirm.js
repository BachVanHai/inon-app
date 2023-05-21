import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ConfirmModal = ({ isOpen, yesBtnLabel, noBtnLabel, yesAction, noAction, modalTitle,
    modalContent, toggleModal, isClickAnyWhereStill, isCentered, className, cssStyled, titleStyled }) => {
    const handleYesAction = () => {
        yesAction && yesAction()
    }

    const handleNoAction = () => {
        noAction && noAction()
    }

    const decideClickAnyWhere = () => {
        if (isClickAnyWhereStill) {
            return () => toggleModal(true)
        }
        return () => toggleModal(false)
    }

    return (
        <Modal toggle={decideClickAnyWhere()} isOpen={isOpen} className={className} centered={isCentered}>
            <ModalHeader cssModule={{ 'modal-title': cssStyled || '' }}>
                <div className={titleStyled}>
                    {
                        modalTitle
                    }
                </div>
            </ModalHeader>

            <ModalBody>
                {
                    modalContent
                }
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={handleYesAction}>
                    {
                        yesBtnLabel
                    }
                </Button>
                <span>&nbsp;</span>
                <Button color="secondary" onClick={handleNoAction}>
                    {
                        noBtnLabel
                    }
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmModal