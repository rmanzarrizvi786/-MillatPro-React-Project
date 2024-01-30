import { AppBar, Container, Box } from "@mui/material";
import Call from "./Call";
import styles from "./Styles.module.scss";
import logo from "images/MillatLogo_f.png";
// import WishList from "./WishList";
import CheckOut from "./CheckOut";
import SearchBar from "components/SearchBar/SearchBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DrawerAppBar from "./DrawerAppBar";
import { useState } from "react";
import { setUserName, setUserId } from "reduxStore/slice/addToCartSlice";
import { setIsLogin } from "reduxStore/slice/userSlice";
import { setShowNavbar } from "reduxStore/slice/userSlice";
import KeyIcon from "@mui/icons-material/Key";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = require("../../images/powerOff.png");
  const cartQuantity = useSelector((value) => value.addToCart);
  const loginnToken = localStorage.getItem("loginToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toLogOut = () => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("loginToken", false);
    dispatch(setShowNavbar(false));
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    dispatch(setIsLogin(false));
    setOpen(false);
    navigate("/");
  };
  const loginStatus = useSelector((value) => value.user.loginToken);
  const logIn = useSelector((value) => value.user.isLogin);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleClosee = () => {
  //   localStorage.setItem("userId", null);
  //   localStorage.setItem("userName", null);
  //   dispatch(setUserId(null));
  //   dispatch(setUserName(null));
  // };
  return (
    <>
      <AppBar
        position="relative"
        component="nav"
        // sx={{ background: "#1A1A1A"}}
        style={{ backgroundColor: "#1A1A1A" }}
        className={`${styles.mainNavbar}`}
      >
        <Container sx={{ maxWidth: "1545px !important" }}>
          <Box display={"flex"} justifyContent={"space-between"} py={"8.5px"}>
            <Call />
            {/* {loginnToken === "true" ? (
              <p className={styles.username} onClick={() => toLogOut()}>
                Logout
              </p>
            ) : (
              <Link to="/login">
                <p className={styles.username}>Login/Signup</p>
              </Link>
            )} */}
            {loginnToken === "true" ? (
              <div className={`${styles.myHeaderDropDown}`}>
                <Link to="#" className={`${styles.myLinkDropDown} text-white`}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </div>
                  <KeyboardArrowDownIcon />
                </Link>
                <div className={styles.myHeaderMenu}>
                  <ul>
                    <li>
                      <Link to="/changepassword">
                        <KeyIcon /> Change Password
                      </Link>
                    </li>{" "}
                    <li onClick={() => handleClickOpen()}>
                      <PowerSettingsNewIcon /> logout
                    </li>{" "}
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <p className={styles.username}>Login/Signup</p>
              </Link>
            )}
          </Box>
          <hr className={styles.hr} />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            margin={"1rem 0"}
            alignItems={"center"}
          >
            <Link style={{ cursor: "pointer" }} to={"/"}>
              <Box
                component={"img"}
                src={logo}
                alt="logo"
                sx={{ width: "60px" }}
              />
            </Link>
            <Box sx={{ width: "50%" }} position={"relative"}>
              <SearchBar />
            </Box>
            {/* <Box sx={{}} position={"relative"}>
              <button onClick={() => handleClosee()}>loggggg</button>
            </Box> */}
            <Box component={"div"} sx={{ display: "flex" }}>
              {/* <WishList /> */}
              <CheckOut />
            </Box>
          </Box>
        </Container>
      </AppBar>
      <DrawerAppBar />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{ textAlign: 'center', padding:'30px '}}
      >
        <DialogTitle id="alert-dialog-title" sx={{ padding: '20px 20px' }}>
          {"Are, You sure, you want to Logout?"}
        </DialogTitle>
        <div className={`text-center`}><img src={user} style={{maxWidth:'80px'}} alt="user"/></div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
            The user will logout after, Click the logout!
          </DialogContentText>
        </DialogContent>
        
        <DialogActions style={{padding:'10px 20px'}}>
          <Link to="#" className={`me-3`} onClick={()=>handleClose()}>Close</Link>
          <Link onClick={() => toLogOut()}>
            logout
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
