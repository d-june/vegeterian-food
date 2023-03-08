import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Search from "../Search/Search";

function Header(props) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Vegetarian food
      </Link>
      <Search />
      <div className={styles.contacts}>
        <div>Контакты</div>
        <Link to="tel:+79175105759">+7(917)510-57-59</Link>
      </div>
      <Link to="cart" className={styles.cart}>
        <div>Корзина</div>
        <span>0</span>
      </Link>
    </header>
  );
}

export default Header;
