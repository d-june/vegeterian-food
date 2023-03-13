import { CartItemType } from "../redux/slices/cart/types";

export const calcTotalPrice = (products: CartItemType[]) => {
  return products.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
