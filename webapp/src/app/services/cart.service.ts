import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

import { CartItem } from '../types/cartitem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  items: CartItem[] = [];
  constructor() {}
  init() {
    this.getCartItems().subscribe((result) => {
      this.items = result;
    });
  }
  getCartItems() {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/carts');
  }
  addToCart(productId: string, quantity: Number) {
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId, {
      quantity: quantity,
    });
  }
  removeFromCart(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/carts/' + productId);
  }
}
