import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem } from '../lib/cart';
import { addToCart, updateCartItemQuantity, removeFromCart } from '../lib/cart';
import type { Product } from '../backend';

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, productId: number, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'spice-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (product: Product, productId: number, quantity: number) => {
    setCart(prev => addToCart(prev, product, productId, quantity));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prev => updateCartItemQuantity(prev, productId, quantity));
  };

  const removeItem = (productId: number) => {
    setCart(prev => removeFromCart(prev, productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
