import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor() {}

  http = inject(HttpClient);

  wishlists: Product[] = [];
  init() {
    return this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
  }
  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');
  }
  addInWishlist(productId: string) {
    return this.http.post<Product[]>(
      environment.apiUrl + '/customer/wishlists/' + productId,
      {}
    );
  }
  removeFromWishlists(productId: string) {
    return this.http.delete<Product[]>(
      environment.apiUrl + '/customer/wishlists/' + productId
    );
  }
}
