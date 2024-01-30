import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import styles from "./Styles.module.scss";
import whoWeAre from "../../images/whoWeAre.png";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const teamData = [
    {
      id: 1,
      image: require('../../images/member-1.jpg'),
      name: "Ahmed",
      title: "CEO, Millat Sports",
      description:
        "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in",
    },
    {
      id: 1,
      name: "Ahmed",
      image: require('../../images/member-1.jpg'),
      title: "CEO, Millat Sports",
      description:
        "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in",
    },
    {
      id: 1,
      image: require('../../images/member-1.jpg'),
      name: "Ahmed",
      title: "CEO, Millat Sports",
      description:
        "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in",
    },
    {
      id: 1,
      image: require('../../images/member-1.jpg'),
      name: "Ahmed",
      title: "CEO, Millat Sports",
      description:
        "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in",
    },
  ];
  return (
    
    <Box className={styles.main} component="main">
      <Navbar/>
      <Grid container className={styles.about_us}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography data-aos="fade-down" variant="h3" color={"white"}>
            About Us
          </Typography>
          <Typography variant="p" color={"white"}>
            Who We Are
          </Typography>
        </Grid>
      </Grid>

      <Container className={styles.container_about} fixed>
        <Grid my={0} container py={5} spacing={4}>
          <Grid
            className="styles.sec_about_mission_vission"
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Typography className={styles.vision_mission_h2} variant="h2">
              Our Vision
            </Typography>
            <Typography component="p" className={styles.para_mission_vission}>
              To be the most Trustworthy market leader that provides one
              stopsolution for all the sporting goods of the world.
            </Typography>
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Typography className={styles.vision_mission_h2} variant="h2">
              Our Mission
            </Typography>
            <Typography component="p" className={styles.para_mission_vission}>
              Our aim to provide best quality products with honesty and become
              the first priority of the customer.
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
      </Container>

      <Box component="div" className={styles.sec_who_we_are}>
        <Container className={styles.container_about} fixed>
          <Grid my={0} container py={5} spacing={4} alignItems="center">
            <Grid item lg={6} md={6} sm={12}>
              <Typography variant="h3" color={"black"}>
                Who We Are
              </Typography>
              <Typography
                color="#FF0000"
                component="p"
                className={styles.para_mission_vission}
              >
                One of the leading brand in Pakistan.
              </Typography>
              <Typography
                color="#777"
                component="p"
                className={styles.para_mission_vission}
              >
                Millat sports is one of the leading brand in Pakistan sports
                industry , founded by Syed Nadeem Ashraf Rizvi and Aurangzaib in
                1980. With decades of experience in the industry, we take pride
                in being a trusted manufacturer, importer, and exporter of
                sports equipment and accessories. Our passion for sports and
                commitment to providing high-quality products have established
                us as a leading name in the field. Whether you're an athlete, a
                sports enthusiast, or someone looking to engage in an active
                lifestyle, our website is your ultimate destination. Explore our
                extensive range of top-notch sporting goods, designed to enhance
                your performance and elevate your game. From cutting-edge
                equipment to trendy apparel, we strive to cater to the diverse
                needs of athletes across various disciplines. Join us on this
                exciting journey and experience the thrill of sports like never
                before.
              </Typography>
            </Grid>

            <Grid textAlign="center" item lg={6} md={6} sm={12}>
              <Box
                component="img"
                sx={{
                  width: "550px",
                  maxWidth: "100%",
                }}
                alt="The house from the offer."
                src={whoWeAre}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Box component="div" className={styles.mainSectionTeam}>
        <Container className={styles.container_about} fixed>
          <Grid my={0} container py={5} spacing={3} alignItems="center">
            <Grid item lg={12} md={12} sm={12}>
              <Typography variant="h3" color={"black"}>
                Meet Our Team
              </Typography>
            </Grid>
            {teamData.map((value, index) => {
              return (
                <Grid key={index} item lg={3} md={4} sm={6}>
                  <div className={styles.boxCard}>
                    <img
                      className={`rounded-circle ${styles.image}`}
                      src={value.image}
                    />
                    <h3 className={styles.name}>{value.name}</h3>
                    <p className={styles.title}>{value.title}</p>
                    <p className={styles.description}>{value.description}</p>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box> */}
      <Footer/>
    </Box>
  );
};

export default About;
