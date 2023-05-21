import React from 'react';
import tradeMarkIcon from '../../../assets/images/elite-app/layouts/footer/trade-mark.svg'
import appStoreIcon from '../../../assets/images/elite-app/layouts/footer/app-store.svg'
import googlePlayIcon from '../../../assets/images/elite-app/layouts/footer/google-play.svg'
import qrCodeIcon from '../../../assets/images/elite-app/layouts/footer/qr-code.svg'
import '../../../assets/scss/elite-app/layouts/footer.scss'
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../../../configs/elite-app'

const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        <img className="trade-mark-icon" src={tradeMarkIcon} />
        <div className="mr-md-2 footer-slogan">{new Date().getFullYear()}-{new Date().getFullYear() + 1}: InOn - Bảo hiểm không ngủ</div>
      </div>

      <div className="footer-right">
        <a href={IOS_APP_LINK} target='_blank' className="app-store">
          <img className="cursor-pointer" src={appStoreIcon}/>
        </a>
        <a href={ANDROID_APP_LINK} target='_blank' className="google-play">
          <img className="cursor-pointer" src={googlePlayIcon} />
        </a>
        <img className="d-none d-md-block" src={qrCodeIcon} />
      </div>
    </footer>
  )
}

export default Footer
