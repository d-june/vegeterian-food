import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType, SearchProductParamsThunkType } from "./types";
import { productsAPI } from "../../../api/products-api";

export const getProducts = createAsyncThunk<
  ProductType[],
  SearchProductParamsThunkType
>("products/getProducts", async (params) => {
  const { currentPage, category, sortBy, order, search } = params;
  const data = await productsAPI.getProducts(
    currentPage,
    category,
    sortBy,
    order,
    search
  );
  return data;
});
