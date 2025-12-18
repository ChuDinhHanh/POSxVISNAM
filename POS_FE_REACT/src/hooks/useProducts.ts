import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};
