import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../../../../assets/scss/elite-app/home/products.scss'
import { actionCheckPendingContract } from '../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_PRODUCTS } from '../../../../configs/elite-app'

import bshIcon from '../../../../assets/images/elite-app/home/products/bsh-icon.svg'
import ptiIcon from '../../../../assets/images/elite-app/home/products/pti-icon.svg'

const Products = ({ insuranceType, setInsuranceType }) => {

  const history = useHistory()
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(1)
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const renderColumn = (item, index, insuranceType) => {
    return (
      <div key={index} className={width <= 768 ? (index % 2 === 0 ? 'col-6 mb-1 col-6-custom-even' : 'col-6 mb-1 col-6-custom-odd') : 'col-xs-12 col-lg-6 col-xl-4 mb-28px'}
        onClick={() => onClickBuyInsurance(item.key)}>
        <div className="insurance-card">
          <div className='d-flex align-items-center justify-content-between mb-lg-1'>
            <div className='vehicle-icon'>
              <img src={item.image} />
            </div>
            <div>
              {item.key === 'homesafety' && <img src={bshIcon} />}
              {item.key === 'bc' && <img src={bshIcon} />}
              {item.key === 'vta' && <img src={ptiIcon} />}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between flex-grow-1">
            <div className='insurance-name mb-lg-1'>
              <FormattedMessage id={getKeyLang(`insurance.${item.key}`)} />
            </div>
            <div className='buy-now'>
              <FormattedMessage id={getKeyLang(`insurance.buyNow`)} values={{ price: item.price }} />
            </div>
          </div>
        </div>

      </div>
    )
  }

  const onClickInsurance = (index, insuranceType) => {
    setActiveTab(index)
    setInsuranceType(insuranceType)
  }

  const onClickBuyInsurance = (insuranceType) => {
    dispatch(actionCheckPendingContract(insuranceType, () => history.push(`/buy-insurance/${insuranceType}`)))
  }

  return (
    <div className='products-container'>
      <div className='col-12 insurance-title'>
        <FormattedMessage id={getKeyLang('menu.insurance')} />
      </div>
      <div className='insurance-type-tab my-1'>
        <div className={'insurance-type-tab-title mx-1 ' + (activeTab === 1 ? 'insurance-type-tab-active' : '')}
          onClick={() => onClickInsurance(1, 'motorVehicleInsurance')}>
          <FormattedMessage id={getKeyLang('home.carInsurance')} />
        </div>
        <div className={'insurance-type-tab-title mr-1 ' + (activeTab === 2 ? 'insurance-type-tab-active' : '')}
          onClick={() => onClickInsurance(2, 'personalInsurance')}>
          <FormattedMessage id={getKeyLang('home.personalInsurance')} />
        </div>
        {/*<div className={"insurance-type-tab-title mr-1 " + (activeTab === 3 ? "insurance-type-tab-active" : '')}*/}
        {/*     onClick={() => onClickInsurance(3, "technicalPropertyInsurance")}>*/}
        {/*  <FormattedMessage id={getKeyLang("home.technicalPropertyInsurance")} />*/}
        {/*</div>*/}
        {/*<div className={"insurance-type-tab-title mr-1 " + (activeTab === 4 ? "insurance-type-tab-active" : '')}*/}
        {/*     onClick={() => onClickInsurance(4, "tripTravelInsurance")}>*/}
        {/*  <FormattedMessage id={getKeyLang("home.tripTravelInsurance")} />*/}
        {/*</div>*/}
        <div className={'insurance-type-tab-title mr-1 ' + (activeTab === 5 ? 'insurance-type-tab-active' : '')}
          onClick={() => onClickInsurance(5, 'motorInsurance')}>
          <FormattedMessage id={getKeyLang('home.motorInsurance')} />
        </div>
        <div className={'insurance-type-tab-title mr-1 ' + (activeTab === 6 ? 'insurance-type-tab-active' : '')}
          onClick={() => onClickInsurance(6, 'homeprivate')}>
          <FormattedMessage id={getKeyLang('home.homeprivate')} />
        </div>
      </div>
      <h3 className='list-product-title col-12'>
        <FormattedMessage id={getKeyLang('home.listProduct')} />
      </h3>
      <div className='insurances'>
        <div className='d-flex flex-wrap'>
          {INSURANCE_PRODUCTS[insuranceType]?.map((item, index) => (
            renderColumn(item, index, insuranceType)
          ))}
        </div>
      </div>
      {/*<Pagination*/}
      {/*  className="pagination-bar mt-1"*/}
      {/*  currentPage={currentPage}*/}
      {/*  totalCount={PRODUCTS[type].length}*/}
      {/*  pageSize={PageSize}*/}
      {/*  onPageChange={page => setCurrentPage(page)}*/}
      {/*/>*/}
    </div>
  )
}

export default Products
