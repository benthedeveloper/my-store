import { Component, computed, input, output } from '@angular/core';

const MAX_LIMIT = 30;

@Component({
  selector: 'app-product-pagination',
  imports: [],
  templateUrl: './product-pagination.html',
  styleUrl: './product-pagination.css',
})
export class ProductPagination {
  total = input.required<number>();
  skip = input.required<number>();
  limit = input<number>(MAX_LIMIT);

  pageChange = output<number>(); // Emit new skip value

  currentPage = computed(() => Math.floor(this.skip() / this.limit()) + 1);
  totalPages = computed(() => Math.ceil(this.total() / this.limit()));

  onPageChange(newSkip: number): void {
    if (newSkip >= 0 && newSkip < this.total()) {
      this.pageChange.emit(newSkip);
    }
  }
}
