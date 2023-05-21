import React, { useState } from 'react'
import CustomModal from './Modal'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/insurance-app'

/**
 * @example
    const [openModal, CustomModal] = useCustomModal("default_title", "default_content")
    const setupObj = {
        isOpen: true,
        title: "UPDATED_TITLE is here",
        content: "UPDATED_CONTENT is here"
    }
    openModal(setupObj)
    return (
        <div>{CustomModal}</div>
    )
 */

const useCustomModal = (modalTitle = "title", modalContent, modalFooter, okBtnLabel, className, cssStyled) => {
    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        title: modalTitle,
        content: modalContent,
        footer: modalFooter,
        isCentered: false,
        titleStyled: cssStyled
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
            _state.isCentered = setup.isCentered
            _state.isOpen = setup.isOpen

            _state.content = setup.content
            _state.titleStyled = setup.titleStyled

            if (setup.title) {
                _state.title = setup.title
            }

            return _state
        })
    }

    return ([
        setupModal,
        <CustomModal
            isOpen={modalStatus.isOpen}
            modalTitle={modalStatus.title}
            modalContent={modalStatus.content}
            modalFooter={modalStatus.footer}
            cssStyled={modalStatus.titleStyled}
            okBtnLabel={okBtnLabel || <FormattedMessage id={getKeyLang("ButtonOK")} />}
            okAction={React.useCallback(() => toggleModal(false), [])}
            className={className}
            isCentered={modalStatus.isCentered}
        />
    ])
}

export default useCustomModal