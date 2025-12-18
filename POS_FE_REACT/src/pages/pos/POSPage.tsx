import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Panel } from "../../components/panel";
import { ProductCard } from "../../components/product";
import { useCreateOrder } from "../../hooks/useOrders";
import { useProducts } from "../../hooks/useProducts";
import { clearCart, getCart, saveCart } from "../../services/cartService";
import type { ItemInOrderCart, Order, Product } from "../../types/Type";

export function POSPage() {
  const [cartItems, setCartItems] = useState<ItemInOrderCart[]>([]);
  const { data: products = [], isLoading, error } = useProducts();
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    const savedCart = getCart();
    if (savedCart.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const handleAddToCart = (props: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === props.id);
      if (existing) {
        return prev.map((item) =>
          item.id === props.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...props, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + newQty }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    const dataRequest: Order[] = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    createOrderMutation.mutate(dataRequest, {
      onSuccess: () => {
        setCartItems([]);
        clearCart();
      },
    });
  };

  // Hiển thị loading
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50">
        <div className="text-center text-red-600">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-semibold mb-2">Failed to load products</p>
          <p className="text-sm text-slate-600">
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      {/* Product Grid Area */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Products */}
          {products.length === 0 ? (
            <div className="text-center text-slate-500 mt-20">
              <p className="text-xl">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Cart */}
      <Panel
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        isProcessing={createOrderMutation.isPending}
      />
      <ToastContainer position="bottom-center" />
    </div>
  );
}
