import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Category } from '../shared/models/category';
import { ProductResponse } from '../shared/models/product';

const MAX_LIMIT = 30;

@Service()
export class Product {
  private http = inject(HttpClient);
  private baseUrl = `https://dummyjson.com/products`;

  selectedCategory = signal<string>('');
  currentSkip = signal<number>(0);

  // Resource for loading categories list
  categoriesResource = rxResource({
    stream: () => this.http.get<Category[]>(`${this.baseUrl}/categories`),
  });

  // Resource for products
  productsResource = rxResource({
    params: () => ({
      category: this.selectedCategory(),
      skip: this.currentSkip(),
    }),
    stream: ({ params }) => {
      const url = params.category
        ? `${this.baseUrl}/category/${params.category}?limit=${MAX_LIMIT}&skip=${params.skip}`
        : `${this.baseUrl}?limit=${MAX_LIMIT}&skip=${params.skip}`;

      return this.http.get<ProductResponse>(url);
    },
  });

  // Helper to change category and reset pagination back to page 1
  setCategory(categorySlug: string): void {
    this.selectedCategory.set(categorySlug);
    this.currentSkip.set(0);
  }
}
