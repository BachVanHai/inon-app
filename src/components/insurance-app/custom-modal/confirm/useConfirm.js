import React, { useState } from 'react'
import Confirm from './Confirm'

/**
 * @example
    const [openModal, ConfirmModal] = useConfirm(
        intl.formatMessage({ id: getKeyLang(`confirm.title.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.content.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.yesBtnLabel.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.noBtnLabel.newContract`) }),
        false
    )
    const setupObj = {
        title: "update_title is here",
        yesAction: () => {
            // do something
        },
        noAction: () => {
            // do something
        },
        content: "UPDATED_CONTENT is here"
    }
    openModal(setupObj)
    return (
        <div>{ConfirmModal}</div>
    )
 */

const useConfirm = (modalTitle = "title", modalContent = "content", yesBtnLabel = "yes", noBtnLabel = "no", isClickAnyWhereStill = false, cssStyled = "", titleStyled = "") => {
    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        title: modalTitle,
        content: modalContent,
        yesBtnLabel: yesBtnLabel,
        noBtnLabel: noBtnLabel,
        noAction: null,
        yesAction: null,
        isCentered: false,
    })

    const toggleModal = (isOpen) => {
        setModalStatus((state) => {
            let _state = { ...state }
            _state.isOpen = isOpen
            return _state
        })
    }

    const setupModal = (setup) => {
        setModalStatus((state) => {
            let _state = { ...state }
            _state.isOpen = true
            _state.isCentered = setup.isCentered
            _state.yesAction = () => { toggleModal(false) }
            _state.noAction = () => { toggleModal(false) }

            if (setup.yesAction) {
                _state.yesAction = () => {
                    const shouldStillOpen = setup.yesAction()
                    toggleModal(shouldStillOpen)
                }
            }
            if (setup.noAction) {
                _state.noAction = () => {
                    const _shouldStillOpen = setup.noAction()
                    toggleModal(_shouldStillOpen)
                }
            }

            if (setup.content) {
                _state.content = setup.content
            }

            if (setup.title) {
                _state.title = setup.title
            }

            return _state
        })
    }

    return ([
        setupModal,
        <Confirm
            isOpen={modalStatus.isOpen}
            yesBtnLabel={modalStatus.yesBtnLabel} noBtnLabel={modalStatus.noBtnLabel}
            modalTitle={modalStatus.title} modalContent={modalStatus.content}
            yesAction={modalStatus.yesAction}
            noAction={modalStatus.noAction}
            cssStyled={cssStyled}
            titleStyled={titleStyled}
            isClickAnyWhereStill={isClickAnyWhereStill}
            toggleModal={toggleModal}
            isCentered={modalStatus.isCentered}
        />
    ])
}

export default useConfirm