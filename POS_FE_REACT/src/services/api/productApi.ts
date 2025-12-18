import http from "../../config/Http";
import type { API, Product } from "../../types/Type";

export const productApi = {
  // Lấy danh sách sản phẩm
  getProducts: async (): Promise<Product[]> => {
    const response = await http.get<API<Product[]>>("/products");
    return response.data.data;
  },
};
