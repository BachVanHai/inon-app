import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getKeyLang, INSURANCE_TYPES } from '../../../configs/elite-app'
import { BaseFormDatePicker, DatePicker, FormattedMessage } from 'base-app'
import { Col, Row } from 'reactstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { RcHandle } from '../../../components/elite-app/HandleComponent'
import { useIntl } from 'react-intl'
import moment from 'moment'
import 'flatpickr/dist/themes/material_green.css'
import '../../../assets/scss/elite-app/buy-insurance/duration-of-insurance.scss'

const DurationOfInsurance = ({
  setFieldTouched,
  setFieldError,
  insurance,
  onChangeEffectiveDateFrom,
  duration = 12,
  onChangeDuration
}) => {
  const params = useParams()
  const intl = useIntl()

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  let marksEnd = params?.type === INSURANCE_TYPES?.MOTOR ? 36 :  30
  useEffect(() => {
    onChangeStartDate([insurance.startValueDate])
  }, [])

  const onChangeStartDate = (date) => {
    const isInValidDate = moment(date[0]).isBefore(
      moment(insurance.minStartValueDate),
      'hours'
    )
    if (isInValidDate) {
      setErrors({ effectiveDateFrom: 'Errors' })
      setTouched({ effectiveDateFrom: true })
      setFieldError('effectiveDateFrom', 'Errors')
      setFieldTouched('effectiveDateFrom', true)
    } else {
      setErrors({})
      setFieldError('effectiveDateFrom', undefined)
    }
    onChangeEffectiveDateFrom(date)
  }

  const onChangeDurationTime = (value) => {
    onChangeDuration(value)
  }
 
  return (
    <div className='duration-insurance'>
      {params.type !== INSURANCE_TYPES.TD ? (
        <>
          <div className='duration d-flex justify-content-between'>
            <FormattedMessage id={getKeyLang('insurance.duration')} />{' '}
            {duration + ' '}
            <FormattedMessage id={getKeyLang('insurance.durationUnit')} />
          </div>
        </>
      ) : (
        <div className='insurance-content pl-0'>
          <div className='d-flex mb-1'>
            <div>
              <FormattedMessage
                id={getKeyLang('insurance.duration.byMonth')}
                values={{ duration: duration }}
              />
            </div>
          </div>
          <div>
            <Slider
              min={12}
              max={marksEnd}
              step={3}
              marks={{ 12: 12, [marksEnd] : marksEnd}}
              value={duration}
              handle={RcHandle}
              onChange={onChangeDurationTime}
            />
          </div>
        </div>
      )}
      <Row className='mt-4'>
        <Col xs={12} md={6} className='d-flex mb-3 mb-md-0'>
          <div className='w-50'>
            <BaseFormDatePicker
              fieldName='effectiveDateFrom'
              className='form-right'
              errors={errors}
              touched={touched}
              options={{
                minDate: moment(
                  insurance?.minStartValueDate || new Date()
                ).format('YYYY-MM-DD 00:00:00'),
                dateFormat: 'Y-m-d'
              }}
              value={insurance?.startValueDate}
              isShowErrorMessage={false}
              messageId={getKeyLang('insurance.effectiveDateFrom')}
              onChange={onChangeStartDate}
            />
          </div>
          <div className='w-50'>
            <BaseFormDatePicker
              fieldName='effectiveDateFrom'
              errors={errors}
              touched={touched}
              className={'form-left'}
              options={{
                enableTime: true,
                noCalendar: true,
                time_24hr: true,
                dateFormat: 'H:i'
              }}
              isShowErrorMessage={false}
              onChange={onChangeStartDate}
              placeholder={''}
            />
          </div>
        </Col>
        <Col xs={12} md={6} className='d-flex'>
          <div className='w-50'>
            <DatePicker
              fieldName='effectiveDateTo'
              className='form-right'
              options={{
                dateFormat: 'Y-m-d'
              }}
              placeholder={intl.formatMessage({
                id: getKeyLang('insurance.effectiveDateTo')
              })}
              value={insurance?.endValueDate}
              disabled
            />
          </div>
          <div className='w-50'>
            <DatePicker
              disabled
              className={'form-left'}
              options={{
                enableTime: true,
                noCalendar: true,
                time_24hr: true,
                dateFormat: 'H:i'
              }}
              onChange={onChangeStartDate}
              value={insurance?.endValueDate}
              placeholder={''}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DurationOfInsurance
