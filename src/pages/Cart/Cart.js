import React, { useContext, useState } from "react";
// import { DataContext } from "App";
import {
  Breadcrumbs,
  Container,
  Grid,
  Button,
  Link as BCLink,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavigateNext, Close } from "@mui/icons-material";
import { HiPlus, HiMinus } from "react-icons/hi";
import { TbRefresh } from "react-icons/tb";
import styles from "./Styles.module.scss";
import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} from "reduxStore/slice/addToCartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const Cart = () => {
  const navigate = useNavigate();
  const cardData = useSelector((value) => value.addToCart);

  const loginStatus = useSelector((value) => value.user.loginToken);
  const loginTokken = localStorage.getItem("loginToken");
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cardData, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleAddToCart = (product) => {
    const newData = {
      ...product,
      productCount: 0,
    };

    dispatch(addToCart(newData));
  };
  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname);
  };

  const handleButtonClickToShopPage = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/shop');
  };
  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    // const login = false;
    setIsLogin(login);
  }, [localStorage, isLogin]);

  return (
    <>
      <Navbar />
      {cardData.LineItems.length === 0 ? (
        <div style={{ width: "100%" }}>
          <div className={styles.bg}>
            <h5>Shopping Cart</h5>
            <h6>Shop</h6>
          </div>
          <Container>
            <div className={styles.breadcrumb}>
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNext fontSize="small" />}
                  sx={{ p: "14px 10px" }}
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
                    href="/cart"
                    aria-current="page"
                    fontSize={"14px"}
                  >
                    Shopping Cart
                  </BCLink>
                </Breadcrumbs>
              </div>
            </div>
          </Container>
          <hr
              style={{
                margin: "0 0 40px",
                border: "none",
                borderBottom: "1px solid #ebebeb",
              }}
            />
          <Grid container spacing={2} style={{ padding: "30px" }}>
            <Grid
              item
              lg={8}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="text-center">
                <ShoppingCartIcon style={{ color: "red", fontSize: 80 }} />
                <p className="mt-3">No products added to the cart</p>
                    <div className="mt-4">
                    <Link to='/shop' className={styles.buttonOfShopNow}>Shop Now</Link>
                    </div>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className={styles.checkOutProcess}>
                <div className={styles.cartDetail}>
                  <h5>Cart Total</h5>
                  <p>
                    Sub Total: <span>...</span>
                  </p>
                </div>
                <div className={styles.shipping}>
                  <p className={styles.title}>Shipping: </p>
                  <p className={styles.title}>Cash on delivery.</p>
                </div>

                <div className={styles.end}>
                  <p>
                    Total: <span>...</span>
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div className={styles.bg}>
            <h5>Shopping Cart</h5>
            <h6>Shop</h6>
          </div>
          <Container>
            <div className={styles.breadcrumb}>
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNext fontSize="small" />}
                  sx={{ p: "14px 10px" }}
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
            </div>
          </Container>
          <hr
            style={{
              margin: "0 0 40px",
              border: "none",
              borderBottom: "1px solid #ebebeb",
            }}
          />
          <Grid container spacing={2} style={{ padding: "30px" }}>
            <Grid item lg={8} xs={12}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Variation</th>
                    <th>Price</th>
                    {/* <th>Discount Price</th> */}
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cardData.LineItems.map((value, index) => {
                    return (
                      <tr key={`${index}`}>
                        <td>
                          <img
                            style={{ maxWidth: "50px" }}
                            src={`https://frontend.millatsports.com.pk${value?.Image}`}
                            alt=""
                          />
                          <Link
                            to={{ pathname: `/product/${value.ProductId}` }}
                            state={{ value: value }}
                            style={{
                              textDecoration: "none",
                              color: "#212529",
                              paddingLeft: "10px",
                            }}
                          >
                            {value.ProductName}
                          </Link>
                        </td>
                        <td>
                          {value && value?.VariationId ? (
                            `${value?.VariationName}`
                          ) : (
                            <p>No Varient</p>
                          )}
                        </td>
                        <td>{value.DiscountAmount}</td>
                        {/* <td>{value.DiscountAmount}</td> */}
                        {/* <td>
                          <h4>{value.cartQuantity}</h4>
                        </td> */}
                        <td className={styles.quantity}>
                          <div>
                            <button onClick={() => handleDecreaseCart(value)}>
                              <HiMinus />
                            </button>
                            <input
                              type={"number"}
                              min={1}
                              value={
                                value.variationQuantity > 0 &&
                                value.Quantity > value.variationQuantity
                                  ? value.variationQuantity
                                  : value.Quantity
                              }
                              readOnly
                            />

                            <button
                              disabled={
                                value.variationQuantity === value.Quantity
                              }
                              onClick={() => handleAddToCart(value)}
                            >
                              <HiPlus />
                            </button>
                          </div>
                        </td>

                        <td>Rs {value.DiscountAmount * value.Quantity}</td>

                        <td>
                          <div
                            className={styles.deleteBtn}
                            onClick={() => handleRemoveFromCart(value)}
                          >
                            <Close />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className={styles.checkOutProcess}>
                <div className={styles.cartDetail}>
                  <h5>Cart Total</h5>
                  <p>
                    Sub Total: <span>{cardData.TotalPrice}</span>
                  </p>
                </div>
                <div className={styles.shipping}>
                  <p className={styles.title}>Shipping: </p>
                  <p className={styles.title}>Cash on delivery.</p>
                </div>

                <div className={styles.end}>
                  <p>
                    Total: <span>{cardData.TotalPrice}</span>
                  </p>
                  <button
                    className={styles.continueBtn}
                    onClick={() => {
                      if (loginTokken === "true") {
                        navigate("/checkout");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
              <Button
                onClick={() => handleClearCart()}
                className={styles.continueBtn}
              >
                Remove All Cart Items <TbRefresh />
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
