import { FormattedMessage } from 'base-app'
import React from 'react'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/elite-app'
import { Utils } from '../../../../ultity'
const FeeColStyled = styled.div`
  .payment-content {
    color: #113934;
    .payment-content-label {
      font-weight: bold;
      margin-bottom: 26px;
      color: #113934;
    }
  }
`
const FeeComp = ({ dataFees, companyId }) => {
  const totalFee = dataFees.find(
    (_elt) => _elt.companyId === companyId
  )?.totalFee
  return (
    <FeeColStyled className='mt-4'>
      <Row className='mb-2 mt-2'>
        <Col xs={12} md={12} className=''>
          <div
            className='d-flex align-items-center justify-content-between font-medium-5 font-weight-bold text-primary-highlight letter-uppercase'
            style={{ color: '#2B7E6C' }}
          >
            <span>
              <FormattedMessage id={getKeyLang(`insurance.fee.totalFee`)} />
            </span>{' '}
            <div>
              {!isNaN(totalFee) || totalFee ? Utils.numberFormat(totalFee) : 0}
            </div>
          </div>
        </Col>
      </Row>
    </FeeColStyled>
  )
}

export default FeeComp
