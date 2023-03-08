import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    products: productsSlice,
  },
});

export default store;
