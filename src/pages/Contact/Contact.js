import {
  Box,
  Container,
  Grid,
  Typography,
  CardContent,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import React, { useEffect } from "react";
import ContactUS from "./Contact.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";
const mailTo = "mailto: info@millatsports.com.pk";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const insta = require("../../images/insta.png");
const tiktok = require("../../images/tiktokSocial.png");
const fb = require("../../images/fb.png");
const Contact = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <Box className={ContactUS.main} component="main">
        <Navbar />
        <Grid container className={ContactUS.contact_us}>
          <Grid item lg={12} md={12} sm={12} sx={12}>
            <Typography
              data-aos="fade-down"
              variant="h3"
              className={ContactUS.banner_heading}
            >
              Contact Us
            </Typography>
            <Typography component="p" className={ContactUS.banner_heading}>
              keep in touch with us
            </Typography>
          </Grid>
        </Grid>
        <Container className={ContactUS.container_contact}>
          <Box component="section">
            <Typography variant="h3" className={ContactUS.contact_form_heading}>
              Get In Touch
            </Typography>
            <Grid
              item
              lg={5}
              md={7}
              sm={12}
              xs={12}
              className={ContactUS.grid_form_col_5}
            >
              <Typography
                component="p"
                className={ContactUS.caption_contact_form1}
              >
                We collaborate with ambitious brands and people; we’d love to
                build something great together.
              </Typography>
            </Grid>
            <Grid
              item
              lg={5}
              md={7}
              sm={12}
              xs={12}
              className={ContactUS.grid_form_col_5}
            >
              <Typography
                component="p"
                className={ContactUS.caption_contact_form}
              >
                For more detail and information, Contact Us: +92 32 19978829.
              </Typography>
            </Grid>

            <Grid>
              <Card
                style={{
                  maxWidth: "100%",
                  padding: "20px 5px",
                  margin: "0 auto",
                }}
              >
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </Grid>
          </Box>
          <Box py={5} component="section" style={{ padding: "30px 0px" }}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Box component="div" className={ContactUS.contact_us_colums}>
                  <Typography
                    className={ContactUS.heading_contact_us_col}
                    variant="h6"
                  >
                    Office
                  </Typography>
                  <Typography className={ContactUS.ppp}>
                    Iqra Center 2nd floor near madni masjid
                    <br />
                    shah alam market lhr
                  </Typography>
                </Box>
              </Grid>
              <Grid className={ContactUS.middle_grid} item xs={12} sm={4}>
                <Box component="div" className={ContactUS.contact_us_colums}>
                  <Typography
                    className={ContactUS.heading_contact_us_col}
                    variant="h6"
                  >
                    Start a Conversation
                  </Typography>
                  <Link className={ContactUS.link_contact_sec} to={mailTo}>
                    info@millatsports.com.pk
                  </Link>
                  <Box component="div">
                    <Box component="span">
                      <Link className={ContactUS.link_contact_sec} to="tel: +923254456314">
                        +92 325 4456314
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box component="div" className={ContactUS.contact_us_colums}>
                  <Typography
                    className={ContactUS.heading_contact_us_col}
                    variant="h6"
                  >
                    Social
                  </Typography>
                  <List className={ContactUS.icons_list_ul}>
                    <ListItem className={ContactUS.icons_list_li}>
                      <Link to="https://www.facebook.com/MillatSportsofficial?mibextid=ZbWKwL">
                        {/* <FacebookOutlinedIcon className={ContactUS.fb_icon} /> */}
                        <img
                          style={{ maxWidth: " 20px" }}
                          src={fb}
                          alt="SocialIcon"
                        />
                      </Link>
                    </ListItem>
                    <ListItem className={ContactUS.icons_list_li}>
                      <Link to="https://instagram.com/millatsportsofficial?igshid=MzMyNGUyNmU2YQ==">
                        {/* <InstagramIcon className={ContactUS.insta_icon} /> */}
                        <img
                          style={{ maxWidth: " 30px" }}
                          src={insta}
                          alt="socialIcon"
                        />
                      </Link>
                    </ListItem>
                    <ListItem className={ContactUS.icons_list_li}>
                      <Link to="https://www.tiktok.com/@millatsportsofficial?_t=8hZnLQjh6rX&_r=1">
                        {/* <YouTubeIcon className={ContactUS.yt_icon} /> */}
                        <img
                          style={{ maxWidth: " 25px" }}
                          src={tiktok}
                          alt="socialIcon"
                        />
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Contact;
