import { BaseFormDatePicker, BaseFormGroup, Select } from 'base-app'
import moment from 'moment'
import React from 'react'
import { useIntl } from 'react-intl'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'
import {
  DATE_FORMAT,
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import TitleRow from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import YearPicker from '../../../../../../../components/insurance-app/yearPicker'
import {
  getKeyLang
} from '../../../../../../../configs/insurance-app'
export const AddtionalPeopleStyled = styled.div`
.info_baby{
  color : #333;
  position: absolute;
  bottom: 10%;
 
}
@media (max-width: 576px) {
  .info_baby{
  color : #333;
  position: absolute;
  bottom: -25%;
  }
}
`
const AddtionalPeople = ({
  index,
  keyMaps = {
    KEY_IC_NO: 'string',
    KEY_FULLNAME: 'string',
    KEY_DATE_BIRTH: 'string',
    KEY_GENDER: 'string'
  },
  stepInfo,
  className,
  buyForMe
}) => {
  const intl = useIntl()
  const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched , values } =
    stepInfo
  const { KEY_IC_NO, KEY_FULLNAME, KEY_DATE_BIRTH, KEY_GENDER } = keyMaps
  return (
    <AddtionalPeopleStyled className={className}>
      <TitleRow msg={'* Người thứ ' + (index + 1)} type='s' className='mb-2' />
      {index + 1 === 1 ? (
        <div className='d-flex align-items-center mb-3'>
          <span className='text-primary font-weight-bold'>Bên mua bảo hiểm là người được bảo hiểm</span>
          <Toggle
            onChange={buyForMe}
            className='switch-danger-primary ml-1'
          />
        </div>
      ) : null}
      <Row className='mt-2'>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_FULLNAME}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('Name')}
            />
          ))}
        </Col>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormDatePicker
            messageId={getKeyLang(`DateOfBirth`)}
            fieldName={KEY_DATE_BIRTH}
            errors={errors}
            touched={touched}
            className={
              getFieldMeta(`${KEY_DATE_BIRTH}`).error && 'is-invalid'
            }
            options={{
              maxDate: moment()
                .utc(true)
                .format(DATE_FORMAT),
              minDate: moment()
                .utc(true)
                .subtract(80, 'y')
                .format(DATE_FORMAT),
              enableTime: false
            }}
          />
          ))}
        </Col>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <Select
              readOnly
              closeMenuOnSelect={true}
              classNamePrefix='select mt-1'
              className='custom-zindex9'
              onChange={({ content }) => {
                setFieldValue(KEY_GENDER, content)
              }}
              value={sugg_gender.find(
                (gen) => gen.content === getFieldMeta(KEY_GENDER).value
              )}
              options={sugg_gender}
              placeholder={intl.formatMessage({ id: getKeyLang(`sex.aStar`) })}
              isClearable={false}
              styles={
                getFieldMeta(KEY_GENDER).error
                  ? selectErrorStyles
                  : selectNormalStyles
              }
            />
          ))}
        </Col>
        <Col xs='12' md='6'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_IC_NO}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('travel.IDPers')}
            />
          ))}
          <span className="font-italic font-small-2 info_baby">Trường hợp trẻ em chưa có Căn cước công dân, vui lòng nhập số giấy khai sinh</span>
        </Col>
      </Row>
    </AddtionalPeopleStyled>
  )
}

export default AddtionalPeople
