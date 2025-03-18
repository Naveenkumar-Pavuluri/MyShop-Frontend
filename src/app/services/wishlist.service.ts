import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http=inject(HttpClient);
  wishlist:Product[]=[]
  constructor() { }

  init(){
    return this.getWishlist().subscribe((result)=>{
      this.wishlist = result;
    })
  }

  getWishlist(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/wishlist");
  }

  addToWishlist(productId:string){
    return this.http.post(environment.apiUrl+"/customer/wishlist/"+productId,{});
  }

  removeFromWishlist(productId:string){
    return this.http.delete(environment.apiUrl+"/customer/wishlist/"+productId);
  }
}
