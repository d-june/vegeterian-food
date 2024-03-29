import { instance } from "./api";
import { ProductType } from "../redux/slices/products/types";

export const productsAPI = {
  getProducts(
    currentPage: number,
    category: string,
    sortBy: string,
    order: string,
    search: string
  ) {
    return instance
      .get<ProductType[]>(
        `items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((res) => res.data);
  },
};
