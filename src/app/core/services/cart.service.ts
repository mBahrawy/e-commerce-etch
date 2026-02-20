import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly cartTotal = computed(() => {
    return this.cartItemsSignal().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  readonly cartItemCount = computed(() => {
    return this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0);
  });

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSignal();
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex].quantity += quantity;
      this.cartItemsSignal.set(updatedItems);
    } else {
      this.cartItemsSignal.set([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) return;
    this.cartItemsSignal.update(items =>
      items.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  }

  moveToWishlist(productId: number): void {
    this.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}
