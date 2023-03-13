import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filter/slice";
import productsSlice from "./slices/products/slice";
import cartSlice from "./slices/cart/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    products: productsSlice,
    cart: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
