export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASK = "-rating",
  TITLE_DESC = "title",
  TITLE_ASK = "-title",
  PRICE_DESK = "price",
  PRICE_ASK = "-price",
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};
export interface FilterSliceState {
  currentPage: number;
  categoryId: number;
  sort: SortType;
  searchValue: string;
  categories?: string[];
}
