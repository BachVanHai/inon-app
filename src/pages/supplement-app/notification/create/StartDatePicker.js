import {
    BaseFormDatePicker, logoutAction
} from 'base-app'
import moment from 'moment'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/supplement-app'
import { DivBorderLeft, DivBorderRight, KEY_TIME_TO_DEFAULT } from './utility'
const SelectHiddenLabel = styled.div`
.form-label-group{
  label{
    visibility: hidden;
  }
}
`
const StartDatePicker = ({errors , setFieldValue , getFieldMeta , checkTimeNow , setcheckTimeNow , isEdit}) => {
    const [theDateSelectSameToday, setTheDateSelectSameToday] = useState(false);
    const intl = useIntl()
    const TODAY = moment().format('YYYY-MM-DD')
    const startDate = moment(getFieldMeta('startDate').value).format('YYYY-MM-DD')
    const startDateInitial = getFieldMeta('startDate').initialValue
    const startTimeInitial = getFieldMeta('effectTime').initialValue
    return (
        <>
        <div className={`d-flex`}>
            <DivBorderRight>
                <BaseFormDatePicker
                disabled={isEdit}
                    messageId={getKeyLang(`notification.create.startDate`)}
                    fieldName={'startDate'}
                    errors={errors}
                    options={{
                        minDate : startDate , 
                        disableMobile: true,
                        enableTime: false
                    }}
                    onChange={(date) => {
                        const dateConvert = moment(date[0]).format('YYYY-MM-DD')
                        if(dateConvert === startDateInitial){
                            setFieldValue('effectTime', startTimeInitial)
                        }
                        if(dateConvert !== TODAY){
                            setcheckTimeNow(false)
                            setTheDateSelectSameToday(false)
                        }else{
                            setFieldValue('expireTime' , KEY_TIME_TO_DEFAULT)
                            setTheDateSelectSameToday(true)
                        }
                        setFieldValue('startDate', date[0])
                        setFieldValue('endDate', date[0])
                    }}
                />
                
            </DivBorderRight>
            <DivBorderLeft>
                <SelectHiddenLabel>
                    <BaseFormDatePicker
                     disabled={isEdit}
                        fieldName={'effectTime'}
                        messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                        errors={errors}
                        options={{
                            minTime : startDate > startDateInitial ? false : startTimeInitial ,
                            disableMobile: true,
                            enableTime: true,
                            noCalendar: true,
                            time_24hr: true,
                            dateFormat: 'H:i'
                        }}
                        onChange={(date) => {
                            const hours = moment(date[0]).get('hours')
                            const minutes = moment(date[0]).get('minutes')
                            const expiteDate = moment(date[0]).add('minutes', 5).format('YYYY-MM-DD H:mm')
                            const expireHours = moment(expiteDate).get('hours')
                            const expireMinutes = moment(expiteDate).get('minutes')
                            setFieldValue('effectHoursFrom', hours)
                            setFieldValue('effectMinutesTo', minutes)
                            setFieldValue('expireHoursFrom',expireHours)
                            setFieldValue('expireMinutesTo',expireMinutes)
                            const timeConvert =  moment(date[0]).add('minutes', 5).format('H:mm')
                            setFieldValue('expireTime' , timeConvert)
                            const timeNow = moment().format('H:mm')
                            const timeSelect = moment(date[0]).format('H:mm')
                            if(theDateSelectSameToday){
                                if(timeNow <= timeSelect) return setcheckTimeNow(false)
                                if(timeNow > timeSelect) return setcheckTimeNow(true)
                            }
                        }}
                    />
                </SelectHiddenLabel>
            </DivBorderLeft>
           
        </div>
        <div>
        {
            checkTimeNow ? <span className="text-danger">{intl.formatMessage({
                 id: getKeyLang(
                   "notification.timeWrong"
                 )
               })}</span> : null
        }
        </div>
        </>
    )
}

export default StartDatePicker
