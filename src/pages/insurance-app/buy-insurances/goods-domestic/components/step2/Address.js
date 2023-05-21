import { BaseFormGroup } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
  KEY_END_POINT,
  KEY_START_POINT
} from './formikConfig'

const Address = ({ getFieldMeta, setFieldValue , errors , touched }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  return (
    <Row className='mt-2'>
      <Col md='12' xs='12' className='mb-2'>
        {/* ============== điểm đi ================== */}
        <BaseFormGroup
          fieldName={KEY_START_POINT}
          errors={errors}
          touched={touched}
          messageId={getKeyLang(`travel.domestic.pointOfDeparture`)}
        />
      </Col>
      <Col md='12' xs='12' className='mb-2'>
        {/* ============== điểm đến ================== */}
        <BaseFormGroup
          fieldName={KEY_END_POINT}
          errors={errors}
          touched={touched}
          messageId={getKeyLang(`travel.domestic.destination`)}
        />
      </Col>
    </Row>
  )
}

export default Address
