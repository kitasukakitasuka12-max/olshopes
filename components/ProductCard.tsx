import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            onClick={() => onAddToCart(product)} 
            size="sm"
            className="rounded-full w-12 h-12 !p-0 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingBag size={20} />
          </Button>
        </div>
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 rounded-full shadow-sm">
             {product.category}
           </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-gray-900 font-bold group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <span className="text-gray-300 text-xs ml-1">(24)</span>
          </div>
          <span className="font-serif text-lg font-bold text-rose-700">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};