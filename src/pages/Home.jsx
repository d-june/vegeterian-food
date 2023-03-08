import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { getProducts } from "../redux/slices/productsSlice";

import Product from "../components/Product/Product";
import Skeleton from "../components/Skeleton/Skeleton";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

import styles from "../scss/Home.module.scss";

function Home(props) {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes("-") ? "asc" : "desk";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(getProducts({ currentPage, category, sortBy, order }));

    setIsLoading(false);

    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

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
