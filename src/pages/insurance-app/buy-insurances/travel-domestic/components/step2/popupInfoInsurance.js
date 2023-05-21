import React from 'react'
import { useIntl } from 'react-intl'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { CardText } from 'reactstrap'
import styled from 'styled-components'
import { PACKAGE_INSURANCE } from './utility'
const TablePackageIns = styled.div`
  .row {
    border-radius: 5px;
  }
  .col-8 {
    padding: 2px !important;
  }
  .col-4 {
    padding: 2px !important;
  }
  .table__header {
    background-color: #7eb559;
  }
`
const ContentColStyled = styled(Row)`
  .tabel__content {
    background-color: ${(p) =>
      p.indexContent % 2 == 0 ? '#cfd5ea' : '#e9ebf5'};
    height: 100% !important;
  }
  .col-8 {
    padding: 2px !important;
  }
  .col-4 {
    padding: 2px !important;
  }
  .col-3 {
    padding: 2px !important;
  }
`
const PopupInfoInsurance = ({ isOpen, toggle, packageType = 'BASIC' }) => {
  const intl = useIntl()
  const { name } = PACKAGE_INSURANCE.find((_elt) => _elt.type === packageType)
  const renderPackageBASIC = (type) => {
    const { contents, leftHeader, rightHeader, rightHeader2 } =
      PACKAGE_INSURANCE.find((_elt) => _elt.type === type)
    return (
      <TablePackageIns>
        <Row>
          <Col xs={4} md={4}>
            <div className='table__header p-1 text-white font-weight-bold'>{leftHeader}</div>
          </Col>
          <Col
            xs={type === 'ADVANCE_2' ? 4 : 8}
            md={type === 'ADVANCE_2' ? 4 : 8}
          >
            <div className='table__header p-1 text-white font-weight-bold'>{rightHeader}</div>
          </Col>
          {type === 'ADVANCE_2' ? (
            <Col xs={4} md={4}>
              <div className='table__header p-1 text-white font-weight-bold'>{rightHeader2}</div>
            </Col>
          ) : null}
        </Row>
        {contents.map((_elt, index) => (
          <ContentColStyled key={index} indexContent={index}>
            <Col xs={4} md={4}>
              <div
                className='p-1 tabel__content font-weight-bold'
                dangerouslySetInnerHTML={{
                  __html: _elt.title
                }}
              ></div>
            </Col>
            <Col
              xs={type === 'ADVANCE_2' ? 4 :8}
              md={type === 'ADVANCE_2' ? 4 : 8}
            >
              <div
                className='p-1 tabel__content'
                dangerouslySetInnerHTML={{
                  __html: _elt?.content
                }}
              ></div>
            </Col>
            {type === 'ADVANCE_2' ? (
              <Col xs={4} md={4}>
                <div
                  className='p-1 tabel__content'
                  dangerouslySetInnerHTML={{
                    __html: _elt.contentSecond
                  }}
                ></div>
              </Col>
            ) : null}
          </ContentColStyled>
        ))}
      </TablePackageIns>
    )
  }
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' size='xl'>
      <ModalHeader
        cssModule={{
          'modal-title':
            'w-100 text-center mt-1 font-weight-bold text-uppercase'
        }}
        toggle={toggle}
      >
        {name || ""}
      </ModalHeader>
      <ModalBody className='p-2'>
        {packageType === 'BASIC' ? (
          renderPackageBASIC('BASIC')
        ) : (
          <>
            <CardText tag='h4' className='font-weight-bold mb-2'>
              Quyền lợi bảo hiểm cơ bản :{' '}
            </CardText>
            {renderPackageBASIC('ADVANCE')}
            <CardText tag='h4' className='font-weight-bold mb-2 mt-2'>
              Quyền lợi bảo hiểm bổ sung :{' '}
            </CardText>
            {renderPackageBASIC('ADVANCE_2')}
          </>
        )}
      </ModalBody>
    </Modal>
  )
}

export default PopupInfoInsurance
