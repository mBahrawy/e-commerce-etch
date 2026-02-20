import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly cartService = inject(CartService);

  getStars(rate: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rate));
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.addToCart(this.product());
  }
}



