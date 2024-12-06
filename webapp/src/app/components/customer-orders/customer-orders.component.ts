import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
  orders:Order[]=[];
  orderService=inject(OrderService);

  ngOnInit() {
    this.orderService.getCustomerOrders().subscribe(result => {
      // Ensure default status and sort the orders by date
      console.log('Fetched Orders:', result); // Log raw data

      this.orders = result
        .map(order => ({
          ...order,
          status: order.status || 'Processing' // Set default status
        }))
        .sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
  sellingPrice(product:Product) {
    return Math.round(
      Number(product.price) -
        (Number(product.price) * Number(product.discount)) / 100
    );
  }
  getTotalAmount(order: Order): number {
    return order.items.reduce((total, item) => {
      const itemTotal = this.sellingPrice(item.product) * item.quantity;
      return total + itemTotal;
    }, 0);
}
}
