import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Banner from "../components/Banner/Banner";
import { useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import {
  getProducts,
  SearchProductParams,
  selectProductsData,
} from "../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";

import Product from "../components/Product/Product";
import Skeleton from "../components/Skeleton/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort, { sortList } from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

import styles from "../scss/Home.module.scss";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import qs from "qs";
import { useAppDispatch } from "../redux/store";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue, categories } =
    useSelector(selectFilter);
  const { products, status } = useSelector(selectProductsData);

  const order = sort.sortProperty.includes("-") ? "asc" : "desk";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchProductParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      isSearch.current = true;
      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 600);

    if (!isSearch.current) {
      dispatch(
        getProducts({ currentPage, category, sortBy, order, searchValue })
      );
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchValue]);

  const productsList = products.map((obj: any) => (
    <Product key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div>
      <Banner />
      <div>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sort={sort} />
      </div>
      {categories && (
        <h2 className={styles.productsTitle}>{categories[categoryId]}</h2>
      )}
      {status === "error" ? (
        <div className={styles.productsError}>
          <h2 className={styles.productsErrorTitle}>
            Произошла ошибка <SentimentVeryDissatisfiedIcon />
          </h2>
          <p>
            К сожалению, не удалось получить данные от сервера. Попробуйте
            повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className={styles.productsBlock}>
          {status === "loading" ? skeletons : productsList}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
