import React from "react";
import type { Product } from "../../types/Type";
import { formatCurrencyVND } from "../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onAddToCart }) => {
    return (
      <div
        role="button"
        onClick={() => onAddToCart(product)}
        className="duration:200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group overflow-hidden"
      >
        <div className="h-40  relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full object-cover transition-transform duration-200 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-slate-800 line-clamp-1 text-lg">
              {product.name}
            </h3>
          </div>
          <span className="font-bold text-indigo-600 text-lg ">
            {formatCurrencyVND(product.price)}
          </span>
        </div>
      </div>
    );
  },
);
