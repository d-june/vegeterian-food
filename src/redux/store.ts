import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
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
