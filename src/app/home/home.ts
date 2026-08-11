import { Component } from '@angular/core';
import { CategoryFilterBar } from '../category-filter-bar/category-filter-bar';
import { ProductGrid } from '../product-grid/product-grid';

@Component({
  selector: 'app-home',
  imports: [CategoryFilterBar, ProductGrid],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
