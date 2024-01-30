import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "reduxStore/rtk";
import { Alert, AlertTitle } from "@mui/material";

import {
  setLoginToken,
  // setNewUserEmail,
  // setNewUserPassword,
  setShowNavbar,
} from "../../reduxStore/slice/userSlice";
import {
  setUserName,
  setUserId,
  addToCart,
} from "reduxStore/slice/addToCartSlice";
import { setIsLogin } from "../../reduxStore/slice/userSlice";
const logoo = require("../../images/MillatLogo_f.png");
import { useSelector } from "react-redux";
const Login = () => {
  const dataFromStore = useSelector((value) => value.user.loginToken.token);
  const loginStatus = useSelector((value) => value.isLogin);
  const loginStatusOfCheck = useSelector((value) => value.addToCart);
  const storeData = useSelector((value) => value.addToCart.cartTotalQuantity);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [addData, response] = useLoginUserMutation();
  useEffect(() => {
    dispatch(setUserId(response && response?.data?.UserId));
    localStorage.setItem("userId", response && response?.data?.UserId);
    dispatch(setUserName(response && response?.data?.UserName));
    localStorage.setItem("userName", response && response?.data?.UserName);
    dispatch(setIsLogin(response && response.data?.IsAuthenticated));
    if (response && response?.isLoading === true) {
      setLoading(true);
    } else if (response && response?.isLoading === false) {
      setLoading(false);
    }

    if (response && response?.data?.IsAuthenticated === true) {
      // setIsLogin(true);
      localStorage.setItem("loginToken", true);
      dispatch(setLoginToken(true));
      dispatch(setShowNavbar(true));
      localStorage.setItem("isLogin", true);
      navigation("/checkout");
      if (storeData !== 0) {
        navigation("/checkout");
      } else if (storeData === 0) {
        navigation("/");
      }
    } else if (response && response?.data?.IsAuthenticated === false) {
      setShowErrorMessage(true);
      setLoading(false);
    } else if (
      storeData === 0 &&
      response &&
      response?.data?.IsAuthenticated === true
    ) {
      navigation("/");
      setLoading(false);
    }
  }, [response, loading]);

  const addHandler = async (value) => {
    await addData(value);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    /* Onsubmit */
    onSubmit: (values) => {
      addHandler(values);
    },
    validationSchema: Yup.object({
      username: Yup.string().email().required("Required Field"),
      password: Yup.string()
        .required("Required Field")
        .min(3, "Password is too short - should be 8 chars minimum. *"),
    }),
  });
  return (
    <div className={styles.mainLoginSection}>
      <Link to="/">
        <img src={logoo} alt="millat-log" className={styles.logo_} />
      </Link>
      <h1 className={styles.colorWhite}>Login to your account</h1>
      <div className={styles.loginFormSection}>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.spacing}>
              <div>
                <label htmlFor="username" className={styles.labelColor}>
                  Email
                </label>
              </div>
              <input
                type="email"
                placeholder="Username"
                name="username"
                id="username"
                className={`${styles.field} ${
                  formik.touched.username && formik.errors.username
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <div>
                {formik.touched.username && formik.errors.username && (
                  <span className={styles.textRed}>
                    {formik.errors.username}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.spacing}>
              <div>
                <label htmlFor="name" className={styles.labelColor}>
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className={`${styles.field} ${
                  formik.touched.password && formik.errors.password
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div>
                {formik.touched.password && formik.errors.password && (
                  <span className={styles.textRed}>
                    {formik.errors.password}
                  </span>
                )}
              </div>
            </div>
            {showErrorMessage && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {/* Invalid Email OR Password —{" "}
                <strong>please register yourself!</strong> */}
                {response && response?.data?.ResponseStatus}—{" "}
                <strong>please register yourself!</strong>
              </Alert>
            )}
            <div className={`${styles.spacing}`}>
              <button
                className={styles.submitBtnStyle}
                type="submit"
                disabled={loading}
              >
                {loading ? <strong> Loading...</strong> : "Submit"}
              </button>
            </div>
            <p>
              To create an account, Click, here to{" "}
              <Link to="/signup">
                <strong>Sign Up</strong>
              </Link>
            </p>

            {!loginStatusOfCheck.userId && !loginStatusOfCheck.username ? (
              <>
                <p>
                  For,{" "}
                  <strong>
                    <Link
                      style={{ color: "red", fontSize: "14px" }}
                      to="/forgetpassword"
                    >
                      ForgotPassword
                    </Link>
                  </strong>
                </p>
                {/* <p className="mt-2">
                  For,{" "}
                  
                  
                </p> */}
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
