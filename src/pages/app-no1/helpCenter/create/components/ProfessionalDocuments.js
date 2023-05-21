import { BaseFormGroup, Select } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import Toggle from 'react-toggle'
import { Col, Row } from 'reactstrap'
import UploadFile from '../../../../../components/app-no1/UploadFIle'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ALL, PARTNER, selectErrorStyles, selectNormalStyles } from '../utility'
import CheckboxSelectCustomerPublic from './CheckboxSelectCustomerPublic'
import SelectPermissionView from './SelectPermissionView'
import TogglePublicQuestion from './TogglePublicQuestion'
const ProfessionalDocuments = ({
  setFieldValue,
  getFieldMeta,
  errors,
  touched,
  categorySuggestion,
  handleChangeCategory,
  suggestionPermission,
  permissionValues,
  setPermissionValues,
  categoryValues,
  handleUploadFilePDF , 
  fileSelect,
  handleChecked,
  applyForType,
  setSaveStatus
}) => {
  const intl = useIntl()
  return (
    <div>
      <Row className='mt-3'>
        <Col md={'4'} className='mb-1'>
          <Select
            options={categorySuggestion}
            type='creatable'
            placeholder={intl.formatMessage({
              id: getKeyLang(`helpcenter.create.professionalCategory`)
            })}
            value={categoryValues}
            styles={
              getFieldMeta('categoryQuestionId').error
                ? selectErrorStyles
                : selectNormalStyles
            }
            onChange={handleChangeCategory}
          />
        </Col>
        <Col
          md={'4'}
          className='mb-1'
          style={{
            marginTop: '6px'
          }}
        >
          <div className='d-flex align-item-center justify-content-start justify-content-lg-center mb-2'>
          <TogglePublicQuestion getFieldMeta={getFieldMeta} setFieldValue={setFieldValue}/>
            <span className='ml-2'>
              <FormattedMessage
                id={getKeyLang('helpcenter.create.showPublic')}
              />
            </span>
          </div>
        </Col>
        <Col md={'4'} className='mb-1'>
          {getFieldMeta('public').value ? (
            <CheckboxSelectCustomerPublic handleChecked={handleChecked}  getFieldMeta={getFieldMeta} applyForType={applyForType}/>
          ) : (
            <SelectPermissionView
              getFieldMeta={getFieldMeta}
              suggestion={suggestionPermission}
              permissionValues={permissionValues}
              setPermissionValues={setPermissionValues}
              setFieldValue={setFieldValue}
            />
          )}
        </Col>
      </Row>
      <div className='mb-3'>
        <BaseFormGroup
          messageId={getKeyLang(`helpcenter.create.titleDocument`)}
          fieldName={`question`}
          onChange={()=> setSaveStatus(true)}
        />
        {getFieldMeta('question').errors && (
          <span className='text-danger mt-2'>{errors.question}</span>
        )}
      </div>
      <div className='mb-3'>
        <UploadFile
          fileSelect={fileSelect}
          handleChange={(e) => {
            handleUploadFilePDF(e.target.files[0] , getFieldMeta)
          }}
          errors={errors}
        />
      </div>
      <div>
        <BaseFormGroup
          messageId={getKeyLang('helpcenter.create.linkVideo')}
          fieldName={'rsLinkYT'}
          onChange={()=> setSaveStatus(true)}
        />
        {getFieldMeta('rsLinkYT').errors && (
          <span className='text-danger mt-2'>{errors.rsLinkYT}</span>
        )}
      </div>
    </div>
  )
}

export default ProfessionalDocuments
