import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, CommonModule, MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);
  ngOnInit() {
    this.orderService.getAdminOrders().subscribe((result) => {
      this.orders = result;
    })
  }

  sellingPrice(price: number, discount: number) {
    return Math.floor(Math.round(price - price * (discount / 100)) / 100) * 100;
  }

  updateStatus(status:any,order:Order){
    this.orderService.updateOrders(order._id!,status.value).subscribe((result)=>{
      alert("Order Updated Successfully")
      console.log(order);
    })
  }
}

