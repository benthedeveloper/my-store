import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product as ProductService } from '../services/product';
import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  productService = inject(ProductService);
  cartService = inject(CartService);

  // Input bound automatically from route param `/products/:id`
  id = input.required<string>();

  // Currently displayed main image thumbnail
  selectedImage = signal<string | null>(null);

  // Reactive resource that fetches product details when `id()` changes
  productResource = rxResource({
    params: () => ({ id: Number(this.id()) }),
    stream: ({ params }) => this.productService.getProductById(params.id),
  });

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
