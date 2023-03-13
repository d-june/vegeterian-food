import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../redux/slices/cart/slice";
import { selectCartProductById } from "../../redux/slices/cart/selectors";
import { CartItemType } from "../../redux/slices/cart/types";
import { ProductType } from "../../redux/slices/products/types";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "./Product.module.scss";

const Product: FC<ProductType> = ({
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
    const product: CartItemType = {
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
