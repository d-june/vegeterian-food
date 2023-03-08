import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsAPI } from "../../api/products-api";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (
    { currentPage, category, sortBy, order },
    { rejectWithValue, dispatch }
  ) {
    const data = await productsAPI.getProducts(
      currentPage,
      category,
      sortBy,
      order
    );

    if (data.error) {
      return rejectWithValue(data.error);
    }
    dispatch(setProducts(data));
    return data;
  }
);
export default productsSlice.reducer;
