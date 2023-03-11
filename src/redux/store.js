import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    products: productsSlice,
    cart: cartSlice,
  },
});

export default store;
