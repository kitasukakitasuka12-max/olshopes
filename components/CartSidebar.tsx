import React from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity,
  onRemoveItem
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-rose-600" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">Keranjang Anda</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-100 rounded-full transition-colors text-gray-500 hover:text-rose-600">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="text-lg">Keranjang belanja masih kosong.</p>
              <Button variant="outline" onClick={onClose}>Mulai Belanja</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 animate-fadeIn">
                <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 hover:text-rose-600 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 hover:text-rose-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-rose-700">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-gray-900">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center">Pajak dan ongkir dihitung saat checkout</p>
            <Button className="w-full py-4 text-lg shadow-xl shadow-rose-200" onClick={() => alert('Terima kasih! Checkout demo berhasil.')}>
              Checkout Sekarang
            </Button>
          </div>
        )}
      </div>
    </>
  );
};