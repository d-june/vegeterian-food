import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASK = "-rating",
  TITLE_DESC = "title",
  TITLE_ASK = "-title",
  PRICE_DESK = "price",
  PRICE_ASK = "-price",
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
interface FilterSliceState {
  currentPage: number;
  categoryId: number;
  sort: Sort;
  searchValue: string;
  categories?: string[];
}

const initialState: FilterSliceState = {
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  searchValue: "",
  categories: [
    "Все",
    "Сандвичи",
    "Супы",
    "Салаты",
    "Вторые блюда",
    "Закуски",
    "Десерты",
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;
