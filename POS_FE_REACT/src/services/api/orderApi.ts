import http from "../../config/Http";
import type { API, Order, OrderCartResponse } from "../../types/Type";

export const orderApi = {
  // Lấy danh sách đơn hàng
  getOrders: async (): Promise<OrderCartResponse[]> => {
    const response = await http.get<API<OrderCartResponse[]>>("/orders");
    return response.data.data;
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData: Order[]): Promise<Order[]> => {
    const response = await http.post<Order[]>("/orders", orderData);
    return response.data;
  },
};
