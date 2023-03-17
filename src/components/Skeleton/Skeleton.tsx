import React, { FC } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Skeleton.module.scss";

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 338 434"
    backgroundColor="#494544"
    foregroundColor="#454140"
    {...props}
    className={styles.productsBlock}
  >
    <rect x="108" y="267" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="246" rx="5" ry="5" width="120" height="20" />
    <rect x="0" y="281" rx="10" ry="10" width="249" height="80" />
    <rect x="199" y="376" rx="10" ry="10" width="137" height="56" />
    <rect x="0" y="399" rx="5" ry="5" width="99" height="20" />
    <rect x="0" y="9" rx="0" ry="0" width="338" height="227" />
  </ContentLoader>
);

export default Skeleton;
