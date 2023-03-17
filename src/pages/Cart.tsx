import React, { FC } from "react";

import CartBody from "../components/CartBlock/CartBody";
import Contacts from "../components/Contacts/Contacts";

const Cart: FC = () => {
  return (
    <>
      <CartBody />
      <Contacts />
    </>
  );
};

export default Cart;
