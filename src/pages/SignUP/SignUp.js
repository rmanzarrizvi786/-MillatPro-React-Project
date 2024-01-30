import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSignupUserMutation } from "../../reduxStore/rtk/index";
import { CircularProgress, Alert, AlertTitle } from "@mui/material";
const logoo = require("../../images/MillatLogo_f.png");
const SignUp = () => {
  // const dataOfSignUp = useSelector((value) => value.user.signupUser);
  const navigate = useNavigate();
  const [dataToPost, response] = useSignupUserMutation();
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const addHandler = async (values) => {
    await dataToPost(values);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // debugger;
    if (response?.isLoading === true) {
      setLoading(true);
    } else if (response && response?.error?.originalStatus === 200) {
      navigate("/login");
    } else if (response && response?.error?.originalStatus === 400) {
      setShowErrorMessage(true);
      setLoading(false);

      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
  }, [response]);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      Password: "",
      ConfirmPassword: "",
      PhoneNumber: "",
    },
    /* Onsubmit */
    onSubmit: (values) => {
      addHandler(values);
    },
    validationSchema: Yup.object({
      FirstName: Yup.string()
        .min(3, "Name must be between 3 to 30 charachters")
        .max(30, "Name must be between 3 to 30 charachters")
        .required("Required Field"),
      LastName: Yup.string()
        .min(3, "Name must be between 3 to 30 charachters")
        .max(30, "Name must be between 3 to 30 charachters")
        .required("Required Field"),
      email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required Field"),
      Password: Yup.string()
        .required("Required Field")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      ConfirmPassword: Yup.string()
        .required("Please retype your password.")
        .oneOf([Yup.ref("Password")], "Your passwords do not match."),
      PhoneNumber: Yup.string()
        .required("Please Enter the Phone Number")
        .matches(phoneRegExp, "Phone number is not valid")
        .min(11, "too short")
        .max(11, "too long"),
    }),
  });
  return (
    <div className={styles.mainLoginSection}>
      <Link to="/">
        <img src={logoo} alt="" className={styles.logo_} />
      </Link>
      <h1 className={styles.colorWhite}>create new account</h1>
      <div className={styles.loginFormSection}>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.spacing}>
              <div>
                <label htmlFor="FirstName" className={styles.labelColor}>
                  First Name
                </label>
              </div>
              <input
                type="text"
                placeholder="First Name"
                name="FirstName"
                id="FirstName"
                className={`${styles.field} ${
                  formik.touched.FirstName && formik.errors.FirstName
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.FirstName}
              />
              <div>
                {formik.touched.FirstName && formik.errors.FirstName && (
                  <span className={styles.textRed}>
                    {formik.errors.FirstName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.spacing}>
              <div>
                <label htmlFor="LastName" className={styles.labelColor}>
                  Last Name
                </label>
              </div>
              <input
                type="text"
                placeholder="Last Name"
                name="LastName"
                id="LastName"
                className={`${styles.field} ${
                  formik.touched.LastName && formik.errors.LastName
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.LastName}
              />
              <div>
                {formik.touched.LastName && formik.errors.LastName && (
                  <span className={styles.textRed}>
                    {formik.errors.LastName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.spacing}>
              <div>
                <label htmlFor="email" className={styles.labelColor}>
                  Email
                </label>
              </div>
              <input
                type="email"
                placeholder="User Name"
                name="email"
                id="email"
                className={`${styles.field} ${
                  formik.touched.email && formik.errors.email
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div>
                {formik.touched.email && formik.errors.email && (
                  <span className={styles.textRed}>{formik.errors.email}</span>
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
                name="Password"
                id="Password"
                placeholder="Password"
                className={`${styles.field} ${
                  formik.touched.Password && formik.errors.Password
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
              />
              <div>
                {formik.touched.Password && formik.errors.Password && (
                  <span className={styles.textRed}>
                    {formik.errors.Password}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.spacing}>
              <div>
                <label htmlFor="confirmpassword" className={styles.labelColor}>
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                className={`${styles.field} ${
                  formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ConfirmPassword}
              />
              <div>
                {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword && (
                    <span className={styles.textRed}>
                      {formik.errors.ConfirmPassword}
                    </span>
                  )}
              </div>
            </div>

            {/*Phone Number field */}
            <div className={styles.spacing}>
              <div>
                <label htmlFor="PhoneNumber" className={styles.labelColor}>
                  Phone Number
                </label>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                name="PhoneNumber"
                id="PhoneNumber"
                className={`${styles.field} ${
                  formik.touched.PhoneNumber && formik.errors.PhoneNumber
                    ? `${styles.borderRed}`
                    : `${styles.borderGrey}`
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.PhoneNumber}
              />
              <div>
                {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                  <span className={styles.textRed}>
                    {formik.errors.PhoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div>
              {showErrorMessage && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  User Already Exist
                </Alert>
              )}
            </div>
            <div className={`${styles.spacing}`}>
              <button className={styles.submitBtnStyle} type="submit">
                {loading ? <CircularProgress /> : "Submit"}
              </button>
            </div>
            <p>
              Already have an account? Click, here to{" "}
              <Link to="/login">
                {" "}
                <strong>Login</strong>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
