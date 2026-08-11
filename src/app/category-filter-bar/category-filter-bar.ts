import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product as ProductService } from '../services/product';

@Component({
  selector: 'app-category-filter-bar',
  imports: [],
  templateUrl: './category-filter-bar.html',
  styleUrl: './category-filter-bar.css',
})
export class CategoryFilterBar {
  protected productService = inject(ProductService);

  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.productService.setCategory(select.value);
  }
}
