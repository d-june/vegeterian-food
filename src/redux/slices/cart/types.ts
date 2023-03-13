export type CartItemType = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  count: number;
  price: number;
};

export interface CartSliceState {
  totalPrice: number;
  products: CartItemType[];
}
