import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.footerLeft}>
            <Link to="/" className={styles.logo}>
              Vegetarian food
            </Link>
            <p>г. Санкт-Петербург, Невский район, ул. Несуществующая, 10</p>
            <p>© ООО «Несуществующее» Все права защищены. 2010-2023</p>
          </div>

          <ul className={styles.footerList}>
            <li>
              <Link to="/about">О ресторане</Link>
            </li>
            <li>
              <Link to="/delivery">Условия доставки</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
