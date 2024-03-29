import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCart } from "../../redux/slices/cart/selectors";
import { clearCart } from "../../redux/slices/cart/slice";
import CartItem from "./CartItem";
import CartEmpty from "../CartEmpty/CartEmpty";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import styles from "./Cart.module.scss";

const CartBody: FC = () => {
  const { products, totalPrice } = useSelector(selectCart);
  const dispatch = useDispatch();

  const totalCount = products.reduce(
    (sum: number, product: any) => sum + product.count,
    0
  );
  const minOrder = 1500;

  const onClearCart = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearCart());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.cart}>
      <div className="container">
        <Link to="/" className={styles.cartBack}>
          <ArrowBackIosIcon /> к выбору блюда
        </Link>
        <div className={styles.cartTop}>
          <h1 className={styles.cartTitle}>
            Корзина <span>(Товаров в корзине: {totalCount})</span>
          </h1>
          <div className={styles.cartClear} onClick={onClearCart}>
            <RemoveShoppingCartIcon />
            Очистить корзину
          </div>
        </div>
        <div className={styles.cartProducts}>
          {products.map((product: any) => {
            return <CartItem key={product.id} {...product} />;
          })}
        </div>
        <div className={styles.cartBottomContainer}>
          <div className={styles.cartBottom}>
            <div className={styles.cartBottomBody}>
              <div className={styles.cartBottomPrice}>
                Итого: <span>{totalPrice} ₽</span>
              </div>
              {minOrder - totalPrice > 0 && (
                <div className={styles.cartMinOrder}>
                  <p>
                    До бесплатной доставки не хватает{" "}
                    <span>{minOrder - totalPrice} ₽</span>
                  </p>
                  <p>Минимальная сумма заказа {minOrder} ₽</p>
                </div>
              )}
            </div>
            <button className={styles.cartOrderButton}>Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBody;
