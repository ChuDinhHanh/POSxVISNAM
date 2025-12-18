// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5038/api";

export const STORAGE_KEY_ORDERS = "pos_orders";
export const STORAGE_KEY_CART = "pos_cart";
export const EVENT_ORDER_UPDATED = "pos_order_updated";
export const EVENT_CART_UPDATED = "pos_cart_updated";
export const MAX_ORDERS_HISTORY = 100;
