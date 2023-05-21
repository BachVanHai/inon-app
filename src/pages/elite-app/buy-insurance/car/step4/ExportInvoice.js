import React from 'react'
import { BaseAppConfigs, BaseFormGroup, BaseFormGroupSelect, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import { Col, Row } from 'reactstrap'
import { OwnerInfo } from './OwnerInfo'
import OrganizationInfo from './OrganizationInfo'
import OtherInfo from './OtherInfo'

const ExportInvoice = ({ formik, onChangeExportType }) => {

  const EXPORT_INVOICE_TYPES = [
    { value: 'NONE', label: <FormattedMessage id={getKeyLang('insurance.invoice.notExport')} /> },
    { value: 'OWNER', label: <FormattedMessage id={getKeyLang('insurance.invoice.exportForOwner')} /> },
    { value: 'PERSONAL', label: <FormattedMessage id={getKeyLang('insurance.invoice.exportForPersonal')} /> },
    { value: 'ORGANIZATION', label: <FormattedMessage id={getKeyLang('insurance.invoice.exportForOrganization')} /> }
  ]

  const renderInfoByInvoiceType = (formik) => {
    switch (formik.values.exportInvoiceType) {
      case 'OWNER':
        return <OwnerInfo formik={formik} />
      case 'PERSONAL':
        return <OtherInfo formik={formik} />
      case 'ORGANIZATION':
        return <OrganizationInfo formik={formik} />
      default:
        return null
    }
  }

  return (
    <div className='export-invoice'>
      <h4 className='text-primary text-uppercase my-3'>
        <FormattedMessage id={getKeyLang(`insurance.invoice.info`)} />
      </h4>
      <Row>
        <Col xs={12} md={12} className='mb-2'>
          <BaseFormGroupSelect fieldName='exportInvoiceType'
                               options={EXPORT_INVOICE_TYPES}
                               onChange={e => onChangeExportType(e.value)}
                               messageId={getKeyLang('insurance.invoice.vat')}
                               errors={formik.errors} touched={formik.touched} />
        </Col>
      </Row>
      {renderInfoByInvoiceType(formik)}
    </div>
  )
}

export default ExportInvoice
