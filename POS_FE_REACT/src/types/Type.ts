export interface API<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ItemInOrderCart extends Product {
  quantity: number;
}

export interface Order {
  productId: string;
  quantity: number;
}

export interface OrderCartResponse {
  id: string;
  items: ItemInOrderCart[];
  totalAmount: number;
  createdAt: number;
}

export type ViewState = "POS" | "REALTIME";
