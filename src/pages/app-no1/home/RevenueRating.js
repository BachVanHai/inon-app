import React, { useEffect, useState } from 'react'
import { Badge, Card, CardBody, CardHeader, Table } from 'reactstrap'
import { FormattedMessage, Select, useDeviceDetect } from 'base-app'
import { getKeyLang, TIMES_REVENUE } from '../../../configs/app-no1/index'
import { useDispatch, useSelector } from 'react-redux'
import { Utils } from '../../../ultity/index'
import {
  getTop10HighestRevenue,
  getTop10LowestRevenue
} from '../../../redux/actions/app-no1/home'
import top1Icon from '../../../assets/images/app-no1/home/top1.png'
import top2Icon from '../../../assets/images/app-no1/home/top2.png'
import top3Icon from '../../../assets/images/app-no1/home/top3.png'

const REVENUES_RATING_HEADER = [
  'home.info.avatar',
  'partner.account.fullName',
  'home.info.revenue',
  'home.info.contracts',
  'account.createFeeAndBonus.bonusPoint'
]

const RevenueRatingTable = ({ top10Data, isHighest }) => {
  const { isMobile } = useDeviceDetect()
  const revenueNumbers = [1, 0, 2]

  const renderTop3Highest = () => {
    if (top10Data.data.length > 2 && isHighest) {
      return (
        <div className='d-flex justify-content-center flex-column align-items-center mb-3 revenue-rating-card p-1'>
          <div className='d-flex'>
            <div className='width-custom text-center'>
              <img className='mt-2 width-50 height-50' src={top2Icon} alt='' />
            </div>
            <div className='width-custom text-center'>
              <img className='width-50 height-50' src={top1Icon} alt='' />
            </div>
            <div className='width-custom text-center'>
              <img className='mt-2 width-50 height-50' src={top3Icon} alt='' />
            </div>
          </div>

          <div className='d-flex align-items-end mt-1'>
            {revenueNumbers.map((item) => (
              <div className='width-custom d-flex justify-content-center'>
                <img
                  className={
                    'rounded-circle mb-1 ' +
                    (item === 0 ? 'width-60 height-60' : 'avatar-img')
                  }
                  src={top10Data.data[item]?.avatar}
                  alt=''
                />
              </div>
            ))}
          </div>

          <div className='d-flex mb-1 align-items-center text-dark'>
            {revenueNumbers.map((item) => (
              <div className='width-custom text-center'>
                <div className='font-weight-bold'>
                  {top10Data.data[item]?.fullName}
                </div>
              </div>
            ))}
          </div>

          <div className='d-flex mb-1 align-items-center text-revenue'>
            {revenueNumbers.map((item) => (
              <div className='width-custom text-center'>
                <div>
                  {isMobile
                    ? (top10Data.data[item]?.contractValue / 1000000).toFixed(
                        2
                      ) + ' triệu'
                    : Utils.numberFormat(top10Data.data[item]?.contractValue)}
                </div>
              </div>
            ))}
          </div>

          <div className='d-flex mb-1 align-items-center text-number-contract'>
            {revenueNumbers.map((item) => (
              <div className='width-custom text-center'>
                <div>{top10Data.data[item]?.numberContracts}</div>
              </div>
            ))}
          </div>

          <div className='d-flex align-items-center text-bonus'>
            {revenueNumbers.map((item) => (
              <div className='width-custom text-center'>
                <div>
                  {isMobile
                    ? (top10Data.data[item]?.bonusValue / 1000000).toFixed(2) +
                      ' triệu điểm'
                    : top10Data.data[item]?.bonusValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else return null
  }

  const renderTableData = () => {
    const data = [...top10Data.data]
    let check = false
    if (data.length > 2 && isHighest) {
      data.splice(0, 3)
      check = true
    }
    if (isMobile) {
      return (
        <div className='w-100 revenue-rating-card-mobile'>
          {data.map((item, index) => (
            <div className={'p-1' + (index % 2 === 0 ? ' tripped-bg' : '')}>
              <div className='w-100 text-center mb-1'>
                {check ? (
                  <Badge color='primary' className='width-50'>
                    {index + 3}
                  </Badge>
                ) : (
                  <Badge color='primary' className='width-50'>
                    {index + 1}
                  </Badge>
                )}
              </div>
              <div className='d-flex align-items-center'>
                <div className='width-50'>
                  <img
                    className='avatar-img rounded-circle mt-1'
                    src={item.avatar}
                    alt=''
                  />
                </div>
                <div className='ml-1'>
                  <div className='mb-1 font-weight-bold'>{item.fullName}</div>
                  <div className='d-flex mb-1'>
                    <div className='mr-1'>
                      <FormattedMessage id={getKeyLang('home.info.revenue')} />:
                    </div>
                    <div className='text-success'>
                      {Utils.numberFormat(item.contractValue)}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div className='mr-1'>
                      <FormattedMessage
                        id={getKeyLang('home.info.contracts')}
                      />
                      :
                    </div>
                    <div>{item.numberContracts}</div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div className='mr-1'>
                      <FormattedMessage
                        id={getKeyLang('account.createFeeAndBonus.bonusPoint')}
                      />
                      :
                    </div>
                    <div className='text-info'>{item.bonusValue}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <Table responsive striped>
          <thead className='thead-dark'>
            <tr className='text-uppercase'>
              <td></td>
              {REVENUES_RATING_HEADER.map((item) => (
                <td className='text-nowrap font-weight-bold'>
                  <FormattedMessage id={getKeyLang(item)} />
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className='text-center font-weight-bold'>
                  {check ? (
                    <Badge color='secondary'>{index + 4}</Badge>
                  ) : (
                    <Badge color='secondary'>{index + 1}</Badge>
                  )}
                </td>
                <td className='text-nowrap'>
                  <img
                    className='avatar-img rounded-circle'
                    src={item.avatar}
                    alt=''
                  />
                </td>
                <td className='text-nowrap black'>{item.fullName}</td>
                <td className='text-nowrap text-success'>
                  {Utils.numberFormat(item.contractValue)}
                </td>
                <td className='text-nowrap'>{item.numberContracts}</td>
                <td className='text-nowrap text-bonus'>
                  {item.bonusValue}{' '}
                  <FormattedMessage id={getKeyLang('home.rating.point')} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }

  return top10Data.data.length > 0 ? (
    <>
      {renderTop3Highest()}
      {renderTableData()}
    </>
  ) : (
    <h4 className='text-uppercase text-center font-weight-bold'>
      <FormattedMessage id={getKeyLang('home.rating.noData')} />
    </h4>
  )
}

const RevenueRating = () => {
  const dispatch = useDispatch()
  const { top10BestData } = useSelector((state) => state.app.home)
  const { top10WorstData } = useSelector((state) => state.app.home)
  const [highestTimeType, setHighestTimeType] = useState({
    ...TIMES_REVENUE[3]
  })
  const [lowestTimeType, setLowestTimeType] = useState({ ...TIMES_REVENUE[3] })

  useEffect(() => {
    dispatch(getTop10HighestRevenue(highestTimeType.value))
    dispatch(getTop10LowestRevenue(lowestTimeType.value))
  }, [])

  const onChangeLowestTimeType = (item) => {
    setLowestTimeType(item)
    dispatch(getTop10LowestRevenue(item.value))
  }

  const onChangeHighestTimeType = (item) => {
    setHighestTimeType(item)
    dispatch(getTop10HighestRevenue(item.value))
  }

  return (
    <>
      {
        <div className='revenue-rating'>
          <Card>
            <div className='pl-1 pr-1'>
              <h4 className='text-uppercase text-center mt-1'>
                <FormattedMessage
                  id={getKeyLang('home.info.top10PartnerHighestRevenue')}
                />
              </h4>
            </div>
            <CardHeader className='d-flex justify-content-center'>
              <div className='w-100 d-flex justify-content-end mt-1'>
                <div className='width-200'>
                  <FormattedMessage id={getKeyLang('home.info.time')}>
                    {(msg) => (
                      <Select
                        options={TIMES_REVENUE}
                        placeholder={msg}
                        value={highestTimeType}
                        onChange={(value) => onChangeHighestTimeType(value)}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
            </CardHeader>
            <CardBody className='d-flex flex-column align-items-center'>
              <RevenueRatingTable top10Data={top10BestData} isHighest={true} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader className='d-flex justify-content-center pr-1 pl-1'>
              <h4 className='text-uppercase text-center mt-1'>
                <FormattedMessage
                  id={getKeyLang('home.info.top10PartnerLowestRevenue')}
                />
              </h4>
            </CardHeader>
            <CardBody className='d-flex align-items-center flex-column'>
              <div className='d-flex justify-content-end w-100 mt-1'>
                <div className='width-200'>
                  <FormattedMessage id={getKeyLang('home.info.time')}>
                    {(msg) => (
                      <Select
                        options={TIMES_REVENUE}
                        placeholder={msg}
                        value={lowestTimeType}
                        onChange={(value) => onChangeLowestTimeType(value)}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <RevenueRatingTable top10Data={top10WorstData} />
            </CardBody>
          </Card>
        </div>
      }
    </>
  )
}

export default RevenueRating
