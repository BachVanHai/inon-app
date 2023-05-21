import { FormattedMessage } from 'base-app'
import moment from 'moment'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { getKeyLang } from '../../../../../../configs/insurance-app'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../configs/insurance-app'
const YearPicker = ({
  setFieldValue,
  fiedName,
  errors,
  getFieldMeta,
  keyPlaceholder,
  values
}) => {
  const intl = useIntl()
  return (
    <>
      {values[fiedName] !== '' ? (
        <label class='field__isDate-label position-absolute top-1'>
          <FormattedMessage id={getKeyLang(keyPlaceholder)} />{' '}
        </label>
      ) : null}
      <DatePicker
        selected={
          getFieldMeta(fiedName).value !== ''
            ? moment(getFieldMeta(fiedName).value).toDate()
            : undefined
        }
        onChange={(date) => {
          if (date === null) {
            setFieldValue(fiedName, '')
          } else {
            const dates = moment(date).format('YYYY-MM-DD')
            setFieldValue(fiedName, dates)
          }
        }}
        className={errors[fiedName] ? 'error-field' : ''}
        placeholderText={intl.formatMessage({
          id: getKeyLang(keyPlaceholder)
        })}
        yearItemNumber={15}
        showYearPicker
        dateFormat='yyyy'
      />
    </>
  )
}

export default YearPicker
