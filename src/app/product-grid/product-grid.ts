import { Component, inject } from '@angular/core';
import { Product as ProductService } from '../services/product';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {
  productService = inject(ProductService);
  // TODO inject CartService

  handleAddToCart(product: Product): void {
    console.log('TODO implement handleAddToCart');
    // this.cartService.addToCart(product);
  }
}
