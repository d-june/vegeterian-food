import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";

function CartEmpty(props) {
  return (
    <div className={styles.cartEmpty}>
      <ShoppingCartOutlinedIcon />
      <div className={styles.cartEmptyTitle}>Корзина пуста</div>
      <Link className={styles.cartEmptyBack} to="/">
        Вернуться к списку товаров
      </Link>
    </div>
  );
}

export default CartEmpty;
