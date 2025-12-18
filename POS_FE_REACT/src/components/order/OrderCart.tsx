import React from "react";
import type { OrderCartResponse } from "../../types/Type";
import { formatCurrencyVND } from "../../utils/formatCurrency";

interface OrderProps {
  items: OrderCartResponse;
}
export const OrderCart: React.FC<OrderProps> = ({ items }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <div
        key={items.id}
        className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up transition-all hover:shadow-md`}
      >
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <span className="font-mono font-bold text-slate-700 text-lg">
            # {items.id}
          </span>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatTime(items.createdAt)}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
            {items.items.map((item, idx) => (
              <div
                key={`${items.id}-${idx}`}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 truncate max-w-[180px]">
                    {item.name}
                  </span>
                  <span className="font-bold text-slate-700 w-6">
                    x {item.quantity}
                  </span>
                </div>
                <span className="text-slate-500">
                  {formatCurrencyVND(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Total Amount </span>
            <span className="text-2xl font-bold text-indigo-600">
              {formatCurrencyVND(items.totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
