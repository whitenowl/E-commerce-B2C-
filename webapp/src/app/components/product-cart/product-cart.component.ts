import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent {
  @Input() product!: Product;

  // Inject services
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  get sellingPrice() {
    return Math.round(
      Number(this.product.price) -
        (Number(this.product.price) * Number(this.product.discount)) / 100
    );
  }

  addToWishlist(product: Product) {
    if (!this.authService.isLoggedIn) {
      alert('Please log in first to add items to your wishlist.');
      this.router.navigate(['/login']);  // Navigate to login page
      return;
    }

    console.log(product);
    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlists(product._id!)
        .subscribe((result) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    return this.wishlistService.wishlists.some((x) => x._id == product._id);
  }

  addToCart(product: Product) {
    if (!this.authService.isLoggedIn) {
      alert('Please log in first to add items to your cart.');
      this.router.navigate(['/login']);  // Navigate to login page
      return;
    }

    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string) {
    return this.cartService.items.some((x) => x.product._id == productId);
  }
}
