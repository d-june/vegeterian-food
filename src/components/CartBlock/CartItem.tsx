import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  CartItem,
  minusProduct,
  removeProduct,
} from "../../redux/slices/cartSlice";
import styles from "./Cart.module.scss";
import ClearIcon from "@mui/icons-material/Clear";

type CartItemProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  count: number;
  price: number;
};
const CartItemBlock: FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  description,
  count,
  price,
}) => {
  const dispatch = useDispatch();

  console.log(description);
  const onClickPlus = () => {
    dispatch(addProduct({ id } as CartItem));
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
        <span className={styles.itemButton} onClick={onClickMinus}>
          -
        </span>{" "}
        {count}{" "}
        <span className={styles.itemButton} onClick={onClickPlus}>
          +
        </span>
      </div>
      <div className={styles.itemPrice}>{price * count} ₽</div>
      <div className={styles.itemDelete} onClick={onClickRemove}>
        <ClearIcon />
      </div>
    </div>
  );
};

export default CartItemBlock;
