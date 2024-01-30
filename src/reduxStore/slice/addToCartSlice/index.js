import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  TotalPrice: 0,
  LineItems: localStorage.getItem("cardItems")
    ? JSON.parse(localStorage.getItem("cardItems"))
    : [],
  UserId: localStorage.getItem("userId"),
  UserName: localStorage.getItem("userName"),
  attributeNaam: " ",
  variationNaam: " ",
  AttributeId: null,
  VariationId: null,
};
export const newCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productCount } = action.payload;
      const cartItemIndex = state.LineItems.findIndex((item) =>
        item.ProductId === action.payload.ProductId && item.VariationId
          ? item.VariationId === action.payload.VariationId
          : item.ProductId === action.payload.ProductId
      );
    
      if (cartItemIndex >= 0) {
        state.LineItems[cartItemIndex].Quantity = productCount > 0
          ? productCount + state.LineItems[cartItemIndex].Quantity
          : state.LineItems[cartItemIndex].Quantity += 1;
    
        if (
          state.LineItems[cartItemIndex].variationQuantity &&
          state.LineItems[cartItemIndex].Quantity > state.LineItems[cartItemIndex].variationQuantity
        ) {
          state.LineItems[cartItemIndex].Quantity = state.LineItems[cartItemIndex].variationQuantity;
        } else if (
          state.LineItems[cartItemIndex].QunatityOfProduct &&
          state.LineItems[cartItemIndex].Quantity > state.LineItems[cartItemIndex].QunatityOfProduct
        ) {
          state.LineItems[cartItemIndex].Quantity = state.LineItems[cartItemIndex].QunatityOfProduct;
        }
    
        state.LineItems[cartItemIndex].ItemPrice =
          state.LineItems[cartItemIndex].Quantity * state.LineItems[cartItemIndex].DiscountAmount;
      } else {
        const tempProduct = {
          ...action.payload,
          Quantity: productCount > 0 ? productCount : state.productCount > 0 ? state.productCount : 1,
        };
        state.LineItems.push(tempProduct);
      }
    
      localStorage.setItem("cardItems", JSON.stringify(state.LineItems));
    },
    addCounter(state, action) {
     
      state.productCount = action.payload;
    },
    setVariationType(state, action) {
      state.variationType = action.payload;
    },

    setAttributeId(state, action) {
      state.AttributeId = action.payload ? action.payload : null;
    },
    setVariationId(state, action) {
      state.VariationId = action.payload ? action.payload : null;
    },
    decreaseCart(state, action) {
      const itemIndex = state.LineItems.findIndex(
        (item) =>
          item.UniqueId === action.payload.UniqueId &&
          item.VariationId === action.payload.VariationId
      );

      if (state.LineItems[itemIndex].Quantity > 1) {
        state.LineItems[itemIndex].Quantity -= 1;
      } 
      else if(state.LineItems[itemIndex].Quantity < 1){
        state.LineItems[itemIndex].Quantity === 1;
        // state.LineItems = nextCartItems;
      }
      // else if (state.LineItems[itemIndex].Quantity === 1) {
      //   const nextCartItems = state.LineItems.filter(
      //     (item) =>
      //       item.UniqueId !== action.payload.UniqueId &&
      //       item.VariationId !== action.payload.VariationId
      //   );
      //   state.LineItems = nextCartItems;
      
      // }
      localStorage.setItem("cardItems", JSON.stringify(state.LineItems));
    },
    removeFromCart(state, action) {
      const cartItem = localStorage.getItem("cardItems");
     
      const jsonCartItem = JSON.parse(localStorage.getItem("cardItems"));
      jsonCartItem.map((cartItem) => {
        if (
          cartItem.ProductId === action.payload.ProductId &&
          cartItem.VariationId === action.payload.VariationId
        ) {
          const nextCartItems = jsonCartItem.filter((item) =>
            // item.VariationId !== null
            //   ? 
              item.UniqueId !== action.payload.UniqueId
              // : cartItem.ProductId === action.payload.ProductId
          );
          state.LineItems = nextCartItems;
        }
        localStorage.setItem("cardItems", JSON.stringify(state.LineItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.LineItems.reduce(
        (cartTotal, cartItem) => {
          const { DiscountAmount, Quantity } = cartItem;
          const itemTotal = DiscountAmount * Quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += Quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.TotalPrice = total;
    },
    clearCart(state, action) {
      state.LineItems = [];
      state.productCount = 0;
      state.cartTotalQuantity= 0;
      localStorage.setItem("cardItems", JSON.stringify(state.LineItems));
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setVariationNaam(state, action) {
      state.variationNaam = action.payload;
    },
    setAttributeNaam(state, action) {
      state.attributeNaam = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setUserId(state, action) {
      state.UserId = action.payload;
    },
    setUserName(state, action) {
     
      state.UserName = action.payload;
    },
    setVariationQuantity(state, action) {
      state.VariationQuantity = action.payload;
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  addCounter,
  setColor,
  setSize,
  setVariationType,
  setUserId,
  setUserName,
  setVariationId,
  setAttributeId,
  setAttributeNaam,
  setVariationNaam,
  setVariationQuantity,
  // setVariations,
  // setCheckOutCart
} = newCartSlice.actions;
export default newCartSlice.reducer;
