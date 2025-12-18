import { STORAGE_KEY_CART, EVENT_CART_UPDATED } from "../constants/Constants";
import type { ItemInOrderCart } from "../types/Type";

export const getCart = (): ItemInOrderCart[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CART);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load cart", error);
    return [];
  }
};

export const saveCart = (cartItems: ItemInOrderCart[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    // Dispatch custom event for potential cross-tab sync
    window.dispatchEvent(new Event(EVENT_CART_UPDATED));
  } catch (error) {
    console.error("Failed to save cart", error);
  }
};

export const clearCart = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY_CART);
    window.dispatchEvent(new Event(EVENT_CART_UPDATED));
  } catch (error) {
    console.error("Failed to clear cart", error);
  }
};
