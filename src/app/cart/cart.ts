import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule, RouterLink, CurrencyPipe, NgOptimizedImage],
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

  checkoutModel: CheckoutData = {
    name: '',
    email: '',
  };

  nameError = signal('');
  emailError = signal('');

  validateName(): void {
    const name = this.checkoutModel.name.trim();
    this.nameError.set(
      name.length === 0
        ? 'Name is required'
        : name.length < 2
          ? 'Name must be at least 2 characters'
          : '',
    );
  }

  validateEmail(): void {
    const email = this.checkoutModel.email.trim();
    this.emailError.set(
      email.length === 0
        ? 'Email is required'
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ''
          : 'Email must be valid',
    );
  }

  onSubmitOrder(event: Event): void {
    event.preventDefault();
    this.validateName();
    this.validateEmail();

    if (this.nameError() || this.emailError()) {
      return;
    }

    this.isOrderPlaced.set(true);
    this.cartService.clearCart(false);
    this.closeCheckout();
  }
}
