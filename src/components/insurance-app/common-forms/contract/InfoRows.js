import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col, Table } from 'reactstrap'
import { getKeyLang } from '../../../../configs/insurance-app'
import { isArrayEmpty } from '../../../../ultity'

const InfoRow = ({
  msgField,
  content,
  isHide,
  addonsSmallRow,
  details,
  detailRows,
  ...props
}) => {
  if (isHide || !content) {
    return null
  }

  return (
    <div {...props}>
      <Row
        className={Array.isArray(details) && details.length > 0 ? 'mb-1' : ''}
      >
        <Col xs={12} md={7}>
          <div className='d-flex align-items-center cursor-pointer font-medium-1 text-bold-600 custom-remove-margin text-title-color letter-uppercase'>
            {msgField}
          </div>
        </Col>
        <Col xs={12} md={5}>
          <div className='react-toggle-wrapper d-inline-block align-middle font-medium-2'>
            {content}
          </div>
        </Col>
      </Row>

      {!isArrayEmpty(details) && (
        <Row>
          {details.map((elt, index) => {
            if (elt.isHide) {
              return null
            }
            return (
              <>
                <Col xs={12} md={6} key={index} className='mt-1'>
                  <span className='text-primary-highlight letter-uppercase font-weight-bold d-flex flex-col text-medium-1 mb-1'>
                    {elt.msgField}
                  </span>
                  <span className=''>{elt.content}</span>
                </Col>
              </>
            )
          })}
          {/* <Col md={4} className="margin-left-14">
                        <Table className="custom-padding-table margin-bottom-14" borderless responsive>
                            <tbody>
                                <tr>
                                    {
                                        details.map((elt, index) => {
                                            if (elt.isHide) {
                                                return null
                                            }
                                            return (
                                                <th className="text-primary-highlight letter-uppercase" key={index}>
                                                    {
                                                        elt.msgField
                                                    }
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                                <tr>
                                    {
                                        details.map((elt, index) => {
                                            if (elt.isHide) {
                                                return null
                                            }
                                            return (
                                                <td align="left" key={index}>
                                                    {
                                                        elt.content
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            </tbody>
                        </Table>
                    </Col> */}
        </Row>
      )}

      {!isArrayEmpty(detailRows) && (
        <Row className="mt-1">
          <Col xs={12} md={12} className="d-flex flex-column">
            <span className='text-primary-highlight letter-uppercase font-weight-bold d-flex flex-col text-medium-1 mb-1'>
              <FormattedMessage id={getKeyLang(`Term`)} />
            </span>
            {detailRows.map((item) =>
              item.isEnable ? (
                  <span key={item.id}>{item.addonCode + ' - ' + item.addonDesc} </span>
              ) : null
            )}
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <div className='border-bottom margin-bottom-14 margin-top-14' />
        </Col>
      </Row>
    </div>
  )
}

const InfoRows = ({ infoRows }) => {
  if (!infoRows) return null

  return infoRows.map((elt, index) => {
    if (!elt) {
      return <InfoRow key={index} isHide={true} />
    }
    return (
      <InfoRow
        isHide={elt.isHide}
        addonsSmallRow={elt.addonsSmallRow}
        msgField={elt.msgField}
        content={elt.content}
        details={elt.details}
        detailRows={elt.detailRows}
        key={index}
      />
    )
  })
}

export default InfoRows
