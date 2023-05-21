import React, { useEffect, useState } from 'react'
import { AppId, BaseAppConfigs, Checkbox, FormattedMessage, Select } from 'base-app'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Popover, PopoverBody,
  PopoverHeader,
  Row
} from 'reactstrap'
import '../../../assets/scss/app-no1/home.scss'
import banner1 from '../../../assets/images/app-no1/home/banner1.svg'
import ic_logo_sm from '../../../assets/images/app-no1/home/ic_logo_sm.svg'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadHomeChartData,
  loadHomeInfo
} from '../../../redux/actions/app-no1/home'
import { getKeyLang, TIMES } from '../../../configs/app-no1/index'
import 'moment/locale/vi'
import RevenueChart from './RevenueChart'
import BonusChart from './BonusChart'
import DebtChart from './DebtChart'
import ContractsChart from './ContractsChart'
import AccountChart from './AccountChart'
import moreIcon from '../../../assets/images/app-no1/home/more.svg'
import { Utils } from '../../../ultity/index'
import { Check, X } from 'react-feather'
import RevenueRating from './RevenueRating'

const Home = () => {

  const dispatch = useDispatch()
  const { homeInfo } = useSelector(state => state.app.home)
  const { groupId } = useSelector(state => state.auth.user)
  const [homeInfoType, setHomeInfoType] = useState([])

  useEffect(() => {
    dispatch(loadHomeInfo())
    dispatch(loadHomeChartData())
  }, [])

  useEffect(() => {
    const homeInfoType = Object.keys(homeInfo).map(item => (
      {
        key: item,
        value: `home.info.${item}`,
        checked: true
      }
    ))
    setHomeInfoType(homeInfoType)
  }, [homeInfo])

  const canViewDebtChart = () => {
    if (groupId === BaseAppConfigs.USER_ROLE.ADMIN || groupId === BaseAppConfigs.USER_ROLE.KT ||
      groupId === BaseAppConfigs.USER_ROLE.HTKD || groupId === BaseAppConfigs.USER_ROLE.VH) {
      return true
    } else return false
  }

  const canViewAccountChart = () => {
    if (groupId !== BaseAppConfigs.USER_ROLE.BH && groupId !== BaseAppConfigs.USER_ROLE.DTLX &&
      groupId !== BaseAppConfigs.USER_ROLE.VH) {
      return true
    } else return false
  }

  const canViewRevenueRating = () => {
    if (groupId !== BaseAppConfigs.USER_ROLE.BH && groupId !== BaseAppConfigs.USER_ROLE.DTLX && groupId !== BaseAppConfigs.USER_ROLE.VH) {
      return true
    } else return false
  }

  return (
    <div className='home-container'>
      <Row className='home'>
        <Col xs={12} md={4} className='d-flex'>
          <Card className='w-100'>
            <CardHeader>
              <h3 className='mb-2'><FormattedMessage id={`${AppId.APP_NO1}.home.status.contract`} /></h3>
            </CardHeader>
            <CardBody>
              <div className='d-flex mt-0 mt-lg-3'>
                <div>
                  {
                    homeInfoType.length > 0 ? homeInfoType.map(item => (
                      <div key={item.key} className='d-flex mb-2 align-items-center'>
                        <img src={ic_logo_sm} alt={'logo-sm'} />
                        <div className='ml-1 font-weight-bold'>
                          <FormattedMessage
                            id={getKeyLang(item.value)}
                          />
                        </div>
                        {item.key === 'debt' || item.key === 'totalDebt' ? <div
                            className='ml-1 font-weight-bold'>{Utils.numberFormat(homeInfo[item.key] || 0)}</div> :
                          <div
                            className='ml-1 font-weight-bold'>{homeInfo[item.key] || 0}</div>}
                      </div>
                    )) : null
                  }
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card>
            <CardBody className='p-0'>
              <Carousel
                showIndicators
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
              >
                <div className='banner-img'>
                  <img src={banner1} alt='swiper 1' className='img-fluid' />
                </div>
                <div className='banner-img'>
                  <img src={banner1} alt='swiper 2' className='img-fluid' />
                </div>
                <div className='banner-img'>
                  <img src={banner1} alt='swiper 3' className='img-fluid' />
                </div>
              </Carousel>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {groupId !== BaseAppConfigs.USER_ROLE.BH ? <>
        <div>
          <Card>
            <CardBody>
              <RevenueChart />
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardBody>
              <BonusChart />
            </CardBody>
          </Card>
        </div>
      </> : null}

      {groupId !== BaseAppConfigs.USER_ROLE.VH ? <Card>
        <CardBody>
          <ContractsChart />
        </CardBody>
      </Card> : null}

      <Row>
        {canViewDebtChart() ?
          <Col xs={12} md={6}>
            <Card>
              <CardBody>
                <DebtChart />
              </CardBody>
            </Card>
          </Col> : null}

        {canViewAccountChart() ? <Col xs={12} md={6}>
          <Card>
            <CardBody>
              <AccountChart />
            </CardBody>
          </Card>
        </Col> : null}
      </Row>

      {canViewRevenueRating() ? <RevenueRating /> : null}

    </div>
  )
}

export default Home
