import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import logo from "images/MillatLogo_f copy.png";
import { Link } from "react-router-dom";
import CategoryDesktop from "./CategoryDesktop";
import SearchBar from "components/SearchBar/SearchBar";
import "./DrawerAppBar.css";
import CategoriesMobile from "./CategoriesMobile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Styles.module.scss";

const drawerWidth = 240;
const navItems = ["Home", "Shop", "Product", "Pages", "Blog", "Element"];
const pages = [
  { name: "Home", url: "/" },
  { name: "Shop", url: "/shop" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const location  = useLocation();
  const locationOfPage = location.pathname;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link className="header_logo" to={"/"}>
        <Box
          sx={{ my: 2, width: "65px" }}
          component={"img"}
          src={logo}
          alt="logo"
        />
      </Link>
      {/* <CategoriesMobile/> */}
      <Divider />
      {/* <CategoriesMobile/> */}
       
      <List className="nav_mobile_menu">
        {pages.map((page, index) => (
          <ListItem key={index} disablePadding>
            <Link
              key={index}
              to={`${page.url}`}
              className="drawer_nav_linkss"
              sx={{ textAlign: "center" }}
            >
              {page.name}
            </Link>
          </ListItem>
        ))}
      </List>
      <Box style={{backgroundColor:'black'}}>
      <SearchBar/>
      </Box>
      
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{ display: "flex" }}
      className="hello"
      style={{ position: "sticky", top: "0", zIndex: "99" }}
    >
      <CssBaseline />

      <AppBar
        component="nav"
        sx={{
          position: "sticky",
          backgroundColor: "white",
          borderBottom: "0.1rem solid #ebebeb",
        }}
      >
        <Container
          sx={{
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            maxWidth: "1545px !important",
          }}
        >
          <Toolbar
            className="nav-nav-nav"
            sx={{ minHeight: "40px !important;" }}
          >
            <CategoriesMobile />
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
                height: "100%",
              }}
            >
              <CategoryDesktop />
            </Box>

            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {pages.map((page, index) => (
                <Link
                  className={`nav_anchor_btn ${
                    locationOfPage === `${page.url}` ? `${styles.isActive}` : ``
                  }`}
                  key={index}
                  to={page.url}
                  style={{
                    padding: "6px 10px",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {page.name}
                </Link>
              ))}
            </Box>
            
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "block", md: "none", lg: "none" },
                color: "black !important",
              }}
              className="notButton"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
