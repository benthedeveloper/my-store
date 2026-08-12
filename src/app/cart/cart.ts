import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { form, FormField, minLength, required, email } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Cart as CartService } from '../services/cart';
import { CartItem } from '../shared/models/cart';

interface CheckoutData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-cart',
  imports: [FormField, RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);

  // Reference to native <dialog> element
  checkoutModal = viewChild<ElementRef<HTMLDialogElement>>('checkoutModal');

  isOrderPlaced = signal(false);

  // Cart actions
  onIncreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  onDecreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  // Native dialog handlers
  openCheckout(): void {
    this.checkoutModal()?.nativeElement.showModal();
  }

  closeCheckout(): void {
    this.checkoutModal()?.nativeElement.close();
  }

  checkoutModel = signal<CheckoutData>({
    name: '',
    email: '',
  });

  checkoutForm = form(this.checkoutModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    minLength(schemaPath.name, 2, { message: 'Name must be at least 2 characters' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email must be valid' });
  });

  onSubmitOrder(event: Event): void {
    event.preventDefault();
    this.isOrderPlaced.set(true);
    this.cartService.clearCart();
    this.closeCheckout();
  }
}
