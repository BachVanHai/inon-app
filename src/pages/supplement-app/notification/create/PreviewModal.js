import { FormattedMessage } from 'base-app';
import React , {useEffect, useState} from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import styled from 'styled-components';
import { getKeyLang } from '../../../../configs/supplement-app';
const PreviewModal = ({isOpen,
    handleClosePreviewModal,
    getFieldMeta }) => {
    const BodyModal = styled(ModalBody)`
    padding : 5px;
    img{
        display : block ;
        width : 100%;
    }
    `
    return (
       <Modal isOpen={isOpen} size="lg" className='modal-dialog-centered'>
           <ModalHeader toggle={handleClosePreviewModal}>
                <FormattedMessage id={getKeyLang('notification.preview.title')}/>
           </ModalHeader>
           <BodyModal>
               <p className="" dangerouslySetInnerHTML={{ __html: getFieldMeta('content').value}}></p>
           </BodyModal>
          
       </Modal>
    )
}

export default PreviewModal
