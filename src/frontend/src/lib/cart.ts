import type { Product } from '../backend';

export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number | null;
  quantity: number;
  category: string;
}

export function addToCart(cart: CartItem[], product: Product, productId: number, quantity: number): CartItem[] {
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    return cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  
  return [
    ...cart,
    {
      productId,
      name: product.name,
      unitPrice: product.price ? Number(product.price) : null,
      quantity,
      category: product.category
    }
  ];
}

export function updateCartItemQuantity(cart: CartItem[], productId: number, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return cart.filter(item => item.productId !== productId);
  }
  
  return cart.map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );
}

export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
  return cart.filter(item => item.productId !== productId);
}

export function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    if (item.unitPrice !== null) {
      return total + item.unitPrice * item.quantity;
    }
    return total;
  }, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}
