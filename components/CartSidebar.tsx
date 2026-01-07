import React from 'react';
import { CartItem } from '../types.ts';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './Button.tsx';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, items, onUpdateQuantity, onRemoveItem
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-xl`}>
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-serif font-bold">Keranjang</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-2 text-sm">
              <img src={item.image} className="w-12 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center border rounded">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2">+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </>
  );
};