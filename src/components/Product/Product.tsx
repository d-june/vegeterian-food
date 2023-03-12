import React, { FC, useState } from "react";
import styles from "./Product.module.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  CartItem,
  selectCartProductById,
} from "../../redux/slices/cartSlice";

type ProductProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};
const Product: FC<ProductProps> = ({
  id,
  imageUrl,
  title,
  description,
  price,
}) => {
  const dispatch = useDispatch();
  const cartProduct = useSelector(selectCartProductById(id));

  const addedCount = cartProduct ? cartProduct.count : 0;

  const onClickAddToCart = () => {
    const product: CartItem = {
      id,
      title,
      description,
      price,
      imageUrl,
      count: 0,
    };
    dispatch(addProduct(product));
  };

  return (
    <div className={styles.product}>
      <img src={imageUrl} alt="Pizza image" className={styles.productImage} />
      <div className={styles.productContent}>
        <h4 className={styles.productName}>{title}</h4>
        <p className={styles.productDescription}>{description}</p>
        <div className={styles.productBottom}>
          <div className={styles.productPrice}>{price} р.</div>
          <button onClick={onClickAddToCart} className={styles.productCart}>
            В корзину {addedCount > 0 && <span>{addedCount}</span>}
            <ShoppingCartOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
