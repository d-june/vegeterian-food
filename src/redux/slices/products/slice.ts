import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductsSliceState, ProductType, StatusEnum } from "./types";
import { getProducts } from "./asyncActions";

const initialState: ProductsSliceState = {
  products: [],
  status: StatusEnum.LOADING, //loading | success | error
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = StatusEnum.LOADING;
      state.products = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = StatusEnum.ERROR;
      state.products = [];
    });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
