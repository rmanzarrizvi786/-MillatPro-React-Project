import { Container, Grid } from '@mui/material';
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "./Style.css";
import HeaderBanner from './HeaderBanner';

const Header = () => {
  return (
    
      <Grid container>
        <Grid item lg={12} width={"100%"}>
          <HeaderBanner />
        </Grid>
      </Grid>

  );
}

export default Header;
