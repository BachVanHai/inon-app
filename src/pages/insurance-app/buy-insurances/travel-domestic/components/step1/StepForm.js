import { BaseFormGroup, HttpClient } from 'base-app'
import { FieldArray } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col, FormGroup, Button, Row } from 'reactstrap'
import { Button as ReactrapButton, Input } from 'reactstrap'
import ExelInput from '../../../../../../components/insurance-app/common-forms/custom-input/ExelInput'
import TitleRow from '../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import {
  getKeyLang,
  URL_RESOURCES
} from '../../../../../../configs/insurance-app'
import {
  fillMultipleStepInfo,
  formatingDate,
  isObjEmpty
} from '../../../../../../ultity'
import AddtionalPeople from './form-components/AddtionalPeople'
import FullAddress from './form-components/FullAddress'
import PopupConditionBuyInsurance from './form-components/popupConditionBuyInsurance'
import {
  addtionalPeopleInitValue,
  IDTypes,
  KEY_ADDRESS,
  KEY_ADDTIONAL_PEOPLE,
  KEY_CITY,
  KEY_CLICKED_CLOSE_POPUP,
  KEY_DATE_BIRTH,
  KEY_DISTRICT,
  KEY_EMAIL,
  KEY_FULLNAME,
  KEY_GENDER,
  KEY_IC_NO,
  KEY_PHONE_NUMBER,
  KEY_WARD,
  sugg_gender
} from './formikConfig'
import { API_READ_FILE_EXEL } from './utility'

const AddtionalPeopleBlock = ({
  index,
  keyMaps,
  errors,
  touched,
  IDTypes,
  setFieldValue,
  values,
  getFieldMeta,
  resetForm,
  setValues,
  sugg_gender,
  buyForMe
}) => {
  return (
    <>
      <AddtionalPeople
        index={index}
        stepInfo={{
          errors,
          touched,
          setFieldValue,
          values,
          getFieldMeta,
          resetForm,
          setValues,
          sugg_gender,
          IDTypes
        }}
        keyMaps={{
          KEY_IC_NO: keyMaps.KEY_IC_NO,
          KEY_FULLNAME: keyMaps.KEY_FULLNAME,
          KEY_DATE_BIRTH: keyMaps.KEY_DATE_BIRTH,
          KEY_GENDER: keyMaps.KEY_GENDER
        }}
        className='mt-2'
        buyForMe={buyForMe}
      />

      <div
        style={{
          backgroundColor: '#d8d8d8',
          height: '1px',
          width: ' 100%',
          marginTop: '2rem'
        }}
        className='mb-1'
      />
    </>
  )
}

