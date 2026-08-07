import { Component } from '@angular/core';
import { CategoryFilterBar } from '../category-filter-bar/category-filter-bar';

@Component({
  selector: 'app-home',
  imports: [CategoryFilterBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
