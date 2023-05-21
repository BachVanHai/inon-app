import '../../../assets/scss/elite-app/home/home.scss'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionSaveRefId } from '../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import SideNav from '../../../components/elite-app/layouts/SideNav'
import Header from '../../../components/elite-app/layouts/Header'
import Products from './products/Products'
import Banner from './banner/Banner'
import Promotion from './promotion/Promotion'
import Footer from '../../../components/elite-app/layouts/Footer'
import circleBottom from '../../../assets/images/elite-app/home/circle-bottom.png'
import circleTop from '../../../assets/images/elite-app/home/circle-top.png'
import circleRight from '../../../assets/images/elite-app/home/circle-right.png'
import circleRightMobile from '../../../assets/images/elite-app/home/circle-right-mobile.png'
import HelpCenter from '../helpCenter/HelpCenter'
import HelpcenterFooter from './helpCeterFooter'
import Support from '../support/Support'
import LiveChat from './live-chat/live-chat'

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isOpenMenu, setMenu] = useState(true)
  const [togglePromotion, setTogglePromotion] = useState(true)
  const [insuranceType, setInsuranceType] = useState('motorVehicleInsurance')
  const [sideNavType, setSideNavType] = useState('products')

  useEffect(() => {
    const refId = new URLSearchParams(document.location.search).get('refId')
    if (!refId) {
      return
    }
    dispatch(actionSaveRefId(refId))
    history.replace(history.location.pathname)
  }, [])

  const toggleMenu = () => {
    setMenu(!isOpenMenu)
  }

  return (
    <div className='home'>
      <SideNav isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} insuranceType={insuranceType}
               setInsuranceType={setInsuranceType} setSideNavType={setSideNavType} />
      <div className='home-right'>
        <div className='flex-grow-1 d-flex flex-column home-right-container'>
          <Header isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} togglePromotion={togglePromotion}
                  setTogglePromotion={setTogglePromotion} setInsuranceType={setInsuranceType} setSideNavType={setSideNavType} />
          <div className='home-right-main flex-grow-1'>
            <div className='home-right-main-products'>
              {
                sideNavType === 'products' ?
                  <Products insuranceType={insuranceType} setInsuranceType={setInsuranceType} /> :
                  sideNavType === 'helpcenter' ?
                    <HelpCenter setSideNavType={setSideNavType} /> : sideNavType === 'support' ?
                      <Support setSideNavType={setSideNavType} /> : ''
              }
              {
                sideNavType === 'helpcenter' ? <HelpcenterFooter setSideNavType={setSideNavType} /> : ''
              }
              {/*Banner*/}
              <Banner />
            </div>
            <div className='home-right-main-promotion'>
              <Promotion togglePromotion={togglePromotion} setTogglePromotion={setTogglePromotion} />
            </div>
            <div>
            <LiveChat sideNavType={sideNavType}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/*Circle background*/}
      <div className='circle-bg'>
        <img className='circle-bottom' src={circleBottom} alt='Circle bottom' />
        <img className='circle-top' src={circleTop} alt='Circle top' />
        <img className='circle-right' src={circleRight} alt='Circle right' />
        <img className='circle-right-mobile' src={circleRightMobile} alt='Circle right mobile' />
      </div>
    </div>
  )
}

export default Home