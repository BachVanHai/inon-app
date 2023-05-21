import { BaseFormDatePicker } from 'base-app'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import moment from 'moment'
import styled from 'styled-components'
import { KEY_DATE_DEAFAULT, KEY_TIME_DEAFAULT } from './utility'
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
const DuractionSlider = ({ errors, touched, setFieldValue, initialValues , isEdit , evoucherInfo }) => {
  const TODAY = moment()._d
  const [
    unlimitedTimePromotionStatus,
    setUnlimitedTimePromotionStatus
  ] = useState(isEdit ?true : false)
  const [effectiveDateSelected, setEffectiveDateSelected] = useState()
  const [effectiveTimeSelected, setEffectiveTimeSelected] = useState()
  const [minDateNow, setMinDateNow] = useState();
  const [checkTimeTodayStatus, setCheckTimeTodayStatus] = useState(false);
  const [statusSelectedExpireTime, setStatusSelectedExpireTime] = useState(false);
  const [checkSelectEffiveTimeFirst, setCheckSelectEffiveTimeFirst] = useState(
    false
  )
  const [dateSameTodayStatus, setDateSameTodayStatus] = useState(false);
  useEffect(() => {
    const TODAY = moment()._d
    setEffectiveDateSelected(TODAY)
    setEffectiveTimeSelected(moment(TODAY).add('minutes', 1).format('H:mm'))
    setMinDateNow(moment(TODAY).format('H:mm'))
    setFieldValue('effectiveTimeTo', moment(initialValues.effectiveDate).add('minutes', 1).format('H:mm'))
    setFieldValue(
      'effectiveDate',
      moment(TODAY).toISOString()
    )
    setFieldValue('effectiveTimeTo', moment(initialValues.expireDate).add('minutes', 1).format('H:mm'))
    setFieldValue(
      'expireDate',
      moment(TODAY).add('d', 10).toISOString()
    )
    setFieldValue('effecthoursFrom' , moment(initialValues.effectiveDate).get('hours'))
    setFieldValue('effectMinuteseFrom' , moment(initialValues.effectiveDate).get('minutes'))
    setFieldValue('expirehoursFrom' , moment(initialValues.expireDate).get('hours'))
    setFieldValue('expireMinuteseFrom' , moment(initialValues.expireDate).add('minutes', 1).get('minutes'))
  }, [])
  return (
    <div>
      <div className='mb-1 font-weight-bold'>
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
                  minDate : moment().format("YYYY-MM-DD"),
                  disableMobile: true,
                  enableTime: false
                }}
                onChange={(date) => {
                  const dateInitial = moment(date[0])._d
                  setFieldValue(
                    'effectiveDate',
                    dateInitial
                  )
                 if(date[0] > TODAY){
                    setCheckTimeTodayStatus(true)
                    setDateSameTodayStatus(true)
                  }
                  if(moment(date[0]).format('YYYY-MM-DD') === moment(TODAY).format('YYYY-MM-DD')){
                    setDateSameTodayStatus(false)
                    const DATE_CONVERT = moment(TODAY).add('minutes', 1).format('H:mm')
                    setFieldValue('effectiveTimeFrom',KEY_TIME_DEAFAULT)
                    setCheckTimeTodayStatus(false)
                    setFieldValue('effectiveTimeTo', DATE_CONVERT)
                    // setFieldValue('effectDate' )
                    setEffectiveTimeSelected(moment(TODAY).add('minutes', 1).format('H:mm'))
                    setStatusSelectedExpireTime(false)
                  }
                  const DateConvertToIso = moment(dateInitial).add('d', 10).format('YYYY-MM-DD')
                  setFieldValue(
                    'expireDate',
                    DateConvertToIso
                  )
           
                }}
              />
            </DivBorderRight>
            <DivBorderLeft className='w-50'>
              <BaseFormDatePicker
                fieldName='effectiveTimeFrom'
                errors={errors}
                className='form-control-left'
                defaultOptions={KEY_TIME_DEAFAULT}
                touched={touched}
                options={{
                  minTime : dateSameTodayStatus ? null  : minDateNow,
                  enableTime: true,
                  noCalendar: true,
                  time_24hr: true,
                  dateFormat: 'H:i'
                }}
                onChange={(date) => {
                  const hours = moment(date[0]).get('hours')
                  const minutes = moment(date[0]).get('minutes')
                  const addMinutes =  moment(date[0]).add('minutes', 1).format('H:mm')
                  setFieldValue('effectHouseFrom' , hours)
                  setFieldValue('effectMinuteseFrom' , minutes)
                  setEffectiveTimeSelected(addMinutes)
                  setFieldValue('effectHouseFrom' , hours)
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
                  minDate:
                    effectiveDateSelected !== undefined
                      ? moment(effectiveDateSelected).format('YYYY-MM-DD')
                      : moment().format('YYYY-MM-DD'),
                  disableMobile: true,
                  enableTime: false
                }}
                onChange={(date) => {
                  setFieldValue(
                    'expireDate',
                    moment(date[0]).format('YYYY-MM-DD')
                  )
                  if (!checkSelectEffiveTimeFirst) {
                    setFieldValue(
                      'effectiveDate',
                      moment().format('YYYY-MM-DD')
                    )
                  }
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
                  }else{
                    setFieldValue('expireDate', KEY_DATE_DEAFAULT)
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
