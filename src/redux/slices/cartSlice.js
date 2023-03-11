import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count++;
        debugger;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusProduct(state, action) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload
      );
      findProduct.count--;
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearCart(state, action) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
