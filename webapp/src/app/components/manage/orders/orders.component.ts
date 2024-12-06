import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { DatePipe } from '@angular/common';
import { Product } from '../../../types/product';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,MatButtonModule,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderService=inject(OrderService);
  orders:Order[]=[];

  ngOnInit() {
    // this.orderService.getAdminOrder().subscribe(result => {
    //   // Sorting the orders by date in descending order
    //   this.orders = result
    //     .map(order => ({
    //       ...order,
    //       status: order.status || 'Processing' // Default status if not defined
    //     }))
    //     .sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // });

    //new 
    this.orderService.getAdminOrder().subscribe((result) => {
    this.orders = result
      .map((order) => ({
        ...order,
        status: order.status || 'Processing', // Default status if not defined
        totalAmount: order.items.reduce(
          (total, item) =>
            total + this.sellingPrice(item.product) * item.quantity,
          0
        ), // Calculate total for each order
      }))
      .sort(
        (a: Order, b: Order) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  });
  }
  sellingPrice(product:Product) {
    return Math.round(
      Number(product.price) -
        (Number(product.price) * Number(product.discount)) / 100
    );
  }
  statusChange(button:any,order:Order){
    console.log(button.value)
    this.orderService.updateOrderStatus(order._id!,button.value).subscribe(result=>{
      alert("Order Status Updated");
    });
  }

  getTotalAmount(order: Order): number {
    return order.items.reduce((total, item) => {
      const itemTotal = this.sellingPrice(item.product) * item.quantity;
      return total + itemTotal;
    }, 0);
  }
  
  
} 

