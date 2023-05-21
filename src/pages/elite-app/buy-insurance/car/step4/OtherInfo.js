import React from 'react'
import { Col, Row } from 'reactstrap'
import { BaseAppConfigs, BaseFormGroup, BaseFormGroupSelect } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'

export const OtherInfo = ({ formik }) => {
  return (
    <>
      <Row>
        <Col xs={12} md={4} className='mb-2'>
          <BaseFormGroupSelect
            messageId='completeInformation.idType'
            fieldName='icType'
            options={BaseAppConfigs.IC_TYPES_OPTIONS}
            errors={formik.errors}
            touched={formik.touched}
            isShowErrorMessage={false}
          />
        </Col>
        <Col xs={12} md={4} className='mb-2'>
          <BaseFormGroup
            messageId='completeInformation.nbrPer'
            fieldName='icNumber'
            errors={formik.errors}
            touched={formik.touched}
            isShowErrorMessage={false}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className='mb-2'>
          <BaseFormGroup
            messageId={getKeyLang('insurance.invoice.buyerName')}
            fieldName='fullName'
            errors={formik.errors}
            touched={formik.touched}
            isShowErrorMessage={false}
          />
        </Col>
        <Col xs={12} md={4} className='mb-2'>
          <BaseFormGroup
            messageId={getKeyLang('insurance.invoice.phoneNumber')}
            fieldName='phoneNumber'
            errors={formik.errors}
            touched={formik.touched}
            isShowErrorMessage={false}
          />
        </Col>
        <Col xs={12} md={4} className='mb-2'>
          <BaseFormGroup
            messageId={getKeyLang('insurance.invoice.email')}
            fieldName='email'
            errors={formik.errors}
            touched={formik.touched}
            isShowErrorMessage={false}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <BaseFormGroup
            messageId={getKeyLang('insurance.owner.address')}
            fieldName='address'
            errors={formik.errors}
            touched={formik.touched}
          />
        </Col>
      </Row>
    </>
  )
}

export default OtherInfo
