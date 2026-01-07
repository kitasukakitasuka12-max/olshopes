import React from 'react';
import { Product } from '../types.ts';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from './Button.tsx';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border flex flex-col group h-full">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button onClick={() => onAddToCart(product)} size="sm" className="h-10 w-10 !p-0"><ShoppingBag size={18} /></Button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-lg">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-2">{product.category}</p>
        <p className="text-rose-700 font-bold mt-auto">Rp {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};