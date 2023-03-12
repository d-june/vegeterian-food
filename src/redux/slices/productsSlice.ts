import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsAPI } from "../../api/products-api";
import { RootState } from "../store";

export type SearchProductParams = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  searchValue: string;
};

export const getProducts = createAsyncThunk<Product[], SearchProductParams>(
  "products/getProducts",
  async (params) => {
    const { currentPage, category, sortBy, order, searchValue } = params;
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

export type Product = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};
interface ProductsSliceState {
  products: Product[];
  status: Status;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

const initialState: ProductsSliceState = {
  products: [],
  status: Status.LOADING, //loading | success | error
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = Status.LOADING;
      state.products = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.products = [];
    });
  },
});

export const { setProducts } = productsSlice.actions;

export const selectProductsData = (state: RootState) => state.products;

export default productsSlice.reducer;
