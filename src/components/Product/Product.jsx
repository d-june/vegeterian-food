import React, { useState } from "react";
import styles from "./Product.module.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
function Product({ imageUrl, title, description, types, sizes, price }) {
  const [activeType, setActiveType] = useState(0);
  const typesNames = ["тонкое", "традиционное"];
  const [activeSize, setActiveSize] = useState(0);

  return (
    <div className={styles.product}>
      <img src={imageUrl} alt="Pizza image" className={styles.productImage} />
      <div className={styles.productContent}>
        <h4 className={styles.productName}>{title}</h4>
        <p className={styles.productDescription}>{description}</p>

        <ul className={styles.productTypes}>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={
                activeType === type
                  ? styles.productTypeActive + " " + styles.productType
                  : styles.productType
              }
            >
              {typesNames[type]}
            </li>
          ))}
        </ul>
        <ul className={styles.productSizes}>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
        <div className={styles.productBottom}>
          <div className={styles.productPrice}>{price} р.</div>
          <button className={styles.productCart}>
            В корзину <ShoppingCartOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
