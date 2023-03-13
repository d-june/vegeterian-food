import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType, SearchProductParamsType } from "./types";
import { productsAPI } from "../../../api/products-api";

export const getProducts = createAsyncThunk<
  ProductType[],
  SearchProductParamsType
>("products/getProducts", async (params) => {
  const { currentPage, category, sortBy, order, searchValue } = params;
  const data = await productsAPI.getProducts(
    currentPage,
    category,
    sortBy,
    order,
    searchValue
  );
  return data;
});
