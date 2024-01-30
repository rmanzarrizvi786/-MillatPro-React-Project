import React from "react";
import { useEffect } from "react";
import { useGetTopSellingProductsQuery } from "reduxStore/rtk";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/less/navigation";
import "swiper/scss/navigation";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { CircularProgress } from "@mui/material";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import "../OneMoreTop/moreStyle.css";
const MoreTopSelling = () => {
  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetTopSellingProductsQuery();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <div className={styles.headingTopSelling}>
        <h1>Top Selling Products</h1>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        // modules={[Pagination]}
        className="mySwiper container py-4 px-2"
      >
        {isLoading && (
          <div className="loader" style={{ textAlign: "center" }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {isSuccess &&
          data &&
          data?.map((value, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.cardContent}>
                  <div
                    className="img-wrapper"
                    style={{ width: "100%", overflow: "hidden" }}
                  >
                    <img
                      className={styles.innerImg}
                      style={{
                        transition: "0.3s",
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      src={`https://frontend.millatsports.com.pk${value.Image}`}
                    />
                  </div>
                  <Link to={{ pathname: `/product/${value.Id}` }}>
                    <div style={{ width: "100%" }}>
                      <strong>
                        <p
                          className={styles.breakTextOfName}
                          style={{ minHeight: "60px", fontSize: "15px" }}
                        >
                          {value?.Name}
                        </p>
                      </strong>
                      {/* <p className={styles.breakText}>
                        {value.ShortDescription}
                      </p> */}
                    </div>
                  </Link>
                  {value?.DiscountPercentage > 0 ? (
                    <strong>
                      <p>
                        <del className={styles.del}>Rs.{value?.Price}</del>{" "}
                        <ins className={styles.priceColor}>
                          Rs. {value?.DiscountAmount}
                        </ins>
                      </p>
                    </strong>
                  ) : (
                    <strong>
                      <p className={styles.priceColor}>Rs. {value?.Price}</p>
                    </strong>
                  )}
                  <Link
                    className={styles.card_btnnn}
                    to={{ pathname: `/product/${value.Id}` }}
                  >
                    <Button className={`${styles.breakText} ${styles.btn}`}>
                      <ListIcon /> Buy Now
                    </Button>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default MoreTopSelling;
