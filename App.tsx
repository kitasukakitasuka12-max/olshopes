import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AiAdvisor } from './components/AiAdvisor';
import { Button } from './components/Button';
import { ShoppingBag, Search, Menu, Instagram, Facebook, Twitter, Send, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>(PageView.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = (newView: PageView) => {
    setView(newView);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-rose-50/20">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={() => navigate(PageView.HOME)} className="font-serif text-2xl font-bold tracking-tighter text-gray-900 flex items-center gap-2 group">
             <div className="bg-rose-600 text-white w-9 h-9 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-rose-200">E</div>
             <span className="group-hover:text-rose-600 transition-colors uppercase text-xl md:text-2xl tracking-[0.1em]">ESA CANTIK</span>
          </button>

          <div className="hidden md:flex items-center space-x-10">
            {Object.values(PageView).map((v) => (
              <button 
                key={v}
                onClick={() => navigate(v)} 
                className={`text-xs font-bold tracking-widest hover:text-rose-600 transition-colors relative group py-1`}
              >
                {v === PageView.HOME ? 'BERANDA' : v === PageView.SHOP ? 'KOLEKSI' : 'TENTANG'}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-rose-600 transition-transform duration-300 origin-left ${view === v ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-rose-100/50 rounded-full transition-colors text-gray-600">
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-rose-100 text-gray-700 hover:text-rose-600 rounded-full transition-all group"
            >
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-700">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 border-t border-rose-50' : 'max-h-0'}`}>
          <div className="flex flex-col p-4 space-y-4">
             <button onClick={() => navigate(PageView.HOME)} className="text-left font-bold text-gray-700 py-2">BERANDA</button>
             <button onClick={() => navigate(PageView.SHOP)} className="text-left font-bold text-gray-700 py-2">KOLEKSI</button>
             <button onClick={() => navigate(PageView.ABOUT)} className="text-left font-bold text-gray-700 py-2">TENTANG KAMI</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {view === PageView.HOME && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-12">
               <div className="absolute inset-0 z-0">
                 <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-rose-200/40 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[70%] bg-white/60 rounded-full blur-[100px]"></div>
               </div>
               
               <div className="container mx-auto px-4 relative z-10">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="space-y-8 max-w-xl">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm border border-rose-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-rose-800">Koleksi Spring 2025</span>
                     </div>
                     <h1 className="font-serif text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1]">
                       Keindahan <br /> <span className="text-rose-600 italic">Tanpa Batas</span>.
                     </h1>
                     <p className="text-lg text-gray-600 leading-relaxed font-light">
                       ESA CANTIK menghadirkan kurasi produk kecantikan dan fashion terpilih yang memancarkan pesona sejati setiap wanita Indonesia.
                     </p>
                     <div className="flex flex-wrap gap-4">
                       <Button size="lg" onClick={() => navigate(PageView.SHOP)} className="shadow-2xl shadow-rose-200 scale-105">
                         Mulai Belanja <ChevronRight className="ml-2" size={18} />
                       </Button>
                       <Button variant="outline" size="lg" className="border-gray-200 text-gray-700 hover:border-rose-400">
                         Lihat Lookbook
                       </Button>
                     </div>
                   </div>
                   
                   <div className="relative hidden md:block h-[700px]">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-rose-100 rounded-full blur-[80px] opacity-50"></div>
                     <div className="relative z-10 w-[450px] mx-auto h-full rounded-[40px] border-[12px] border-white shadow-[0_40px_100px_-15px_rgba(244,63,94,0.3)] overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                          alt="Model Esa Cantik" 
                          className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                        />
                     </div>
                   </div>
                 </div>
               </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                  <div className="max-w-xl">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
                    <p className="text-gray-500 italic">Temukan rahasia kecantikan yang telah dipercaya oleh ribuan pelanggan kami.</p>
                  </div>
                  <Button variant="ghost" className="group" onClick={() => navigate(PageView.SHOP)}>
                    Jelajahi Semua Koleksi <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {view === PageView.SHOP && (
          <section className="py-24 bg-white min-h-screen animate-slide-up">
            <div className="container mx-auto px-4">
               <div className="mb-16 text-center">
                 <h1 className="font-serif text-5xl font-bold mb-4">Katalog Eksklusif</h1>
                 <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full mb-6"></div>
                 <p className="text-gray-500 max-w-2xl mx-auto">Setiap produk dipilih dengan standar kualitas tertinggi untuk memastikan Anda tampil maksimal setiap hari.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                 {PRODUCTS.map((product) => (
                   <ProductCard 
                     key={product.id} 
                     product={product} 
                     onAddToCart={addToCart} 
                   />
                 ))}
               </div>
            </div>
          </section>
        )}

        {view === PageView.ABOUT && (
          <section className="py-24 bg-rose-50/30 min-h-[80vh] flex items-center animate-fade-in">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                 <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" alt="About Us" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                   <p className="font-serif text-4xl font-bold text-rose-600">Esa</p>
                   <p className="text-xs uppercase tracking-widest text-gray-400">Filosofi Kami</p>
                 </div>
              </div>
              <div className="space-y-8">
                <h1 className="font-serif text-5xl font-bold text-gray-900 leading-tight">Mendefinisikan Ulang <br /> <span className="text-rose-600">Kecantikan Indonesia</span>.</h1>
                <p className="text-lg text-gray-600 leading-loose font-light">
                  "ESA" berarti satu atau tunggal. Di ESA CANTIK, kami percaya setiap wanita memiliki satu kecantikan unik yang tidak bisa dibandingkan. Misi kami adalah menjadi partner Anda dalam mengekspresikan jati diri tersebut melalui fashion dan kosmetik premium.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                   <div className="space-y-2">
                     <p className="text-4xl font-bold text-gray-900">2024</p>
                     <p className="text-xs uppercase tracking-widest text-gray-400">Didirikan</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-4xl font-bold text-gray-900">100%</p>
                     <p className="text-xs uppercase tracking-widest text-gray-400">Keaslian Terjamin</p>
                   </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] text-white pt-24 pb-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-5 space-y-8">
            <h3 className="font-serif text-3xl font-bold tracking-tighter">ESA CANTIK</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              Elevasi gaya dan kepercayaan diri Anda dengan kurasi kecantikan dan fashion paling prestisius di Indonesia.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-rose-600 hover:border-rose-600 transition-all duration-300">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase">Navigasi</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li onClick={() => navigate(PageView.HOME)} className="hover:text-white cursor-pointer transition-colors">Beranda</li>
              <li onClick={() => navigate(PageView.SHOP)} className="hover:text-white cursor-pointer transition-colors">Koleksi</li>
              <li onClick={() => navigate(PageView.ABOUT)} className="hover:text-white cursor-pointer transition-colors">Tentang Kami</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kontak</li>
            </ul>
          </div>

          <div className="md:col-span-5 space-y-8">
            <h4 className="font-bold text-sm tracking-widest uppercase">Bergabung dengan Eksklusivitas</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Dapatkan akses pertama ke koleksi terbatas dan penawaran spesial member.</p>
            <div className="flex bg-gray-800/50 p-1 rounded-full border border-gray-700 focus-within:border-rose-500 transition-colors">
              <input type="email" placeholder="Alamat email Anda" className="bg-transparent border-none text-white px-6 py-3 w-full focus:outline-none" />
              <button className="bg-rose-600 p-3 rounded-full hover:bg-rose-700 transition-all flex items-center justify-center min-w-[50px]">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-24 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs tracking-widest uppercase">
          <p>&copy; 2025 ESA CANTIK. Crafted for Beauty.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
      
      <AiAdvisor />
    </div>
  );
};

export default App;