import { instance } from "./api";

export const productsAPI = {
  getProducts(currentPage, category, sortBy, order, searchValue) {
    return instance
      .get(
        `items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
      )
      .then((res) => res.data);
  },
};
