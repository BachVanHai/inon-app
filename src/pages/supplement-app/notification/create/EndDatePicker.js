import {
  BaseFormDatePicker
} from 'base-app'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/supplement-app'
import { DivBorderLeft, DivBorderRight } from './utility'
const SelectHiddenLabel = styled.div`
.form-label-group{
  label{
    visibility: hidden;
  }
}
`
const EndDatePicker = ({errors , setFieldValue , getFieldMeta  , isEdit}) => {
  const [sameTimeStatus, setSameTimeStatus] = useState(false);
  const startDate = moment( getFieldMeta('startDate').value).format('YYYY-MM-DD')
  const expireDate = getFieldMeta('expireTime').value
  const startTime = getFieldMeta('effectTime').value
  const expireTime = moment().format(`YYYY-MM-DD ${startTime}`)
  const expireTimeSet = moment(expireTime).add('minutes', 5).format('H:mm')
  useEffect(() => {
    if (moment(getFieldMeta('effectDate').value).format('YYYY-MM-DD') === moment(getFieldMeta('expireDate').value).format('YYYY-MM-DD')) {
      setSameTimeStatus(true)
    }
  }, []);
    return (
        <div className="d-flex justify-content-end">                  
                  <DivBorderRight>
                  <BaseFormDatePicker
                  disabled={isEdit}
                  messageId={getKeyLang(`notification.create.endDate`)}
                  fieldName={'endDate'}
                  errors={errors}
                  options={{
                    minDate: startDate,
                    disableMobile: true,
                    enableTime: false
                  }}
                  onChange={(date)=>{
                    const dateConvert = moment(date[0]).format('YYYY-MM-DD')
                    if(dateConvert === startDate){
                      setSameTimeStatus(true)
                      setFieldValue('expireTime' , expireTimeSet)
                    }else{
                      setSameTimeStatus(false)
                    }
                    setFieldValue('endDate', date[0])
                  }}
                />
                    </DivBorderRight>
                    <DivBorderLeft>
                    <SelectHiddenLabel>
                      <BaseFormDatePicker
                        fieldName={'expireTime'}
                        messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                        errors={errors}
                        options={{
                          minTime : sameTimeStatus ?  startTime : false,
                          disableMobile: true,
                          enableTime: true,
                          noCalendar: true,
                          time_24hr: true,
                          dateFormat: 'H:i'
                                        }}
                                        onChange={(date)=>{
                      const hours = moment(date[0]).get('hours')
                      const minutes = moment(date[0]).get('minutes')
                      setFieldValue('expireHoursFrom',hours)
                      setFieldValue('expireMinutesTo',minutes)
                                        }}
                                      />
                    </SelectHiddenLabel>
                    </DivBorderLeft>
                </div>
    )
}

export default EndDatePicker
