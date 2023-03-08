import React from "react";
import bannerImg from "../../assets/img/main.jpg";
import styles from "./Banner.module.scss";

function Banner(props) {
  return (
    <div className={styles.banner}>
      <img src={bannerImg} alt="banner" />
    </div>
  );
}

export default Banner;
