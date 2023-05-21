import React, { useEffect } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import styled from 'styled-components'
import { CHTG } from './utility'
const ModalBodyStyled = styled(ModalBody)`
  padding-left: 25px;
  padding-right: 25px;
  img {
    display: block;
    width: 100%;
  }
`
const DetailModal = ({ isOpen, closeDetailModal, original }) => {
  useEffect(() => {}, [original])
  return (
    <Modal
      isOpen={isOpen}
      className='modal-dialog-centered'
      toggle={closeDetailModal}
    >
      <ModalHeader toggle={closeDetailModal}>{original.question}</ModalHeader>
      <ModalBodyStyled>
        {original.categoryQuestionType === CHTG ? (
          <Row>
            <p dangerouslySetInnerHTML={{ __html:original.resultText  }}></p>
          </Row>
        ) : (
          <Row>
            <Col md={6} className='text-center'>
              <a
                href={original.rsLinkYT !== '' ? original.rsLinkYT : null}
                target='_blank'
              >
                Link Video
              </a>
            </Col>
            <Col
              md={6}
              style={{ borderLeft: '1px solid #333' }}
              className='text-center'
            >
              <a
                href={original.rsLinkPDF !== '' ? original.rsLinkPDF : null}
                target='_blank'
              >
                Link File PDF
              </a>
            </Col>
          </Row>
        )}
      </ModalBodyStyled>
    </Modal>
  )
}

export default DetailModal
