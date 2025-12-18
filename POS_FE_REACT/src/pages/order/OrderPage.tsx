import { OrderCart } from "../../components/order";
import { useOrders } from "../../hooks/useOrders";

export function OrderPage() {
  const { data: orderItems = [], isLoading, error } = useOrders();

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center">
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
          <p className="text-xl font-semibold mb-2">Failed to load orders</p>
          <p className="text-sm text-slate-600">
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-100 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        {orderItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <svg
              className="w-24 h-24 mb-4 opacity-30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p className="text-xl font-medium">No active orders</p>
            <p className="text-sm">New orders will appear here instantly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderItems.map((item) => (
              <OrderCart key={item.id} items={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
