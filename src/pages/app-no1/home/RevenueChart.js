import React, {useState} from 'react'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {
  CHART_TYPE,
  getKeyLang,
  getXAxisNameByTimeType,
  INSURANCE_COMPANY,
  REVENUE_TYPES, TIME_TYPE,
  TIMES
} from '../../../configs/app-no1/index'
import {Checkbox, Select} from 'base-app'
import {FormattedMessage} from 'react-intl'
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap'
import moreIcon from '../../../assets/images/app-no1/home/more.svg'
import {useDispatch, useSelector} from 'react-redux'
import {Check, X} from 'react-feather'
import {loadChartDataByType} from '../../../redux/actions/app-no1/home'

const RevenueChart = () => {

  const dispatch = useDispatch()
  const {homeRevenueChart} = useSelector(state => state.app.home)

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [revenues, setRevenues] = useState([...REVENUE_TYPES])
  const [timeType, setTimeType] = useState({...TIMES[0]})
  const [insuranceCompany, setInsuranceCompany] = useState({...INSURANCE_COMPANY[0]})

  const onChangeTimeType = (item) => {
    const contractType = revenues.filter(revenue => revenue.checked)
    const type = TIMES.find(timeType => timeType.value === item.value)
    setTimeType(type)
    const request = {
      contractType: contractType.map(type => type.key),
      timeType: item.value
    }
    if (insuranceCompany.value != null) {
      request.companyId = insuranceCompany.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.REVENUE))
  }

  const onChangeInsuranceCompany = (item) => {
    const contractType = revenues.filter(revenue => revenue.checked)
    setInsuranceCompany(item)
    const request = {
      contractType: contractType.map(type => type.key),
      timeType: timeType.value,
      companyId: item.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.REVENUE))
  }

  const toggleCheckbox = (revenue) => {
    const revenuesChecked = revenues.filter(item => item.checked)

    if(revenuesChecked.length === 1 && revenue.checked === true) return
    else {
      const revenuesAlt = revenues.map(item => {
        if(item.key === revenue.key) {
          item.checked = !item.checked;
          return item
        } else return item
      })
      setRevenues([...revenuesAlt])
    }
  }

  const CustomTooltip = ({active, payload, label}) => {
    let name;
    switch (timeType.value) {
      case TIME_TYPE.ALL:
      case TIME_TYPE.CURRENT_WEEK:
      case TIME_TYPE.LAST_WEEK:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.day")} />
        break
      case TIME_TYPE.CURRENT_MONTH:
      case TIME_TYPE.LAST_MONTH:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.week")} />
        break
      case TIME_TYPE.CURRENT_YEAR:
      case TIME_TYPE.LAST_YEAR:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.month")} />
        break
      default:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.day")} />
        break
    }
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip p-1'>
          <p><span className="font-weight-bold">{name}</span> {label}</p>
          {payload.map((item, index) => (
            <p key={index} className='desc'><span
              className="font-weight-bold">{item.name}</span> : {item.value === 0 ? 0 : item.value.toFixed(2)}</p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className='w-100 revenue-chart mt-2'>
      <div className='d-flex align-items-center flex-wrap justify-content-end'>
        <div className='w-175px mr-md-62px'>
          <FormattedMessage id={getKeyLang('home.info.time')}>
            {(msg) => (
              <Select onChange={(e) => onChangeTimeType(e)} options={TIMES} placeholder={msg}
                      value={timeType} classNamePrefix='select'/>
            )}
          </FormattedMessage>
        </div>
        <div className='d-flex align-items-center justify-content-end ml-2'>
          <div className='w-175px mr-2'>
            <FormattedMessage id={getKeyLang('home.info.insuranceCompany')}>
              {(msg) => (
                <Select options={INSURANCE_COMPANY} placeholder={msg}
                        onChange={(value) => onChangeInsuranceCompany(value)}
                        classNamePrefix='select' value={insuranceCompany}/>
              )}
            </FormattedMessage>
          </div>
          <img id='controlledPopover1' className="more-icon cursor-pointer mb-2" src={moreIcon} alt='More icon'/>
          <Popover
            className='test'
            placement='right'
            target='controlledPopover1'
            isOpen={popoverOpen}
            toggle={() => setPopoverOpen(!popoverOpen)}
          >
            <PopoverHeader className='d-flex align-items-center justify-content-between'>
              <div className='mr-3'>
                <FormattedMessage id={getKeyLang('home.chart.revenue.selectInfo')}/>
              </div>
              <X className='cursor-pointer' onClick={() => setPopoverOpen(false)}/>
            </PopoverHeader>
            <PopoverBody>
              {revenues.map(item => (
                <div key={item.key} className='d-flex align-items-center'>
                  <Checkbox
                    color='primary'
                    checked={item.checked}
                    onClick={() => toggleCheckbox(item)}
                    icon={<Check className='vx-icon' size={16}/>}
                  />
                  <div className='ml-1 font-weight-bold'>
                    <FormattedMessage id={getKeyLang(item.value)}/>
                  </div>
                </div>
              ))}
            </PopoverBody>
          </Popover>
        </div>
      </div>

      <div className='text-center mb-1 font-weight-bold text-uppercase font-size-18'>
        <FormattedMessage id={getKeyLang('home.info.revenue')}/>
      </div>
      <ResponsiveContainer width='100%' height={250} className={(homeRevenueChart.data.length === 0 ? "bg-secondary bg-lighten-4 " : "") + "d-flex justify-content-center align-items-center"}>
        {
          !homeRevenueChart.isLoading &&  homeRevenueChart.data.length >= 0? <LineChart data={homeRevenueChart.data}  margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='name' label={{
              value: getXAxisNameByTimeType(timeType),
              position: 'insideBottomRight', offset: 0, className: 'font-weight-bold'
            }}/>
            <YAxis label={{value: 'Triệu VNĐ', angle: 0, offset: -20 ,position: 'insideTopLeft', className: 'font-weight-bold'}}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend verticalAlign='bottom' height={36}/>
            {
              revenues.map((item, index) => (
                item.checked ? <Line key={item.key} name={<FormattedMessage id={getKeyLang(item.value)}/>}
                                     type='monotone'
                                     dataKey={item.key} stroke={item.color}/> : null
              ))
            }
          </LineChart> : <Spinner className="text-center" color='success' size="lg" />
        }
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
