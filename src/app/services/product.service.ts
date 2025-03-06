import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from "../types/product"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  http = inject(HttpClient)

  getAllProducts() {
    return this.http.get<Product[]>(environment.apiUrl + "/product")
  }

  getProductsById(id: string) {
    return this.http.get<Product>(environment.apiUrl + "/product/" + id);
  }

  addProduct(model: string) {
    return this.http.post(environment.apiUrl + "/product/", model);
  }

  updateProductById(id: string, model:string) {
    return this.http.put(environment.apiUrl + "/product/"+ id, model)
  }

  deleteProduct(id: string) {
    return this.http.delete(environment.apiUrl + "/product/"+ id);
  }
}
