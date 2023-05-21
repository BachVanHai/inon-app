import { BaseFormGroup, Select } from 'base-app'
import { check } from 'prettier'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import Toggle from 'react-toggle'
import { Col, Row } from 'reactstrap'
import TextEditor from '../../../../../components/app-no1/TextEditor'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ALL, PARTNER, selectErrorStyles, selectNormalStyles } from '../utility'
import CheckboxSelectCustomerPublic from './CheckboxSelectCustomerPublic'
import SelectPermissionView from './SelectPermissionView'
import TogglePublicQuestion from './TogglePublicQuestion'

const QuestionForm = ({
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
  isEmptyTextEditor,
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
          messageId={getKeyLang(`helpcenter.create.titleQuestion`)}
          fieldName={`question`}
          onChange={()=>{
            setSaveStatus(true)
          }}
        />
      </div>
      <div>
        <div className='mb-1'>
          <span className='font-weight-bold'>
            <FormattedMessage
              id={getKeyLang('helpcenter.create.answerContent')}
            />
          </span>
        </div>
        <TextEditor
          name='resultText'
          formik={setFieldValue}
          defaultValueProps={''}
          minHeight='250px'
          handleChangeValue={()=>setSaveStatus(true)}
          maxHeight='250px'
          errors={errors}
          isEmpty={isEmptyTextEditor}
          placeholder={"Nội dung chi tiết"}
          className='mt-2'
        />
      </div>
    </div>
  )
}

export default QuestionForm
