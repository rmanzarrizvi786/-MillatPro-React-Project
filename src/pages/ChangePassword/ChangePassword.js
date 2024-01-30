import React from "react";
import styles from "./Styles.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangePasswordMutation } from "reduxStore/rtk";
import SimpleLoader from "components/SimpleLoader/SimpleLoader";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
const logo = require("../../images/MillatLogo_f copy.png");
import { useDispatch } from "react-redux";
import { setShowNavbar } from "reduxStore/slice/userSlice";
import { setUserId } from "reduxStore/slice/addToCartSlice";
import { setUserName } from "reduxStore/slice/addToCartSlice";
import { setIsLogin } from "reduxStore/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const ChangePassword = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataToPost, response] = useChangePasswordMutation();
  const handleChangePassword = async (value) => {
    await dataToPost(value);
  };
  
  const formik = useFormik({
    initialValues: {
      EmailAddress: "",
      OldPassword: "",
      NewPassword: "",
      ConfirmNewPassword: "",
    },
    validationSchema: Yup.object({
      EmailAddress: Yup.string().required("Username is required"),
      OldPassword: Yup.string()
        .required("Old Password is required")
        .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      NewPassword: Yup.string()
        .required("New Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      ConfirmNewPassword: Yup.string()
        .oneOf([Yup.ref("NewPassword")], "Passwords does not match")
        .required("Confirm New Password is required")
        .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
    onSubmit: (values) => {
      // Handle password change logic
      
      handleChangePassword(values);
    },
  });
  useEffect(() => {
    if (
      response &&
      response?.isSuccess === true &&
      response?.status === "fulfilled"
    ) {
      setShowMessage(true);

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
    setShowMessage(false);
    localStorage.setItem("isLogin", false);
    localStorage.setItem("loginToken", false);
    dispatch(setShowNavbar(false));
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    dispatch(setIsLogin(false));
    // setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <div className={`mainSectionChangePassword`}>
        <div className={`container`}>
          <div className={`row justify-content-center`}>
            <div className={`col-12 my-4 text-center ${styles.logCol}`}>
              <img src={logo} alt="logo" />
            </div>

            <div className="col-lg-10 col-md-12 col-sm-12 ">
              <form
                style={{ width: "100%" }}
                method="post"
                id="contactForm"
                name="contactForm"
                onSubmit={formik.handleSubmit}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-8 form-group ">
                    <h4 className="text-center">Change Password</h4>
                    <div>
                      <label>
                        <strong>User Name:</strong>{" "}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="EmailAddress"
                        id="EmailAddress"
                        placeholder="Enter Your UserName"
                        value={formik.values.EmailAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.EmailAddress &&
                        formik.touched.EmailAddress && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formik.errors.EmailAddress}
                          </p>
                        )}
                    </div>
                    <div className="mt-3">
                      <label>
                        <strong>Old Password:</strong>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="OldPassword"
                        id="OldPassword"
                        placeholder="Enter Your Old Password"
                        value={formik.values.OldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.OldPassword &&
                        formik.touched.OldPassword && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formik.errors.OldPassword}
                          </p>
                        )}
                    </div>
                    <div className="mt-3">
                      <label>
                        <strong>New Password:</strong>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="NewPassword"
                        id="NewPassword"
                        placeholder="Enter Your New Password"
                        value={formik.values.NewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.NewPassword &&
                        formik.touched.NewPassword && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formik.errors.NewPassword}
                          </p>
                        )}
                    </div>
                    <div className="mt-3">
                      <label>
                        <strong>Re-Enter New Password:</strong>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="ConfirmNewPassword"
                        id="ConfirmNewPassword"
                        placeholder="Enter Your New Password"
                        value={formik.values.ConfirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.ConfirmNewPassword &&
                        formik.touched.ConfirmNewPassword && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formik.errors.ConfirmNewPassword}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
                {/* {showMessage && (
                  <div
                    className={`row my-3 justify-content-center align-items-center`}
                  >
                    <div className={`col-md-8`}>
                      <Alert severity="success">
                        <AlertTitle>Changed Successfully</AlertTitle>
                        {response && response?.data?.Message}—{" "}
                        <p>
                          Now go to login, and login yourself again—{" "}
                          <Link to="/login" onClick={() => toLogOut()}>
                            Login
                          </Link>
                        </p>
                      </Alert>
                    </div>
                  </div>
                )} */}
                {showErrorMessage && (
                  <div
                    className={`row my-3 justify-content-center align-items-center`}
                  >
                    <div className={`col-md-8`}>
                      <Alert severity="error">
                        <AlertTitle>
                          Password Doesn't, Changed Successfully
                        </AlertTitle>
                        {response && response?.error?.data?.Message}—{" "}
                      </Alert>
                    </div>
                  </div>
                )}
                {response.isLoading ? (
                  <div className="row mt-4 justify-content-center align-items-center">
                    <div className="col-md-8 my-3">
                      <SimpleLoader />
                    </div>
                  </div>
                ) : (
                  <div className="row mt-4 justify-content-center align-items-center">
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
        open={showMessage}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Passowrd Changed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {response && response?.data?.Message}—{" "}
          Now go to login, and login yourself again—{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to='/' onClick={handleClose}>Go to Home</Link>
          {/* <Link onClick={handleClose} autoFocus>
            Agree
          </Link> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
