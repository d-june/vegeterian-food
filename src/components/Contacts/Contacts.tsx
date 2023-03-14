import React, { FC } from "react";
import MapImage from "../../assets/img/Map.jpg";
import { Link } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import styles from "./Contacts.module.scss";

const Contacts: FC = () => {
  return (
    <div className={styles.contacts}>
      <img className={styles.contactsImage} src={MapImage} alt="map" />
      <div className="container">
        <div className={styles.contactsWrapper}>
          <div className={styles.contactsContent}>
            <h2 className={styles.contactsTitle}>Контакты</h2>
            <div className={styles.contactsAddress}>
              <LocationOnOutlinedIcon />
              <p>
                <span>Наш адрес: </span>г. Санкт-Петербург, Невский район, ул.
                Несуществующая, 10
              </p>
            </div>
            <Link to="mailto:example@gmail.com" className={styles.contactsMail}>
              <EmailOutlinedIcon />
              <p>
                <span>Наша почта: </span>example@gmail.com
              </p>
            </Link>
            <div className={styles.contactsOrder}>
              <button className={styles.contactsButton}>
                Забронировать столик
              </button>
              <div className={styles.contactsPhone}>
                <Link to="tel:+79175105759">+7(917)510-57-59</Link>
                <p>Звоните или оставляйте заявку</p>
              </div>
            </div>
            <div className={styles.contactsSocial}>
              <h3>Мы в соц. сетях: </h3>
              <Link to="#">
                <FacebookIcon />
              </Link>
              <Link to="#">
                <InstagramIcon />
              </Link>
              <Link to="#">
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
