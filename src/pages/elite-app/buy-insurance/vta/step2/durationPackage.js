import { FormattedMessage, Radio } from 'base-app'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../configs/elite-app'
import { DURATION_PACKAGE, FeeStyled } from './utility'

const DurationPackage = ({
  durationPackage,
  handleChangeDurationPackage,
  setFieldValue
}) => {
  return (
    <FeeStyled>
      <Row className='mb-2 fee-insurance'>
        <Col xs={12} md={3} className='mb-md-2'>
          <span className='font-weight-bold'>
            <FormattedMessage id={getKeyLang('insurance.duration')} />
          </span>
        </Col>
        <Col xs={12} md={9} className='ml-md-2'>
          {DURATION_PACKAGE.map((_elt, index) => (
            <div
              key={index}
              className='d-flex align-items-center mb-1 cursor-pointer'
            >
              <Radio
                checked={durationPackage === _elt.value}
                onChange={() =>
                  handleChangeDurationPackage(_elt.value, setFieldValue)
                }
              />
              <span>{_elt.title}</span>
            </div>
          ))}
        </Col>
      </Row>
    </FeeStyled>
  )
}

export default DurationPackage
