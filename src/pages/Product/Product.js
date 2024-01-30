import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useGetProductByIdQuery } from "reduxStore/rtk";
// import { DataContext } from "App";
import { CircularProgress } from "@material-ui/core";
import styles from "./Styles.module.scss";
// tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Breadcrumbs,
  Container,
  Grid,
  Link as BCLink,
  Rating,
} from "@mui/material";
import {
  AddShoppingCart,
  NavigateNext,
  FavoriteBorder,
} from "@mui/icons-material";
import { HiMinus, HiPlus } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  addToCart,
  getTotals,
  setVariationQuantity,
  setAttributeId,
  setVariationId,
  setVariationType,
  setAttributeNaam,
  setVariationNaam,
  // setVariations,
} from "reduxStore/slice/addToCartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const Product = () => {
  const [message, setMessage] = useState("");
  const urlParams = useParams();
  const store = useSelector((value) => value.addToCart);
  const variationType = useSelector((state) => state.addToCart.variationType);
  const AttributeId = useSelector((state) => state.addToCart.AttributeId);
  const VariationNaam = useSelector((state) => state.addToCart.variationNaam);
  const AttributeNaam = useSelector((state) => state.addToCart.attributeNaam);
  const VariationId = useSelector((state) => state.addToCart.VariationId);
  const VariationQuantity = useSelector(
    (state) => state.addToCart.VariationQuantity
  );
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { productID } = urlParams;
  const dispatch = useDispatch();
  const [counterOne, setCounterOne] = useState(0);
  const handleVariationSelection = (
    attributeName,
    variationName,
    attributeId,
    variationId,
    variationQuantity
  ) => {
    const newVariationType = {
      ...variationType,
      [attributeName]: variationName,
    };
    dispatch(setVariationType(newVariationType));
    dispatch(setVariationQuantity(variationQuantity));
    dispatch(setAttributeNaam(attributeName));
    dispatch(setVariationNaam(variationName));
    dispatch(setVariationId(variationId));
    dispatch(setAttributeId(attributeId));
  };
  const handleAddToCart = (value) => {
    if (counterOne === 0) {
      setMessage("Please Select the Quantity.");
      setOpen(true);
      return;
    }
    let data1 = store.LineItems.find((e) => e.ProductId == productID);
    let data2;
    if (
      data.Variations.length >= 1 &&
      data.Variations[0].Variations.length >= 1
    ) {
      data1 = store.LineItems.find((e) => e.VariationId == VariationId);
      data2 = data.Variations[0].Variations.find((e) => {
        return e.VariationId == VariationId;
      });
    }
    if (!data1) {
      setMessage("Items added to cart!");
      setOpen(true);
      dispatch(addToCart({ ...value, productCount: counterOne }));
      dispatch(getTotals());
      dispatch(setVariationType({}));
      dispatch(setVariationQuantity(""));
      dispatch(setAttributeNaam(""));
      dispatch(setVariationNaam(""));
      dispatch(setVariationId(""));
      dispatch(setAttributeId(""));
      setCounterOne(1);
    } else {
      if (data2 && data1.Quantity + counterOne > data2.VariationQuantity) {
        setMessage("Item(s) out of stock!");
        setOpen(true);
      } else if (
        !data1.variationQuantity &&
        data1.Quantity + counterOne > data1.QunatityOfProduct
      ) {
        setMessage("Item(s) out of stock!");
        setOpen(true);
      } else {
        setMessage("Items added to cart!");
        setOpen(true);
        dispatch(addToCart({ ...value, productCount: counterOne }));
        dispatch(getTotals());
        dispatch(setVariationType({}));
        dispatch(setVariationQuantity(""));
        dispatch(setAttributeNaam(""));
        dispatch(setVariationNaam(""));
        dispatch(setVariationId(""));
        dispatch(setAttributeId(""));
        setCounterOne(1);
      }
    }
  };

  useEffect(() => {
    if (counterOne > VariationQuantity && VariationQuantity >= 0) {
      setCounterOne(VariationQuantity > 0 ? VariationQuantity : 0);
    } else {
      setCounterOne(0);
    }
  }, [VariationQuantity]);
  const newVariationQuantity = VariationQuantity - counterOne;
  const { data, error, isLoading, isSuccess, refetch } =
    useGetProductByIdQuery(productID);
  console.log("data", data);

  // const qtyVar = data?.Variations?.every((attribute) =>
  //   attribute.Variations.every((variation) => variation.VariationQuantity === 0)
  // );

  // console.log("Is every variation out of stock?", qtyVar);
  let incNum = () => {
    setCounterOne(counterOne + 1);
  };
  let decNum = () => {
    if (counterOne > 1) {
      setCounterOne(counterOne - 1);
    } else {
      setCounterOne(1);
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function getUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 10);

    return timestamp + randomString;
  }

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
  // tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // product images state
  const [selectedImage, setSelectedImage] = useState();
  const src = selectedImage
    ? `https://frontend.millatsports.com.pk${selectedImage}`
    : data && `https://frontend.millatsports.com.pk${data?.DetailImages[0]}`;

  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div>
      {isLoading ? (
        <div
          className="loader d-flex justify-content-center align-items-center"
          style={{ paddingTop: "20px", width: "100%", height: "100vh" }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div>
          <Navbar />
          {data && data.length !== 0 && (
            <Container sx={{ pb: "1rem" }}>
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNext fontSize="small" />}
                  sx={{ p: "14px 0" }}
                >
                  <BCLink
                    className={styles.brdHov}
                    underline="none"
                    color="inherit"
                    href="/"
                    fontSize={"14px"}
                  >
                    Home
                  </BCLink>
                  <BCLink
                    underline="none"
                    color="text.primary"
                    href="/wishlist"
                    aria-current="page"
                    fontSize={"14px"}
                  >
                    Shopping Cart
                  </BCLink>
                </Breadcrumbs>
              </div>

              {isSuccess && (
                <>
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item md={6} className={styles.left}>
                      <div className={styles.images}></div>
                      <div className={styles.product_images}>
                        <div className={styles.small_images_container}>
                          {data &&
                            data?.DetailImages.map((val, ind) => (
                              <img
                                key={ind}
                                className={styles.small_image}
                                src={`https://frontend.millatsports.com.pk${val}`}
                                alt=""
                                onClick={() => setSelectedImage(val)}
                              />
                            ))}
                        </div>
                        <div className={styles.big_image_container}>
                          <figure
                            style={{
                              backgroundImage: `url(${src})`,
                              backgroundPosition,
                            }}
                            onMouseMove={handleMouseMove}
                            className={styles.mainImage}
                          >
                            <img
                              src={
                                selectedImage
                                  ? `https://frontend.millatsports.com.pk${selectedImage}`
                                  : data &&
                                    `https://frontend.millatsports.com.pk${data?.DetailImages[0]}`
                              }
                              alt=""
                              className={styles.biggg_img}
                            />
                          </figure>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className={styles.right}>
                        <h1>{data.Name}</h1>
                        {data?.DiscountPercentage > 0 ? (
                          <strong>
                            <p>
                              <del className={styles.del}>Rs.{data?.Price}</del>{" "}
                              <ins className={styles.priceColor}>
                                Rs. {data?.DiscountAmount}
                              </ins>
                            </p>
                          </strong>
                        ) : (
                          <strong>
                            <p className={styles.priceColor}>
                              Rs. {data?.Price}
                            </p>
                          </strong>
                        )}

                        <p className={styles.description}>
                          <strong>Short Description:</strong>{" "}
                          {data.ShortDescription}
                        </p>
                        <p className={styles.description}>
                          <strong>Full Description:</strong>{" "}
                          {data.FullDescription}
                        </p>
                        {/* {(data && data.Variations && qtyVar) ||
                        data.Quantity === 0 ? (
                          <p className={`mt-2`} style={{ color: "red" }}>Out of Stock.</p>
                        ) : null} */}
                        {data.Variations ? (
                          <ul style={{ paddingLeft: "0px" }}>
                            {data?.Variations?.map((attribute, index) => {
                              return (
                                <div key={index}>
                                  <p className={styles.attributeName}>
                                    {attribute?.AttributeName}
                                  </p>
                                  <ul className={styles.variationList}>
                                    {attribute.Variations.map(
                                      (variation, index) => (
                                        <li
                                          key={index}
                                          className={styles.variationItem}
                                        >
                                          <button
                                            className={`${
                                              styles.variationButton
                                            } ${
                                              variationType &&
                                              variationType[
                                                attribute?.AttributeName
                                              ] === variation?.VariationName
                                                ? styles.selectedVariation
                                                : ""
                                            }`}
                                            style={{
                                              backgroundColor:
                                                attribute?.AttributeName ===
                                                "Color"
                                                  ? variation?.VariationName
                                                  : "initial",
                                            }}
                                            onClick={() =>
                                              handleVariationSelection(
                                                attribute.AttributeName,
                                                variation.VariationName,
                                                attribute.AttributeId,
                                                variation.VariationId,
                                                variation.VariationQuantity
                                              )
                                            }
                                          >
                                            {variation?.VariationName}
                                          </button>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              );
                            })}
                          </ul>
                        ) : (
                          <div></div>
                        )}
                        <div className={styles.counterSection}>
                          <button
                            className={styles.counterBtn}
                            onClick={() => decNum()}
                          >
                            <HiMinus />
                          </button>
                          <input
                            type={"number"}
                            min={1}
                            value={
                              VariationQuantity &&
                              counterOne > VariationQuantity
                                ? VariationQuantity
                                : data?.Quantity &&
                                  data?.Quantity > 0 &&
                                  counterOne > data?.Quantity
                                ? data?.Quantity
                                : counterOne
                            }
                            readOnly
                            className={styles.counterField}
                          />
                          <button
                            className={styles.counterBtn}
                            onClick={() => {
                              if (
                                (VariationQuantity > 0 &&
                                  counterOne === VariationQuantity) ||
                                (data?.Quantity > 0 &&
                                  counterOne === data?.Quantity)
                              ) {
                                setOpen(true);
                                setMessage("Limited Quantity available");
                              } else if (
                                (VariationQuantity === 0 &&
                                  counterOne === VariationQuantity) ||
                                (data?.Quantity === 0 &&
                                  counterOne === data?.Quantity)
                              ) {
                                setOpen(true);
                                setMessage("Out of stock");
                              } else {
                                incNum();
                              }
                            }}
                          >
                            <HiPlus />
                          </button>
                        </div>
                        <div className={styles.buttons}>
                          {VariationId || data?.Variations.length === 0 ? (
                            <button
                              className={styles.addToCardBtn}
                              onClick={() => {
                                const newData = {
                                  ProductId: data?.Id,
                                  ProductName: data?.Name,
                                  Price: data?.Price,
                                  ItemPrice: data?.DiscountAmount * counterOne,
                                  DiscountAmount: data?.DiscountAmount,
                                  AttributeName: AttributeNaam,
                                  VariationName: VariationNaam,
                                  variationType,
                                  variationQuantity: VariationQuantity,
                                  AttributeId,
                                  VariationId,
                                  UniqueId: getUniqueId(),
                                  QunatityOfProduct: data?.Quantity,
                                  Image: data?.Image,
                                };
                                handleAddToCart(newData);
                              }}
                            >
                              <AddShoppingCart />
                              ADD TO CART
                            </button>
                          ) : (
                            <button className={styles.addToCardBtn}>
                              Select Variation and Quantity First
                            </button>
                          )}

                          <Snackbar
                            open={open}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            message={message}
                            action={action}
                            sx={{
                              top: "50%", // Set top position to 50%
                              transform: "translateY(0%)",
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          />
                        </div>

                        <div className={styles.end}>
                          <div className={styles.socials}>
                            <p>Share on:</p>
                            <div className={styles.socialsIcon}>
                              <div>
                                <FaFacebookF />
                              </div>
                              <div>
                                <FaTwitter />
                              </div>
                              <div>
                                <FaInstagram />
                              </div>
                              <div>
                                <FaYoutube />
                              </div>
                              <div>
                                <FaPinterest />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            label="Description"
                            value="1"
                            style={{ padding: "0px 8px" }}
                          />
                          <Tab
                            label="Information"
                            value="2"
                            style={{ padding: "0px 8px" }}
                          />
                          <Tab
                            label="Shipping & Returns"
                            value="3"
                            style={{ padding: "0px 8px" }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <p className={styles.description}>
                          {data.FullDescription}
                        </p>
                      </TabPanel>
                      <TabPanel value="2">
                        <p className={styles.description}>
                          {data.ShortDescription}
                        </p>
                      </TabPanel>
                      <TabPanel value="3">Cash on delivery</TabPanel>
                    </TabContext>
                  </Box>
                </>
              )}
            </Container>
          )}
          <Footer />
          {/* {data &&
            data?.Variations && data?.Variations?.forEach((value, index) => {
              value.Variations.forEach((value,index) => {
                return value.VariationQuantity > 0 && <h1>out Of Stock</h1>
              })
            })} */}
        </div>
      )}
    </div>
  );
};

export default React.memo(Product);
