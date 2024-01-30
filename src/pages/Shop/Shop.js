import { useParams } from "react-router-dom";
import LoadingCards from "components/LoadingCards/LoadingCards";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Box, Link as BCLink } from "@mui/material";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGetEmcommerceProductsQuery } from "reduxStore/rtk";
import SideBarCategory from "components/SideBarCategory/SideBarCategory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBar from "components/SearchBar/SearchBar";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
//   width: '100%',
//   padding: '0px 16px !important',
//   backgroundColor: 'rgba(255, 255, 255, .05) !important'
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

const Shop = () => {
  const {
    data: allDataProduct,
    error: isError,
    isLoading: loadingData,
    isFetching: fetchingOfData,
    isSuccess,
    refetch: fetchAllDataProducts,
  } = useGetEmcommerceProductsQuery();
  // const [showChildData, setShowChildData] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Determine the range of map data to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const nPage = Math.ceil(
    allDataProduct && allDataProduct?.length / itemsPerPage
  );
  // const number = [...Array(nPage + 1).keys()].slice(1);
  const currentMapData =
    allDataProduct && allDataProduct?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle click event for next page button
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handle click event for previous page button
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchAllDataProducts();
  }, []);
  
  return (
    <>
      {loadingData ? (
        <div className={`${styles.loadingSection}`}>
          <CircularProgress color="inherit" style={{ textAlign: "center" }} />
        </div>
      ) : (
        <div className={styles.main}>
          <Navbar />
          <div className={styles.heroSection}>
            <h5>List</h5>
            <h6>Shop</h6>
          </div>
          <div className={styles.shopProduct}>
            <div className={styles.aside}>
              <div className="pb-3">
                <p className="px-3">
                  <strong>By Category</strong>
                </p>
              </div>
              <SideBarCategory />
            </div>
            <div className={styles.productSection}>
              {fetchingOfData ? (
                <LoadingCards/>
              ) : (
                <>
                  <div style={{ width: "100%" }}>
                    {isSuccess && (
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          {currentMapData &&
                            currentMapData.map((value, index) => {
                              return (
                                <Grid item sm={6} xs={6} md={3} lg={3}>
                                  <Item
                                    key={`${index}`}
                                    className={styles.card}
                                  >
                                    <div
                                      className="img-wrapper"
                                      style={{
                                        width: "100%",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <img
                                        className={styles.cardContentIm}
                                        src={`https://frontend.millatsports.com.pk${
                                          value && value?.Image
                                        }`}
                                        alt="hello"
                                      />
                                    </div>
                                    <div className={styles.pdTopBottom}>
                                      <Link
                                        style={{ textDecoration: "none" }}
                                        to={{
                                          pathname: `/product/${value.Id}`,
                                        }}
                                      >
                                        <strong>
                                          <p
                                            className={`pt-2 ${styles.textWrap}`}
                                          >
                                            {value.Name}
                                          </p>
                                        </strong>
                                        <p
                                          className={`pt-2 ${styles.textWrap}`}
                                        >
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
                                    </div>
                                    <button className={`${styles.cartButtons}`}>
                                      <Link
                                        to={{
                                          pathname: `/product/${value.Id}`,
                                        }}
                                        className={`${styles.linkOfButton} ${styles.textWrap}`}
                                      >
                                        Buy Now{" "}
                                        <ArrowForwardIcon
                                          style={{ fontSize: "15px" }}
                                        />
                                      </Link>
                                    </button>
                                  </Item>
                                </Grid>
                              );
                            })}
                        </Grid>
                      </Box>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className={
                        "d-flex justify-content-center align-items-center"
                      }
                      style={{ marginTop: "40px", width: "100%" }}
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
                        disabled={indexOfLastItem >= allDataProduct?.length}
                        className={`${styles.paginationbutton} ${
                          indexOfLastItem >= allDataProduct?.length
                            ? `${styles.downOp}`
                            : `${styles.paginationbutton}`
                        }`}
                      >
                        Next
                        <ArrowForwardIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Shop;
