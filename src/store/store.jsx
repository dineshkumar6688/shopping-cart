import { configureStore } from "@reduxjs/toolkit";
import dressSlice from "./slices/dress";
import cartSlice from "./slices/cart";

export const store = configureStore({
  devTools: true,
  reducer: {
    dresses: dressSlice,
    cart: cartSlice,
  },
});
