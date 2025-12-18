export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}


export interface ProductsResponse {
  products: Product[];
}

export interface OrdersResponse {
  orders: Order[];
}

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}



export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: number;
}


export interface CreateOrderRequest {
  customerName?: string;
  customerPhone?: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  id: string;     
  quantity: number;
}