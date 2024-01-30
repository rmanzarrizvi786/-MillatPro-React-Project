import React from "react";
import styles from "./Styles.module.scss";
import { useGetProductByCategoryNameQuery } from "reduxStore/rtk";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Category = () => {
  const paramName = useParams();
  const { categoryName } = paramName;
  
  
  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetProductByCategoryNameQuery(categoryName);
  console.log("data",data);
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
  }, []);

  return (
    <>
      <div className={styles.mainSection}>
        {isLoading ? (
          <div
            className="loader d-flex justify-content-center align-items-center"
            style={{ paddingTop: "20px", width: "100%", height: "100vh" }}
          >
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <Navbar />
            <div className={styles.heroSection}>
              <h5>{categoryName}</h5>
              <h6>Category</h6>
            </div>
            <div className={`container-fluid ${styles.myContainer}`}>
              <div className={`row justify-content-center py-4`}>
                <div className="col-lg-12 text-center mt-4">
                  <h1>{`${categoryName}`}</h1>
                  <h6 className={styles.subHeadOfTop}>{`All Brands`}</h6>
                </div>
                <hr
                  style={{
                    margin: "10px 0px",
                    borderTop: "1px solid red",
                    opacity: "0.4",
                  }}
                />
                {isSuccess && data && data?.length === 0 ? (
                  <div className="col-lg-12 text-center">
                    <h1>No Product Available</h1>
                  </div>
                ) : (
                  currentMapData &&
                  currentMapData?.map((value, index) => {
                    return (
                      <div
                        className={`col-lg-3 col-md-6 col-sm-6 ${styles.myCol} py-3`}
                        key={index}
                      >
                        <Link to={{ pathname: `/product/${value.Id}` }}>
                          <div className={`${styles.cardContent} text-center`}>
                            <img
                              className={`${styles.productImage}`}
                              src={`https://frontend.millatsports.com.pk${value?.Image}`}
                              alt="product"
                            />
                            <div className={`py-3`}>
                              <p
                                className={`${styles.textOnHover} ${styles.breakText}`}
                              >
                                {value.Name}
                              </p>
                              <p
                                className={`${styles.textOnHover} ${styles.breakText}`}
                              >
                                Rs. {value.Price}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div>
              {currentMapData && currentMapData?.length === 0 ? (
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
            </div>

            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Category;
