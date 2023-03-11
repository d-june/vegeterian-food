import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Search from "../Search/Search";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

function Header(props) {
  const { products, totalPrice } = useSelector((state) => state.cart);
  const totalCount = products.reduce((sum, product) => sum + product.count, 0);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Vegetarian food
      </Link>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.contacts}>
        <div className={styles.contactsIcon}>
          <PhoneInTalkOutlinedIcon />
        </div>
        <div className={styles.contactsBody}>
          <div className={styles.contactsTitle}>Контакты</div>
          <Link to="tel:+79175105759">+7(917)510-57-59</Link>
        </div>
      </div>
      <Link to="cart" className={styles.cart}>
        {totalPrice === 0 ? (
          <div className={styles.cartTitle}>Корзина</div>
        ) : (
          <div className={styles.cartTitle}>{totalPrice + " ₽"}</div>
        )}

        <div className={styles.cartIcon}>
          <ShoppingCartOutlinedIcon />
          <span>{totalCount}</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