const StepForm = ({ stepInfo, className, formik }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(true)
  const intl = useIntl()
  const { step_1 } = stepInfo
  const {
    errors,
    touched,
    setFieldValue,
    values,
    getFieldMeta,
    resetForm,
    setValues,
    initialValues
  } = formik

  const postFileCallback = async (fileData) => {
    const formData = new FormData()
    formData.append('file', fileData)
    const resFile = await HttpClient.post(API_READ_FILE_EXEL, formData)
    if (resFile.status === 200) {
      const _addtionalPeople = resFile.data.map((person, index) => {
        let _per = { ...addtionalPeopleInitValue }
        _per[KEY_FULLNAME] = person?.fullName
        _per[KEY_GENDER] = person?.gender
        _per[KEY_IC_NO] = person?.icNo
        _per[KEY_DATE_BIRTH] = person?.dateOfBirth
        return _per
      })
      const _values = { ...values }
      _values[KEY_ADDTIONAL_PEOPLE] = _addtionalPeople

      setValues(_values)
    }
  }

  const downloadFileCallback = () => {
    let fileName = formatingDate().toString().replace(/-/g, '_') + '_example'
    return [
      URL_RESOURCES + '/travel-insurance-beneficiary-template.xlsx',
      fileName
    ]
  }
  const togglePopup = () => {
    setIsOpenPopup(!isOpenPopup)
    setFieldValue([KEY_CLICKED_CLOSE_POPUP], true)
  }
  React.useEffect(() => {
    if (isObjEmpty(step_1)) {
      return
    }
    fillMultipleStepInfo(step_1, initialValues, setValues)
  }, [])

  return (
    <div className={className}>
      {getFieldMeta([KEY_CLICKED_CLOSE_POPUP]).value ? null : (
        <PopupConditionBuyInsurance
          isOpen={isOpenPopup}
          togglePopup={togglePopup}
        />
      )}
      <>
        <Row className={'mt-2'}>
          <Col xs={12} md={4}>
            <FormGroup className='position-relative'>
              <BaseFormGroup
                fieldName={KEY_FULLNAME}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`Name`)}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4} >
            <FormGroup className='form-label-group position-relative'>
              <BaseFormGroup
                fieldName={KEY_PHONE_NUMBER}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`PhoneNum`)}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={4} >
            <FormGroup className='form-label-group position-relative'>
              <BaseFormGroup
                fieldName={KEY_EMAIL}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`EmailTitle`)}
              />
            </FormGroup>
          </Col>
        </Row>
        {React.useMemo(() => (
          <FullAddress
            keyMaps={{
              KEY_CITY: KEY_CITY,
              KEY_DISTRICT: KEY_DISTRICT,
              KEY_WARD: KEY_WARD,
              KEY_ADDRESS: KEY_ADDRESS
            }}
          />
        ))}
      </>
      <TitleRow
        msg={<FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} />}
        className='mt-1 font-medium-5'
        type='title-insurance'
      />
      <Row className='mb-1'>
        <Col xs={12} md={7}>
          <div className='mb-1 mt-1'>(*) Độ tuổi tham gia đến 80 tuổi</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <ExelInput
            type={'DOWNLOAD'}
            toggleFileCallback={downloadFileCallback}
            msgField={<FormattedMessage id={getKeyLang(`downloadFile`)} />}
          />
          <ReactrapButton tag='label' color={'primary'} className={'ml-1'}>
            <Input
              hidden
              type='file'
              bgsize='sm'
              id='uploadxls'
              label='Document'
              name='originalFileName'
              inputprops={{ accept: '.xlxs' }}
              onChange={(e) => postFileCallback(e.target.files[0])}
            />
            <div className='d-flex align-items-center justify-content-center'>
              <span style={{ fontSize: '13px' }}>Tải file lên</span>
            </div>
          </ReactrapButton>
        </Col>
      </Row>
      <FieldArray name={KEY_ADDTIONAL_PEOPLE}>
        {({ remove, push }) => {
          let addtionalPeople = getFieldMeta(KEY_ADDTIONAL_PEOPLE).value
          const _values = { ...values }
          if (!Array.isArray(addtionalPeople)) {
            addtionalPeople = []
          }
          const buyForMe = (e) => {
            if (e.target.checked) {
              _values[KEY_ADDTIONAL_PEOPLE][0][KEY_FULLNAME] =
                values[KEY_FULLNAME]

            } else {
              addtionalPeople[0][KEY_FULLNAME] = ''
            }
            setValues(_values)
          }

          return (
            <>
              {addtionalPeople.map((elt, index) => {
                return (
                  <AddtionalPeopleBlock
                    key={index}
                    keyMaps={{
                      KEY_IC_NO: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_IC_NO}`,
                      KEY_FULLNAME: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_FULLNAME}`,
                      KEY_DATE_BIRTH: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_DATE_BIRTH}`,
                      KEY_GENDER: `${KEY_ADDTIONAL_PEOPLE}.${index}.${KEY_GENDER}`
                    }}
                    index={index}
                    remove={remove}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={values}
                    getFieldMeta={getFieldMeta}
                    resetForm={resetForm}
                    setValues={setValues}
                    sugg_gender={sugg_gender}
                    IDTypes={IDTypes}
                    buyForMe={buyForMe}
                  />
                )
              })}

              <Row className='mt-3'>
                <Col xs={0} md={6} />
                <Col xs={6} md={3}>
                  {getFieldMeta(KEY_ADDTIONAL_PEOPLE).value.length > 1 && (
                    <Button
                      color='danger'
                      className='w-100'
                      onClick={() => {
                        remove(
                          getFieldMeta(KEY_ADDTIONAL_PEOPLE).value.length - 1
                        )
                      }}
                    >
                      <FormattedMessage id={getKeyLang(`remove`)} />
                    </Button>
                  )}
                </Col>
                <Col xs={6} md={3}>
                  <Button
                    color='primary'
                    className='w-100'
                    onClick={() => {
                      push(addtionalPeopleInitValue)
                    }}
                  >
                    <FormattedMessage id={getKeyLang(`addPerson`)} />
                  </Button>
                </Col>
              </Row>
            </>
          )
        }}
      </FieldArray>
    </div>
  )
}

export default StepForm
