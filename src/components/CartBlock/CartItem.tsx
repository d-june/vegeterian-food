import React, { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartItemType } from "../../redux/slices/cart/types";

import ClearIcon from "@mui/icons-material/Clear";
import {
  addProduct,
  minusProduct,
  removeProduct,
} from "../../redux/slices/cart/slice";

import styles from "./Cart.module.scss";

const CartItemBlock: FC<CartItemType> = ({
  id,
  imageUrl,
  title,
  description,
  count,
  price,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addProduct({ id } as CartItemType));
  };

  const onClickMinus = () => {
    dispatch(minusProduct(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы уверенны, что хотите удалить?")) {
      dispatch(removeProduct(id));
    }
  };

  return (
    <div className={styles.cartItem}>
      <img className={styles.itemImage} src={imageUrl} alt="product image" />
      <div className={styles.itemAbout}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={styles.itemDescription}>{description}</p>
      </div>
      <div className={styles.countBlock}>
        <button
          disabled={count === 1}
          className={styles.itemButton}
          onClick={onClickMinus}
        >
          -
        </button>{" "}
        {count}{" "}
        <button className={styles.itemButton} onClick={onClickPlus}>
          +
        </button>
      </div>
      <div className={styles.itemPrice}>{price * count} ₽</div>
      <div className={styles.itemDelete} onClick={onClickRemove}>
        <ClearIcon />
      </div>
    </div>
  );
};

export default CartItemBlock;
