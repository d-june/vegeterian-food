import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Banner from "../components/Banner/Banner";
import Product from "../components/Product/Product";
import Skeleton from "../components/Skeleton/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import Categories from "../components/Categories/Categories";
import Sort, { sortList } from "../components/Sort/Sort";

import { getProducts } from "../redux/slices/products/asyncActions";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";

import { selectFilter } from "../redux/slices/filter/selectors";
import { selectProductsData } from "../redux/slices/products/selectors";
import { SearchProductParamsType } from "../redux/slices/products/types";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import qs from "qs";

import styles from "../scss/Home.module.scss";
import Contacts from "../components/Contacts/Contacts";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const location = useLocation();

  const { categoryId, sort, currentPage, searchValue, categories } =
    useSelector(selectFilter);
  const { products, status } = useSelector(selectProductsData);

  const fetchProducts = () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(getProducts({ currentPage, category, sortBy, order, search }));
  };

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(
        location.search.substring(1)
      ) as unknown as SearchProductParamsType;

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          searchValue: params.searchValue as string,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchProducts();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

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
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

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
      <div className="container">
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
      <Contacts />
    </div>
  );
};

export default Home;
