import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Cart } from '../types/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http= inject(HttpClient);
  items:Cart[]=[];

  init(){
    this.getCartItems().subscribe((result)=>{
      this.items = result;
    })
  }

  constructor() { }

  getCartItems(){
    return this.http.get<Cart[]>(environment.apiUrl+"/customer/cart");
  }

  addToCart(id:string,quantity:number){
    return this.http.post(environment.apiUrl+"/cusomter/cart/:"+id,{quantity})
  }

  removeFromCart(id:string){
    return this.http.delete(environment.apiUrl+"/cusomter/cart/:"+id)
  }
}
