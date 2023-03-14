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

export type SearchProductParamsThunkType = {
  currentPage: number;
  category: string;
  order: string;
  sortBy: string;
  search: string;
};

export type SearchProductParamsType = {
  currentPage: number;
  categoryId: number;
  order: string;
  sortProperty: string;
  searchValue: string;
};
