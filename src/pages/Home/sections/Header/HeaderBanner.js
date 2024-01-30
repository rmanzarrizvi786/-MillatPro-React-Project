import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import styles from "./Styles.module.scss";
import { Box } from '@mui/material';

const bannerThree = require('../../../../images/misbahNew2.png')
const bannerFour = require('../../../../images/chachaIftikhar.jpg')
const suadShakeel = require('../../../../images/myBanner.png')
const banner_two = require('../../../../images/Millat Banners 2.png')
const HeaderBanner = () => {
  return (
    <Swiper 
      navigation={true} modules={[Navigation, Autoplay]} 
      className={`${styles.swiper} swiperC`} 
      autoplay={{delay: 6000, 
      disableOnInteraction: false,
      pauseOnMouseEnter: true }}>
      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>
        </Box>
        <Box component="img" className={styles.photo1} src={suadShakeel} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>
        </Box>
        <Box component="img" className={styles.photo2} src={banner_two} />
      </SwiperSlide>

      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>
          <p style={{color:'red'}} className={`${styles.bannerSubHeading}`}>RECOMMENDED BY MISBAH UL HAQ</p>
          <h1>LETS UPGRATE</h1>
          <h1>BATTING GLOVES</h1>
        </Box>
        <Box component="img" className={styles.photo2} src={bannerThree} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>        
        </Box>
        <Box component="img" className={styles.photo2} src={bannerFour} />
      </SwiperSlide>
    </Swiper>
  );
}

export default HeaderBanner;
