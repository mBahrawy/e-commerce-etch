import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  readonly cartService = inject(CartService);

  updateQuantity(productId: number, event: Event, currentQuantity: number, change: number): void {
    event.preventDefault();
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  moveToWishlist(productId: number): void {
    this.cartService.moveToWishlist(productId);
  }

  checkout(): void {
    alert('Fake Checkout Processed! Thank you for your theoretical purchase.');
    this.cartService.clearCart();
  }
}
