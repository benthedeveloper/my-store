import { Component, effect, inject } from '@angular/core';
import { Cart as CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  imports: [],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css',
})
export class CartStatus {
  cartService = inject(CartService);

  private dismissTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect((onCleanup) => {
      const message = this.cartService.statusMessage();

      if (this.dismissTimer) {
        clearTimeout(this.dismissTimer);
      }

      if (message) {
        this.dismissTimer = setTimeout(() => this.dismiss(), 4000);
      }

      onCleanup(() => {
        if (this.dismissTimer) {
          clearTimeout(this.dismissTimer);
        }
      });
    });
  }

  dismiss(): void {
    this.cartService.statusMessage.set('');
  }
}
