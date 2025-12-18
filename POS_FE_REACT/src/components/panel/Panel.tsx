import type React from "react";
import type { ItemInOrderCart } from "../../types/Type";
import { formatCurrencyVND } from "../../utils/formatCurrency";

interface PanelProps {
  cartItems: ItemInOrderCart[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
  isProcessing: boolean;
}

export const Panel: React.FC<PanelProps> = ({
  cartItems,
  onUpdateQuantity,
  onCheckout,
  isProcessing,
}) => {
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="flex flex-col h-full bg-white border-l border border-slate-200 shadow-xl w-full max-w-md">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex gap-2 items-center">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Current Order
        </h2>
        <p className="text-slate-500 text-sm mt-1">{totalQty} items in order</p>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <svg
              className="w-16 h-16 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="font-medium">Your cart is empty</p>
            <p className="text-xs text-center px-8">
              Select items from the menu to build your order.
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group"
            >
              <img
                src={item.image}
                alt="Cheesecake Slice"
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">
                  {item.name}
                </h4>
                <div className="text-indigo-600 font-semibold text-sm">
                  {formatCurrencyVND(item.price)}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-slate-200 p-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium text-sm text-slate-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, +1)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
      <div className="p-6 border-t border-slate-100 bg-white space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrencyVND(total)}</span>
          </div>
        </div>
        <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-100">
          <span>Total</span>
          <span>{formatCurrencyVND(total)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={cartItems.length === 0 || isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2
            ${cartItems.length === 0 || isProcessing
              ? "bg-slate-300 cursor-not-allowed shadow-none"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/25 active:scale-[0.98]"
            }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span>Pay Now</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
