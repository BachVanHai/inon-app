import React, {useState} from 'react'
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap'
import moreIcon from '../../../assets/images/app-no1/home/more.svg'
import { FormattedMessage } from 'react-intl'
import {
  CHART_TYPE,
  CONTRACT_TYPES,
  getKeyLang, getXAxisNameByTimeType, TIME_TYPE,
  TIMES
} from '../../../configs/app-no1/index'
import {Checkbox, Select} from 'base-app'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {Check, X} from "react-feather";
import { useDispatch, useSelector } from 'react-redux'
import { loadChartDataByType } from '../../../redux/actions/app-no1/home'

const ContractsChart = () => {

  const dispatch = useDispatch()
  const {homeContractsChart} = useSelector(state => state.app.home)
  const [contractTypes, setContractTypes] = useState([...CONTRACT_TYPES])
  const [timeType, setTimeType] = useState({...TIMES[0]})

  const [popoverOpen, setPopoverOpen] = useState(false);

  const onChangeContractType = (key) => {
    const index = contractTypes.findIndex(item => item.key === key)
    const checkbox = contractTypes[index];
    const contractTypesAlt = [...contractTypes]
    if (contractTypes.filter(item => item.checked).length > 1) {
      contractTypesAlt[index].checked = !checkbox.checked;
    } else contractTypesAlt[index].checked = true;

    setContractTypes(contractTypesAlt);

    const request = {
      contractType: CONTRACT_TYPES.map(type => type.key),
      timeType: timeType.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.CONTRACT))
  }

  const onChangeTimeType = (item) => {
    const contractType = contractTypes.filter(type => type.checked)
    const type = TIMES.find(timeType => timeType.value === item.value)
    setTimeType(type)
    const request = {
      contractType: contractType.map(type => type.key),
      timeType: item.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.CONTRACT))
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
              className="font-weight-bold">{item.name}</span> : {item.value}</p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-100 mt-2">
      <div className='d-flex align-items-center flex-wrap justify-content-end'>
        <div className="w-175px">
          <FormattedMessage id={getKeyLang('home.info.time')}>
            {(msg) => (
              <Select options={TIMES} placeholder={msg} value={timeType} onChange={(value) => onChangeTimeType(value)}/>
            )}
          </FormattedMessage>
        </div>
        <div className='cursor-pointer mb-2 ml-2'>
          <img id='contract' className="more-icon" src={moreIcon} alt='More icon' />
          <Popover
            className="test"
            placement='right'
            target='contract'
            isOpen={popoverOpen}
            toggle={() => setPopoverOpen(!popoverOpen)}
          >
            <PopoverHeader className="d-flex align-items-center justify-content-between">
              <div className="mr-3">
                <FormattedMessage id={getKeyLang("home.chart.contract.selectInfo")}/>
              </div>
              <X className="cursor-pointer" onClick={() => setPopoverOpen(!popoverOpen)}/>
            </PopoverHeader>
            <PopoverBody>
              {contractTypes.map(item => (
                <div key={item.key} className="d-flex align-items-center">
                  <Checkbox
                    color='primary'
                    checked={item.checked}
                    onClick={() => onChangeContractType(item.key)}
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

      <div className='text-center mb-1 font-weight-bold text-uppercase font-size-18'>
        <FormattedMessage id={getKeyLang("home.info.contracts")} />
      </div>

      <ResponsiveContainer width="100%" height={250} className={(homeContractsChart.data.length === 0 ? "bg-secondary bg-lighten-4 " : "") + "d-flex justify-content-center align-items-center"}>
        {!homeContractsChart.isLoading && homeContractsChart.data.length >= 0 ? <LineChart data={homeContractsChart.data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' label={{
            value: getXAxisNameByTimeType(timeType),
            position: 'insideBottomRight', offset: -15, className:'font-weight-bold'
          }}/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {
            contractTypes.map(item => (
              item.checked ? <Line key={item.key} name={<FormattedMessage id={getKeyLang(item.value)}/>}  type='monotone' dataKey={item.key} stroke={item.color} /> : null

            ))
          }
        </LineChart> : <Spinner color="success" />}
      </ResponsiveContainer>

    </div>
  )
}

export default ContractsChart