import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="303" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="412" rx="10" ry="10" width="95" height="30" />
    <rect x="108" y="277" rx="0" ry="0" width="0" height="1" />
    <rect x="125" y="413" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
