import { Grid } from '@mui/material';
import React from 'react';
import styles from "./Styles.module.scss";
import { RocketLaunchRounded, RotateLeftRounded, ErrorOutlineRounded } from '@mui/icons-material';
import { FaRegLifeRing, } from "react-icons/fa"
import { VscArrowSmallRight } from "react-icons/vsc";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Trait = () => {
  return (
    
      <div className={styles.mainSection}>
        
            <div spacing={2} className={styles.bgBG} >
              <div className={styles.gridContent}>
                <Grid item lg={6} className={`${styles.grid} ${styles.withBefore}`}>
                  <MailOutlineIcon style={{fontSize:'40px', color:'white',marginBottom:'10px'}}/>
                  <h2 style={{color:'white'}} >
                    SUBSCRIBE TO OUR NEWSLETTER
                  </h2>
                  <p style={{marginTop:'0.5rem',color:'white'}}>Learn about new offers and get more deals by joining our newsletter</p>
                  <div className={styles.inputEmail}>
                    <input type="text" placeholder='Enter your Email Address' />
                    <button><VscArrowSmallRight /></button>
                  </div>
                </Grid>
              </div>
            </div>
            <div className={styles.icons}>
          <div className={styles.icon}>
            <RocketLaunchRounded sx={{width: "70px", fontSize: "3rem"}} />
            <div className={styles.box}>
              <h3>Free Shipping</h3>
              <p>Orders $50 or more</p>
            </div>
          </div>
          <div className={styles.icon}>
            <RotateLeftRounded sx={{width: "70px", fontSize: "3rem"}} />
            <div className={styles.box}>
              <h3>Free Returns</h3>
              <p>Within 30 days</p>
            </div>
          </div>
          <div className={styles.icon}>
            <ErrorOutlineRounded sx={{width: "70px", fontSize: "3rem"}} />
            <div className={styles.box}>
              <h3>Get 20% Off 1 Item</h3>
              <p>when you sign up</p>
            </div>
          </div>
          <div className={styles.icon}>
            <FaRegLifeRing style={{width: "70px", fontSize: "2.5rem"}} />
            <div className={styles.box}>
              <h3>We Support</h3>
              <p>24/7 amazing services</p>
            </div>
          </div>
        </div>
        
      </div>
    
  );
}

export default Trait;
