import React from "react";
import styles from "./Styles.module.scss";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
const dealsData = [
  {
    Id: 1,
    image: require("../../../../images/MillatwithBat.jpg"),
  },
  {
    Id: 2,
    image: require("../../../../images/CAwithBat.jpg"),
  },
  {
    Id: 5,
    image: require("../../../../images/MBwithBat.jpg"),
  },
];
const Deals = () => {
  return (
    <div className={`${styles.mainDealsSection} container`}>
      
      <Grid container className={styles.innerMainSection}>
        {dealsData.map((value, index) => {
          return (
            <Grid
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className={styles.colBox}
            >
              <Link className={`${styles.myLink}`} to={{pathname: `/topbrand/${value.Id}`}}>
              <img src={value.image} className={styles.image} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Deals;
