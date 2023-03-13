import React, { FC } from "react";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "./CartEmpty.module.scss";

const CartEmpty: FC = () => {
  return (
    <div className={styles.cartEmpty}>
      <ShoppingCartOutlinedIcon />
      <div className={styles.cartEmptyTitle}>Корзина пуста</div>
      <Link className={styles.cartEmptyBack} to="/">
        Вернуться к списку товаров
      </Link>
    </div>
  );
};

export default CartEmpty;
