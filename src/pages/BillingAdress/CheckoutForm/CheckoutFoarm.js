import React, { useEffect } from "react";
import "./checkForm_style.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "reduxStore/slice/addToCartSlice";
import { useCheckOutMutation } from "reduxStore/rtk";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { CircularProgress, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const thumbsUp = require("../../../images/ThumbsUp.png");
const CheckoutFoarm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addToCartData = useSelector((value) => value.addToCart);
  
  const loginStatus = useSelector((value) => value.user.loginToken);
  const setIsLogin = useSelector((value) => value.user);
  const navigate = useNavigate();
  const [addDataOfCheckOut, response] = useCheckOutMutation();
  const addHandler = async (val) => {
    await addDataOfCheckOut(val);
  };
  useEffect(() => {
    if (!loginStatus.token) {
      navigate("/login");
    }

    if (response && response?.isLoading === true) {
      setLoading(true);
    } else if (
      response && response?.status==="fulfilled" && 
      response?.isSuccess === true &&
      response?.isLoading === false
    ) {
      setLoading(false);
      setOpen(true);
      setTimeout(() => {
        clearCartWithOrder();
      }, 4000);
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } else {
      console.error("Error:", response.error);
    }
    // if (response && response) {
    //   if (response?.isLoading) {
    //     setLoading(true);
    //   } else if (response?.isSuccess && response?.data?.status === 200) {
    //     setLoading(false);
    //     setOpen(true);
    //     setTimeout(() => {
    //       clearCartWithOrder();
    //     }, 4000);
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 6000);
    //   } else {
    //     // Handle other status codes or errors here
    //     console.error("Error:", response?.error);
    //   }
    // }
    //  else if (
    //   response &&
    //   response?.isSuccess === true &&
    //   response?.isLoading === false
    // ) {
    //   setLoading(false);

    //   setOpen(true);
    //   //window.location.reload(true);
    //   setTimeout(() => {
    //     clearCartWithOrder();
    //   }, 4000);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 6000);
    // }
    // addHandler();
  }, [response, loading]);
  const clearCartWithOrder = () => {
    dispatch(clearCart());
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik_form = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      BillingAddress: "",
      City: "",
      State: "",
      Email: "",
      PhoneNo: "",
      OrderNotes: "",
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
      Email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required Field"),
      PhoneNo: Yup.string()
        .required("Required Field")
        .matches(phoneRegExp, "phone number is not valid")
        .min(11, "too short phone number")
        .max(11, "too long phone number"),
      BillingAddress: Yup.string().required("Required Field"),
      City: Yup.string().required("Required Field"),
      State: Yup.string().required("Required Field"),
      OrderNotes: Yup.string().required("Required Field"),
    }),
    onSubmit: (values) => {
      formik_form.handleReset(values);
      const newAddToCartData = { ...addToCartData, BillingDetail: values };
      addHandler(newAddToCartData);
    },
  });

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // const action = (
  //   <React.Fragment>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <form action="#" onSubmit={formik_form.handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <h2 className="checkout_title">Billing Details</h2>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="FirstName"
                      className="form-control"
                      id="FirstName"
                      placeholder="First Name"
                      value={formik_form.values.FirstName}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.FirstName &&
                      formik_form.touched.FirstName && (
                        <p style={{ color: "red", fontSize: "11px" }}>
                          {formik_form.errors.FirstName}
                        </p>
                      )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="LastName"
                      className="form-control"
                      id="LastName"
                      placeholder="Last Name"
                      value={formik_form.values.LastName}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.LastName &&
                      formik_form.touched.LastName && (
                        <p style={{ color: "red", fontSize: "11px" }}>
                          {formik_form.errors.LastName}
                        </p>
                      )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <input
                      type="text"
                      name="BillingAddress"
                      className="form-control"
                      id="BillingAddress"
                      placeholder="Home Address"
                      value={formik_form.values.BillingAddress}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.BillingAddress &&
                      formik_form.touched.BillingAddress && (
                        <p style={{ color: "red", fontSize: "11px" }}>
                          {formik_form.errors.BillingAddress}
                        </p>
                      )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="City"
                      className="form-control"
                      id="City"
                      placeholder="City"
                      value={formik_form.values.City}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.City && formik_form.touched.City && (
                      <p style={{ color: "red", fontSize: "11px" }}>
                        {formik_form.errors.City}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="State"
                      className="form-control"
                      id="State"
                      placeholder="State"
                      value={formik_form.values.State}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.State && formik_form.touched.State && (
                      <p style={{ color: "red", fontSize: "11px" }}>
                        {formik_form.errors.State}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="Email"
                      className="form-control"
                      id="Email"
                      placeholder="Email"
                      value={formik_form.values.Email}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.Email && formik_form.touched.Email && (
                      <p style={{ color: "red", fontSize: "11px" }}>
                        {formik_form.errors.Email}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      name="PhoneNo"
                      className="form-control"
                      id="PhoneNo"
                      placeholder="Phone Number"
                      value={formik_form.values.PhoneNo}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    />
                    {formik_form.errors.PhoneNo &&
                      formik_form.touched.PhoneNo && (
                        <p style={{ color: "red", fontSize: "11px" }}>
                          {formik_form.errors.PhoneNo}
                        </p>
                      )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <textarea
                      className="form-control text_area"
                      name="OrderNotes"
                      id="OrderNotes"
                      cols="30"
                      rows="4"
                      placeholder="Special Instructions"
                      value={formik_form.values.OrderNotes}
                      onChange={formik_form.handleChange}
                      onBlur={formik_form.handleBlur}
                    ></textarea>
                    {formik_form.errors.OrderNotes &&
                      formik_form.touched.OrderNotes && (
                        <p style={{ color: "red", fontSize: "11px" }}>
                          {formik_form.errors.OrderNotes}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <aside className="col-md-4">
                <div className="summary">
                  <h3 className="summary-title">Your Order</h3>
                  <table className="table table-summary">
                    <thead>
                      <tr className="py-2">
                        <th className="td_align_left">Product</th>
                        <th className="td_align_right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addToCartData.LineItems.map((value, index) => {
                        return (
                          <tr key={index} className="py-2">
                            <td className="border-none td_align_left">
                              {` ${value.ProductName} ${`(${value.Quantity})`}`}
                            </td>
                            <td className="border-none td_align_right">
                              {`Rs. ${value.Price * value.Quantity}`}
                            </td>
                          </tr>
                        );
                      })}

                      <tr className="summary-subtotal py-2">
                        <td className="td_align_left">Subtotal:</td>
                        <td className="td_align_right">
                          {`Rs. ${addToCartData.TotalPrice} `}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <td className="td_align_left">Shipping:</td>
                        <td className="td_align_right">Cash On Delivery</td>
                      </tr>
                      <tr className="summary-total py-2">
                        <td className="td_align_left">Total:</td>
                        <td className="td_align_right">{`Rs. ${addToCartData.TotalPrice} `}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col-md-12 my-3">
                      {/* <input
                        type="submit"
                        value={loading ? <CircularProgress /> : "Place Order"}
                        className=" btn btn-primary rounded-0  px-4 col-12"
                      /> */}
                      <button
                        className=" btn btn-primary rounded-0  px-4 col-12"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <CircularProgress /> : "Place Order"}
                      </button>
                      <span className="submitting"></span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </div>
      {/* <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={"Order Placed Successfully!"}
        action={action}
        sx={{ height: "100%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      /> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Your Order is placed Successfully."}</DialogTitle>
        <DialogContent className={`text-center`}>
          <img className={`py-3`} src={thumbsUp} alt="thumbsup" />
          <DialogContentText id="alert-dialog-slide-description">
            Soon, You will get a response from us.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>
            <Link to="/" onClick={() => clearCartWithOrder()}>Go To Home</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckoutFoarm;
