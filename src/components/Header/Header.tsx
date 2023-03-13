import { FC, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Search from "../Search/Search";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";

const Header: FC = () => {
  const { products, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = useRef(false);

  const totalCount = products.reduce(
    (sum: number, product: any) => sum + product.count,
    0
  );

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(products);
      localStorage.setItem("cart", json);
    }

    isMounted.current = true;
  }, [products]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Vegetarian food
      </Link>
      <div className={styles.search}>
        {location.pathname !== "/cart" && <Search />}
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
      {location.pathname !== "/cart" && (
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
      )}
    </header>
  );
};

export default Header;
