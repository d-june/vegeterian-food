import React, { useState } from "react";
import styles from "./Product.module.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slices/cartSlice";
function Product({ id, imageUrl, title, description, types, sizes, price }) {
  const dispatch = useDispatch();
  const cartProduct = useSelector((state) =>
    state.cart.products.find((obj) => obj.id === id)
  );

  const addedCount = cartProduct ? cartProduct.count : 0;

  const [activeType, setActiveType] = useState(0);
  const typesNames = ["тонкое", "традиционное"];
  const [activeSize, setActiveSize] = useState(0);

  const onClickAddToCart = () => {
    const product = {
      id,
      title,
      description,
      price,
      imageUrl,
    };
    dispatch(addProduct(product));
  };

  return (
    <div className={styles.product}>
      <img src={imageUrl} alt="Pizza image" className={styles.productImage} />
      <div className={styles.productContent}>
        <h4 className={styles.productName}>{title}</h4>
        <p className={styles.productDescription}>{description}</p>

        <ul className={styles.productTypes}>
          {/*{types.map((type) => (*/}
          {/*  <li*/}
          {/*    key={type}*/}
          {/*    onClick={() => setActiveType(type)}*/}
          {/*    className={*/}
          {/*      activeType === type*/}
          {/*        ? styles.productTypeActive + " " + styles.productType*/}
          {/*        : styles.productType*/}
          {/*    }*/}
          {/*  >*/}
          {/*    {typesNames[type]}*/}
          {/*  </li>*/}
          {/*))}*/}
        </ul>
        <ul className={styles.productSizes}>
          {/*{sizes.map((size, index) => (*/}
          {/*  <li*/}
          {/*    key={size}*/}
          {/*    onClick={() => setActiveSize(index)}*/}
          {/*    className={activeSize === index ? "active" : ""}*/}
          {/*  >*/}
          {/*    {size} см.*/}
          {/*  </li>*/}
          {/*))}*/}
        </ul>
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
}

export default Product;
