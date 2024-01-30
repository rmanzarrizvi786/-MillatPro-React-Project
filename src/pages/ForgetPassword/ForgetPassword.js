import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Styles.module.scss";
import { useForgetPasswordMutation } from "reduxStore/rtk";
import { useDispatch, useSelector } from "react-redux";
import SimpleLoader from "components/SimpleLoader/SimpleLoader";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { setUserId } from "reduxStore/slice/addToCartSlice";
import { setUserName } from "reduxStore/slice/addToCartSlice";
import { setShowNavbar } from "reduxStore/slice/userSlice";
import { setIsLogin } from "reduxStore/slice/userSlice";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const logo = require("../../images/MillatLogo_f.png");
const ForgetPassword = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataToPost, response] = useForgetPasswordMutation();

  const addHandler = async (val) => {
    await dataToPost(val);
  };
  const formikk = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required Field"),
    }),

    onSubmit: (values) => {
      formikk.handleReset(values);
      addHandler(values.Email);
    },
  });
  useEffect(() => {
    if (
      response &&
      response?.status === "fulfilled" &&
      response?.isSuccess === true &&
      response?.isError === false
    ) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        localStorage.setItem("isLogin", false);
        localStorage.setItem("loginToken", false);
        dispatch(setShowNavbar(false));
        localStorage.setItem("userId", "");
        localStorage.setItem("userName", "");
        dispatch(setUserId(""));
        dispatch(setUserName(""));
        dispatch(setIsLogin(false));
        navigate("/");
      }, 4000);
    } else if (
      response &&
      response?.isError === true &&
      response?.status === "rejected"
    ) {
      setShowErrorMessage(true);
    }
  }, [response]);
  const handleClose = () => {
    setShowSuccessMessage(false);
    localStorage.setItem("isLogin", false);
    localStorage.setItem("loginToken", false);
    dispatch(setShowNavbar(false));
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    dispatch(setIsLogin(false));
    navigate("/");
  };
  return (
    <div>
      <div className={`${styles.mainSectionOfForget}`}>
        <div className={`container p-4 ${styles.contShadow}`}>
          <div className="row ">
            <div className={`col-12 my-4 text-center ${styles.logCol}`}>
              <img src={logo} alt="logo" />
            </div>
            <div className="col-12">
              <form
                style={{ width: "100%" }}
                method="post"
                id="contactForm"
                name="contactForm"
                onSubmit={formikk.handleSubmit}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-8 form-group ">
                    <h4>For Recovery Enter Your registered Email</h4>
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      id="Email"
                      placeholder="Enter Your Registered Email"
                      value={formikk.values.Email}
                      onChange={formikk.handleChange}
                      onBlur={formikk.handleBlur}
                    />
                    {formikk.errors.Email && formikk.touched.Email && (
                      <p style={{ color: "red", fontSize: "11px" }}>
                        {formikk.errors.Email}
                      </p>
                    )}
                  </div>
                </div>
                {/* {showSuccessMessage && (
                  <div
                    className={`row justify-content-center align-items-center my-3`}
                  >
                    <div className={`col-md-8`}>
                      <Alert severity="success">
                        <AlertTitle>Recoverd Successfully</AlertTitle>
                        {response && response?.data?.Message}—{" "}
                      </Alert>
                    </div>
                  </div>
                )} */}
                {showErrorMessage && (
                  <div
                    className={`row justify-content-center align-items-center my-3`}
                  >
                    <div className={`col-md-8`}>
                      <Alert severity="error">
                        <AlertTitle>Not Recovered Successfully.</AlertTitle>
                        {response && response?.error?.data?.Message}—{" "}
                      </Alert>
                    </div>
                  </div>
                )}
                {response && response?.isLoading ? (
                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 my-3">
                      {/* <CircularProgress color="danger" /> */}
                      <SimpleLoader />
                    </div>
                  </div>
                ) : (
                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 my-3">
                      <input
                        type="submit"
                        value="Send Message"
                        className=" btn btn-primary rounded-0 py-1 px-4"
                      />
                      <span className="submitting"></span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={showSuccessMessage}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Passowrd Recovered Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {response && response?.data?.Message}— Now, You may login again with
            your new password sent on your email.—{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/" onClick={handleClose}>
            Go to Home
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgetPassword;
