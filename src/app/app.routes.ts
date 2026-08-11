import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'My Store - Home',
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    title: 'My Store - Product Details',
  },
  {
    path: 'cart',
    component: Cart,
    title: 'My Store - Shopping Cart',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
