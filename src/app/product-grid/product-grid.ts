import { Component, inject } from '@angular/core';
import { Product as ProductService } from '../services/product';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../shared/models/product';
import { ProductPagination } from '../product-pagination/product-pagination';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, ProductPagination],
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
