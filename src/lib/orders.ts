export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
  shipping: { name: string; address: string; city: string; postal: string } | null;
}

export function orderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
