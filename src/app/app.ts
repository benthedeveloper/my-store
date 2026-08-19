import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { CartStatus } from './cart/cart-status/cart-status';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CartStatus, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
