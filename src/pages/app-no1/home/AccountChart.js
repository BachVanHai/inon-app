import React, { useEffect, useState } from 'react'
import { Bar, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap'
import moreIcon from '../../../assets/images/app-no1/home/more.svg'
import { FormattedMessage } from 'react-intl'
import {
  ACCOUNT_ADMIN_TYPES,
  ACCOUNT_DT_TYPES,
  CHART_TYPE,
  getKeyLang,
  getXAxisNameByTimeType, TIME_TYPE,
  TIMES
} from '../../../configs/app-no1/index'
import { BaseAppConfigs, Radio, Select } from 'base-app'
import { Check, X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { loadChartDataByType } from '../../../redux/actions/app-no1/home'

const AccountChart = () => {

  const dispatch = useDispatch()
  const { homeAccountsChart } = useSelector(state => state.app.home)
  const { groupId } = useSelector(state => state.auth.user)
  const userRole = BaseAppConfigs.USER_ROLE

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [account, setAccount] = useState([...ACCOUNT_DT_TYPES])
  const [timeType, setTimeType] = useState({ ...TIMES[0] })

  useEffect(() => {
    if (groupId === userRole.KT || groupId === userRole.ADMIN) {
      setAccount([...ACCOUNT_ADMIN_TYPES])
    }
  }, [])

  const loadChartData = (accountType, item) => {
    const request = {
      accountType: accountType.key,
      timeType: item.value
    }
    dispatch(loadChartDataByType(request, CHART_TYPE.ACCOUNT))
  }

  const onChangeAccountType = (key) => {
    const index = account.findIndex(item => item.key === key)
    const accountAlt = account.map(item => {
      item.checked = false
      return item
    })
    accountAlt[index].checked = true
    setAccount(accountAlt)

    loadChartData(accountAlt[index], timeType)
  }

  const onChangeTimeType = (item) => {
    const accountType = account.find(type => type.checked)
    const type = TIMES.find(timeType => timeType.value === item.value)
    setTimeType(type)
    loadChartData(accountType, item)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    let name
    switch (timeType.value) {
      case TIME_TYPE.ALL:
      case TIME_TYPE.CURRENT_WEEK:
      case TIME_TYPE.LAST_WEEK:
        name = <FormattedMessage id={getKeyLang('home.chart.timeTypeRevenue.day')} />
        break
      case TIME_TYPE.CURRENT_MONTH:
      case TIME_TYPE.LAST_MONTH:
        name = <FormattedMessage id={getKeyLang('home.chart.timeTypeRevenue.week')} />
        break
      case TIME_TYPE.CURRENT_YEAR:
      case TIME_TYPE.LAST_YEAR:
        name = <FormattedMessage id={getKeyLang('home.chart.timeTypeRevenue.month')} />
        break
      default:
        name = <FormattedMessage id={getKeyLang('home.chart.timeTypeRevenue.day')} />
        break
    }
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip p-1'>
          <p><span className='font-weight-bold'>{name}</span> {label}</p>
          {payload.map((item, index) => (
            <p key={index} className='desc'><span
              className='font-weight-bold'>{item.name}</span> : {item.value}</p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className='w-100 mt-2'>

      <div className='d-flex align-items-center flex-wrap justify-content-end'>
        <div className='w-175px'>
          <FormattedMessage id={getKeyLang('home.info.time')}>
            {(msg) => (
              <Select options={TIMES} placeholder={msg}
                      value={timeType} onChange={(value) => onChangeTimeType(value)} />
            )}
          </FormattedMessage>
        </div>
        <div className='cursor-pointer ml-2 mb-2 d-flex align-items-center'>
          <img id='account' className='more-icon' src={moreIcon} alt='More icon' />
          <Popover
            className='test'
            placement='right'
            target='account'
            isOpen={popoverOpen}
            toggle={() => setPopoverOpen(!popoverOpen)}
          >
            <PopoverHeader className='d-flex align-items-center justify-content-between'>
              <div className='mr-3'>
                <FormattedMessage id={getKeyLang('home.chart.account.selectInfo')} />
              </div>
              <X className='cursor-pointer' onClick={() => setPopoverOpen(!popoverOpen)} />
            </PopoverHeader>
            <PopoverBody>
              {account.map(item => (
                <div key={item.key} className='d-flex align-items-center'>
                  <Radio
                    color='primary'
                    checked={item.checked}
                    onClick={() => onChangeAccountType(item.key)}
                    icon={<Check className='vx-icon' size={16} />}
                  />
                  <div className='ml-1 font-weight-bold'>
                    <FormattedMessage id={getKeyLang(item.value)} />
                  </div>
                </div>
              ))}
            </PopoverBody>
          </Popover>
        </div>
      </div>

      <div className='text-center mb-1 font-weight-bold text-uppercase font-size-18'>
        <FormattedMessage id={getKeyLang('home.chart.unit.ACCOUNTS')} />
      </div>

      <ResponsiveContainer width='100%' height={250}
                           className={(homeAccountsChart.data.length === 0 ? 'bg-secondary bg-lighten-4 ' : '') + 'd-flex justify-content-center align-items-center'}>
        {!homeAccountsChart.isLoading && homeAccountsChart.data.length >= 0  ?
          <ComposedChart data={homeAccountsChart.data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey='name' label={{
              value: getXAxisNameByTimeType(timeType),
              position: 'insideBottomRight', offset: 0, className: 'font-weight-bold'
            }} />
            <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
            <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar name='Tổng tài khoản' yAxisId='left' dataKey='totalAccounts'
                 barSize={40} fill='#588579' />
            <Line name='Tài khoản mới' yAxisId='right' type='linear' dataKey='newAccounts'
                  stroke='#3C98E6' strokeWidth={3} />
          </ComposedChart> : <Spinner color='success' size='lg' />}
      </ResponsiveContainer>

    </div>
  )
}

export default AccountChart