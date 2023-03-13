import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  count: number;
  price: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartItem[];
}

const { products, totalPrice } = getCartFromLocalStorage();
const initialState: CartSliceState = {
  totalPrice,
  products,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    minusProduct(state, action: PayloadAction<number>) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload
      );
      if (findProduct) {
        findProduct.count--;
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartProductById = (id: number) => (state: RootState) =>
  state.cart.products.find((obj) => obj.id === id);
export default cartSlice.reducer;
