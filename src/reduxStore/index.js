import { configureStore } from "@reduxjs/toolkit";
import newUserReducer from "./slice/userSlice/index";
import { userApi } from "./rtk/index";
import newCartReducer from "./slice/addToCartSlice/index";

export const store = configureStore({
  reducer: {
    user: newUserReducer,
    addToCart: newCartReducer,
    [userApi.reducerPath]: userApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
