import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http= inject(HttpClient);
  constructor() { }

  addOrder(order:Order){
    return this.http.post(environment.apiUrl+"/customer/order",order);
  }

  getOrders(){
    return this.http.get<Order[]>(environment.apiUrl+"/customer/order");
  }
}
