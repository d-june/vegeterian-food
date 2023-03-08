import { instance } from "./api";

export const productsAPI = {
  getProducts(currentPage, category, sortBy, order) {
    return instance
      .get(
        `items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => res.data);
  },
};
