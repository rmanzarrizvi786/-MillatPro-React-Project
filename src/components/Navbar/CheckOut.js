import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useState, useContext } from 'react';
// import { DataContext } from 'App';
import { Link } from 'react-router-dom';
import styles from "./Styles.module.scss";
import { useSelector } from 'react-redux';
import {
  getTotals,
} from "reduxStore/slice/addToCartSlice";
import { useEffect } from 'react';
const theme = createTheme({
  palette: {
    orange: {
      main: '#FF0000',
      contrastText: '#000',
    },
  },
});
import { useDispatch } from 'react-redux';

const CheckOut = () => {
  const quantity = useSelector((value) => value.addToCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);
  const [invisible, setInvisible] = useState(false);
  // const {cartList} = useContext(DataContext);
  return (
    <ThemeProvider theme={theme}>
      <Link className={styles.wish_cart} style={{color: "#fff", textDecoration: "none"}} to={"/cart"}>
        <Box component={"div"} sx={{cursor: "pointer", ml: 3, display: "flex", alignItems: "center", flexDirection: "column"}} >
          <Badge color={'orange'} badgeContent={quantity.cartTotalQuantity} max={10} invisible={invisible} >
            <ShoppingCartOutlinedIcon  />
          </Badge>
        </Box>
      </Link>
    </ThemeProvider>
  );
}

export default CheckOut;
