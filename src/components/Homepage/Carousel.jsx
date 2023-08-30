import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Carousel.scss';


const Carousel = () => {
  const { carousel } = useContext(GeneralContext);

  return (

    <div className='swiper-container'>
      {carousel.map((item, index) => (
        <div key={index}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            // loop={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={`/images${item.image1}`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/images${item.image2}`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/images${item.image3}`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/images${item.image4}`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/images${item.image5}`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/images${item.image6}`} />
            </SwiperSlide>
          </Swiper>
        </div>
      ))}
    </div>

  );
};

export default Carousel;