import { instance } from "./api";
import { Product } from "../redux/slices/productsSlice";
export const productsAPI = {
  getProducts(
    currentPage: number,
    category: string,
    sortBy: string,
    order: string,
    searchValue: string
  ) {
    return instance
      .get<Product[]>(
        `items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
      )
      .then((res) => res.data);
  },
};
