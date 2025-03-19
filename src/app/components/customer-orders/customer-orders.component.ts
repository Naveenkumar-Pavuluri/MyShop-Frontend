import { Component, inject, Input } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
  orders:Order[]=[];
  orderService = inject(OrderService);
  ngOnInit(){
    this.orderService.getOrders().subscribe((result)=>{
      this.orders = result;
    })
  }

  sellingPrice(price:number,discount:number){
    return Math.floor(Math.round(price - price * (discount/100))/100)*100;
  }

}
