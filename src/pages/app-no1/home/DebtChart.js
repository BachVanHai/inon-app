import React, {useState} from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap'
import moreIcon from '../../../assets/images/app-no1/home/more.svg'
import {FormattedMessage} from 'react-intl'
import {
  CHART_TYPE,
  DEBT_TYPES,
  getKeyLang,
  getXAxisNameByTimeType, TIME_TYPE,
  TIMES
} from '../../../configs/app-no1/index'
import {Checkbox, Select} from 'base-app'
import {Check, X} from "react-feather";
import {useDispatch, useSelector} from "react-redux";
import {loadChartDataByType} from "../../../redux/actions/app-no1/home";

const DebtChart = () => {

  const dispatch = useDispatch()
  const {homeDebtChart} = useSelector(state => state.app.home)

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [debtTypes, setDebtTypes] = useState([...DEBT_TYPES])
  const [timeType, setTimeType] = useState({...TIMES[0]})

  const toggleCheckbox = (key) => {
    const index = debtTypes.findIndex(item => item.key === key)
    const checkbox = debtTypes[index];
    const debtTypesAlt = [...debtTypes]
    if (debtTypes.filter(item => item.checked).length > 1) {
      debtTypesAlt[index].checked = !checkbox.checked;
    } else debtTypesAlt[index].checked = true;

    setDebtTypes(debtTypesAlt);
  }

  const onChangeTimeType = (type) => {
    setTimeType(type)

    const debtTypesChecked = debtTypes.filter(item => item.checked)
    const request = {
      debtType: debtTypesChecked.map(item => item.key),
      timeType: type.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.DEBT))
  }

  const CustomTooltip = ({active, payload, label}) => {
    let name;
    switch (timeType.value) {
      case TIME_TYPE.ALL:
      case TIME_TYPE.CURRENT_WEEK:
      case TIME_TYPE.LAST_WEEK:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.day")}/>
        break
      case TIME_TYPE.CURRENT_MONTH:
      case TIME_TYPE.LAST_MONTH:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.week")}/>
        break
      case TIME_TYPE.CURRENT_YEAR:
      case TIME_TYPE.LAST_YEAR:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.month")}/>
        break
      default:
        name = <FormattedMessage id={getKeyLang("home.chart.timeTypeRevenue.day")}/>
        break
    }
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip p-1'>
          <p><span className="font-weight-bold">{name}</span> {label}</p>
          {payload.map((item, index) => (
            <p key={index} className='desc'><span
              className="font-weight-bold">{item.name}</span> : {item.value === 0 ? 0 : item.value.toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className='w-100'>

      <div className="d-flex flex-wrap justify-content-end mt-2">
        <div className="d-flex align-items-center justify-content-end">
          <div className="flex-grow-1 w-175px">
            <FormattedMessage id={getKeyLang('home.info.time')}>
              {(msg) => (
                <Select classNamePrefix='select' onChange={(value) => onChangeTimeType(value)}
                        options={TIMES} placeholder={msg} value={timeType}/>
              )}
            </FormattedMessage>
          </div>
          <div className="cursor-pointer ml-2 mb-2">
            <img id='debt' className="more-icon" src={moreIcon} alt='More icon'/>
            <Popover
              className="test"
              placement='right'
              target='debt'
              isOpen={popoverOpen}
              toggle={() => setPopoverOpen(!popoverOpen)}
            >
              <PopoverHeader className="d-flex align-items-center justify-content-between">
                <div className="mr-3">
                  <FormattedMessage id={getKeyLang("home.chart.debt.selectInfo")}/>
                </div>
                <X className="cursor-pointer" onClick={() => setPopoverOpen(false)}/>
              </PopoverHeader>
              <PopoverBody>
                {debtTypes.map(item => (
                  <div key={item.key} className="d-flex align-items-center">
                    <Checkbox
                      color='primary'
                      checked={item.checked}
                      onClick={() => toggleCheckbox(item.key)}
                      icon={<Check className='vx-icon' size={16}/>}
                    />
                    <div className="ml-1 font-weight-bold">
                      <FormattedMessage id={getKeyLang(item.value)}/>
                    </div>
                  </div>
                ))}
              </PopoverBody>
            </Popover>
          </div>
        </div>
      </div>

      <div className='text-center mb-1 font-weight-bold text-uppercase font-size-18'>
        <FormattedMessage id={getKeyLang("home.info.debt")}/>
      </div>
      <ResponsiveContainer width='100%' height={250} className={(homeDebtChart.data.length === 0 ? "bg-secondary bg-lighten-4 " : "" ) + "d-flex justify-content-center align-items-center"}  >
        {!homeDebtChart.isLoading &&  homeDebtChart.data.length >= 0 ? <ComposedChart width={730} height={250} data={homeDebtChart.data}
                                                        margin={{top: 25, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey='name' label={{
            value: getXAxisNameByTimeType(timeType),
            position: 'insideBottomRight', offset: 0, className: 'font-weight-bold'
          }}/>
          <YAxis label={{
            value: 'Triệu VNĐ',
            angle: 0,
            offset : -20,
            position: 'insideTopLeft',
            className: 'font-weight-bold'
          }}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          {
            debtTypes.map(item => (
              item.checked ? (
                item.type === 'line' ?
                  <Line key={item.key} name={<FormattedMessage id={getKeyLang(item.value)}/>}
                        type='monotone'
                        dataKey={item.key} stroke={item.color}/> :
                  <Bar key={item.key} name={<FormattedMessage id={getKeyLang(item.value)}/>}
                       dataKey={item.key}
                       barSize={20} fill={item.color}/>
              ) : null
            ))
          }
        </ComposedChart> : <Spinner color="success" />}

      </ResponsiveContainer>

    </div>
  )
}

export default DebtChart
