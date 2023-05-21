import { BaseFormGroup, logoutAction, Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import Toggle from 'react-toggle'
import { Col, Row } from 'reactstrap'
import TextEditor from '../../../../../components/app-no1/TextEditor'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ALL, INDIVIDUAL, PARTNER, selectErrorStyles, selectNormalStyles } from '../utility'
import CheckboxSelectCustomerPublic from './CheckboxSelectCustomerPublic'
import SelectPermissionView from './SelectPermissionView'
import TogglePulicQuestion from './TogglePulicQuestion'

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
  setApplyForType
}) => {
  const intl = useIntl()
  useEffect(() => {}, [applyForType])
  return (
    <div>
      <Row className='mt-3'>
        <Col md={'4'} className='mb-2'>
          <Select
            options={categorySuggestion}
            type='creatable'
            onChange={(original) => {
              handleChangeCategory(original)
            }}
            placeholder={intl.formatMessage({
              id: getKeyLang(`helpcenter.create.categories`)
            })}
            value={categoryValues}
            styles={
              getFieldMeta('categoryQuestionId').error
                ? selectErrorStyles
                : selectNormalStyles
            }
          />
        </Col>
        <Col
          md={'4'}
          className='mb-2'
          style={{
            marginTop: '6px'
          }}
        >
          <div className='d-flex align-item-center justify-content-start justify-content-lg-center mb-2'>
            <TogglePulicQuestion getFieldMeta={getFieldMeta} setFieldValue={setFieldValue} setPermissionValues={setPermissionValues} setApplyForType={setApplyForType}/>
            <span className='ml-2'>
              <FormattedMessage
                id={getKeyLang('helpcenter.create.showPublic')}
              />
            </span>
          </div>
        </Col>
        <Col md={'4'} className='mb-2'>
          {getFieldMeta('public').value ? (
           <CheckboxSelectCustomerPublic handleChecked={handleChecked} applyForType={applyForType} errors={errors} />
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
          errors={errors}
          touched={touched}
        />
        {getFieldMeta('rsLinkYT').errors && (
          <span className='text-danger mt-2'>{errors.rsLinkYT}</span>
        )}
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
          defaultValueProps={getFieldMeta('resultText').value}
          minHeight='250px'
          maxHeight='250px'
          errors={errors}
          isEmpty={isEmptyTextEditor}
          placeholder={"Nội dung chi tiết"}
          className='mt-2'
        />
        {getFieldMeta('resultText').error && (
          <span className='text-danger mt-2'>{errors.resultText}</span>
        )}
      </div>
    </div>
  )
}

export default QuestionForm
