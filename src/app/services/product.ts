import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category';
import { ProductResponse } from '../shared/models/product';

@Service()
export class Product {
  private http = inject(HttpClient);
  private baseUrl = `https://dummyjson.com/products`;

  selectedCategory = signal<string>('');

  // Resource for loading categories list
  categoriesResource = rxResource({
    stream: () => this.http.get<Category[]>(`${this.baseUrl}/categories`),
  });

  // Resource for products
  productsResource = rxResource({
    params: () => ({ category: this.selectedCategory() }),
    stream: ({ params }) => {
      const url = params.category ? `${this.baseUrl}/category/${params.category}` : this.baseUrl;
      return this.http.get<ProductResponse>(url);
    },
  });
}
