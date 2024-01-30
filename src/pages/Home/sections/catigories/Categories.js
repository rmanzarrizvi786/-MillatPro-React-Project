import React from "react";
import styles from "./Styles.module.scss";
import { Box, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import ScrollToTopLink from "components/ScrollToTopLink/ScrollToTopLink";

const image1 = require('../../../../images/Category-Image-2.png')
const image2 = require('../../../../images/Category-Image-3.png')
const image3 = require('../../../../images/category-Image-CricketBat.jpg')
const image4 = require('../../../../images/Gloves_1.png')

const Categories = () => {
  return (
    <div className={styles.mainDealsSection}>
      <Grid container className={styles.innerMainSection}>
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.colBox}>
        <Link to={{pathname:`/category/Batting gloves`}} className={styles.button}>
            <img
              src={image1}
              className={styles.image}
            />
          </Link>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.colBox}>
        <Link to={{pathname:`/category/Batting Pads`}} className={styles.button}>
            <img
              src={image2}
              className={styles.image}
            />
          </Link>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.colBox}>
        <Link to={{pathname:`/category/Cricket Bats`}} className={styles.button}>
            <img
              src={image3}
              className={styles.image}
            />
        </Link>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3} className={styles.colBox}>
        <Link to={{pathname:`/category/Batting gloves`}} className={styles.button}>
            <img
              src={image4}
              className={styles.image}
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
