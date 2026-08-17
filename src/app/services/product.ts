import { inject, Service, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Category } from '../shared/models/category';
import { Product as ProductModel, ProductResponse } from '../shared/models/product';

const MAX_LIMIT = 30;

@Service()
export class Product {
  private http = inject(HttpClient);
  private baseUrl = `https://dummyjson.com/products`;

  selectedCategory = signal<string>('');
  currentSkip = signal<number>(0);

  // Resource for categories list
  categoriesResource = httpResource<Category[]>(() => `${this.baseUrl}/categories`);

  productsResource = httpResource<ProductResponse>(() => {
    const category = this.selectedCategory();
    const skip = this.currentSkip();

    const url = category
      ? `${this.baseUrl}/category/${category}?limit=${MAX_LIMIT}&skip=${skip}`
      : `${this.baseUrl}?limit=${MAX_LIMIT}&skip=${skip}`;

    return { url };
  });

  // Helper to change category and reset pagination back to page 1
  setCategory(categorySlug: string): void {
    this.selectedCategory.set(categorySlug);
    this.currentSkip.set(0);
  }

  getProductById(id: number) {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }
}
