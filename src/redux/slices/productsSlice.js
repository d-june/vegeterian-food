import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsAPI } from "../../api/products-api";

const initialState = {
  products: [],
  status: "loading", //loading | success | error
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ currentPage, category, sortBy, order, searchValue }) => {
    const data = await productsAPI.getProducts(
      currentPage,
      category,
      sortBy,
      order,
      searchValue
    );
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
      state.products = [];
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.status = "success";
    },
    [getProducts.rejected]: (state) => {
      state.status = "error";
      state.products = [];
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
