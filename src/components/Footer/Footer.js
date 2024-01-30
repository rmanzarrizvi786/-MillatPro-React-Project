import { Container, Grid } from "@mui/material";
import React from "react";
import logo from "../../images/MillatLogo_f.png";
import styles from "./Styles.module.scss";
import List from "./List";
import { Link } from "react-router-dom";
import ScrollToTopLink from "components/ScrollToTopLink/ScrollToTopLink";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  const pages = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const contactUs = [
    {
      name: "Address:",
      address: "Iqra Center 2nd floor near madni masjid shah alam market lhr",
    },
    { name: "Phone:", address: "+92 325 4456314" },
  ];
  const usefulLinks = [
    { name: "Monday to Saturday: ", time: "10AM-8PM" },
    { name: "Sunday:", time: "Closed" },
  ];
  const facebook = require("../../images/fb.png");
  const tiktok = require("../../images/tiktokSocial.png");
  const insta = require("../../images/insta.png");
  return (
    <div className={styles.mainSection}>
      <Container className={styles.contain}>
        <div className={styles.main}>
          <Grid
            container
            spacing={2}
            style={{ justifyContent: "space-between" }}
          >
            <Grid item sm={6} lg={3} className={styles.grid1} paddingX={"16px"}>
              <img src={logo} alt="logo" width={"60px"} />
              <p>
                Millat Sports Is A Brand Which Came Into Existence From Passion
                For The Game Of Cricket. Ultimate in the sporting world, no one
                can beat us in quality & services.
              </p>
            </Grid>
            <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
              <List
                title="Quick Links"
                sx={{ color: "danger" }}
                content={pages.map((page, index) => (
                  <Link
                    className="nav_anchor_btn"
                    key={index}
                    to={page.url}
                    style={{
                      // padding: "6px 10px",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    {page.name}
                  </Link>
                ))}
              />
            </Grid>
            <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
              <List
                title="Hours of operation"
                content={usefulLinks.map((page, index) => (
                  <p>
                    {page.name} {page.time}
                  </p>
                ))}
              />
            </Grid>
            <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
              <h5 className={styles.headingNo}>Follow Us</h5>
              <div className={styles.link}>
                <Link to="https://www.facebook.com/MillatSportsofficial?mibextid=ZbWKwL">
                  <img
                    style={{ maxWidth: "30px" }}
                    src={facebook}
                    alt="faceBook"
                  />
                </Link>
                <Link
                  to="https://www.tiktok.com/@millatsportsofficial?_t=8hZnLQjh6rX&_r=1"
                  alt="tiktok"
                >
                  <img
                    style={{ maxWidth: "37px", margin: "0px 10px" }}
                    src={tiktok}
                    alt="tiktok"
                  />
                </Link>
                <Link
                  to="https://instagram.com/millatsportsofficial?igshid=MzMyNGUyNmU2YQ=="
                  alt="tiktok"
                >
                  <img style={{ maxWidth: "37px" }} src={insta} alt="insta" />
                </Link>
              </div>
              <List
                title="Contact Us"
                content={contactUs.map((val, index) => {
                  return (
                    <p key={index}>
                      {val.name} {val.address}
                    </p>
                  );
                })}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
      <center className={styles.bottom}>
        <p>
          Copyright © {year} Design and Developed by{" "}
          <Link to="https://techtonex.com/" target="_blank">
            Techtonex.
          </Link>
        </p>
        {/* <img src={payments} alt="payment" /> */}
      </center>
    </div>
  );
};

export default Footer;
