import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action) {
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

export default filterSlice.reducer;
