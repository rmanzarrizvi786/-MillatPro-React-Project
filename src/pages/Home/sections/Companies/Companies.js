import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Style.css";

const Companies = () => {
  const logos = [
    { logo: require("../../../../images/MBPartner.png") },
    { logo: require("../../../../images/CAPartner.png") },
    { logo: require("../../../../images/MillatPartner.png")},
    { logo: require("../../../../images/MatadorPartner.png")},
    { logo: require("../../../../images/Ihsanlogo.png")},
  ];
  return (
    <>
    <div className='mainCompanySection mt-5'>
      <Swiper className="mySwiper"
        style={{margin: "1.125rem auto 1.125rem auto"}}
        spaceBetween={10}
        breakpoints={{
          "0": {
            slidesPerView: 2
          },
          "420": {
              slidesPerView: 3
          },
          "600": {
              slidesPerView: 4
          },
          "900": {
              slidesPerView: 4
          },
          "1024": {
              slidesPerView: 4
          }
        }}>
        {
          logos.length &&
          logos.map((item, index) => {
            return (<SwiperSlide key={index}>
              <img src={item.logo} alt="" />
            </SwiperSlide>)
          })
        }
      </Swiper>
      <hr style={{borderColor: "#808080"}} />
    </div>
    </>
  );
};

export default Companies;
