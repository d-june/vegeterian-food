export type ProductType = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};

export enum StatusEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ProductsSliceState {
  products: ProductType[];
  status: StatusEnum;
}

export type SearchProductParamsType = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  searchValue: string;
};
