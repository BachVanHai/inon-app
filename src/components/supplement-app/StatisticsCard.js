import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import Chart from 'react-apexcharts'

const StatisticsCards = (props) => {

  const [statValue, setStatValue] = useState(props.value + '%')

  const onBlur = (e) => {
    let value = e.target.innerText;
    value = value.replace('%', '')
    value = isNaN(value) ? props.value : +value;
    value = value < 0 ? 0 : value;
    value = value > props.maxValue ? props.maxValue : value;
    setStatValue(value + '%');
    e.target.innerText = value + '%'
    props.onChangeValue(value, props.id)
  }

  useEffect(() => {
    setStatValue(props.value + '%')
  }, [props.value])

  

  return (
    <Card className='h-100'>
      <CardBody
        className={`${
          props.className ? props.className : 'stats-card-body'
          } d-flex ${
          !props.iconRight && !props.hideChart
            ? 'flex-column align-items-start'
            : props.iconRight
              ? 'justify-content-between flex-row-reverse align-items-center'
              : props.hideChart && !props.iconRight
                ? 'justify-content-center flex-column text-center'
                : null
          } ${!props.hideChart ? 'pb-0' : 'pb-2'} pt-2`}
      >
        <div className='icon-section'>
          <div
            className={`avatar avatar-stats p-50 m-0 ${
              props.iconBg
                ? `bg-rgba-${props.iconBg}`
                : 'bg-rgba-primary'
              }`}
          >
            <div className='avatar-content'>{props.icon}</div>
          </div>
        </div>
        <div className='title-section'>
          <h2 className='text-bold-600 mt-1 mb-25' contentEditable={!props.readOnly}  onBlur={onBlur}>{statValue}</h2>
          <p className='mb-0'>{props.statTitle}</p>
        </div>
      </CardBody>
      {!props.hideChart && (
        <Chart
          options={props.options}
          series={props.series}
          type={props.type}
          height={props.height ? props.height : 100}
        />
      )}
    </Card>
  )
}
export default StatisticsCards
