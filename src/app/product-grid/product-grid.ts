import { Component, inject } from '@angular/core';
import { Product as ProductService } from '../services/product';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../shared/models/product';
import { ProductPagination } from '../product-pagination/product-pagination';
import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, ProductPagination],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {
  productService = inject(ProductService);
  cartService = inject(CartService);

  handleAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
