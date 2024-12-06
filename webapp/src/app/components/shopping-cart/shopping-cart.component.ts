import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { Router } from '@angular/router';

// Custom Validator Function for Phone Number
function phoneNumberValidator(control: AbstractControl) {
  const phoneNumber = control.value;
  const phoneRegex = /^(98|97)\d{8}$/; // Regex for 10-digit numbers starting with 98 or 97
  return phoneRegex.test(phoneNumber) ? null : { invalidPhoneNumber: true };
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatRadioModule, FormsModule,CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product) {
    return Math.round(
      Number(product.price) -
        (Number(product.price) * Number(product.discount)) / 100
    );
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }

  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  orderStep = 0;
  formbuilder = inject(FormBuilder);
  paymentType = 'cash';

  // Address Form with Validation
  addressForm = this.formbuilder.group({
    address1: ['', Validators.required],
    address2: ['', [Validators.required, phoneNumberValidator]], // Custom Validator for Phone Number
    city: ['', Validators.required],
    pincode: ['',],
  });

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.orderStep = 2;
    } else {
      alert('Please fill in the address form correctly!');
    }
  }

  orderService = inject(OrderService);
  router = inject(Router);

  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed.');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }
}
