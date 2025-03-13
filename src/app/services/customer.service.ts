import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http= inject(HttpClient)
  constructor() { }

  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/new-products");
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/featured-products");
  }

  getCategories(){
    return this.http.get<Category>(environment.apiUrl+"/customer/categories");
  }

  getProducts(searchTerm:string,categoryId:string,page:number, pageSize:number,sortBy:string,sortOrder:number,brandId:string){
    return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}`);
  }
}
