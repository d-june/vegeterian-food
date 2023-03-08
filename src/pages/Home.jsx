import React, { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { getProducts } from "../redux/slices/productsSlice";

import Product from "../components/Product/Product";
import Skeleton from "../components/Skeleton/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort, { sortList } from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

import styles from "../scss/Home.module.scss";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { products } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(true);

  const order = sort.sortProperty.includes("-") ? "asc" : "desk";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      isSearch.current = true;
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    if (!isSearch.current) {
      dispatch(
        getProducts({ currentPage, category, sortBy, order, searchValue })
      );
    }
    setIsLoading(false);
    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchValue]);

  const productsList = products.map((obj) => <Product key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div>
      <Banner />
      <div>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2>{categoryId}</h2>
      <div className={styles.productsBlock}>
        {isLoading ? skeletons : productsList}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
