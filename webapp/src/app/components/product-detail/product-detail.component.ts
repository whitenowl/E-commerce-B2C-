import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCartComponent, MatIcon, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  customerSerivce = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }

  getProductDetail(id: string) {
    this.customerSerivce.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];
      console.log(this.product);

      this.customerSerivce.getProducts("", this.product.categoryId, "", -1, "", 1, 4).subscribe(result => {
        this.similarProducts = result;
      });
    });
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    return Math.round(Number(this.product.price) - (Number(this.product.price) * Number(this.product.discount) / 100));
  }

  // Inject the required services
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  addToWishlist(product: Product) {
    if (!this.authService.isLoggedIn) {
      alert('Please log in first to add items to your wishlist.');
      this.router.navigate(['/login']);  // Navigate to login page
      return;
    }

    console.log(product);
    if (this.isInWishlist(product)) {
      this.wishlistService.removeFromWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let isExist = this.wishlistService.wishlists.find((x) => x._id == product._id);
    return !!isExist; // Return true if product exists in wishlist
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
    return !!this.cartService.items.find((x) => x.product._id == productId); // Check if the product is in the cart
  }
}
