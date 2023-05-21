import { BaseFormDatePicker } from 'base-app'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import moment from 'moment'
import styled from 'styled-components'
import { KEY_DATE_DEAFAULT, KEY_DATE_TO_DEAFAULT, KEY_TIME_DEAFAULT  } from './utility'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
//create div have input border right 0
const DivBorderRight = styled.div`
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`
//create div have input border left 0
const DivBorderLeft = styled.div`
  input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`
const DuractionSlider = ({ errors, touched, setFieldValue, initialValues }) => {
  const TODAY = moment()._d
  const [
    unlimitedTimePromotionStatus,
    setUnlimitedTimePromotionStatus
  ] = useState(false)
  const [effectiveDateSelected, setEffectiveDateSelected] = useState()
  const [effectiveTimeSelected, setEffectiveTimeSelected] = useState()
  const [minDateNow, setMinDateNow] = useState();
  const [checkTimeTodayStatus, setCheckTimeTodayStatus] = useState(false);
  const [statusSelectedExpireTime, setStatusSelectedExpireTime] = useState(false);
  useEffect(() => {
    const TODAY = moment()._d
    setEffectiveDateSelected(moment(TODAY).format('YYYY-MM-DD'))
    setEffectiveTimeSelected(moment(TODAY).add('minutes', 1).format('H:mm'))
    setMinDateNow(moment(TODAY).format('H:mm'))
    setFieldValue('effectiveTimeTo', moment(TODAY).add('minutes', 1).format('H:mm'))
    setFieldValue(
      'effectiveDate',
      moment(TODAY).toISOString()
    )
    setFieldValue('effectiveTimeTo', moment(TODAY).add('minutes', 1).format('H:mm'))
    setFieldValue(
      'expireDate',
      moment(TODAY).add('d', 10).toISOString()
    )
    setFieldValue('effectHoursFrom' , moment(TODAY).get('hours'))
    setFieldValue('effectMinuteseFrom' , moment(TODAY).get('minutes'))
    setFieldValue('expireHoursFrom' , moment(TODAY).get('hours'))
    setFieldValue('expireMinuteseFrom' , moment(TODAY).add('minutes', 1).get('minutes'))
  }, [])
  return (
    <div>
      <div className='mb-1 font-weight-bold' style={{fontSize : "16px"}}>
        <FormattedMessage id={getKeyLang('evoucher.create.timeApply')} />
      </div>
      <div>
        <Row className='mt-4'>
          <Col xs={12} md={6} className='d-flex mb-3 mb-md-0'>
            <DivBorderRight className='w-50 border-form'>
              <BaseFormDatePicker
                messageId={getKeyLang(`evoucher.create.startTimeApply`)}
                className='form-right'
                errors={errors}
                touched={touched}
                fieldName={'effectiveDate'}
                isShowErrorMessage={false}
                defaultOptions={KEY_TIME_DEAFAULT}
                options={{
                  minDate: moment().format('YYYY-MM-DD 00:00:00'),
                  disableMobile: true,
                  enableTime: false
                }}
                onChange={(date) => {
                  setFieldValue(
                    'effectiveDate',
                    date[0]
                  )
                 if(date[0] > TODAY){
                    setCheckTimeTodayStatus(true)
                  }
                  if(moment(date[0]).format('YYYY-MM-DD') === moment(TODAY).format('YYYY-MM-DD')){
                    const DATE_CONVERT = moment(TODAY).add('minutes', 1).format('H:mm')
                    setFieldValue('effectiveTimeFrom',KEY_TIME_DEAFAULT)
                    setCheckTimeTodayStatus(false)
                    setFieldValue('effectiveTimeTo', DATE_CONVERT)
                    setEffectiveTimeSelected(moment(date[0]).add('minutes', 1).format('H:mm'))
                    setStatusSelectedExpireTime(false)
                  }
                  const DateConvertToIso = moment(date[0]).add('d', 10).format('YYYY-MM-DD')
                  setFieldValue(
                    'expireDate',
                   DateConvertToIso
                  )
                  setEffectiveDateSelected(date[0])
           
                }}
              />
            </DivBorderRight>
            <DivBorderLeft className='w-50'>
              <BaseFormDatePicker
                fieldName='effectiveTimeFrom'
                errors={errors}
                className='form-control-left'
                touched={touched}
                options={{
                  minDate:checkTimeTodayStatus ? false :  minDateNow,
                  enableTime: true,
                  noCalendar: true,
                  time_24hr: true,
                  dateFormat: 'H:i'
                }}
                onChange={(date) => {
                  setFieldValue('effectHoursFrom' , moment(date[0]).get('hours'))
                  setFieldValue('effectMinuteseFrom' , moment(date[0]).get('minutes'))
                  setEffectiveTimeSelected(
                    moment(date[0]).add('minutes', 1).format('H:mm')
                  )
                  setFieldValue('expireHoursFrom' , moment(date[0]).get('hours'))
                  setFieldValue('effectiveTimeTo', moment(date[0]).add('minutes', 1).format('H:mm'))
                  setFieldValue('expireMinuteseFrom' , moment(date[0]).add('minutes' , 1).get('minutes'))
                  if(!statusSelectedExpireTime){
                    setFieldValue('effectiveTimeTo',moment(date[0]).add('minutes', 1).format('H:mm'))
                  }else{
                    setFieldValue('expireHoursFrom' , moment(date[0]).get('hours'))
                  setFieldValue('expireMinuteseFrom' , moment(date[0]).add('minutes' , 1).get('minutes'))
                  }
                }}
                isShowErrorMessage={false}
                placeholder={''}
              />
            </DivBorderLeft>
          </Col>
          <Col xs={12} md={6} className='d-flex mb-3 mb-md-0'>
            <DivBorderRight className='w-50'>
              <BaseFormDatePicker
                disabled={unlimitedTimePromotionStatus}
                messageId={getKeyLang(`evoucher.create.endtTimeApply`)}
                className='form-control-right'
                errors={errors}
                fieldName={'expireDate'}
                options={{
                  minDate: effectiveDateSelected,
                  disableMobile: true,
                  enableTime: false
                }}
                onChange={(date) => {
                  setFieldValue(
                    'expireDate',
                    moment(date[0]).utc(true).toISOString()
                  )
                }}
              />
            </DivBorderRight>
            <DivBorderLeft className='w-50'>
              <BaseFormDatePicker
                fieldName='effectiveTimeTo'
                disabled={unlimitedTimePromotionStatus}
                errors={errors}
                className='form-control-left'
                touched={touched}
                options={{
                  minTime : effectiveTimeSelected === null ? undefined : effectiveTimeSelected ,
                  enableTime: true,
                  noCalendar: true,
                  time_24hr: true,
                  dateFormat: 'H:i'
                }}
                isShowErrorMessage={false}
                placeholder={''}
                onChange={(date)=>{
                  setStatusSelectedExpireTime(true)
                  setFieldValue('expireHoursFrom' , moment(date[0]).get('hours'))
                  setFieldValue('expireMinuteseFrom' , moment(date[0]).get('minutes'))
                }}
              />
            </DivBorderLeft>
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-2'></Col>
          <Col md='6' className='d-flex mb-2'>
            <div>
              <Toggle
                onClick={(e) => {
                  setUnlimitedTimePromotionStatus(e.target.checked)
                  if(e.target.checked){
                    setFieldValue('expireDate', null)
                    setFieldValue('effectiveTimeTo', null)
                  setEffectiveTimeSelected(null)
                  }else{
                    setFieldValue('expireDate', effectiveDateSelected)
                    setFieldValue('effectiveTimeTo', moment().add('minutes', 1).format('H:mm'))
                  }
                }
                }
              />
            </div>
            <div className="ml-1">
              <FormattedMessage
                id={getKeyLang('evoucher.create.unlimitedTimePromotion')}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DuractionSlider
