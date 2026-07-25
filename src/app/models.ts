export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SalesKpis {
  totalItems: number;
  distinctProducts: number;
  subtotal: number;
  averageTicket: number;
}
