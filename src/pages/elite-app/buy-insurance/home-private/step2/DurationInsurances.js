import { BaseFormDatePicker, DatePicker } from 'base-app'
import moment from 'moment'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../configs/elite-app'
import { actionSaveContract } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const SliderWithTooltip = createSliderWithTooltip(Slider)
const DurationInsurances = ({
  fieldName,
  setValue,
  insurances,
  duration,
  durationOfInsuranceRangeMinValue,
  durationOfInsuranceRangeMaxValue,
  onChangeEffectiveDateFrom,
  usedTimeHouse,
  stepData,
  contract,
  statusDuration,
  getFieldMeta
}) => {
  const [endDateValueChange, setEndDateValueChange] = useState(insurances?.endValueDate
  )
  const durationCheckUsedTime = usedTimeHouse <= 20 ? 6 : 3
  const [durationTime, setDurationTime] = useState(stepData[2] !== undefined ? stepData[2].duration : durationCheckUsedTime);
  const dispatch = useDispatch()
  const intl = useIntl()
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const onChangeStartDate = (date) => {
    const dateSet = new Date(date)
    dateSet.setMonth(dateSet.getMonth()+durationTime)
   const currentDate= moment(date[0])
   const endDate = new Date(endDateValueChange)
   const myDate = moment(endDate)
   setValue('startedDate', moment(currentDate).utc(false).toISOString())
   setEndDateValueChange(dateSet);
   setValue('endDate' , dateSet)
   const newContract = { ...contract }
   newContract.insurances.forEach((item) => {
     item.endDate = myDate._i
     item.startDate = date[0]
   })
   dispatch(actionSaveContract(newContract))
  }
  const handleChangeTimeSlider = (time) => {
    setDurationTime(time)
    const startDate = moment(endDateValueChange)
    const getDateStart = startDate.get('date')
    setValue('duration' ,time)
    const currentDate = moment(insurances.startDate);
    currentDate.set({'date'  : getDateStart})
    let futureMonth = moment(currentDate).utc(true).add(time, 'M').format('YYYY-MM-DD HH:mm:ss');
    const endDateISO = moment(futureMonth).toISOString()
    setEndDateValueChange(futureMonth)
    setValue('endDate', endDateISO)
  }
  useEffect(() => {
    const TODAY  =  moment().utc(false).format(`YYYY-MM-DD hh:mm:ss`)
    const currentDate = new Date()
    const startedDate = moment(TODAY).utc(true).toISOString()
    currentDate.setMonth(currentDate.getMonth() + 6)
    setEndDateValueChange(currentDate)
    //set date default
    setValue('startedDate',startedDate)
    setValue('endDate', currentDate)
    if (stepData[2] === undefined) {
      setValue('startedDate',startedDate)
      setValue('endDate', currentDate)
    }
    else{
      setValue('startedDate',stepData[2].effectiveDateFrom)
      setValue('endDate', stepData[2].endDate)
      setEndDateValueChange(stepData[2].effectiveDateFrom)
      setEndDateValueChange(stepData[2].endDate)
    }
  }, [])

  return (
    <>
      <div className='mt-3'>
        <Row>
          <Col xs={12} md={4} className="mb-2">
            <FormattedMessage
              id={getKeyLang('insurance.homeprivate.step2.durationOfInsurance')}
            />
            <span>{` (${duration} tháng)`}</span>
          </Col>
          <Col xs={12} md={8}>
            {/* <div className='d-flex justify-content-between align-items-center'>
              <div>
                <span>{durationOfInsuranceRangeMinValue}</span>
              </div>
              <div>
                <span>
                  {durationOfInsuranceRangeMaxValue}
                </span>
              </div>
            </div> */}
            
            <div className='d-flex align-items-center'>
            <div className='mr-1'>
                <span>{durationOfInsuranceRangeMinValue}</span>
              </div>
                <SliderWithTooltip
                  min={durationOfInsuranceRangeMinValue}
                  max={durationOfInsuranceRangeMaxValue}
                  step={usedTimeHouse <= 20 ? 6 : 3}
                  fieldName={fieldName}
                  defaultValue={
                    stepData[2] != undefined ? stepData[2].duration : durationCheckUsedTime
                  }
                  onChange={(e) => {
                    handleChangeTimeSlider(e)
                  }}
                />
               <div className='ml-1'>
                <span>
                  {durationOfInsuranceRangeMaxValue}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div>
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
                    insurances?.minStartValueDate || new Date()
                  ).format('YYYY-MM-DD 00:00:00'),
                  dateFormat: 'Y-m-d'
                }}
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
                fieldName='endDate'
                className='form-right'
                options={{
                  dateFormat: 'Y-m-d'
                }}
                placeholder={intl.formatMessage({
                  id: getKeyLang('insurance.effectiveDateTo')
                })}
                value={endDateValueChange}
                disabled
              />
            </div>
            <div className='w-50'>
            <BaseFormDatePicker
                 disabled
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
        </Row>
      </div>
    </>
  )
}

export default DurationInsurances
