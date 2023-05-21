import {
  BaseFormDatePicker,
  BaseFormGroup,
  FormattedMessage,
  Select
} from 'base-app'
import moment from 'moment'
import React from 'react'
import { useIntl } from 'react-intl'
import 'react-toggle/style.css'
import { Col, Row } from 'reactstrap'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../../ultity'
import { VEHICEL_TYPE } from '../formikConfig'

const AddtionalVehicel = ({
  index,
  keyMaps = {
    KEY_FULLNAME: 'string'
  },
  stepInfo,
  className,
  buyForMe,
  vehicelTypeSugg
}) => {
  const intl = useIntl()
  const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched } =
    stepInfo
  const {
    KEY_FULLNAME,
    KEY_VEHICEL_TYPE,
    KEY_VEHICEL_NAME,
    KEY_VEHICEL_NUMBER_PLATE,
    KEY_VEHICEL_CONTRACT_NO,
    KEY_VEHICEL_CONTRACT_NO_DATE,
    KEY_VEHICEL_INVOICE_NUMBER,
    KEY_VEHICEL_INVOICE_NUMBER_DATE
  } = keyMaps
  return (
    <div className={className}>
      <Row>
        <Col xs='12' md='4' className='mb-1'>
          {React.useMemo(() => (
            <Select
              options={vehicelTypeSugg}
              value={vehicelTypeSugg.find(_elt => _elt.value === getFieldMeta(KEY_VEHICEL_TYPE).value)}
              placeholder={
                <FormattedMessage id={getKeyLang(`goods.vehicelType`)} />
              }
              styles={
                getFieldMeta(KEY_VEHICEL_TYPE).error
                  ? selectErrorStyles
                  : selectNormalStyles
              }
              onChange={(original) => {
                setFieldValue(KEY_VEHICEL_TYPE, original.value)
              }}
            />
          ))}
        </Col>
        <Col xs='12' md='4' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_VEHICEL_NAME}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('goods.vehicelName')}
            />
          ))}
        </Col>
        <Col xs='12' md='4' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_VEHICEL_NUMBER_PLATE}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('goods.vehicelNumberPlate')}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_VEHICEL_CONTRACT_NO}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('goods.vehicelContractNo')}
            />
          ))}
        </Col>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormDatePicker
              messageId={getKeyLang(`goods.vehicelDate`)}
              fieldName={KEY_VEHICEL_CONTRACT_NO_DATE}
              errors={errors}
              touched={touched}
              className={
                getFieldMeta(`${KEY_VEHICEL_CONTRACT_NO_DATE}`).error &&
                'is-invalid'
              }
              onChange={(dates) => {
                const convertedDate = moment(dates[0]).format(DATE_FORMAT)
                setFieldValue(KEY_VEHICEL_CONTRACT_NO_DATE, convertedDate)
              }}
              options={{
                minDate: moment().format('YYYY-MM-DD'),
                disableMobile: true,
                enableTime: false
              }}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormGroup
              fieldName={KEY_VEHICEL_INVOICE_NUMBER}
              errors={errors}
              touched={touched}
              messageId={getKeyLang('goods.vehicelInvoiceNumber')}
            />
          ))}
        </Col>
        <Col xs='12' md='6' className='mb-1'>
          {React.useMemo(() => (
            <BaseFormDatePicker
              messageId={getKeyLang(`goods.vehicelDate`)}
              fieldName={KEY_VEHICEL_INVOICE_NUMBER_DATE}
              errors={errors}
              touched={touched}
              className={
                getFieldMeta(`${KEY_VEHICEL_INVOICE_NUMBER_DATE}`).error &&
                'is-invalid'
              }
              onChange={(dates) => {
                const convertedDate = moment(dates[0]).format(DATE_FORMAT)
                setFieldValue(KEY_VEHICEL_INVOICE_NUMBER_DATE, convertedDate)
              }}
              options={{
                minDate: moment().format('YYYY-MM-DD'),
                disableMobile: true,
                enableTime: false
              }}
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default AddtionalVehicel
