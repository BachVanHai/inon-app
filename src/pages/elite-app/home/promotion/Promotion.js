import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/elite-app/home/promotion.scss'
import giftMobile from '../../../../assets/images/elite-app/home/promotion/gift-mobile.svg'
import giftWeb from '../../../../assets/images/elite-app/home/promotion/gift-web.png'
import closeIcon from '../../../../assets/images/elite-app/home/promotion/close.svg'
import promotionIcon from '../../../../assets/images/elite-app/home/promotion/promotion-icon.svg'
import circle from '../../../../assets/images/elite-app/home/promotion/circle.svg'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../configs/elite-app'

const Promotion = ({ togglePromotion, setTogglePromotion }) => {

  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    // call api ~ fake data
    setPromotions([
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
      "Giảm ngay 15% Bảo hiểm xe oto cho 1000 khách hàng đầu tiên cài đặt app",
    ])
  }, [])

  return (
    <div className='promotion mt-1'>

      <div className="d-md-none d-block">
        <img className={'promotion-icon' + (togglePromotion ? 'd-block' : 'd-none')} src={giftMobile} />
        {/*onClick={() => setTogglePromotion(!togglePromotion)} />*/}
      </div>
      <div className="d-none d-md-block mt-3 gift-web">
        <img className={'promotion-icon ' + (togglePromotion ? 'd-block' : 'd-none')} src={giftWeb} />
        {/*onClick={() => setTogglePromotion(!togglePromotion)} />*/}
      </div>
      <div className={'promotion-popover position-fixed d-none' + (!togglePromotion ? 'open' : '')}>
        <div className='promotion-popover-header mb-1 d-none d-md-flex justify-content-end'>
          <img className="mx-1" src={closeIcon} onClick={() => setTogglePromotion(!togglePromotion)} />
        </div>
        <div className='promotion-popover-content px-2'>
          <div className='promotion-for-you py-1 mb-2'>
            <div className="w-100 d-flex justify-content-center">
              <img className='mb-1 d-none d-md-block' src={promotionIcon} />
            </div>

            <div className='promotion-for-you-text'>
              <FormattedMessage id={getKeyLang("promotion.yourPromotion")} />
            </div>
          </div>

          <div className='overflow-auto h-520px promotions'>
            {promotions.map((item, index) => (
              <div className='mb-2' key={index}>
                <div className='d-flex bg-white promotion-discount p-1'>
                  <img src={circle} />
                  <div className='promotion-discount-text'>
                    {item}
                  </div>
                </div>
                <div className='bg-white promotion-detail-btn text-center p-1'>
                  <div className='p-1'>
                    <FormattedMessage id={getKeyLang("promotion.see.detail")} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promotion