import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  
  loginToken:{
    token: localStorage.getItem('loginToken') ,
  },
  showNavbar:true,
  isLogin: localStorage.getItem("isLogin"),
};

export const newUserSlice = createSlice({
  name: "newUserSlice",
  initialState,
  reducers: {
    
    setIsLogin: (state,action) => {
     state.isLogin = action.payload;
    },
    setLoginToken: (state,action) => {
      state.loginToken.token = action.payload;
    },
    setShowNavbar: (state,action) => {
      state.showNavbar = action.payload;
    }
  },
});

export const {
  setLoginToken,
  setShowNavbar,
  setIsLogin
} = newUserSlice.actions;

export default newUserSlice.reducer;
