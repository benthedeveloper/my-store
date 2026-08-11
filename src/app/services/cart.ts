import { computed, signal } from '@angular/core';
import { Service } from '@angular/core';
import { Product } from '../shared/models/product';
import { CartItem } from '../shared/models/cart';

@Service()
export class Cart {
  // Storage key for localStorage
  private readonly STORAGE_KEY = 'my_store_cart';

  // Core state signal holding cart items
  private cartItemsSignal = signal<CartItem[]>(this.loadCartFromStorage());

  // Read-only state for components
  cartItems = this.cartItemsSignal.asReadonly();

  totalItems = computed(() => this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  // Actions
  addToCart(product: Product, quantity: number = 1): void {
    const items = [...this.cartItemsSignal()];
    const existingIndex = items.findIndex((i) => i.product.id === product.id);

    if (existingIndex > -1) {
      // Update quantity for existing CartItem
      items[existingIndex] = {
        ...items[existingIndex],
        quantity: items[existingIndex].quantity + quantity,
      };
    } else {
      // Push new CartItem
      items.push({ product, quantity });
    }

    this.updateCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.cartItemsSignal().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    this.updateCart(items);
  }

  removeFromCart(productId: number): void {
    const items = this.cartItemsSignal().filter((item) => item.product.id !== productId);
    this.updateCart(items);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  // Persistence helpers
  private updateCart(items: CartItem[]): void {
    this.cartItemsSignal.set(items);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage', err);
      return [];
    }
  }
}
