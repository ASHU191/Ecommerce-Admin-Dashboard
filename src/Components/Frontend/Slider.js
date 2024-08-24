import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'

// Swiper css
import 'swiper/css/bundle';
import './slider.css'


const Slider = ({banner}) => {
  
  SwiperCore.use([Autoplay, Navigation, Pagination])
  SwiperCore.use(Navigation)


  return (
    <div className='productSlider'>
       <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay
      >
        {banner.map(ban => {
          const { id, status, image } = ban;

          return status === 'active' ? (
              <SwiperSlide key={id}>
                  <img className='product-image' src={image} alt='' />
              </SwiperSlide>
          ) :  null
        })}
      </Swiper>
    </div>
  )
}

export default Slider;