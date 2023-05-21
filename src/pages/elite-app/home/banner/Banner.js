import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../../../../assets/scss/elite-app/home/banner.scss'
import { BaseAppConfigs, useDeviceDetect } from 'base-app'
import arrowLeft from '../../../../assets/images/elite-app/home/banner/arrow-left.png'
import arrowRight from '../../../../assets/images/elite-app/home/banner/arrow-right.png'

const Banner = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [width] = useState(window.innerWidth)
  const {isMobile} = useDeviceDetect()


  const nextSlide = () => {
    if(currentImageIndex + 1 <= 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  };

  const prevSlide = () => {
    if(currentImageIndex - 1 >= 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  };

  return (
    <div className='gallery-carousel col-12'>
      <img alt='arrow-left' onClick={prevSlide} className="gallery-carousel-arrow-left gallery-carousel-arrow" src={arrowLeft} />

      <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} showArrows={false} selectedItem={currentImageIndex}
                showIndicators={!isMobile} >

        <img src={`${BaseAppConfigs.RESOURCE_URL}banner-web/${(width > 768 ? '1' : 'mobile1' )}.png`} alt='banner1' />
        <img src={`${BaseAppConfigs.RESOURCE_URL}banner-web/${(width > 768 ? '2' : 'mobile2' )}.png`} alt='banner2' />
      </Carousel>

      <img alt='arrow-right' onClick={nextSlide} className="gallery-carousel-arrow-right gallery-carousel-arrow" src={arrowRight} />
    </div>
  )

}

export default Banner
