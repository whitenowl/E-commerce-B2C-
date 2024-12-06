import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webapp';
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.wishlistService.init();
      this.cartService.init();
    }
  }

  // Method to handle adding to wishlist
  // addToWishlist(productId: string) {
  //   if (this.authService.isLoggedIn) {
  //     // Call the wishlist service to add product
  //     this.wishlistService.addInWishlist(productId);
  //   } else {
  //     alert('Please log in first to add items to your wishlist.');
  //     this.router.navigate(['/login']);  // Navigate to login page
  //   }
  // }
}

//   // Method to handle adding to cart
//   addToCart(productId: string) {
//     if (this.authService.isLoggedIn) {
//       // Call the cart service to add product
//       this.cartService.addProductToCart(productId);
//     } else {
//       alert('Please log in first to add items to your cart.');
//       this.router.navigate(['/login']);  // Navigate to login page
//     }
//   }
// }
