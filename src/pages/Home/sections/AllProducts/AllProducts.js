import React from "react";
import styles from "./Styles.module.scss";
import { useGetFeaturedProductQuery } from "reduxStore/rtk";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import ScrollToTopLink from "components/ScrollToTopLink/ScrollToTopLink";

const AllProducts = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetFeaturedProductQuery();

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className={styles.ProductMainSection}>
      <h1>Featured Products</h1>
      <div className={`container ${styles.mainSection}`}>
        <div className={`row ${styles.ProductSection}`}>
          {isLoading && (
            <div
              className="loader"
              style={{ textAlign: "center", paddingTop: "20px", width: "100%" }}
            >
              <CircularProgress
                color="inherit"
                style={{ textAlign: "center" }}
              />
            </div>
          )}

          { isSuccess &&  (
            <>
              {data &&
                data
                  ?.filter((item, index) => index < 8)
                  .map((filteredItem, index) => (
                    <div
                      key={`${index}`}
                      className={`col-lg-3 col-md-6 col-sm-6 py-3 ${styles.card}`}
                    >
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
                            src={`https://frontend.millatsports.com.pk${filteredItem.Image}`}
                            alt="featured images"
                          />
                        </div>
                        <Link to={{ pathname: `/product/${filteredItem.Id}` }}>
                          <strong>
                            <p className={`pt-2 ${styles.wrapText}`}>
                              {filteredItem.Name}
                            </p>
                          </strong>
                          <p className={`${styles.wrapText}`}>
                            {filteredItem?.ShortDescription}
                          </p>
                        </Link>
                        {/* {filteredItem.Variations.length > 0
                          ? filteredItem?.Variations?.map((value, index) => {
                              return (
                                <div>
                                  {value.VariationQuantity === 0 && (
                                    <p key={index}>Out of Stock!</p>
                                  )}
                                </div>
                              );
                            })
                          : null} */}
                        {filteredItem?.DiscountPercentage > 0 ? (
                          <strong>
                            <p className={`pt-2 ${styles.wrapText}`}>
                              <del className={styles.del}>
                                Rs. {filteredItem.Price}
                              </del>{" "}
                              <ins className={styles.ins}>
                                Rs. {filteredItem.DiscountAmount}
                              </ins>
                            </p>
                          </strong>
                        ) : (
                          <strong>
                            <p className={`pt-2 ${styles.price}`}>
                              Rs. {filteredItem?.Price}
                            </p>
                          </strong>
                        )}
                        <Link
                          className={styles.btn_cardd}
                          to={{ pathname: `/product/${filteredItem.Id}` }}
                        >
                          <Button className={`${styles.btnWrap} ${styles.btn}`}>
                            <ListIcon /> Select Options
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
            </>
          )}
        </div>
        <div
          className={`${styles.buttonSection} w-100 d-flex justify-content-center`}
        >
          {data && data?.length > 8 ? (
            <Link className={`${styles.viewMore} px-3 py-2 mt-4`} to="/shop">
              {" "}
              View More Products{" "}
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
