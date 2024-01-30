import { CssBaseline } from "@mui/material";
import { lazy, Suspense, useRef, forwardRef } from "react";
import { useState, createContext, useEffect } from "react";
import ForgetPassword from "pages/ForgetPassword/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import WishList from "pages/Wishlist/Wishlist";
import MuiAlert from "@mui/material/Alert";
import Cart from "pages/Cart/Cart";
import Product from "pages/Product/Product";
import Category from "pages/Category/Category";
import ShopCategory from "pages/ShopCategory/ShopCategory";
import Login from "pages/Login/Login";
import Shop from "pages/Shop/Shop";
import BillingAdress from "pages/BillingAdress/BillingAdress";
// import ForgetPassword from "pages/ForgetPassword/ForgetPassword";
import { ThemeProvider } from "@mui/material/styles";
const Home = lazy(() => import("./pages/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
// export const DataContext = createContext();
import { theme } from "./themes";
import SignUp from "pages/SignUP/SignUp";
import { setShowNavbar } from "reduxStore/slice/userSlice";
import Page404 from "pages/Page404/Page404";
import About from "pages/About/About";
import ChangePassword from "pages/ChangePassword/ChangePassword";
import Contact from "pages/Contact/Contact";
import Loader from "components/Loader/Loader";
import TopBrand from "pages/TopBrand/TopBrand";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const storeData = useSelector((value) => value.addToCart.cartTotalQuantity);
  const storeDat = useSelector((value) => value.addToCart);
  console.log("data", storeDat);

  const showNavbar = useSelector((value) => value.user.showNavbar);
  const loginStatus = useSelector((value) => value.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loginToken = localStorage.getItem("loginToken");
  const loginnToken = localStorage.getItem("loginToken");

  const [isLogin, setIsLogin] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ ...snackbar, open: !snackbar.open });
  };

  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    setIsLogin(login);
  }, [localStorage, isLogin]);
  useEffect(() => {
    if (location.pathname === `/login` || location.pathname === `/signup`) {
      dispatch(setShowNavbar(false));
    } else {
      dispatch(setShowNavbar(true));
    }
  }, [location, showNavbar, setShowNavbar, Routes, localStorage]);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <CssBaseline />
        {/* {window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup" && <Navbar />} */}
        {/* {location.pathname !== `/login` && <DrawerAppBar />} */}
        <Routes>
          {/* {!loginToken ? (
            <> */}
          <Route path="*" element={<Page404 />} />
          <Route
            path="/signup"
            element={
              !storeDat.UserId && !storeDat.UserName ? (
                <SignUp />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:shopID" element={<ShopCategory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/checkout"
            element={
              storeData !== 0 ? <BillingAdress /> : <Navigate to="/cart" />
            }
          />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/topbrand/:ID" element={<TopBrand />} />
          {/* <Route path="/product" element={<Navigate to={"/"} />} /> */}
          <Route
            path="/forgetpassword"
            element={
              (!storeDat.UserId && !storeDat.UserName) || (storeDat.UserId==="" && storeDat.UserName==="") ||
              (storeDat.UserId === "undefined" &&
                storeDat.UserName === "undefined") ? (
                <ForgetPassword />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* </>
          ) : ( */}
          {/* <Route path="/orderplaced" element={<OrderPlaced/>}/> */}
          {/* {!storeDat.UserId && !storeDat.UserName && <Route path="/login" element={<Login/>}/> } */}
          <Route
            path="/login"
            element={
              (!storeDat.UserId && !storeDat.UserName) || (storeDat.UserId==="" && storeDat.UserName==="") ||
              (storeDat.UserName === "undefined" &&
                storeDat.UserId === "undefined") ? (
                <Login />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/changepassword"
            element={
              storeDat.UserId && storeDat.UserName ? (
                <ChangePassword />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        {/* {window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup" && <Footer />} */}

        {/* <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar> */}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
