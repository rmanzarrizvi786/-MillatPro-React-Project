import React from "react";
import styles from "./Styles.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "reduxStore/rtk";
import LoadingCards from "components/LoadingCards/LoadingCards";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { CircularProgress } from "@mui/material";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import SideBarCategory from "components/SideBarCategory/SideBarCategory";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ShopCategory = () => {
  const Params = useParams();
  const ParamsId = Params.shopID;
 
  const { data, error, isLoading, isFetching, success, refetch } =
    useGetProductByCategoryQuery(ParamsId);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Determine the range of map data to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const records = allDataProduct && allDataProduct?.slice(indexOfFirstItem,indexOfLastItem);
  const nPage = Math.ceil(data && data?.length / itemsPerPage);
  // const number = [...Array(nPage + 1).keys()].slice(1);
  const currentMapData = data && data?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle click event for next page button
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handle click event for previous page button
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    refetch();
  }, [ParamsId]);
  return (
    <>
      {isLoading ? (
        <div
          className={`${styles.loaderOfCategory}`}
          style={{
            textAlign: "center",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          <CircularProgress color="inherit" style={{ textAlign: "center" }} />
        </div>
      ) : (
        <div className={`${styles.main}`}>
          <Navbar />
          <div className={`${styles.heroSection}`}>
            <h5>List</h5>
            <h6>Shop</h6>
          </div>
          <div className={`${styles.shopCategoryProduct}`}>
            <div className={`${styles.asideCategory}`}>
              <div className="pb-3">
                <p className="px-3">
                  <strong>By Category</strong>
                </p>
              </div>
              <SideBarCategory />
            </div>
            <div className={`${styles.productCategoryOfMySection}`}>
              {isFetching ? (
                <LoadingCards />
              ) : (
                <Grid container spacing={2}>
                  {currentMapData?.length === 0 ? (
                    <Grid
                      item
                      sm={12}
                      xs={12}
                      md={12}
                      lg={12}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <h1>No Product.</h1>
                    </Grid>
                  ) : (
                    <>
                      {currentMapData &&
                        currentMapData?.map((value, index) => {
                          return (
                            <Grid item sm={6} xs={6} md={3} lg={3}>
                              <Item key={`${index}`} className={styles.card}>
                                <div
                                  className="img-wrapper"
                                  style={{ width: "100%", overflow: "hidden" }}
                                >
                                  <img
                                    // style={{ maxWidth: "100%", height: "auto" }}
                                    className={styles.cardContentIm}
                                    src={`https://frontend.millatsports.com.pk${value?.Image}`}
                                    alt="product"
                                  />
                                </div>

                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={{ pathname: `/product/${value.Id}` }}
                                >
                                  <strong>
                                    <p className={`pt-2 ${styles.textWrap}`}>
                                      {value?.Name}
                                    </p>
                                  </strong>

                                  <p className={`pt-2 ${styles.textWrap}`}>
                                    {value?.ShortDescription}
                                  </p>
                                </Link>
                                {value?.DiscountPercentage > 0 ? (
                                  <strong>
                                    <p
                                      className={`pt-2 ${styles.paraSize} ${styles.textWrap}`}
                                    >
                                      <del style={{ color: "red" }}>
                                        Rs. {value?.Price}
                                      </del>{" "}
                                      <ins
                                        style={{
                                          color: "green",
                                          textDecoration: "none",
                                        }}
                                      >
                                        Rs. {value?.DiscountAmount}
                                      </ins>
                                    </p>
                                  </strong>
                                ) : (
                                  <strong>
                                    <p
                                      className={`pt-2 ${styles.paraSize}`}
                                      style={{ color: "green" }}
                                    >
                                      Rs. {value?.Price}
                                    </p>
                                  </strong>
                                )}
                                <div className="mt-3">
                                  <button className={`${styles.cartButtons}`}>
                                    <Link
                                      to={{ pathname: `/product/${value.Id}` }}
                                      className={`${styles.linkOfButton} ${styles.textWrap}`}
                                    >
                                      Buy Now{" "}
                                      <ArrowForwardIcon
                                        style={{ fontSize: "15px" }}
                                      />
                                    </Link>
                                  </button>
                                </div>
                              </Item>
                            </Grid>
                          );
                        })}
                    </>
                  )}
                </Grid>
              )}
            </div>
          </div>

          {data && data?.length === 0 ? (
            <></>
          ) : (
            <div
              className={
                "d-flex justify-content-center align-items-center mt-2 mb-5"
              }
              style={{ width: "100%" }}
            >
              {/* <p className="pb-3"><strong>View More Products</strong></p> */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${styles.paginationbutton} ${
                  currentPage === 1
                    ? `${styles.downOp}`
                    : `${styles.paginationbutton}`
                }`}
              >
                <ArrowBackIcon />
                previous
              </button>
              <p className="px-2">{`${currentPage} of ${nPage}`}</p>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastItem >= data?.length}
                className={`${styles.paginationbutton} ${
                  indexOfLastItem >= data?.length
                    ? `${styles.downOp}`
                    : `${styles.paginationbutton}`
                }`}
              >
                Next
                <ArrowForwardIcon />
              </button>
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default ShopCategory;
