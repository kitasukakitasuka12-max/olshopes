export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  ABOUT = 'ABOUT',
}