import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { orderApi } from "../services/api/orderApi";
import type { Order } from "../types/Type";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getOrders,
    refetchInterval: 3000, 
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: Order[]) => orderApi.createOrder(orderData),
    onSuccess: () => {
      // Invalidate và refetch orders
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(`Order processed successfully!`);
    },
    onError: (error) => {
      console.error("Failed to create order:", error);
      toast.error("Failed to create order. Please try again.");
    },
  });
};
